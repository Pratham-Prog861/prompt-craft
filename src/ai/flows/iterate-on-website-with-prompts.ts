"use server";

/**
 * @fileOverview Allows iterative modification of a website based on follow-up prompts.
 *
 * - iterateOnWebsiteWithPrompts - A function that accepts the current website HTML and a new prompt to modify it.
 * - IterateOnWebsiteWithPromptsInput - The input type for the iterateOnWebsiteWithPrompts function.
 * - IterateOnWebsiteWithPromptsOutput - The return type for the iterateOnWebsiteWithPrompts function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const IterateOnWebsiteWithPromptsInputSchema = z.object({
  websiteHtml: z
    .string()
    .describe("The current HTML content of the website to be modified."),
  prompt: z
    .string()
    .describe(
      "A follow-up prompt describing the desired modifications to the website."
    ),
});

export type IterateOnWebsiteWithPromptsInput = z.infer<
  typeof IterateOnWebsiteWithPromptsInputSchema
>;

const IterateOnWebsiteWithPromptsOutputSchema = z.object({
  modifiedWebsiteHtml: z
    .string()
    .describe(
      "The modified HTML content of the website based on the follow-up prompt."
    ),
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
  name: "iterateOnWebsiteWithPromptsPrompt",
  input: { schema: IterateOnWebsiteWithPromptsInputSchema },
  output: { schema: IterateOnWebsiteWithPromptsOutputSchema },
  prompt: `Modify this HTML based on the request. Keep existing structure when possible.

HTML: {{{websiteHtml}}}

Request: {{{prompt}}}

Return only the modified HTML with Tailwind classes.`,
});

const iterateOnWebsiteWithPromptsFlow = ai.defineFlow(
  {
    name: "iterateOnWebsiteWithPromptsFlow",
    inputSchema: IterateOnWebsiteWithPromptsInputSchema,
    outputSchema: IterateOnWebsiteWithPromptsOutputSchema,
  },
  async (input) => {
    try {
      // Add timeout wrapper
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("AI iteration timeout after 45 seconds")),
          45000
        )
      );

      // Truncate HTML if it's too large to improve performance
      const truncatedInput = {
        ...input,
        websiteHtml:
          input.websiteHtml.length > 10000
            ? input.websiteHtml.substring(0, 10000) +
              "...[truncated for performance]"
            : input.websiteHtml,
      };

      const generationPromise = prompt(truncatedInput);

      const { output } = (await Promise.race([
        generationPromise,
        timeoutPromise,
      ])) as any;

      if (!output || !output.modifiedWebsiteHtml) {
        throw new Error("AI did not return valid modified HTML content");
      }

      return output;
    } catch (error) {
      console.error("Website iteration error:", error);
      throw new Error(
        `Failed to iterate on website: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
);
