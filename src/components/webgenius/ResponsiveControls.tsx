"use client";

import { Laptop, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePromptCraftStore } from '@/store/usePromptCraftStore';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function ResponsiveControls() {
  const { activeDevice, setActiveDevice } = usePromptCraftStore();

  const devices = [
    { name: 'desktop', icon: Laptop },
    { name: 'tablet', icon: Tablet },
    { name: 'mobile', icon: Smartphone },
  ] as const;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
        {devices.map((device) => (
          <Tooltip key={device.name}>
            <TooltipTrigger asChild>
              <Button
                variant={activeDevice === device.name ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setActiveDevice(device.name)}
                className={cn(
                    "h-8 w-8",
                    activeDevice === device.name ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                )}
              >
                <device.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{device.name.charAt(0).toUpperCase() + device.name.slice(1)}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
