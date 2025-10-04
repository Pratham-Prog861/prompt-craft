"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
            <Link href="/" passHref>
                <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Button>
            </Link>
        </div>
      </nav>
    </header>
  );
}

export default function ShowcasePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Community Showcase
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            See what others have created with the power of a single prompt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-card rounded-xl overflow-hidden border group transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative aspect-video">
                <Image 
                    src={project.image} 
                    alt={project.prompt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint={project.hint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <p className="italic text-foreground/70 line-clamp-3">"{project.prompt}"</p>
                <Button variant="link" className="px-0 mt-2">
                    View Project
                    <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
