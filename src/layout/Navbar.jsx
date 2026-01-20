import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md bg-white/5 border-b border-white/10 transition-all duration-300">
            <div className="text-2xl font-display font-bold text-white uppercase tracking-tighter mix-blend-difference">
                Dhana Sundar A
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm font-sans uppercase tracking-widest text-white/80">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="hover:text-white hover:underline decoration-1 underline-offset-4 transition-all"
                    >
                        {item}
                    </a>
                ))}
            </div>

            {/* Mobile Menu Icon (Placeholder) */}
            <div className="md:hidden text-white font-sans text-sm uppercase">Menu</div>
        </nav>
    );
};

export default Navbar;
