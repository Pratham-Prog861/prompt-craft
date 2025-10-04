'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bot, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { UserNav } from '@/components/auth/UserNav';

function Navbar() {
  const { user, isUserLoading } = useUser();
    return (
    <header className="sticky top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
            <Bot className="h-6 w-6" />
            <span>WebGenius</span>
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


export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
        <Navbar/>
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="mx-auto max-w-4xl space-y-6">
           <div>
            <h1 className="text-3xl font-headline font-bold">Settings</h1>
            <p className="text-muted-foreground">
                Manage your account and application settings.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Choose how WebGenius looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex items-center space-x-2">
                <Select defaultValue='dark'>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Manage how you receive notifications from us.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="product-updates" defaultChecked />
                <label
                  htmlFor="product-updates"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Product updates and news
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="security-alerts" defaultChecked />
                <label
                  htmlFor="security-alerts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Security alerts
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data. This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardFooter className="border-t pt-6">
              <Button variant="destructive">Delete My Account</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
