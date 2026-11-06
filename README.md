# Vibe Events — Interactive 3D Event Venue Experience

A fully interactive, browser-based **3D spatial walkthrough** of a grand event venue built with React, Three.js, and React Three Fiber. Users can explore a cinematic entrance, walk through a grand hall, interact with service pods, toggle flaming torches, and navigate via ground hotspots and waypoints — all rendered in real-time WebGL.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r187-000000?logo=threedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## Key Features

### 3D Spatial Walkthrough
- **Grand Entrance** — cinematic exterior facade with interactive double doors that open/close independently on click
- **Door Dolly Sequence** — smooth camera animation through the threshold into the hall
- **Grand Hall** — vaulted ceiling, marble-style floor, architectural columns, gold trim, and elevated VIP stage
- **360° Look Around** — click-and-drag to pan the camera in any direction with full spherical rotation

### Interactive Flaming Torches
- Animated multi-layer flame (core glow, mid envelope, outer haze, rising spark particles)
- Flickering point lights with randomized phase offsets (no two torches flicker in sync)
- **Click to toggle** — smooth ignite/extinguish animation with flame scale, opacity, emissive intensity, and particle behavior all transitioning over time

### Ground Hotspot Navigation
- **Interior hotspots** (gold rings) — teleport to key locations inside the hall
- **Exterior hotspots** (blue rings) — explore the courtyard before entering
- Pulsing concentric ring animation with hover effects and pointer cursor feedback
- Smooth GSAP camera glide to each hotspot position

### Waypoint Dock
- Desktop: vertical dock on the left edge with labeled waypoints (Entrance, Grand Hall, Services, VIP Stage)
- Mobile: horizontal bottom dock with condensed labels
- Active waypoint highlighted with amber glow; clears automatically during free-roam via hotspots
- Supports re-clicking the same waypoint to re-trigger camera animation

### Service Pods
- 6 interactive service categories (Weddings, Corporate, Concerts, VIP, Brand Activations, AV & Lighting)
- Floating 3D pods with emissive accent colors, hover scaling, and exhibition plaque titles
- Click to open a full **Service Drawer** with gallery images, feature lists, pricing packages, and booking CTAs

### UI Overlays & Modals
- **Entrance Overlay** — hero branding, auto-enter countdown timer, sound toggle, 2D view switch
- **Header HUD** — brand wordmark, navigation links, 3D/2D mode toggle, sound control, booking CTA, mobile hamburger menu
- **Portfolio Modal** — filterable event gallery
- **Cost Calculator Modal** — interactive event budget estimator
- **About Modal** — company information
- **Booking Modal** — consultation/inquiry form

### Dual View Modes
- **3D Mode** — full WebGL spatial walkthrough (default)
- **2D Mode** — classic scrollable website layout as a fallback

---

## Architecture

```
src/
├── components/
│   ├── 3d/                        # WebGL / R3F scene components
│   │   ├── CameraController.jsx   # 360° drag orbit, waypoint/hotspot/service camera animations
│   │   ├── CanvasContainer.jsx    # R3F Canvas wrapper, scene composition
│   │   ├── DoorModel.jsx          # Interactive double doors with GSAP-damped hinges
│   │   ├── EnvironmentLights.jsx  # Ambient, directional, point lights (adaptive to entrance state)
│   │   ├── ExteriorEntrance.jsx   # Facade, pillars, steps, courtyard, torches
│   │   ├── FlamingTorch.jsx       # Reusable animated torch with click-to-toggle
│   │   ├── GrandHall.jsx          # Floor, ceiling vault, columns, stage, hall torches
│   │   ├── GroundHotspots.jsx     # Interior + exterior teleport hotspots
│   │   ├── ParticleField.jsx      # Atmospheric floating gold dust particles
│   │   └── ServicePod.jsx         # Interactive 3D service display pods
│   │
│   └── ui/                        # DOM overlay components
│       ├── EntranceOverlay.jsx    # Pre-entrance hero branding & countdown
│       ├── HeaderHUD.jsx          # Top navigation bar
│       ├── WaypointDock.jsx       # Waypoint navigation dock (desktop + mobile)
│       ├── ServiceDrawer.jsx      # Slide-out service detail panel
│       ├── PortfolioModal.jsx     # Portfolio gallery modal
│       ├── CostCalculatorModal.jsx# Budget estimator modal
│       ├── AboutModal.jsx         # About info modal
│       ├── BookingModal.jsx       # Booking/inquiry modal
│       └── Classic2DView.jsx      # Fallback 2D scrollable website
│
├── data/
│   ├── servicesData.js            # Service pod content, packages, gallery images
│   └── portfolioData.js           # Portfolio gallery data
│
├── store/
│   └── useExperienceStore.js      # Lightweight global state (no Redux/Zustand)
│
├── utils/
│   └── audioSystem.js             # Sound effects (door open, whoosh, click, hover)
│
├── App.jsx                        # Root component, view mode routing
├── main.jsx                       # Entry point
└── index.css                      # Tailwind imports, custom animations, glass effects
```

### State Management

A minimal custom reactive store (`useExperienceStore.js`) using a global state object + `Set<listener>` pattern. No external state library — keeps the bundle lean.

**Key state fields:**
| Field | Type | Description |
|-------|------|-------------|
| `entranceState` | `'outside' \| 'opening' \| 'inside'` | Current entrance phase |
| `cameraWaypoint` | `string \| null` | Active waypoint or `null` (free-roaming) |
| `waypointVersion` | `number` | Monotonic counter to force re-trigger on same waypoint |
| `customHotspotTarget` | `[x,y,z] \| null` | Camera target from ground hotspot click |
| `activeService` | `object \| null` | Currently focused service pod |
| `viewMode` | `'3d' \| '2d'` | Active view mode |

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Three.js r187** | 3D rendering engine |
| **React Three Fiber (R3F) 9** | React renderer for Three.js |
| **@react-three/drei** | R3F utility components |
| **GSAP 3** | Camera & door animation tweens |
| **Tailwind CSS 4** | Utility-first styling |
| **Lucide React** | Icon library |
| **Canvas Confetti** | Celebration effects |
| **Vite 8** | Build tool & dev server |
| **OxLint** | Fast JavaScript/TypeScript linter |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone <repository-url>
cd vibeevent
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173) with hot module replacement.

### Production Build

```bash
npm run build
npm run preview    # Preview the production build locally
```

### Linting

```bash
npm run lint
```

---

## Build Optimization

Vite is configured with manual chunk splitting for optimal caching:

| Chunk | Contents | Approx Size (gzipped) |
|-------|----------|-----------------------|
| `r3f` | Three.js + React Three Fiber + Drei | ~355 KB |
| `animation` | GSAP + Canvas Confetti | ~31 KB |
| `index` | App code + UI components | ~27 KB |

---

## Controls

| Action | Input |
|--------|-------|
| **Look around** | Click + drag (360° spherical) |
| **Navigate (waypoints)** | Click waypoint dock buttons |
| **Navigate (hotspots)** | Click golden/blue ground rings |
| **Open/close doors** | Click either door panel |
| **Toggle torches** | Click any flame torch |
| **Open service details** | Click a service pod |
| **Switch to 2D** | Click the 3D/2D toggle in the header |

---

## Responsive Design

- **Desktop** — full 3D experience, vertical waypoint dock, wide header nav
- **Tablet** — adaptive FOV, responsive overlays
- **Mobile** — wider FOV (68°), horizontal bottom waypoint dock, hamburger menu, touch-optimized hit areas

---

## License

This project is private and not licensed for redistribution.
