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
    displayName: 'Hitesh Choudhary',
    color: '#059669', // Green
    description: 'Practical, project-based learning approach'
  },
  piyush: {
    id: 'piyush',
    name: 'piyush-garg',
    displayName: 'Piyush Garg',
    color: '#dc2626', // Red
    description: 'Patient, thorough, beginner-friendly explanations'
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