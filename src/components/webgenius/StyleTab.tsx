"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function StyleTab() {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Typography</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select>
                <SelectTrigger id="font-family">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="space-grotesk">Space Grotesk</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="font-size">Size</Label>
                <Input id="font-size" placeholder="16px" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-weight">Weight</Label>
                <Input id="font-weight" placeholder="400" />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Text</Label>
              <Input id="color" placeholder="#000000" type="color" className="p-1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="background-color">Background</Label>
              <Input id="background-color" placeholder="#FFFFFF" type="color" className="p-1" />
            </div>
          </div>
        </div>
        
        <Separator />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Spacing</h3>
          <div className="space-y-2">
            <Label>Padding</Label>
            <div className="grid grid-cols-4 gap-2">
              <Input placeholder="T" />
              <Input placeholder="R" />
              <Input placeholder="B" />
              <Input placeholder="L" />
            </div>
            <Label>Margin</Label>
            <div className="grid grid-cols-4 gap-2">
              <Input placeholder="T" />
              <Input placeholder="R" />
              <Input placeholder="B" />
              <Input placeholder="L" />
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
}
