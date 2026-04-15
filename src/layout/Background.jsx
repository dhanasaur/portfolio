import React, { useEffect, useRef } from 'react';
import bgVideo from '../assets/bg.mp4';

const Background = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const v = videoRef.current;

        // Initial default speed setup
        if (v) v.playbackRate = 0.3;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            let rate = 0.3 + (scrollY / viewportHeight) * 0.7;
            rate = Math.min(Math.max(rate, 0.3), 2.0); // clamped to max 2

            if (v) v.playbackRate = rate;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Force play if it gets stuck (some browsers might pause background elements)
        const checkPlayState = setInterval(() => {
            if (v && v.paused) {
                v.play().catch(e => console.log('Autoplay prevented', e));
            }
        }, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(checkPlayState);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-black">
            {/* Single Video Layer with native Loop */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Grain Overlay for Texture (Fits Brutalism) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Subtle Gradient to ensure text readability at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
    );
};

export default Background;
