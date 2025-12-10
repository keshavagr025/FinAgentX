import { useState } from 'react'
import { Send, Paperclip, Mic, Smile, Loader2 } from 'lucide-react'

const UserInput = ({ value, onChange, onSend, isLoading }) => {
  const [isRecording, setIsRecording] = useState(false)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Handle file upload
      console.log('File selected:', file.name)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Ask about loans, documents, eligibility, etc.)"
            className="input-field resize-none min-h-[80px] max-h-[120px]"
            disabled={isLoading}
            rows={3}
          />
          
          {/* Input Actions */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition">
                <Paperclip size={20} className="text-gray-500" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
              <button 
                className={`p-2 hover:bg-gray-100 rounded-lg transition ${isRecording ? 'text-red-500' : 'text-gray-500'}`}
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500">
                <Smile size={20} />
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>

        <button
          onClick={onSend}
          disabled={isLoading || !value.trim()}
          className="btn-primary h-[80px] px-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute -top-12 left-0 right-0 bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-700 font-medium">Recording...</span>
            </div>
            <button
              onClick={() => setIsRecording(false)}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInput