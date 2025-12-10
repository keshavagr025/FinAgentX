import { useState, useRef, useEffect } from 'react'
import ChatBubble from './ChatBubble'
import UserInput from './UserInput'
import { useChat } from '../hooks/useChat'
import { Bot, Send, Loader2, Sparkles } from 'lucide-react'

const ChatWindow = () => {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    suggestedQuestions,
    agentStatus 
  } = useChat()
  
  const messagesEndRef = useRef(null)
  const [inputMessage, setInputMessage] = useState('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputMessage.trim()) return
    await sendMessage(inputMessage)
    setInputMessage('')
  }

  const handleQuickQuestion = async (question) => {
    setInputMessage(question)
    await sendMessage(question)
    setInputMessage('')
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Bot className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Multi-Agent Chat System</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {Object.entries(agentStatus).map(([agent, status]) => (
                  <div
                    key={agent}
                    className={`w-2 h-2 rounded-full mx-0.5 ${
                      status === 'active' ? 'bg-green-500' :
                      status === 'processing' ? 'bg-yellow-500' :
                      'bg-gray-300'
                    }`}
                    title={`${agent}: ${status}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {Object.values(agentStatus).filter(s => s === 'active').length} agents active
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sparkles size={20} className="text-yellow-500" />
          <span className="text-sm text-gray-600">AI Powered</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Bot size={48} className="mb-4 text-gray-300" />
            <p className="text-lg">Start a conversation with your AI loan assistant</p>
            <p className="text-sm mt-2">Ask about loans, eligibility, documents, or interest rates</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="chat-bubble bot-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="mt-4">
        <UserInput
          value={inputMessage}
          onChange={setInputMessage}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ChatWindow