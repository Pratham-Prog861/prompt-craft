"use client";

import { useWebGeniusStore } from '@/store/useWebGeniusStore';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function PreviewWindow() {
  const { currentHtml, activeDevice, isLoading } = useWebGeniusStore();
  const [iframeSrc, setIframeSrc] = useState('');
  
  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  useEffect(() => {
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
          }
          :root {
            --background: ${getComputedStyle(document.documentElement).getPropertyValue('--background').trim()};
            --foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim()};
            --card: ${getComputedStyle(document.documentElement).getPropertyValue('--card').trim()};
            --card-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--card-foreground').trim()};
            --popover: ${getComputedStyle(document.documentElement).getPropertyValue('--popover').trim()};
            --popover-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--popover-foreground').trim()};
            --primary: ${getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()};
            --primary-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--primary-foreground').trim()};
            --secondary: ${getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim()};
            --secondary-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--secondary-foreground').trim()};
            --muted: ${getComputedStyle(document.documentElement).getPropertyValue('--muted').trim()};
            --muted-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground').trim()};
            --accent: ${getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()};
            --accent-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--accent-foreground').trim()};
            --destructive: ${getComputedStyle(document.documentElement).getPropertyValue('--destructive').trim()};
            --destructive-foreground: ${getComputedStyle(document.documentElement).getPropertyValue('--destructive-foreground').trim()};
            --border: ${getComputedStyle(document.documentElement).getPropertyValue('--border').trim()};
            --input: ${getComputedStyle(document.documentElement).getPropertyValue('--input').trim()};
            --ring: ${getComputedStyle(document.documentElement).getPropertyValue('--ring').trim()};
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <script>
           tailwind.config = {
             theme: {
               extend: {
                 fontFamily: {
                   body: ['Inter', 'sans-serif'],
                   headline: ['Space Grotesk', 'sans-serif'],
                 },
                 colors: {
                  background: 'hsl(var(--background))',
                  foreground: 'hsl(var(--foreground))',
                  card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                  popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                  primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                  secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                  muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
                  accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
                  destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                  border: 'hsl(var(--border))',
                  input: 'hsl(var(--input))',
                  ring: 'hsl(var(--ring))',
                }
               }
             }
           }
        </script>
      </head>
      <body>
        ${currentHtml}
      </body>
      </html>
    `;
    setIframeSrc(`data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`);
  }, [currentHtml]);

  return (
    <div className="w-full h-full flex justify-center bg-card">
      <iframe
        src={iframeSrc}
        title="Website Preview"
        className={cn("bg-background transition-all duration-300 ease-in-out shadow-inner h-full")}
        style={{ width: deviceWidths[activeDevice] }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
