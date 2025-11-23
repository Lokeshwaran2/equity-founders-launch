import React, { useState } from "react";
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

const Testimonial = ({ quote, name, role }) => (
    <div className="testimonial p-4 text-center">
        <blockquote className="mb-3">“{quote}”</blockquote>
        <div className="fw-bold">{name}</div>
        <div className="small text-muted">{role}</div>
    </div>
);

export default function LaunchPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="page-bg">
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
                            <Button
                                variant="outline-light"
                                size="sm"
                                className="ms-2"
                                onClick={() => setShowModal(true)}
                            >
                                Sign in
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <header className="hero-section">
                <Container fluid="lg">
                    <Row className="align-items-center">
                        <Col lg={6} className="text-white hero-content">
                            <div className="pill">Launch Offer — Free Beta</div>
                            <h1 className="hero-title mt-3">
                                Find your co-founder — aligned by skill, vision & equity.
                            </h1>
                            <p className="lead text-muted">
                                Equity-first matching, transparent expectations, and founder tools to move from match to team fast. Built to help founders find the right co-founder and launch with confidence.
                            </p>

                            <div className="d-flex gap-3 mt-4 flex-wrap">
                                <a href="#pricing">
                                    <Button size="lg" className="cta-primary">
                                        Get Early Access
                                    </Button>
                                </a>
                                <a href="#features">
                                    <Button size="lg" variant="outline-light">
                                        Explore Features
                                    </Button>
                                </a>
                            </div>

                            <div className="trust mt-4 d-flex gap-3 flex-wrap">
                                <div className="small text-muted">Trusted by early founders</div>
                                <div className="small text-muted">• Private beta</div>
                            </div>
                        </Col>

                        <Col lg={6} className="mt-4 mt-lg-0">
                            <Card className="mockup-card p-3 floating-mockup">
                                <div className="mockup-header d-flex align-items-center justify-content-between mb-2">
                                    <div>
                                        <div className="small text-muted">Match Profile</div>
                                        <div className="fw-bold">Anaya Patel</div>
                                    </div>
                                    <div className="badge-match">92%</div>
                                </div>

                                <div className="mockup-body d-flex gap-3 align-items-center">
                                    <div className="avatar" />
                                    <div className="mockup-info">
                                        <div className="fw-bold">Product Founder</div>
                                        <div className="small text-muted">Fintech · Remote</div>
                                    </div>
                                    <Button className="ms-auto" variant="primary">
                                        Message
                                    </Button>
                                </div>

                                <div className="mockup-graph mt-3" />
                            </Card>
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
                                <h5 className="feature-title mt-3">Fast validation</h5>
                                <p className="text-muted small mb-0">
                                    Prototype your co-founder match hypothesis with quick intros and validation checklists designed for early teams.
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
