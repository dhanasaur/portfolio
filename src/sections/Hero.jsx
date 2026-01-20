import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Massive Headline */}
            <div className="relative z-10 w-full text-center mix-blend-overlay">
                <motion.h1
                    initial={{ opacity: 0, filter: 'blur(30px)', scale: 1.1, letterSpacing: '0.2em' }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, letterSpacing: '-0.02em' }}
                    transition={{ duration: 3.25, ease: [0.22, 1, 0.36, 1] }} // Custom emotional easing
                    className="font-display font-extrabold text-white leading-none tracking-tighter"
                    style={{ fontSize: '14vw', textShadow: "0 0 60px rgba(255,255,255,0.3)" }}
                >
                    DHANA<br />SUNDAR
                </motion.h1>
            </div>

            {/* Subtext - Brutalist & Industrial */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-12 flex flex-col md:flex-row gap-8 md:gap-24 text-white/60 font-sans text-sm md:text-base uppercase tracking-widest z-20"
            >
                <div className="max-w-xs">
                    <p>Engineering Systems<br />With Clarity.</p>
                </div>
                <div className="max-w-xs">
                    <p>Designing For<br />Human Context.</p>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: 100 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute bottom-0 right-6 md:right-12 w-[1px] bg-white/20 z-20"
            />
        </section>
    );
};

export default Hero;
