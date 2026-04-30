// Infinite horizontal ticker — acts as a visual section divider
// Pure CSS animation, zero JS, zero re-renders, GPU composited.
export default function Marquee() {
    const items = [
        'AVAILABLE FOR WORK',
        'ENGINEERING SYSTEMS',
        'COIMBATORE, IN',
        'CS UNDERGRADUATE',
        'AI · ML · BACKEND',
        '2026',
    ];

    // Duplicate content so the seam is invisible
    const track = [...items, ...items, ...items, ...items];

    return (
        <div
            style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                padding: '14px 0',
                position: 'relative',
                zIndex: 10,
            }}
        >
            <style>{`
                @keyframes marquee-run {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-25%); }
                }
                .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee-run 28s linear infinite;
                    will-change: transform;
                }
                /* Pause on hover — a nice touch */
                .marquee-track:hover {
                    animation-play-state: paused;
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee-track { animation: none; }
                }
            `}</style>

            <div className="marquee-track">
                {track.map((item, i) => (
                    <span
                        key={i}
                        style={{
                            fontFamily: 'Archivo, sans-serif',
                            fontSize: '10px',
                            fontWeight: 500,
                            letterSpacing: '0.3em',
                            color: 'rgba(255,255,255,0.22)',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            padding: '0 40px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '40px',
                        }}
                    >
                        {item}
                        <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                    </span>
                ))}
            </div>
        </div>
    );
}
