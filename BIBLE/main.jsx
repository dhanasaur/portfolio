import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// IntentProvider removed — none of the section components call useIntent(),
// so wrapping the tree with it was running 3 event listeners + a 1s polling
// interval with zero consumer benefit. Remove if not planning to use.

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
