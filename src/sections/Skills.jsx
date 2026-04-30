import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
    SiReact, SiTailwindcss, SiHtml5, SiCss, SiJavascript,
    SiNodedotjs, SiSpringboot, SiDjango, SiPython,
    SiCplusplus, SiC, SiTensorflow, SiPytorch, SiKeras,
    SiSwagger, SiFlutter,
} from '@icons-pack/react-simple-icons';

/* ─── Java icon (not in simple-icons) ─── */
const JavaIcon = ({ size = 24, color = 'white' }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
        <path d="M8.851 18.56s-.917.534.653.714c.575.085 1.239.134 1.897.134 1.07 0 2.092-.169 3.053-.484l-.29.168c-1.748.534-5.393.613-7.196-.07-.973-.373.083-.654.083-.654zm-.625-2.773s-1.028.761.542.924c.687.086 1.482.117 2.396.073l-.273.168c-1.68.546-5.073.625-6.63-.133-.789-.384.163-.71.163-.71zm3.681 4.753c2.078-.362 3.97-1.065 3.97-1.065l-.533.534s-3.553.625-5.962.257c-.854-.133.525-.258.525-.258zm6.35-9.677s1.593 1.338-.84 2.396c-1.897.826-4.754.96-6.507.048-.626-.325.84-.625 1.41-.7.232-.035.365-.058.365-.058-.42-.296-2.715 1.17-4.158 1.62-2.396.748-2.254-.398-.84-1.14 5.394-2.25 9.82-1.002 10.57-.166zm-7.855 5.392c-.22.168-.134.383-.134.383s1.41-.734 1.91-.995c.297-.168.625-.362.625-.362s-.098.168-.282.362c-.685.734-3.053 1.338-3.053 1.338l.934-.726zm4.456 2.477c2.396-.133 4.223-.826 4.223-.826s-.697.534-2.396.943c-1.897.458-4.223.398-5.606.12 0 0 .283-.242 1.779-.237zM14.835.12s2.396 2.396-2.27 6.078c-3.74 2.955-.853 4.638 0 6.564-2.183-1.968-3.784-3.7-2.71-5.316C11.48 5.2 16.164 3.914 14.835.12zM9.292 23.706c2.302.148 5.838-.082 5.921-1.174 0 0-.16.414-1.908.743-1.97.37-4.403.327-5.843.09 0 0 .295.244 1.83.34z" />
    </svg>
);

const TECH_LIST = [
    { name: 'React',       label: 'React',         Icon: SiReact },
    { name: 'Tailwind',    label: 'Tailwind CSS',  Icon: SiTailwindcss },
    { name: 'HTML',        label: 'HTML5',         Icon: SiHtml5 },
    { name: 'CSS',         label: 'CSS',           Icon: SiCss },
    { name: 'JavaScript',  label: 'JavaScript',    Icon: SiJavascript },
    { name: 'NodeJS',      label: 'Node.js',       Icon: SiNodedotjs },
    { name: 'SpringBoot',  label: 'Spring Boot',   Icon: SiSpringboot },
    { name: 'Django',      label: 'Django',        Icon: SiDjango },
    { name: 'Python',      label: 'Python',        Icon: SiPython },
    { name: 'Java',        label: 'Java',          Icon: JavaIcon },
    { name: 'CPP',         label: 'C++',           Icon: SiCplusplus },
    { name: 'C',           label: 'C',             Icon: SiC },
    { name: 'TensorFlow',  label: 'TensorFlow',    Icon: SiTensorflow },
    { name: 'PyTorch',     label: 'PyTorch',       Icon: SiPytorch },
    { name: 'Keras',       label: 'Keras',         Icon: SiKeras },
    { name: 'Swagger',     label: 'Swagger',       Icon: SiSwagger },
    { name: 'Flutter',     label: 'Flutter',       Icon: SiFlutter },
];

/* ─── Physics constants ─── */
const ITEM_SIZE   = 90;
const RADIUS      = ITEM_SIZE / 2;
const MAX_SPEED   = 1.2;
const MIN_SPEED   = 0.2;
const DAMPING     = 0.998;
const RESTITUTION = 0.7;
const REPULSE_R   = 160;
const REPULSE_STR = 8;          // inverse-square strength scalar
const JITTER_STR  = 0.02;       // Brownian micro-jitter

/* ─── Pure presentational chip ─── */
const TechChip = React.forwardRef(({ tech, onMouseEnter, onMouseLeave, hovered }, ref) => (
    <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="absolute top-0 left-0"
        style={{ width: ITEM_SIZE, height: ITEM_SIZE, willChange: 'transform', zIndex: hovered ? 20 : 1 }}
    >
        <div
            className={`
                w-full h-full rounded-2xl border flex flex-col items-center justify-center gap-1.5
                transition-all duration-300 cursor-default select-none
                ${hovered
                    ? 'bg-white/15 border-white/40 scale-110 shadow-[0_0_40px_rgba(255,255,255,0.12)]'
                    : 'bg-white/[0.05] border-white/20 scale-100'
                }
            `}
        >
            <tech.Icon size={28} color="white" />
            <span className={`text-[10px] font-mono uppercase tracking-wider text-white font-medium transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-70'}`}>
                {tech.label}
            </span>
        </div>
    </div>
));

/* ─── Main Skills section ─── */
const Skills = () => {
    const sectionRef   = useRef(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible]         = useState(false);
    const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

    const itemRefs   = useRef([]);
    const hoveredSet = useRef(new Set());
    const bodies     = useRef([]);
    const mouse      = useRef({ x: -9999, y: -9999 });
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    /* ── Visibility observer ── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    /* ── Measure container ── */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                setContainerSize({
                    w: entry.contentRect.width,
                    h: entry.contentRect.height,
                });
            }
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    /* ── Seed physics bodies ── */
    useEffect(() => {
        if (!containerSize.w || !containerSize.h) return;
        const W = containerSize.w;
        const H = containerSize.h;
        const cols = Math.max(1, Math.floor(W / (ITEM_SIZE + 20)));
        bodies.current = TECH_LIST.map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const angle = Math.random() * Math.PI * 2;
            const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED) * 0.5;
            return {
                x:  col * (ITEM_SIZE + 20) + 10 + Math.random() * 10,
                y:  row * (ITEM_SIZE + 20) + 10 + Math.random() * 10,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
            };
        });
    }, [containerSize.w, containerSize.h]);

    /* ── Mouse tracking ── */
    const handleMouseMove = useCallback((e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }, []);
    const handleMouseLeave = useCallback(() => {
        mouse.current = { x: -9999, y: -9999 };
    }, []);

    /* ── Master physics loop ── */
    useEffect(() => {
        if (!containerSize.w || !containerSize.h) return;
        const W = containerSize.w;
        const H = containerSize.h;
        let animId;

        const tick = () => {
            const bs = bodies.current;
            const mx = mouse.current.x;
            const my = mouse.current.y;

            for (let i = 0; i < bs.length; i++) {
                const p = bs[i];
                if (hoveredSet.current.has(i)) continue;

                // Brownian jitter — gives organic randomness
                p.vx += (Math.random() - 0.5) * JITTER_STR;
                p.vy += (Math.random() - 0.5) * JITTER_STR;

                // Mouse repulsion — inverse-square falloff for realism
                const cx = p.x + RADIUS;
                const cy = p.y + RADIUS;
                const dx = cx - mx;
                const dy = cy - my;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);
                if (dist > 0 && dist < REPULSE_R) {
                    const force = REPULSE_STR / (distSq + 100); // +100 prevents singularity
                    p.vx += dx * force;
                    p.vy += dy * force;
                }

                // Damping
                p.vx *= DAMPING;
                p.vy *= DAMPING;

                // Speed clamp
                const speed = Math.hypot(p.vx, p.vy);
                if (speed > MAX_SPEED) { const s = MAX_SPEED / speed; p.vx *= s; p.vy *= s; }
                if (speed < MIN_SPEED && speed > 0) { const s = MIN_SPEED / speed; p.vx *= s; p.vy *= s; }

                p.x += p.vx;
                p.y += p.vy;

                // Wall bounce
                if (p.x < 0)             { p.x = 0;             p.vx = Math.abs(p.vx) * RESTITUTION; }
                if (p.x > W - ITEM_SIZE) { p.x = W - ITEM_SIZE; p.vx = -Math.abs(p.vx) * RESTITUTION; }
                if (p.y < 0)             { p.y = 0;             p.vy = Math.abs(p.vy) * RESTITUTION; }
                if (p.y > H - ITEM_SIZE) { p.y = H - ITEM_SIZE; p.vy = -Math.abs(p.vy) * RESTITUTION; }
            }

            // Chip-to-chip elastic collisions
            for (let i = 0; i < bs.length; i++) {
                for (let j = i + 1; j < bs.length; j++) {
                    const a = bs[i], b = bs[j];
                    const dx = (b.x + RADIUS) - (a.x + RADIUS);
                    const dy = (b.y + RADIUS) - (a.y + RADIUS);
                    const dist = Math.hypot(dx, dy);
                    if (dist < ITEM_SIZE && dist > 0.001) {
                        const nx = dx / dist;
                        const ny = dy / dist;
                        const overlap = (ITEM_SIZE - dist) / 2;

                        // Separate
                        if (!hoveredSet.current.has(i)) { a.x -= nx * overlap; a.y -= ny * overlap; }
                        if (!hoveredSet.current.has(j)) { b.x += nx * overlap; b.y += ny * overlap; }

                        // Elastic impulse
                        const dvx = b.vx - a.vx;
                        const dvy = b.vy - a.vy;
                        const dot = dvx * nx + dvy * ny;
                        if (dot < 0) {
                            const impulse = dot * RESTITUTION;
                            if (!hoveredSet.current.has(i)) { a.vx += impulse * nx; a.vy += impulse * ny; }
                            if (!hoveredSet.current.has(j)) { b.vx -= impulse * nx; b.vy -= impulse * ny; }
                        }
                    }
                }
            }

            // Write to DOM
            for (let i = 0; i < bs.length; i++) {
                const el = itemRefs.current[i];
                if (el) el.style.transform = `translate(${bs[i].x}px, ${bs[i].y}px)`;
            }
            animId = requestAnimationFrame(tick);
        };

        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, [containerSize]);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="w-full py-32 px-6 md:px-12 lg:px-24"
            style={{ contain: 'layout style' }}
        >
            <div className="max-w-6xl mx-auto">

                {/* Section label */}
                <div className="flex items-center gap-4 mb-6 reveal">
                    <div className="h-[1px] w-8 bg-white/30" />
                    <span className="text-[11px] font-sans uppercase tracking-[0.4em] text-white">Competencies</span>
                </div>

                <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 reveal"
                    style={{ transitionDelay: '100ms' }}
                >
                    What I bring to<br />the table.
                </h2>

                <p
                    className="text-white/50 text-base max-w-xl mb-12 reveal"
                    style={{ transitionDelay: '150ms' }}
                >
                    The tools and technologies I use to bring changes to the world.
                </p>

                {/* ── Floating container ── */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative w-full rounded-3xl border border-white/[0.06] overflow-hidden reveal"
                    style={{
                        height: '432px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 100%)',
                        transitionDelay: '250ms',
                    }}
                >
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/[0.08] rounded-tl-lg pointer-events-none" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/[0.08] rounded-tr-lg pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/[0.08] rounded-bl-lg pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/[0.08] rounded-br-lg pointer-events-none" />

                    {/* Subtle grid lines */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Chips */}
                    {isVisible && containerSize.w > 0 && TECH_LIST.map((tech, i) => (
                        <TechChip
                            key={tech.name}
                            tech={tech}
                            hovered={hoveredIndex === i}
                            ref={el => { itemRefs.current[i] = el; }}
                            onMouseEnter={() => {
                                hoveredSet.current.add(i);
                                setHoveredIndex(i);
                            }}
                            onMouseLeave={() => {
                                hoveredSet.current.delete(i);
                                setHoveredIndex(-1);
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;