import { useEffect, useRef } from 'react';

export default function Footer() {
    const emberRef = useRef(null);

    useEffect(() => {
        // Create ember animation effect
        const createEmber = () => {
            const ember = document.createElement('div');
            ember.style.cssText = `
                position: absolute;
                bottom: 0;
                width: 2px;
                height: 80px;
                background: linear-gradient(to top, transparent, #e85c20, transparent);
                opacity: 0;
                animation: ember-rise 3s infinite ease-in;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 3}s;
            `;
            emberRef.current.appendChild(ember);
            
            setTimeout(() => {
                ember.remove();
            }, 3000);
        };

        const interval = setInterval(createEmber, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer style={{ 
            padding: '120px 24px 40px', 
            background: 'var(--bg)',
            borderTop: '1px solid transparent',
            borderImage: 'linear-gradient(to right, transparent, var(--accent), transparent) 1',
            textAlign: 'center', 
            position: 'relative', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            transition: 'background 0.3s ease'
        }}>
            {/* Embedded global background glow for footer */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at bottom center, var(--accent-translucent) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

            {/* Ember Lines */}
            <div ref={emberRef} style={{ position: 'relative', height: '120px', width: '100px', marginBottom: '40px', opacity: 0.8 }}>
                <div className="ember-line" style={{ left: '15%', animationDelay: '0s' }}></div>
                <div className="ember-line" style={{ left: '45%', animationDelay: '0.7s', height: '60px' }}></div>
                <div className="ember-line" style={{ left: '75%', animationDelay: '1.4s', height: '90px' }}></div>
                <div className="ember-line" style={{ left: '30%', animationDelay: '2.1s', height: '70px' }}></div>
                <div className="ember-line" style={{ left: '60%', animationDelay: '0.3s', height: '50px' }}></div>
                <div className="ember-line" style={{ left: '85%', animationDelay: '1.1s', height: '55px' }}></div>
            </div>

            <img src="/logo.png" alt="Omnicraft Studio Logo - Creative Engineering" loading="eager" width="80" height="80" style={{ width: 'clamp(60px, 10vw, 80px)', height: 'auto', marginBottom: '24px', filter: 'drop-shadow(0 0 20px var(--accent-translucent))', position: 'relative', zIndex: 2 }} draggable="false" />
            <h2 style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', color: 'var(--text)', marginBottom: '12px', position: 'relative', zIndex: 2 }}>OMNICRAFT</h2>
            <p className="font-serif" style={{ color: 'var(--accent)', fontSize: 'clamp(1.1rem, 4vw, 1.75rem)', fontStyle: 'italic', marginBottom: '48px', position: 'relative', zIndex: 2 }}>
                Bold Ideas, Built Better.
            </p>

            {/* Social Links placeholder */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '64px', position: 'relative', zIndex: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="mailto:hello@omnicraft.com" target="_blank" rel="noopener noreferrer">
                    <img src="/social-gmail.svg" alt="Email Omnicraft" width="24" height="24" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src="/social-instagram.svg" alt="View Instagram Profile" width="24" height="24" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src="/social-facebook.svg" alt="Visit Facebook Page" width="24" height="24" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src="/social-twitter.svg" alt="Follow on Twitter/X" width="24" height="24" className="social-icon" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    <img src="/social-discord.svg" alt="Join our Discord" width="24" height="24" className="social-icon" />
                </a>
            </div>

            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', position: 'relative', zIndex: 2, opacity: 0.5 }}>
                &copy; 2024 Omnicraft. All rights reserved.
            </div>

            <style>{`
                .ember-line {
                    position: absolute;
                    bottom: 0;
                    width: 2px;
                    height: 80px;
                    background: linear-gradient(to top, transparent, var(--accent), transparent);
                    opacity: 0;
                    animation: ember-rise 3s infinite ease-in;
                }

                @keyframes ember-rise {
                    0% {
                        transform: translateY(20px) scaleY(0.5);
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-80px) scaleY(1.5);
                        opacity: 0;
                    }
                }

                .social-icon {
                    transition: transform 0.3s ease, filter 0.3s ease;
                }
                
                .social-icon:hover {
                    transform: translateY(-2px);
                    filter: drop-shadow(0 0 10px var(--accent-translucent));
                }
            `}</style>
        </footer>
    );
}