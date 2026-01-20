import React from 'react';
import bgVideo from '../assets/bg.mp4';

const Background = () => {
    const videoRef1 = React.useRef(null);
    const videoRef2 = React.useRef(null);
    const [activeVideo, setActiveVideo] = React.useState(1);
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    React.useEffect(() => {
        const v1 = videoRef1.current;
        const v2 = videoRef2.current;

        // Set slow motion speed
        if (v1) v1.playbackRate = 0.6;
        if (v2) v2.playbackRate = 0.6;

        const handleTimeUpdate = () => {
            if (isTransitioning) return;

            const currentVideo = activeVideo === 1 ? v1 : v2;
            const nextVideo = activeVideo === 1 ? v2 : v1;

            // Start transition 2 seconds before end
            if (currentVideo.currentTime > currentVideo.duration - 2) {
                setIsTransitioning(true);
                nextVideo.currentTime = 0;
                nextVideo.play().then(() => {
                    setActiveVideo(activeVideo === 1 ? 2 : 1);
                    setTimeout(() => {
                        setIsTransitioning(false);
                    }, 1000); // Transition duration
                });
            }
        };

        if (v1) v1.ontimeupdate = activeVideo === 1 ? handleTimeUpdate : null;
        if (v2) v2.ontimeupdate = activeVideo === 2 ? handleTimeUpdate : null;

        return () => {
            if (v1) v1.ontimeupdate = null;
            if (v2) v2.ontimeupdate = null;
        };
    }, [activeVideo, isTransitioning]);

    return (
        <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-black">
            {/* Video Layer 1 */}
            <video
                ref={videoRef1}
                autoPlay
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-1000 ${activeVideo === 1 ? 'opacity-60' : 'opacity-0'}`}
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Video Layer 2 */}
            <video
                ref={videoRef2}
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-1000 ${activeVideo === 2 ? 'opacity-60' : 'opacity-0'}`}
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Grain Overlay for Texture (Optional but fits Brutalism) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Subtle Gradient to ensure text readability at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
    );
};

export default Background;
