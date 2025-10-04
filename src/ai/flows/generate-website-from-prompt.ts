"use server";

/**
 * @fileOverview A website generation AI agent.
 *
 * - generateWebsiteFromPrompt - A function that handles the website generation process.
 * - GenerateWebsiteFromPromptInput - The input type for the generateWebsiteFromPrompt function.
 * - GenerateWebsiteFromPromptOutput - The return type for the generateWebsiteFromPrompt function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";
import { getFallbackTemplate } from "../fallback-templates";
import { performanceMonitor } from "../performance-monitor";

const GenerateWebsiteFromPromptInputSchema = z
  .string()
  .describe("A prompt describing the website to generate.");
export type GenerateWebsiteFromPromptInput = z.infer<
  typeof GenerateWebsiteFromPromptInputSchema
>;

const GenerateWebsiteFromPromptOutputSchema = z.object({
  html: z.string().describe("The generated HTML code for the website."),
  css: z
    .string()
    .describe("The generated CSS code for the website using Tailwind classes."),
});
export type GenerateWebsiteFromPromptOutput = z.infer<
  typeof GenerateWebsiteFromPromptOutputSchema
>;

export async function generateWebsiteFromPrompt(
  input: GenerateWebsiteFromPromptInput
): Promise<GenerateWebsiteFromPromptOutput> {
  const endTimer = performanceMonitor.startTimer("generateWebsite");

  try {
    const result = await generateWebsiteFromPromptFlow(input);
    endTimer();
    return result;
  } catch (error) {
    endTimer();
    console.warn("AI generation failed, using fallback template:", error);
    // Use fallback template if AI fails
    const fallbackHtml = getFallbackTemplate(input);
    return {
      html: fallbackHtml,
      css: "",
    };
  }
}

const prompt = ai.definePrompt({
  name: "generateWebsiteFromPromptPrompt",
  input: { schema: GenerateWebsiteFromPromptInputSchema },
  output: { schema: GenerateWebsiteFromPromptOutputSchema },
  prompt: `Generate HTML with Tailwind CSS for: {{{$input}}}

Requirements:
- Use Tailwind classes only
- Mobile-first responsive design
- Clean, semantic HTML
- Return JSON format only

Example output:
{
  "html": "<div class='min-h-screen bg-gray-100'>...</div>",
  "css": ""
}`,
});

const generateWebsiteFromPromptFlow = ai.defineFlow(
  {
    name: "generateWebsiteFromPromptFlow",
    inputSchema: GenerateWebsiteFromPromptInputSchema,
    outputSchema: GenerateWebsiteFromPromptOutputSchema,
  },
  async (input) => {
    try {
      // Add timeout wrapper - reduced to 10 seconds for faster fallback
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("AI generation timeout after 10 seconds")),
          10000
        )
      );

      const generationPromise = prompt(input);

      const { output } = (await Promise.race([
        generationPromise,
        timeoutPromise,
      ])) as any;

      if (!output || !output.html) {
        throw new Error("AI did not return valid HTML content");
      }

      return output;
    } catch (error) {
      console.error("Website generation error:", error);
      throw new Error(
        `Failed to generate website: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
);
