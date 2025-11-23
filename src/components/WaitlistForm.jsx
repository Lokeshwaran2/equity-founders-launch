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
            <Form onSubmit={handleSubmit} className="d-flex">
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button variant="primary" type="submit" disabled={loading} className="ms-2">
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Join Waitlist'}
                </Button>
            </Form>
        </>
    );
}