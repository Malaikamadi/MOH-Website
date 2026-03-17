import { useMemo } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageHero from '../components/common/PageHero';
import { useApi } from '../hooks/useApi';
import { getEvents, getMediaUrl } from '../services/api';
import type { Event, StrapiItem } from '../services/api';

function formatDate(dateStr: string) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
}

function formatDateRange(start: string, end: string) {
    if (!start) return '';
    const s = formatDate(start);
    if (!end || start === end) return s;
    return `${s} - ${formatDate(end)}`;
}

function EventCard({ event, isPast }: { event: StrapiItem<Event>; isPast: boolean }) {
    const imageUrl = getMediaUrl(event.coverImage) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop';
    const startDate = event.eventStartDate ? new Date(event.eventStartDate) : null;

    return (
        <div className={`ev-card ${isPast ? 'ev-card-past' : ''}`}>
            <div className="ev-card-image">
                <img src={imageUrl} alt={event.title} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop'; }} />
                {startDate && (
                    <div className="ev-date-badge">
                        <span className="ev-date-day">{startDate.getDate()}</span>
                        <span className="ev-date-month">{startDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                    </div>
                )}
                {event.featured && <span className="ev-featured-tag">Featured</span>}
            </div>
            <div className="ev-card-body">
                <h3>{event.title}</h3>
                <div className="ev-card-details">
                    <span><i className="far fa-calendar-alt"></i> {formatDateRange(event.eventStartDate, event.eventEndDate)}</span>
                    {event.location && <span><i className="fas fa-map-marker-alt"></i> {event.location}</span>}
                    {event.organizer && <span><i className="far fa-user"></i> {event.organizer}</span>}
                </div>
                <p>{event.summary || event.description}</p>
                {!isPast && event.registrationLink && (
                    <a href={event.registrationLink} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                        Register Now <i className="fas fa-external-link-alt"></i>
                    </a>
                )}
            </div>
        </div>
    );
}

export default function EventsPage() {
    const { data: eventsRes, loading } = useApi(() => getEvents({}));
    const allEvents = eventsRes?.data || [];

    const now = new Date();
    const { upcoming, past } = useMemo(() => {
        const upcoming: StrapiItem<Event>[] = [];
        const past: StrapiItem<Event>[] = [];
        for (const ev of allEvents) {
            const endDate = ev.eventEndDate ? new Date(ev.eventEndDate) : ev.eventStartDate ? new Date(ev.eventStartDate) : null;
            if (endDate && endDate < now) {
                past.push(ev);
            } else {
                upcoming.push(ev);
            }
        }
        past.reverse();
        return { upcoming, past };
    }, [allEvents]);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Events' },
    ];

    return (
        <>
            <Header />
            <main>
                <PageHero title="Events" breadcrumbs={breadcrumbs} />

                <section className="ev-section section">
                    <div className="container">
                        {loading && (
                            <div className="nr-loading"><i className="fas fa-spinner fa-spin"></i> Loading events...</div>
                        )}

                        {!loading && upcoming.length > 0 && (
                            <div className="ev-group">
                                <div className="ev-group-header">
                                    <h2><i className="fas fa-calendar-check"></i> Upcoming Events</h2>
                                    <p>Don't miss these upcoming health events, conferences, and workshops</p>
                                </div>
                                <div className="ev-grid">
                                    {upcoming.map(event => (
                                        <EventCard key={event.id} event={event} isPast={false} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {!loading && past.length > 0 && (
                            <div className="ev-group ev-group-past">
                                <div className="ev-group-header">
                                    <h2><i className="fas fa-history"></i> Past Events</h2>
                                    <p>A look back at our previous events and activities</p>
                                </div>
                                <div className="ev-grid">
                                    {past.map(event => (
                                        <EventCard key={event.id} event={event} isPast={true} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {!loading && allEvents.length === 0 && (
                            <div className="nr-empty">
                                <i className="fas fa-calendar-times"></i>
                                <h3>No events yet</h3>
                                <p>There are no events to display at this time. Check back soon for upcoming events!</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
