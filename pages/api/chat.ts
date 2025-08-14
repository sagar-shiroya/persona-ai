import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '../../lib/openai';
import { getPersonaSystemPrompt, isValidPersona, type PersonaType } from '../../lib/personas';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  persona: PersonaType;
  conversationHistory: ChatMessage[];
}

interface ChatResponse {
  response: string;
  status: 'success' | 'error';
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      response: '',
      error: 'Method not allowed'
    });
  }

  try {
    const { message, persona, conversationHistory }: ChatRequest = req.body;

    // Validate request body
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        status: 'error',
        response: '',
        error: 'Invalid message format'
      });
    }

    if (!persona || !isValidPersona(persona)) {
      return res.status(400).json({
        status: 'error',
        response: '',
        error: 'Invalid persona specified'
      });
    }

    if (!Array.isArray(conversationHistory)) {
      return res.status(400).json({
        status: 'error',
        response: '',
        error: 'Invalid conversation history format'
      });
    }

    // Sanitize input message
    const sanitizedMessage = message.trim().substring(0, 4000); // Limit message length

    // Get system prompt for persona
    const systemPrompt = getPersonaSystemPrompt(persona);

    // Build messages array for OpenAI
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: sanitizedMessage }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response generated from OpenAI');
    }

    return res.status(200).json({
      status: 'success',
      response: aiResponse
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);

    // Handle specific OpenAI API errors
    let errorMessage = 'Failed to generate response';
    
    if (error?.code === 'insufficient_quota') {
      errorMessage = 'API quota exceeded. Please check your OpenAI account.';
    } else if (error?.code === 'invalid_api_key') {
      errorMessage = 'Invalid API configuration. Please check settings.';
    } else if (error?.code === 'rate_limit_exceeded') {
      errorMessage = 'Too many requests. Please wait a moment and try again.';
    } else if (error?.name === 'AbortError' || error?.code === 'ETIMEDOUT') {
      errorMessage = 'Request timed out. Please try again.';
    }

    return res.status(500).json({
      status: 'error',
      response: '',
      error: errorMessage
    });
  }
}