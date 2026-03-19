import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ContactPopup({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setStatus('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isMounted && overlayRef.current) {
      // Entry animation
      gsap.fromTo(overlayRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power4.out' }
      );
      
      const fields = formRef.current?.querySelectorAll('.form-stagger') || [];
      if (fields.length) {
        gsap.fromTo(fields,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.1, ease: 'power2.out' }
        );
      }
    }
    
    // Cleanup escape listener
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isMounted]);

  const handleClose = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      y: 100,
      duration: 0.4,
      ease: 'power4.in',
      onComplete: () => {
        setIsMounted(false);
        onClose();
      }
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const p1 = 'codeewithparth';
    const p2 = 'gmail.com';
    const endpoint = `https://formsubmit.co/ajax/${p1}@${p2}`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _subject: "New Project Inquiry — Omnicraft",
          _captcha: "false"
        })
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isMounted) return null;

  return (
    <div 
      ref={overlayRef}
      onMouseDown={handleBackdropClick}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg)',
        opacity: 0.98,
        backdropFilter: 'blur(20px)', // Reduced from 40 for performance
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px', // Tighter for mobile
        overflowY: 'auto',
        color: 'var(--text)'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--accent), transparent)' }}></div>
      
      {/* Glow behind form — simplified for mobile */}
      <div 
        className="form-glow-bg"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          background: 'radial-gradient(circle, var(--accent-translucent) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: -1,
          opacity: 0.5
        }}
      />

      {/* Close button — more accessible on mobile */}
      <button 
        onClick={handleClose}
        aria-label="Close Contact Form"
        style={{
          position: 'absolute',
          top: 'clamp(16px, 4vw, 32px)',
          right: 'clamp(16px, 4vw, 32px)',
          background: 'none',
          border: 'none',
          color: 'var(--text)',
          fontSize: '40px',
          cursor: 'pointer',
          padding: '12px',
          lineHeight: 0.4,
          fontWeight: 200,
          opacity: 0.5,
          transition: 'all 0.3s',
          zIndex: 10
        }}
      >
        &times;
      </button>

      <div className="contact-form-container" onMouseDown={(e) => e.stopPropagation()} style={{ 
        width: '100%', 
        maxWidth: '720px', 
        position: 'relative', 
        zIndex: 1, 
        background: 'var(--glass-bg)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border)', 
        borderRadius: '1.5rem', 
        padding: 'clamp(24px, 5vw, 48px)',
        boxShadow: '0 40px 100px -20px var(--overlay-dark)',
        margin: '40px 0' // Space for scroll
      }}>
        
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 1, background: 'linear-gradient(to right, transparent, var(--accent-translucent), transparent)' }} />
        
        <div className="form-stagger" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 0.9, color: 'var(--text)' }}>
            Let's <span className="font-serif" style={{ color: 'var(--accent)', fontStyle: 'italic', textTransform: 'lowercase' }}>talk</span>
          </h2>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', color: 'var(--accent)', marginBottom: '16px' }}>✓</div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text)' }}>Message Received</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>We'll be in touch within 24 hours.</p>
            <button 
              onClick={handleClose}
              className="btn-primary"
              style={{ padding: '16px 40px', marginTop: '24px' }}
            >
              Back to site
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px' }}>
              <div className="form-group form-stagger">
                <label htmlFor="contact-name" className="contact-label">Your Name</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined form-icon" style={{ fontSize: '1.2rem' }}>person</span>
                  <input id="contact-name" type="text" name="name" required autoComplete="name" placeholder="E.g. Jane Doe" className="contact-input" />
                </div>
              </div>
              
              <div className="form-group form-stagger">
                <label htmlFor="contact-email" className="contact-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined form-icon" style={{ fontSize: '1.2rem' }}>mail</span>
                  <input id="contact-email" type="email" name="email" required autoComplete="email" placeholder="jane@company.com" className="contact-input" />
                </div>
              </div>
            </div>
            
            <div className="form-group form-stagger">
              <label htmlFor="contact-project" className="contact-label">How can we help?</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined form-icon" style={{ fontSize: '1.2rem' }}>work</span>
                <select id="contact-project" name="project" required className="contact-input" defaultValue="" style={{ paddingRight: 48, cursor: 'pointer' }}>
                  <option value="" disabled>Select an area of expertise...</option>
                  <option value="Brand Identity & Strategy">Brand Identity & Strategy</option>
                  <option value="Web Experience Design">Web Experience Design</option>
                  <option value="Frontend Engineering">Frontend Engineering</option>
                  <option value="Immersive 3D & Motion">Immersive 3D & Motion</option>
                  <option value="E-Commerce Architecture">E-Commerce Architecture</option>
                  <option value="App Design (UI/UX)">App Design (UI/UX)</option>
                  <option value="Other Inquiry">Other Inquiry</option>
                </select>
                <span className="material-symbols-outlined" style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', opacity: 0.5, fontSize: 20 }}>expand_more</span>
              </div>
            </div>
            
            <div className="form-group form-stagger">
              <label htmlFor="contact-message" className="contact-label">Tell us about your project</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined form-icon" style={{ fontSize: '1.2rem', top: 20 }}>segment</span>
                <textarea id="contact-message" name="message" required rows="4" placeholder="Describe your vision and goals." className="contact-input" style={{ resize: 'none' }}></textarea>
              </div>
            </div>

            {status === 'error' && (
              <div className="form-stagger" style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px' }}>
                Something went wrong. Please try again.
              </div>
            )}
            
            <div className="form-stagger" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20, paddingTop: 20, marginTop: 12, borderTop: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 9, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.15em' }}>
                Typically replies within<br /><span style={{ color: 'var(--text)' }}>24-48 business hours</span>
              </span>
              <button 
                type="submit" 
                className="btn-primary contact-submit-btn" 
                disabled={status === 'loading'}
                style={{ padding: '18px 40px', fontSize: 13, gap: 12 }}
              >
                <span>{status === 'loading' ? 'Sending...' : 'Send Request'}</span>
                {status !== 'loading' && <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-submit-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .form-glow-bg {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
