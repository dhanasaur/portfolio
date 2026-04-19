import React, { useEffect, useRef, useState } from 'react';
import finalImg from '../assets/pfinal.png';

const AnimatedCounter = ({ target, duration, formatFn }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = null;
                const easeOutCubic = x => 1 - Math.pow(1 - x, 3);
                const step = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    setCount(target * easeOutCubic(progress));
                    if (progress < 1) rafRef.current = requestAnimationFrame(step);
                };
                rafRef.current = requestAnimationFrame(step);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => {
            observer.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration]);

    return <span ref={ref}>{formatFn(count)}</span>;
};

// RAF-throttled tilt — no raw mousemove style thrashing
const TiltPhoto = ({ src }) => {
    const cardRef = useRef(null);
    const rafRef = useRef(null);
    const pendingRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        // Store latest values; only commit to DOM inside RAF
        pendingRef.current = { clientX: e.clientX, clientY: e.clientY };
        if (rafRef.current) return; // already scheduled
        rafRef.current = requestAnimationFrame(() => {
            const { clientX, clientY } = pendingRef.current;
            const rect = card.getBoundingClientRect();
            const rotateX = (((clientY - rect.top) / rect.height) - 0.5) * -20;
            const rotateY = (((clientX - rect.left) / rect.width) - 0.5) * 20;
            card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            rafRef.current = null;
        });
    };

    const handleMouseLeave = () => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
        // Remove inline transition after it completes so future RAF updates aren't sluggish
        setTimeout(() => {
            if (card) card.style.transition = 'none';
        }, 650);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // will-change only when the element actually moves — set via CSS hover
            className="group w-[456px] h-[456px] rounded-full overflow-hidden z-10"
            style={{ willChange: 'transform' }}
        >
            <img
                src={src}
                alt="Profile"
                className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-[filter] duration-500 pointer-events-none"
            />
        </div>
    );
};

const About = () => {
    return (
        <section
            id="about"
            className="relative w-full py-20 px-6 flex justify-center items-center"
            style={{ contain: 'layout style' }}
        >
            <div className="max-w-[95rem] w-full reveal">
                <div className="relative glass-organic p-8 lg:p-20 overflow-hidden">
                    {/* Static blurs — paint once, no perf cost */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col lg:flex-row justify-between gap-20 items-center">
                        <div className="flex-1 space-y-10 lg:pr-12">
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-paper">
                                About <span className="text-secondary">Me</span>
                            </h2>
                            <p
                                className="text-paper/80 leading-relaxed text-lg lg:text-xl reveal"
                                style={{ transitionDelay: '100ms' }}
                            >
                                I am a Computer Science Undergraduate at{' '}
                                <span className="text-white font-medium">
                                    Sri Krishna College of Engineering and Technology
                                </span>{' '}
                                with a CGPA of{' '}
                                <span className="text-secondary font-bold">
                                    <AnimatedCounter target={8.8} duration={1500} formatFn={v => v.toFixed(1)} />
                                </span>.
                            </p>
                            <p
                                className="text-paper/60 leading-relaxed text-lg lg:text-xl reveal"
                                style={{ transitionDelay: '200ms' }}
                            >
                                My focus lies in bridging the gap between theoretical AI models and robust
                                backend systems. I engineer solutions that solve real-world problems with
                                precision and scale.
                            </p>

                            <div className="flex gap-8 pt-6 reveal" style={{ transitionDelay: '300ms' }}>
                                <div className="space-y-1">
                                    <span className="text-3xl font-heading font-bold text-white block">
                                        <AnimatedCounter target={8.6} duration={1500} formatFn={v => v.toFixed(1)} />
                                    </span>
                                    <span className="text-xs text-secondary uppercase tracking-widest font-medium">CGPA</span>
                                </div>
                                <div className="w-[1px] bg-white/10 h-10 self-center" />
                                <div className="space-y-1">
                                    <span className="text-3xl font-heading font-bold text-white block">
                                        <AnimatedCounter target={200} duration={1500} formatFn={v => Math.floor(v) + '+'} />
                                    </span>
                                    <span className="text-xs text-secondary uppercase tracking-widest font-medium">DSA Problems</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative w-[512px] h-[512px] hidden lg:flex shrink-0 items-center justify-center reveal lg:-mr-8 xl:-mr-12"
                            style={{ transitionDelay: '200ms' }}
                        >
                            {/* Spinning border ring — GPU composited via transform */}
                            <div
                                className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full"
                                style={{ animation: 'spin 10s linear infinite', willChange: 'transform' }}
                            />

                            {/* Rotating orbit text — isolated GPU layer */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                viewBox="0 0 512 512"
                                style={{ animation: 'spin 60s linear infinite', willChange: 'transform' }}
                            >
                                <defs>
                                    <path
                                        id="circlePath"
                                        d="M 256, 256 m -244, 0 a 244,244 0 0,1 488,0 a 244,244 0 0,1 -488,0"
                                    />
                                </defs>
                                <text
                                    className="fill-white/80 text-[11px] font-bold uppercase tracking-widest"
                                    style={{ letterSpacing: '0.2em' }}
                                >
                                    <textPath href="#circlePath" startOffset="0%">
                                        SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I.
                                        &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE.
                                        SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS
                                        EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp;
                                    </textPath>
                                </text>
                            </svg>

                            <div className="absolute inset-6 border border-white/5 rounded-full pointer-events-none" />
                            <TiltPhoto src={finalImg} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
