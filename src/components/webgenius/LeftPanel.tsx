"use client";

import ChatArea from '@/components/webgenius/ChatArea';

export default function LeftPanel() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h2 className="text-lg font-headline font-semibold">AI Assistant</h2>
      </header>
      <div className="flex-1 overflow-y-auto">
        <ChatArea />
      </div>
    </div>
  );
}
