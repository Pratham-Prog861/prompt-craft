'use server';

/**
 * @fileOverview A website generation AI agent.
 *
 * - generateWebsiteFromPrompt - A function that handles the website generation process.
 * - GenerateWebsiteFromPromptInput - The input type for the generateWebsiteFromPrompt function.
 * - GenerateWebsiteFromPromptOutput - The return type for the generateWebsiteFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWebsiteFromPromptInputSchema = z.string().describe('A prompt describing the website to generate.');
export type GenerateWebsiteFromPromptInput = z.infer<typeof GenerateWebsiteFromPromptInputSchema>;

const GenerateWebsiteFromPromptOutputSchema = z.object({
  html: z.string().describe('The generated HTML code for the website.'),
  css: z.string().describe('The generated CSS code for the website using Tailwind classes.'),
});
export type GenerateWebsiteFromPromptOutput = z.infer<typeof GenerateWebsiteFromPromptOutputSchema>;

export async function generateWebsiteFromPrompt(input: GenerateWebsiteFromPromptInput): Promise<GenerateWebsiteFromPromptOutput> {
  return generateWebsiteFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWebsiteFromPromptPrompt',
  input: {schema: GenerateWebsiteFromPromptInputSchema},
  output: {schema: GenerateWebsiteFromPromptOutputSchema},
  prompt: `You are an expert web developer who can generate HTML and CSS code based on a user prompt. The CSS should use Tailwind classes.

Generate the HTML and CSS code for a website based on the following prompt: {{{$input}}}. The HTML should be well-structured and semantic. The CSS should use Tailwind classes for responsive design and styling. Ensure the website is mobile-first and SEO-optimized. The output should be a single block of HTML code with embedded Tailwind CSS classes. Do not include any markdown formatting.

Output the HTML and CSS code in the following format:

{
  "html": "...",
  "css": "..."
}
`,
});

const generateWebsiteFromPromptFlow = ai.defineFlow(
  {
    name: 'generateWebsiteFromPromptFlow',
    inputSchema: GenerateWebsiteFromPromptInputSchema,
    outputSchema: GenerateWebsiteFromPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
