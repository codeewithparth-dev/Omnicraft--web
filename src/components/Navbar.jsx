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
