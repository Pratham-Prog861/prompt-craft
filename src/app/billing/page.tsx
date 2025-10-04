'use client';

import { CreditCard, DollarSign, Download, Zap } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UserPagesNavbar from '@/components/layout/UserPagesNavbar';

export default function BillingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <UserPagesNavbar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mx-auto grid max-w-6xl gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Billing</h1>
            <p className="text-muted-foreground">
              Manage your billing information and view your invoices.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Current Plan</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6" /> Pro Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Price</span>
                    <span className="font-medium">$29/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Billed monthly.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Next payment</span>
                    <span className="font-medium">July 20, 2024</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your card will be charged automatically.
                  </p>
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link href="https://buy.stripe.com/test_5kA5lQ8o4g5T9YQfZ1" target="_blank">Upgrade Plan</Link>
                </Button>
              </div>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  The card that will be used for your next payment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 rounded-md border p-4">
                  <CreditCard className="h-6 w-6" />
                  <div className="flex-1">
                    <p className="font-medium">Visa ending in 1234</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 08/2026
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View and download your past invoices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">June 2024</p>
                    <p className="text-sm text-muted-foreground">
                      Invoice #12345
                    </p>
                  </div>
                  <Button variant="outline" size="icon" disabled>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download invoice</span>
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">May 2024</p>
                    <p className="text-sm text-muted-foreground">
                      Invoice #12344
                    </p>
                  </div>
                  <Button variant="outline" size="icon" disabled>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download invoice</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}