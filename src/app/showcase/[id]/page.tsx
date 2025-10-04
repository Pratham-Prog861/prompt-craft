
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot, Eye, Loader } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { generateWebsiteFromPrompt } from '@/ai/flows/generate-website-from-prompt';

// This would typically come from a database or API
const projects = [
  {
    id: 1,
    prompt: "A modern, minimalist portfolio for a travel photographer, featuring a stunning hero image and a clean grid layout for galleries.",
    image: PlaceHolderImages[3].imageUrl,
    hint: PlaceHolderImages[3].imageHint,
  },
  {
    id: 2,
    prompt: "Landing page for a new mobile app called 'Mindful,' focusing on meditation and mental wellness. Use a calm color palette and inspiring imagery.",
    image: "https://images.unsplash.com/photo-1474418397713-7e15e4371bbf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hint: "meditation app",
  },
  {
    id: 3,
    prompt: "A vibrant and fun homepage for a local bakery named 'The Sweet Spot,' showcasing their delicious cakes and pastries.",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hint: "bakery website",
  },
   {
    id: 4,
    prompt: "An e-commerce site for a sustainable fashion brand. The design should be clean, earthy, and highlight the eco-friendly materials.",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hint: "fashion ecommerce",
  },
];


function Navbar() {
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
            <Link href="/showcase" passHref>
                <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Showcase
                </Button>
            </Link>
        </div>
      </nav>
    </header>
  );
}

function LivePreviewDialog({ prompt }: { prompt: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const handlePreview = async () => {
      if (htmlContent) return; 
  
      setIsLoading(true);
      try {
        const result = await generateWebsiteFromPrompt(prompt);
        const fullHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body>${result.html}</body>
          </html>
        `;
        setHtmlContent(`data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`);
      } catch (error) {
        console.error("Failed to generate preview:", error);
        setHtmlContent('<div>Sorry, the preview could not be generated.</div>');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Live Preview
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Live Preview</DialogTitle>
          </DialogHeader>
          <div className="h-full w-full border rounded-md overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <iframe
                src={htmlContent}
                title="Live Preview"
                className="w-full h-full bg-background"
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

export default function ShowcaseProjectPage() {
  const params = useParams();
  const projectId = params.id;
  const project = projects.find(p => p.id.toString() === projectId);

  if (!project) {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl font-bold">Project Not Found</h1>
                <p className="mt-4 text-lg text-foreground/80">
                    Sorry, we couldn't find the project you're looking for.
                </p>
                <Link href="/showcase" passHref>
                    <Button className="mt-8">Back to Showcase</Button>
                </Link>
            </main>
        </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl overflow-hidden border">
              <div className="relative aspect-video">
                <Image 
                    src={project.image} 
                    alt={project.prompt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
              </div>
              <div className="p-6">
                 <p className="text-sm font-semibold text-primary mb-2">Prompt:</p>
                 <blockquote className="italic text-foreground/80 border-l-2 border-primary pl-4">
                    "{project.prompt}"
                 </blockquote>
                 <div className="mt-6 flex gap-4">
                     <Link href={`/studio?prompt=${encodeURIComponent(project.prompt)}`} passHref>
                        <Button>
                            Try this prompt
                        </Button>
                    </Link>
                     <LivePreviewDialog prompt={project.prompt} />
                 </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
}
