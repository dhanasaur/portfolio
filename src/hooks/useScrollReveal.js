// src/hooks/useScrollReveal.js
export function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    // Find all elements with the 'reveal' class
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => {
        // Ensure they start with initial state
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });

    return () => {
        elements.forEach(el => observer.unobserve(el));
    };
}
