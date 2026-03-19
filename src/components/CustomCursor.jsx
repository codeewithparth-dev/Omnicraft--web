import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'true';
    
    // Select all interactive elements
    const updateHoverState = () => {
      const interactables = document.querySelectorAll('a, button, input, select, textarea, .hover-target');
      
      const handleEnter = () => setIsHovering(true);
      const handleLeave = () => setIsHovering(false);

      interactables.forEach(el => {
        el.style.cursor = 'none'; // Ensure default cursor is hidden on children too
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });

      return () => {
        interactables.forEach(el => {
          el.removeEventListener('mouseenter', handleEnter);
          el.removeEventListener('mouseleave', handleLeave);
        });
      };
    };

    const cleanupHover = updateHoverState();

    // Observe DOM for new interactables (useful for React)
    const observer = new MutationObserver(() => {
      cleanupHover();
      updateHoverState();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Move cursor with GSAP for magnetic delay
    const cursor = document.getElementById('custom-cursor');
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.35; // magnetic delay feel

    const xSet = gsap.quickSetter(cursor, 'x', 'px');
    const ySet = gsap.quickSetter(cursor, 'y', 'px');

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    gsap.ticker.add(() => {
      // Lerp for smooth follow
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cleanupHover();
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '12px',
        height: '12px',
        backgroundColor: isHovering ? 'rgba(244,140,37,0.8)' : '#fff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 10000,
        mixBlendMode: 'difference',
        transform: `scale(${isHovering ? 3.33 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
      }}
    />
  );
}
