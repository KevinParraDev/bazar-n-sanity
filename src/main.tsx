import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { EconomyProvider } from './context/EconomyContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EconomyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EconomyProvider>
  </StrictMode>,
)
