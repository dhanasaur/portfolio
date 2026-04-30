import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';

const projects = [
    {
        id: 0, index: '01', title: 'MARS Supply Chain',
        outcome: 'Optimized emergency blood routing by 43%.',
        constraint: "The challenge wasn't ML accuracy — it was unreliable input data from rural areas.",
        decision: 'Sacrificed real-time perfection for offline-first reliability. Chose Flutter over Native development to ensure better performance and broader accessibility across low-end Android devices..',
        stack: ['React', 'Python', 'PostgreSQL'], category: 'Full-Stack', url: '#',
        accent: 'rgba(120,200,255,0.15)', accentSolid: '#78c8ff',
    },
    {
        id: 1, index: '02', title: 'ATS Scorer',
        outcome: 'Automated resume screening with semantic matching.',
        constraint: 'PDF parsing is chaotic — multi-column layouts broke standard extractors.',
        decision: 'Built a heuristic-based layout detection layer before parsing. Chose TF-IDF over BERT for the MVP to cut inference cost by 90%.',
        stack: ['NLP', 'Flask', 'Spacy'], category: 'AI / ML', url: '#',
        accent: 'rgba(180,140,255,0.15)', accentSolid: '#b48cff',
    },
    {
        id: 2, index: '03', title: 'Friction Stir ML',
        outcome: 'Predicted weld strength from microscopic images — 82% accuracy.',
        constraint: 'Only 100 microscopic images available. Deep learning needs thousands.',
        decision: 'Physics-safe augmentation + fine-tuned ResNet-18 to prevent overfitting. Great at interpolation, fails at extrapolation — documented honestly.',
        stack: ['PyTorch', 'OpenCV', 'ResNet'], category: 'AI / ML', url: '#',
        accent: 'rgba(255,180,120,0.15)', accentSolid: '#ffb478',
    },
    {
        id: 3, index: '04', title: 'Facility Tracker',
        outcome: 'Centralized maintenance requests for large campuses.',
        constraint: 'Users refused complex forms. Adoption was near zero.',
        decision: "Refactored entire UI to 'One-Click' for common issues. Buried categorisation logic in the backend. Adoption tripled in one week.",
        stack: ['Spring Boot', 'React'], category: 'Full-Stack', url: '#',
        accent: 'rgba(120,255,180,0.15)', accentSolid: '#78ffb4',
    },
    {
  id: 4,
  index: '05',
  title: 'CircularX — AI-Powered Resource Exchange',
  outcome: 'Standardised trust across listings through an interpretable quality score.',
  constraint: 'Information asymmetry caused low buyer confidence and failed deals.',
  decision: 'Built a confidence-weighted ML scoring system and surfaced explainable outputs in the UI for transparency.',
  stack: ['Python', 'PyTorch', 'Scikit-learn', 'Vite + React'],
  category: 'Full-Stack ML',
  url: '#',
  accent: 'rgba(180,120,255,0.15)',
  accentSolid: '#30006aff'
},
];

/* ─── CSS ─── */
const CSS = `
@keyframes proj-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes proj-fadeUp {
  from { opacity:0; transform:translateY(30px) scale(0.97); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes proj-overlayIn {
  from { opacity:0; }
  to   { opacity:1; }
}
@keyframes proj-cardReveal {
  from { opacity:0; transform:translateY(40px) scale(0.92); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes proj-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes proj-lineSweep {
  from { width:0; }
  to   { width:100%; }
}
@keyframes proj-glow {
  0%,100% { opacity:0.3; }
  50%     { opacity:0.7; }
}
.proj-marquee-track {
  display: flex;
  animation: proj-marquee 30s linear infinite;
  will-change: transform;
}
.proj-marquee-track.paused {
  animation-play-state: paused;
}
.proj-marquee-track:hover {
  animation-play-state: paused;
}
.proj-card-wrap {
  flex-shrink: 0;
  padding: 0 12px;
}
`;

/* ─── Flowing Card ─── */
function FlowingCard({ project, onClick, isPaused }) {
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const el = cardRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
        el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.04)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHovered(false);
        const el = cardRef.current;
        if (el) el.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    }, []);

    return (
        <div className="proj-card-wrap" style={{ width: 400 }}>
            <div
                ref={cardRef}
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: '100%',
                    height: 440,
                    borderRadius: '1.25rem',
                    border: hovered ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.1)',
                    background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    cursor: 'pointer',
                    transition: 'border 0.3s, background 0.3s, box-shadow 0.4s, transform 0.15s ease-out',
                    boxShadow: hovered
                        ? `0 0 40px ${project.accent}, inset 0 1px 0 rgba(255,255,255,0.08)`
                        : '0 0 0 transparent',
                    position: 'relative',
                    overflow: 'hidden',
                    willChange: 'transform',
                }}
            >
                {/* glow orb */}
                {hovered && (
                    <div style={{
                        position: 'absolute', top: '-30%', right: '-20%',
                        width: 200, height: 200, borderRadius: '50%',
                        background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
                        animation: 'proj-glow 2s ease-in-out infinite',
                        pointerEvents: 'none',
                    }} />
                )}

                {/* top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <span style={{
                        fontFamily: 'monospace', fontSize: 10,
                        color: 'rgba(255,255,255,0.2)', letterSpacing: '0.3em',
                    }}>{project.index}</span>
                    <span style={{
                        fontSize: 9, fontFamily: 'Archivo, sans-serif',
                        textTransform: 'uppercase', letterSpacing: '0.25em',
                        color: hovered ? project.accentSolid : 'rgba(255,255,255,0.3)',
                        border: `1px solid ${hovered ? project.accentSolid + '44' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 999, padding: '3px 10px',
                        transition: 'all 0.3s',
                    }}>{project.category}</span>
                </div>

                {/* title */}
                <h3 style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                    textTransform: 'uppercase', letterSpacing: '-0.03em',
                    color: hovered ? '#fff' : 'rgba(255,255,255,0.8)',
                    lineHeight: 1.1, margin: 0, transition: 'color 0.3s',
                    position: 'relative', zIndex: 1,
                }}>{project.title}</h3>

                {/* outcome */}
                <p style={{
                    fontFamily: 'Archivo, sans-serif', fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.4)', lineHeight: 1.65,
                    margin: 0, flexGrow: 1, position: 'relative', zIndex: 1,
                }}>{project.outcome}</p>

                {/* stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
                    {project.stack.map(s => (
                        <span key={s} style={{
                            fontFamily: 'monospace', fontSize: 9,
                            textTransform: 'uppercase', letterSpacing: '0.15em',
                            color: 'rgba(255,255,255,0.25)',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 4, padding: '3px 8px',
                        }}>{s}</span>
                    ))}
                </div>

                {/* bottom line + arrow */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        height: 1, flexGrow: 1, marginRight: '1rem',
                        background: hovered ? `linear-gradient(90deg, ${project.accentSolid}44, transparent)` : 'rgba(255,255,255,0.06)',
                        transition: 'background 0.4s',
                    }} />
                    <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        border: hovered ? `1px solid ${project.accentSolid}66` : '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: hovered ? project.accentSolid : 'rgba(255,255,255,0.25)',
                        transition: 'all 0.3s',
                    }}>
                        <ArrowUpRight size={12} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Detail Overlay ─── */
function DetailOverlay({ project, onClose }) {
    useEffect(() => {
        const handler = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!project) return null;

    const Section = ({ label, children, delay }) => (
        <div style={{ animation: `proj-fadeUp 0.5s ease ${delay}s both` }}>
            <span style={{
                fontFamily: 'Archivo, sans-serif', fontSize: 9,
                textTransform: 'uppercase', letterSpacing: '0.35em',
                color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: '0.75rem',
            }}>{label}</span>
            {children}
        </div>
    );

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(5,5,5,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                animation: 'proj-overlayIn 0.3s ease both',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(1rem, 4vw, 3rem)',
                overflowY: 'auto',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%', maxWidth: 800,
                    animation: 'proj-cardReveal 0.55s cubic-bezier(0.19,1,0.22,1) 0.1s both',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1.5rem',
                    background: 'rgba(255,255,255,0.02)',
                    position: 'relative', overflow: 'hidden',
                }}
            >
                {/* scan lines */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
                }} />

                {/* accent glow */}
                <div style={{
                    position: 'absolute', top: -60, right: -60,
                    width: 250, height: 250, borderRadius: '50%',
                    background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)`,
                    opacity: 0.5, pointerEvents: 'none',
                }} />

                {/* shimmer */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'proj-shimmer 4s linear infinite',
                    pointerEvents: 'none', borderRadius: 'inherit',
                }} />

                <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(1.75rem, 4vw, 3rem)' }}>
                    {/* header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div style={{ animation: 'proj-fadeUp 0.4s ease 0.15s both' }}>
                            <span style={{
                                fontFamily: 'monospace', fontSize: 9,
                                letterSpacing: '0.4em', color: project.accentSolid,
                                textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem',
                                opacity: 0.7,
                            }}>{project.index} / {project.category}</span>
                            <h2 style={{
                                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                                fontSize: 'clamp(1.6rem, 4vw, 2.75rem)',
                                textTransform: 'uppercase', letterSpacing: '-0.04em',
                                color: '#fff', margin: 0, lineHeight: 1.05,
                            }}>{project.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '50%', width: 40, height: 40,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                                flexShrink: 0, transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* divider */}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `linear-gradient(90deg, transparent, ${project.accentSolid}66, transparent)`,
                            animation: 'proj-lineSweep 0.7s cubic-bezier(0.19,1,0.22,1) 0.2s both',
                        }} />
                    </div>

                    {/* outcome */}
                    <Section label="Outcome" delay={0.2}>
                        <p style={{
                            fontFamily: 'Archivo, sans-serif', fontSize: '1rem',
                            color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0,
                        }}>{project.outcome}</p>
                    </Section>

                    {/* content grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '2rem', marginTop: '2rem',
                    }}>
                        <Section label="The Constraint" delay={0.3}>
                            <p style={{
                                fontFamily: 'Archivo, sans-serif', fontSize: '0.92rem',
                                color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
                                fontStyle: 'italic',
                                borderLeft: `2px solid ${project.accentSolid}44`,
                                paddingLeft: '1rem', margin: 0,
                            }}>"{project.constraint}"</p>
                        </Section>

                        <Section label="Decision & Trade-offs" delay={0.4}>
                            <p style={{
                                fontFamily: 'Archivo, sans-serif', fontSize: '0.88rem',
                                color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0,
                            }}>{project.decision}</p>
                        </Section>
                    </div>

                    {/* footer */}
                    <div style={{
                        marginTop: '2.5rem', paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                        justifyContent: 'space-between', gap: '1rem',
                        animation: 'proj-fadeUp 0.5s ease 0.5s both',
                    }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {project.stack.map(s => (
                                <span key={s} style={{
                                    fontFamily: 'monospace', fontSize: 10,
                                    textTransform: 'uppercase', letterSpacing: '0.2em',
                                    color: project.accentSolid,
                                    border: `1px solid ${project.accentSolid}33`,
                                    borderRadius: 999, padding: '4px 14px',
                                    opacity: 0.8,
                                }}>{s}</span>
                            ))}
                        </div>
                        <a
                            href={project.url}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                fontFamily: 'Archivo, sans-serif', fontSize: 10,
                                textTransform: 'uppercase', letterSpacing: '0.25em',
                                color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                        >
                            View Project <ExternalLink size={11} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const trackRef = useRef(null);

    // Duplicate projects array 4x for seamless loop
    const loopedProjects = [...projects, ...projects, ...projects, ...projects];

    return (
        <section
            id="projects"
            style={{
                width: '100%',
                padding: 'clamp(4rem, 8vw, 8rem) 0',
                contain: 'layout style',
                overflow: 'hidden',
            }}
        >
            <style>{CSS}</style>

            {/* Section Header */}
            <div style={{
                maxWidth: '72rem', margin: '0 auto',
                padding: '0 clamp(1.5rem, 4vw, 6rem)',
                marginBottom: '3.5rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ height: 1, width: 32, background: 'rgba(255,255,255,0.3)' }} />
                    <span style={{
                        fontFamily: 'Archivo, sans-serif', fontSize: 11,
                        textTransform: 'uppercase', letterSpacing: '0.4em',
                        color: 'rgba(255,255,255,0.5)',
                    }}>Selected Work</span>
                </div>
                <h2 style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
                    textTransform: 'uppercase', letterSpacing: '-0.04em',
                    color: '#fff', margin: 0, lineHeight: 1.05,
                }}>
                    Projects built on<br />
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>real constraints.</span>
                </h2>
                <p style={{
                    fontFamily: 'Archivo, sans-serif', fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
                    letterSpacing: '0.2em', marginTop: '1.25rem',
                }}>— Click any card to explore</p>
            </div>

            {/* Flowing Marquee */}
            <div style={{ position: 'relative' }}>
                {/* Left/Right fade masks */}
                <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
                    background: 'linear-gradient(90deg, #050505 0%, transparent 100%)',
                    zIndex: 2, pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
                    background: 'linear-gradient(-90deg, #050505 0%, transparent 100%)',
                    zIndex: 2, pointerEvents: 'none',
                }} />

                <div
                    ref={trackRef}
                    className={`proj-marquee-track${selectedProject ? ' paused' : ''}`}
                >
                    {loopedProjects.map((p, i) => (
                        <FlowingCard
                            key={`${p.id}-${i}`}
                            project={p}
                            isPaused={!!selectedProject}
                            onClick={() => setSelectedProject(p)}
                        />
                    ))}
                </div>
            </div>

            {/* Detail Overlay */}
            {selectedProject && (
                <DetailOverlay
                    key={selectedProject.id}
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}