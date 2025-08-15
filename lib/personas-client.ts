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
    description: 'Co-Founder@Learnyst  x   YouTuber  x  CTO'
  },
  piyush: {
    id: 'piyush',
    name: 'piyush-garg',
    displayName: 'Piyushji',
    color: '#00c1be',
    description: 'Founder@Teachyst  x  YouTuber  x  Educator'
  }
};

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