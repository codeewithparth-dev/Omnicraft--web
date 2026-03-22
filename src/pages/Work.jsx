import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import SEO from '../components/SEO.jsx';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer.jsx';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
    {
        skill: 'WEB DEVELOPMENT',
        projects: [
            { tag: 'Fintech', year: '2024', title: 'NeoBank Ecosystem', desc: 'Redefining digital banking for the next generation through spatial design and AI orchestration.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdjCIEKa2SvhLsehKDGuESPO_76CJhn-0yWhMo6vMWhDD4LInKlt9lyM36sNGqIs5M_-d_4tbGTx4VoHgeMJsyjKh8-lM0Ps1TquLNRWp70rrVyona4DbWQ1MRwwArkexFkQFrxHzN4Xhqt065yu0PH11CO2OvTiRzWvu4SDHrl_eRkSV9JJoB06QgaIiIujz79_LpfirJCOzWxr21z-oOZ0wuRUq7aHv3UrL_cGSTXjcjbFmTJF2n3Chug9qCsi1iwnU77C-TOKFJ' },
            { tag: 'Commerce', year: '2023', title: 'Velvet & Vine', desc: 'A headless commerce platform blending cinematic storytelling with high-conversion engineering.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKT0TaUMrr9AALILwWEY3WKAso_DF6vLjAE4CJZYUxcxA-fIeDEf3fcwxNDAbRQS2X-jfxhCYxjWzVZhsPfPsDpAbN0jic00v7jbPWj3roQmSoyBslrIeTAvddFEX58_rFw6A11kzRrC-60Au5DaRnHeAFox4tHGasqJuAcoX4UUXPBKeXyf2boJ13oAs76rXre1TCiogb0gA-7f9o98FyNpUif_1zwIOOPtp15C0cZ89dUU0pUSqrh_iWVDMLA-xZ91OaLEXG4Gtc' },
            { tag: 'Lifestyle', year: '2024', title: 'Aura Wearables', desc: 'A sophisticated brand identity and e-commerce platform for next-generation biometric technology.', img: 'https://images.unsplash.com/photo-1544117518-2b622849c63c?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp' },
        ]
    },
    {
        skill: 'BRAND IDENTITY',
        projects: [
            { tag: 'Wellness', year: '2024', title: 'Solara', desc: 'Comprehensive wellness brand identity designed to ground modern living.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp' },
            { tag: 'Agency', year: '2023', title: 'Kove Studios', desc: 'Complete creative agency rebrand focusing on minimalist aesthetic and sharp typography.', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp' },
            { tag: 'Architecture', year: '2024', title: 'Meridian', desc: 'Bold visual identity for a forward-thinking progressive architecture firm.', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp' },
        ]
    },
    {
        skill: 'MOTION & 3D',
        projects: [
            { tag: 'Product', year: '2024', title: 'Phantom Launch', desc: 'High-impact product reveal film combining practical effects and hyper-real CGI.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuAzfbhzf4d-_hl7lmyB7Vmbquf_nM9EVhmXE0XtrWkFlJ8kDTlOYbVAvoEjupsoaPVfZZcU2-APtWjkKmlOdb2vUQ-AbqAb0aIANdJuPtFM88AHtLp2N3ZpyGkWJt2w7S5rL22yAOMgLUZK227SJQASi3rIgNfKN3s3dH9mcpive8d0OtARUuNUz2rMDUB6kITRc5qIPuwf0s-hwD1-T6g29c1D3ctTyajpvVYz2OegNG6GC-DUdowD0bxtSwhR5kltfGNE-9Bb8q' },
            { tag: 'Interactive', year: '2023', title: 'Orbit', desc: 'Immersive realtime 3D experience designed for browser-based exploration.', img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&h=1000&auto=format&fit=crop&fm=webp' },
            { tag: 'Branding', year: '2024', title: 'Flux', desc: 'Dynamic motion brand system that adapts to user interactions and environmental states.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzReGya9OKaqAGDFs998CtDJ9Fo1NHMTZjnP1OTPoFnUc-ppDIMJqVDp8IpkzzDoLdvVjE4Db1YQuunnQ2mpzHwX5UsyndCjk_XgPc9XLcMcueEB66mYXrZgisMnJo253Yd-74EKuYBWFsOPt_V47B0bo9MnC83MWQnfdDxaYdBQqZm4snNUuVIpejQQRxeUyTAlAmuKk8LPFYBUY1s9djcWSmoqAOY3BS5MRRUurXiFYmfqHSIUfSMQC_vHN_yoQcwgmdvn9FO-cr' },
        ]
    }
];

export default function Work() {
    const sectionRef = useRef(null);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.reveal').forEach((el) => {
                gsap.to(el, {
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                    opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef}>
            <SEO 
                title="Our Work — Projects & Case Studies | Omnicraft" 
                description="Browse Omnicraft's portfolio of web design and branding projects. See the high-impact work we have completed for clients across multiple different industries." 
                url="/work"
            />
            {/* HERO */}
            <section style={{ 
                position: 'relative', 
                padding: 'clamp(100px, 15vh, 180px) 16px clamp(60px, 8vh, 100px)', 
                maxWidth: 1280, 
                margin: '0 auto' 
            }}>
                <span className="reveal section-label">Case Studies</span>
                <h1 className="reveal" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', fontWeight: 900, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.05em', marginTop: 8, marginBottom: 32 }}>
                    Our Showcase.
                </h1>
                <p className="reveal" style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: 720, lineHeight: 1.6, fontWeight: 500 }}>
                    Explore our portfolio of high-impact digital products, immersive experiences, and strategic brand evolutions.
                </p>
            </section>

            {/* SKILLS SET */}
            <div style={{ padding: '0 16px clamp(100px, 15vw, 180px)', maxWidth: 1280, margin: '0 auto' }}>
                {skillGroups.map((group, groupIdx) => (
                    <div key={groupIdx} style={{ marginBottom: groupIdx === skillGroups.length - 1 ? 0 : 'clamp(80px, 12vw, 160px)' }}>
                        <h2 className="reveal" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', marginBottom: '48px', color: 'var(--text)', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                            {group.skill}
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(32px, 5vw, 56px)' }}>
                            {group.projects.map((project, i) => (
                                <article key={i} className="reveal project-card-hover" style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
                                    <div style={{ position: 'relative', aspectRatio: '4/5', background: 'var(--surface)', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                        <img alt={`Case study preview for ${project.title}`} loading="lazy" width="400" height="500" style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={project.img} draggable="false" />
                                        
                                        {/* Hover Overlay Pill */}
                                        <div className="hover-pill-overlay" style={{ position: 'absolute', inset: 0, background: isLight ? 'rgba(244,140,37,0.3)' : 'rgba(8,6,6,0.5)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', backdropFilter: 'blur(4px)' }}>
                                            <Link to="/about" style={{ pointerEvents: 'auto', background: isLight ? '#F48C25' : 'var(--accent)', color: isLight ? '#0a0a0a' : '#fff', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '9999px', fontSize: '11px', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.05em', boxShadow: isLight ? '0 10px 20px -5px rgba(244,140,37,0.3)' : '0 10px 20px -5px var(--accent-translucent)' }}>
                                                View Project &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 8px' }}>
                                        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                                            <span style={{ color: 'var(--accent)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.tag}</span>
                                            <span style={{ color: 'var(--border)', fontSize: 10, fontWeight: 700 }}>/</span>
                                            <span style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.year}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', marginBottom: 12 }}>{project.title}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>{project.desc}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Footer />

            <style>{`
                .project-card-hover:hover .hover-pill-overlay {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
}
