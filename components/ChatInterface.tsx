import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { type PersonaType, personas } from '../lib/personas-client'
import PersonaToggle from './PersonaToggle'

// Simple HTML sanitization function to allow only safe tags
const sanitizeHtml = (html: string): string => {
  // Allow only basic paragraph tags as specified in the persona prompts
  const allowedTags = ['p']
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g
  
  return html.replace(tagRegex, (match, tagName) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      // Only allow simple opening and closing tags without attributes
      return match.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, '<$1>').replace(/<\/([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, '</$1>')
    }
    return '' // Remove disallowed tags
  })
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  persona?: PersonaType
}

interface ChatResponse {
  response: string
  status: 'success' | 'error'
  error?: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPersona, setCurrentPersona] = useState<PersonaType>('hitesh') // Default persona
  const messageAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageAreaRef.current) {
      const scrollElement = messageAreaRef.current
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }, 100)
    }
  }, [messages, isLoading])

  // Auto-focus input when AI finishes responding
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      // Small delay to ensure the UI has updated before focusing
      setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
    }
  }, [isLoading])

  // Auto-focus input on component mount for immediate typing
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [])

  const handlePersonaChange = (newPersona: PersonaType) => {
    setCurrentPersona(newPersona)
    setError(null) // Clear any existing errors when switching personas
  }

  const sendMessageToAPI = async (message: string, conversationHistory: Message[]): Promise<ChatResponse> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          persona: currentPersona,
          conversationHistory: conversationHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.')
      }
      throw new Error(error.message || 'Network error occurred')
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    // Add user message and clear input
    setMessages(prev => [...prev, userMessage])
    const currentInput = inputText
    setInputText('')
    setError(null)
    setIsLoading(true)

    try {
      // Get AI response
      const result = await sendMessageToAPI(currentInput, messages)
      
      if (result.status === 'error') {
        throw new Error(result.error || 'Failed to get response')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: 'assistant',
        timestamp: new Date(),
        persona: currentPersona
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      console.error('Chat error:', error)
      setError(error.message || 'Something went wrong. Please try again.')
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error.message || 'Failed to get response'}`,
        sender: 'assistant',
        timestamp: new Date(),
        persona: currentPersona
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputContainerClick = () => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="chat-container" role="main" aria-label="AI Chat Application">
      {/* Fixed Header */}
      <header className="chat-header" role="banner">
        <div className="app-header">
          <h1>Persona.AI</h1>          
        </div>
        <div className="px-6 pb-3">
          <div className="flex justify-center">
            <PersonaToggle 
              currentPersona={currentPersona} 
              onPersonaChange={handlePersonaChange}
              aria-label="Choose AI persona to chat with"
            />
          </div>
        </div>
      </header>

      {/* Scrollable Message Area */}
      <main className="chat-main" role="log" aria-live="polite" aria-label="Chat conversation">
        <div ref={messageAreaRef} className="message-area" id="chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-message" role="status">
            </div>
          ) : (
            messages.map((message) => {
              const isUser = message.sender === 'user'
              const messagePersona = message.persona || currentPersona
              const personaName = personas[messagePersona].displayName
              const personaColor = personas[messagePersona].color
              
              return (
                <div
                  key={message.id}
                  className={`message-wrapper ${isUser ? 'message-user' : 'message-assistant'}`}
                  role="article"
                  aria-labelledby={`message-${message.id}-label`}
                >
                  <div 
                    id={`message-${message.id}-label`}
                    className="message-label"
                    style={!isUser ? { color: personaColor } : {}}
                  >
                    {isUser ? 'Me' : `${personaName}`}
                  </div>
                  <div 
                    className={`message ${isUser ? 'message-user' : 'message-assistant'}`}
                    style={!isUser ? { borderLeft: `3px solid ${personaColor}` } : { borderRight: '3px solid #000000' }}
                    aria-describedby={`message-${message.id}-label`}
                  >
                    {isUser ? (
                      message.text
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.text) }} />
                    )}
                  </div>
                </div>
              )
            })
          )}
          {isLoading && (
            <div 
              className="message-wrapper message-assistant opacity-75"
              role="status"
              aria-live="polite"
              aria-label={`${personas[currentPersona].displayName} is thinking`}
            >
              <div 
                className="message-label"
                style={{ color: personas[currentPersona].color }}
              >
                {personas[currentPersona].displayName}
              </div>
              <div 
                className="message message-assistant"
                style={{ borderLeft: `3px solid ${personas[currentPersona].color}` }}
              >
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse">Thinking...</div>
                  <div className="flex space-x-1" aria-hidden="true">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="chat-footer" role="form" aria-label="Send message form">
        <div 
          className="input-container" 
          role="group" 
          aria-label="Message input group"
          onClick={handleInputContainerClick}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isLoading ? "AI is thinking..." : "Ask" + " anything"}
            className="modern-input"
            disabled={isLoading}
            aria-label="Type your message here"
            aria-describedby="send-help-text"
            autoComplete="off"
            maxLength={1000}
          />
          <span id="send-help-text" className="sr-only">
            Press Enter to send or click the send button
          </span>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="send-icon-button"
            aria-label={isLoading ? "AI is processing your message" : "Send message"}
            type="submit"
          >
            {isLoading ? (
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="2" fill="currentColor">
                  <animate attributeName="r" values="2;8;2" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
                </circle>
              </svg>
            ) : (
              <svg viewBox="0 0 35 35" fill="none">
                <path d="M17.5 2.5L32.5 17.5L17.5 32.5L16.25 31.25L28.75 18.75H2.5V16.25H28.75L16.25 3.75L17.5 2.5Z" fill="white"/>
              </svg>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-2 text-red-600 text-sm px-4">
            {error}
          </div>
        )}
      </footer>
    </div>
  )
}