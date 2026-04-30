import React, { useState, useEffect, useCallback } from 'react';
import Background from './layout/Background';
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ScrollProgress from './components/ScrollProgress';
import SectionNavDots from './components/SectionNavDots';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Marquee from './components/Marquee';

// Lightweight scroll reveal — adds `is-visible` class when element enters viewport.
// Uses a SINGLE shared IntersectionObserver for all .reveal elements (not one per element).
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // fire once
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
}

function App() {
    const [loaderDone, setLoaderDone] = useState(false);

    const onLoaderComplete = useCallback(() => setLoaderDone(true), []);

    useEffect(() => {
        if (!loaderDone) return;
        // Small delay so DOM is fully painted before we start observing
        const t = setTimeout(initScrollReveal, 80);
        return () => clearTimeout(t);
    }, [loaderDone]);

    return (
        <>
            {/* Loader sits on top, unmounts via CSS fade after ~1.6s */}
            {!loaderDone && <Loader onComplete={onLoaderComplete} />}

            <CustomCursor />
            <ScrollProgress />

            <div className="relative w-full min-h-screen text-text-main overflow-hidden bg-background">
                <SectionNavDots />
                <Background />

                {/*
                  No framer-motion AnimatePresence here — we use a CSS fade-in
                  on the whole page wrapper driven by loaderDone state.
                  This eliminates the framer-motion JS animation overhead.
                */}
                <div
                    className="relative z-10 flex flex-col w-full"
                    style={{
                        opacity: loaderDone ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                    }}
                >
                    <Navbar />
                    <main className="flex flex-col w-full pb-24">
                        <Hero />

                        {/* Marquee ticker — acts as a visual separator after hero */}
                        <Marquee />

                        <div className="relative w-full max-w-[95rem] mx-auto px-6 space-y-32 pt-8">
                            <About />
                            <Skills />
                            <Achievements />
                        </div>

                        {/* Projects spans full width */}
                        <div className="mt-32">
                            <Projects />
                        </div>

                        <Contact />
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
