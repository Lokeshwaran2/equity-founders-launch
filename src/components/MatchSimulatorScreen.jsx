import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function MatchSimulatorScreen({ values }) {
    // Calculate a "simulated" score based on inputs
    const avg = (values.commitment + values.equity + values.risk) / 3;
    const [displayScore, setDisplayScore] = useState(0);

    // Animate the number
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDisplayScore(Math.round(avg));
        }, 50); // Small delay for effect
        return () => clearTimeout(timeout);
    }, [avg]);

    // Determine Status
    let status = { text: "Misaligned", color: "#ef4444", icon: "⚠️" };
    if (avg > 50) status = { text: "Potential", color: "#eab308", icon: "⚡" };
    if (avg > 80) status = { text: "Highly Aligned", color: "#22c55e", icon: "🔥" };

    const circleDasharray = 283; // 2 * pi * 45
    const dashOffset = circleDasharray - (circleDasharray * displayScore) / 100;

    return (
        <div className="h-100 w-100 d-flex flex-column align-items-center justify-content-center p-4 position-relative overflow-hidden"
            style={{
                background: `radial-gradient(circle at 50% 50%, ${status.color}15 0%, transparent 70%)`
            }}>

            {/* Animated Ring */}
            <div className="position-relative mb-4" style={{ width: '180px', height: '180px' }}>
                <svg className="w-100 h-100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx="50" cy="50" r="45"
                        fill="transparent"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                    />
                    <circle
                        cx="50" cy="50" r="45"
                        fill="transparent"
                        stroke={status.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circleDasharray}
                        strokeDashoffset={dashOffset}
                        className="score-ring-pulse"
                        style={{ transition: 'stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease', '--pulse-color': status.color }}
                    />
                </svg>
                <div className={`position-absolute top-50 start-50 translate-middle text-center ${avg < 60 ? 'animate-wobble' : ''}`}>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="score-tooltip">Computed from 17 alignment signals</Tooltip>}
                    >
                        <div className="fw-bold text-white lh-1 score-hover-trigger"
                            style={{
                                fontSize: '3.5rem',
                                textShadow: avg > 75 ? `0 0 30px ${status.color}` : 'none',
                                cursor: 'help'
                            }}>
                            {displayScore}%
                        </div>
                    </OverlayTrigger>
                </div>
            </div>

            {/* Status Text */}
            <div className="text-center" style={{ zIndex: 2 }}>
                <div className="badge mb-2 px-3 py-2 rounded-pill"
                    style={{
                        backgroundColor: `${status.color}20`,
                        color: status.color,
                        border: `1px solid ${status.color}40`,
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}>
                    {status.icon} {status.text}
                </div>
                <p className="text-muted small mb-0 px-2">
                    {avg > 80 ? "Perfect fit for co-founder pairing." :
                        avg > 50 ? "Some gaps in expectations." :
                            "Likely friction in long term."}
                </p>
            </div>

            {/* Background Particles/Noise */}
            <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.15, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.5%22/%3E%3C/svg%3E")' }}>
            </div>
        </div>
    );
}
