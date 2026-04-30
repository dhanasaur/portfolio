import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Intelligence', id: 'ai-showcase' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const rafRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 60);
                rafRef.current = null;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12"
                style={{
                    padding: scrolled ? '16px 48px' : '24px 48px',
                    background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                    transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
                }}
            >
                <button
                    className="font-display font-bold text-white uppercase tracking-tight text-lg cursor-pointer bg-transparent border-none focus:outline-none"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                    }}
                    style={{ letterSpacing: '-0.02em' }}
                >
                    DS<span className="text-white font-light ml-1">.</span>
                </button>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="relative px-5 py-2 text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-white hover:text-white transition-[color] duration-300 focus:outline-none group"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover:w-3/4 transition-[width] duration-300" />
                        </button>
                    ))}
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=dsdhana03@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-6 px-5 py-2 text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-background bg-white rounded-full hover:bg-white/90 transition-[background-color] duration-200"
                    >
                        Let's Talk
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-white focus:outline-none z-50"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>
            </nav>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    className="absolute top-6 right-6 text-white hover:text-white p-2 focus:outline-none transition-[color] duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close Menu"
                >
                    <X size={28} />
                </button>

                <div className="flex flex-col gap-10 text-center">
                    {NAV_ITEMS.map((item, i) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="text-4xl font-display uppercase tracking-wider text-white hover:text-white transition-[color] duration-200 focus:outline-none"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="absolute bottom-12 text-[10px] text-white uppercase tracking-[0.3em]">
                    Dhana Sundar A — 2026
                </div>
            </div>
        </>
    );
};

export default Navbar;
