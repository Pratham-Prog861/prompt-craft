'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligent image placement within a website layout.
 *
 * It includes:
 * - intelligentImagePlacement: A function that takes image data and website context as input and suggests optimal placement and sizing.
 * - IntelligentImagePlacementInput: The input type for the intelligentImagePlacement function.
 * - IntelligentImagePlacementOutput: The return type for the intelligentImagePlacement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentImagePlacementInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The image data as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  websiteContext: z
    .string()
    .describe(
      'The context of the website, including the current layout and content.'
    ),
});
export type IntelligentImagePlacementInput = z.infer<
  typeof IntelligentImagePlacementInputSchema
>;

const IntelligentImagePlacementOutputSchema = z.object({
  placementSuggestion: z
    .string()
    .describe(
      'A suggestion for the optimal placement of the image within the website layout.'
    ),
  sizingSuggestion: z
    .string()
    .describe('A suggestion for the optimal sizing of the image.'),
  reasoning: z.string().describe('The AI reasoning behind the placement.'),
});
export type IntelligentImagePlacementOutput = z.infer<
  typeof IntelligentImagePlacementOutputSchema
>;

export async function intelligentImagePlacement(
  input: IntelligentImagePlacementInput
): Promise<IntelligentImagePlacementOutput> {
  return intelligentImagePlacementFlow(input);
}

const intelligentImagePlacementPrompt = ai.definePrompt({
  name: 'intelligentImagePlacementPrompt',
  input: {schema: IntelligentImagePlacementInputSchema},
  output: {schema: IntelligentImagePlacementOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting the optimal placement and sizing of images within a website layout to improve visual appeal and user experience.

  Based on the website context and the image provided, suggest the best placement and sizing for the image.

  Website Context: {{{websiteContext}}}
  Image: {{media url=imageDataUri}}

  Consider factors such as:
    - Visual hierarchy
    - Content relevance
    - User engagement
    - Responsive design

  Return the placement and sizing suggestion as strings, along with a brief explanation of your reasoning.
  Output should be properly formatted JSON with placementSuggestion, sizingSuggestion and reasoning fields.  Do not include markdown formatting.`,
});

const intelligentImagePlacementFlow = ai.defineFlow(
  {
    name: 'intelligentImagePlacementFlow',
    inputSchema: IntelligentImagePlacementInputSchema,
    outputSchema: IntelligentImagePlacementOutputSchema,
  },
  async input => {
    const {output} = await intelligentImagePlacementPrompt(input);
    return output!;
  }
);
