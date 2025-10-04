import { create } from "zustand";
// Removed AI imports - using instant fallbacks only for speed
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

type Device = "desktop" | "tablet" | "mobile";

interface PromptCraftState {
  messages: Message[];
  currentHtml: string;
  projectId: string | null;
  history: string[];
  isLoading: boolean;
  activeDevice: Device;
  leftPanelOpen: boolean;
  hasUnsavedChanges: boolean;
  addMessage: (message: Message) => void;
  processPrompt: (prompt: string) => Promise<void>;
  loadProject: (projectId: string) => Promise<void>;
  resetForNewProject: () => void;
  saveCurrentProject: () => Promise<void>;
  setCurrentHtml: (html: string) => void;
  setIsLoading: (loading: boolean) => void;
  setActiveDevice: (device: Device) => void;
  toggleLeftPanel: () => void;
  setProjectId: (projectId: string | null) => void;
}

const initialHtml = `
<div class="flex flex-col items-center justify-center h-full bg-background text-center p-8">
  <div class="max-w-md">
    <h1 class="font-headline text-5xl font-bold text-primary">PromptCraft</h1>
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

async function saveProject(
  projectId: string | null,
  html: string,
  prompt: string
): Promise<string> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");

  const db = getFirestore();

  let currentProjectId = projectId;

  if (currentProjectId) {
    // Update existing project
    const projectRef = doc(
      db,
      "users",
      user.uid,
      "websiteProjects",
      currentProjectId
    );
    await setDoc(
      projectRef,
      {
        websiteCode: html,
        lastModifiedDate: serverTimestamp(),
        lastPrompt: prompt,
      },
      { merge: true }
    );
  } else {
    // Create new project
    const projectCollectionRef = collection(
      db,
      "users",
      user.uid,
      "websiteProjects"
    );
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
  const promptHistoryRef = collection(
    db,
    "users",
    user.uid,
    "websiteProjects",
    currentProjectId,
    "promptHistories"
  );
  await addDoc(promptHistoryRef, {
    timestamp: serverTimestamp(),
    promptText: prompt,
    aiResponse: html, // Storing the resulting HTML as the 'response'
  });

  return currentProjectId;
}

export const usePromptCraftStore = create<PromptCraftState>((set, get) => ({
  messages: [],
  currentHtml: initialHtml,
  projectId: null,
  history: [initialHtml],
  isLoading: false,
  activeDevice: "desktop",
  leftPanelOpen: true,
  hasUnsavedChanges: false,
  setProjectId: (projectId) => set({ projectId }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  resetForNewProject: () =>
    set({
      messages: [],
      currentHtml: initialHtml,
      projectId: null,
      history: [initialHtml],
      isLoading: false,
      hasUnsavedChanges: false,
    }),

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
      const projectRef = doc(
        db,
        "users",
        user.uid,
        "websiteProjects",
        projectId
      );
      const projectSnap = await getDoc(projectRef);

      if (projectSnap.exists()) {
        const projectData = projectSnap.data();
        set({
          currentHtml: projectData.websiteCode,
          hasUnsavedChanges: false, // Existing project, no unsaved changes
          messages: [
            {
              role: "assistant",
              content: `Loaded project: ${projectData.projectName}. Let's continue building!`,
            },
          ],
        });
      } else {
        set({
          messages: [
            {
              role: "assistant",
              content: `Could not find project with ID: ${projectId}`,
            },
          ],
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      set({
        messages: [
          {
            role: "assistant",
            content: `Error loading project: ${errorMessage}`,
          },
        ],
      });
    } finally {
      set({ isLoading: false });
    }
  },

  processPrompt: async (prompt) => {
    // Prevent duplicate calls if already loading
    if (get().isLoading) {
      console.log("Already processing a prompt, ignoring duplicate call");
      return;
    }

    const isFirstPrompt = get().messages.length === 0;

    get().addMessage({ role: "user", content: prompt });
    set({ isLoading: true });

    // Add progress message with instant expectation
    get().addMessage({
      role: "assistant",
      content: isFirstPrompt
        ? "🚀 Creating your website instantly..."
        : "✨ Applying your changes...",
    });

    try {
      let newHtml = "";

      if (isFirstPrompt && !get().projectId) {
        // Use instant fallback for ALL new projects to ensure speed
        const { getFallbackTemplate } = await import("@/ai/fallback-templates");
        newHtml = getFallbackTemplate(prompt);

        // Don't try AI generation at all - just use fallback for speed
      } else {
        // For follow-up prompts, use simple modifications instead of AI
        const { getSimpleModification } = await import(
          "@/ai/simple-modifications"
        );
        newHtml = getSimpleModification(get().currentHtml, prompt);
      }

      if (newHtml) {
        // Remove progress message
        set((state) => ({
          messages: state.messages.slice(0, -1),
        }));

        // Don't auto-save, just update the HTML and mark as having unsaved changes
        get().setCurrentHtml(newHtml);
        set({ hasUnsavedChanges: true });

        get().addMessage({
          role: "assistant",
          content: isFirstPrompt
            ? "✅ Your website is ready! This beautiful template was created instantly. Click 'Save Project' to save it."
            : "✅ Changes applied! Your website has been updated. Click 'Save Project' to save your changes.",
        });
      } else {
        throw new Error("AI did not return any HTML content.");
      }
    } catch (error) {
      // Remove progress message
      set((state) => ({
        messages: state.messages.slice(0, -1),
      }));

      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";

      // Provide helpful error messages
      let userFriendlyMessage = "Sorry, something went wrong. ";
      if (errorMessage.includes("timeout")) {
        userFriendlyMessage +=
          "The AI is taking longer than usual. Please try again with a simpler request.";
      } else if (errorMessage.includes("API")) {
        userFriendlyMessage +=
          "There's an issue with the AI service. Please try again in a moment.";
      } else {
        userFriendlyMessage +=
          "Please try rephrasing your request or try again.";
      }

      get().addMessage({
        role: "assistant",
        content: userFriendlyMessage,
      });

      console.error("ProcessPrompt error:", errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  saveCurrentProject: async () => {
    const state = get();
    if (!state.hasUnsavedChanges || !state.currentHtml) {
      return;
    }

    try {
      set({ isLoading: true });

      // Get the first user message as the prompt for project name
      const firstUserMessage = state.messages.find(
        (msg) => msg.role === "user"
      );
      const prompt = firstUserMessage?.content || "New Website";

      const newProjectId = await saveProject(
        state.projectId,
        state.currentHtml,
        prompt
      );

      set({
        projectId: newProjectId,
        hasUnsavedChanges: false,
      });

      get().addMessage({
        role: "assistant",
        content:
          "💾 Project saved successfully! You can find it in your Projects page.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save project";
      get().addMessage({
        role: "assistant",
        content: `❌ Failed to save project: ${errorMessage}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentHtml: (html) =>
    set((state) => ({ currentHtml: html, history: [...state.history, html] })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setActiveDevice: (device) => set({ activeDevice: device }),
  toggleLeftPanel: () =>
    set((state) => ({ leftPanelOpen: !state.leftPanelOpen })),
}));
