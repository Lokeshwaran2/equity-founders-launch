import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const API_BASE_URL = "https://equity-founders-backend.onrender.com";

export default function WaitlistForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse({ type: '', message: '' });

        try {
            const res = await fetch(`${API_BASE_URL}/api/waitlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong.');
            }

            setResponse({ type: 'success', message: data.message });
            setEmail('');
        } catch (error) {
            setResponse({ type: 'danger', message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {response.message && <Alert variant={response.type}>{response.message}</Alert>}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <span className="position-relative d-flex h-2 w-2">
                        <span className="animate-ping position-absolute d-inline-flex h-100 w-100 rounded-circle bg-success opacity-75"></span>
                        <span className="position-relative d-inline-flex rounded-circle h-2 w-2 bg-success" style={{ width: '8px', height: '8px' }}></span>
                    </span>
                    <small className="text-white-50 fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                        312 / 1,000 SLOTS REMAINING
                    </small>
                </div>
            </div>

            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                <div className="d-flex">
                    <Form.Control
                        type="email"
                        placeholder="founder@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button variant="primary" type="submit" disabled={loading} className="ms-2 text-nowrap">
                        {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Request Access'}
                    </Button>
                </div>
                <small className="text-muted text-center mt-2" style={{ fontSize: '0.75rem' }}>
                    We review every application. No spam. No mass invites.
                </small>
            </Form>
        </>
    );
}