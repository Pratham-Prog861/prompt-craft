'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WebGeniusApp from '@/components/webgenius/WebGeniusApp';
import { usePromptCraftStore } from '@/store/useWebGeniusStore';

function StudioPageContent() {
  const searchParams = useSearchParams();
  const processPrompt = usePromptCraftStore((state) => state.processPrompt);
  const loadProject = usePromptCraftStore((state) => state.loadProject);
  const resetForNewProject = usePromptCraftStore((state) => state.resetForNewProject);
  const isLoading = usePromptCraftStore((state) => state.isLoading);
  const projectIdStore = usePromptCraftStore((state) => state.projectId);

  useEffect(() => {
    // Prevent multiple executions
    if (isLoading) return;

    const prompt = searchParams.get('prompt');
    const projectId = searchParams.get('projectId');
    const isNewProject = searchParams.get('new') === 'true';
    
    // Create a unique key for this effect to prevent duplicates
    const effectKey = `${prompt || ''}-${projectId || ''}-${isNewProject}`;
    
    if (isNewProject || (prompt && !projectId)) {
      resetForNewProject();
      if (prompt) {
        processPrompt(prompt);
      }
    } else if (projectId && projectId !== projectIdStore) {
      loadProject(projectId);
    }
  }, [searchParams.toString()]); // Only depend on search params string

  return <WebGeniusApp />;
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudioPageContent />
    </Suspense>
  );
}
