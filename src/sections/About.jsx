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

// RAF-throttled tilt
const TiltPhoto = ({ src }) => {
    const cardRef = useRef(null);
    const rafRef = useRef(null);
    const pendingRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        pendingRef.current = { clientX: e.clientX, clientY: e.clientY };
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            const { clientX, clientY } = pendingRef.current;
            const rect = card.getBoundingClientRect();
            const rotateX = (((clientY - rect.top) / rect.height) - 0.5) * -14;
            const rotateY = (((clientX - rect.left) / rect.width) - 0.5) * 14;
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
        setTimeout(() => {
            if (card) card.style.transition = 'none';
        }, 650);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group w-[400px] h-[400px] rounded-full overflow-hidden z-10"
            style={{ willChange: 'transform' }}
        >
            <img
                src={src}
                alt="Dhana Sundar"
                className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-[filter] duration-700 pointer-events-none"
            />
        </div>
    );
};

const STATS = [
    { value: 8.8, format: v => v.toFixed(1), label: 'CGPA', duration: 1500 },
    { value: 200, format: v => Math.floor(v) + '+', label: 'DSA Problems', duration: 1500 },
    { value: 6, format: v => Math.floor(v) + '+', label: 'Projects Shipped', duration: 1200 },
];

const About = () => {
    return (
        <section
            id="about"
            className="relative w-full py-24 px-6 flex justify-center items-center"
            style={{ contain: 'layout style' }}
        >
            <div className="max-w-[95rem] w-full reveal">
                {/* Section label */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-[1px] w-8 bg-white/30" />
                    <span className="text-[11px] font-sans uppercase tracking-[0.4em] text-white">About</span>
                </div>

                <div className="relative glass-organic p-8 lg:p-16 xl:p-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.015] rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col lg:flex-row justify-between gap-16 items-center">
                        <div className="flex-1 space-y-8 lg:pr-12">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.05]">
                                Building systems<br />
                                <span className="text-white">that think.</span>
                            </h2>

                            <p className="text-white leading-relaxed text-base lg:text-lg max-w-xl reveal" style={{ transitionDelay: '100ms' }}>
                                CS undergraduate at <span className="text-white font-medium">Sri Krishna College of Engineering and Technology</span>,
                                specialising in the intersection of AI/ML pipelines and production backend systems.
                                I don't just prototype — I ship.
                            </p>

                            <p className="text-white leading-relaxed text-base lg:text-lg max-w-xl reveal" style={{ transitionDelay: '200ms' }}>
                                From optimising emergency supply chains to predicting material properties from
                                microscopy images — every project I build solves a constraint someone else called impossible.
                            </p>

                            {/* Stats row */}
                            <div className="flex gap-10 pt-4 reveal" style={{ transitionDelay: '300ms' }}>
                                {STATS.map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="text-3xl lg:text-4xl font-display font-bold text-white tabular-nums">
                                            <AnimatedCounter target={stat.value} duration={stat.duration} formatFn={stat.format} />
                                        </span>
                                        <span className="text-[10px] text-white uppercase tracking-[0.25em] mt-1 font-medium">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Photo with orbit ring */}
                        <div
                            className="relative w-[460px] h-[460px] hidden lg:flex shrink-0 items-center justify-center reveal"
                            style={{ transitionDelay: '200ms' }}
                        >
                            <div
                                className="absolute inset-0 border border-white/[0.06] rounded-full animate-spin"
                                style={{ animationDuration: '25s', animationTimingFunction: 'linear', willChange: 'transform' }}
                            />
                            <svg
                                className="orbit-svg absolute inset-0 w-full h-full pointer-events-none animate-spin"
                                viewBox="0 0 460 460"
                                style={{ animationDuration: '90s', animationTimingFunction: 'linear', willChange: 'transform' }}
                            >
                                <defs>
                                    <path
                                        id="circlePath"
                                        d="M 230, 230 m -218, 0 a 218,218 0 0,1 436,0 a 218,218 0 0,1 -436,0"
                                    />
                                </defs>
                                <text className="fill-white text-[10px] font-medium uppercase" style={{ letterSpacing: '0.25em' }}>
                                    <textPath href="#circlePath" startOffset="0%" textLength={1369.7} lengthAdjust="spacing">
                                        SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp;
                                    </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-6 border border-white/[0.04] rounded-full pointer-events-none" />
                            <TiltPhoto src={finalImg} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
