import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
];

export default function BottomNav() {
  const location = useLocation();
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);
  const pillRef = useRef(null);
  const navRef = useRef(null);
  const hasAnimated = useRef(false);

  const [isLight, setIsLight] = useState(
    () => document.documentElement.classList.contains('light-theme')
  );

  // Watch theme toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light-theme'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getActiveIndex = () => {
    const idx = pages.findIndex(p => p.path === location.pathname);
    return idx >= 0 ? idx : 0;
  };

  const moveIndicator = (index) => {
    const item = itemsRef.current[index];
    if (!item || !indicatorRef.current || !pillRef.current) return;
    const pillRect = pillRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      x: itemRect.left - pillRect.left,
      width: itemRect.width,
      duration: 0.45,
      ease: 'power4.out',
      overwrite: 'auto',
    });
  };

  // Snap on mount — no animation
  useEffect(() => {
    const activeIdx = getActiveIndex();
    const item = itemsRef.current[activeIdx];
    if (item && indicatorRef.current && pillRef.current) {
      const pillRect = pillRef.current.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      gsap.set(indicatorRef.current, {
        x: itemRect.left - pillRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    }
  }, []);

  // Animate indicator on route change
  useEffect(() => {
    const timeout = setTimeout(() => moveIndicator(getActiveIndex()), 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      const activeIdx = getActiveIndex();
      const item = itemsRef.current[activeIdx];
      if (item && indicatorRef.current && pillRef.current) {
        const pillRect = pillRef.current.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        gsap.set(indicatorRef.current, {
          x: itemRect.left - pillRect.left,
          width: itemRect.width,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  // Entrance animation — once
  useEffect(() => {
    if (!hasAnimated.current && navRef.current) {
      gsap.fromTo(navRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, delay: 0.8, duration: 0.6, ease: 'power4.out' }
      );
      hasAnimated.current = true;
    }
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        opacity: 0, // starts hidden, GSAP animates in
      }}
    >
      <div
        ref={pillRef}
        onMouseLeave={() => moveIndicator(getActiveIndex())}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          padding: '6px',
          background: 'var(--bg-alt)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid var(--border)',
          borderRadius: '9999px',
          boxShadow: '0 20px 40px -10px var(--overlay-dark)',
          transition: 'background 0.3s ease, border 0.3s ease'
        }}
      >
        {/* Sliding indicator */}
        <div
          ref={indicatorRef}
          style={{
            position: 'absolute',
            top: '6px',
            left: 0,
            height: 'calc(100% - 12px)',
            background: 'var(--glass-bg)',
            border: '1px solid var(--border)',
            borderRadius: '9999px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Nav items */}
        {pages.map((page, i) => {
          const isActive = location.pathname === page.path;
          return (
            <Link
              key={page.path}
              to={page.path}
              ref={el => (itemsRef.current[i] = el)}
              onMouseEnter={() => moveIndicator(i)}
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '10px 24px',
                fontSize: '12px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                color: isActive
                  ? 'var(--text)'
                  : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {page.name}
            </Link>
          );
        })}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          nav[style] {
            bottom: 20px !important;
          }
          nav[style] a {
            padding: 9px 18px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </nav>
  );
}
