import { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import DocumentUploader from '../components/DocumentUploader'
// import LoanSummaryCard from '../components/LoanSummaryCard'
import { Bot, Zap, Shield, CheckCircle } from 'lucide-react'

const Home = () => {
  const [activeView, setActiveView] = useState('chat')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Loan Assistant</h1>
          <p className="text-gray-600 mt-2">Powered by multi-agent system for intelligent loan processing</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Bot className="text-blue-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Agents</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Approved Loans</p>
              <p className="text-2xl font-bold">28</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Zap className="text-purple-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Processing Time</p>
              <p className="text-2xl font-bold">24m</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Shield className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Chat with Loan Assistant</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setActiveView('chat')}
                  className={`px-4 py-2 rounded-lg ${activeView === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Chat
                </button>
                <button 
                  onClick={() => setActiveView('documents')}
                  className={`px-4 py-2 rounded-lg ${activeView === 'documents' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Documents
                </button>
              </div>
            </div>
            
            {activeView === 'chat' ? (
              <ChatWindow />
            ) : (
              <DocumentUploader />
            )}
          </div>
        </div>

        {/* Loan Summary */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* <LoanSummaryCard /> */}
            
            {/* Agent Status */}
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Agent Status</h3>
              <div className="space-y-3">
                {[
                  { name: 'Chat Agent', status: 'active', color: 'bg-blue-500' },
                  { name: 'Verification', status: 'active', color: 'bg-yellow-500' },
                  { name: 'Underwriting', status: 'processing', color: 'bg-purple-500' },
                  { name: 'Sanction', status: 'idle', color: 'bg-green-500' },
                  { name: 'Document', status: 'active', color: 'bg-pink-500' }
                ].map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 ${agent.color} rounded-full mr-3`}></div>
                      <span className="font-medium">{agent.name}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' :
                      agent.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary py-3">
                  Start New Application
                </button>
                <button className="w-full btn-secondary py-3">
                  Check Eligibility
                </button>
                <button className="w-full btn-secondary py-3">
                  Upload Documents
                </button>
                <button className="w-full btn-secondary py-3">
                  Track Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home