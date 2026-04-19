import React, { useEffect, useState, useRef } from 'react';

// Glitch runs for 400ms, then a 6s cooldown before it can fire again.
// The glitch effect itself is GPU-composited (clip-path + transform only on
// the text node) so it doesn't reflow the rest of the page.
const GLITCH_DURATION = 400;
const GLITCH_COOLDOWN = 6000;

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

    // Fire once on mount
    useEffect(() => {
        triggerGlitch();
        return () => clearTimeout(timeoutRef.current);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleMouseEnter = () => {
        if (Date.now() - lastGlitchTime.current >= GLITCH_COOLDOWN) {
            triggerGlitch();
        }
    };

    return (
        <section
            id="root"
            className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden"
        >
            <style>{`
                @keyframes glitch-flicker {
                    0%   { clip-path: inset(20% 0 80% 0); transform: translate(-2px,  2px); }
                    20%  { clip-path: inset(60% 0 10% 0); transform: translate( 2px, -2px); }
                    40%  { clip-path: inset(40% 0 50% 0); transform: translate(-2px,  1px); }
                    60%  { clip-path: inset(80% 0  5% 0); transform: translate( 2px, -1px); }
                    80%  { clip-path: inset(10% 0 70% 0); transform: translate(-1px,  2px); }
                    100% { clip-path: inset(30% 0 50% 0); transform: translate( 1px, -2px); }
                }
                /* Active state on the wrapper — glitch layers respond via CSS */
                .glitch-active { animation: glitch-flicker ${GLITCH_DURATION}ms linear infinite; }

                /* Ghost layers — invisible until parent is .glitch-active */
                .glitch-layer {
                    position: absolute; top: 0; left: 0;
                    width: 100%; height: 100%;
                    opacity: 0;
                    pointer-events: none;
                    mix-blend-mode: screen;
                }
                .glitch-active .glitch-layer { opacity: 0.8; }

                .glitch-layer-before {
                    color: #ff00ff;
                    transform: translate(-3px, 1px);
                    animation: glitch-flicker 300ms linear infinite alternate-reverse;
                }
                .glitch-layer-after {
                    color: #00ffff;
                    transform: translate(3px, -1px);
                    animation: glitch-flicker 500ms linear infinite alternate;
                }
            `}</style>

            {/* Headline — mix-blend-mode: overlay creates one composited layer for the whole text block */}
            <div className="relative z-10 w-full text-center mix-blend-overlay">
                <div
                    className={`relative inline-block font-display font-extrabold text-white leading-none tracking-tighter ${
                        isGlitching ? 'glitch-active' : ''
                    }`}
                    style={{
                        fontSize: '14vw',
                        textShadow: '0 0 60px rgba(255,255,255,0.3)',
                        willChange: isGlitching ? 'transform' : 'auto',
                    }}
                    onMouseEnter={handleMouseEnter}
                >
                    <span className="block relative">
                        DHANA
                        <span className="glitch-layer glitch-layer-before" aria-hidden="true">DHANA</span>
                        <span className="glitch-layer glitch-layer-after" aria-hidden="true">DHANA</span>
                    </span>
                    <span className="block relative">
                        SUNDAR
                        <span className="glitch-layer glitch-layer-before" aria-hidden="true">SUNDAR</span>
                        <span className="glitch-layer glitch-layer-after" aria-hidden="true">SUNDAR</span>
                    </span>
                </div>
            </div>

            {/* Taglines */}
            <div className="absolute bottom-12 left-6 md:left-12 flex flex-col md:flex-row gap-8 md:gap-24 text-white/60 font-sans text-sm md:text-base uppercase tracking-widest z-20 reveal">
                <div className="max-w-xs">
                    <p>Engineering Systems<br />With Clarity.</p>
                </div>
                <div className="max-w-xs">
                    <p>Designing For<br />Human Context.</p>
                </div>
            </div>

            {/* Scroll pulse — GPU composited, negligible cost */}
            <div className="absolute bottom-0 right-6 md:right-12 w-[1px] h-24 bg-gradient-to-t from-white/40 to-transparent z-20 animate-pulse" />
        </section>
    );
};

export default Hero;
