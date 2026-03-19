import { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO.jsx';
import MarqueeTicker from '../components/MarqueeTicker.jsx';

function HeroFireBg() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false }); // Better performance

        const isMobile = window.innerWidth < 768;
        const grainSize = isMobile ? 256 : 512; // Smaller grain on mobile
        const grainCanvas = document.createElement('canvas');
        grainCanvas.width = grainSize;
        grainCanvas.height = grainSize;
        const gctx = grainCanvas.getContext('2d');
        const imgData = gctx.createImageData(grainSize, grainSize);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 255;
            imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
            imgData.data[i + 3] = 40; // Lower opacity grain
        }
        gctx.putImageData(imgData, 0, 0);

        let animId;
        let t = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            if (w === 0 || h === 0) {
                animId = requestAnimationFrame(draw);
                return;
            }
            t += 0.005;

            ctx.fillStyle = '#080606'; // Match var(--bg)
            ctx.fillRect(0, 0, w, h);

            const baseY = h * 0.50;
            const wave1 = Math.sin(t * 1.0) * h * 0.07;
            const wave2 = Math.sin(t * 0.7 + 1.5) * h * 0.05;
            
            const strips = isMobile ? 40 : 80; // Fewer strips on mobile
            const stripW = (w / strips) + 1;

            for (let i = 0; i <= strips; i++) {
                const xFrac = i / strips;
                const x = xFrac * w;
                const localWave =
                    Math.sin(xFrac * Math.PI * 2 + t * 1.2) * h * 0.08 +
                    Math.sin(xFrac * Math.PI * 3 - t * 0.8) * h * 0.05;
                const cy = baseY + wave1 + wave2 + localWave;
                const edgeFalloff = Math.sin(xFrac * Math.PI);
                const fireH = (h * 0.28 + h * 0.10 * edgeFalloff);
                
                const r1 = xFrac < 0.5 ? 255 : 220;
                const g1 = xFrac < 0.5 ? 100 : 50;

                const topGrad = ctx.createLinearGradient(0, cy - fireH, 0, cy);
                topGrad.addColorStop(0, `rgba(${r1},${g1},0,0)`);
                topGrad.addColorStop(0.5, `rgba(${r1},${g1},0,0.1)`);
                topGrad.addColorStop(1, `rgba(200,40,0,0.8)`);
                ctx.fillStyle = topGrad;
                ctx.fillRect(x, cy - fireH, stripW, fireH);

                const botGrad = ctx.createLinearGradient(0, cy, 0, cy + fireH * 0.6);
                botGrad.addColorStop(0, `rgba(180,25,0,0.7)`);
                botGrad.addColorStop(1, `rgba(0,0,0,0)`);
                ctx.fillStyle = botGrad;
                ctx.fillRect(x, cy, stripW, fireH * 0.6);
            }

            // Global Overlays
            const botFade = ctx.createLinearGradient(0, h * 0.72, 0, h);
            botFade.addColorStop(0, 'rgba(0,0,0,0)');
            botFade.addColorStop(1, '#080606');
            ctx.fillStyle = botFade;
            ctx.fillRect(0, 0, w, h);

            // Grain
            ctx.globalAlpha = 0.1;
            ctx.globalCompositeOperation = 'screen';
            for (let tx = 0; tx < w; tx += grainSize) {
                for (let ty = 0; ty < h; ty += grainSize) {
                    ctx.drawImage(grainCanvas, tx, ty);
                }
            }
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                display: 'block', zIndex: 0,
            }}
        />
    );
}

export default function Home() {
    const mainRef = useRef(null);
    const [isLight, setIsLight] = useState(
        () => document.documentElement.classList.contains('light-theme')
    );

    // Watch for theme changes
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsLight(document.documentElement.classList.contains('light-theme'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // ── Fix: scroll to top on page refresh ──
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll reveal for all .reveal elements
            gsap.utils.toArray('.reveal').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                        opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
                    }
                );
            });

            // Hero title float
            gsap.to('.hero-title-float', {
                y: -15, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });

            // Hero card entrance only — NO scroll fade out
            gsap.fromTo('.hero-glass-inner',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out', delay: 0.4 }
            );

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="relative">
            <SEO 
                title="Omnicraft — Creative Agency for Web Design & Digital Experiences" 
                description="Omnicraft is a creative agency specialising in web design, brand identity, and digital experiences. We build websites that look great and convert visitors into clients." 
                url="/"
            />
            {/* ── HERO ── */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'clamp(60px, 8vh, 100px) 16px clamp(100px, 12vh, 140px)', // Tighter padding for mobile
                overflow: 'hidden',
                background: 'var(--bg-alt)',
                transition: 'background 0.3s ease'
            }}>
                <div className="hero-noise-overlay"></div>

                {/* Fire canvas — only on larger screens or check device performance */}
                {!isLight && <HeroFireBg />}

                {/* Light mode warm gradient */}
                {isLight && (
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        background: 'radial-gradient(ellipse at 30% 60%, var(--accent-translucent) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(244,100,20,0.05) 0%, transparent 55%)',
                    }} />
                )}

                {/* Bottom fade */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '20vh', zIndex: 2, pointerEvents: 'none',
                    background: 'linear-gradient(to bottom, transparent, var(--bg))',
                }} />

                {/* ── Glass card ── */}
                <div
                    className="hero-glass-inner"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        opacity: 0,
                        textAlign: 'center',
                        maxWidth: 'min(560px, 90vw)', // Respect viewport width
                        width: '100%',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid var(--border)',
                        borderRadius: '1.5rem', // Slightly smaller radius for mobile
                        padding: 'clamp(20px, 5vw, 40px)', // Responsive padding
                        boxShadow: '0 20px 60px -10px var(--overlay-dark)',
                    }}
                >
                    <span style={{
                        display: 'inline-block', padding: '5px 16px',
                        border: '1px solid var(--accent-translucent)',
                        background: 'var(--accent-translucent)',
                        borderRadius: 9999,
                        fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em',
                        fontWeight: 700, marginBottom: 20,
                        color: 'var(--accent)',
                    }}>
                        Creative Engineering Studio
                    </span>

                    <h1 className="hero-title-float" style={{
                        fontSize: 'clamp(2.2rem, 10vw, 5rem)', // Dynamic sizing
                        fontWeight: 900,
                        lineHeight: 0.95,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.04em',
                        marginBottom: '1rem',
                        color: 'var(--text)',
                    }}>
                        Bold Ideas <br />
                        <span className="font-serif" style={{
                            color: 'var(--accent)',
                            fontStyle: 'italic',
                            textTransform: 'lowercase',
                            fontSize: 'clamp(2.1rem, 11vw, 5.5rem)',
                            lineHeight: 0.9,
                        }}>
                            built better.
                        </span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(0.85rem, 3.5vw, 1rem)',
                        color: 'var(--text-muted)',
                        maxWidth: 420,
                        lineHeight: 1.6,
                        fontWeight: 400,
                        margin: '0 auto',
                    }}>
                        We bridge the gap between imagination and execution. Design, code, and strategy unified into seamless digital experiences.
                    </p>
                </div>
            </section>

            <MarqueeTicker />
            {/* <NumberCounters /> */}

            {/* ── METHOD ── */}
            <section style={{ padding: '160px 24px', borderTop: '1px solid var(--border)' }} id="method">
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: 96, alignItems: 'center' }}>
                        <div>
                            <span className="reveal section-label">The Method</span>
                            <h2 className="reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', marginTop: 16, marginBottom: 48, lineHeight: 0.95 }}>Our approach to excellence.</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 64, marginTop: 80 }}>
                                {[
                                    { n: '01', title: 'Discovery & Strategy', desc: "We deep-dive into your brand's DNA to define a roadmap that guarantees measurable success across all digital touchpoints." },
                                    { n: '02', title: 'Design & Engineering', desc: 'Crafting high-fidelity prototypes and immersive visual languages that redefine industry standards and user expectations.' },
                                    { n: '03', title: 'Launch & Evolution', desc: 'From seamless deployment to continuous optimization, we position your brand for long-term scalability and impact.' },
                                ].map(step => (
                                    <div className="reveal" key={step.n} style={{ display: 'flex', gap: 40 }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--border)' }}>{step.n}</span>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>{step.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="reveal" style={{ position: 'relative' }}>
                            <div style={{ aspectRatio: '4/5', background: 'rgba(255,255,255,0.05)', borderRadius: '3rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <img alt="Modern architectural studio interior with minimalist furniture" loading="lazy" width="800" height="1000"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)', transition: 'all 1s' }}
                                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp"
                                    onMouseEnter={e => { e.target.style.filter = 'grayscale(0)'; e.target.style.transform = 'scale(1.05)'; }}
                                    onMouseLeave={e => { e.target.style.filter = 'grayscale(1)'; e.target.style.transform = 'scale(1)'; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WORK PREVIEW ── */}
            <section style={{ padding: '160px 24px' }} id="work">
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 96, gap: 32 }}>
                        <div style={{ maxWidth: 640 }}>
                            <span className="reveal section-label">Portfolio</span>
                            <h2 className="reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', marginTop: 16, lineHeight: 0.95 }}>Selected Works</h2>
                        </div>
                        <Link to="/work" className="reveal btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                            View All Projects <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: 'clamp(48px, 8vw, 96px)' }}>
                        {[
                            { tag: 'Fintech', year: '2024', title: 'NeoBank Ecosystem', desc: 'Redefining digital banking for the next generation through spatial design and AI orchestration.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdjCIEKa2SvhLsehKDGuESPO_76CJhn-0yWhMo6vMWhDD4LInKlt9lyM36sNGqIs5M_-d_4tbGTx4VoHgeMJsyjKh8-lM0Ps1TquLNRWp70rrVyona4DbWQ1MRwwArkexFkQFrxHzN4Xhqt065yu0PH11CO2OvTiRzWvu4SDHrl_eRkSV9JJoB06QgaIiIujz79_LpfirJCOzWxr21z-oOZ0wuRUq7aHv3UrL_cGSTXjcjbFmTJF2n3Chug9qCsi1iwnU77C-TOKFJ' },
                            { tag: 'Commerce', year: '2023', title: 'Velvet & Vine', desc: 'A headless commerce platform blending cinematic storytelling with high-conversion engineering.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKT0TaUMrr9AALILwWEY3WKAso_DF6vLjAE4CJZYUxcxA-fIeDEf3fcwxNDAbRQS2X-jfxhCYxjWzVZhsPfPsDpAbN0jic00v7jbPWj3roQmSoyBslrIeTAvddFEX58_rFw6A11kzRrC-60Au5DaRnHeAFox4tHGasqJuAcoX4UUXPBKeXyf2boJ13oAs76rXre1TCiogb0gA-7f9o98FyNpUif_1zwIOOPtp15C0cZ89dUU0pUSqrh_iWVDMLA-xZ91OaLEXG4Gtc' },
                            { tag: 'Lifestyle', year: '2024', title: 'Aura Wearables', desc: 'A sophisticated brand identity and e-commerce platform for next-generation biometric technology.', img: 'https://images.unsplash.com/photo-1544117518-2b622849c63c?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp' },
                            { tag: 'Web3', year: '2025', title: 'Nexus Protocol', desc: 'An immersive decentralized exchange platform redefining financial interactions with generative motion and fluid typography.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp' },
                        ].map((project, i) => (
                            <article key={i} className={`reveal ${i % 2 !== 0 ? 'stagger-work-item-even' : ''}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '2rem', overflow: 'hidden', transition: 'all 0.7s', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                                <div style={{ height: 500, overflow: 'hidden', position: 'relative' }}>
                                    <img alt={`Screenshot of ${project.title} project`} loading="lazy" width="600" height="750" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }} src={project.img}
                                        onMouseEnter={e => { e.target.style.transform = 'scale(1.08) rotate(1deg)'; e.target.nextSibling.style.opacity = '1'; }}
                                        onMouseLeave={e => { e.target.style.transform = 'scale(1) rotate(0deg)'; e.target.nextSibling.style.opacity = '0'; }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', opacity: 0, transition: 'opacity 0.5s', pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', padding: 32 }}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--accent)', fontSize: 32 }}>explore</span>
                                    </div>
                                </div>
                                <div style={{ padding: 48 }}>
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                                        <span style={{ background: 'rgba(244,140,37,0.1)', color: 'var(--accent)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', padding: '6px 16px', borderRadius: 9999 }}>{project.tag}</span>
                                        <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', padding: '6px 16px', borderRadius: 9999 }}>{project.year}</span>
                                    </div>
                                    <h3 style={{ fontSize: '2.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', marginBottom: 16 }}>{project.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7 }}>{project.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
}
