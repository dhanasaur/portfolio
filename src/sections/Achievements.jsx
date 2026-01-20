import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const achievements = [
    {
        id: "ideathon",
        year: "2023",
        title: "Inter-College Ideathon Winner",
        context: "Beat 50+ teams by prototyping a solution in 6 hours.",
        impact: "Shifted my mindset from 'perfect code' to 'rapid iteration'. I learned that a broken prototype that solves a problem is worth more than a perfect codebase that solves nothing."
    },
    {
        id: "fellowship",
        year: "2024",
        title: "AICTE Productization Fellowship",
        context: "Selected to convert an academic project into a deployed product.",
        impact: "Taught me the difference between a project and a product. I had to rewrite 60% of my 'clever' code because it wasn't maintainable by others."
    },
    {
        id: "lead",
        year: "2025",
        title: "Smart India Hackathon – College Level Top Performer",
        context: "Led a cross-functional student team through multiple SIH problem statements, coordinating development, reviews, and final submissions under strict timelines.",
        impact: "Learned that leadership isn’t about writing the most code. It’s about removing friction. By unblocking teammates and enforcing clarity, my personal output reduced, but the team delivered faster, cleaner, and with higher confidence."
    }
];

const Achievements = () => {
    const [expanded, setExpanded] = useState(null);

    return (
        <section id="achievements" className="w-full py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-heading text-white uppercase tracking-widest mb-16">
                    Milestones & Shifts
                </h2>

                <div className="flex flex-col">
                    {achievements.map((item) => {
                        const isOpen = expanded === item.id;
                        return (
                            <motion.div
                                key={item.id}
                                className={`border-b border-white/5 py-8 cursor-pointer group transition-colors duration-500 ${isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                                onClick={() => setExpanded(isOpen ? null : item.id)}
                            >
                                <div className="flex items-baseline justify-between px-4">
                                    <div className="flex gap-8 md:items-baseline">
                                        <span className="text-sm text-text-subtle font-mono hidden md:block">{item.year}</span>
                                        <h3 className={`text-xl md:text-2xl font-sans transition-colors duration-300 ${isOpen ? 'text-white' : 'text-text-muted group-hover:text-text-main'}`}>
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="text-text-subtle group-hover:text-white transition-colors">
                                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 pb-2 px-4 md:pl-24 max-w-2xl">
                                                <p className="text-text-main mb-6 leading-relaxed">
                                                    {item.context}
                                                </p>
                                                <div className="pl-4 border-l border-white/20">
                                                    <p className="text-sm text-white italic">
                                                        " {item.impact} "
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
