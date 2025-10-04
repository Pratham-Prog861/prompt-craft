"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles, Scissors } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ImageTab() {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div>
          <Button className="w-full" variant="outline">
            <Upload className="h-4 w-4 mr-2" /> Upload Image
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            or drag and drop
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">AI Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary">
              <Sparkles className="h-4 w-4 mr-2" /> Upscale
            </Button>
            <Button variant="secondary">
              <Scissors className="h-4 w-4 mr-2" /> Remove BG
            </Button>
          </div>
        </div>

        <div className="space-y-2">
           <h3 className="text-sm font-medium text-muted-foreground">Stock Images</h3>
           <ScrollArea className="h-72">
            <div className="grid grid-cols-2 gap-2 pr-4">
              {PlaceHolderImages.map((img) => (
                <div key={img.id} className="relative aspect-video rounded-md overflow-hidden group">
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    fill
                    sizes="(max-width: 768px) 50vw, 150px"
                    className="object-cover"
                    data-ai-hint={img.imageHint}
                  />
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary">Replace</Button>
                   </div>
                </div>
              ))}
            </div>
           </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
