"use server";
/**
 * @fileOverview A simple chatbot flow for the landing page.
 *
 * - landingPageChat - A function that handles chatbot conversations.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

export const landingPageChat = ai.defineFlow(
  {
    name: "landingPageChat",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: `You are a helpful AI assistant for a web application called PromptCraft. PromptCraft allows users to build websites using AI prompts. Your role is to answer user questions about the product. Be friendly, concise, and helpful.

      User question: ${prompt}`,
      model: "googleai/gemini-2.5-flash",
      config: {
        maxOutputTokens: 150,
      },
    });

    return llmResponse.text;
  }
);
