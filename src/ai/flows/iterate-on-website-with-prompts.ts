'use server';

/**
 * @fileOverview Allows iterative modification of a website based on follow-up prompts.
 *
 * - iterateOnWebsiteWithPrompts - A function that accepts the current website HTML and a new prompt to modify it.
 * - IterateOnWebsiteWithPromptsInput - The input type for the iterateOnWebsiteWithPrompts function.
 * - IterateOnWebsiteWithPromptsOutput - The return type for the iterateOnWebsiteWithPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IterateOnWebsiteWithPromptsInputSchema = z.object({
  websiteHtml: z
    .string()
    .describe('The current HTML content of the website to be modified.'),
  prompt: z.string().describe('A follow-up prompt describing the desired modifications to the website.'),
});

export type IterateOnWebsiteWithPromptsInput = z.infer<
  typeof IterateOnWebsiteWithPromptsInputSchema
>;

const IterateOnWebsiteWithPromptsOutputSchema = z.object({
  modifiedWebsiteHtml: z
    .string()
    .describe('The modified HTML content of the website based on the follow-up prompt.'),
});

export type IterateOnWebsiteWithPromptsOutput = z.infer<
  typeof IterateOnWebsiteWithPromptsOutputSchema
>;

export async function iterateOnWebsiteWithPrompts(
  input: IterateOnWebsiteWithPromptsInput
): Promise<IterateOnWebsiteWithPromptsOutput> {
  return iterateOnWebsiteWithPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'iterateOnWebsiteWithPromptsPrompt',
  input: {schema: IterateOnWebsiteWithPromptsInputSchema},
  output: {schema: IterateOnWebsiteWithPromptsOutputSchema},
  prompt: `You are an AI expert in frontend web development.  The user will provide
you with existing HTML for a website, and a follow-up prompt describing
modifications to make to the website.  Your job is to modify the HTML
according to the prompt, and return the modified HTML.  Ensure that the
modifications result in valid HTML.

Original HTML:
{{{websiteHtml}}}

Modification Prompt:
{{{prompt}}}`,
});

const iterateOnWebsiteWithPromptsFlow = ai.defineFlow(
  {
    name: 'iterateOnWebsiteWithPromptsFlow',
    inputSchema: IterateOnWebsiteWithPromptsInputSchema,
    outputSchema: IterateOnWebsiteWithPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
