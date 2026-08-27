import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
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

type UserLocation = { lat: number; lng: number }

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

const pinIconCache = new Map<string, L.Icon>()

function getPinIcon(type: Exclude<FacilityType, 'all'>) {
    let icon = pinIconCache.get(type)
    if (!icon) {
        icon = L.icon({
            iconUrl: `/images/facility-pins/${type}.png`,
            iconSize: [36, 55],
            iconAnchor: [18, 50],
            popupAnchor: [0, -46],
        })
        pinIconCache.set(type, icon)
    }
    return icon
}

function haversineKm(
    a: { lat: number; lng: number },
    b: { lat: number; lng: number }
): number {
    const R = 6371
    const dLat = ((b.lat - a.lat) * Math.PI) / 180
    const dLng = ((b.lng - a.lng) * Math.PI) / 180
    const lat1 = (a.lat * Math.PI) / 180
    const lat2 = (b.lat * Math.PI) / 180
    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

function formatDistance(km: number): string {
    if (km < 1) return `${Math.round(km * 1000)} m`
    if (km < 10) return `${km.toFixed(1)} km`
    return `${Math.round(km)} km`
}

function directionsUrl(
    facility: Facility,
    from: UserLocation | null,
    mode: 'driving' | 'walking' = 'driving'
): string {
    const dest = `${facility.lat},${facility.lng}`
    if (from) {
        return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${dest}&travelmode=${mode}`
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=${mode}`
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

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap()
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 0.75 })
    }, [center, zoom, map])
    return null
}

function FitBounds({
    points,
    userLocation,
}: {
    points: Facility[]
    userLocation: UserLocation | null
}) {
    const map = useMap()
    useEffect(() => {
        const coords: [number, number][] = points.map((p) => [p.lat, p.lng])
        if (userLocation) coords.push([userLocation.lat, userLocation.lng])
        if (coords.length === 0) return
        if (coords.length === 1) {
            map.flyTo(coords[0], 14, { duration: 0.6 })
            return
        }
        const bounds = L.latLngBounds(coords)
        map.fitBounds(bounds.pad(0.12), {
            animate: true,
            maxZoom: userLocation ? 13 : 11,
        })
    }, [points, userLocation, map])
    return null
}

function UserLocationMarker({ location }: { location: UserLocation }) {
    const map = useMap()

    useEffect(() => {
        const icon = L.divIcon({
            className: 'ff-user-loc-icon',
            html: `<span class="ff-user-loc-pulse"></span><span class="ff-user-loc-dot"></span>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
        })
        const marker = L.marker([location.lat, location.lng], {
            icon,
            zIndexOffset: 1000,
            interactive: false,
        })
        map.addLayer(marker)
        return () => {
            map.removeLayer(marker)
        }
    }, [location, map])

    return null
}

/** Colored location pins per facility type */
function FacilityMarkers({
    items,
    userLocation,
    onSelect,
}: {
    items: Facility[]
    userLocation: UserLocation | null
    onSelect: (f: Facility) => void
}) {
    const map = useMap()

    useEffect(() => {
        const group = L.layerGroup()

        items.forEach((f) => {
            const meta = typeMeta[f.type]
            const distKm = userLocation ? haversineKm(userLocation, f) : null
            const distLabel =
                distKm != null
                    ? `<p style="margin:0.35rem 0 0;font-size:0.8rem;color:#0056A4;font-weight:600">${formatDistance(distKm)} away</p>`
                    : ''
            const dir = directionsUrl(f, userLocation)
            const marker = L.marker([f.lat, f.lng], {
                icon: getPinIcon(f.type),
                riseOnHover: true,
            })
            marker.bindPopup(
                `<div style="min-width:210px">
                    <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;color:${meta.color};margin-bottom:0.25rem">${meta.short}</div>
                    <strong style="font-size:0.95rem;color:#1e293b">${f.name}</strong>
                    <p style="margin:0.35rem 0;font-size:0.8rem;color:#64748b">
                        ${f.districtLabel || f.district}
                    </p>
                    <p style="margin:0.2rem 0;font-size:0.75rem;color:#94a3b8">${f.code}</p>
                    ${distLabel}
                    <a href="${dir}"
                       target="_blank" rel="noopener noreferrer"
                       style="display:inline-flex;align-items:center;gap:0.3rem;margin-top:0.55rem;padding:0.4rem 0.75rem;background:#0056A4;color:#fff;border-radius:6px;font-size:0.75rem;font-weight:600;text-decoration:none">
                        Get directions
                    </a>
                </div>`
            )
            marker.on('click', () => onSelect(f))
            group.addLayer(marker)
        })

        map.addLayer(group)
        return () => {
            map.removeLayer(group)
        }
    }, [items, map, onSelect, userLocation])

    return null
}

const LIST_PAGE_SIZE = 80
const NEAR_ME_LIST_CAP = 40

export default function FindFacilityPage() {
    const [typeFilter, setTypeFilter] = useState<FacilityType>('all')
    const [districtFilter, setDistrictFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<Facility | null>(null)
    const [mapCenter, setMapCenter] = useState<[number, number]>([8.46, -11.8])
    const [mapZoom, setMapZoom] = useState(8)
    const [listLimit, setListLimit] = useState(LIST_PAGE_SIZE)
    const [flyToken, setFlyToken] = useState(0)
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
    const [nearMe, setNearMe] = useState(false)
    const [locating, setLocating] = useState(false)
    const [locationError, setLocationError] = useState<string | null>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        let list = facilities.filter((f) => {
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

        if (nearMe && userLocation) {
            list = [...list].sort(
                (a, b) =>
                    haversineKm(userLocation, a) - haversineKm(userLocation, b)
            )
        }

        return list
    }, [typeFilter, districtFilter, search, nearMe, userLocation])

    const listItems = useMemo(() => {
        const cap =
            nearMe && userLocation
                ? Math.min(listLimit, NEAR_ME_LIST_CAP)
                : listLimit
        return filtered.slice(0, cap)
    }, [filtered, listLimit, nearMe, userLocation])

    const mapFacilities = useMemo(() => {
        if (nearMe && userLocation) {
            return filtered.slice(0, NEAR_ME_LIST_CAP)
        }
        return filtered
    }, [filtered, nearMe, userLocation])

    const nearest = useMemo(() => {
        if (!userLocation || filtered.length === 0) return null
        return filtered[0]
    }, [userLocation, filtered])

    const typeCounts = useMemo(() => {
        const c: Record<string, number> = { all: facilities.length }
        ;(Object.keys(typeMeta) as Exclude<FacilityType, 'all'>[]).forEach((t) => {
            c[t] = facilities.filter((f) => f.type === t).length
        })
        return c
    }, [])

    const applyLocation = useCallback((lat: number, lng: number) => {
        setUserLocation({ lat, lng })
        setNearMe(true)
        setLocationError(null)
        setSelected(null)
        setMapCenter([lat, lng])
        setMapZoom(13)
        setFlyToken((n) => n + 1)
        setListLimit(LIST_PAGE_SIZE)
    }, [])

    const locateMe = useCallback(() => {
        if (!navigator.geolocation) {
            setLocationError(
                'Location is not supported in this browser. Try Chrome or Safari on your phone.'
            )
            return
        }
        setLocating(true)
        setLocationError(null)

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                applyLocation(pos.coords.latitude, pos.coords.longitude)
                setLocating(false)
            },
            (err) => {
                setLocating(false)
                if (err.code === err.PERMISSION_DENIED) {
                    setLocationError(
                        'Location permission was denied. Allow location access in your browser settings to find facilities near you.'
                    )
                } else if (err.code === err.TIMEOUT) {
                    setLocationError(
                        'Could not get your location in time. Move outdoors or try again.'
                    )
                } else {
                    setLocationError(
                        'Unable to get your location right now. Please try again.'
                    )
                }
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
        )
    }, [applyLocation])

    const stopNearMe = useCallback(() => {
        setNearMe(false)
        setUserLocation(null)
        setLocationError(null)
        setSelected(null)
    }, [])

    function selectFacility(f: Facility) {
        setSelected(f)
        setMapCenter([f.lat, f.lng])
        setMapZoom(15)
        setFlyToken((n) => n + 1)
    }

    const onMarkerSelect = useCallback((f: Facility) => {
        setSelected(f)
        setMapCenter([f.lat, f.lng])
        setMapZoom(14)
        setFlyToken((n) => n + 1)
    }, [])

    useEffect(() => {
        setListLimit(LIST_PAGE_SIZE)
        setSelected(null)
    }, [typeFilter, districtFilter, search])

    const fitKey = `${typeFilter}-${districtFilter}-${search}-${nearMe}-${userLocation ? 'loc' : 'noloc'}`

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
                                Find facilities near you and get directions from where you
                                are
                            </p>
                        </div>
                    </div>
                </section>

                <div className="ff-main ff-main--map-priority">
                    <aside className="ff-sidebar">
                        <div className="ff-search-section">
                            <div className="ff-near-me">
                                {!nearMe || !userLocation ? (
                                    <button
                                        type="button"
                                        className="ff-near-me-btn"
                                        onClick={locateMe}
                                        disabled={locating}
                                    >
                                        <i
                                            className={`fas ${locating ? 'fa-spinner fa-spin' : 'fa-location-crosshairs'}`}
                                        ></i>
                                        {locating
                                            ? 'Finding your location…'
                                            : 'Use my location'}
                                    </button>
                                ) : (
                                    <div className="ff-near-me-active">
                                        <div className="ff-near-me-status">
                                            <i className="fas fa-location-crosshairs"></i>
                                            <div>
                                                <strong>Showing nearest facilities</strong>
                                                <span>
                                                    Sorted by distance from you
                                                    {nearest
                                                        ? ` · closest ${formatDistance(haversineKm(userLocation, nearest))}`
                                                        : ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ff-near-me-actions">
                                            <button
                                                type="button"
                                                className="ff-near-me-refresh"
                                                onClick={locateMe}
                                                disabled={locating}
                                            >
                                                <i className="fas fa-sync-alt"></i>
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                className="ff-near-me-clear"
                                                onClick={stopNearMe}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {locationError ? (
                                    <p className="ff-near-me-error" role="alert">
                                        {locationError}
                                    </p>
                                ) : null}
                            </div>

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
                                {nearMe && userLocation ? (
                                    <>
                                        Nearest{' '}
                                        <strong>
                                            {listItems.length.toLocaleString()}
                                        </strong>{' '}
                                        facilities to you
                                        {filtered.length > listItems.length
                                            ? ` (of ${filtered.length.toLocaleString()} matching)`
                                            : ''}
                                    </>
                                ) : (
                                    <>
                                        Showing{' '}
                                        <strong>
                                            {listItems.length.toLocaleString()}
                                            {filtered.length > listItems.length
                                                ? ` of ${filtered.length.toLocaleString()}`
                                                : ''}
                                        </strong>{' '}
                                        facilities
                                    </>
                                )}
                            </p>

                            {listItems.map((f, i) => {
                                const distKm = userLocation
                                    ? haversineKm(userLocation, f)
                                    : null
                                return (
                                    <div
                                        key={f.id}
                                        ref={(el) => {
                                            cardRefs.current[i] = el
                                        }}
                                        className={`ff-facility-card ${selected?.id === f.id ? 'active' : ''}`}
                                        onClick={() => selectFacility(f)}
                                    >
                                        <div className="ff-facility-card-top">
                                            <span className={`ff-facility-type ${f.type}`}>
                                                <i
                                                    className={`fas fa-${typeMeta[f.type].icon}`}
                                                ></i>{' '}
                                                {typeMeta[f.type].short}
                                            </span>
                                            {distKm != null ? (
                                                <span className="ff-facility-distance">
                                                    {formatDistance(distKm)}
                                                </span>
                                            ) : null}
                                        </div>
                                        <h3 className="ff-facility-name">{f.name}</h3>
                                        <div className="ff-facility-address">
                                            <i className="fas fa-map-marker-alt"></i>
                                            {f.districtLabel}
                                            {f.code ? ` · ${f.code}` : ''}
                                        </div>
                                        <a
                                            className="ff-directions-btn"
                                            href={directionsUrl(f, userLocation)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <i className="fas fa-route"></i>
                                            {userLocation
                                                ? 'Directions from me'
                                                : 'Get directions'}
                                        </a>
                                    </div>
                                )
                            })}

                            {!(nearMe && userLocation) &&
                            filtered.length > listItems.length ? (
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
                            ) : nearMe && userLocation && !selected ? (
                                <FitBounds
                                    key={fitKey}
                                    points={mapFacilities.slice(0, 12)}
                                    userLocation={userLocation}
                                />
                            ) : (
                                <FitBounds
                                    key={fitKey}
                                    points={mapFacilities}
                                    userLocation={null}
                                />
                            )}
                            {userLocation ? (
                                <UserLocationMarker location={userLocation} />
                            ) : null}
                            <FacilityMarkers
                                items={mapFacilities}
                                userLocation={userLocation}
                                onSelect={onMarkerSelect}
                            />
                        </MapContainer>

                        <button
                            type="button"
                            className={`ff-map-locate ${nearMe ? 'active' : ''}`}
                            onClick={nearMe ? stopNearMe : locateMe}
                            disabled={locating}
                            title={
                                nearMe
                                    ? 'Stop using my location'
                                    : 'Find facilities near me'
                            }
                            aria-label={
                                nearMe
                                    ? 'Stop using my location'
                                    : 'Find facilities near me'
                            }
                        >
                            <i
                                className={`fas ${locating ? 'fa-spinner fa-spin' : 'fa-location-crosshairs'}`}
                            ></i>
                        </button>

                        <div className="ff-map-legend">
                            <div className="ff-legend-title">Categories</div>
                            <div className="ff-legend-items">
                                {(
                                    Object.keys(typeMeta) as Exclude<FacilityType, 'all'>[]
                                ).map((t) => (
                                    <div key={t} className="ff-legend-item">
                                        <img
                                            className="ff-legend-pin"
                                            src={`/images/facility-pins/${t}.png`}
                                            alt=""
                                            width={18}
                                            height={28}
                                        />
                                        {typeMeta[t].label}
                                    </div>
                                ))}
                                {userLocation ? (
                                    <div className="ff-legend-item">
                                        <span className="ff-legend-you"></span>
                                        Your location
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
