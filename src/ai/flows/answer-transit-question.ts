// src/ai/flows/answer-transit-question.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to answer user questions about transit using the OmniDimension AI Voice Agent.
 *
 * - answerTransitQuestion - A function that takes a user's transit question and returns an answer from the AI voice agent.
 * - AnswerTransitQuestionInput - The input type for the answerTransitQuestion function.
 * - AnswerTransitQuestionOutput - The return type for the answerTransitQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerTransitQuestionInputSchema = z.object({
  question: z.string().describe('The user question about transit.'),
});
export type AnswerTransitQuestionInput = z.infer<typeof AnswerTransitQuestionInputSchema>;

const AnswerTransitQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI voice agent answer to the transit question.'),
});
export type AnswerTransitQuestionOutput = z.infer<typeof AnswerTransitQuestionOutputSchema>;

export async function answerTransitQuestion(input: AnswerTransitQuestionInput): Promise<AnswerTransitQuestionOutput> {
  return answerTransitQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerTransitQuestionPrompt',
  input: {schema: AnswerTransitQuestionInputSchema},
  output: {schema: AnswerTransitQuestionOutputSchema},
  prompt: `You are a helpful AI voice agent for a public transit app called NavAI.
  A user has asked the following question about transit:
  {{question}}

  Provide a concise and accurate answer to the user's question.
  Make sure your answer is human friendly.
  If there are any relevant transit alerts related to the user's question, be sure to mention them.`,
});

const answerTransitQuestionFlow = ai.defineFlow(
  {
    name: 'answerTransitQuestionFlow',
    inputSchema: AnswerTransitQuestionInputSchema,
    outputSchema: AnswerTransitQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
