import React, { useEffect, useState } from 'react';

const sections = [
    { id: 'root', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
];

const SectionNavDots = () => {
    const [activeSection, setActiveSection] = useState('root');

    useEffect(() => {
        const handleScroll = () => {
            let closestSection = '';
            let minDistance = Infinity;

            // Use the top viewport anchor to find which section is currently closest to the top
            sections.forEach(({ id }) => {
                const element = id === 'root' ? document.body : document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Distance from top of the viewport to the top of the element
                    const distance = Math.abs(rect.top);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestSection = id;
                    }
                }
            });

            if (closestSection) {
                setActiveSection(closestSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        if (id === 'root') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
            {sections.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                    <div key={id} className="relative group flex items-center justify-end">
                        {/* Tooltip */}
                        <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-white uppercase tracking-widest mr-2 whitespace-nowrap pointer-events-none">
                            {label}
                        </span>
                        
                        {/* Dot */}
                        <button
                            onClick={() => scrollToSection(id)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ease-out focus:outline-none ${
                                isActive ? 'bg-white scale-150' : 'bg-white/20 hover:bg-white/60'
                            }`}
                            aria-label={`Scroll to ${label}`}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default SectionNavDots;
