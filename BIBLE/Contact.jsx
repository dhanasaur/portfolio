import React, { useRef } from 'react';
import { Github, Linkedin } from 'lucide-react';
import leetcodeIcon from '../assets/leetcode.png';
import Aurora from '../components/Aurora';

const IS_FINE = typeof window !== 'undefined'
    ? window.matchMedia('(pointer: fine)').matches : false;

const MagneticButton = ({ href, children }) => {
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
        const dx = (e.clientX - (b.left + b.width / 2)) * 0.38;
        const dy = (e.clientY - (b.top + b.height / 2)) * 0.38;
        ref.current.style.transform = `translate(${dx}px,${dy}px)`;
    };
    const onMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1)';
        ref.current.style.transform = 'translate(0,0)';
        bounds.current = null;
    };

    return (
        <a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="px-8 py-4 bg-white text-background font-medium rounded-full hover:bg-white/90 transition-[background-color] duration-200 inline-block"
            style={{ willChange: IS_FINE ? 'transform' : 'auto' }}
        >
            {children}
        </a>
    );
};

const Contact = () => (
    <section
        id="contact"
        className="w-full py-32 px-8 border-t border-white/5 bg-background relative overflow-hidden"
    >
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Aurora colorStops={['#666666', '#5b5e63', '#76757e']} blend={0.5} amplitude={1.0} speed={0.5} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-12">
            <div className="space-y-4 reveal">
                <h2 className="text-4xl md:text-5xl font-sans font-medium text-text-main">
                    Ready to build systems?
                </h2>
                <p className="text-text-muted max-w-md mx-auto">
                    I'm currently open to roles where engineering meets product thinking.
                </p>
            </div>

            <div className="flex gap-8 pt-8 reveal" style={{ transitionDelay: '100ms' }}>
                <MagneticButton href="https://mail.google.com/mail/?view=cm&fs=1&to=dsdhana03@gmail.com">
                    Say Hello
                </MagneticButton>
            </div>

            <div
                className="flex gap-8 pt-16 reveal"
                style={{ transitionDelay: '200ms', opacity: 0.45, transition: 'opacity 0.4s ease' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}
            >
                <a href="https://github.com/dhanasaur" className="hover:text-white transition-[color] duration-200"><Github size={22} /></a>
                <a href="https://www.linkedin.com/in/dhana-sundar-a12847327?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BjTQkyhbdRG%2Bjr5UPN1XlcA%3D%3D" className="hover:text-white transition-[color] duration-200"><Linkedin size={22} /></a>
                <a href="https://leetcode.com/u/dhanasaur/" className="group hover:text-white transition-[color] duration-200">
                    <img src={leetcodeIcon} alt="LeetCode" className="w-[22px] h-[22px] opacity-70 group-hover:opacity-100 transition-[opacity] duration-200 invert brightness-0 filter" />
                </a>
            </div>


        </div>
    </section>
);

export default Contact;
