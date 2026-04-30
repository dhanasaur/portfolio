import React, { useRef } from 'react';
import { Github, Linkedin } from 'lucide-react';
import leetcodeIcon from '../assets/leetcode.png';

const IS_FINE = typeof window !== 'undefined'
    ? window.matchMedia('(pointer: fine)').matches : false;

const MagneticButton = ({ href, children, variant = 'primary' }) => {
    const ref = useRef(null);
    const bounds = useRef(null);
    const onMouseEnter = () => {
        if (!IS_FINE || !ref.current) return;
        bounds.current = ref.current.getBoundingClientRect();
        ref.current.style.transition = 'transform 0.1s ease';
    };
    const onMouseMove = (e) => {
        if (!IS_FINE || !ref.current || !bounds.current) return;
        const b = bounds.current;
        const dx = (e.clientX - (b.left + b.width / 2)) * 0.35;
        const dy = (e.clientY - (b.top + b.height / 2)) * 0.35;
        ref.current.style.transform = `translate(${dx}px,${dy}px)`;
    };
    const onMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1)';
        ref.current.style.transform = 'translate(0,0)';
        bounds.current = null;
    };

    const classes = variant === 'primary'
        ? 'px-10 py-4 bg-white text-background font-medium rounded-full hover:bg-white/90 transition-[background-color] duration-200 inline-block text-sm tracking-wide'
        : 'px-8 py-3.5 border border-white/15 text-white font-medium rounded-full hover:border-white/30 hover:text-white transition-[border-color,color] duration-200 inline-block text-sm tracking-wide';

    return (
        <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={classes}
            style={{ willChange: IS_FINE ? 'transform' : 'auto' }}
        >
            {children}
        </a>
    );
};

const SocialLink = ({ href, children, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center hover:border-white/25 hover:bg-white/[0.04] transition-[border-color,background-color] duration-200"
        aria-label={label}
    >
        {children}
    </a>
);

const Contact = () => (
    <section
        id="contact"
        className="w-full pt-24 pb-12 px-8 border-t border-white/[0.04] relative overflow-hidden"
    >
        {/* Main centered container */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
            
            {/* Added Wrapper for the first four blocks to force perfect centering */}
            <div className="flex flex-col items-center justify-center w-full mb-16">
                
                {/* Section label */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-[1px] w-8 bg-white/30" />
                    <span className="text-[11px] font-sans uppercase tracking-[0.4em] text-white">Contact</span>
                    <div className="h-[1px] w-8 bg-white/30" />
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                    Let's build<br />
                    <span className="text-white">something real.</span>
                </h2>

                <p className="text-white max-w-md mx-auto mb-12 text-base leading-relaxed">
                    I'm currently open to roles where engineering depth meets
                    product thinking. If that resonates — say hello.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <MagneticButton href="https://mail.google.com/mail/?view=cm&fs=1&to=dsdhana03@gmail.com" variant="primary">
                        Say Hello
                    </MagneticButton>
                    <MagneticButton href="https://github.com/dhanasaur" variant="secondary">
                        View GitHub
                    </MagneticButton>
                </div>

            </div> {/* End centered wrapper */}

            {/* Social Links block - already correctly centered */}
            <div className="flex gap-3 mb-16">
                <SocialLink href="https://github.com/dhanasaur" label="GitHub">
                    <Github size={18} className="text-white group-hover:text-white transition-[color] duration-200" />
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/dhana-sundar-a12847327" label="LinkedIn">
                    <Linkedin size={18} className="text-white group-hover:text-white transition-[color] duration-200" />
                </SocialLink>
                <SocialLink href="https://leetcode.com/u/dhanasaur/" label="LeetCode">
                    <img
                        src={leetcodeIcon}
                        alt="LeetCode"
                        className="w-[18px] h-[18px] opacity-40 group-hover:opacity-80 transition-[opacity] duration-200 invert brightness-0 filter"
                    />
                </SocialLink>
            </div>

            {/* Footer - already correctly centered */}
            <div className="pt-12 flex flex-col items-center gap-4">
                <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)' }} />
                <p className="text-[11px] text-white tracking-[0.15em]">
                    &copy; 2026 Dhana Sundar A
                </p>
            </div>
        </div>
    </section>
);

export default Contact;