'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WebGeniusApp from '@/components/webgenius/WebGeniusApp';
import { useWebGeniusStore } from '@/store/useWebGeniusStore';

function StudioPageContent() {
  const searchParams = useSearchParams();
  const processPrompt = useWebGeniusStore((state) => state.processPrompt);
  const messages = useWebGeniusStore((state) => state.messages);

  useEffect(() => {
    const prompt = searchParams.get('prompt');
    if (prompt && messages.length === 0) {
      processPrompt(prompt);
    }
  }, [searchParams, processPrompt, messages.length]);

  return <WebGeniusApp />;
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudioPageContent />
    </Suspense>
  );
}