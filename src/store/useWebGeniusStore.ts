import { create } from 'zustand';
import { generateWebsiteFromPrompt } from '@/ai/flows/generate-website-from-prompt';
import { iterateOnWebsiteWithPrompts } from '@/ai/flows/iterate-on-website-with-prompts';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Device = 'desktop' | 'tablet' | 'mobile';

interface WebGeniusState {
  messages: Message[];
  currentHtml: string;
  history: string[];
  isLoading: boolean;
  activeDevice: Device;
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  addMessage: (message: Message) => void;
  processPrompt: (prompt: string) => Promise<void>;
  setCurrentHtml: (html: string) => void;
  setIsLoading: (loading: boolean) => void;
  setActiveDevice: (device: Device) => void;
  toggleLeftPanel: () => void;
  toggleRightPanel: () => void;
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

export const useWebGeniusStore = create<WebGeniusState>((set, get) => ({
  messages: [],
  currentHtml: initialHtml,
  history: [initialHtml],
  isLoading: false,
  activeDevice: 'desktop',
  leftPanelOpen: true,
  rightPanelOpen: true,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  processPrompt: async (prompt) => {
    const isFirstPrompt = get().messages.length === 0;
    
    get().addMessage({ role: 'user', content: prompt });
    set({ isLoading: true });

    try {
      let newHtml = '';
      if (isFirstPrompt) {
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
  toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
}));
