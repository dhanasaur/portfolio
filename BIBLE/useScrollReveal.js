// src/hooks/useScrollReveal.js
//
// IMPORTANT: This file is kept for backwards compatibility but the
// actual reveal logic now lives directly in App.jsx using a single
// shared IntersectionObserver (more efficient than this standalone version).
//
// The CSS for .reveal and .is-visible is defined in index.css:
//
//   .reveal {
//       opacity: 0;
//       transform: translateY(24px);
//       transition: opacity 0.7s ease-out, transform 0.7s ease-out;
//   }
//   .reveal.is-visible {
//       opacity: 1;
//       transform: translateY(0);
//   }
//
// Why CSS classes over JS style injection:
// - The old approach added `transition-all` dynamically which monitors ALL
//   CSS properties (including layout-triggering ones) causing style recalc jank.
// - CSS class toggling is batched by the browser and doesn't cause forced reflow.

export function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
}
