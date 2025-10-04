import { create } from 'zustand';
import { generateWebsiteFromPrompt } from '@/ai/flows/generate-website-from-prompt';
import { iterateOnWebsiteWithPrompts } from '@/ai/flows/iterate-on-website-with-prompts';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Device = 'desktop' | 'tablet' | 'mobile';

interface WebGeniusState {
  messages: Message[];
  currentHtml: string;
  projectId: string | null;
  history: string[];
  isLoading: boolean;
  activeDevice: Device;
  leftPanelOpen: boolean;
  addMessage: (message: Message) => void;
  processPrompt: (prompt: string) => Promise<void>;
  loadProject: (projectId: string) => Promise<void>;
  setCurrentHtml: (html: string) => void;
  setIsLoading: (loading: boolean) => void;
  setActiveDevice: (device: Device) => void;
  toggleLeftPanel: () => void;
  setProjectId: (projectId: string | null) => void;
}

const initialHtml = `
<div class="flex flex-col items-center justify-center h-full bg-background text-center p-8">
  <div class="max-w-md">
    <h1 class="font-headline text-5xl font-bold text-primary">WebGenius</h1>
    <p class="mt-4 text-lg text-foreground/80">
      Welcome to the future of web design.
      <br />
      Describe the website you want to build in the chat panel to your left.
    </p>
    <div class="mt-8 flex justify-center gap-4">
      <div class="w-1/3 rounded-lg border p-4">
        <h3 class="font-headline text-primary">Prompt</h3>
        <p class="text-sm text-foreground/70 mt-2">Start with a detailed description of your site.</p>
      </div>
      <div class="w-1/3 rounded-lg border p-4">
        <h3 class="font-headline text-primary">Preview</h3>
        <p class="text-sm text-foreground/70 mt-2">See your creation come to life in real-time.</p>
      </div>
      <div class="w-1/3 rounded-lg border p-4">
        <h3 class="font-headline text-primary">Iterate</h3>
        <p class="text-sm text-foreground/70 mt-2">Use follow-up prompts to refine every detail.</p>
      </div>
    </div>
  </div>
</div>
`;

async function saveProject(projectId: string | null, html: string, prompt: string): Promise<string> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated.");

    const db = getFirestore();
    
    let currentProjectId = projectId;
    
    if (currentProjectId) {
        // Update existing project
        const projectRef = doc(db, 'users', user.uid, 'websiteProjects', currentProjectId);
        await setDoc(projectRef, { 
            websiteCode: html,
            lastModifiedDate: serverTimestamp(),
            lastPrompt: prompt,
        }, { merge: true });
    } else {
        // Create new project
        const projectCollectionRef = collection(db, 'users', user.uid, 'websiteProjects');
        const newProjectRef = await addDoc(projectCollectionRef, {
            userId: user.uid,
            projectName: prompt.substring(0, 50), // Use first 50 chars of prompt as name
            projectDescription: prompt,
            creationDate: serverTimestamp(),
            lastModifiedDate: serverTimestamp(),
            websiteCode: html,
            thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/400/300`,
        });
        currentProjectId = newProjectRef.id;
    }

    if (!currentProjectId) {
      throw new Error("Could not create or update project ID.");
    }
    
    // Save prompt history
    const promptHistoryRef = collection(db, 'users', user.uid, 'websiteProjects', currentProjectId, 'promptHistories');
    await addDoc(promptHistoryRef, {
        timestamp: serverTimestamp(),
        promptText: prompt,
        aiResponse: html, // Storing the resulting HTML as the 'response'
    });
    
    return currentProjectId;
}


export const useWebGeniusStore = create<WebGeniusState>((set, get) => ({
  messages: [],
  currentHtml: initialHtml,
  projectId: null,
  history: [initialHtml],
  isLoading: false,
  activeDevice: 'desktop',
  leftPanelOpen: true,
  setProjectId: (projectId) => set({ projectId }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  
  loadProject: async (projectId) => {
    set({ isLoading: true, messages: [], projectId });
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        set({ isLoading: false });
        // Maybe add a message to prompt login
        return;
    }

    const db = getFirestore();
    try {
        const projectRef = doc(db, 'users', user.uid, 'websiteProjects', projectId);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
            const projectData = projectSnap.data();
            set({
                currentHtml: projectData.websiteCode,
                messages: [{ role: 'assistant', content: `Loaded project: ${projectData.projectName}. Let's continue building!` }],
            });
        } else {
            set({ messages: [{ role: 'assistant', content: `Could not find project with ID: ${projectId}` }] });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        set({ messages: [{ role: 'assistant', content: `Error loading project: ${errorMessage}` }] });
    } finally {
        set({ isLoading: false });
    }
  },

  processPrompt: async (prompt) => {
    const isFirstPrompt = get().messages.length === 0;
    
    get().addMessage({ role: 'user', content: prompt });
    set({ isLoading: true });

    try {
      let newHtml = '';
      if (isFirstPrompt && !get().projectId) {
        const result = await generateWebsiteFromPrompt(prompt);
        newHtml = result.html;
      } else {
        const result = await iterateOnWebsiteWithPrompts({
          websiteHtml: get().currentHtml,
          prompt,
        });
        newHtml = result.modifiedWebsiteHtml;
      }
      
      if (newHtml) {
        const newProjectId = await saveProject(get().projectId, newHtml, prompt);
        set({ projectId: newProjectId });
        get().addMessage({ role: 'assistant', content: "I've updated the website based on your prompt. What would you like to do next?" });
        get().setCurrentHtml(newHtml);
      } else {
        throw new Error('AI did not return any HTML content.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      get().addMessage({ role: 'assistant', content: `Sorry, something went wrong: ${errorMessage}` });
    } finally {
      set({ isLoading: false });
    }
  },
  setCurrentHtml: (html) => set((state) => ({ currentHtml: html, history: [...state.history, html] })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setActiveDevice: (device) => set({ activeDevice: device }),
  toggleLeftPanel: () => set((state) => ({ leftPanelOpen: !state.leftPanelOpen })),
}));
