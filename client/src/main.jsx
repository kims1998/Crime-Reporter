import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/App.css'
import AppTest from './AppTest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTest />
  </StrictMode>,
)

