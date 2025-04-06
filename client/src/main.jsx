import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import RecipeContextProvider from './context/RecipeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecipeContextProvider>
    <App />
    </RecipeContextProvider>
  </BrowserRouter>
)
