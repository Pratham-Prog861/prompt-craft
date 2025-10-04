"use client";

import { useEffect, useRef } from 'react';
import { usePromptCraftStore, Message } from '@/store/usePromptCraftStore';
import ChatMessage from '@/components/PromptCraft/ChatMessage';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, CornerDownLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatArea() {
  const { messages, processPrompt, isLoading } = usePromptCraftStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim() && !isLoading) {
      processPrompt(inputRef.current.value.trim());
      inputRef.current.value = '';
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && messages[messages.length-1]?.role === 'user' && (
             <ChatMessage message={{role: 'assistant', content: 'Thinking...'}} isLoading={true} />
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={inputRef}
          placeholder="e.g., 'Create a landing page for a SaaS product...'"
          className="pr-20 min-h-[60px]"
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 bottom-2 h-8 w-14"
          disabled={isLoading}
        >
          <Send className="h-4 w-4" />
          <CornerDownLeft className="h-4 w-4 ml-1"/>
        </Button>
      </form>
    </div>
  );
}
