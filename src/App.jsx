import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { initScrollReveal } from './hooks/useScrollReveal';

function App() {
  const [isLoaded, setIsLoaded] = useState(true);

  // useEffect(() => {
  //   // Simulate initial load or wait for resources
  //   const timer = setTimeout(() => setIsLoaded(true), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (isLoaded) {
      // Small timeout to allow DOM to render before observing
      const timer = setTimeout(() => {
        initScrollReveal();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      <div className="relative w-full min-h-screen text-text-main overflow-hidden bg-background">
                <SectionNavDots />
        <Background />

        <AnimatePresence>
          {!isLoaded ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            >
              <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-white animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="relative z-10 flex flex-col w-full"
            >
              <Navbar />
              <main className="flex flex-col w-full space-y-24 pb-24">
                <Hero />
                <div className="relative w-full max-w-[95rem] mx-auto px-6 space-y-32">
                  <About />
                  <Skills />
                  <Achievements />
                  <Projects />
                  <Contact />
                </div>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
