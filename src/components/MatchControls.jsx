import React from 'react';
import { Form } from 'react-bootstrap';

const ControlSlider = ({ label, value, onChange, minLabel, maxLabel, color }) => (
    <div className="mb-4 control-slider-group">
        <div className="d-flex justify-content-between mb-2">
            <span className="fw-bold text-white" style={{ fontSize: '0.9rem', letterSpacing: '0.5px' }}>{label}</span>
            <span className="badge" style={{ backgroundColor: `${color}20`, color: color }}>{value}%</span>
        </div>
        <input
            type="range"
            className="form-range custom-range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{ '--range-color': color }}
        />
        <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
        </div>
    </div>
);

export default function MatchControls({ values, onChange }) {
    return (
        <div className="match-controls p-4 mt-3" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.4))', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
            <p className="text-muted mb-4 small"><i className="bi bi-sliders me-2"></i>Adjust inputs to simulate match</p>

            <ControlSlider
                label="Commitment Level"
                value={values.commitment}
                onChange={(v) => onChange('commitment', v)}
                minLabel="Part-time"
                maxLabel="All-in"
                color="#60a5fa" // Blue
            />

            <ControlSlider
                label="Equity Expectation"
                value={values.equity}
                onChange={(v) => onChange('equity', v)}
                minLabel="Low (Salary)"
                maxLabel="High (Skin in game)"
                color="#a78bfa" // Purple
            />

            <ControlSlider
                label="Risk Appetite"
                value={values.risk}
                onChange={(v) => onChange('risk', v)}
                minLabel="Safe"
                maxLabel="Moonshot"
                color="#f472b6" // Pink
            />

            {/* Judgmental Microcopy */}
            <div className="mt-4 pt-3 border-top border-white-10 text-center">
                <p className={`mb-0 fw-bold transition-all duration-300 ${((values.commitment + values.equity + values.risk) / 3) >= 90 ? 'text-success' :
                    ((values.commitment + values.equity + values.risk) / 3) >= 70 ? 'text-info' :
                        ((values.commitment + values.equity + values.risk) / 3) >= 50 ? 'text-warning' : 'text-danger'
                    }`}>
                    {(() => {
                        const avg = (values.commitment + values.equity + values.risk) / 3;
                        if (avg >= 90) return "Rare alignment. These teams tend to last.";
                        if (avg >= 70) return "Strong fit, but equity expectations must be clear.";
                        if (avg >= 50) return "Potential friction detected.";
                        return "Most co-founder breakups start here.";
                    })()}
                </p>
            </div>
        </div>
    );
}
