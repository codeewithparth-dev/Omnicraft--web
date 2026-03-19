import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgress() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to('#scroll-progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2
      }
    });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      <div
        id="scroll-progress-bar"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#F48C25',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          boxShadow: '0 0 10px rgba(244,140,37,0.5)'
        }}
      />
    </div>
  );
}
