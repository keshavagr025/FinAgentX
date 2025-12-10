import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { chatService } from '../services/chatService'

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      agent: 'chat',
      text: "Hello! I'm your AI Loan Assistant. 🤖\n\nI can help you with:\n• **Loan applications**\n• **Eligibility checks**\n• **Document verification**\n• **Interest rate queries**\n• **Application tracking**\n\nHow can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metadata: { type: 'welcome' }
    }
  ])
  
  const [isLoading, setIsLoading] = useState(false)
  const [agentStatus, setAgentStatus] = useState({
    chat: 'active',
    verification: 'idle',
    underwriting: 'idle',
    sanction: 'idle',
    document: 'idle'
  })

  const suggestedQuestions = [
    "What documents do I need for a personal loan?",
    "What's the current interest rate for home loans?",
    "How do I check my loan eligibility?",
    "Can I get a loan pre-approval?",
    "What's the maximum loan amount I can get?",
    "How long does approval take?"
  ]

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Simulate API call
      const response = await chatService.sendMessage(text)
      
      // Update agent status based on response
      if (response.agent) {
        setAgentStatus(prev => ({
          ...prev,
          [response.agent]: 'active',
          chat: response.agent !== 'chat' ? 'idle' : 'active'
        }))
        
        if (response.agent !== 'chat') {
          toast.success(`Transferred to ${response.agent} agent`)
        }
      }

      // Add bot response
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        agent: response.agent || 'chat',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: response.metadata,
        status: response.status,
        actions: response.actions
      }

      setMessages(prev => [...prev, botMessage])

    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
      
      const errorMessage = {
        id: messages.length + 2,
        sender: 'bot',
        agent: 'system',
        text: "I apologize, but I'm having trouble processing your request. Please try again or contact support.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: { error: true }
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages.length])

  const clearChat = useCallback(() => {
    setMessages([{
      id: 1,
      sender: 'bot',
      agent: 'chat',
      text: "Hello! I'm your AI Loan Assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    toast.success('Chat cleared')
  }, [])

  return {
    messages,
    sendMessage,
    isLoading,
    suggestedQuestions,
    agentStatus,
    clearChat
  }
}