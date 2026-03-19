import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function ThemeToggle() {
    const [isLight, setIsLight] = useState(
        () => localStorage.getItem('theme') === 'light'
    );

    useEffect(() => {
        if (isLight) {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
    }, [isLight]);

    const toggleTheme = () => {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            gsap.fromTo(icon,
                { scale: 0.5, opacity: 0, rotate: -90 },
                { scale: 1, opacity: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.5)' }
            );
        }
        setIsLight(prev => {
            const next = !prev;
            localStorage.setItem('theme', next ? 'light' : 'dark');
            return next;
        });
    };

    return (
        <button
            id="theme-toggle"
            onClick={toggleTheme}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--border)',
                padding: '10px',
                borderRadius: '9999px',
                color: 'var(--text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
            }}
            aria-label="Toggle theme"
        >
            <span className="material-symbols-outlined" id="theme-icon" style={{ fontSize: '20px' }}>
                {isLight ? 'dark_mode' : 'light_mode'}
            </span>
        </button>
    );
}
