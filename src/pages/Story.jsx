import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function Story() {
    const mainRef = useRef(null);
    const heroRef = useRef(null);
    const sectionsRef = useRef([]);

    // Scroll animations for hero section fade out
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Intersection Observer for section reveals
    const isInView = useInView(mainRef, { once: true, margin: '-60px' });

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    useEffect(() => {
        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, []);

    return (
        <div ref={mainRef} style={{ paddingTop: '80px' }}>
            {/* SECTION 1 — HERO */}
            <section 
                ref={heroRef}
                style={{ 
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '100px 2rem 80px',
                    background: '#0a0a0a',
                    overflow: 'hidden',
                    opacity: heroOpacity,
                    transform: `translateY(${heroY}px)`
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px',
                        padding: '2rem',
                        textAlign: 'center',
                        maxWidth: '600px',
                        width: '100%'
                    }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '0.35rem 1rem',
                        border: '1px solid rgba(232,92,32,0.4)',
                        borderRadius: '50px',
                        fontSize: '11px',
                        letterSpacing: '0.22em',
                        color: 'rgba(245,166,35,0.9)',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        marginBottom: '1.5rem'
                    }}>
                        FOUNDED IN KARACHI · 2024
                    </span>

                    <motion.h1
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
                            fontWeight: 900,
                            color: '#ffffff',
                            margin: '0 0 1rem 0',
                            lineHeight: 0.95
                        }}
                    >
                        OUR STORY
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 11vw, 6rem)',
                            fontWeight: 900,
                            background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0 0 1.5rem 0',
                            lineHeight: 0.95
                        }}
                    >
                        BUILT DIFFERENT.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                        style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
                            lineHeight: 1.7,
                            fontWeight: 300,
                            margin: '0 auto 2rem',
                            maxWidth: '500px'
                        }}
                    >
                        Five people. One late-night call. A refusal to make work that doesn't matter. This is how Omnicraft was born — and why it won't stop.
                    </motion.p>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '6px',
                            height: '6px',
                            background: '#e85c20',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px #e85c20'
                        }}></div>
                        <span style={{
                            fontSize: '10px',
                            color: 'rgba(255,255,255,0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            Scroll
                        </span>
                    </motion.div>
                </motion.div>
            </section>

            {/* SECTION 2 — ORIGIN */}
            <section style={{ padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(232,92,32,0.3), transparent)',
                        margin: '0 0 3rem 0'
                    }}></div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        alignItems: 'center'
                    }}>
                        <motion.div
                            ref={addToRefs}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                        >
                            <span style={{
                                fontSize: '11px',
                                letterSpacing: '0.22em',
                                color: '#e85c20',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                display: 'block',
                                marginBottom: '1rem'
                            }}>
                                001 / THE ORIGIN
                            </span>
                            <h2 style={{
                                fontSize: 'clamp(2.2rem, 6vw, 4rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '-0.05em',
                                lineHeight: 0.95,
                                margin: 0
                            }}>
                                NOT ANOTHER AGENCY.<br />
                                <span style={{
                                    background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>A STATEMENT.</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            ref={addToRefs}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.08 }}
                            style={{ paddingTop: '3rem' }}
                        >
                            <p style={{
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                lineHeight: 1.8,
                                fontWeight: 300,
                                margin: '0 0 1.5rem 0'
                            }}>
                                Omnicraft was born from a simple frustration: agencies were treating brands like tickets in a queue. Fast. Forgettable. Gone.
                            </p>
                            <p style={{
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                lineHeight: 1.8,
                                fontWeight: 300,
                                margin: '0 0 1.5rem 0'
                            }}>
                                Parth and Pratham wanted a studio where every pixel, every frame, every word was placed with intention — not pressure.
                            </p>
                            <p style={{
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                lineHeight: 1.8,
                                fontWeight: 300,
                                margin: 0
                            }}>
                                So they built Omnicraft. And built it to matter.
                            </p>
                        </motion.div>
                    </div>

                    <div style={{
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(232,92,32,0.3), transparent)',
                        margin: '3rem 0 0 0'
                    }}></div>
                </div>
            </section>

            {/* SECTION 3 — TIMELINE */}
            <section style={{ padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        ref={addToRefs}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <span style={{
                            fontSize: '11px',
                            letterSpacing: '0.22em',
                            color: '#e85c20',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            002 / THE TIMELINE
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                            lineHeight: 0.95,
                            margin: 0
                        }}>
                            HOW WE GOT HERE
                        </h2>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                            {
                                number: '01',
                                date: 'October 2024',
                                title: 'The Call That Started It All',
                                description: 'Late night. Two founders. One shared frustration with how agencies treated creative work. They decided to build something better.'
                            },
                            {
                                number: '02',
                                date: 'November 2024',
                                title: 'The Team Comes Together',
                                description: 'Jameel, Yazdan, and Fardeen joined. Five different strengths. One shared obsession: work that actually means something.'
                            },
                            {
                                number: '03',
                                date: 'December 2024',
                                title: 'Omnicraft Goes Live',
                                description: 'The name says it all — omnipresent in craft. Design, code, strategy. A full-spectrum creative force for brands that refuse to be invisible.'
                            },
                            {
                                number: '04',
                                date: '2025 & Beyond',
                                title: 'Your Vision. Our Craft.',
                                description: 'Three months in. Real clients. Real results. We\'re building like we have everything to prove — because we do.'
                            }
                        ].map((milestone, index) => (
                            <motion.div
                                key={index}
                                ref={addToRefs}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.08 }}
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    display: 'grid',
                                    gridTemplateColumns: '120px 1fr',
                                    gap: '2rem',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: 'clamp(3rem, 12vw, 6rem)',
                                        fontWeight: 900,
                                        background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        lineHeight: 0.9,
                                        marginBottom: '0.5rem'
                                    }}>
                                        {milestone.number}
                                    </div>
                                    <span style={{
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontWeight: 600
                                    }}>
                                        {milestone.date}
                                    </span>
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '-0.02em',
                                        color: '#ffffff',
                                        margin: '0 0 1rem 0'
                                    }}>
                                        {milestone.title}
                                    </h3>
                                    <p style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                        lineHeight: 1.8,
                                        fontWeight: 300,
                                        margin: 0
                                    }}>
                                        {milestone.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — TEAM */}
            <section style={{ padding: '5rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(232,92,32,0.3), transparent)',
                        margin: '0 0 3rem 0'
                    }}></div>

                    <motion.div
                        ref={addToRefs}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <span style={{
                            fontSize: '11px',
                            letterSpacing: '0.22em',
                            color: '#e85c20',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            003 / THE CREW
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                            lineHeight: 0.95,
                            margin: 0
                        }}>
                            FIVE PEOPLE. ONE MISSION.
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { name: 'Parth', role: 'AI Dev · UI Designer', initials: 'P', color: '#e85c20' },
                            { name: 'Pratham', role: 'Co-founder · Motion Editor', initials: 'Pr', color: '#f5a623' },
                            { name: 'Jameel', role: 'Web Dev · Designer', initials: 'J', color: '#c94b15' },
                            { name: 'Yazdan', role: 'Lead Gen · Social Media', initials: 'Y', color: '#d9751a' },
                            { name: 'Fardeen', role: 'Designer', initials: 'F', color: '#e8922a' }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                ref={addToRefs}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.08 }}
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    textAlign: 'center',
                                    transition: 'border-color 0.3s ease'
                                }}
                                whileHover={{ borderColor: 'rgba(232,92,32,0.35)' }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    margin: '0 auto 1rem',
                                    background: `linear-gradient(135deg, ${member.color}, ${member.color})`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 10px 30px -10px rgba(232,92,32,0.3)'
                                }}>
                                    <span style={{
                                        fontSize: '2rem',
                                        fontWeight: 800,
                                        color: '#ffffff',
                                        textTransform: 'uppercase'
                                    }}>
                                        {member.initials}
                                    </span>
                                </div>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.02em',
                                    color: '#ffffff',
                                    margin: '0 0 0.5rem 0'
                                }}>
                                    {member.name}
                                </h4>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'rgba(255,255,255,0.5)',
                                    fontWeight: 400,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    margin: 0
                                }}>
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5 — VALUES */}
            <section style={{ padding: '4rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        ref={addToRefs}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <span style={{
                            fontSize: '11px',
                            letterSpacing: '0.22em',
                            color: '#e85c20',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            004 / WHAT WE STAND FOR
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                            lineHeight: 0.95,
                            margin: 0
                        }}>
                            OUR PRINCIPLES
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                title: 'Craft First',
                                description: 'We obsess over details most people never notice — because those are the ones people feel.'
                            },
                            {
                                title: 'No Filler',
                                description: 'Every element earns its place. If it doesn\'t serve the vision, it\'s gone.'
                            },
                            {
                                title: 'Built to Last',
                                description: 'We don\'t chase trends. We build work that holds up six months from now — and six years from now.'
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                ref={addToRefs}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.08 }}
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    transition: 'border-color 0.3s ease'
                                }}
                                whileHover={{ borderColor: 'rgba(232,92,32,0.35)' }}
                            >
                                <div style={{
                                    width: '36px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                                    marginBottom: '1.5rem'
                                }}></div>
                                <h3 style={{
                                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.02em',
                                    color: '#ffffff',
                                    margin: '0 0 1rem 0'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    color: 'rgba(255,255,255,0.45)',
                                    fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                    lineHeight: 1.8,
                                    fontWeight: 300,
                                    margin: 0
                                }}>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — CTA */}
            <section style={{ padding: '4rem 2rem 8rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        ref={addToRefs}
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
                        whileHover={{ borderColor: 'rgba(232,92,32,0.4)' }}
                    >
                        {/* Radial glow at bottom */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-50%',
                            right: '-20%',
                            width: '200px',
                            height: '200px',
                            background: 'radial-gradient(circle, rgba(232,92,32,0.3), transparent 70%)',
                            filter: 'blur(20px)',
                            opacity: 0.6
                        }}></div>

                        <span style={{
                            fontSize: '11px',
                            letterSpacing: '0.22em',
                            color: '#e85c20',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            005 / START SOMETHING
                        </span>

                        <h2 style={{
                            fontSize: 'clamp(2.2rem, 7vw, 4rem)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.05em',
                            lineHeight: 0.95,
                            color: '#ffffff',
                            margin: '0 0 1.5rem 0'
                        }}>
                            YOUR VISION DESERVES<br />
                            <span style={{
                                background: 'linear-gradient(90deg, #e85c20, #f5a623)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>A TEAM THAT CARES.</span>
                        </h2>

                        <p style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                            lineHeight: 1.8,
                            fontWeight: 300,
                            margin: '0 0 3rem 0',
                            maxWidth: '600px',
                            textAlign: 'center'
                        }}>
                            You have a vision. We have the craft to bring it to life. Let's build something that matters together.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
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
                                    cursor: 'pointer'
                                }}
                            >
                                START A PROJECT →
                            </motion.a>
                            
                            <motion.a
                                href="https://linktr.ee/codeewithparth"
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
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    cursor: 'pointer'
                                }}
                            >
                                SEE OUR WORK
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{
                padding: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <span style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 600
                }}>
                    © 2025 OMNICRAFT
                </span>
                <span style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 600
                }}>
                    YOUR VISION. OUR CRAFT.
                </span>
            </footer>
        </div>
    );
}