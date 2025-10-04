"use client";

import { PanelLeft, PanelRight, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWebGeniusStore } from '@/store/useWebGeniusStore';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
  const { toggleLeftPanel, toggleRightPanel } = useWebGeniusStore();
  const isMobile = useIsMobile();
  
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-card z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleLeftPanel}>
          {isMobile ? <Bot className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          <span className="sr-only">{isMobile ? "Toggle AI Chat" : "Toggle Left Panel"}</span>
        </Button>
        {!isMobile && (
          <h1 className="text-xl font-headline font-bold text-primary">WebGenius</h1>
        )}
      </div>
      {isMobile && (
        <h1 className="text-xl font-headline font-bold text-primary">WebGenius</h1>
      )}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleRightPanel}>
          <PanelRight className="h-5 w-5" />
          <span className="sr-only">Toggle Right Panel</span>
        </Button>
      </div>
    </header>
  );
}
