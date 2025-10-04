'use client';

import { useUser } from '@/firebase';
import { Bot, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { UserNav } from '@/components/auth/UserNav';
import { Button } from '@/components/ui/button';


export default function UserPagesNavbar() {
  const { user, isUserLoading } = useUser();
    return (
    <header className="sticky top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
            <Bot className="h-6 w-6" />
            <span>PromptCraft</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
            {isUserLoading ? null : user ? (
                <UserNav />
            ) : (
                <Link href="/login" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Button>
                </Link>
            )}
        </div>
      </nav>
    </header>
  );
}