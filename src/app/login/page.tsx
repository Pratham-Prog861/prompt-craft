'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary mb-2">
            <Bot className="h-8 w-8" />
            <span>PromptCraft</span>
          </Link>
          <p className="text-muted-foreground">Welcome back! Sign in to continue building.</p>
        </div>
        <AuthForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="underline hover:text-primary">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
