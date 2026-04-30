import React, { useRef, useEffect, useState, useCallback } from 'react';

/*
  AIShowcase — redesigned for top 1% portfolio quality.
  • Forward-pass signal propagation with traveling glow dots
  • Subtle dot-grid canvas background
  • Layer labels (IN → H₁ → H₂ → H₃ → OUT) that light up with signal
  • Stats proof-bar between header and main grid
  • 2×2 metric-forward bento cards beside neural canvas
*/

const LAYERS = [3, 5, 6, 5, 3];
const NODE_RADIUS = 4.5;
const LAYER_LABELS = ['IN', 'H₁', 'H₂', 'H₃', 'OUT'];

const STATS = [
    { value: '4', label: 'ML projects' },
    { value: '82%', label: 'top accuracy' },
    { value: '<200ms', label: 'inference' },
    { value: '10K+', label: 'records / day' },
];

const ML_CONCEPTS = [
    {
        id: 0,
        title: 'Computer Vision',
        metric: '82%',
        metricLabel: 'accuracy',
        desc: 'ResNet fine-tuning on microscopy data — production accuracy from just 100 images.',
        tags: ['CNN', 'ResNet'],
        icon: '◉',
    },
    {
        id: 1,
        title: 'NLP & Transformers',
        metric: '~3×',
        metricLabel: 'speed gain',
        desc: 'Semantic resume matching via TF-IDF + spaCy pipelines for production-grade ATS.',
        tags: ['spaCy', 'NLP'],
        icon: '◈',
    },
    {
        id: 2,
        title: 'Data Pipelines',
        metric: '10K+',
        metricLabel: 'records / day',
        desc: 'Robust ETL handling unreliable rural health data for the MARS supply chain.',
        tags: ['ETL', 'Pandas'],
        icon: '◊',
    },
    {
        id: 3,
        title: 'Model Deployment',
        metric: '<200ms',
        metricLabel: 'latency',
        desc: 'Flask + Docker containerised inference APIs, ready for production traffic.',
        tags: ['Flask', 'Docker'],
        icon: '▣',
    },
];

/* ─── Neural Canvas ─────────────────────────────────────────────────────── */

function NeuralCanvas({ width, height, mousePos }) {
    const canvasRef = useRef(null);
    const stateRef = useRef({ nodes: [], connections: [], time: 0, signal: -1.2 });
    const rafRef = useRef(null);

    useEffect(() => {
        if (!width || !height) return;
        const nodes = [];
        const connections = [];
        const netW = width * 0.84;
        const ox = (width - netW) / 2;
        const layerSpacing = netW / (LAYERS.length - 1);

        LAYERS.forEach((count, layerIdx) => {
            const x = ox + layerSpacing * layerIdx;
            const netH = height * 0.72;
            const offsetY = (height - netH) / 2;
            const nodeSpacing = netH / (count + 1);
            for (let i = 0; i < count; i++) {
                nodes.push({ x, y: offsetY + nodeSpacing * (i + 1), layerIdx, pulsePhase: Math.random() * Math.PI * 2 });
            }
        });

        let idx = 0;
        for (let l = 0; l < LAYERS.length - 1; l++) {
            const nextIdx = idx + LAYERS[l];
            for (let i = idx; i < idx + LAYERS[l]; i++) {
                for (let j = nextIdx; j < nextIdx + LAYERS[l + 1]; j++) {
                    connections.push({ from: i, to: j, fromLayer: l });
                }
            }
            idx += LAYERS[l];
        }

        stateRef.current.nodes = nodes;
        stateRef.current.connections = connections;
    }, [width, height]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !width || !height) return;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            const s = stateRef.current;
            s.time += 0.016;
            s.signal += 0.025;
            if (s.signal > LAYERS.length - 1 + 1.0) s.signal = -1.0;

            const sigLayer = Math.floor(s.signal);
            const sigFrac = Math.max(0, Math.min(1, s.signal - sigLayer));
            const isSignaling = s.signal >= 0 && sigLayer < LAYERS.length - 1;

            ctx.clearRect(0, 0, width, height);
            const mx = mousePos.current.x;
            const my = mousePos.current.y;

            // Dot-grid background
            const gridStep = 28;
            for (let gx = gridStep; gx < width; gx += gridStep) {
                for (let gy = gridStep; gy < height; gy += gridStep) {
                    ctx.beginPath();
                    ctx.arc(gx, gy, 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,255,255,0.04)';
                    ctx.fill();
                }
            }

            // Connections
            s.connections.forEach(({ from, to, fromLayer }) => {
                const a = s.nodes[from], b = s.nodes[to];
                if (!a || !b) return;
                const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
                const mDist = Math.hypot(mx - midX, my - midY);
                const prox = Math.max(0, 1 - mDist / 210);
                const isActive = isSignaling && fromLayer === sigLayer;
                const sigAlpha = isActive ? sigFrac * 0.32 : 0;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(255,255,255,${0.05 + prox * 0.28 + sigAlpha})`;
                ctx.lineWidth = 0.45 + prox * 1.6 + (isActive ? sigFrac * 0.7 : 0);
                ctx.stroke();

                // Traveling glow dot
                if (isActive && sigFrac > 0.01 && sigFrac < 0.99) {
                    const tx = a.x + (b.x - a.x) * sigFrac;
                    const ty = a.y + (b.y - a.y) * sigFrac;
                    const bell = 4 * sigFrac * (1 - sigFrac);
                    const g = ctx.createRadialGradient(tx, ty, 0, tx, ty, 10);
                    g.addColorStop(0, `rgba(255,255,255,${bell * 0.55})`);
                    g.addColorStop(0.5, `rgba(255,255,255,${bell * 0.15})`);
                    g.addColorStop(1, 'rgba(255,255,255,0)');
                    ctx.beginPath();
                    ctx.arc(tx, ty, 10, 0, Math.PI * 2);
                    ctx.fillStyle = g;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255,255,255,${bell * 0.95})`;
                    ctx.fill();
                }
            });

            // Nodes
            s.nodes.forEach((node) => {
                const mDist = Math.hypot(mx - node.x, my - node.y);
                const prox = Math.max(0, 1 - mDist / 155);
                const pulse = Math.sin(s.time * 2 + node.pulsePhase) * 0.22;
                let sigBoost = 0;
                if (isSignaling) {
                    if (node.layerIdx === sigLayer) sigBoost = Math.max(0, 1 - sigFrac * 1.8) * 0.75;
                    else if (node.layerIdx === sigLayer + 1) sigBoost = Math.pow(sigFrac, 1.4) * 0.75;
                }
                const radius = NODE_RADIUS + prox * 4 + pulse + sigBoost * 3.5;
                const alpha = 0.18 + prox * 0.65 + sigBoost * 0.55;

                if (prox > 0.04 || sigBoost > 0.08) {
                    const glowR = radius * 4.5;
                    const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
                    g.addColorStop(0, `rgba(255,255,255,${prox * 0.13 + sigBoost * 0.18})`);
                    g.addColorStop(1, 'rgba(255,255,255,0)');
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
                    ctx.fillStyle = g;
                    ctx.fill();
                }
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();
            });

            // Layer labels
            if (s.nodes.length > 0) {
                ctx.font = '500 9px monospace';
                ctx.textAlign = 'center';
                LAYERS.forEach((_, l) => {
                    const layerX = s.nodes.find(n => n.layerIdx === l)?.x;
                    if (layerX === undefined) return;
                    const isLit = isSignaling && (l === sigLayer || l === sigLayer + 1);
                    const boost = Math.max(
                        l === sigLayer ? Math.max(0, 1 - sigFrac * 2) : 0,
                        l === sigLayer + 1 ? sigFrac : 0
                    );
                    ctx.fillStyle = `rgba(255,255,255,${isLit ? 0.25 + boost * 0.55 : 0.18})`;
                    ctx.fillText(LAYER_LABELS[l], layerX, height - 12);
                });
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [width, height, mousePos]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ width: '100%', height: '100%', display: 'block' }}
        />
    );
}

/* ─── Main Section ──────────────────────────────────────────────────────── */

const AIShowcase = () => {
    const containerRef = useRef(null);
    const mousePos = useRef({ x: -9999, y: -9999 });
    const [dims, setDims] = useState({ w: 0, h: 0 });
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0) setDims({ w: Math.round(width), h: Math.round(height) });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const handleMouseMove = useCallback((e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mousePos.current = { x: -9999, y: -9999 };
    }, []);

    return (
        <section
            id="ai-showcase"
            className="w-full py-20 px-6 md:px-12 lg:px-24"
            style={{ contain: 'layout style' }}
        >
            <div className="max-w-6xl mx-auto">

                {/* Section label */}
                <div className="flex items-center gap-4 mb-3">
                    <div className="h-[1px] w-8 bg-white/30" />
                    <span className="text-[11px] font-sans uppercase tracking-[0.4em] text-white/60">
                        AI & Machine Learning
                    </span>
                </div>

                {/* Heading */}
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3"
                    style={{ transitionDelay: '100ms' }}
                >
                    Where code meets<br />
                    <span className="text-white">intelligence.</span>
                </h2>

                {/* Sub-copy */}
                <p
                    className="text-white/55 text-sm max-w-xl leading-relaxed mb-6"
                    style={{ transitionDelay: '200ms' }}
                >
                    I don't just train models — I ship them. From data pipelines to containerised
                    inference APIs, every ML system I build is production-ready.
                </p>

                {/* Stats proof-bar */}
                <div
                    className="flex flex-wrap items-center gap-x-8 gap-y-2 py-3 border-y border-white/[0.06] mb-8"
                    style={{ transitionDelay: '250ms' }}
                >
                    {STATS.map((stat, i) => (
                        <div key={i} className="flex items-baseline gap-2">
                            <span className="text-xl font-light text-white tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.15em]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                    <div className="ml-auto hidden md:flex items-center gap-2">
                        <span
                            className="inline-block w-1.5 h-1.5 rounded-full bg-white/30"
                            style={{ animation: 'pulse 2.4s ease-in-out infinite' }}
                        />
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                            Updating...
                        </span>
                    </div>
                </div>

                {/* ── Two-column grid: canvas + bento cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[57fr_43fr] gap-5 lg:gap-6">

                    {/* Neural canvas */}
                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden cursor-crosshair"
                        style={{ transitionDelay: '300ms', height: '350px' }}
                    >
                        {dims.w > 0 && dims.h > 0 && (
                            <NeuralCanvas
                                width={dims.w}
                                height={dims.h}
                                mousePos={mousePos}
                            />
                        )}

                        <div className="absolute top-5 left-5 flex items-center gap-2 pointer-events-none">
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest">
                                Hover to interact
                            </span>
                        </div>
                        <div className="absolute top-5 right-5 pointer-events-none">
                            <span className="text-[9px] font-mono text-white/18 uppercase tracking-wider">
                                {LAYERS.join(' → ')}
                            </span>
                        </div>
                    </div>

                    {/* 2×2 bento cards */}
                    <div
                        className="grid grid-cols-2 gap-3"
                        style={{ transitionDelay: '400ms' }}
                    >
                        {ML_CONCEPTS.map((concept) => {
                            const isHovered = hoveredCard === concept.id;
                            return (
                                <div
                                    key={concept.id}
                                    className={`
                                        relative flex flex-col justify-between
                                        p-5 rounded-xl border cursor-default
                                        transition-all duration-300
                                        ${isHovered
                                            ? 'bg-white/[0.055] border-white/[0.13]'
                                            : 'bg-white/[0.02] border-white/[0.06]'
                                        }
                                    `}
                                    onMouseEnter={() => setHoveredCard(concept.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {/* Top row: icon + tags */}
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="text-[11px] font-mono text-white/30">
                                            {concept.icon}
                                        </span>
                                        <div className="flex flex-wrap gap-1 justify-end">
                                            {concept.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[9px] font-mono text-white/25 border border-white/[0.08] px-1.5 py-0.5 rounded-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Metric — hero number */}
                                    <div className="mb-3">
                                        <div
                                            className={`
                                                text-[2rem] leading-none font-light tracking-tight
                                                transition-colors duration-300
                                                ${isHovered ? 'text-white' : 'text-white/70'}
                                            `}
                                        >
                                            {concept.metric}
                                        </div>
                                        <div className="text-[9px] font-mono text-white/25 mt-1 uppercase tracking-wider">
                                            {concept.metricLabel}
                                        </div>
                                    </div>

                                    {/* Title + description */}
                                    <div>
                                        <h4
                                            className={`
                                                text-[13px] font-medium mb-1.5
                                                transition-colors duration-300
                                                ${isHovered ? 'text-white' : 'text-white/75'}
                                            `}
                                        >
                                            {concept.title}
                                        </h4>
                                        <p className="text-[11px] text-white/30 leading-relaxed">
                                            {concept.desc}
                                        </p>
                                    </div>

                                    {/* Corner accent on hover */}
                                    <div
                                        className={`
                                            absolute bottom-0 right-0 w-10 h-10
                                            overflow-hidden rounded-br-xl pointer-events-none
                                            transition-opacity duration-300
                                            ${isHovered ? 'opacity-100' : 'opacity-0'}
                                        `}
                                    >
                                        <div className="absolute bottom-0 right-0 h-full w-px bg-white/15" />
                                        <div className="absolute bottom-0 right-0 w-full h-px bg-white/15" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AIShowcase;
