import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.jsx';
import './omnicraft.css';

gsap.registerPlugin(ScrollTrigger);

// Disable right-click
document.addEventListener('contextmenu', e => e.preventDefault());

// Disable keyboard shortcuts
document.addEventListener('keydown', e => {
  if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) e.preventDefault();
  if (e.key === 'F12') { e.preventDefault(); console.warn('🔒 Omnicraft — Access restricted.'); }
  if (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) e.preventDefault();
});

// Disable text selection outside inputs
document.addEventListener('selectstart', e => {
  if (!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) e.preventDefault();
});

// Prevent iframe embedding
if (window.self !== window.top) {
  window.top.location = window.self.location;
}

// Console warning to discourage snooping
console.log('%c🔒 OMNICRAFT', 'color: #F48C25; font-size: 32px; font-weight: 900;');
console.log('%cThis is a protected environment. Unauthorized access is not permitted.', 'color: #fff; font-size: 14px;');

// Disable print screen detection (best effort)
document.addEventListener('keyup', e => {
  if (e.key === 'PrintScreen') {
    try { navigator.clipboard.writeText(''); } catch(e) {}
    console.warn('Screenshot attempt detected.');
  }
});

// Disable image dragging globally
const observer = new MutationObserver(() => {
  document.querySelectorAll('img:not([draggable="false"])').forEach(img => {
    img.setAttribute('draggable', 'false');
  });
});
observer.observe(document.body, { childList: true, subtree: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
