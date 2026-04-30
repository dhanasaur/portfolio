import React from 'react';
import NeuralBackground from '../components/NeuralBackground';

// Detect touch/mobile once — no reactive overhead
const IS_TOUCH = typeof window !== 'undefined'
    ? window.matchMedia('(pointer: coarse)').matches
    : false;

const Background = () => {

    // --- MOBILE: lightweight static background, no video ---
    if (IS_TOUCH) {
        return (
            <div className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-black">
                {/* Subtle animated gradient — GPU composited, ~0% CPU */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #141414 0%, #050505 100%)',
                        animation: 'mobile-bg-breathe 12s ease-in-out infinite alternate',
                    }}
                />
                <style>{`
                    @keyframes mobile-bg-breathe {
                        from { opacity: 0.6; }
                        to   { opacity: 1; }
                    }
                `}</style>
                {/* Grain */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            </div>
        );
    }

    // --- DESKTOP: full neural background ---
    return <NeuralBackground />;
};

export default Background;
