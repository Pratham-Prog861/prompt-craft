"use client";

import { PanelLeft, Bot, ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePromptCraftStore } from '@/store/useWebGeniusStore';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

export default function Header() {
  const { toggleLeftPanel, saveCurrentProject, hasUnsavedChanges, isLoading } = usePromptCraftStore();
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
                <span>PromptCraft</span>
            </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {hasUnsavedChanges && (
          <Button 
            onClick={saveCurrentProject} 
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            {isLoading ? "Saving..." : "Save Project"}
          </Button>
        )}
        
        <Link href="/projects" className="hidden md:flex">
          <Button variant="outline" size="sm">
            My Projects
          </Button>
        </Link>
        
        <Link href="/" className="hidden md:flex">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 md:hidden">
        {hasUnsavedChanges && (
          <Button 
            onClick={saveCurrentProject} 
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            Save
          </Button>
        )}
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
