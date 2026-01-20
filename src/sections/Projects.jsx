import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

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

const ProjectCard = ({ project, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group relative w-full border-t border-white/10 py-12 cursor-pointer transition-colors duration-500 hover:bg-white/[0.02]"
        >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
                {/* Layer 1: Surface */}
                <div className="md:w-1/3">
                    <h3 className="text-2xl font-sans font-medium text-text-main group-hover:text-white transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">{project.stack.join(" · ")}</p>
                </div>

                <div className="md:w-1/3">
                    <p className="text-text-subtle group-hover:text-text-main transition-colors duration-500">
                        {project.outcome}
                    </p>
                </div>

                {/* Layer 2: Constraint (Reveals on Hover) */}
                <div className="md:w-1/3 overflow-hidden">
                    <div className="translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <p className="text-sm text-white italic border-l-2 border-white/20 pl-3">
                            "{project.constraint}"
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            />

            <motion.div
                layoutId={`project-${project.title}`}
                className="relative w-full max-w-2xl bg-surface border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden"
            >
                <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-white">
                    <X size={24} />
                </button>

                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-sans font-medium text-white">{project.title}</h2>
                        <p className="text-text-muted mt-2 text-lg">{project.outcome}</p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-text-subtle">The Constraint</h4>
                        <p className="text-text-main border-l-2 border-white/10 pl-4 italic">
                            {project.constraint}
                        </p>
                    </div>

                    {/* Layer 3: The Decision */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-text-subtle">The Trade-off & Decision</h4>
                        <p className="text-text-main leading-relaxed">
                            {project.decision}
                        </p>
                    </div>

                    <div className="pt-6">
                        <a href={project.url} className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:opacity-70 transition-opacity">
                            View Deployment <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const [selected, setSelected] = useState(null);

    return (
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-2xl font-heading text-white uppercase tracking-widest mb-4">Selected Work</h2>
            </div>

            <div className="flex flex-col">
                {projects.map((p, i) => (
                    <ProjectCard key={i} project={p} onClick={() => setSelected(p)} />
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
