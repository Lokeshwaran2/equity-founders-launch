import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    stage: "",
    message: "",
    contact: "email",
    website: "" // honeypot
  });
  const [status, setStatus] = useState({ sending: false, success: false, error: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    if (form.website) return "Spam detected";
    if (!form.name.trim()) return "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Valid email is required";
    if (!form.message.trim()) return "Please describe what you need";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ sending: false, success: false, error: err });
    setStatus({ sending: true, success: false, error: "" });

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setStatus({ sending: false, success: true, error: "" });
      // Reset form on success
      setForm({ name: "", email: "", role: "", stage: "", message: "", contact: "email", website: "" });
    } catch (error) {
      setStatus({ sending: false, success: false, error: error.message });
    }
  };

  return (
    <Card className="enquiry-card p-4">
      <Card.Body>
        <h5 className="mb-3">Contact / Enquiry</h5>
        <p className="text-muted small mb-3">Tell us about your founder needs — we’ll reply and help you get the right matches or a demo.</p>

        {status.error && <Alert variant="danger">{status.error}</Alert>}
        {status.success && <Alert variant="success">Thanks — we received your enquiry. We'll respond soon.</Alert>}

        <Form onSubmit={submit} aria-label="Enquiry form">
          <input type="hidden" name="website" value={form.website} onChange={update("website")} style={{display:'none'}} />
          <Form.Group className="mb-2">
            <Form.Label className="small">Name</Form.Label>
            <Form.Control value={form.name} onChange={update("name")} placeholder="Your name" required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="small">Email</Form.Label>
            <Form.Control type="email" value={form.email} onChange={update("email")} placeholder="you@startup.com" required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="small">Role</Form.Label>
            <Form.Control value={form.role} onChange={update("role")} placeholder="Founder / CTO / Designer (optional)" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="small">Stage</Form.Label>
            <Form.Control as="select" value={form.stage} onChange={update("stage")}>
              <option value="">Select stage</option>
              <option>Idea / Concept</option>
              <option>Prototype</option>
              <option>Early revenue</option>
              <option>Scaling</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small">How can we help?</Form.Label>
            <Form.Control as="textarea" rows={3} value={form.message} onChange={update("message")} placeholder="Briefly describe what you're looking for" />
          </Form.Group>

          <Form.Group className="mb-3 d-flex gap-2 align-items-center">
            <Form.Check inline label="Email" type="radio" name="contact" checked={form.contact === "email"} onChange={() => setForm({ ...form, contact: "email" })} />
            <Form.Check inline label="Schedule call" type="radio" name="contact" checked={form.contact === "call"} onChange={() => setForm({ ...form, contact: "call" })} />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" disabled={status.sending} className="cta-primary">
              {status.sending ? "Sending…" : "Send Enquiry"}
            </Button>
            <Button variant="outline-light" onClick={() => { setForm({ name: "", email: "", role: "", stage: "", message: "", contact: "email", website: "" }); setStatus({ sending:false, success:false, error:"" }); }}>
              Clear
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}