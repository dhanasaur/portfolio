import React, { useEffect, useRef, useState, useCallback } from 'react';

const sections = [
    { id: 'root', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const SectionNavDots = () => {
    const [activeSection, setActiveSection] = useState('root');
    const rafRef = useRef(null);

    const getActiveSection = useCallback(() => {
        let closest = '';
        let minDist = Infinity;
        sections.forEach(({ id }) => {
            const el = id === 'root' ? document.body : document.getElementById(id);
            if (!el) return;
            const dist = Math.abs(el.getBoundingClientRect().top);
            if (dist < minDist) { minDist = dist; closest = id; }
        });
        if (closest) setActiveSection(closest);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                getActiveSection();
                rafRef.current = null;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        getActiveSection();
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [getActiveSection]);

    const scrollTo = (id) => {
        if (id === 'root') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
            {sections.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                    <div key={id} className="relative group flex items-center justify-end">
                        <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-[opacity] duration-250 text-xs text-white uppercase tracking-widest mr-2 whitespace-nowrap pointer-events-none">
                            {label}
                        </span>
                        <button
                            onClick={() => scrollTo(id)}
                            className={`rounded-full transition-[background-color,transform] duration-300 ease-out focus:outline-none ${
                                isActive
                                    ? 'w-2 h-2 bg-white scale-150'
                                    : 'w-2 h-2 bg-white/20 hover:bg-white/60'
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
