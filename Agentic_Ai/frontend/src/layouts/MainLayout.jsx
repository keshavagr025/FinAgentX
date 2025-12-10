import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import Navbar from '../components/Navbar'
import { 
  Home, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  Shield,
  MessageSquare,
  Bot,
  CreditCard
} from 'lucide-react'

const MainLayout = ({ children }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Chat', icon: <MessageSquare size={20} /> },
    { path: '/loan-status', label: 'Loan Status', icon: <FileText size={20} /> },
    { label: 'Dashboard', icon: <BarChart3 size={20} /> },
    { label: 'Agents', icon: <Bot size={20} /> },
    { label: 'Documents', icon: <FileText size={20} /> },
    { label: 'Settings', icon: <Settings size={20} /> },
  ]

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* <Navbar /> */}
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-xl transition-all duration-300 hidden md:block`}>
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <CreditCard className="text-blue-600" size={24} />
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <h2 className="font-bold text-lg">LoanAI</h2>
                  <p className="text-xs text-gray-500">Multi-Agent System</p>
                </div>
              )}
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item, index) => (
              item.path ? (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </Link>
              ) : (
                <button
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  {item.icon}
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </button>
              )
            ))}
          </nav>

          {/* Agent Status */}
          {!isSidebarCollapsed && (
            <div className="p-4 border-t mt-4">
              <h3 className="font-medium text-sm text-gray-500 mb-2">Agent Status</h3>
              <div className="space-y-2">
                {['Chat', 'Verification', 'Underwriting', 'Sanction'].map((agent) => (
                  <div key={agent} className="flex items-center justify-between">
                    <span className="text-sm">{agent}</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-gray-500">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute bottom-4 left-4 p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout