import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Footer from '../components/Footer.jsx';

// Add responsive styles for polaroid cards
const addPolaroidStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 1024px) {
            .polaroid-container {
                display: flex !important;
                flex-wrap: wrap !important;
                justify-content: center !important;
                gap: 20px !important;
            }
            .polaroid-card {
                width: 150px !important;
            }
        }
        @media (max-width: 768px) {
            .polaroid-container {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 16px !important;
            }
            .polaroid-card {
                width: 100% !important;
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
};

// Call this function once when component mounts
if (typeof window !== 'undefined') {
    addPolaroidStyles();
}

export default function Story() {
    const mainRef = useRef(null);
    const sectionsRef = useRef([]);
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
        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <div ref={mainRef} style={{ paddingTop: '100px', overflow: 'hidden' }}>
            {/* SECTION 1 — COVER */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '100px 2rem 80px',
                background: 'var(--bg)',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    fontSize: '11px',
                    letterSpacing: '0.3em',
                    color: '#e85c20',
                    textTransform: 'uppercase',
                    fontWeight: 700
                }}>
                    OMNICRAFT CREATIVE STUDIO
                </div>
                
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    fontWeight: 600
                }}>
                    ISSUE NO. 001 · EST. 2024
                </div>

                <div style={{ textAlign: 'center', maxWidth: '1200px', width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h1 style={{
                            fontSize: '18vw',
                            fontWeight: 900,
                            color: 'var(--text)',
                            margin: '0 0 0.5rem 0',
                            textAlign: 'left',
                            lineHeight: 0.9,
                            overflow: 'hidden'
                        }}>
                            <motion.span
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                            >
                                OUR
                            </motion.span>
                        </h1>
                        <h1 style={{
                            fontSize: '18vw',
                            fontWeight: 900,
                            background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0 0 2rem 0',
                            textAlign: 'right',
                            lineHeight: 0.9,
                            overflow: 'hidden'
                        }}>
                            <motion.span
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                            >
                                STORY
                            </motion.span>
                        </h1>
                    </motion.div>

                    <div style={{
                        width: '100%',
                        height: '1px',
                        background: '#e85c20',
                        margin: '0 0 3rem 0'
                    }}></div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        marginBottom: '4rem',
                        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                        color: 'var(--text-muted)',
                        fontWeight: 300
                    }}>
                        <div style={{ textAlign: 'left' }}>Four people. One obsession.</div>
                        <div style={{ textAlign: 'right' }}>Karachi, Pakistan · 2024</div>
                    </div>

                    <motion.blockquote
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
                        style={{
                            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                            fontStyle: 'italic',
                            color: 'rgba(255,255,255,0.35)',
                            lineHeight: 1.6,
                            margin: '0 auto 4rem',
                            maxWidth: '800px',
                            textAlign: 'center'
                        }}
                    >
                        No funding. No office. No laptops. Just two people who refused to call it impossible.
                    </motion.blockquote>

                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            opacity: 0.8
                        }}
                    >
                        <div style={{
                            width: '8px',
                            height: '8px',
                            background: '#e85c20',
                            borderRadius: '50%',
                            boxShadow: '0 0 15px rgba(232,92,32,0.6)'
                        }}></div>
                        <span style={{
                            fontSize: '9px',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            fontWeight: 600
                        }}>
                            Scroll
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* CHAPTER DIVIDER 01 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
                <span style={{
                    fontSize: '11px',
                    letterSpacing: '0.5em',
                    color: '#e85c20',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    margin: '0 2rem'
                }}>
                    CHAPTER 01
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
            </div>
            
            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto 4rem' }}>
                <span style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '0',
                    fontSize: '15vw',
                    fontWeight: 900,
                    color: 'rgba(232,92,32,0.05)',
                    zIndex: 0
                }}>1</span>
                <h2 style={{
                    fontSize: '6vw',
                    fontWeight: 900,
                    color: 'var(--text)',
                    margin: '0 0 0 0',
                    position: 'relative',
                    zIndex: 1,
                    textTransform: 'uppercase'
                }}>
                    THE ORIGIN
                </h2>
            </div>

            {/* SECTION 2 — ORIGIN */}
            <section style={{ padding: '0 2rem 6rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '40% 60%',
                        gap: '3rem',
                        alignItems: 'flex-start'
                    }}>
                        <motion.div
                            ref={addToRefs}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ marginBottom: '3rem' }}>
                                <div style={{
                                    fontSize: '15vw',
                                    fontWeight: 900,
                                    background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 0.9
                                }}>3</div>
                                <span style={{
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'var(--text-muted)',
                                    fontWeight: 600
                                }}>MONTHS AGO</span>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: '15vw',
                                    fontWeight: 900,
                                    color: 'var(--text)',
                                    lineHeight: 0.9
                                }}>4</div>
                                <span style={{
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'var(--text-muted)',
                                    fontWeight: 600
                                }}>FOUNDERS</span>
                            </div>
                        </motion.div>

                        <motion.div
                            ref={addToRefs}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.08 }}
                            style={{
                                columnCount: '2',
                                columnGap: '2rem',
                                fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                color: 'var(--text-muted)',
                                lineHeight: 1.8,
                                fontWeight: 300
                            }}
                        >
                            <p style={{ margin: 0 }}>
                                <span style={{
                                    float: 'left',
                                    fontSize: '4em',
                                    lineHeight: '0.8',
                                    color: '#e85c20',
                                    fontWeight: 900,
                                    marginRight: '0.1em'
                                }}>O</span>
                                Parth had one idea that kept him up at night. Not a small one. An agency where a client walks in needing anything — a brand, a website, a campaign, a film — and never has to look elsewhere. Every niche. One roof. One team. One standard. Everyone said pick a lane. We said no. Not out of arrogance. Out of obsession. The world has enough agencies that do one thing adequately. We wanted to build the one that does everything exceptionally. That idea was too dangerous to let go. So we didn't.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CHAPTER DIVIDER 02 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
                <span style={{
                    fontSize: '11px',
                    letterSpacing: '0.5em',
                    color: '#e85c20',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    margin: '0 2rem'
                }}>
                    CHAPTER 02
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
            </div>
            
            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto 4rem' }}>
                <span style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '0',
                    fontSize: '15vw',
                    fontWeight: 900,
                    color: 'rgba(232,92,32,0.05)',
                    zIndex: 0
                }}>2</span>
                <h2 style={{
                    fontSize: '6vw',
                    fontWeight: 900,
                    color: 'var(--text)',
                    margin: '0 0 0 0',
                    position: 'relative',
                    zIndex: 1,
                    textTransform: 'uppercase'
                }}>
                    THE TIMELINE
                </h2>
            </div>

            {/* SECTION 3 — TIMELINE */}
            <section style={{ padding: '0 2rem 6rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {[{ date: '2024', title: 'The Vision', desc: 'One idea. Too big to ignore. Too real to forget.' },
                      { date: 'EARLY 2025', title: 'No Tools. Still Building.', desc: 'No laptops. No systems. The dream outlasted every obstacle.' },
                      { date: 'FEB 2025', title: 'The Crew Said Yes', desc: 'Yazdan and Jameel heard it once. They didn\'t need to hear it twice.' },
                      { date: 'NOW →', title: 'Everything From Scratch', desc: 'Bought our own gear. Built our own site. Every piece placed by hand.' }]
                     .map((item, index) => (
                        <motion.div
                            key={index}
                            ref={addToRefs}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1, ease: 'easeOut', delay: index * 0.1 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '150px 1fr',
                                gap: '2rem',
                                alignItems: 'center',
                                padding: '2rem 0',
                                borderBottom: '1px solid var(--border)',
                                cursor: 'pointer'
                            }}
                            whileHover={{
                                borderColor: 'rgba(232,92,32,0.35)',
                                borderLeft: '3px solid #e85c20'
                            }}
                        >
                            <div style={{
                                fontSize: '6vw',
                                fontWeight: 900,
                                color: 'rgba(232,92,32,0.3)',
                                lineHeight: 0.9
                            }}>{item.date}</div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    color: 'var(--text)',
                                    margin: '0 0 0.5rem 0'
                                }}>{item.title}</h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    margin: 0
                                }}>{item.desc}</p>
                            </div>
                        </motion.div>
                     ))}
                </div>
            </section>

            {/* CHAPTER DIVIDER 03 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
                <span style={{
                    fontSize: '11px',
                    letterSpacing: '0.5em',
                    color: '#e85c20',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    margin: '0 2rem'
                }}>
                    CHAPTER 03
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
            </div>
            
            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto 4rem' }}>
                <span style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '0',
                    fontSize: '15vw',
                    fontWeight: 900,
                    color: 'rgba(232,92,32,0.05)',
                    zIndex: 0
                }}>3</span>
                <h2 style={{
                    fontSize: '6vw',
                    fontWeight: 900,
                    color: 'var(--text)',
                    margin: '0 0 0 0',
                    position: 'relative',
                    zIndex: 1,
                    textTransform: 'uppercase'
                }}>
                    THE CREW
                </h2>
            </div>

            {/* SECTION 4 — TEAM */}
            <section style={{ padding: '0 2rem 6rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <p style={{
                        fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                        color: 'var(--text-muted)',
                        lineHeight: 1.8,
                        fontWeight: 300,
                        margin: '0 0 2rem 0',
                        textAlign: 'center'
                    }}>
                        Four people who bet on an idea before it had a name.
                    </p>
                    <div className="polaroid-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        gap: '28px'
                    }}>
                        {[{ name: 'Parth', role: 'AI Dev · UI Designer', initials: 'P', color: '#e85c20', src: '/images/team/parth.jpg' },
                          { name: 'Pratham', role: 'Co-Founder · Motion Editor', initials: 'Pr', color: '#f5a623', src: '/images/team/pratham.jpg' },
                          { name: 'Jameel', role: 'Web Dev · Designer', initials: 'J', color: '#c94b15', src: '/images/team/jameel.jpg' },
                          { name: 'Yazdan', role: 'Lead Gen · Social Media', initials: 'Y', color: '#d9751a', src: '/images/team/yazdan.jpg' },
                          { name: 'Fardeen', role: 'Designer', initials: 'F', color: '#e8922a', src: '/images/team/fardeen.jpg' }]
                         .map((member, index) => (
                            <motion.div
                                key={index}
                                ref={addToRefs}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
                                style={{
                                    width: '165px',
                                    background: '#fff',
                                    padding: '10px 10px 28px',
                                    boxShadow: '2px 4px 12px rgba(0,0,0,0.12)',
                                    transform: index === 0 ? 'rotate(-1deg)' : 
                                               index === 1 ? 'rotate(1.5deg)' : 
                                               index === 2 ? 'rotate(-1deg)' : 
                                               index === 3 ? 'rotate(2.5deg)' : 
                                               'rotate(-1.5deg)',
                                    transition: 'all 0.1s ease-out',
                                    zIndex: 4
                                }}
                                whileHover={{ 
                                    rotate: 5,
                                    scale: 1.04,
                                    zIndex: 10,
                                    boxShadow: '4px 8px 20px rgba(0,0,0,0.2)'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={member.src}
                                        alt={member.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center top'
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = document.createElement('div');
                                            fallback.style.position = 'absolute';
                                            fallback.style.top = '0';
                                            fallback.style.left = '0';
                                            fallback.style.width = '100%';
                                            fallback.style.height = '100%';
                                            fallback.style.background = '#0a0a0a';
                                            fallback.style.display = 'flex';
                                            fallback.style.alignItems = 'center';
                                            fallback.style.justifyContent = 'center';
                                            fallback.style.fontSize = 'clamp(2.5rem, 8vw, 4rem)';
                                            fallback.style.fontWeight = '900';
                                            fallback.style.color = member.color;
                                            fallback.textContent = member.initials;
                                            e.target.parentNode.appendChild(fallback);
                                        }}
                                    />
                                </div>
                                <div style={{
                                    marginTop: '12px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '1rem',
                                        fontWeight: 800,
                                        fontStyle: 'italic',
                                        color: '#0a0a0a',
                                        margin: '0 0 4px 0'
                                    }}>{member.name}</div>
                                    <div style={{
                                        fontSize: '9px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                        color: '#aaa',
                                        margin: 0
                                    }}>{member.role}</div>
                                </div>
                            </motion.div>
                         ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5 — PULL QUOTE */}
            <section style={{
                padding: '8rem 2rem',
                background: 'linear-gradient(180deg, rgba(232,92,32,0.05), rgba(245,166,35,0.05))',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '2rem',
                        fontSize: '15vw',
                        fontWeight: 900,
                        color: 'rgba(232,92,32,0.15)',
                        zIndex: 0
                    }}>"</div>
                    
                    <motion.blockquote
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 900,
                            color: 'var(--text)',
                            lineHeight: 1.2,
                            margin: '0 auto',
                            maxWidth: '900px',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        We're building this from Karachi with no shortcuts and nothing to hide behind. Just five people who want to show the world what this city is capable of.
                    </motion.blockquote>
                    
                    <div style={{
                        width: '80px',
                        height: '2px',
                        background: '#e85c20',
                        margin: '3rem auto 2rem',
                        borderRadius: '1px'
                    }}></div>
                    
                    <div style={{
                        fontSize: '10px',
                        letterSpacing: '0.3em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        textAlign: 'center'
                    }}>
                        — OMNICRAFT, EST. 2024
                    </div>
                </div>
            </section>

            {/* CHAPTER DIVIDER 04 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
                <span style={{
                    fontSize: '11px',
                    letterSpacing: '0.5em',
                    color: '#e85c20',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    margin: '0 2rem'
                }}>
                    CHAPTER 04
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(232,92,32,0.25)' }}></div>
            </div>
            
            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto 4rem' }}>
                <span style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '0',
                    fontSize: '15vw',
                    fontWeight: 900,
                    color: 'rgba(232,92,32,0.05)',
                    zIndex: 0
                }}>4</span>
                <h2 style={{
                    fontSize: '6vw',
                    fontWeight: 900,
                    color: 'var(--text)',
                    margin: '0 0 0 0',
                    position: 'relative',
                    zIndex: 1,
                    textTransform: 'uppercase'
                }}>
                    START SOMETHING
                </h2>
            </div>

            {/* SECTION 6 — CTA */}
            <section style={{
                padding: '4rem 2rem 2rem',
                background: 'radial-gradient(circle at top left, rgba(232,92,32,0.15), transparent 50%), radial-gradient(circle at bottom right, rgba(245,166,35,0.15), transparent 50%)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        style={{
                            background: 'rgba(232,92,32,0.06)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(232,92,32,0.2)',
                            borderRadius: '16px',
                            padding: 'clamp(2rem, 6vw, 4rem)',
                            position: 'relative',
                            overflow: 'hidden',
                            textAlign: 'center'
                        }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            fontWeight: 900,
                            color: 'var(--text)',
                            margin: '0 0 1.5rem 0',
                            lineHeight: 0.95
                        }}>
                            READY TO BUILD SOMETHING<br />
                            <span style={{
                                background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>THAT LASTS?</span>
                        </h2>

                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                            lineHeight: 1.8,
                            fontWeight: 300,
                            margin: '0 auto 4rem',
                            maxWidth: '600px',
                            textAlign: 'center',
                            display: 'block'
                        }}>
                            You don't need five agencies. You need one that has everything. That's what we built Omnicraft to be — and we're just getting started.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <motion.a
                                href="mailto:codeewithparth@gmail.com"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    background: 'linear-gradient(135deg, #e85c20, #f5a623)',
                                    color: '#ffffff',
                                    padding: '0.75rem 2rem',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    textDecoration: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'inline-block'
                                }}
                            >
                                START A PROJECT →
                            </motion.a>
                            
                            <Link
                                to="/work"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    background: 'transparent',
                                    color: '#ffffff',
                                    padding: '0.75rem 2rem',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    textDecoration: 'none',
                                    border: '1.5px solid rgba(255,255,255,0.4)',
                                    cursor: 'pointer',
                                    display: 'inline-block'
                                }}
                            >
                                SEE OUR WORK
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />

        </div>
    );
}
