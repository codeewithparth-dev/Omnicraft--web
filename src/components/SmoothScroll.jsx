import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }) {
    const location = useLocation();

    // Prevent browser from restoring scroll position on reload
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.05,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        gsap.ticker.lagSmoothing(0);

        // Store lenis on window for easy access if needed elsewhere
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    // Scroll to top on route change AND on initial mount (reload)
    useEffect(() => {
        // Small delay to ensure Lenis is ready
        requestAnimationFrame(() => {
            if (window.lenis) {
                window.lenis.scrollTo(0, { immediate: true });
            }
            window.scrollTo(0, 0);
        });
    }, [location.pathname]);

    return <>{children}</>;
}
