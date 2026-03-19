import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition({ children }) {
  const location = useLocation();
  const transitionOverlayRef = useRef(null);
  const prevPath = useRef(location.pathname);
  const containerRef = useRef(null);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      // Path changed, trigger transition
      
      const tl = gsap.timeline();
      
      // Black overlay fades in
      tl.to(transitionOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
        pointerEvents: 'auto',
      })
      // Swap content (React will do this immediately, but we hide it via overlay)
      .call(() => {
        prevPath.current = location.pathname;
        if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      })
      // Black overlay fades out revealing new page
      .to(transitionOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      });
    }
  }, [location.pathname]);

  return (
    <>
      <div 
        ref={transitionOverlayRef} 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000',
          zIndex: 99999, // below cursor, above everything else
          opacity: 0,
          pointerEvents: 'none'
        }} 
      />
      <div ref={containerRef}>
        {children}
      </div>
    </>
  );
}
