'use client';

import { useEffect, useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import UserPagesNavbar from '@/components/layout/UserPagesNavbar';

type Theme = 'light' | 'dark' | 'system';

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>('dark');
  const { toast } = useToast();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleSaveChanges = () => {
    toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated."
    })
  }

  const handleDeleteAccount = () => {
    toast({
        variant: "destructive",
        title: "Feature not available",
        description: "Account deletion is not yet implemented."
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <UserPagesNavbar/>
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
                <Select value={theme} onValueChange={(value: Theme) => setTheme(value)}>
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
              <Button onClick={handleSaveChanges}>Save Preferences</Button>
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
              <Button variant="destructive" onClick={handleDeleteAccount}>Delete My Account</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}