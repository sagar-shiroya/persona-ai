import { useState } from 'react'
import { type PersonaType } from '../lib/personas'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
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
  const [currentPersona] = useState<PersonaType>('hitesh') // Default persona, will be configurable in future story

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
        timestamp: new Date()
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
        timestamp: new Date()
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

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="p-6 bg-white border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800">Persona AI Chat</h1>
      </header>

      {/* Message Area */}
      <main className="flex-1">
        <div className="message-area min-h-96">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Start a conversation with an AI persona</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === 'user' ? 'message-user' : 'message-assistant'
                }`}
              >
                {message.text}
              </div>
            ))
          )}
          {isLoading && (
            <div className="message message-assistant opacity-75">
              <div className="flex items-center space-x-2">
                <div className="animate-pulse">Thinking...</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="input-area">
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isLoading ? "AI is thinking..." : "Message..."}
            className="modern-input"
            disabled={isLoading}
            aria-label="Message input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="send-icon-button"
            aria-label="Send message"
          >
            {isLoading ? '⏳' : '↑'}
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