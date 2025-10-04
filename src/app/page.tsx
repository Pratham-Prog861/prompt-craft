
"use client";

import { useState } from 'react';
import { useRouter }from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Github, Twitter, Linkedin, Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Chatbot from '@/components/landing/Chatbot';
import { UserNav } from '@/components/auth/UserNav';
import { useUser } from '@/firebase';


function Navbar() {
  const { user, isUserLoading } = useUser();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-background/50 backdrop-blur-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
            <Bot className="h-6 w-6" />
            <span>PromptCraft</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors">
            Features
          </Link>
           <Link href="/showcase" className="text-foreground/80 hover:text-primary transition-colors">
            Showcase
          </Link>
           <Link href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {isUserLoading ? null : user ? (
            <UserNav />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/login">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </>
          )}
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
          Stop wrestling with code and complex builders. With PromptCraft, you're just one prompt away from a stunning, professional website.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/studio">
              Start Your Free Project Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onChatOpen }: { onChatOpen: () => void }) {
    return (
      <section id="contact" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Get in Touch</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Mail className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-foreground/80">Drop us a line anytime.</p>
                        <a href="mailto:hello@PromptCraft.com" className="text-primary hover:underline">pratham8355@gmail.com</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="text-foreground/80">Talk to our team.</p>
                        <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MessageSquare className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Live Chat</h3>
                        <p className="text-foreground/80">Get instant answers from our AI assistant.</p>
                        <button onClick={onChatOpen} className="text-primary hover:underline">Chat with us</button>
                    </div>
                </div>
            </div>
            <div className="bg-card p-8 rounded-xl border">
                <h3 className="text-2xl font-bold font-headline mb-6">Send us a Message</h3>
                <form className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message" className="w-full bg-background rounded-md border p-2 min-h-[120px]"></textarea>
                    <Button type="submit" className="w-full" size="lg">Send Message</Button>
                </form>
            </div>
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
                PromptCraft
            </h3>
            <p className="mt-2 text-sm text-foreground/70 max-w-sm">The smartest, fastest way to bring your web ideas to life. AI-powered, developer-approved.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase">Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#features" className="text-foreground/70 hover:text-primary">Features</Link></li>
              <li><Link href="/showcase" className="text-foreground/70 hover:text-primary">Showcase</Link></li>
              <li><Link href="#contact" className="text-foreground/70 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase">Connect</h4>
            <div className="mt-4 flex space-x-4">
              <a
               href="https://github.com/Pratham-Prog861" 
               target='_blank'
               rel='noreferrer'
               className="text-foreground/70 hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/pratham-darji-b704092a2/"
               target='_blank'
               rel='noreferrer'
               className="text-foreground/70 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} PromptCraft. All rights reserved.</p>
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
        image: PlaceHolderImages[4].imageUrl,
        hint: PlaceHolderImages[4].imageHint,
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
              PromptCraft combines cutting-edge AI with a powerful visual editor.
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
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-background text-foreground">
        <Navbar/>
        <main>
            <HeroSection/>
            <FeaturesSection />
            <CtaSection/>
            <ContactSection onChatOpen={() => setIsChatOpen(true)} />
        </main>
       <Footer/>
       <Chatbot isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}
