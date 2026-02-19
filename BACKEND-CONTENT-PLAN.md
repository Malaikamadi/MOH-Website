# MOH Website — Backend Content Plan

## Full Data Map: Frontend → Backend (Strapi)

This document maps **every section** across all pages to the Strapi Content Types needed, who manages the data, and the role-based access.

---

## 📍 PAGE 1: HOME PAGE (`/`)

### Section 1: Hero Slider
| Field | Type | Notes |
|-------|------|-------|
| title | Text | e.g. "Revolutionizing Healthcare" |
| description | Text | Subtitle text |
| image | Media | Background slide image |
| badge | Text | e.g. "National Health Information Hub" |
| badgeIcon | Text | FontAwesome icon name |
| primaryButtonText | Text | e.g. "View Details" |
| primaryButtonLink | Text | URL |
| secondaryButtonText | Text | e.g. "Contact Us" |
| secondaryButtonLink | Text | URL |
| order | Number | Slide order |
| **Managed By** | | **Comms Department** |

### Section 2: Stats Bar (Hero Bottom)
| Field | Type | Notes |
|-------|------|-------|
| value | Text | e.g. "16", "1,200+", "85%" |
| label | Text | e.g. "Districts Served" |
| link | Text | URL |
| order | Number | Display order |
| **Managed By** | | **Super Admin** |

### Section 3: Key Services
| Field | Type | Notes |
|-------|------|-------|
| title | Text | e.g. "Hospital Services" |
| description | Text | Short description |
| icon | Text | FontAwesome icon name |
| link | Text | URL |
| order | Number | Display order |
| **Managed By** | | **Super Admin** |

### Section 4: Latest Updates (Tabs: All / News / Videos / Events / Publications)
| Field | Type | Notes |
|-------|------|-------|
| title | Text | Article title |
| description | Text | Short summary |
| type | Enum | `news`, `video`, `event`, `publication` |
| image | Media | Thumbnail |
| date | DateTime | Published date |
| link | Text | URL to full content |
| linkText | Text | e.g. "Read More", "Watch Video", "Download" |
| eventDate | JSON | `{ day: "25", month: "JAN" }` for events |
| fileSize | Text | e.g. "2.4 MB • PDF" for publications |
| **Managed By** | | **Comms Department** |

### Section 5: Latest News + Press Releases Sidebar
| Field | Type | Notes |
|-------|------|-------|
| title | Text | Headline |
| summary | Text | Short description |
| content | Rich Text | Full article body |
| category | Enum | `Breaking News`, `Latest News`, `Press Release`, `Public Notice` |
| coverImage | Media | Featured image |
| date | DateTime | Published date |
| author | Text | Author name |
| slug | UID | URL-friendly slug |
| **Managed By** | | **Comms Department** |

### Section 6: National Disease Surveillance (DHIS2)
| Field | Type | Notes |
|-------|------|-------|
| diseaseName | Text | e.g. "Malaria", "Cholera" |
| region | Text | Region/province |
| district | Text | District |
| reportingPeriodStart | Date | Start of reporting period |
| reportingPeriodEnd | Date | End of reporting period |
| totalCases | Number | Total count |
| newCases | Number | New in period |
| deaths | Number | Deaths |
| recovered | Number | Recovered |
| status | Enum | `Confirmed`, `Suspected`, `Projected` |
| sourceSystem | Text | Default: "DHIS2" |
| **Managed By** | | **Auto-sync from DHIS2** (read-only in Strapi) |

### Section 7: Newsletter Subscription
| Field | Type | Notes |
|-------|------|-------|
| email | Email | Subscriber email |
| subscribedAt | DateTime | Timestamp |
| **Managed By** | | **System (auto-collected)** |

---

## 📍 PAGE 2: NEWSROOM (`/newsroom`) — Comms Department Controlled

The Comms department needs **full control** over this page. They should be able to:
- Create, edit, publish, and unpublish news articles
- Manage press releases
- Schedule publications
- Upload media (images, videos)

### Content Type: `News Article` (already partially in "Latest Update")
| Field | Type | Notes |
|-------|------|-------|
| title | Text | Required |
| slug | UID | Auto-generated from title |
| summary | Text | For preview cards (max 500 chars) |
| content | Rich Text | Full article with embedded images |
| coverImage | Media | Main image |
| gallery | Media (multiple) | Photo gallery |
| category | Enum | `Breaking News`, `Latest News`, `Press Release`, `Public Notice`, `Announcement` |
| tags | Text (array) | Searchable tags |
| author | Text | Writer name |
| publishedDate | DateTime | When to show |
| featured | Boolean | Show on homepage slider |
| **Managed By** | | **Comms Department** (Strapi role: `Communications Editor`) |

### Content Type: `Event`
| Field | Type | Notes |
|-------|------|-------|
| title | Text | Event name |
| description | Rich Text | Details |
| location | Text | Venue |
| eventDate | DateTime | Start date/time |
| eventEndDate | DateTime | End date/time |
| coverImage | Media | Event poster |
| registrationLink | Text | External link |
| **Managed By** | | **Comms Department** |

---

## 📍 PAGE 3: PUBLICATIONS — Directorate-Controlled Uploads

Each directorate should be able to upload their own publications/documents.

### Content Type: `Publication`
| Field | Type | Notes |
|-------|------|-------|
| title | Text | Document title |
| description | Text | Summary |
| category | Enum | `Policy`, `Report`, `Guideline`, `Strategic Plan`, `Annual Report`, `Research`, `Form` |
| file | Media | The actual PDF/document |
| fileSize | Text | e.g. "2.4 MB" |
| coverImage | Media | Optional thumbnail |
| publishDate | Date | Publication date |
| directorate | Relation | → links to `Directorate` content type |
| year | Number | Publication year (for filtering) |
| **Managed By** | | **Each Directorate** (Strapi role: `Directorate Editor`) |

### Content Type: `Directorate` (for relations)
| Field | Type | Notes |
|-------|------|-------|
| name | Text | e.g. "DPPI" |
| fullName | Text | e.g. "Directorate of Policy, Planning & Information" |
| slug | UID | URL slug |
| icon | Text | FontAwesome icon |
| about | Rich Text | Overview |
| directorName | Text | Director name |
| directorImage | Media | Photo |
| directorBio | Rich Text | Biography |
| contact | JSON | { email, phone, location } |
| publications | Relation (reverse) | ← linked from Publication |
| **Managed By** | | **Directorate Admins** |

---

## 📍 NAVIGATION DROPDOWNS (Header)

### "About MOH" dropdown
- Our History → Static page (no backend needed)
- Leadership → Could be backend-driven
- Mission & Vision → Static page

### "Directorates" dropdown  
- Lists all directorates → **Fetched from `Directorate` content type**

### "Emergency" dropdown
- Emergency Response → Static
- Emergency Hotlines → Could be backend (phone numbers)

### "Media" dropdown
- Newsroom → **`News Article` content type**
- Events → **`Event` content type**
- Press Releases → **`News Article` filtered by category**

### "Job Portal" link
- Future: Job listings content type

---

## 📍 DIRECTORATE PAGES (`/directorates/:slug`)

Each directorate page has these sections that **could** come from backend:

| Section | Data Source | Notes |
|---------|------------|-------|
| Hero (name, icon) | `Directorate` content type | Or keep in frontend data |
| About/Overview | `Directorate.about` | Rich text |
| Stats | `Directorate.stats` | Units, districts, staff, partners |
| Director info | `Directorate` fields | Name, image, bio |
| Units | Relation → `DirectorateUnit` | Name, description, functions |
| Documents | Relation → `Publication` | Filtered by directorate |
| Contact | `Directorate.contact` | Email, phone, location |

---

## 🔐 ROLE-BASED ACCESS PLAN

### Role 1: `Super Admin`
- Full access to everything
- Manages system settings, users, roles

### Role 2: `Communications Editor` (Comms Department)
- **CAN**: Create/Edit/Publish/Delete → `News Article`, `Event`, `Press Release`
- **CAN**: Upload media (images, videos)
- **CAN**: Manage Hero Slider content
- **CAN**: Manage Latest Updates section
- **CANNOT**: Edit Directorate data, Disease Surveillance, System settings

### Role 3: `Directorate Editor` (Per-Directorate)
- **CAN**: Create/Edit/Publish → `Publication` (only for their directorate)
- **CAN**: Edit their own `Directorate` page content
- **CAN**: Upload documents/PDFs
- **CANNOT**: Edit other directorates' content
- **CANNOT**: Edit News, Events, Homepage

### Role 4: `Viewer` (Read-only staff)
- **CAN**: View all content
- **CANNOT**: Create/Edit/Delete anything

---

## 📊 COMPLETE CONTENT TYPE LIST (Strapi)

| # | Content Type | Status | Managed By |
|---|-------------|--------|------------|
| 1 | `Hero Slide` | 🆕 To Create | Comms |
| 2 | `Stat` | 🆕 To Create | Super Admin |
| 3 | `Service` | 🆕 To Create | Super Admin |
| 4 | `News Article` | 🔄 Expand existing `Update` | Comms |
| 5 | `Event` | 🆕 To Create | Comms |
| 6 | `Publication` | 🔄 Expand existing `Document` | Directorates |
| 7 | `Disease Surveillance` | ✅ Created | DHIS2 Auto-Sync |
| 8 | `Directorate` | 🆕 To Create | Directorate Admins |
| 9 | `Newsletter Subscriber` | 🆕 To Create | System |

---

## 🔄 DHIS2 INTEGRATION (Disease Surveillance)

### How It Works:
1. **Scheduled Job** runs every 24 hours (configurable)
2. Fetches data from DHIS2 API: `https://dhis2.health.gov.sl/api/...`
3. Maps DHIS2 data elements to our `Disease Surveillance` fields
4. Upserts records in Strapi (update existing, insert new)
5. Frontend fetches from Strapi API (not directly from DHIS2)

### What We Need From You:
- DHIS2 server URL
- API credentials (username/password or API token)
- Specific Data Element IDs to fetch
- Reporting frequency preference

---

## 🚀 IMPLEMENTATION ORDER

### Phase 1: Core Content (Week 1)
1. ✅ Disease Surveillance schema (done)
2. Expand `Update` → full `News Article` with all fields
3. Create `Publication` content type (replaces `Document`)
4. Create `Event` content type
5. Create `Hero Slide` content type

### Phase 2: Directorate System (Week 2)
6. Create `Directorate` content type
7. Link Publications to Directorates (relation)
8. Set up Directorate Editor roles
9. Migrate directorate data from `directoratesData.ts` to Strapi

### Phase 3: Roles & Permissions (Week 2)
10. Create `Communications Editor` role
11. Create `Directorate Editor` role
12. Set up content permissions per role
13. Create user accounts for Comms team and Directorate admins

### Phase 4: DHIS2 Integration (Week 3)
14. Build DHIS2 sync service
15. Map data elements
16. Setup scheduled cron job
17. Build disease surveillance dashboard component

### Phase 5: Frontend Integration (Week 3-4)
18. Connect HomePage sections to Strapi API
19. Build Newsroom page
20. Connect Directorate documents to Strapi
21. Build publication search/filter
