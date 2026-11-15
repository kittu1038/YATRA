import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import { TripProvider } from './context/TripContext.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <TripProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1A211D',
                  color: '#F5F5F0',
                  border: '1px solid #2A342B',
                  borderRadius: '0px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#ACC8A2',
                    secondary: '#101512',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#F87171',
                    secondary: '#101512',
                  },
                },
              }}
            />
          </TripProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
