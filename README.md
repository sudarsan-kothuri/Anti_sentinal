# AquaSentinel 🛰️💧
### AI-Powered Satellite Water Pollution Monitoring & Environmental Intelligence Platform

> **"See Beyond the Surface. Protect What Sustains Us."**

[![Copernicus Sentinel-2](https://img.shields.io/badge/Satellite-Copernicus%20Sentinel--2%20MSI-20D9D0?style=for-the-badge&logo=satellite)](https://sentinels.copernicus.eu/)
[![Google Earth Engine](https://img.shields.io/badge/Compute-Google%20Earth%20Engine-319BFF?style=for-the-badge&logo=google)](https://earthengine.google.com/)
[![React + Vite](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-36D69A?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/3D%20Globe-Three.js%20WebGL-EDF8FA?style=for-the-badge&logo=threedotjs)](https://threejs.org/)

---

## 🌍 Executive Summary

**AquaSentinel** is a next-generation environmental intelligence platform combining satellite remote sensing, multi-spectral physical indices, historical time-series analytics, and unsupervised machine learning to detect unusual water-quality deviations across planetary reservoirs and water bodies.

Designed for environmental protection authorities, municipal water districts, and research teams, AquaSentinel bridges the critical gap between spaceborne Earth observation and ground-level physical inspection. It identifies suspicious spectral changes in between scheduled field visits, quantifies environmental uncertainty, and generates geo-referenced investigation dossiers to dispatch field testing crews with surgical precision.

---

## 🔬 Scientific Responsibility & Guiding Protocol

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       TWO-TIER ENVIRONMENTAL PIPELINE                       │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ TIER 1: SPACEBORNE REMOTE SCREENING  │ TIER 2: IN-SITU PHYSICAL TESTING     │
│ • 5-Day Orbital Revisit Cycle        │ • Rapid Boat & Shore Grab Sampling   │
│ • 10m to 20m Spatial Resolution      │ • Laboratory Mass Spectrometry       │
│ • Optical Band Radiance Ratios       │ • Molecular & Chemical Speciation    │
│ • High-Confidence Anomaly Triage     │ • Regulatory Enforcement Compliance  │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

> **Mandatory Scientific Notice**:
> Spaceborne optical sensors measure electromagnetic reflectance at distinct wavelengths across the visible, red-edge, NIR, and SWIR spectrums. While spectral deviations correlate strongly with chlorophyll-a, cyanobacteria blooms, and suspended sediment plumes, **satellites cannot independently confirm chemical toxicity or molecular pollutants** (e.g. heavy metal ions, PFAS, or exact microcystin concentrations). 
> 
> **AquaSentinel does not substitute for laboratory testing.** Instead, it serves as a force multiplier—directing physical sampling teams to the exact coordinates where anomalous behavior is taking place.

---

## 🚀 Key Platform Modules

### 1. 🌐 Cinematic Landing Page & 3D Planetary Experience
* **Three.js 3D Interactive Earth**: Procedurally rendered continents, ocean bathymetry gradients, cloud layers, and an atmospheric Rayleigh-scattering Fresnel glow shield.
* **Sentinel-2 Orbital Tracks**: Inclined polar orbits with a traveling 3D Sentinel spacecraft mesh and real-time telemetry HUD (speed 7.48 km/s, altitude 786 km).
* **Geolocated Basin Hotspots**: Pulsing markers over monitored catchments (Emerald Basin, Lake Mead, Bellandur Lake, Lake Erie, Salton Sea, Lake Victoria).
* **Live Telemetry Counters**: 128 Monitored Water Bodies, 2,460 Observations, 18 Active Anomalies, 7 Field Priorities.

### 2. 🗺️ Command Center Overview & Cartography
* **Geospatial Map (Leaflet)**: Custom Dark GIS, ESRI Satellite World Imagery, and OpenStreetMap Topography layers.
* **Interactive Water Body Boundaries**: Polygons with false-color anomaly overlays and priority-colored status rings (Coral = Critical, Amber = Elevated, Emerald = Nominal).
* **Universal Location Search**: Search by basin name, country, or coordinates.
* **Live Synchronization HUD**: Live UTC clock, Sentinel constellation telemetry, and active notification queue.

### 3. 🔍 Module 2 — AquaDetect (AI Spectral Anomaly Detection)
* **Sentinel-2 Level-2A BOA Spectral Profile**: 12 calibrated bands (B2 Blue, B3 Green, B4 Red, B5 Red Edge, B8 NIR, B11 SWIR-1, B12 SWIR-2).
* **Physical Water Indices**:
  * **NDWI** (Normalized Difference Water Index): $\frac{\text{Green} - \text{NIR}}{\text{Green} + \text{NIR}}$
  * **MNDWI** (Modified NDWI for Shoreline Segmentation): $\frac{\text{Green} - \text{SWIR1}}{\text{Green} + \text{SWIR1}}$
  * **NDCI** (Normalized Difference Chlorophyll Index): $\frac{\text{Red Edge (B5)} - \text{Red (B4)}}{\text{Red Edge (B5)} + \text{Red (B4)}}$
* **Before/After Split Comparison Slider**: Interactive draggable slider comparing calibrated baseline water with latest bloom imagery.
* **Animated AI Pipeline**: 7-stage sequential simulation of atmospheric masking, water segmentation, spectral cosine distance, and Isolation Forest scoring.

### 4. 📈 Module 3 — AquaTrack (Pollution Evolution & Temporal Trajectory)
* **Orbital Scrubbing Timeline**: Scrubber slider with Auto-Play animation to watch plumes expand or dissipate across months.
* **Three-Stage Progression**: Visualizes Baseline Nominal $\rightarrow$ Intermediate Inflow $\rightarrow$ Peak Anomaly.
* **Recharts Dynamic Visualizations**:
  * Affected Surface Extent ($km^2$ over time)
  * Chlorophyll NDCI vs Catchment Precipitation Runoff ($mm$)
* **Trend Analytics**: Automatic determination of increasing ($+18.4\%/\text{week}$), stable, or receding conditions.

### 5. 🧠 Module 4 — AquaPredict (Environmental Risk Intelligence)
* **Composite Risk Index ($0 - 100$)**: Multi-factor environmental risk model with colored gauge (Green, Amber, Orange, Red).
* **Factor Weight Decomposition**:
  * Catchment Runoff & Precipitation ($35\%$)
  * Spectral NDCI Divergence Rate ($30\%$)
  * Water Residence Time & Heat Flux ($20\%$)
  * Historical Anomaly Recurrence ($15\%$)
* **30-Day Predictive Projection Cone**: Forecast curve with $95\%$ confidence bounds.
* **AI Reasoning Synthesis**: Natural language explanations formatted for municipal environmental authorities.

### 6. 🚨 Module 5 — AquaAlert (Field Verification Dispatch)
* **Incident Alert Queue**: Triage feed filtered by Critical, High, and Moderate priorities.
* **Field Dossier Inspector**: Spectral deviation logs, centroid GPS coordinates, and historical context.
* **Operational Protocols**: 5-step checklist (1000mL grab sampling, in-situ DO/pH spectrophotometry, microcystin ELISA test, discharge gate inspection).
* **Interactive Log**: Real-time status updating (`PENDING_VERIFICATION`, `IN_PROGRESS`, `VERIFIED_ANOMALY`, `RESOLVED`) and field note logging.

### 7. 📄 Official Investigation Dossier & PDF Export Engine
* **Vector PDF Generation**: Powered by `jspdf`, generating an official NASA/ESA-formatted dossier (`AquaSentinel-Dossier-[ID].pdf`).
* **Cryptographic Verification**: Includes SHA-like verification hash, QR code, and formal scientific uncertainty disclosure.
* **Print-Ready Layout**: Formatted for field tablets, printing, and legal custody records.

### 8. ✨ THE JUDGES' WOW MOMENT — Dedicated 7-Step Interactive Story Experience
Accessible from anywhere in the application via the glowing **"JUDGES DEMO SCENARIO"** button:
1. **Step 1 — Select Reservoir**: Choose a suspect basin (e.g. Emerald Basin Reservoir).
2. **Step 2 — Load Satellite Observations**: Ingest Sentinel-2 MSI Level-2A BOA tiles with cloud validation.
3. **Step 3 — Compare Observations**: Interactive before/after split slider revealing clean vs bloom state.
4. **Step 4 — Run AI Analysis**: 7-stage animated radiometric and Isolation Forest execution.
5. **Step 5 — Identify Anomalies**: Isolate anomaly footprint ($4.62\text{ km}^2$, $34.2\%$ of basin, $+0.52\text{ NDCI}$).
6. **Step 6 — Trigger Alert**: Animated alert issuance with celebratory confetti and field team dispatch.
7. **Step 7 — Generate Report**: Download the official PDF field investigation dossier.

---

## 🎨 Visual Design Palette

| Element | Color Name | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Background** | Deep Midnight Navy | `#06131D` | Deep space & command center depth |
| **Secondary Background** | Dark Ocean Blue | `#0A202C` | Surface cards & navigation containers |
| **Primary Accent** | Aqua Cyan | `#20D9D0` | Primary actions, water droplet, glowing HUDs |
| **Secondary Accent** | Electric Blue | `#319BFF` | Satellite orbits, radar arcs, charts |
| **Environmental Accent** | Emerald Green | `#36D69A` | Nominal baseline, verified healthy state |
| **Warning Accent** | Warm Amber | `#FFB84D` | Elevated risk, sediment runoff, turbidity |
| **Critical Alert** | Controlled Coral Red | `#FF5D65` | Severe algal blooms, chemical anomalies, alerts |
| **Primary Text** | Soft White | `#EDF8FA` | High-contrast scientific typography |
| **Muted Text** | Blue-Grey | `#91A8B5` | Telemetry labels, units, and secondary text |

---

## 📂 Project Directory Structure

```
Aqua_sentinal/
├── public/
│   └── favicon.svg                     # AquaSentinel vector logo icon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AuthModal.jsx           # Copernicus Hub sign-in modal
│   │   │   ├── Footer.jsx              # Platform credentials & scientific notice
│   │   │   ├── Header.jsx              # Glassmorphic top navigation bar
│   │   │   └── Logo.jsx                # Droplet + Orbit + Earth observation vector logo
│   │   ├── dashboard/
│   │   │   ├── modules/
│   │   │   │   ├── AquaAlertTab.jsx    # Module 5: Incident management & field dispatch
│   │   │   │   ├── AquaDetectTab.jsx   # Module 2: AI anomaly detection & split slider
│   │   │   │   ├── AquaPredictTab.jsx  # Module 4: Risk intelligence & 30-day forecast cone
│   │   │   │   ├── AquaTrackTab.jsx    # Module 3: Pollution evolution & time-series
│   │   │   │   ├── OverviewTab.jsx     # Main command center & telemetry dossier
│   │   │   │   ├── ReportsTab.jsx      # Dossier preview & PDF export engine
│   │   │   │   ├── SatelliteObservationsTab.jsx # 13-band MSI catalog
│   │   │   │   ├── SettingsTab.jsx     # Sensor thresholds & calibration
│   │   │   │   └── WaterBodiesTab.jsx  # Directory of monitored catchments
│   │   │   ├── DashboardLayout.jsx     # Shell connecting TopBar, Sidebar, and Modules
│   │   │   ├── GeospatialMap.jsx       # Leaflet interactive cartography
│   │   │   ├── Sidebar.jsx             # Left command navigation
│   │   │   └── TopBar.jsx              # Real-time UTC clock & search
│   │   ├── demo/
│   │   │   └── JudgesDemoModal.jsx     # 7-Step Interactive "Judges' WOW Moment"
│   │   └── landing/
│   │       ├── Earth3D.jsx             # Three.js 3D Earth, atmosphere & orbits
│   │       ├── LandingHero.jsx         # Hero typography & telemetry statistics
│   │       ├── MethodologySection.jsx  # 7-Step scientific pipeline & equations
│   │       ├── MissionSection.jsx      # Scientific responsibility & feature pillars
│   │       └── TechStackSection.jsx    # Planetary architecture & final CTA
│   ├── data/
│   │   └── mockData.js                 # Realistic multi-spectral telemetry & basins
│   ├── App.jsx                         # Master view router & state synchronizer
│   ├── index.css                       # Tailwind layers, glassmorphism & radar animations
│   └── main.jsx                        # React root entrypoint
├── index.html                          # Root HTML, fonts (Space Grotesk, Inter, JetBrains Mono)
├── package.json                        # Dependencies (three, leaflet, recharts, jspdf, confetti)
├── tailwind.config.js                  # Custom palette & scientific theme extensions
└── vite.config.js                      # Vite development & preview server configuration
```

---

## 🛠️ Installation & Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone or Open Workspace
```bash
cd Aqua_sentinal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

### 5. Run Production Preview
```bash
npm run preview
```
The application will be served locally at `http://localhost:3000/`.

---

## 🛰️ Monitored Global Water Basins (Included Datasets)

| Basin ID | Water Body Name | Geographic Region | Primary Anomaly Detected | Risk Score |
| :--- | :--- | :--- | :--- | :--- |
| **WB-06** | **Emerald Basin Reservoir** *(Demo Focus)* | Sector 7 Hydrological Reserve | Spectral Discoloration & Chemical Runoff | **94 (Critical)** |
| **WB-01** | **Bellandur Lake Catchment** | Bangalore Urban, India | Severe Cyanobacteria & Surfactant Froth | **92 (Critical)** |
| **WB-03** | **Lake Erie (Western Basin)** | Ohio / Michigan, USA / Canada | Toxic *Microcystis* Harmful Algal Bloom | **88 (Critical)** |
| **WB-02** | **Lake Mead (Boulder Basin)** | Nevada / Arizona, USA | High Suspended Sediment & Inflow Plume | **74 (Elevated)** |
| **WB-04** | **Salton Sea (Whitewater Inflow)** | California, USA | Hypersaline Turbidity & Diatom Resuspension | **68 (Moderate)** |
| **WB-05** | **Lake Victoria (Winam Gulf)** | Kisumu, Kenya / East Africa | *Eichhornia* (Water Hyacinth) Mat Incursion | **89 (Critical)** |

---

## 📡 Technology Stack Reference

* **Frontend Framework**: React 18 with Vite
* **3D Planetary Graphics**: Three.js WebGL with custom shaders and procedural texture mapping
* **Interactive Cartography**: Leaflet 1.9 with CartoDB Dark Matter, ESRI World Imagery, and OpenStreetMap
* **Data Visualization**: Recharts (multi-axis line graphs, area charts, forecast cones)
* **Document Engine**: jsPDF vector generation
* **Styling**: Tailwind CSS, custom glassmorphism, radar keyframes, and scientific grid patterns
* **Icons**: Lucide React high-tech iconography

---

## 🏆 Presentation Quick Guide for Hackathon Demonstrations

1. **Launch Experience**: Open `http://localhost:3000/`. The visitor lands on the cinematic 3D Earth. Drag the globe to rotate continents and inspect orbit paths.
2. **Launch Command Center**: Click **"Explore Intelligence"** or **"Launch Dashboard"** to enter the real-time operational dashboard.
3. **Trigger The WOW Moment**: Click the glowing coral **"JUDGES DEMO SCENARIO"** button in the header.
4. **Follow the 7 Steps**:
   - In Step 3, slide the split divider to visually demonstrate baseline vs bloom water.
   - In Step 4, click **"Run AquaDetect Pipeline"** to show the 7-stage scientific progress indicator.
   - In Step 6, experience the incident alert trigger with audio-visual pulse.
   - In Step 7, click **"Download Investigation Dossier"** to export an official PDF evidence report to your computer.

---

## 📜 License & Acknowledgments

* **Data Sources**: Copernicus Sentinel-2 MSI courtesy of the European Space Agency (ESA) & European Commission; USGS / NASA Landsat Program.
* Built for open science, environmental custodianship, and hackathon presentation excellence.

> *"The Earth cannot speak. Let satellite intelligence help us listen."*
