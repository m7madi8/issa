import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { useLenisScroll } from './hooks/useLenisScroll';

function RootWithScroll() {
  useLenisScroll();
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootWithScroll />
  </StrictMode>,
);
