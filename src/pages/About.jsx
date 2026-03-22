import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamCarousel from '../components/TeamCarousel.jsx';
import SEO from '../components/SEO.jsx';
import Footer from '../components/Footer.jsx';

const services = [
    { title: 'UI/UX Design', desc: 'Spatial interfaces that prioritize clarity and immersion.' },
    { title: 'Web Engineering', desc: 'High-performance architectures built for scale and speed.' },
    { title: 'Brand Identity', desc: 'Defining the visual DNA of the next generation of brands.' },
    { title: 'Motion & 3D', desc: 'Cinematic interactions that bring digital spaces to life.' },
    { title: 'E-Commerce', desc: 'Seamless platforms bridging storytelling with conversion.' },
    { title: 'Strategy', desc: 'Roadmaps designed to position your brand for long-term scalability.' },
];

export default function About() {
    const sectionRef = useRef(null);
    const [isLight, setIsLight] = useState(
        () => document.documentElement.classList.contains('light-theme')
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsLight(document.documentElement.classList.contains('light-theme'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // General reveal
            gsap.utils.toArray('.reveal').forEach((el) => {
                gsap.to(el, {
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                    opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
                });
            });

            // Parallax scroll for Vision block
            gsap.to('.vision-parallax', {
                y: -120, // animates upward smoothly as user scrolls
                ease: 'none',
                scrollTrigger: {
                    trigger: '#vision-section',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef}>
            <SEO 
                title="About Us — Omnicraft Creative Agency" 
                description="Learn about Omnicraft, who we are, our mission, what we believe in, and how we work with clients to build exceptional digital products and premium experiences." 
                url="/about"
            />
            {/* BLOCK 1: Intro Text */}
            <section style={{ position: 'relative', padding: 'clamp(100px, 15vh, 160px) 16px 40px', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
                <span className="reveal section-label" style={{ display: 'block', marginBottom: 20 }}>The Studio</span>
                <p className="reveal" style={{ fontSize: 'clamp(1rem, 4.5vw, 1.5rem)', color: 'var(--text-muted)', maxWidth: 860, lineHeight: 1.6, fontWeight: 500, margin: '0 auto' }}>
                    We are a collective of designers, engineers, and strategists working at the intersection of aesthetics and high-performance technology.
                </p>
            </section>

            {/* BLOCK 2: OUR VISION */}
            <section id="vision-section" style={{ padding: '60px 16px clamp(100px, 15vh, 160px)', textAlign: 'center' }}>
                <div className="vision-parallax" style={{ maxWidth: 850, margin: '0 auto' }}>
                    <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'var(--accent)', fontSize: '0.8rem' }}>Our Vision</span>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 32 }}>
                        OUR VISION
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 4vw, 1.25rem)', lineHeight: 1.7, fontWeight: 400 }}>
                        We believe the best digital experiences don't just look good — they feel inevitable. Omnicraft exists to close the gap between what brands imagine and what users actually experience. Our vision is a world where craft and code are inseparable, where every pixel serves a purpose, and where the work we do outlasts the trends that inspired it.
                    </p>
                    
                    <Link 
                        to="/story"
                        style={{
                            display: 'inline-block',
                            marginTop: '2.5rem',
                            padding: '0.75rem 2rem',
                            border: '1.5px solid #F48C25',
                            borderRadius: '50px',
                            color: isLight ? '#F48C25' : '#e85c20',
                            fontSize: '1rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'all 0.3s ease',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #F48C25, #F48C25)';
                            e.target.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = isLight ? '#F48C25' : '#e85c20';
                        }}
                    >
                        Discover How We Got Here →
                    </Link>
                </div>
            </section>

            {/* BLOCK 3: OUR SERVICES */}
            <section style={{ padding: 'clamp(60px, 10vh, 100px) 16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <span className="reveal section-label" style={{ display: 'block', marginBottom: 20 }}>Our Services</span>
                    <h2 className="reveal" style={{ fontSize: 'clamp(2.2rem, 7vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 40 }}>
                        WHAT WE DO
                    </h2>
                    <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px 48px' }}>
                        {services.map(service => (
                            <div key={service.title} style={{ paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 8, color: 'var(--text)' }}>
                                    {service.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* BLOCK 4: OUR TEAM */}
            <section style={{ 
                padding: '120px 0', 
                background: 'var(--bg-alt)',
                backgroundImage: 'radial-gradient(circle at center, var(--accent-translucent) 0%, transparent 60%)',
                textAlign: 'center', 
                overflow: 'hidden',
                transition: 'background 0.3s ease'
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                    <span className="reveal section-label" style={{ display: 'block', marginBottom: 24 }}>Our Team</span>
                    <h2 className="reveal" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 64, color: 'var(--text)' }}>
                        OUR TEAM
                    </h2>
                </div>
                <div className="reveal">
                    <TeamCarousel />
                </div>
            </section>

            <Footer />

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

                .hover-accent {
                    transition: color 0.3s ease;
                }
                .hover-accent:hover {
                    color: var(--accent) !important;
                }
            `}</style>
        </div>
    );
}
