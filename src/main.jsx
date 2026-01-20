import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IntentProvider } from './context/IntentContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IntentProvider>
      <App />
    </IntentProvider>
  </StrictMode>,
)
