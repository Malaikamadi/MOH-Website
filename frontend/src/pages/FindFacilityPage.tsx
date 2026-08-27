import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import masterFacilities from '../data/masterFacilities.json'

/** MoHS master facility categories */
export type FacilityType =
    | 'all'
    | 'gov-hospital'
    | 'private-mission'
    | 'chc'
    | 'chp'
    | 'phu'

export interface Facility {
    id: string
    code: string
    name: string
    type: Exclude<FacilityType, 'all'>
    district: string
    districtLabel: string
    lat: number
    lng: number
}

const facilities = masterFacilities as Facility[]

const typeMeta: Record<
    Exclude<FacilityType, 'all'>,
    { label: string; short: string; icon: string; color: string }
> = {
    'gov-hospital': {
        label: 'Gov. Hospitals',
        short: 'Gov Hospital',
        icon: 'hospital',
        color: '#dc2626',
    },
    'private-mission': {
        label: 'Private / Mission / Faith-based',
        short: 'Private / Mission',
        icon: 'church',
        color: '#7c3aed',
    },
    chc: {
        label: 'CHC',
        short: 'CHC',
        icon: 'clinic-medical',
        color: '#16a34a',
    },
    chp: {
        label: 'CHP',
        short: 'CHP',
        icon: 'house-medical',
        color: '#0284c7',
    },
    phu: {
        label: 'PHU',
        short: 'PHU / MCHP',
        icon: 'house-user',
        color: '#ca8a04',
    },
}

const typeOrder: FacilityType[] = [
    'all',
    'gov-hospital',
    'private-mission',
    'chc',
    'chp',
    'phu',
]

const faIcons: Record<string, string> = {
    'gov-hospital': '\uf0f8',
    'private-mission': '\uf67f',
    chc: '\uf7f2',
    chp: '\uf7f2',
    phu: '\uf015',
}

const districts: { value: string; label: string }[] = (() => {
    const map = new Map<string, string>()
    facilities.forEach((f) => {
        if (f.district && f.district !== 'other') {
            map.set(f.district, f.districtLabel || f.district)
        }
    })
    return [
        { value: 'all', label: 'All Districts' },
        ...Array.from(map.entries())
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([value, label]) => ({ value, label })),
    ]
})()

function createIcon(type: string) {
    const color = typeMeta[type as keyof typeof typeMeta]?.color || '#0056A4'
    return L.divIcon({
        html: `<div style="
            width:32px;height:32px;border-radius:50%;
            background:${color};color:#fff;
            display:flex;align-items:center;justify-content:center;
            font-size:13px;box-shadow:0 3px 10px rgba(0,0,0,0.3);
            border:2px solid #fff;font-family:'Font Awesome 6 Free';font-weight:900;
        ">${faIcons[type] || ''}</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
    })
}

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap()
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 0.75 })
    }, [center, zoom, map])
    return null
}

function FitBounds({ points }: { points: Facility[] }) {
    const map = useMap()
    useEffect(() => {
        if (points.length === 0) return
        if (points.length === 1) {
            map.flyTo([points[0].lat, points[0].lng], 14, { duration: 0.6 })
            return
        }
        const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]))
        map.fitBounds(bounds.pad(0.12), { animate: true, duration: 0.6, maxZoom: 12 })
    }, [points, map])
    return null
}

function ClusteredMarkers({
    items,
    onSelect,
}: {
    items: Facility[]
    onSelect: (f: Facility, scroll?: boolean) => void
}) {
    const map = useMap()

    useEffect(() => {
        const cluster = (L as typeof L & {
            markerClusterGroup: (o?: object) => L.MarkerClusterGroup
        }).markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 55,
            spiderfyOnMaxZoom: true,
            disableClusteringAtZoom: 15,
        })

        items.forEach((f) => {
            const marker = L.marker([f.lat, f.lng], { icon: createIcon(f.type) })
            const meta = typeMeta[f.type]
            marker.bindPopup(
                `<div style="min-width:200px">
                    <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;color:${meta.color};margin-bottom:0.25rem">${meta.short}</div>
                    <strong style="font-size:0.95rem;color:#1e293b">${f.name}</strong>
                    <p style="margin:0.35rem 0;font-size:0.8rem;color:#64748b">
                        ${f.districtLabel || f.district}
                    </p>
                    <p style="margin:0.2rem 0;font-size:0.75rem;color:#94a3b8">${f.code}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}"
                       target="_blank" rel="noopener noreferrer"
                       style="display:inline-flex;align-items:center;gap:0.3rem;margin-top:0.45rem;padding:0.35rem 0.7rem;background:#0056A4;color:#fff;border-radius:6px;font-size:0.75rem;font-weight:600;text-decoration:none">
                        Directions
                    </a>
                </div>`
            )
            marker.on('click', () => onSelect(f, true))
            cluster.addLayer(marker)
        })

        map.addLayer(cluster)
        return () => {
            map.removeLayer(cluster)
        }
    }, [items, map, onSelect])

    return null
}

const LIST_PAGE_SIZE = 80

export default function FindFacilityPage() {
    const [typeFilter, setTypeFilter] = useState<FacilityType>('all')
    const [districtFilter, setDistrictFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<Facility | null>(null)
    const [mapCenter, setMapCenter] = useState<[number, number]>([8.46, -11.8])
    const [mapZoom, setMapZoom] = useState(8)
    const [listLimit, setListLimit] = useState(LIST_PAGE_SIZE)
    const [flyToken, setFlyToken] = useState(0)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        return facilities.filter((f) => {
            const matchType = typeFilter === 'all' || f.type === typeFilter
            const matchDistrict =
                districtFilter === 'all' || f.district === districtFilter
            const matchSearch =
                !term ||
                f.name.toLowerCase().includes(term) ||
                f.code.toLowerCase().includes(term) ||
                f.districtLabel.toLowerCase().includes(term)
            return matchType && matchDistrict && matchSearch
        })
    }, [typeFilter, districtFilter, search])

    const listItems = filtered.slice(0, listLimit)

    const typeCounts = useMemo(() => {
        const c: Record<string, number> = { all: facilities.length }
        ;(Object.keys(typeMeta) as Exclude<FacilityType, 'all'>[]).forEach((t) => {
            c[t] = facilities.filter((f) => f.type === t).length
        })
        return c
    }, [])

    function selectFacility(f: Facility, scrollToCard?: boolean) {
        setSelected(f)
        setMapCenter([f.lat, f.lng])
        setMapZoom(15)
        setFlyToken((n) => n + 1)
        if (scrollToCard) {
            const idx = listItems.findIndex((x) => x.id === f.id)
            if (idx >= 0) {
                cardRefs.current[idx]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
        }
    }

    const onMarkerSelect = useCallback((f: Facility, scroll?: boolean) => {
        setSelected(f)
        setMapCenter([f.lat, f.lng])
        setMapZoom(15)
        setFlyToken((n) => n + 1)
        if (scroll) {
            // list scroll handled after render via selected id match when card is in page
        }
    }, [])

    useEffect(() => {
        setListLimit(LIST_PAGE_SIZE)
        setSelected(null)
    }, [typeFilter, districtFilter, search])

    return (
        <>
            <Header />
            <main className="ff-page">
                <section className="ff-page-header ff-page-header--compact">
                    <div className="container">
                        <div className="ff-header-content">
                            <h1>
                                <i
                                    className="fas fa-map-marked-alt"
                                    style={{ marginRight: '0.5rem', color: '#E5A100' }}
                                ></i>
                                Find a Health Facility
                            </h1>
                            <p>
                                Ministry master facility list — {facilities.length.toLocaleString()}{' '}
                                facilities mapped nationwide
                            </p>
                        </div>
                    </div>
                </section>

                <div className="ff-main ff-main--map-priority">
                    <aside className="ff-sidebar">
                        <div className="ff-search-section">
                            <div className="ff-search-box">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Search by name, code, or district…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="ff-filter-section">
                            <div className="ff-filter-label">Facility category</div>
                            <div className="ff-filter-options ff-filter-options--wrap">
                                {typeOrder.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        className={`ff-filter-btn ${typeFilter === t ? 'active' : ''}`}
                                        onClick={() => setTypeFilter(t)}
                                    >
                                        {t === 'all' ? (
                                            <>All ({typeCounts.all})</>
                                        ) : (
                                            <>
                                                <i
                                                    className={`fas fa-${typeMeta[t].icon}`}
                                                    style={{
                                                        color:
                                                            typeFilter === t
                                                                ? undefined
                                                                : typeMeta[t].color,
                                                    }}
                                                ></i>{' '}
                                                {typeMeta[t].label}
                                                <span className="ff-filter-count">
                                                    {typeCounts[t]}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <select
                                className="ff-district-select"
                                value={districtFilter}
                                onChange={(e) => setDistrictFilter(e.target.value)}
                                aria-label="District"
                            >
                                {districts.map((d) => (
                                    <option key={d.value} value={d.value}>
                                        {d.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="ff-facilities-list">
                            <p className="ff-facilities-count">
                                Showing{' '}
                                <strong>
                                    {listItems.length.toLocaleString()}
                                    {filtered.length > listItems.length
                                        ? ` of ${filtered.length.toLocaleString()}`
                                        : ''}
                                </strong>{' '}
                                facilities
                            </p>

                            {listItems.map((f, i) => (
                                <div
                                    key={f.id}
                                    ref={(el) => {
                                        cardRefs.current[i] = el
                                    }}
                                    className={`ff-facility-card ${selected?.id === f.id ? 'active' : ''}`}
                                    onClick={() => selectFacility(f)}
                                >
                                    <span className={`ff-facility-type ${f.type}`}>
                                        <i className={`fas fa-${typeMeta[f.type].icon}`}></i>{' '}
                                        {typeMeta[f.type].short}
                                    </span>
                                    <h3 className="ff-facility-name">{f.name}</h3>
                                    <div className="ff-facility-address">
                                        <i className="fas fa-map-marker-alt"></i>
                                        {f.districtLabel}
                                        {f.code ? ` · ${f.code}` : ''}
                                    </div>
                                </div>
                            ))}

                            {filtered.length > listItems.length ? (
                                <button
                                    type="button"
                                    className="ff-load-more"
                                    onClick={() =>
                                        setListLimit((n) => n + LIST_PAGE_SIZE)
                                    }
                                >
                                    Load more (
                                    {(filtered.length - listItems.length).toLocaleString()}{' '}
                                    remaining)
                                </button>
                            ) : null}

                            {filtered.length === 0 ? (
                                <div className="ff-empty">
                                    <i className="fas fa-search"></i>
                                    <p>No facilities match your search criteria.</p>
                                </div>
                            ) : null}
                        </div>
                    </aside>

                    <div className="ff-map-section">
                        <MapContainer
                            center={[8.46, -11.8]}
                            zoom={8}
                            className="ff-leaflet-map"
                            zoomControl
                            scrollWheelZoom
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {selected ? (
                                <FlyTo
                                    key={`fly-${flyToken}`}
                                    center={mapCenter}
                                    zoom={mapZoom}
                                />
                            ) : (
                                <FitBounds
                                    key={`${typeFilter}-${districtFilter}-${search}`}
                                    points={filtered}
                                />
                            )}
                            <ClusteredMarkers
                                items={filtered}
                                onSelect={onMarkerSelect}
                            />
                        </MapContainer>

                        <div className="ff-map-legend">
                            <div className="ff-legend-title">Categories</div>
                            <div className="ff-legend-items">
                                {(
                                    Object.keys(typeMeta) as Exclude<FacilityType, 'all'>[]
                                ).map((t) => (
                                    <div key={t} className="ff-legend-item">
                                        <span
                                            className="ff-legend-dot"
                                            style={{ background: typeMeta[t].color }}
                                        ></span>
                                        {typeMeta[t].label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
