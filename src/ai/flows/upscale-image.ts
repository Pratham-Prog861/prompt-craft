// Upscale an image using AI to improve its resolution and clarity.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const UpscaleImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo to upscale, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type UpscaleImageInput = z.infer<typeof UpscaleImageInputSchema>;

const UpscaleImageOutputSchema = z.object({
  upscaledPhotoDataUri: z
    .string()
    .describe('The upscaled photo as a data URI.'),
});
export type UpscaleImageOutput = z.infer<typeof UpscaleImageOutputSchema>;

export async function upscaleImage(input: UpscaleImageInput): Promise<UpscaleImageOutput> {
  return upscaleImageFlow(input);
}

const upscaleImagePrompt = ai.definePrompt({
  name: 'upscaleImagePrompt',
  input: {schema: UpscaleImageInputSchema},
  output: {schema: UpscaleImageOutputSchema},
  prompt: `Here is an image to upscale: {{media url=photoDataUri}}.\n\nUpscale this image so that it has higher resolution and clarity.`,
});

const upscaleImageFlow = ai.defineFlow(
  {
    name: 'upscaleImageFlow',
    inputSchema: UpscaleImageInputSchema,
    outputSchema: UpscaleImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Upscale this image: {{media url= ${input.photoDataUri}}}`,
    });

    return {
      upscaledPhotoDataUri: media.url!,
    };
  }
);
