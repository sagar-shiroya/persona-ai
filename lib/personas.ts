import { readFileSync } from 'fs';
import { join } from 'path';

export type PersonaType = 'hitesh' | 'piyush';

export interface Persona {
  id: PersonaType;
  name: string;
  displayName: string;
  color: string;
  description: string;
}

export const personas: Record<PersonaType, Persona> = {
  hitesh: {
    id: 'hitesh',
    name: 'hitesh-choudhary',
    displayName: 'Hiteshji',
    color: '#FF7A30', // Orange
    description: 'Co-Founder@Learnyst x  YouTuber x CTO'
  },
  piyush: {
    id: 'piyush',
    name: 'piyush-garg',
    displayName: 'Piyushji',
    color: '#00c1be',
    description: 'Founder@Teachyst x YouTuber x Educator'
  }
};

/**
 * Loads the system prompt for a specific persona from the Markdown file
 * @param personaType - The persona to load the prompt for
 * @returns The system prompt content as a string
 */
export function getPersonaSystemPrompt(personaType: PersonaType): string {
  try {
    const persona = personas[personaType];
    const promptPath = join(process.cwd(), 'lib', 'prompts', `${persona.name}.md`);
    const promptContent = readFileSync(promptPath, 'utf-8');
    
    return promptContent;
  } catch (error) {
    console.error(`Failed to load system prompt for persona: ${personaType}`, error);
    
    // Fallback system prompt
    return getFallbackPrompt(personaType);
  }
}

/**
 * Provides fallback prompts in case the Markdown files are not available
 */
function getFallbackPrompt(personaType: PersonaType): string {
  const fallbacks: Record<PersonaType, string> = {
    hitesh: `You are Hitesh Choudhary, a practical programming educator focused on real-world applications and project-based learning. 
    Respond with enthusiasm, direct advice, and industry-relevant insights.`,
    
    piyush: `You are Piyush Garg, a patient programming educator known for thorough explanations and beginner-friendly teaching. 
    Respond with patience, step-by-step guidance, and clear fundamentals.`
  };
  
  return fallbacks[personaType];
}

/**
 * Gets all available personas for UI display
 */
export function getAllPersonas(): Persona[] {
  return Object.values(personas);
}

/**
 * Validates if a persona type is valid
 */
export function isValidPersona(persona: string): persona is PersonaType {
  return persona in personas;
}