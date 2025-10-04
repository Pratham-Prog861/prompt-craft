/**
 * @fileOverview This file defines a Genkit flow that removes the background from an image using AI.
 *
 * - removeImageBackground - An async function that accepts an image and returns the image with the background removed.
 * - RemoveImageBackgroundInput - The input type for the removeImageBackground function.
 * - RemoveImageBackgroundOutput - The output type for the removeImageBackground function.
 */

'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RemoveImageBackgroundInputSchema = z.object({
  image: z
    .string()
    .describe(
      'The image to remove the background from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
export type RemoveImageBackgroundInput = z.infer<typeof RemoveImageBackgroundInputSchema>;

const RemoveImageBackgroundOutputSchema = z.object({
  imageWithBackgroundRemoved: z
    .string()
    .describe(
      'The image with the background removed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
export type RemoveImageBackgroundOutput = z.infer<typeof RemoveImageBackgroundOutputSchema>;

export async function removeImageBackground(input: RemoveImageBackgroundInput): Promise<RemoveImageBackgroundOutput> {
  return removeImageBackgroundFlow(input);
}

const removeImageBackgroundPrompt = ai.definePrompt({
  name: 'removeImageBackgroundPrompt',
  input: {schema: RemoveImageBackgroundInputSchema},
  output: {schema: RemoveImageBackgroundOutputSchema},
  prompt: `Remove the background from the image provided. Return the image as a data URI.

Image: {{media url=image}}`,
});

const removeImageBackgroundFlow = ai.defineFlow(
  {
    name: 'removeImageBackgroundFlow',
    inputSchema: RemoveImageBackgroundInputSchema,
    outputSchema: RemoveImageBackgroundOutputSchema,
  },
  async input => {
    const {output} = await removeImageBackgroundPrompt(input);
    return output!;
  }
);
