import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { handleScrambleHover } from '../utils/scrambleText';

const projects = [
    {
        title: "MARS Supply Chain",
        outcome: "Optimized emergency blood routing by 40%.",
        constraint: "The challenge wasn’t ML accuracy. It was unreliable input data from rural areas.",
        decision: "We sacrificed real-time perfection for offline-first reliability. Chose PWA over Native to ensure accessibility on $50 Android devices, even if it meant limited background sync capabilities.",
        stack: ["React", "Python", "PostgreSQL"],
        url: "#"
    },
    {
        title: "ATS Scorer",
        outcome: "Automated resume screening with semantic matching.",
        constraint: "PDF parsing is chaotic. Multi-column layouts broke standard extractors.",
        decision: "Implemented a heuristic-based layout detection layer before parsing. Switched from BERT to TF-IDF for the MVP to reduce inference cost by 90% while maintaining 85% relative accuracy.",
        stack: ["NLP", "Flask", "Spacy"],
        url: "#"
    },
    {
        title: "Friction Stir ML",
        outcome: "Predicted weld strength from images with 82% accuracy.",
        constraint: "We only had 100 microscopic images. Deep learning usually needs thousands.",
        decision: "Used aggressive physics-safe augmentation (rotation, lighting) and fine-tuned ResNet-18 instead of deeper models to prevent overfitting. Truth: The model is great at interpolation but fails at extrapolation.",
        stack: ["PyTorch", "OpenCV"],
        url: "#"
    },
    {
        title: "Facility Tracker",
        outcome: "Centralized maintenance requests for large campuses.",
        constraint: "Users refused to use complex forms. Adoption was near zero.",
        decision: "Refactored the entire UI to be 'One-Click' for common issues. Buried the complex categorization logic in the backend. Adoption tripled in one week.",
        stack: ["Spring Boot", "React"],
        url: "#"
    }
];

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]">
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>

            <div
                onClick={onClose}
                className="absolute inset-0 bg-background/95 backdrop-blur-md cursor-pointer transition-all"
            />

            <div className="relative w-full max-w-3xl bg-black border border-white/15 p-8 md:p-12 shadow-2xl overflow-hidden animate-[slideUpFade_0.4s_ease-out]">
                <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
                    <X size={28} />
                </button>

                <div className="space-y-10 relative z-20 py-2">
                    <div>
                        <h2 className="text-4xl font-heading tracking-tight text-white mb-3" onMouseEnter={handleScrambleHover} data-original={project.title}>{project.title}</h2>
                        <div className="h-[1px] w-12 bg-secondary/50 mb-6"></div>
                        <p className="text-white/80 text-lg leading-relaxed">{project.outcome}</p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-secondary">The Constraint</h4>
                        <p className="text-white/90 text-xl border-l border-white/20 pl-6 py-2 italic font-serif">
                            "{project.constraint}"
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-secondary">Decision & Trade-offs</h4>
                        <p className="text-white/70 leading-relaxed font-light">
                            {project.decision}
                        </p>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <a href={project.url} className="inline-flex items-center gap-3 text-white uppercase tracking-widest text-xs hover:text-secondary hover:gap-5 transition-all">
                            Initialize Deployment <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const [selected, setSelected] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    const activeProject = projects[currentIndex];

    // Lock body scroll under modal
    useEffect(() => {
        if (selected) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [selected]);

    // Mechanism: Channel Switching
    const changeScene = (newIndex) => {
        if (isGlitching || newIndex === currentIndex) return;

        setIsGlitching(true);
        // Switch the content precisely halfway through the physical glitch distortion
        setTimeout(() => {
            setCurrentIndex(newIndex);
        }, 150);

        // Resolve the transmission
        setTimeout(() => {
            setIsGlitching(false);
        }, 300);
    };

    // Auto-advance loop (5.5s intervals, aborted by hover)
    useEffect(() => {
        if (isHovered || isGlitching || selected) return;
        const timer = setInterval(() => {
            changeScene((currentIndex + 1) % projects.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [currentIndex, isHovered, isGlitching, selected]);

    return (
        <section id="projects" className="py-24 md:py-28 w-full flex flex-col justify-center min-h-[85vh]">
            <style>
                {`
                @keyframes transmission-shift {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-4px, 2px); filter: grayscale(1) invert(0); }
                    20% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); filter: grayscale(1) invert(0.2); }
                    40% { clip-path: inset(40% 0 50% 0); transform: translate(-4px, 1px); }
                    60% { clip-path: inset(80% 0 5% 0); transform: translate(4px, -1px); }
                    80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 4px); filter: invert(0.1); }
                    100% { clip-path: inset(30% 0 50% 0); transform: translate(2px, -4px); filter: grayscale(0) invert(0); }
                }
                .scene-is-glitching {
                    animation: transmission-shift 300ms linear forwards;
                    opacity: 0.8 !important;
                }
                `}
            </style>

            <div
                className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Header structure / Marker */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-[10px] md:text-xs font-mono text-white/50 uppercase tracking-[0.4em]">Sector 03 : Selected Work</h2>
                    <div className="hidden md:flex gap-4">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => changeScene(i)}
                                className={`text-xs font-mono tracking-widest transition-all duration-300 transform ${i === currentIndex ? 'text-white opacity-100 font-bold scale-110' : 'text-white/30 opacity-50 hover:opacity-100 hover:text-white/80'}`}
                            >
                                0{i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* The Isolated Scene Frame */}
                <div
                    className={`relative w-full border border-white/5 bg-white/[0.01] p-8 md:p-16 lg:p-20 backdrop-blur-sm transition-all duration-300 ${isGlitching ? 'scene-is-glitching' : 'opacity-100'}`}
                >
                    {/* Top: The Macro Constraint String */}
                    <div className="mb-20 md:mb-32">
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white leading-[1.1] tracking-tight">
                            "{activeProject.constraint}"
                        </h3>
                    </div>

                    {/* Middle: Clean identification */}
                    <div className="space-y-4 max-w-2xl mb-16 md:mb-24">
                        <div className="flex items-center gap-6">
                            <div className="h-[2px] w-12 bg-secondary"></div>
                            <h4
                                className="text-xl md:text-3xl font-sans font-medium text-white uppercase tracking-widest"
                                onMouseEnter={handleScrambleHover}
                                data-original={activeProject.title}
                            >
                                {activeProject.title}
                            </h4>
                        </div>
                        <p className="text-text-muted text-base md:text-lg leading-relaxed pl-[4.5rem]">
                            {activeProject.outcome}
                        </p>
                    </div>

                    {/* Bottom: Action and Tech Architecture */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
                        <div className="flex flex-wrap gap-2">
                            {activeProject.stack.map(tech => (
                                <span key={tech} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-white/10 text-white/50 hover:border-white/40 hover:text-white transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={() => setSelected(activeProject)}
                            className="group flex items-center gap-4 bg-white/5 px-6 py-3 hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
                        >
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white">System Readout</span>
                            <ArrowRight size={16} className="text-secondary transform group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Indicator (mirrors the top one for tight screens) */}
                <div className="md:hidden mt-8 flex justify-center gap-6">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => changeScene(i)}
                            className={`text-xs font-mono tracking-widest transition-all duration-300 ${i === currentIndex ? 'text-white opacity-100 font-bold' : 'text-white/30 opacity-50'}`}
                        >
                            0{i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {selected && (
                <ProjectModal project={selected} onClose={() => setSelected(null)} />
            )}
        </section>
    );
};

export default Projects;
