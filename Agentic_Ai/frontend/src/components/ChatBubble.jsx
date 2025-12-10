import { Bot, User, CheckCircle, AlertCircle, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user'
  const agentIcons = {
    chat: '🤖',
    verification: '🔍',
    underwriting: '📊',
    sanction: '✅',
    document: '📄',
    system: '⚙️'
  }

  const agentColors = {
    chat: 'agent-chat',
    verification: 'agent-verification',
    underwriting: 'agent-underwriting',
    sanction: 'agent-sanction',
    document: 'agent-document',
    system: 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle size={14} className="text-green-500" />
      case 'rejected': return <AlertCircle size={14} className="text-red-500" />
      case 'pending': return <FileText size={14} className="text-yellow-500" />
      default: return null
    }
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'} max-w-[85%]`}>
        {/* Message Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {!isUser && (
              <>
                <span className="text-lg">{agentIcons[message.agent] || '🤖'}</span>
                <span className={`agent-badge ${agentColors[message.agent] || 'bg-gray-100 text-gray-800'}`}>
                  {message.agent || 'System'} Agent
                </span>
              </>
            )}
            {isUser && <User size={16} className="text-blue-200" />}
          </div>
          <span className="text-xs opacity-75">{message.timestamp}</span>
        </div>

        {/* Message Content */}
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>

        {/* Message Footer */}
        {(message.status || message.metadata) && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            {message.status && (
              <div className="flex items-center text-sm">
                {getStatusIcon(message.status)}
                <span className="ml-2 capitalize">{message.status}</span>
              </div>
            )}
            {message.metadata && (
              <div className="text-xs text-gray-500 mt-1">
                {Object.entries(message.metadata).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Suggested Actions */}
        {message.actions && (
          <div className="mt-3 space-y-2">
            {message.actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 transition"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatBubble