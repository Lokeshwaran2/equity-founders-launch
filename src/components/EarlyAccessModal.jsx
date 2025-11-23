import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";

export default function EarlyAccessModal({ show, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ type: '', message: '' });

  const handleClose = () => {
    // Reset state when closing
    setEmail("");
    setLoading(false);
    setResponse({ type: '', message: '' });
    onClose();
  };

  async function submit(e) {
    e.preventDefault();
    setResponse({ type: '', message: '' });
    if (!/\S+@\S+\.\S+/.test(email)) {
      setResponse({ type: 'danger', message: 'Please enter a valid email.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }
      setResponse({ type: 'success', message: data.message });
      setEmail(""); // Clear email on success
    } catch (error) {
      setResponse({ type: 'danger', message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Join the private beta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {response.message && <Alert variant={response.type}>{response.message}</Alert>}
        
        {!response.success && (
          <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="eaEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                placeholder="you@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="eaRole">
              <Form.Label>Role</Form.Label>
              <Form.Select aria-label="Role">
                <option>Founder</option>
                <option>Co-founder / CTO</option>
                <option>Product / Designer</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Request Access
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}