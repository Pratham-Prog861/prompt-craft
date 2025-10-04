"use client";

import { useWebGeniusStore } from '@/store/useWebGeniusStore';
import Header from '@/components/webgenius/Header';
import LeftPanel from '@/components/webgenius/LeftPanel';
import CenterPanel from '@/components/webgenius/CenterPanel';
import RightPanel from '@/components/webgenius/RightPanel';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export default function WebGeniusApp() {
  const { leftPanelOpen, rightPanelOpen, toggleLeftPanel, toggleRightPanel } = useWebGeniusStore();
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
        <Sheet open={rightPanelOpen} onOpenChange={toggleRightPanel}>
          <SheetContent side="right" className="p-0 w-4/5">
            <RightPanel />
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
            'transition-all duration-300 ease-in-out bg-card',
            leftPanelOpen ? 'w-80' : 'w-0'
          )}
        >
          {leftPanelOpen && <LeftPanel />}
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden">
          <CenterPanel />
        </div>
        <aside
          className={cn(
            'transition-all duration-300 ease-in-out bg-card',
            rightPanelOpen ? 'w-80' : 'w-0'
          )}
        >
          {rightPanelOpen && <RightPanel />}
        </aside>
      </main>
    </div>
  );
}
