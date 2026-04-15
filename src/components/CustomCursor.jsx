import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Add class to body to hide default cursor on desktop
        document.body.classList.add('md:cursor-none');

        const mouse = { x: 0, y: 0 };
        const ring = { x: 0, y: 0 };
        let animationFrameId;

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // Dot follows exactly
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
            }
        };

        const updateRing = () => {
            // Lerp function for smooth lagging
            ring.x += (mouse.x - ring.x) * 0.15;
            ring.y += (mouse.y - ring.y) * 0.15;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
            }
            animationFrameId = requestAnimationFrame(updateRing);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.tagName.toLowerCase() === 'a' || 
                                target.tagName.toLowerCase() === 'button' ||
                                window.getComputedStyle(target).cursor === 'pointer' ||
                                target.closest('a') || 
                                target.closest('button');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        updateRing();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
            document.body.classList.remove('md:cursor-none');
        };
    }, []);

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
            {/* The laggy ring */}
            <div 
                ref={ringRef}
                className={`absolute top-0 left-0 rounded-full border border-white transition-all duration-300 ease-out flex items-center justify-center ${
                    isHovering ? 'w-16 h-16 bg-white/20' : 'w-10 h-10 bg-transparent'
                }`}
                style={{ willChange: 'transform' }}
            />
            {/* The exact dot */}
            <div 
                ref={dotRef}
                className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference"
                style={{ willChange: 'transform' }}
            />
        </div>
    );
};

export default CustomCursor;
