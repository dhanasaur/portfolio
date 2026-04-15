import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTotal = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTotal / height) * 100;
            setWidth(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial call set
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 h-[2px] bg-white z-[100] transition-all duration-100 ease-out" 
             style={{ width: `${width}%` }} 
        />
    );
};

export default ScrollProgress;
