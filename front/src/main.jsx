import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext.jsx'
import { ChatProvider } from '../context/ChatContext.jsx'
  //  in main chatProvider not context 
  
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <AuthProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
)
