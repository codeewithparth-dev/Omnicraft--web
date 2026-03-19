import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: 48, suffix: '+', label: 'Projects Completed' },
  { value: 12, suffix: '+', label: 'Global Clients' },
  { value: 3, suffix: ' Years', label: 'In Business' },
];

export default function NumberCounters() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray('.stat-number');
      
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2; // seconds

        gsap.to(counter, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          innerHTML: target,
          duration: duration,
          snap: { innerHTML: 1 },
          ease: 'power3.out',
          modifiers: {
            innerHTML: function(value) {
              return Math.round(value);
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '80px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '48px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="reveal" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, marginBottom: '8px' }}>
              <span className="stat-number" data-target={stat.value}>0</span>
              {stat.suffix}
            </h3>
            <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: 700 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
