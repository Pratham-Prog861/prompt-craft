"use client";

import PreviewWindow from '@/components/PromptCraft/PreviewWindow';
import ResponsiveControls from '@/components/PromptCraft/ResponsiveControls';
import { usePromptCraftStore } from '@/store/usePromptCraftStore';

export default function CenterPanel() {
  const { isLoading } = usePromptCraftStore();

  return (
    <div className="flex flex-col h-full bg-background/50">
      <header className="flex items-center justify-center p-2 border-b bg-card">
        <ResponsiveControls />
      </header>
      <div className="flex-1 p-4 overflow-auto relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-primary font-medium">Building your vision...</p>
            </div>
          </div>
        )}
        <div className="h-full w-full rounded-lg shadow-lg overflow-hidden border">
           <PreviewWindow />
        </div>
      </div>
    </div>
  );
}
