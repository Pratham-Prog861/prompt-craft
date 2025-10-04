"use client";

import { useState } from 'react';
import { useRouter }from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      router.push(`/studio?prompt=${encodeURIComponent(prompt.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          WebGenius
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/80">
          Turn your ideas into stunning websites with the power of AI. Just describe what you want, and watch it come to life.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-lg mx-auto items-center space-x-2">
          <Input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'A portfolio for a photographer...'"
            className="flex-1 py-6 text-base"
          />
          <Button type="submit" size="lg" disabled={!prompt.trim()}>
            <span className="mr-2">Start Creating</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Start with a detailed description for the best results.
        </p>
      </div>
    </div>
  );
}