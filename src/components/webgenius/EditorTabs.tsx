"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StyleTab from '@/components/webgenius/StyleTab';
import ContentTab from '@/components/webgenius/ContentTab';
import ImageTab from '@/components/webgenius/ImageTab';
import { Brush, Type, Image as ImageIcon } from 'lucide-react';

export default function EditorTabs() {
  return (
    <Tabs defaultValue="style" className="w-full p-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="style">
          <Brush className="h-4 w-4 mr-2" /> Style
        </TabsTrigger>
        <TabsTrigger value="content">
          <Type className="h-4 w-4 mr-2" /> Content
        </TabsTrigger>
        <TabsTrigger value="image">
          <ImageIcon className="h-4 w-4 mr-2" /> Image
        </TabsTrigger>
      </TabsList>
      <TabsContent value="style">
        <StyleTab />
      </TabsContent>
      <TabsContent value="content">
        <ContentTab />
      </TabsContent>
      <TabsContent value="image">
        <ImageTab />
      </TabsContent>
    </Tabs>
  );
}
