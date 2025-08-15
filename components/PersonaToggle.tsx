import { PersonaType, personas } from '../lib/personas-client'

interface PersonaToggleProps {
  currentPersona: PersonaType
  onPersonaChange: (persona: PersonaType) => void
  className?: string
}

export default function PersonaToggle({ 
  currentPersona, 
  onPersonaChange, 
  className = '' 
}: PersonaToggleProps) {
  const handleToggle = () => {
    const newPersona: PersonaType = currentPersona === 'hitesh' ? 'piyush' : 'hitesh'
    onPersonaChange(newPersona)
  }

  const currentPersonaData = personas[currentPersona]
  const otherPersona: PersonaType = currentPersona === 'hitesh' ? 'piyush' : 'hitesh'
  const otherPersonaData = personas[otherPersona]

  return (
    <div className={`persona-toggle-container ${className}`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleToggle}
          className="persona-toggle-button"
          aria-label={`Switch to ${otherPersonaData.displayName}`}
          style={{
            '--current-color': currentPersonaData.color,
            '--other-color': otherPersonaData.color
          } as React.CSSProperties}
        >
          <div className="persona-toggle-track">
            <div 
              className={`persona-toggle-thumb ${currentPersona === 'hitesh' ? 'translate-x-0' : 'translate-x-12'}`}
              style={{ backgroundColor: currentPersonaData.color }}
            >
              <span className="persona-initial">
                {currentPersonaData.displayName.charAt(0)}
              </span>
            </div>
            
            <div className="persona-labels">
              <span 
                className={`persona-label ${currentPersona === 'hitesh' ? 'active' : ''}`}
                style={{ color: currentPersona === 'hitesh' ? '#ffffff' : personas.hitesh.color }}
              >
                H
              </span>
              <span 
                className={`persona-label ${currentPersona === 'piyush' ? 'active' : ''}`}
                style={{ color: currentPersona === 'piyush' ? '#ffffff' : personas.piyush.color }}
              >
                P
              </span>
            </div>
          </div>
        </button>

        <div className="persona-info">
          <div 
            className="font-semibold text-sm"
            style={{ color: currentPersonaData.color }}
          >
            {currentPersonaData.displayName}
          </div>
          <div className="text-xs text-white-500 max-w-65">
            {currentPersonaData.description}
          </div>
        </div>
      </div>
    </div>
  )
}