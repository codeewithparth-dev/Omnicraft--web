import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out entire screen
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => onComplete(),
        });
      },
    });

    // Logo animates in
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power4.out' }
    );

    // Loading bar fills
    tl.to(
      barRef.current,
      { scaleX: 1, duration: 1.5, ease: 'power2.inOut' },
      '-=0.3' // slight overlap
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#080606',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
      }}
    >
      {/* Logo */}
      <div ref={logoRef} style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <img
          src="/logo.png"
          alt="Omnicraft Studio Logo - Loading..."
          width="80"
          height="80"
          style={{
            width: '72px',
            height: 'auto',
            filter: 'drop-shadow(0 0 30px rgba(244,140,37,0.4))',
          }}
          draggable="false"
        />
        <span
          style={{
            fontSize: '1.6rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: '#fff',
          }}
        >
          Omnicraft
        </span>
      </div>

      {/* Loading bar container */}
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            width: '100%',
            height: '100%',
            background: '#F48C25',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            borderRadius: '999px',
            boxShadow: '0 0 12px rgba(244,140,37,0.5)',
          }}
        />
      </div>
    </div>
  );
}
