"use client";

import { usePromptCraftStore } from '@/store/useWebGeniusStore';
import Header from '@/components/webgenius/Header';
import LeftPanel from '@/components/webgenius/LeftPanel';
import CenterPanel from '@/components/webgenius/CenterPanel';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function PromptCraftApp() {
  const { leftPanelOpen, toggleLeftPanel, isLoading } = usePromptCraftStore();
  const isMobile = useIsMobile();

  // Add stable loading state to prevent glittering
  if (isLoading && !usePromptCraftStore.getState().currentHtml) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Creating your website...</p>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <main className="flex-1 overflow-hidden">
          <CenterPanel />
        </main>
        <Sheet open={leftPanelOpen} onOpenChange={toggleLeftPanel}>
          <SheetContent side="left" className="p-0 w-4/5">
            <LeftPanel />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            'transition-all duration-300 ease-in-out bg-card border-r',
            leftPanelOpen ? 'w-80' : 'w-0'
          )}
        >
          {leftPanelOpen && <LeftPanel />}
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden">
          <CenterPanel />
        </div>
      </main>
    </div>
  );
}
