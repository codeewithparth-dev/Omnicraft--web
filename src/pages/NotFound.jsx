import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#080606',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ember particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="ember-particle"
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: `${5 + Math.random() * 90}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${40 + Math.random() * 60}px`,
              background: 'linear-gradient(to top, transparent, #F48C25, transparent)',
              opacity: 0,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(244,140,37,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* 404 */}
      <h1
        style={{
          fontSize: 'clamp(8rem, 20vw, 16rem)',
          fontWeight: 900,
          color: '#F48C25',
          lineHeight: 0.9,
          margin: 0,
          position: 'relative',
          zIndex: 2,
          textShadow: '0 0 80px rgba(244,140,37,0.3)',
        }}
      >
        404
      </h1>

      {/* Heading */}
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          color: '#fff',
          margin: '16px 0 0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        You're Lost.
      </h2>

      {/* Subtext */}
      <p
        style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
          maxWidth: '420px',
          lineHeight: 1.7,
          margin: '16px 0 40px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        This page doesn't exist. Let's get you back.
      </p>

      {/* Back button */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: '#F48C25',
          color: '#080606',
          padding: '16px 36px',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 4px 30px rgba(244,140,37,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 40px rgba(244,140,37,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 30px rgba(244,140,37,0.3)';
        }}
      >
        <span>←</span> Back to Home
      </Link>

      <style>{`
        .ember-particle {
          animation: ember-float infinite ease-in;
        }
        @keyframes ember-float {
          0% {
            transform: translateY(0) scaleY(0.5);
            opacity: 0;
          }
          30% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) scaleY(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
