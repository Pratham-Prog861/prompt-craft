"use client";

import { usePromptCraftStore } from '@/store/useWebGeniusStore';
import Header from '@/components/webgenius/Header';
import LeftPanel from '@/components/webgenius/LeftPanel';
import CenterPanel from '@/components/webgenius/CenterPanel';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function PromptCraftApp() {
  const { leftPanelOpen, toggleLeftPanel } = usePromptCraftStore();
  const isMobile = useIsMobile();

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
