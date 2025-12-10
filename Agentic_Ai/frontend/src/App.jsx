import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
// import LoanStatus from './pages/LoanStatus'
// import './styles/globals.css'

function App() {
  return (
    <Router>
      <MainLayout>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/loan-status" element={<LoanStatus />} /> */}
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App