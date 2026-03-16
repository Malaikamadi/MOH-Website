import { useState, useEffect } from 'react';

export default function FloatingButtons() {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const current = window.scrollY;
            setCollapsed(current > 300 && current > lastScroll);
            lastScroll = current;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`floating-side-buttons ${collapsed ? 'collapsed' : ''}`}>
            <a href="/find-facility" className="floating-btn floating-btn-facility">
                <span className="btn-icon"><i className="fas fa-hospital"></i></span>
                <span className="btn-text">Find Health Facility</span>
            </a>
            <a href="/emergency" className="floating-btn floating-btn-emergency">
                <span className="btn-icon"><i className="fas fa-ambulance"></i></span>
                <span className="btn-text">Emergency</span>
            </a>
        </div>
    );
}
