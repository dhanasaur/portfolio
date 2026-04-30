import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const achievements = [
    {
        id: 'taiwan',
        archetype: 'The Global Innovator',
        year: 'Mar 2026',
        title: 'Taiwan International AI Hackathon — Top 22 Teams',
        venue: 'Selected from 10,000+ global applications',
        summary: "Built CircularX — an AI/ML-powered platform that converts industrial waste into valuable resources using intelligent matching, RL-based pricing, and automated compliance.",
        insight: "Competing globally resets your benchmarks. When your peers are from 50 countries, 'good enough for college' stops being a useful standard entirely.",
    },
    {
        id: 'aicte',
        archetype: 'The Product Architect',
        year: 'Nov 2025',
        title: 'AICTE Productization Fellowship — Selected',
        venue: 'AICTE IIC Regional Meet',
        summary: 'Selected to take MARS — an AI-driven ecosystem for blood shortage coordination — from academic concept toward a deployed, user-facing product.',
        insight: "Getting shortlisted taught me more than winning would have. Reviewers ask the questions your users will — their skepticism is the earliest form of product feedback.",
    },
    {
        id: 'civil',
        archetype: 'The Domain Specialist',
        year: 'Feb 2026',
        title: 'Civil Hackathon — Winner',
        venue: 'Kumaraguru College of Technology, Coimbatore',
        summary: 'Designed a crack detection system (~80% accuracy) for civil structures; incorporated user input to estimate crack depth and length for genuine on-site usability.',
        insight: "A model without context is just a guess. Letting users input field observations turned an 80% accurate classifier into a genuinely useful tool for engineers on site.",
    },
    {
        id: 'ctf',
        archetype: 'The Technical Specialist',
        year: 'Mar 2025',
        title: 'Capture The Flag — Winner',
        venue: 'PSG ITECH, Coimbatore',
        summary: 'Solved advanced obfuscation challenges using layered search and reverse-engineering techniques — the kind of low-level depth pure AI developers rarely develop.',
        insight: "Security is a mindset, not a checklist. Every layer of obfuscation is an assumption someone made about the attacker — find the assumption, break the layer.",
    },
];

const ARCHETYPE_COLORS = {
    'The Global Innovator':    'rgba(120,200,255,0.15)',
    'The Product Architect':   'rgba(180,140,255,0.15)',
    'The Domain Specialist':   'rgba(255,180,120,0.15)',
    'The Technical Specialist':'rgba(120,255,180,0.15)',
};

const Achievements = () => {
    const [expanded, setExpanded] = useState(null);

    return (
        <section
            id="achievements"
            className="w-full py-32 px-6 md:px-12 lg:px-24"
            style={{ contain: 'layout style' }}
        >
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-6 reveal">
                    <div className="h-[1px] w-8 bg-white/30" />
                    <span className="text-[11px] font-sans uppercase tracking-[0.4em] text-white">Milestones</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-16 reveal" style={{ transitionDelay: '100ms' }}>
                    Moments that<br />
                    <span className="text-white">shaped how I build.</span>
                </h2>

                <div className="flex flex-col">
                    {achievements.map((item, idx) => {
                        const isOpen = expanded === item.id;
                        return (
                            <div
                                key={item.id}
                                className="reveal border-b border-white/[0.06] cursor-pointer group"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                                onClick={() => setExpanded(isOpen ? null : item.id)}
                            >
                                <div className="flex items-center justify-between py-7 px-2 md:px-4">
                                    <div className="flex items-start gap-6 md:gap-10 flex-1 min-w-0">
                                        <span className="text-[11px] font-mono text-white/35 hidden md:block w-20 shrink-0 pt-1">
                                            {item.year}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <span style={{
                                                background: ARCHETYPE_COLORS[item.archetype],
                                                border: `1px solid ${ARCHETYPE_COLORS[item.archetype].replace('0.15', '0.45')}`,
                                            }} className="inline-block text-[9px] font-mono uppercase tracking-[0.25em] text-white/65 rounded-full px-3 py-0.5 mb-2">
                                                {item.archetype}
                                            </span>
                                            <h3 className={`text-lg md:text-xl font-sans font-medium transition-[color] duration-300 ${isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-[12px] text-white/35 mt-0.5">{item.venue}</p>
                                        </div>
                                    </div>
                                    <div className="text-white/40 group-hover:text-white transition-[color] duration-200 ml-4 shrink-0">
                                        <Plus
                                            size={18}
                                            className={`transition-transform duration-400 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`grid transition-[grid-template-rows,opacity] duration-450 ease-in-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="pb-8 px-2 md:px-4 md:pl-[7.5rem] max-w-2xl">
                                            <p className="text-white/70 mb-5 leading-relaxed text-sm">
                                                {item.summary}
                                            </p>
                                            <div className="pl-4 border-l border-white/15">
                                                <p className="text-[13px] text-white/50 italic leading-relaxed">
                                                    "{item.insight}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Achievements;