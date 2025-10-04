"use client";

import { PanelLeft, Bot, ArrowLeft, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWebGeniusStore } from '@/store/useWebGeniusStore';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

export default function Header() {
  const { toggleLeftPanel, toggleRightPanel } = useWebGeniusStore();
  const isMobile = useIsMobile();
  
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-card z-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleLeftPanel} className="md:flex">
            <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Left Panel</span>
        </Button>
        <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-headline font-bold text-primary flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <span>WebGenius</span>
            </Link>
        </div>
      </div>
      
       <Link href="/" className="hidden md:flex items-center">
            <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
            </Button>
        </Link>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleRightPanel} className="hidden md:flex">
          <PanelRight className="h-5 w-5" />
          <span className="sr-only">Toggle Right Panel</span>
        </Button>
        {isMobile && (
            <Link href="/">
                <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
        )}
      </div>
    </header>
  );
}
