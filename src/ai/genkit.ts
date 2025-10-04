import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

export const ai = genkit({
  plugins: [googleAI()],
  model: "googleai/gemini-2.5-flash", // Using the fastest Gemini model
  // Add performance configurations
  telemetry: {
    instrumentation: "genkit",
    logger: "genkit",
  },
});

// Export a faster configuration for simple tasks
export const fastAi = genkit({
  plugins: [googleAI()],
  model: "googleai/gemini-2.5-flash", // Fastest model for quick responses
});
