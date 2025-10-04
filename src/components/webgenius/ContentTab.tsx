"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContentTab() {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Text Content</h3>
          <Textarea
            placeholder="Selected element's text content will appear here for editing."
            rows={5}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Link (URL)</h3>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
            />
            <Button variant="outline">Apply</Button>
          </div>
        </div>
        <Button className="w-full">Update Content</Button>
      </CardContent>
    </Card>
  );
}
