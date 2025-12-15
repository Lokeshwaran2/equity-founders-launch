import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './FounderSwipeCard.css';

const sampleFounders = [
    {
        id: 1,
        name: 'Anaya Patel',
        title: 'Product Founder',
        domain: 'Fintech · Remote',
        matchPct: 92,
        avatar: 'https://i.pravatar.cc/150?img=25',
        short: 'Ex-Stripe PM looking for a technical co-founder to build the future of creator payments.',
        seeking: 'Technical Co-founder (AI/ML)',
        equity: '20-30% Equity',
        commitment: 'Full-time',
        matchDetails: [
            { attribute: 'Skillset', compatibility: 'High', description: 'Complementary skills match.' },
            { attribute: 'Vision', compatibility: 'High', description: 'Aligned on long-term goals.' },
            { attribute: 'Risk Profile', compatibility: 'Medium', description: 'Slightly different risk tolerance.' },
        ]
    },
    {
        id: 2,
        name: 'Ben Carter',
        title: 'Technical Founder',
        domain: 'AI/ML · SF Bay Area',
        matchPct: 88,
        avatar: 'https://i.pravatar.cc/150?img=32',
        short: 'PhD in ML with 5 years at Google Brain. Seeking a business co-founder for a new generative AI venture.',
        seeking: 'Business/Sales Co-founder',
        equity: '40-50% Equity',
        commitment: 'Full-time',
        matchDetails: [
            { attribute: 'Industry', compatibility: 'High', description: 'Both have deep AI/ML experience.' },
            { attribute: 'Commitment', compatibility: 'High', description: 'Both ready for full-time.' },
            { attribute: 'Equity Split', compatibility: 'High', description: 'Expectations are aligned.' },
        ]
    },
    {
        id: 3,
        name: 'Chloe Garcia',
        title: 'Design Founder (UX)',
        domain: 'HealthTech · NYC',
        matchPct: 85,
        avatar: 'https://i.pravatar.cc/150?img=31',
        short: 'Award-winning designer focused on human-centered products. Passionate about improving digital wellness.',
        seeking: 'Technical Co-founder',
        equity: '15-25% Equity',
        commitment: 'Part-time to Full-time',
        matchDetails: [
            { attribute: 'Product Sense', compatibility: 'High', description: 'Shared passion for user-centric design.' },
            { attribute: 'Work Style', compatibility: 'Medium', description: 'Prefers async vs. in-person.' },
            { attribute: 'Vision', compatibility: 'High', description: 'Aligned on HealthTech impact.' },
        ]
    },
    {
        id: 4,
        name: 'David Lee',
        title: 'Marketing Founder',
        domain: 'B2C SaaS · Remote',
        matchPct: 90,
        avatar: 'https://i.pravatar.cc/150?img=14',
        short: 'Growth expert who scaled a startup from 0 to 1M users. Looking for a strong technical partner.',
        seeking: 'Product/Design Co-founder',
        equity: '10-20% Equity',
        commitment: 'Full-time',
        matchDetails: [
            { attribute: 'Go-to-Market', compatibility: 'High', description: 'Strong alignment on strategy.' },
            { attribute: 'Skillset', compatibility: 'High', description: 'Perfect business/tech complement.' },
            { attribute: 'Pace', compatibility: 'High', description: 'Both prefer rapid iteration.' },
        ]
    },
];

const CompatibilityGauge = ({ score }) => (
    <div className="gauge-container">
        <div className="gauge-dial" style={{ '--score': score }}>
            <div className="gauge-value">{score}%</div>
        </div>
        <div className="gauge-label">Match Score</div>
    </div>
);

export default function FounderSwipeCard() {
    const [founders, setFounders] = useState(sampleFounders);
    const [swipeState, setSwipeState] = useState(''); // 'left' or 'right'

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        if (!card || swipeState) return;

        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        const rotateX = (y / height) * -20;
        const rotateY = (x / width) * 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    };


    const handleSwipe = (direction) => {
        setSwipeState(direction);
        setTimeout(() => {
            setFounders(prev => {
                const newFounders = [...prev];
                const swipedCard = newFounders.shift();
                // Optional: add the swiped card back to the end to loop
                // newFounders.push(swipedCard); 
                return newFounders;
            });
            setSwipeState('');
        }, 500); // Match animation duration
    };

    if (founders.length === 0) {
        return (
            <Card className="mockup-card p-3 text-center">
                <Card.Body>
                    <div className="fw-bold">No more founders</div>
                    <p className="text-muted small">You've seen everyone for now. Check back later!</p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div className="swipe-deck">
            {founders.map((match, index) => {
                if (index > 1) return null; // Only render top 2 cards for performance
                const isTopCard = index === 0;
                let cardClass = 'mockup-card';
                if (isTopCard) {
                    cardClass += ` ${swipeState}`;
                }

                return (
                    <Card 
                        key={match.id} 
                        className={cardClass} 
                        style={{ zIndex: founders.length - index }}
                        onMouseMove={isTopCard ? handleMouseMove : null}
                        onMouseLeave={isTopCard ? handleMouseLeave : null}
                    >
                        <div className="mockup-header d-flex align-items-center justify-content-between mb-2 p-3">
                            <div>
                                <div className="small text-muted">Match Profile</div>
                                <div className="fw-bold">{match.name}</div>
                            </div>
                            <CompatibilityGauge score={match.matchPct} />
                        </div>
                        {/* Mobile-only details view */}
                        <div className="founder-details-view d-lg-none">
                            <div className="detail-item" style={{ animationDelay: '0.1s' }}>
                                <span className="detail-label">Seeking</span><span className="detail-value">{match.seeking}</span>
                            </div>
                            <div className="detail-item" style={{ animationDelay: '0.2s' }}>
                                <span className="detail-label">Equity</span><span className="detail-value">{match.equity}</span>
                            </div>
                            <div className="detail-item" style={{ animationDelay: '0.3s' }}>
                                <span className="detail-label">Commitment</span><span className="detail-value">{match.commitment}</span>
                            </div>
                        </div>

                        <Card.Body>
                            <div className="card-scrollable-content">
                                <Card.Title>{match.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{match.domain}</Card.Subtitle>
                                
                                <div className="compatibility-analysis">
                                    <div className="analysis-title">Compatibility Analysis</div>
                                    {match.matchDetails.map(detail => (
                                        <div key={detail.attribute} className="analysis-item">
                                            <span>{detail.attribute}</span>
                                            <span className={`compat-level compat-${detail.compatibility.toLowerCase()}`}>{detail.compatibility}</span>
                                        </div>
                                    ))}
                                </div>

                                <Card.Text className="small">{match.short}</Card.Text>
                            </div>
                        </Card.Body>
                        {isTopCard && (
                            <Card.Footer className="d-flex justify-content-around p-3">
                                <Button variant="danger" className="swipe-btn" onClick={() => handleSwipe('left')}>Pass</Button>
                                <Button variant="success" className="swipe-btn" onClick={() => handleSwipe('right')}>Connect</Button>
                            </Card.Footer>
                        )}
                    </Card>
                );
            }).reverse()}
        </div>
    );
}