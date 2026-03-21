import { useState, useEffect, useRef } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Parth Kishan',
    role: 'Frontend & UI/UX Designer' +'Founder',
    bio: 'Shapes brands that move people. 10+ years at the intersection of art and strategy. Alex believes every brand has a story worth telling — his job is to make sure the world listens.',
    portfolio: '#',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&q=80&fm=webp&fit=crop',
    status: 'active',
  },
  {
    id: 2,
    name: 'Zara Chen',
    role: 'Lead Engineer',
    bio: 'Turns wild ideas into pixel-perfect, blazing-fast digital experiences. Specializes in React, Three.js, and making the impossible feel obvious.',
    portfolio: '#',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&q=80&fm=webp&fit=crop',
    status: 'active',
  },
  {
    id: 3,
    name: 'Marcus Webb',
    role: 'Motion Designer',
    bio: 'Every pixel should earn its place. Marcus crafts motion that feels inevitable, never decorative — animation that serves the story, not the showreel.',
    portfolio: '#',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&q=80&fm=webp&fit=crop',
    status: 'joining',
  },
  {
    id: 4,
    name: 'Priya Nair',
    role: 'Brand Strategist',
    bio: 'Decodes what makes people fall in love with a brand, then builds exactly that. Priya turns research into direction and direction into identity.',
    portfolio: '#',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&q=80&fm=webp&fit=crop',
    status: 'joining',
  },
  {
    id: 5,
    name: 'Jordan Kim',
    role: 'UX Architect',
    bio: 'Designs systems that feel effortless. If users notice the interface, it needs more work. Jordan\'s goal: invisible design with undeniable impact.',
    portfolio: '#',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&q=80&fm=webp&fit=crop',
    status: 'active',
  }
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, currentIndex]);

  const getCardStyle = (index) => {
    const isMobile = window.innerWidth <= 640;
    let offset = index - currentIndex;
    if (offset < -2) offset += teamMembers.length;
    if (offset > 2) offset -= teamMembers.length;

    // Center card
    if (offset === 0) {
      return {
        transform: 'translateX(-50%) scale(1)',
        opacity: 1,
        zIndex: 10,
        filter: 'blur(0px)',
        pointerEvents: 'auto'
      };
    }

    // Mobile: hide side cards
    if (isMobile) {
      return {
        transform: `translateX(-50%) translateX(${offset * 100}vw) scale(0.8)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none'
      };
    }

    // Desktop: side cards
    const direction = offset > 0 ? 1 : -1;
    const absOffset = Math.abs(offset);
    
    if (absOffset === 1) {
      return {
        transform: `translateX(-50%) translateX(${direction * 220}px) scale(0.78)`,
        opacity: 0.35,
        zIndex: 5,
        filter: 'blur(4px)',
        pointerEvents: 'none'
      };
    }

    // Hide others
    return {
      transform: `translateX(-50%) translateX(${direction * 400}px) scale(0.5)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none'
    };
  };

  return (
    <div 
      className="carousel-container"
      style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0', perspective: '1200px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ position: 'relative', width: '100%', height: '400px', maxWidth: '1000px', overflow: 'hidden' }}>
        {teamMembers.map((member, index) => {
          const style = getCardStyle(index);
          return (
            <div
              key={member.id}
              className="team-card-wrapper"
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '300px',
                height: '400px',
                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                ...style
              }}
            >
              <div 
                className="team-card-inner" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  position: 'relative', 
                  transition: 'transform 0.7s', 
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer'
                }}
              >
                {/* FRONT FACE */}
                <div 
                  className="team-card-front" 
                  style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {/* Joining Soon badge - front */}
                  {member.status === 'joining' && (
                    <div style={{
                      position: 'absolute', top: '12px', left: '12px', zIndex: 3,
                      background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                      padding: '4px 10px', borderRadius: '999px',
                      fontSize: '10px', color: '#f70000ff', textTransform: 'uppercase',
                      letterSpacing: '0.12em', fontWeight: 700,
                      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                    }}>
                      Joining Soon
                    </div>
                  )}
                  <img src={member.image} alt={`Portrait of ${member.name}, ${member.role} at Omnicraft`} loading="lazy" width="300" height="400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable="false" />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(8,6,6,0.9), transparent)' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{member.name}</h3>
                    <p style={{ color: '#F48C25', margin: '4px 0 0 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{member.role}</p>
                  </div>
                </div>

                {/* BACK FACE */}
                <div 
                  className="team-card-back" 
                  style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: '24px',
                    background: 'rgba(20,20,20,0.95)',
                    border: '1px solid rgba(244,140,37,0.3)',
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Joining Soon badge - back */}
                  {member.status === 'joining' && (
                    <div style={{
                      position: 'absolute', top: '12px', left: '12px', zIndex: 3,
                      background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                      padding: '4px 10px', borderRadius: '999px',
                      fontSize: '9px', color: '#fff', textTransform: 'uppercase',
                      letterSpacing: '0.12em', fontWeight: 700,
                    }}>
                      Joining Soon
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{member.name}</h3>
                    <div style={{ display: 'inline-block', background: 'rgba(244,140,37,0.15)', color: '#F48C25', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, marginTop: '8px' }}>
                      {member.role}
                    </div>
                    <p style={{ marginTop: '24px', color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>
                      {member.bio}
                    </p>
                  </div>
                  
                  {member.status === 'joining' ? (
                    <div style={{ position: 'relative' }} className="joining-btn-wrap">
                      <button
                        disabled
                        style={{
                          width: '100%', padding: '14px 0',
                          background: '#F48C25', color: '#000',
                          borderRadius: '999px', textAlign: 'center',
                          textTransform: 'uppercase', fontWeight: 800,
                          fontSize: '13px', border: 'none',
                          opacity: 0.4, cursor: 'not-allowed',
                        }}
                      >
                        See Work →
                      </button>
                      <span className="joining-tooltip">Coming soon</span>
                    </div>
                  ) : (
                    <a 
                      href={member.portfolio}
                      className="btn-primary"
                      style={{ width: '100%', padding: '14px 0', background: '#F48C25', color: '#000', borderRadius: '999px', textAlign: 'center', textTransform: 'uppercase', fontWeight: 800, fontSize: '13px', display: 'block', textDecoration: 'none' }}
                    >
                      See Work &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div style={{ position: 'absolute', bottom: '-40px', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
        <button 
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', color: '#fff', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; setIsPaused(true); }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; setIsPaused(false); }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {teamMembers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: currentIndex === idx ? '#F48C25' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: 0
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            />
          ))}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', color: '#fff', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; setIsPaused(true); }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; setIsPaused(false); }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
        </button>
      </div>

      <style>{`
        .team-card-wrapper {
          /* Setup flip animation for desktop hover or mobile tap */
        }
        .team-card-wrapper:hover .team-card-inner {
          transform: rotateY(180deg);
        }
        /* Touch devices */
        @media (hover: none) {
          .team-card-wrapper:active .team-card-inner {
            transform: rotateY(180deg);
          }
        }
        /* Tooltip for joining-soon button */
        .joining-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: rgba(0,0,0,0.85);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 14px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .joining-btn-wrap:hover .joining-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>
    </div>
  );
}
