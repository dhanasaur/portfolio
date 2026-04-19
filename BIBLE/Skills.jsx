import React, { useState } from 'react';

const domains = [
    {
        id: 'systems',
        label: 'Systems Core',
        description: 'Back-end logic & data integrity.',
        skills: [
            { name: 'Python', opacity: 1, story: "My go-to for logic. Learned its memory limits the hard way during a data scraping loop." },
            { name: 'Spring Boot', opacity: 0.9, story: "Heavy, but unbeatable for dependency injection when the team scales beyond 5 people." },
            { name: 'PostgreSQL', opacity: 0.95, story: "ACID compliance saved my MARS project when two donors claimed the same request." },
            { name: 'Docker', opacity: 0.85, story: "Solved the 'works on my machine' crisis during the hackathon finals." },
        ],
    },
    {
        id: 'interface',
        label: 'Human Interface',
        description: 'Interaction design & state management.',
        skills: [
            { name: 'React', opacity: 1, story: "Virtual DOM isn't magic. Profiling rendering cycles taught me the cost of object literals." },
            { name: 'Tailwind', opacity: 0.95, story: "Design tokens over hardcoded values. Consistency is key for long-term maintenance." },
            { name: 'Vanilla JS', opacity: 0.85, story: "Frameworks abstract the DOM, but understanding the underlying APIs is the real superpower." },
        ],
    },
    {
        id: 'intelligence',
        label: 'Machine Intelligence',
        description: 'Pattern recognition & predictive models.',
        skills: [
            { name: 'PyTorch', opacity: 0.8, story: "Debugging gradients is painful. Visualization tools became my best friend." },
            { name: 'Scikit-Learn', opacity: 0.9, story: "Don't use a cannon to kill a mosquito. Linear regression often beats deep learning in production." },
            { name: 'OpenCV', opacity: 0.75, story: "Image processing is fragile. Lighting conditions broke my first 10 prototypes." },
        ],
    },
];

const Skills = () => {
    const [activeDomain, setActiveDomain] = useState(null);

    return (
        <section
            id="skills"
            className="w-full py-32 px-6 md:px-12 lg:px-24"
            style={{ contain: 'layout style' }}
        >
            <div className="max-w-7xl mx-auto flex flex-col items-start">
                <h2 className="text-2xl font-heading text-white uppercase tracking-widest mb-6 reveal">
                    Competencies &amp; War Stories
                </h2>

                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                    {domains.map((domain, idx) => {
                        const isDimmed = activeDomain && activeDomain !== domain.id;
                        return (
                            <div
                                key={domain.id}
                                style={{ transitionDelay: `${idx * 150}ms` }}
                                // KEY FIX: was `opacity-30 blur-[2px]`
                                // blur-[2px] triggers GPU recompositing of ALL siblings on every
                                // mouseenter/leave — replaced with opacity-only fade.
                                // Specific transition properties instead of transition-all.
                                className={`reveal relative border-t border-white/10 pt-8 transition-opacity duration-400 ${
                                    isDimmed ? 'opacity-20' : 'opacity-100'
                                }`}
                                onMouseEnter={() => setActiveDomain(domain.id)}
                                onMouseLeave={() => setActiveDomain(null)}
                            >
                                <h3 className="text-3xl font-sans font-medium text-text-main mb-2">
                                    {domain.label}
                                </h3>
                                <p className="text-white mb-8 text-sm max-w-xs">
                                    {domain.description}
                                </p>

                                <div className="flex flex-col gap-4">
                                    {domain.skills.map((skill) => (
                                        <div
                                            key={skill.name}
                                            className="group/skill"
                                            style={{
                                                opacity: skill.opacity,
                                                // Specific transition — not transition-all
                                                transition: 'opacity 300ms ease',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                            onMouseLeave={e => e.currentTarget.style.opacity = skill.opacity}
                                        >
                                            <div className="flex items-baseline justify-between cursor-default">
                                                <span className="text-lg text-white">
                                                    {skill.name}
                                                </span>
                                            </div>

                                            {/* War story — CSS grid trick, no JS toggle needed */}
                                            <div className="grid grid-rows-[0fr] opacity-0 group-hover/skill:grid-rows-[1fr] group-hover/skill:opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out">
                                                <div className="overflow-hidden">
                                                    <p className="pt-2 text-sm text-white italic border-l border-white/20 pl-3">
                                                        "{skill.story}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
