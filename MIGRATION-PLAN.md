# MOH Website Migration Plan

## ✅ Completed Steps

1. ✅ **Assets Copied**
   - Images: `/Users/malaikamadi/Desktop/moh-website-html/assets/images/*` → `frontend/public/images/`
   - CSS: `styles.css` → `frontend/src/styles/main.css`
   - JavaScript: `js/*` → `frontend/src/utils/`

2. ✅ **Directory Structure Created**
   - `frontend/src/components/`
   - `frontend/src/pages/`
   - `frontend/src/styles/`
   - `frontend/public/images/`
   - `frontend/public/fonts/`
   - `frontend/public/icons/`

---

## 📋 Migration Strategy

### Technology Stack
- **Original**: HTML + Tailwind CDN + Vanilla JS
- **New**: React + TypeScript + Tailwind CSS + React Router

### Pages to Migrate (Priority Order)

**Phase 1 - Core Pages:**
1. ✅ Home (index.html) - START HERE
2. About (about.html)
3. Contact (contact.html)

**Phase 2 - Information Pages:**
4. Directorates (directorates.html)
5. Services/Programs
6. Emergency

**Phase 3 - Content Pages:**
7. Newsroom
8. Events
9. Publications
10. Reports

**Phase 4 - Specialized:**
11. Jobs Portal
12. Find Facility
13. Photo/Video Galleries
14. Directorate Detail Pages (15 pages)

---

## 🚀 Implementation Steps

### Step 1: Setup Tailwind CSS ✅ NEXT
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Configure Tailwind
Update `tailwind.config.js` with your custom colors from HTML

### Step 3: Create Layout Components
- Header (with top bar, navigation, dropdowns)
- Footer
- Layout wrapper

### Step 4: Create Page Components
Start with Homepage, then others

### Step 5: Setup Routing
Configure React Router for all pages

### Step 6: Convert Interactive Features
- Mobile menu toggle
- Language switcher
- Hero slider
- Tab systems
- Dropdowns

---

## 📝 Component Breakdown

### Header Component Structure
```
Header/
├── TopBar (logo, contact info, socials, language)
├── Navigation (menu items with dropdowns)
└── MobileMenu (responsive toggle)
```

### Homepage Sections
```
HomePage/
├── HeroSlider (3 slides with animations)
├── ServicesSection (4 service cards)
├── UpdatesSection (tabs: news, videos, events, publications)
├── StatsSection
└── CTASection
```

---

## 🎨 Styling Strategy

1. **Use existing CSS**: Import `main.css` globally
2. **Keep Tailwind classes**: Most HTML classes will work as-is
3. **Add Tailwind config**: Custom colors, fonts from original
4. **Component styles**: Use CSS modules for specific components if needed

---

## 🔧 Key Conversions Needed

### HTML → React Changes
| HTML | React |
|------|-------|
| `class=` | `className=` |
| `onclick=` | `onClick=` |
| `<img src>` | `<img src />` |
| `for=` | `htmlFor=` |
| Direct DOM | useState/useRef |

### JavaScript Features to Convert
1. **Hero Slider** → React component with state
2. **Mobile Menu** → useState for toggle
3. **Language Switcher** → useState + context
4. **Tab System** → useState for active tab
5. **Dropdowns** → React dropdown components

---

## 📂 File Structure After Migration

```
frontend/
├── public/
│   ├── images/          ✅ (migrated)
│   ├── fonts/
│   └── icons/
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── home/
│   │   │   ├── HeroSlider.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── UpdatesSection.tsx
│   │   │   └── StatsBar.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Dropdown.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── ... (other pages)
│   │
│   ├── styles/
│   │   ├── main.css       ✅ (migrated)
│   │   └── tailwind.css
│   │
│   ├── utils/             ✅ (migrated JS files)
│   │   ├── main.js
│   │   └── translator.js
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ⏭️ Next Immediate Actions

1. **Install Tailwind CSS**
2. **Configure Tailwind** with custom colors
3. **Create Header component**
4. **Create HomePage component**
5. **Test in browser** (http://localhost:5173)

---

## 🎯 Success Criteria

- [ ] Tailwind CSS installed and configured
- [ ] Header component created and working
- [ ] Homepage rendered with all sections
- [ ] Navigation dropdowns working
- [ ] Mobile menu toggle working
- [ ] Hero slider functional
- [ ] All images loading
- [ ] Responsive design maintained
- [ ] Interactive features working

---

**Current Status**: Ready to install Tailwind and start component creation!
