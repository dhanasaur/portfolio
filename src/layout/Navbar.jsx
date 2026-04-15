import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { handleScrambleHover } from '../utils/scrambleText';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md bg-white/5 border-b border-white/10 transition-all duration-300">
                <div 
                    className="text-2xl font-display font-bold text-white uppercase tracking-tighter mix-blend-difference cursor-pointer"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsMobileMenuOpen(false);
                    }}
                >
                    Dhana Sundar A
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-10 text-base lg:text-lg font-sans font-medium uppercase tracking-widest text-white/95 drop-shadow-md">
                    {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            onMouseEnter={handleScrambleHover}
                            className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-all focus:outline-none"
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Icon */}
                <button 
                    className="md:hidden text-white ml-auto focus:outline-none z-50"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Open Menu"
                >
                    <Menu size={28} />
                </button>
            </nav>

            {/* Mobile Full-Screen Overlay Menu */}
            <div 
                className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center transition-transform duration-500 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button 
                    className="absolute top-6 right-6 text-white p-2 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close Menu"
                >
                    <X size={32} />
                </button>
                
                <div className="flex flex-col gap-12 text-center">
                    {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="text-3xl font-display uppercase tracking-widest text-white hover:text-white/70 transition-colors focus:outline-none"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;
