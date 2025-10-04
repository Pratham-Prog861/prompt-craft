
"use client";

import { useState } from 'react';
import { useRouter }from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-background/50 backdrop-blur-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
            <Bot className="h-6 w-6" />
            <span>WebGenius</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors">
            Features
          </Link>
           <Link href="#cta" className="text-foreground/80 hover:text-primary transition-colors">
            Showcase
          </Link>
           <Link href="#footer" className="text-foreground/80 hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost">Log In</Button>
            <Button>
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
      </nav>
    </header>
  );
}


function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">
          Ready to Build Your Dream Website?
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Stop wrestling with code and complex builders. With WebGenius, you're just one prompt away from a stunning, professional website.
        </p>
        <div className="mt-8">
          <Button size="lg">
            Start Your Free Project Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="py-12 bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
                <Bot className="h-6 w-6" />
                WebGenius
            </h3>
            <p className="mt-2 text-sm text-foreground/70 max-w-sm">The smartest, fastest way to bring your web ideas to life. AI-powered, developer-approved.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase">Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#features" className="text-foreground/70 hover:text-primary">Features</Link></li>
              <li><Link href="#cta" className="text-foreground/70 hover:text-primary">Showcase</Link></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase">Connect</h4>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-foreground/70 hover:text-primary"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-foreground/70 hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} WebGenius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function HeroSection() {
    const [prompt, setPrompt] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
        router.push(`/studio?prompt=${encodeURIComponent(prompt.trim())}`);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 pt-20">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom_1px_center]"></div>
            <div className="max-w-3xl w-full text-center z-10">
                <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Build a website with a single prompt.
                </h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80">
                Turn your ideas into stunning websites with the power of AI. Just describe what you want, and watch it come to life.
                </p>
                <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xl mx-auto items-center space-x-2">
                <Input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'A portfolio for a photographer...'"
                    className="flex-1 py-6 text-base"
                />
                <Button type="submit" size="lg" disabled={!prompt.trim()}>
                    <span className="mr-2">Start Creating</span>
                    <ArrowRight className="h-5 w-5" />
                </Button>
                </form>
                <p className="mt-4 text-sm text-muted-foreground">
                Start with a detailed description for the best results.
                </p>
            </div>
        </div>
    )
}

function FeaturesSection() {
    const features = [
      {
        title: "AI-Powered Generation",
        description: "Describe your vision in plain English and our AI will generate the layout, content, and styling for you.",
        image: PlaceHolderImages[0].imageUrl,
        hint: PlaceHolderImages[0].imageHint,
      },
      {
        title: "Real-Time Visual Editor",
        description: "Fine-tune every aspect of your site with an intuitive drag-and-drop interface. What you see is what you get.",
        image: PlaceHolderImages[1].imageUrl,
        hint: PlaceHolderImages[1].imageHint
      },
      {
        title: "Responsive by Design",
        description: "Every website generated is automatically optimized for desktops, tablets, and mobile devices.",
        image: PlaceHolderImages[2].imageUrl,
        hint: PlaceHolderImages[2].imageHint
      }
    ];
  
    return (
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">The Future of Web Creation</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              WebGenius combines cutting-edge AI with a powerful visual editor.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                  <Image src={feature.image} alt={feature.title} data-ai-hint={feature.hint} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                <p className="mt-2 text-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

export default function LandingPage() {

  return (
    <div className="bg-background text-foreground">
        <Navbar/>
        <main>
            <HeroSection/>
            <FeaturesSection />
            <CtaSection/>
        </main>
       <Footer/>
    </div>
  );
}
