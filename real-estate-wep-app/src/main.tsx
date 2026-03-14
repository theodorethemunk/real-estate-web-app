import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

// Client CSS
import './assets/client/css/main.css';

// Admin CSS
import './assets/admin/css/bootstrap.min.css';
import './assets/admin/css/icons.min.css';
import './assets/admin/css/app.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
