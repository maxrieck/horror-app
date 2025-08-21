import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { InventoryProvider } from './context/InventoryProvider';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventoryProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </InventoryProvider>
  </React.StrictMode>
);
