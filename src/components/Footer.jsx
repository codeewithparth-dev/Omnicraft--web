import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '5rem 2rem 120px',
      marginBottom: '0',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '350px',
        background: 'radial-gradient(ellipse, rgba(232,92,32,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Ember lines */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)', width: '60px',
        display: 'flex', gap: '12px', zIndex: 0
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: '2px',
            height: '80px',
            background: 'linear-gradient(to top, transparent, #e85c20, transparent)',
            opacity: 0,
            animation: `ember-rise 3s infinite ease-in`,
            animationDelay: `${i * 0.8}s`,
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '16px',
          marginBottom: '1.5rem',
          position: 'relative',
        }}>

          {/* Left ember lines */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', paddingBottom: '8px' }}>
            {[0, 1].map((i) => (
              <div key={i} style={{
                width: '2px',
                height: i === 0 ? '50px' : '70px',
                background: 'linear-gradient(to top, transparent, #e85c20, transparent)',
                opacity: 0,
                animation: 'ember-rise 3s infinite ease-in',
                animationDelay: `${i * 0.6}s`,
              }} />
            ))}
          </div>

          {/* Logo image */}
          <img
            src="/logo.png"
            alt="Omnicraft"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain',
            }}
          />

          {/* Right ember lines */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', paddingBottom: '8px' }}>
            {[0, 1].map((i) => (
              <div key={i} style={{
                width: '2px',
                height: i === 0 ? '70px' : '50px',
                background: 'linear-gradient(to top, transparent, #e85c20, transparent)',
                opacity: 0,
                animation: 'ember-rise 3s infinite ease-in',
                animationDelay: `${i * 0.6 + 0.3}s`,
              }} />
            ))}
          </div>

        </div>

        <h2 style={{
          color: '#ffffff', fontSize: '2rem', fontWeight: 700,
          letterSpacing: '0.12em', marginBottom: '0.5rem',
        }}>OMNICRAFT</h2>

        <p style={{
          fontStyle: 'italic', color: '#e85c20',
          fontSize: '1.05rem', marginBottom: '2.5rem',
        }}>Bold Ideas, Built Better.</p>

        <div style={{
          display: 'flex', justifyContent: 'center',
          alignItems: 'center', gap: '0.9rem', marginBottom: '3.5rem',
        }}>
          {[
            { label: 'M', href: 'mailto:codeewithparth@gmail.com' },
            { label: 'Ig', href: 'https://instagram.com/codeewithparth' },
            { label: 'Fb', href: 'https://facebook.com' },
            { label: 'X', href: 'https://x.com/codeewithparth' },
            { label: 'Dc', href: 'https://discord.com' },
          ].map((s) => (
            <a key={s.label} href={s.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                width: '46px', height: '46px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.65)', fontSize: '13px',
                fontWeight: 700, textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(232,92,32,0.2)'
                e.currentTarget.style.borderColor = '#e85c20'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >{s.label}</a>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)' }}>
            OMNICRAFT STUDIO © 2026
          </span>
          <span style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)' }}>
            ALL RIGHTS RESERVED
          </span>
        </div>

      </div>

      <style>{`
        @keyframes ember-rise {
          0% { transform: translateY(20px) scaleY(0.5); opacity: 0; }
          50% { opacity: 0.85; }
          100% { transform: translateY(-80px) scaleY(1.5); opacity: 0; }
        }
      `}</style>
    </footer>
  )
}