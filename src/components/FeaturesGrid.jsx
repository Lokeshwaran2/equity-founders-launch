import React, { useEffect, useRef, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";

const FeatureCard = ({ icon, title, text }) => (
    <Card className="feature-card border-0 mx-3" style={{ minWidth: "280px" }}>
        <Card.Body>
            <div style={{ fontSize: 24 }}>{icon}</div>
            <h5 className="feature-title mt-3">{title}</h5>
            <p className="text-muted small mb-0">{text}</p>
        </Card.Body>
    </Card>
);

export default function FeaturesGridHorizontal({ id }) {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const scrollAmount = 300;

    const features = [
        { icon: "🤖", title: "AI Match Scoring", text: "Proprietary scoring ranks candidates by complementary skills, fit & alignment." },
        { icon: "🧾", title: "Verified Experience", text: "Surface past work, links, projects and validated startup history." },
        { icon: "🔐", title: "NDA & Doc Workflows", text: "Share only when ready — NDAs & term checklist templates included." },
        { icon: "📅", title: "Integrated Scheduling", text: "Timezone-aware booking tools to speed up intro calls." },
        { icon: "✉️", title: "Smart Intro Templates", text: "Boost reply rate with crafted intros that actually work." },
        { icon: "🤝", title: "Founder Events & Rooms", text: "Meet founders through curated digital rooms & live events." },
    ];

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        const isAtStart = container.scrollLeft === 0;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

        setShowLeftArrow(!isAtStart);
        setShowRightArrow(!isAtEnd);
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            handleScroll(); // Initial check
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
        }
    };


    return (
        <section id={id || "features"} className="py-5">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-white mb-0">Product features that matter</h3>
                    <div className="d-none d-md-block">
                        <Button variant="link" className="text-white" onClick={() => scroll(-1)} disabled={!showLeftArrow} style={{ fontSize: '1.5rem' }}>
                            &larr;
                        </Button>
                        <Button variant="link" className="text-white" onClick={() => scroll(1)} disabled={!showRightArrow} style={{ fontSize: '1.5rem' }}>
                            &rarr;
                        </Button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="feature-horizontal-scroll"
                >
                    {features.map((f, i) => (
                        <div key={i} className="feature-scroll-item">
                            <FeatureCard {...f} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );

}
