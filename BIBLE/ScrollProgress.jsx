import { useEffect, useRef } from 'react';

// Writes directly to DOM via ref — never triggers a React re-render.
// Previous version called setState on every scroll pixel → 60 re-renders/sec.
const ScrollProgress = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        let rafId = null;

        const update = () => {
            rafId = null;
            const scrolled = document.documentElement.scrollTop;
            const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (total <= 0) return;
            bar.style.width = `${(scrolled / total) * 100}%`;
        };

        const onScroll = () => {
            if (rafId) return; // already scheduled this frame
            rafId = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        update(); // set initial value

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={barRef}
            style={{
                position: 'fixed',
                top: 0, left: 0,
                height: '1px',          // thinner = more refined
                width: '0%',
                background: 'rgba(255,255,255,0.7)',
                zIndex: 200,
                transformOrigin: 'left',
                willChange: 'width',
                pointerEvents: 'none',
            }}
        />
    );
};

export default ScrollProgress;
