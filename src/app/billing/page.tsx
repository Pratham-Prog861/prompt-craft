'use client';

import { Check, Bot, X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UserPagesNavbar from '@/components/layout/UserPagesNavbar';

export default function BillingPage() {
  const freeFeatures = [
    '1 project',
    'AI-powered generation',
    'Responsive design',
    'Community support',
  ];
  const proFeatures = [
    'Unlimited projects',
    'Advanced AI generation',
    'Real-time visual editor',
    'AI-powered image tools',
    'Priority email support',
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <UserPagesNavbar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-headline font-bold">Pricing Plans</h1>
            <p className="text-muted-foreground">
              Choose the plan that's right for you.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bot className="h-8 w-8 text-muted-foreground" />
                  <CardTitle className="text-2xl">Free Forever</CardTitle>
                </div>
                <CardDescription>
                  For individuals and hobby projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="text-4xl font-bold font-headline">
                  $0
                  <span className="text-lg font-medium text-muted-foreground">
                    / month
                  </span>
                </div>
                <ul className="space-y-3">
                  {freeFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Your Current Plan
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col border-primary shadow-2xl relative">
              <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                 <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                 </div>
              </div>
              <CardHeader>
                 <div className="flex items-center gap-2">
                  <Bot className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">Pro Plan</CardTitle>
                </div>
                <CardDescription>
                  For professionals and businesses who need more power.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="text-4xl font-bold font-headline">
                  $10
                  <span className="text-lg font-medium text-muted-foreground">
                    / month
                  </span>
                </div>
                <ul className="space-y-3">
                  {proFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                   <Link href="https://buy.stripe.com/test_5kA5lQ8o4g5T9YQfZ1" target="_blank">Upgrade to Pro</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
