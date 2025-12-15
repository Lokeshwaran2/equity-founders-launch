import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function HowItWorks({ id }) {
  return (
    <section id={id || "how"} className="py-5">
      <Container>
        <h3 className="mb-4 text-white">How Equity Founders works</h3>
        <Row className="g-4">
          <Col md={4}>
            <div className="how-step p-4 h-100" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12 }}>
              <div style={{ fontSize: 24 }}>🧭</div>
              <h5 className="mt-3">Profile & Intent</h5>
              <p className="text-muted small mb-0">
                Create a focused founder profile with role, stage, traction and precise equity expectations so matches are meaningful.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="how-step p-4 h-100" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12 }}>
              <div style={{ fontSize: 24 }}>📊</div>
              <h5 className="mt-3">Evaluate & Shortlist</h5>
              <p className="text-muted small mb-0">
                Use AI scores, verified experience and curated questions to quickly shortlist candidates with the right signals.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="how-step p-4 h-100" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 12 }}>
              <div style={{ fontSize: 24 }}>🚀</div>
              <h5 className="mt-3">Validate & Launch</h5>
              <p className="text-muted small mb-0">
                Run guided intro calls, use NDA/workflow tools and agree equity terms — we provide templates and checklists to close faster.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}