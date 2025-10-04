'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PromptCraftApp from '@/components/PromptCraft/PromptCraftApp';
import { usePromptCraftStore } from '@/store/usePromptCraftStore';

function StudioPageContent() {
  const searchParams = useSearchParams();
  const processPrompt = usePromptCraftStore((state) => state.processPrompt);
  const loadProject = usePromptCraftStore((state) => state.loadProject);
  const messages = usePromptCraftStore((state) => state.messages);
  const projectIdStore = usePromptCraftStore((state) => state.projectId);

  useEffect(() => {
    const prompt = searchParams.get('prompt');
    const projectId = searchParams.get('projectId');
    
    if (projectId && projectId !== projectIdStore) {
        loadProject(projectId);
    } else if (prompt && messages.length === 0) {
      processPrompt(prompt);
    }
  }, [searchParams, processPrompt, loadProject, messages.length, projectIdStore]);

  return <PromptCraftApp />;
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudioPageContent />
    </Suspense>
  );
}
