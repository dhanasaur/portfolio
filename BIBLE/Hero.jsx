import React, { useEffect, useState, useRef } from 'react';

const GLITCH_DURATION = 400;
const GLITCH_COOLDOWN = 7000;

// Each character rises from below with individual staggered delay.
const SplitWord = ({ word, baseDelay = 0 }) => (
    <span aria-label={word} style={{ display: 'inline-flex' }}>
        {word.split('').map((char, i) => (
            <span
                key={i}
                aria-hidden="true"
                style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}
            >
                <span
                    className="char-inner"
                    style={{ display: 'inline-block', animationDelay: `${baseDelay + i * 55}ms` }}
                >
                    {char}
                </span>
            </span>
        ))}
    </span>
);

const Hero = () => {
    const [isGlitching, setIsGlitching] = useState(false);
    const lastGlitchTime = useRef(0);
    const timeoutRef = useRef(null);

    const triggerGlitch = () => {
        if (isGlitching) return;
        setIsGlitching(true);
        lastGlitchTime.current = Date.now();
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsGlitching(false), GLITCH_DURATION);
    };

    useEffect(() => {
        const t = setTimeout(triggerGlitch, 1350);
        return () => { clearTimeout(t); clearTimeout(timeoutRef.current); };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleMouseEnter = () => {
        if (Date.now() - lastGlitchTime.current >= GLITCH_COOLDOWN) triggerGlitch();
    };

    return (
        <section
            id="root"
            className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
        >
            <style>{`
                @keyframes char-rise {
                    0%   { opacity: 0; transform: translateY(105%) skewY(4deg); }
                    100% { opacity: 1; transform: translateY(0)    skewY(0deg); }
                }
                .char-inner {
                    animation: char-rise 0.85s cubic-bezier(0.19,1,0.22,1) both;
                }
                @keyframes glitch-flicker {
                    0%   { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
                    20%  { clip-path: inset(60% 0 10% 0); transform: translate( 2px,-2px); }
                    40%  { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 1px); }
                    60%  { clip-path: inset(80% 0  5% 0); transform: translate( 2px,-1px); }
                    80%  { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 2px); }
                    100% { clip-path: inset(30% 0 50% 0); transform: translate( 1px,-2px); }
                }
                .glitch-active { animation: glitch-flicker ${GLITCH_DURATION}ms linear infinite; }
                .glitch-layer {
                    position: absolute; inset: 0;
                    opacity: 0; pointer-events: none; mix-blend-mode: screen;
                }
                .glitch-active .glitch-layer { opacity: 0.75; }
                .glitch-layer-before {
                    color: #ff00ff; transform: translate(-3px,1px);
                    animation: glitch-flicker 300ms linear infinite alternate-reverse;
                }
                .glitch-layer-after {
                    color: #00ffff; transform: translate(3px,-1px);
                    animation: glitch-flicker 500ms linear infinite alternate;
                }
                @keyframes fade-up-in {
                    from { opacity:0; transform:translateY(10px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                @keyframes status-pulse {
                    0%,100% { opacity:1; } 50% { opacity:0.3; }
                }
                /* Mobile: simpler, faster animations */
                @media (max-width: 768px) {
                    .char-inner { animation-duration: 0.45s !important; }
                    .glitch-active { animation: none !important; }
                    .glitch-layer { display: none !important; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .char-inner { animation: none !important; opacity:1 !important; }
                    .glitch-active { animation: none !important; }
                }
            `}</style>

            {/* Available badge */}
            <div
                className="absolute top-24 left-6 md:left-12 flex items-center gap-3 z-20"
                style={{ animation: 'fade-up-in 0.6s ease 1.5s both' }}
            >
                <span style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: '#6ee7b7',
                    animation: 'status-pulse 2.5s ease-in-out infinite',
                }} />
                <span style={{
                    fontFamily: 'Archivo, sans-serif', fontSize: '10px',
                    letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                }}>
                    Available for work
                </span>
            </div>

            {/* Portfolio index */}
            <div
                className="absolute top-24 right-6 md:right-12 z-20 hidden md:block"
                style={{
                    fontFamily: 'monospace', fontSize: '10px',
                    color: 'rgba(255,255,255,0.18)', letterSpacing: '0.2em',
                    animation: 'fade-up-in 0.6s ease 1.7s both',
                }}
            >
                01 / PORTFOLIO 2026
            </div>

            {/* Main headline */}
            <div className="relative z-10 w-full text-center mix-blend-overlay select-none">
                <div
                    className={`relative inline-block font-display font-extrabold text-white leading-none tracking-tighter ${
                        isGlitching ? 'glitch-active' : ''
                    }`}
                    style={{
                        fontSize: 'clamp(68px, 14vw, 200px)',
                        textShadow: '0 0 80px rgba(255,255,255,0.18)',
                        willChange: isGlitching ? 'transform' : 'auto',
                    }}
                    onMouseEnter={handleMouseEnter}
                >
                    <span className="block relative">
                        <SplitWord word="DHANA" baseDelay={120} />
                        <span className="glitch-layer glitch-layer-before" aria-hidden="true">DHANA</span>
                        <span className="glitch-layer glitch-layer-after"  aria-hidden="true">DHANA</span>
                    </span>
                    <span className="block relative">
                        <SplitWord word="SUNDAR" baseDelay={430} />
                        <span className="glitch-layer glitch-layer-before" aria-hidden="true">SUNDAR</span>
                        <span className="glitch-layer glitch-layer-after"  aria-hidden="true">SUNDAR</span>
                    </span>
                </div>
            </div>

            {/* Taglines */}
            <div
                className="absolute bottom-12 left-6 md:left-12 flex flex-col md:flex-row gap-8 md:gap-24 text-white/50 font-sans text-sm md:text-base uppercase tracking-widest z-20"
                style={{ animation: 'fade-up-in 0.7s ease 1.3s both' }}
            >
                <div className="max-w-xs"><p>Engineering Systems<br />With Clarity.</p></div>
                <div className="max-w-xs hidden md:block"><p>Designing For<br />Human Context.</p></div>
            </div>

            <div className="absolute bottom-0 right-6 md:right-12 w-[1px] h-24 bg-gradient-to-t from-white/30 to-transparent z-20 animate-pulse" />
        </section>
    );
};

export default Hero;
