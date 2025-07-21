import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { EconomyProvider } from './context/EconomyContext.tsx'
import { InventoryProvider } from './context/InventoryContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <EconomyProvider>
        <InventoryProvider>
          <App />
        </InventoryProvider>
      </EconomyProvider>
    </AuthProvider>
  </BrowserRouter>,
)
