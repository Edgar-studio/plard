import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'
import ErrorBoundary from './Components/ErrorBoundary.jsx'
import { store } from './store/index.js'
import './App.css'

// Performance optimization: Create root only once
const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

const root = createRoot(container)

// Render with error boundary
root.render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
)
