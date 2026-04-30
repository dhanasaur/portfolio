import { useEffect, useRef } from 'react';

// Cinematic scan-line loader — 1.6 seconds total
// Scan line sweeps left→right, name materialises, then wipes out.
export default function Loader({ onComplete }) {
    const wrapRef = useRef(null);

    useEffect(() => {
        // After animation completes, fade out then unmount
        const exit = setTimeout(() => {
            const el = wrapRef.current;
            if (!el) return;
            el.style.transition = 'opacity 0.45s cubic-bezier(0.4,0,1,1)';
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
        }, 1150);

        const done = setTimeout(onComplete, 1600);
        return () => { clearTimeout(exit); clearTimeout(done); };
    }, [onComplete]);

    return (
        <div
            ref={wrapRef}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: '#050505',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '24px',
            }}
        >
            <style>{`
                @keyframes scan {
                    from { width: 0; }
                    to   { width: 100%; }
                }
                @keyframes loader-name-in {
                    0%   { opacity: 0; letter-spacing: 0.6em; }
                    100% { opacity: 1; letter-spacing: 0.25em; }
                }
                @keyframes loader-sub-in {
                    0%   { opacity: 0; }
                    100% { opacity: 0.35; }
                }
            `}</style>

            {/* Initials — large, confident */}
            <div style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(64px, 12vw, 120px)',
                color: '#F5F5F5',
                letterSpacing: '0.08em',
                lineHeight: 1,
                animation: 'loader-name-in 0.9s cubic-bezier(0.19,1,0.22,1) 0.1s both',
            }}>
                DS
            </div>

            {/* Scan line container */}
            <div style={{ position: 'relative', width: 'min(320px, 60vw)', height: '1px', background: 'rgba(255,255,255,0.08)' }}>
                <div style={{
                    position: 'absolute', left: 0, top: 0, height: '1px',
                    background: '#F5F5F5',
                    animation: 'scan 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s both',
                }} />
            </div>

            {/* Full name */}
            <div style={{
                fontFamily: 'Archivo, sans-serif',
                fontWeight: 400,
                fontSize: '11px',
                color: '#F5F5F5',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                animation: 'loader-sub-in 0.6s ease 0.7s both',
            }}>
                DHANA SUNDAR A
            </div>
        </div>
    );
}
