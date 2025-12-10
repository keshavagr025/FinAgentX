import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  }
})

export const chatService = {
  async sendMessage(message) {
    // For demo purposes - simulate API response
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = {
          'document': {
            text: "I understand you want to know about required documents. Here's what you need:\n\n**Required Documents:**\n1. PAN Card\n2. Aadhaar Card\n3. Bank Statements (6 months)\n4. Salary Slips (3 months)\n5. Address Proof\n\nWould you like me to help you upload these documents?",
            agent: 'document',
            metadata: { type: 'documents_info' },
            actions: [
              { label: 'Upload Documents Now', onClick: () => console.log('Upload clicked') }
            ]
          },
          'eligibility': {
            text: "To check your eligibility, I'll need some basic information. Based on your query, I'm connecting you to the **Underwriting Agent** for a detailed assessment.\n\n**Note:** The underwriting agent will analyze your financial documents and provide an eligibility score.",
            agent: 'underwriting',
            metadata: { type: 'eligibility_check' }
          },
          'interest': {
            text: "**Current Interest Rates:**\n\n• Personal Loan: 10.5% - 18%\n• Home Loan: 8.4% - 11%\n• Car Loan: 8.5% - 12%\n• Education Loan: 9% - 13%\n\nRates vary based on credit score, loan amount, and tenure. Would you like me to check which rate you qualify for?",
            agent: 'chat',
            metadata: { type: 'interest_rates', updated: 'Jan 2024' }
          },
          'loan': {
            text: "Great! Let's start your loan application. I'll guide you through the process step-by-step.\n\nFirst, let me verify your identity. Please upload your PAN card for verification.",
            agent: 'verification',
            metadata: { type: 'loan_application', step: 1 },
            actions: [
              { label: 'Upload PAN Card', onClick: () => console.log('PAN upload') },
              { label: 'Check Eligibility First', onClick: () => console.log('Eligibility check') }
            ]
          },
          'status': {
            text: "To check your application status, I need your application reference number. If you don't have it, I can look it up using your phone number or email.",
            agent: 'chat',
            metadata: { type: 'status_check' }
          },
          'default': {
            text: "Thank you for your message. I understand you're interested in our loan services. Let me connect you with the appropriate agent who can help you better.",
            agent: 'chat',
            metadata: { type: 'general_query' }
          }
        }

        const lowerMessage = message.toLowerCase()
        let response = responses.default

        if (lowerMessage.includes('document') || lowerMessage.includes('upload')) {
          response = responses.document
        } else if (lowerMessage.includes('eligibility') || lowerMessage.includes('approve')) {
          response = responses.eligibility
        } else if (lowerMessage.includes('interest') || lowerMessage.includes('rate')) {
          response = responses.interest
        } else if (lowerMessage.includes('loan') && lowerMessage.includes('apply')) {
          response = responses.loan
        } else if (lowerMessage.includes('status') || lowerMessage.includes('track')) {
          response = responses.status
        }

        resolve(response)
      }, 1500) // Simulate network delay
    })

    // Real API call (uncomment when backend is ready)
    // const response = await api.post('/chat', { message })
    // return response.data
  },

  async getChatHistory(sessionId) {
    const response = await api.get(`/chat/history/${sessionId}`)
    return response.data
  },

  async uploadDocument(file, type) {
    const formData = new FormData()
    formData.append('document', file)
    formData.append('type', type)

    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    return response.data
  }
}