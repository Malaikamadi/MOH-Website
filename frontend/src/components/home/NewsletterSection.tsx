import { useState } from 'react';
import { subscribeNewsletter } from '../../services/api';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await subscribeNewsletter(email);
            setStatus('success');
            setMessage('Thank you for subscribing! You\'ll receive our latest updates.');
            setEmail('');
            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 5000);
        } catch (err) {
            setStatus('error');
            setMessage(err instanceof Error ? err.message : 'Subscription failed. Please try again.');
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 5000);
        }
    };

    return (
        <section className="newsletter section-sm">
            <div className="container">
                <div className="newsletter-content">
                    <div className="newsletter-text">
                        <h2>Stay Updated</h2>
                        <p>Subscribe to receive the latest health news and ministry updates</p>
                    </div>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                    {message && (
                        <div className={`newsletter-message ${status === 'success' ? 'success' : 'error'}`}
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                background: status === 'success' ? 'rgba(39, 174, 96, 0.15)' : 'rgba(231, 76, 60, 0.15)',
                                color: status === 'success' ? '#27ae60' : '#e74c3c',
                                border: `1px solid ${status === 'success' ? 'rgba(39, 174, 96, 0.3)' : 'rgba(231, 76, 60, 0.3)'}`,
                            }}
                        >
                            <i className={`fas fa-${status === 'success' ? 'check-circle' : 'exclamation-circle'}`}
                                style={{ marginRight: '0.5rem' }}></i>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
