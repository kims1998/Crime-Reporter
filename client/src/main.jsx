import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/App.css';
import AppTest from './TestFiles/AppTest.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
    {/*<AppTest />*/}
  </StrictMode>,
)

