import React, { useEffect, useState, useRef } from 'react';

const Hero = () => {
    const [isGlitching, setIsGlitching] = useState(false);
    const lastGlitchTime = useRef(0);

    useEffect(() => {
        // Trigger glitch exactly once on load
        setIsGlitching(true);
        lastGlitchTime.current = Date.now();
        setTimeout(() => setIsGlitching(false), 400);
    }, []);

    const handleMouseEnter = () => {
        const now = Date.now();
        // 6 second cooldown
        if (now - lastGlitchTime.current >= 6000) {
            setIsGlitching(true);
            lastGlitchTime.current = now;
            setTimeout(() => setIsGlitching(false), 400);
        }
    };

    return (
        <section id="root" className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            <style>
                {`
                @keyframes glitch-flicker {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
                    20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
                    40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 1px); }
                    60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -1px); }
                    80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 2px); }
                    100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -2px); }
                }
                .glitch-active {
                    animation: glitch-flicker 400ms linear infinite;
                }
                .glitch-layer {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    opacity: 0;
                    pointer-events: none;
                    mix-blend-mode: screen;
                }
                .glitch-active .glitch-layer {
                    opacity: 0.8;
                }
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
                `}
            </style>

            {/* Massive Headline */}
            <div className="relative z-10 w-full text-center mix-blend-overlay">
                <div 
                    className={`relative inline-block font-display font-extrabold text-white leading-none tracking-tighter transition-all duration-1000 ${isGlitching ? 'glitch-active' : ''}`}
                    style={{ fontSize: '14vw', textShadow: "0 0 60px rgba(255,255,255,0.3)" }}
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

            {/* Subtext - Brutalist & Industrial */}
            <div className="absolute bottom-12 left-6 md:left-12 flex flex-col md:flex-row gap-8 md:gap-24 text-white/60 font-sans text-sm md:text-base uppercase tracking-widest z-20 reveal">
                <div className="max-w-xs">
                    <p>Engineering Systems<br />With Clarity.</p>
                </div>
                <div className="max-w-xs">
                    <p>Designing For<br />Human Context.</p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-0 right-6 md:right-12 w-[1px] h-24 bg-gradient-to-t from-white/40 to-transparent z-20 animate-pulse" />
        </section>
    );
};

export default Hero;
