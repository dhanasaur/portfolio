import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import leetcodeIcon from '../assets/leetcode.png';
import Aurora from '../components/Aurora';

const Contact = () => {
    return (
        <section
            id="contact"
            className="w-full py-32 px-8 border-t border-white/5 bg-background relative overflow-hidden"
        >
            {/* Aurora — runs on its own canvas, isolated from the React render tree */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Aurora
                    colorStops={['#666666', '#5b5e63', '#76757e']}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
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
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=dsdhana03@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-background font-medium rounded-full hover:bg-white/90 transition-[background-color] duration-200"
                    >
                        Say Hello
                    </a>
                </div>

                <div
                    className="flex gap-8 pt-16 transition-[opacity] duration-500 reveal"
                    style={{
                        transitionDelay: '200ms',
                        opacity: 0.5,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
                >
                    <a
                        href="https://github.com/dhanasaur"
                        className="hover:text-white transition-[color] duration-200"
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/dhana-sundar-a12847327?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BjTQkyhbdRG%2Bjr5UPN1XlcA%3D%3D"
                        className="hover:text-white transition-[color] duration-200"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="https://leetcode.com/u/dhanasaur/"
                        className="group hover:text-white transition-[color] duration-200"
                    >
                        <img
                            src={leetcodeIcon}
                            alt="LeetCode"
                            className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-[opacity] duration-200 invert brightness-0 filter"
                        />
                    </a>
                </div>

                <div className="pt-24 text-xs text-text-subtle reveal" style={{ transitionDelay: '300ms' }}>
                    <p>© 2026 Dhana Sundar A. Designed for clarity.</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
