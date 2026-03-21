import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar({ onOpenContact }) {
    const location = useLocation();

    useEffect(() => {
        const mainNav = document.getElementById('main-nav');
        if (!mainNav) return;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 50) {
                mainNav.classList.add('scrolled');
                if (currentScrollY > lastScrollY) {
                    mainNav.classList.add('nav-shrunk');
                } else {
                    mainNav.classList.remove('nav-shrunk');
                }
            } else {
                mainNav.classList.remove('scrolled');
                mainNav.classList.remove('nav-shrunk');
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header id="main-nav" className="top-nav-container">
            <div className="glass-nav">
                <Link to="/" className="nav-logo-group">
                    <img src="/logo.png" alt="Omnicraft Studio Logo - creative agency" loading="lazy" width="80" height="80" className="nav-logo-img" />
                    <span className="nav-logo-text">Omnicraft</span>
                </Link>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Link 
                        to="/" 
                        className="nav-link"
                        style={{
                            color: location.pathname === '/' ? '#e85c20' : 'rgba(255,255,255,0.7)',
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/work" 
                        className="nav-link"
                        style={{
                            color: location.pathname === '/work' ? '#e85c20' : 'rgba(255,255,255,0.7)',
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                    >
                        Work
                    </Link>
                    <Link 
                        to="/story" 
                        className="nav-link"
                        style={{
                            color: location.pathname === '/story' ? '#e85c20' : 'rgba(255,255,255,0.7)',
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                    >
                        Story
                    </Link>
                    <Link 
                        to="/about" 
                        className="nav-link"
                        style={{
                            color: location.pathname === '/about' ? '#e85c20' : 'rgba(255,255,255,0.7)',
                            fontSize: '12px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease'
                        }}
                    >
                        About
                    </Link>
                </nav>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={onOpenContact}
                        className="btn-cta pulse"
                    >
                        Let's Talk
                    </button>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
