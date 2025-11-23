import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

export default function MatchCard({ match }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className={`match-card p-3 h-100 ${open ? "expanded" : ""}`}>
      <div className="d-flex align-items-center gap-3">
        <div className="avatar-sm" />
        <div>
          <div className="fw-bold">{match.name}</div>
          <div className="small text-muted">{match.title} · {match.domain}</div>
        </div>
        <Badge bg="secondary" className="ms-auto badge-match-sm">{match.matchPct}%</Badge>
      </div>

      <div className="mt-3">
        <div className="small text-muted">{match.short}</div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <Button size="sm" variant="outline-light" onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Details"}
        </Button>
        <Button size="sm" className="cta-primary flex-grow-1">Message</Button>
      </div>

      {open && (
        <div className="match-details mt-3 text-muted">
          <div><strong>Equity expected:</strong> {match.equity}</div>
          <div><strong>Experience:</strong> {match.experience}</div>
          <div className="mt-2"><em>{match.note}</em></div>
        </div>
      )}
    </Card>
  );
}