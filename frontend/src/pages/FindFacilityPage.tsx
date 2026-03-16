import { useState, useMemo, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

type FacilityType = 'all' | 'hospital' | 'chc' | 'clinic' | 'pharmacy';

interface Facility {
    type: 'hospital' | 'chc' | 'clinic' | 'pharmacy';
    name: string;
    address: string;
    district: string;
    hours: string;
    extra: string;
    extraIcon: string;
    phone?: string;
    lat: number;
    lng: number;
}

const facilities: Facility[] = [
    { type: 'hospital', name: 'Connaught Hospital', address: 'Lightfoot Boston St, Freetown', district: 'western-urban', hours: 'Open 24/7', extra: '+232 22 222 222', extraIcon: 'phone', phone: '+23222222222', lat: 8.4657, lng: -13.2317 },
    { type: 'hospital', name: 'Princess Christian Maternity Hospital', address: 'Fourah Bay Rd, Freetown', district: 'western-urban', hours: 'Open 24/7', extra: 'Maternity', extraIcon: 'baby', lat: 8.4723, lng: -13.2343 },
    { type: 'hospital', name: "Ola During Children's Hospital", address: 'Freetown', district: 'western-urban', hours: 'Open 24/7', extra: 'Pediatric', extraIcon: 'child', lat: 8.4589, lng: -13.2156 },
    { type: 'chc', name: 'Ross Road Community Health Centre', address: 'Ross Road, Freetown', district: 'western-urban', hours: '8AM - 5PM', extra: 'Primary Care', extraIcon: 'user-md', lat: 8.4712, lng: -13.2289 },
    { type: 'chc', name: 'Waterloo CHC', address: 'Waterloo, Western Rural', district: 'western-rural', hours: '8AM - 6PM', extra: 'General', extraIcon: 'notes-medical', lat: 8.4234, lng: -13.1567 },
    { type: 'hospital', name: 'Bo Government Hospital', address: 'Bo City, Bo District', district: 'bo', hours: 'Open 24/7', extra: '200 Beds', extraIcon: 'bed', lat: 7.9647, lng: -11.7383 },
    { type: 'hospital', name: 'Kenema Government Hospital', address: 'Kenema City', district: 'kenema', hours: 'Open 24/7', extra: 'Lassa Fever Center', extraIcon: 'virus', lat: 7.8767, lng: -11.1875 },
    { type: 'clinic', name: 'Lumley Health Clinic', address: 'Lumley, Freetown', district: 'western-urban', hours: '8AM - 4PM', extra: 'Immunization', extraIcon: 'syringe', lat: 8.4823, lng: -13.2245 },
    { type: 'pharmacy', name: 'Central Pharmacy', address: 'Siaka Stevens St, Freetown', district: 'western-urban', hours: '8AM - 8PM', extra: 'Prescription', extraIcon: 'prescription', lat: 8.4789, lng: -13.2367 },
    { type: 'hospital', name: 'Holy Spirit Hospital', address: 'Makeni, Bombali', district: 'bombali', hours: 'Open 24/7', extra: 'Emergency', extraIcon: 'heartbeat', lat: 8.8833, lng: -11.9500 },
    { type: 'chc', name: 'Koidu Community Health Centre', address: 'Koidu Town, Kono', district: 'kono', hours: '7AM - 6PM', extra: 'Community Health', extraIcon: 'users', lat: 8.6500, lng: -10.8500 },
    { type: 'pharmacy', name: 'Bo Town Pharmacy', address: 'Main Street, Bo City', district: 'bo', hours: '8AM - 9PM', extra: '24hr Delivery', extraIcon: 'prescription-bottle-alt', lat: 7.9623, lng: -11.7356 },
];

const districts = [
    { value: 'all', label: 'All Districts' },
    { value: 'western-urban', label: 'Western Area Urban' },
    { value: 'western-rural', label: 'Western Area Rural' },
    { value: 'bo', label: 'Bo District' },
    { value: 'bombali', label: 'Bombali District' },
    { value: 'bonthe', label: 'Bonthe District' },
    { value: 'kailahun', label: 'Kailahun District' },
    { value: 'kambia', label: 'Kambia District' },
    { value: 'kenema', label: 'Kenema District' },
    { value: 'koinadugu', label: 'Koinadugu District' },
    { value: 'kono', label: 'Kono District' },
    { value: 'moyamba', label: 'Moyamba District' },
    { value: 'port-loko', label: 'Port Loko District' },
    { value: 'pujehun', label: 'Pujehun District' },
    { value: 'tonkolili', label: 'Tonkolili District' },
];

const typeLabels: Record<string, { label: string; icon: string }> = {
    hospital: { label: 'Hospital', icon: 'hospital' },
    chc: { label: 'CHC', icon: 'clinic-medical' },
    clinic: { label: 'Clinic', icon: 'stethoscope' },
    pharmacy: { label: 'Pharmacy', icon: 'pills' },
};

const markerColors: Record<string, string> = {
    hospital: '#dc2626',
    chc: '#16a34a',
    clinic: '#0056A4',
    pharmacy: '#7c3aed',
};

const faIcons: Record<string, string> = {
    hospital: '\uf0f8',
    chc: '\uf7f2',
    clinic: '\uf0f1',
    pharmacy: '\uf484',
};

function createIcon(type: string) {
    const color = markerColors[type] || '#0056A4';
    return L.divIcon({
        html: `<div style="
            width:36px;height:36px;border-radius:50%;
            background:${color};color:#fff;
            display:flex;align-items:center;justify-content:center;
            font-size:14px;box-shadow:0 3px 10px rgba(0,0,0,0.3);
            border:3px solid #fff;font-family:'Font Awesome 6 Free';font-weight:900;
        ">${faIcons[type] || ''}</div>`,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
    });
}

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 0.8 });
    }, [center, zoom, map]);
    return null;
}

export default function FindFacilityPage() {
    const [typeFilter, setTypeFilter] = useState<FacilityType>('all');
    const [districtFilter, setDistrictFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<Facility | null>(null);
    const [mapCenter, setMapCenter] = useState<[number, number]>([8.4657, -13.2317]);
    const [mapZoom, setMapZoom] = useState(9);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const filtered = useMemo(() => {
        return facilities.filter(f => {
            const matchType = typeFilter === 'all' || f.type === typeFilter;
            const matchDistrict = districtFilter === 'all' || f.district === districtFilter;
            const term = search.toLowerCase();
            const matchSearch = !term || f.name.toLowerCase().includes(term) || f.address.toLowerCase().includes(term);
            return matchType && matchDistrict && matchSearch;
        });
    }, [typeFilter, districtFilter, search]);

    function selectFacility(f: Facility, scrollToCard?: boolean) {
        setSelected(f);
        setMapCenter([f.lat, f.lng]);
        setMapZoom(15);
        if (scrollToCard) {
            const idx = filtered.indexOf(f);
            if (idx >= 0 && cardRefs.current[idx]) {
                cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    return (
        <>
            <Header />
            <main>
                <section className="ff-page-header">
                    <div className="container">
                        <div className="ff-header-content">
                            <h1><i className="fas fa-hospital" style={{ marginRight: '0.5rem', color: '#E5A100' }}></i> Find a Health Facility</h1>
                            <p>Locate hospitals, clinics, and health centers across Sierra Leone</p>
                            <div className="ff-breadcrumb">
                                <a href="/"><i className="fas fa-home"></i> Home</a>
                                <span>/</span>
                                <span className="current">Find a Health Facility</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="ff-main">
                    {/* Sidebar */}
                    <div className="ff-sidebar">
                        <div className="ff-search-section">
                            <div className="ff-search-box">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Search facilities by name or location..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="ff-filter-section">
                            <div className="ff-filter-label">Facility Type</div>
                            <div className="ff-filter-options">
                                {(['all', 'hospital', 'chc', 'clinic', 'pharmacy'] as FacilityType[]).map(t => (
                                    <button
                                        key={t}
                                        className={`ff-filter-btn ${typeFilter === t ? 'active' : ''}`}
                                        onClick={() => { setTypeFilter(t); setSelected(null); }}
                                    >
                                        {t === 'all' ? 'All' : <><i className={`fas fa-${typeLabels[t].icon}`}></i> {typeLabels[t].label}s</>}
                                    </button>
                                ))}
                            </div>

                            <select
                                className="ff-district-select"
                                value={districtFilter}
                                onChange={(e) => { setDistrictFilter(e.target.value); setSelected(null); }}
                            >
                                {districts.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </div>

                        <div className="ff-facilities-list">
                            <p className="ff-facilities-count">Showing <strong>{filtered.length}</strong> facilities</p>

                            {filtered.map((f, i) => (
                                <div
                                    key={i}
                                    ref={el => { cardRefs.current[i] = el; }}
                                    className={`ff-facility-card ${selected === f ? 'active' : ''}`}
                                    onClick={() => selectFacility(f)}
                                >
                                    <span className={`ff-facility-type ${f.type}`}>
                                        <i className={`fas fa-${typeLabels[f.type].icon}`}></i> {typeLabels[f.type].label}
                                    </span>
                                    <h3 className="ff-facility-name">{f.name}</h3>
                                    <div className="ff-facility-address"><i className="fas fa-map-marker-alt"></i> {f.address}</div>
                                    <div className="ff-facility-meta">
                                        <span><i className="fas fa-clock"></i> {f.hours}</span>
                                        <span><i className={`fas fa-${f.extraIcon}`}></i> {f.extra}</span>
                                    </div>
                                </div>
                            ))}

                            {filtered.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                    <i className="fas fa-search" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block', opacity: 0.4 }}></i>
                                    <p>No facilities match your search criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="ff-map-section">
                        <MapContainer
                            center={[8.4657, -13.2317]}
                            zoom={9}
                            style={{ width: '100%', height: '100%', minHeight: 'calc(100vh - 200px)' }}
                            zoomControl={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <FlyTo center={mapCenter} zoom={mapZoom} />

                            {filtered.map((f, i) => (
                                <Marker
                                    key={`${f.name}-${i}`}
                                    position={[f.lat, f.lng]}
                                    icon={createIcon(f.type)}
                                    eventHandlers={{
                                        click: () => selectFacility(f, true),
                                    }}
                                >
                                    <Popup>
                                        <div style={{ minWidth: 200 }}>
                                            <strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{f.name}</strong>
                                            <p style={{ margin: '0.3rem 0', fontSize: '0.8rem', color: '#64748b' }}>
                                                <i className="fas fa-map-marker-alt" style={{ color: '#E5A100', marginRight: '0.3rem' }}></i>
                                                {f.address}
                                            </p>
                                            <p style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: '#64748b' }}>
                                                <i className="fas fa-clock" style={{ marginRight: '0.3rem' }}></i>
                                                {f.hours}
                                            </p>
                                            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        padding: '0.35rem 0.7rem', background: '#0056A4', color: '#fff',
                                                        borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                                                        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                                    }}
                                                >
                                                    <i className="fas fa-directions"></i> Directions
                                                </a>
                                                {f.phone && (
                                                    <a
                                                        href={`tel:${f.phone}`}
                                                        style={{
                                                            padding: '0.35rem 0.7rem', background: '#16a34a', color: '#fff',
                                                            borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
                                                            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                                                        }}
                                                    >
                                                        <i className="fas fa-phone"></i> Call
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Legend */}
                        <div className="ff-map-legend">
                            <div className="ff-legend-title">Facility Types</div>
                            <div className="ff-legend-items">
                                <div className="ff-legend-item"><span className="ff-legend-dot hospital"></span> Hospitals</div>
                                <div className="ff-legend-item"><span className="ff-legend-dot chc"></span> Community Health Centers</div>
                                <div className="ff-legend-item"><span className="ff-legend-dot clinic"></span> Clinics</div>
                                <div className="ff-legend-item"><span className="ff-legend-dot pharmacy"></span> Pharmacies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
