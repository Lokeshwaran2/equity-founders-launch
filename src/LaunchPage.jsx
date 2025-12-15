import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Nav,
    Navbar,
    Carousel,
} from "react-bootstrap";
import HowItWorks from "./components/HowItWorks";
import FeaturesGrid from "./components/FeaturesGrid";
import EarlyAccessModal from "./components/EarlyAccessModal";
import EnquiryForm from "./components/EnquiryForm";
import WaitlistForm from "./components/WaitlistForm";
import FounderSwipeCard from "./components/FounderSwipeCard";
import MatchControls from "./components/MatchControls";
import MatchSimulatorScreen from "./components/MatchSimulatorScreen";

const Testimonial = ({ quote, name, role }) => (
    <div className="testimonial p-4 text-center">
        <blockquote className="mb-3">“{quote}”</blockquote>
        <div className="fw-bold">{name}</div>
        <div className="small text-muted">{role}</div>
    </div>
);

export default function LaunchPage() {
    const [showModal, setShowModal] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Live Match State
    const [matchValues, setMatchValues] = useState({
        commitment: 85,
        equity: 40,
        risk: 75
    });

    const handleMatchChange = (key, value) => {
        setMatchValues(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const crazyStyles = `
        @keyframes crazy-hue-rotate {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        .page-bg {
            animation: crazy-hue-rotate 20s linear infinite;
            background: radial-gradient(
                800px at var(--mouse-x) var(--mouse-y),
                rgba(29, 78, 216, 0.15),
                transparent 80%
            );
        }
        @keyframes floating-crazy {
            0% { transform: translateY(0px) rotate(-2deg); } 
            50% { transform: translateY(-35px) rotate(4deg) scale(1.1); }
            100% { transform: translateY(0px) rotate(-2deg); }
        }
        .floating-mockup {
            animation: floating-crazy 6s ease-in-out infinite;
        }
        @keyframes pulse-crazy {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
            70% { transform: scale(1.1); box-shadow: 0 0 10px 20px rgba(255, 255, 255, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .btn-crazy-pulse {
            animation: pulse-crazy 2s infinite;
        }
        .rotated-card-right {
            transform: rotate(2deg);
            transition: transform 0.3s ease-in-out;
        }
        .rotated-card-right:hover {
            transform: rotate(0) scale(1.05);
        }
        .rotated-card-left {
            transform: rotate(-2deg);
            transition: transform 0.3s ease-in-out;
        }
        .rotated-card-left:hover {
            transform: rotate(0) scale(1.05);
        }
    `;

    return (
        <div
            className="page-bg"
            style={{
                '--mouse-x': `${mousePosition.x}px`,
                '--mouse-y': `${mousePosition.y}px`,
            }}
        >
            <style>
                {crazyStyles}
            </style>
            <div className="bg-animated" aria-hidden="true">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
                <div className="gradient-wave" />
            </div>

            <Navbar expand="lg" variant="dark" className="py-3 nav-overlay">
                <Container>
                    <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
                        <div className="brand-badge">EF</div>
                        <span className="fw-bold">Equity Founders</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link href="#how">How it works</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Early Access</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link> {/* added */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <header className="hero-section">
                <Container fluid="lg">
                    <Row className="align-items-center">
                        <Col lg={6} className="text-white hero-content">
                            {/* Hero text - Visible on all devices */}
                            <div>
                                <div className="pill">Launch Offer — Free Beta</div>
                                <h1 className="hero-title mt-3">
                                    Find your co-founder — aligned by skill, vision & equity.
                                </h1>

                                {/* LIVE MATCH CONTROLS */}
                                <div className="mt-5">
                                    <div className="d-flex align-items-center gap-2 mb-2 text-info">
                                        <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25">NEW</span>
                                        <small className="fw-bold" style={{ letterSpacing: '1px' }}>LIVE FOUNDER MATCH ENGINE</small>
                                    </div>
                                    <h5 className="mb-3 text-white-50">Adjust inputs. Watch compatibility change.</h5>

                                    <MatchControls values={matchValues} onChange={handleMatchChange} />

                                    <div className="mt-4">
                                        <a href="#pricing">
                                            <Button size="lg" className="cta-primary btn-crazy-pulse w-100">
                                                Get Early Access
                                            </Button>
                                        </a>
                                        <div className="mt-3 small text-muted text-center" style={{ fontSize: '0.8rem' }}>
                                            Built for founders willing to commit before consensus.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col lg={6} className="mt-4 mt-lg-0">
                            <div className="iphone-mockup">
                                <div className="iphone-frame">
                                    <div className="iphone-screen">
                                        <div className="iphone-notch"><div className="iphone-speaker"></div></div>
                                        {/* Pass state to the screen */}
                                        <MatchSimulatorScreen values={matchValues} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>

            {/* Unique value propositions */}
            <section className="py-5" aria-label="why">
                <Container>
                    <Row className="g-4">
                        <Col md={4}>
                            <Card className="feature-card h-100 border-0 p-4">
                                <div style={{ fontSize: 24 }}>⚡</div>
                                <h5 className="feature-title mt-3">Eliminate mismatches</h5>
                                <p className="text-muted small mb-0">
                                    Avoid months of wasted time. Identifying alignment gaps early prevents the #1 cause of startup failure: founder conflict.
                                </p>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card h-100 border-0 p-4">
                                <div style={{ fontSize: 24 }}>📈</div>
                                <h5 className="feature-title mt-3">Transparent equity guidance</h5>
                                <p className="text-muted small mb-0">
                                    Built-in equity ranges and examples help founders set reasonable expectations and start negotiations from clarity.
                                </p>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card h-100 border-0 p-4">
                                <div style={{ fontSize: 24 }}>🛡️</div>
                                <h5 className="feature-title mt-3">Safety-first connections</h5>
                                <p className="text-muted small mb-0">
                                    Control what you share and when — NDA flows, anonymized previews and verified signals reduce risk in early outreach.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <FeaturesGrid id="features" />
            <HowItWorks id="how" />

            {/* WAITLIST SECTION */}
            <section id="pricing" className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <span className="pill d-inline-block mb-2">Launching Soon</span>
                        <h2 className="hero-title mb-3">Unlock Your Co-Founder Potential</h2>
                        <p className="text-muted" style={{ maxWidth: "620px", margin: "0 auto" }}>
                            We’re preparing to launch the world’s first <strong>Equity‑Aligned Founder Matching Platform</strong>. Be one of the first to access premium matchmaking tools, founder visibility boosts, and exclusive perks.
                        </p>
                    </div>

                    <Row className="justify-content-center">
                        <Col md={7}>
                            <Card className="enquiry-card p-3 border-0">
                                <div className="p-2 text-center">
                                    <h5 className="fw-bold text-white mb-2">🚀 Join the Early Access Waitlist</h5>
                                </div>
                                <WaitlistForm />
                            </Card>
                            <p className="text-muted text-center mt-3" style={{ fontSize: "0.85rem" }}>
                                *Limited to the first 1,000 global founders. We’ll notify you when access is ready.
                            </p>
                        </Col>
                    </Row>

                    <Row className="justify-content-center mt-5">
                        <Col md={4} className="mb-3">
                            <Card className="feature-card p-3 border-0 text-center">
                                <h6 className="feature-title mb-2">✨ Spotlight Boost</h6>
                                <p className="text-muted small">Featured placement on the global founder graph.</p>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Card className="feature-card p-3 border-0 text-center">
                                <h6 className="feature-title mb-2">🔐 Early Product Access</h6>
                                <p className="text-muted small">Test advanced matchmaking features before the public.</p>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Card className="feature-card p-3 border-0 text-center">
                                <h6 className="feature-title mb-2">🎁 Lifetime Rewards</h6>
                                <p className="text-muted small">Lock in exclusive founder-tier pricing forever.</p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>


            {/* CONTACT / ENQUIRY – MAIL FORM ONLY */}
            <section id="contact" className="py-5">
                <Container>
                    <div className="text-center mb-4">
                        <span className="pill d-inline-block mb-2">Get in Touch</span>
                        <h2 className="hero-title mb-2">Contact Our Team</h2>
                        <p className="text-muted" style={{ maxWidth: "620px", margin: "0 auto" }}>
                            Have questions about Equity Founders? Send us a message — we're here to help.
                        </p>
                    </div>

                    <Row className="justify-content-center">
                        <Col md={7}>
                            <EnquiryForm />
                        </Col>
                    </Row>
                </Container>
            </section>


            <footer className="py-4 footer">
                <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div>
                        <div className="fw-bold text-white">Equity Founders</div>
                        <small className="text-muted">© 2025 Built for founders, by founders.</small>
                    </div>
                    <div className="d-flex gap-3 mt-3 mt-md-0">
                        <a href="#" className="text-muted small">Privacy</a>
                        <a href="#" className="text-muted small">Terms</a>
                        <a href="#" className="text-muted small">Contact</a>
                    </div>
                </Container>
            </footer>

            <EarlyAccessModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}
