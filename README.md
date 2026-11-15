# 🇮🇳 YATRA — Indian Travel Discovery & Smart Pilgrimage Portal

> A clean, high-performance, MakeMyTrip-inspired multi-modal travel discovery, stay booking, route optimization, and pilgrimage planning platform for India.

---

## 🌟 Key Features

1. **MakeMyTrip-Inspired Signature Hero & Search Widget:**
   - Floating Category Tabs: *Explore Places*, *Hotels & Hostels*, *Routes & Waypoints*, *AI Trip Planner*, *HeritageGPT*, *Budget & Tolls*, *Moments & Feed*.
   - Dynamic 4-block search inputs with 1-click popular destination dropdowns.
2. **Deterministic Smart Budget Engine:**
   - Transparent JavaScript arithmetic calculating Transit + Stays + Local Meals + Entry Passes with a non-negotiable 10% safety contingency buffer.
   - Interactive group size, duration sliders, and visual expense allocation charts (Recharts).
3. **Multi-Modal Route Planner (2-Opt TSP Optimizer):**
   - Heuristic Traveling Salesperson Problem (TSP) waypoint re-ordering for shortest travel distance across Indian highways.
   - Live transit comparison: Indian Railways (Express / Vande Bharat), AC Sleeper Bus, Self-Drive Road Trip, and Regional Aviation.
4. **HeritageGPT Cultural Intelligence:**
   - Vernacular Pahadi dialect phrasebooks (Garhwali, Kumaoni, Hindi, English).
   - Authentic architectural dossiers for Kedarnath, Badrinath, Jageshwar Dham, and Rishikesh.
   - Uttarakhand Devasthanam Board biometric e-pass rules and SDRF (1070) emergency hotline info.
5. **OTA-Style 2-Column Stay Catalog:**
   - Sticky filter sidebar (price range, hostel/hotel/ashram toggle, star ratings, amenities).
   - Verified stays across Rajasthan and Uttarakhand with zero hidden markups.
6. **Creator & Social Moments Toolkit:**
   - 7-beat cinematic travel reel storyboard.
   - Lighting and angle director for first sandstone dawn glow and blue hour water reflections.
   - Bill splitting tool with mock UPI settlement QR code.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, Recharts, React Router v7, React Hot Toast
- **Backend:** Node.js, Express 5, MongoDB, Mongoose, JWT, Helmet, Morgan
- **Design System:** MakeMyTrip Travel Portal (`#F2F4F7` background, `#FFFFFF` cards, `#008CFF` gradient blue CTA, `#00A86B` green badges)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/kittu1038/YATRA.git
cd YATRA
```

### 2. Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Run the Development Servers
```bash
# From root directory:
npm run dev

# Or in separate terminals:
# Terminal 1 (Frontend):
cd frontend && npm run dev

# Terminal 2 (Backend):
cd backend && npm start
```

Open **http://localhost:5173** in your browser.

---

## 👤 Default Demo Accounts
- **Traveller:** `traveller@yatra.dev` / `Traveller@1234` (Or 1-click on Login page)
- **Admin:** `admin@yatra.dev` / `Admin@1234` (Full moderation access)
