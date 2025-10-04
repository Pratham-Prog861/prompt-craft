'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WebGeniusApp from '@/components/webgenius/WebGeniusApp';
import { useWebGeniusStore } from '@/store/useWebGeniusStore';

function StudioPageContent() {
  const searchParams = useSearchParams();
  const processPrompt = useWebGeniusStore((state) => state.processPrompt);
  const loadProject = useWebGeniusStore((state) => state.loadProject);
  const messages = useWebGeniusStore((state) => state.messages);
  const projectIdStore = useWebGeniusStore((state) => state.projectId);

  useEffect(() => {
    const prompt = searchParams.get('prompt');
    const projectId = searchParams.get('projectId');
    
    if (projectId && projectId !== projectIdStore) {
        loadProject(projectId);
    } else if (prompt && messages.length === 0) {
      processPrompt(prompt);
    }
  }, [searchParams, processPrompt, loadProject, messages.length, projectIdStore]);

  return <WebGeniusApp />;
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudioPageContent />
    </Suspense>
  );
}
