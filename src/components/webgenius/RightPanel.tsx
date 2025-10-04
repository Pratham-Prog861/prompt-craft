"use client";

import EditorTabs from '@/components/webgenius/EditorTabs';

export default function RightPanel() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h2 className="text-lg font-headline font-semibold">Visual Editor</h2>
      </header>
      <div className="flex-1 overflow-y-auto">
        <EditorTabs />
      </div>
    </div>
  );
}
