import React, { useEffect, useRef, useState } from 'react';
import finalImg from '../assets/pfinal.png';

const AnimatedCounter = ({ target, duration, formatFn }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = null;
                const easeOutCubic = x => 1 - Math.pow(1 - x, 3);

                const step = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    setCount(target * easeOutCubic(progress));

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                };

                requestAnimationFrame(step);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.5 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return <span ref={ref}>{formatFn(count)}</span>;
};

const TiltPhoto = ({ src }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; // max 15deg
        const rotateY = ((x - centerX) / centerX) * 15;

        card.style.transition = "none";
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = "transform 0.5s ease";
        card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg)`;
    };

    return (
        <div 
            ref={cardRef} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
            className="group w-[456px] h-[456px] rounded-full overflow-hidden z-10 will-change-transform"
        >
            <img
                src={src}
                alt="Profile"
                className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
            />
        </div>
    );
};

const About = () => {
    return (
        <section id="about" className="relative w-full py-20 px-6 flex justify-center items-center">
            <div className="max-w-[95rem] w-full reveal">
                <div className="relative glass-organic p-8 lg:p-20 overflow-hidden">
                    {/* Soft background mesh for card */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col lg:flex-row justify-between gap-20 items-center">
                        <div className="flex-1 space-y-10 lg:pr-12">
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-paper">
                                About <span className="text-secondary">Me</span>
                            </h2>
                            <p className="text-paper/80 leading-relaxed text-lg lg:text-xl reveal" style={{ transitionDelay: '100ms' }}>
                                I am a Computer Science Undergraduate at <span className="text-white font-medium">Sri Krishna College of Engineering and Technology</span> with a CGPA of <span className="text-secondary font-bold"><AnimatedCounter target={8.8} duration={1500} formatFn={v => v.toFixed(1)} /></span>.
                            </p>
                            <p className="text-paper/60 leading-relaxed text-lg lg:text-xl reveal" style={{ transitionDelay: '200ms' }}>
                                My focus lies in bridging the gap between theoretical AI models and robust backend systems. I engineer solutions that solve real-world problems with precision and scale.
                            </p>

                            <div className="flex gap-8 pt-6 reveal" style={{ transitionDelay: '300ms' }}>
                                <div className="space-y-1">
                                    <span className="text-3xl font-heading font-bold text-white block">
                                        <AnimatedCounter target={8.6} duration={1500} formatFn={v => v.toFixed(1)} />
                                    </span>
                                    <span className="text-xs text-secondary uppercase tracking-widest font-medium">CGPA</span>
                                </div>
                                <div className="w-[1px] bg-white/10 h-10 self-center"></div>
                                <div className="space-y-1">
                                    <span className="text-3xl font-heading font-bold text-white block">
                                        <AnimatedCounter target={200} duration={1500} formatFn={v => Math.floor(v) + "+"} />
                                    </span>
                                    <span className="text-xs text-secondary uppercase tracking-widest font-medium">DSA Problems</span>
                                </div>
                            </div>
                        </div>

                        {/* Abstract Representation of Logic/Brain */}
                        <div className="relative w-[512px] h-[512px] hidden lg:flex shrink-0 items-center justify-center reveal lg:-mr-8 xl:-mr-12" style={{ transitionDelay: '200ms' }}>
                            <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />

                            {/* Rotating Text Annotation */}
                            <svg className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] pointer-events-none" viewBox="0 0 512 512">
                                <defs>
                                    <path id="circlePath" d="M 256, 256 m -244, 0 a 244,244 0 0,1 488,0 a 244,244 0 0,1 -488,0" />
                                </defs>
                                <text className="fill-white/80 text-[11px] font-bold uppercase tracking-widest" style={{ letterSpacing: "0.2em" }}>
                                    <textPath href="#circlePath" startOffset="0%">
                                        SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp; SYSTEMS EVOLVE. SO DO I. &nbsp;•&nbsp;
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
