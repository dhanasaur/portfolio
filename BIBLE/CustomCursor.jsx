import React, { useEffect, useRef, useState } from 'react';

// Skip entirely on touch/coarse-pointer devices — saves event listener overhead
const IS_FINE_POINTER = typeof window !== 'undefined'
    ? window.matchMedia('(pointer: fine)').matches
    : false;

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!IS_FINE_POINTER) return;

        document.body.style.cursor = 'none';

        const mouse = { x: -100, y: -100 };
        const ring  = { x: -100, y: -100 };
        let rafId;

        // --- Dot: exact sync ---
        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate3d(${mouse.x}px,${mouse.y}px,0) translate(-50%,-50%)`;
            }
        };

        // --- Ring: magnetic lerp loop ---
        const lerp = (a, b, t) => a + (b - a) * t;
        const tick = () => {
            ring.x = lerp(ring.x, mouse.x, 0.12);
            ring.y = lerp(ring.y, mouse.y, 0.12);
            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate3d(${ring.x}px,${ring.y}px,0) translate(-50%,-50%)`;
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        // --- Hover detection ---
        const onMouseOver = (e) => {
            const t = e.target;
            const clickable = t.tagName === 'A' || t.tagName === 'BUTTON'
                || t.closest('a') || t.closest('button')
                || window.getComputedStyle(t).cursor === 'pointer';
            setIsHovering(!!clickable);
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);

        return () => {
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(rafId);
        };
    }, []);

    if (!IS_FINE_POINTER) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
            {/* Magnetic lag ring */}
            <div
                ref={ringRef}
                style={{
                    position: 'absolute', top: 0, left: 0,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.7)',
                    willChange: 'transform',
                    // Specific properties only — no transition-all
                    transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease',
                    width: isHovering ? '52px' : '36px',
                    height: isHovering ? '52px' : '36px',
                    backgroundColor: isHovering ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
            />
            {/* Precise dot with mix-blend-difference for contrast on any bg */}
            <div
                ref={dotRef}
                style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: '#fff',
                    mixBlendMode: 'difference',
                    willChange: 'transform',
                    transition: isHovering ? 'transform 0.2s ease' : 'none',
                    transform: isHovering ? 'translate(-50%,-50%) scale(2)' : 'translate(-50%,-50%) scale(1)',
                }}
            />
        </div>
    );
};

export default CustomCursor;
