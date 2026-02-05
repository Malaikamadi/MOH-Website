import { useState } from 'react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter signup:', email);
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
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
                        />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
