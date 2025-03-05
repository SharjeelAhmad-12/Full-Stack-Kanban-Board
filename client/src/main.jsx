import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from "./contextApi/AuthContext.jsx";
import { TaskProvider } from "./contextApi/TaskContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <TaskProvider>
      <App />
      </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
