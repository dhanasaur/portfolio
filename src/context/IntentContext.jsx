import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const IntentContext = createContext();

export const IntentProvider = ({ children }) => {
    const [mode, setMode] = useState('skimmer'); // 'skimmer' | 'explorer'
    const [isIdle, setIsIdle] = useState(false);
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const scrollVelocity = useRef(0);
    const lastScrollY = useRef(0);
    const lastScrollTime = useRef(Date.now());
    const interactionTimer = useRef(null);

    // Constants
    const IDLE_THRESHOLD = 2000; // 2 seconds
    const VELOCITY_THRESHOLD = 100; // Pixels per 100ms
    const EXPLORER_THRESHOLD = 3000; // Time in low velocity to switch to explorer

    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now();
            const currentScrollY = window.scrollY;
            const timeDelta = now - lastScrollTime.current;

            if (timeDelta > 50) {
                const distance = Math.abs(currentScrollY - lastScrollY.current);
                scrollVelocity.current = (distance / timeDelta) * 100;

                lastScrollY.current = currentScrollY;
                lastScrollTime.current = now;

                updateInteraction();

                // High velocity -> Skimmer
                if (scrollVelocity.current > VELOCITY_THRESHOLD) {
                    setMode('skimmer');
                }
            }
        };

        const handleInteraction = () => {
            updateInteraction();
        };

        const updateInteraction = () => {
            setLastInteraction(Date.now());
            setIsIdle(false);
            clearTimeout(interactionTimer.current);
            interactionTimer.current = setTimeout(() => {
                setIsIdle(true);
                // If idle and not scrolling fast, we might be exploring
                if (scrollVelocity.current < VELOCITY_THRESHOLD) {
                    // Logic to switch to explorer could be here or time-based
                }
            }, IDLE_THRESHOLD);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleInteraction);
        window.addEventListener('click', handleInteraction);

        // Explorer check interval
        const explorerInterval = setInterval(() => {
            const timeSinceFastScroll = Date.now() - lastScrollTime.current;
            if (timeSinceFastScroll > EXPLORER_THRESHOLD && scrollVelocity.current < VELOCITY_THRESHOLD) {
                setMode('explorer');
            }
        }, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleInteraction);
            window.removeEventListener('click', handleInteraction);
            clearInterval(explorerInterval);
            clearTimeout(interactionTimer.current);
        };
    }, []);

    const value = {
        mode, // 'skimmer' or 'explorer'
        isIdle,
        setMode, // Manual override if needed
    };

    return (
        <IntentContext.Provider value={value}>
            {children}
        </IntentContext.Provider>
    );
};

export const useIntent = () => {
    const context = useContext(IntentContext);
    if (!context) {
        throw new Error('useIntent must be used within an IntentProvider');
    }
    return context;
};
