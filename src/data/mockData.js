// AquaSentinel - Environmental Intelligence Data Source
// Simulated & Ground-Referenced Satellite Telemetry Dataset
// NOTE: Satellite observations detect anomalous spectral signatures. Physical field sampling required for definitive chemical analysis.

export const SYSTEM_STATS = {
  monitoredBodies: 128,
  totalObservations: 2460,
  detectedAnomalies: 18,
  priorityInvestigations: 7,
  activeConstellation: "Sentinel-2A & Sentinel-2B (Copernicus)",
  lastOrbitalSync: "2026-11-06T07:15:00Z",
  spatialResolution: "10m - 20m Multispectral",
  cloudMaskingAccuracy: "96.4% (s2cloudless pipeline)"
};

export const WATER_BODIES = [
  {
    id: "WB-01",
    name: "Bellandur Lake Catchment",
    region: "Bangalore Urban, Karnataka, India",
    type: "Urban Eutrophic Wetland / Lake",
    coordinates: [12.9345, 77.6710],
    areaKm2: 3.65,
    baselineDate: "2026-08-14",
    latestDate: "2026-11-04",
    cloudCoverPercent: 2.1,
    satelliteSource: "Sentinel-2B / MSI Level-2A",
    status: "CRITICAL_ANOMALY",
    riskCategory: "High",
    riskScore: 92,
    anomalyConfidence: 94.6,
    spectralScore: 89.2,
    affectedAreaKm2: 1.84,
    anomalousPixelsPercent: 50.4,
    primaryIndicator: "Severe Cyanobacteria Bloom & Surfactant Film",
    ndci: 0.48, // Normalized Difference Chlorophyll Index
    mndwi: 0.12, // Modified NDWI
    turbidityNtuEstimate: 85,
    description: "Rapid optical reflectance divergence detected in eastern drainage sector. Extreme shift in Red Edge (B5) vs Red (B4) ratio indicates high chlorophyll-a and potential floating organic froth.",
    recommendedAction: "Dispatch emergency mobile water sampling team to East Spillway for dissolved oxygen and surfactant chemical assay.",
    // Satellite visual representations (realistic SVG/canvas renders)
    baselineImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    anomalyImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    spectralBands: {
      b2_blue: { baseline: 0.082, current: 0.051, unit: "Reflectance" },
      b3_green: { baseline: 0.115, current: 0.198, unit: "Reflectance" },
      b4_red: { baseline: 0.064, current: 0.162, unit: "Reflectance" },
      b5_redEdge: { baseline: 0.045, current: 0.285, unit: "Reflectance" },
      b8_nir: { baseline: 0.038, current: 0.210, unit: "Reflectance" },
      b11_swir1: { baseline: 0.015, current: 0.042, unit: "Reflectance" },
      b12_swir2: { baseline: 0.008, current: 0.021, unit: "Reflectance" }
    },
    historicalTrends: [
      { date: "Jul 15", ndci: 0.12, anomalyKm2: 0.2, rainfallMm: 85, risk: 32 },
      { date: "Aug 14", ndci: 0.15, anomalyKm2: 0.3, rainfallMm: 120, risk: 40 },
      { date: "Sep 08", ndci: 0.24, anomalyKm2: 0.7, rainfallMm: 60, risk: 58 },
      { date: "Oct 01", ndci: 0.35, anomalyKm2: 1.2, rainfallMm: 35, risk: 78 },
      { date: "Oct 22", ndci: 0.42, anomalyKm2: 1.6, rainfallMm: 15, risk: 86 },
      { date: "Nov 04", ndci: 0.48, anomalyKm2: 1.84, rainfallMm: 5, risk: 92 }
    ]
  },
  {
    id: "WB-02",
    name: "Lake Mead - Boulder Basin",
    region: "Nevada / Arizona, USA",
    type: "Freshwater Reservoir",
    coordinates: [36.0150, -114.7420],
    areaKm2: 640.0,
    baselineDate: "2026-09-02",
    latestDate: "2026-11-03",
    cloudCoverPercent: 0.8,
    satelliteSource: "Sentinel-2A / MSI Level-2A",
    status: "ELEVATED_RISK",
    riskCategory: "Elevated",
    riskScore: 74,
    anomalyConfidence: 88.2,
    spectralScore: 71.5,
    affectedAreaKm2: 14.2,
    anomalousPixelsPercent: 2.2,
    primaryIndicator: "High Suspended Sediment & Inflow Plume",
    ndci: 0.18,
    mndwi: 0.65,
    turbidityNtuEstimate: 42,
    description: "Sediment plume originating from Colorado River inlet following flash runoff event. Distinct Red/NIR backscattering anomaly detected.",
    recommendedAction: "Cross-reference intake telemetry at Las Vegas Valley Water District and monitor settling basin turbidity.",
    baselineImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    anomalyImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    spectralBands: {
      b2_blue: { baseline: 0.120, current: 0.095, unit: "Reflectance" },
      b3_green: { baseline: 0.105, current: 0.142, unit: "Reflectance" },
      b4_red: { baseline: 0.048, current: 0.125, unit: "Reflectance" },
      b5_redEdge: { baseline: 0.035, current: 0.088, unit: "Reflectance" },
      b8_nir: { baseline: 0.022, current: 0.065, unit: "Reflectance" },
      b11_swir1: { baseline: 0.010, current: 0.018, unit: "Reflectance" },
      b12_swir2: { baseline: 0.005, current: 0.009, unit: "Reflectance" }
    },
    historicalTrends: [
      { date: "Jul 15", ndci: 0.08, anomalyKm2: 3.1, rainfallMm: 5, risk: 25 },
      { date: "Aug 14", ndci: 0.09, anomalyKm2: 4.0, rainfallMm: 8, risk: 28 },
      { date: "Sep 02", ndci: 0.11, anomalyKm2: 4.8, rainfallMm: 12, risk: 36 },
      { date: "Oct 05", ndci: 0.14, anomalyKm2: 8.5, rainfallMm: 45, risk: 62 },
      { date: "Oct 20", ndci: 0.17, anomalyKm2: 12.1, rainfallMm: 30, risk: 70 },
      { date: "Nov 03", ndci: 0.18, anomalyKm2: 14.2, rainfallMm: 2, risk: 74 }
    ]
  },
  {
    id: "WB-03",
    name: "Lake Erie - Western Basin",
    region: "Ohio / Michigan / Ontario, Laurentian Great Lakes",
    type: "Shallow Freshwater Lacustrine Basin",
    coordinates: [41.7500, -82.9500],
    areaKm2: 25667.0,
    baselineDate: "2026-07-28",
    latestDate: "2026-10-29",
    cloudCoverPercent: 4.2,
    satelliteSource: "Sentinel-2B / MSI Level-2A",
    status: "CRITICAL_ANOMALY",
    riskCategory: "High",
    riskScore: 88,
    anomalyConfidence: 96.1,
    spectralScore: 84.7,
    affectedAreaKm2: 248.5,
    anomalousPixelsPercent: 18.5,
    primaryIndicator: "Microcystis Toxic Algal Bloom Footprint",
    ndci: 0.54,
    mndwi: 0.38,
    turbidityNtuEstimate: 68,
    description: "Intense surface scum forming across Maumee Bay extending eastward toward Pelee Island. Peak reflectance at 705nm characteristic of cyanobacterial scum.",
    recommendedAction: "Issue provisional microcystin warning for Toledo and Monroe municipal water authorities. Prioritize vessel transect sampling.",
    baselineImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    anomalyImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    spectralBands: {
      b2_blue: { baseline: 0.090, current: 0.048, unit: "Reflectance" },
      b3_green: { baseline: 0.130, current: 0.220, unit: "Reflectance" },
      b4_red: { baseline: 0.070, current: 0.145, unit: "Reflectance" },
      b5_redEdge: { baseline: 0.050, current: 0.310, unit: "Reflectance" },
      b8_nir: { baseline: 0.030, current: 0.240, unit: "Reflectance" },
      b11_swir1: { baseline: 0.012, current: 0.035, unit: "Reflectance" },
      b12_swir2: { baseline: 0.006, current: 0.018, unit: "Reflectance" }
    },
    historicalTrends: [
      { date: "Jul 28", ndci: 0.18, anomalyKm2: 45.0, rainfallMm: 72, risk: 45 },
      { date: "Aug 18", ndci: 0.28, anomalyKm2: 95.0, rainfallMm: 50, risk: 62 },
      { date: "Sep 09", ndci: 0.42, anomalyKm2: 180.0, rainfallMm: 22, risk: 78 },
      { date: "Sep 28", ndci: 0.49, anomalyKm2: 220.0, rainfallMm: 15, risk: 84 },
      { date: "Oct 15", ndci: 0.52, anomalyKm2: 240.0, rainfallMm: 30, risk: 87 },
      { date: "Oct 29", ndci: 0.54, anomalyKm2: 248.5, rainfallMm: 8, risk: 88 }
    ]
  },
  {
    id: "WB-04",
    name: "Salton Sea - Whitewater Inflow",
    region: "Imperial / Riverside County, California, USA",
    type: "Endorheic Hypersaline Rift Lake",
    coordinates: [33.4000, -115.9000],
    areaKm2: 890.0,
    baselineDate: "2026-08-10",
    latestDate: "2026-11-01",
    cloudCoverPercent: 1.1,
    satelliteSource: "Sentinel-2A / MSI Level-2A",
    status: "MODERATE_ANOMALY",
    riskCategory: "Moderate",
    riskScore: 68,
    anomalyConfidence: 82.4,
    spectralScore: 64.0,
    affectedAreaKm2: 28.0,
    anomalousPixelsPercent: 7.4,
    primaryIndicator: "Organic Sulfide & Diatom Resuspension",
    ndci: 0.22,
    mndwi: 0.44,
    turbidityNtuEstimate: 55,
    description: "Spectral brightness variation in south-western shoreline indicative of gypsum precipitate and diatom bloom resurgence under high wind shear.",
    recommendedAction: "Coordinate with California Department of Fish and Wildlife for avian botulism and aerosolized dust monitoring.",
    baselineImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    anomalyImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    spectralBands: {
      b2_blue: { baseline: 0.110, current: 0.088, unit: "Reflectance" },
      b3_green: { baseline: 0.125, current: 0.155, unit: "Reflectance" },
      b4_red: { baseline: 0.085, current: 0.130, unit: "Reflectance" },
      b5_redEdge: { baseline: 0.060, current: 0.115, unit: "Reflectance" },
      b8_nir: { baseline: 0.040, current: 0.080, unit: "Reflectance" },
      b11_swir1: { baseline: 0.020, current: 0.038, unit: "Reflectance" },
      b12_swir2: { baseline: 0.012, current: 0.022, unit: "Reflectance" }
    },
    historicalTrends: [
      { date: "Aug 10", ndci: 0.14, anomalyKm2: 12.0, rainfallMm: 2, risk: 42 },
      { date: "Aug 30", ndci: 0.16, anomalyKm2: 15.0, rainfallMm: 0, risk: 48 },
      { date: "Sep 20", ndci: 0.18, anomalyKm2: 18.5, rainfallMm: 4, risk: 54 },
      { date: "Oct 10", ndci: 0.20, anomalyKm2: 22.0, rainfallMm: 1, risk: 60 },
      { date: "Nov 01", ndci: 0.22, anomalyKm2: 28.0, rainfallMm: 0, risk: 68 }
    ]
  },
  {
    id: "WB-05",
    name: "Lake Victoria - Winam Gulf",
    region: "Kisumu, Kenya / East Africa",
    type: "Tropical Freshwater Lake",
    coordinates: [-0.1000, 34.7500],
    areaKm2: 68800.0,
    baselineDate: "2026-07-12",
    latestDate: "2026-10-25",
    cloudCoverPercent: 5.6,
    satelliteSource: "Sentinel-2B / MSI Level-2A",
    status: "CRITICAL_ANOMALY",
    riskCategory: "High",
    riskScore: 89,
    anomalyConfidence: 91.8,
    spectralScore: 86.4,
    affectedAreaKm2: 78.4,
    anomalousPixelsPercent: 12.8,
    primaryIndicator: "Eichhornia (Water Hyacinth) Dense Mat Expansion",
    ndci: 0.61,
    mndwi: 0.18,
    turbidityNtuEstimate: 72,
    description: "High NIR (B8) reflectance across sheltered bay inlets, signaling dense emergent macrophyte canopy choke points impeding regional port access and fish nurseries.",
    recommendedAction: "Notify Lake Victoria Basin Commission for mechanical harvester deployment coordinates.",
    baselineImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    anomalyImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    spectralBands: {
      b2_blue: { baseline: 0.075, current: 0.040, unit: "Reflectance" },
      b3_green: { baseline: 0.110, current: 0.185, unit: "Reflectance" },
      b4_red: { baseline: 0.060, current: 0.130, unit: "Reflectance" },
      b5_redEdge: { baseline: 0.042, current: 0.320, unit: "Reflectance" },
      b8_nir: { baseline: 0.035, current: 0.340, unit: "Reflectance" },
      b11_swir1: { baseline: 0.014, current: 0.055, unit: "Reflectance" },
      b12_swir2: { baseline: 0.007, current: 0.024, unit: "Reflectance" }
    },
    historicalTrends: [
      { date: "Jul 12", ndci: 0.20, anomalyKm2: 18.0, rainfallMm: 95, risk: 50 },
      { date: "Aug 05", ndci: 0.31, anomalyKm2: 32.0, rainfallMm: 80, risk: 65 },
      { date: "Sep 01", ndci: 0.44, anomalyKm2: 54.0, rainfallMm: 110, risk: 78 },
      { date: "Oct 02", ndci: 0.55, anomalyKm2: 68.0, rainfallMm: 65, risk: 84 },
      { date: "Oct 25", ndci: 0.61, anomalyKm2: 78.4, rainfallMm: 45, risk: 89 }
    ]
  },
  {
    id: "WB-06",
    name: "Emerald Basin Reservoir (Demo Focus)",
    region: "Sector 7 Hydrological Reserve",
    type: "Critical Municipal Water Reservoir",
    coordinates: [37.7749, -122.4194],
    areaKm2: 18.4,
    baselineDate: "2026-09-15",
    latestDate: "2026-11-05",
    cloudCoverPercent: 1.4,
    satelliteSource: "Sentinel-2A / MSI Level-2A",
    status: "CRITICAL_ANOMALY",
    riskCategory: "High",
    riskScore: 94,
    anomalyConfidence: 95.8,
    spectralScore: 91.2,
    affectedAreaKm2: 4.62,
    anomalousPixelsPercent: 34.2,
    primaryIndicator: "Unusual Spectral Dispersion / Organic & Industrial Discharge Anomaly",
    ndci: 0.52,
    mndwi: 0.22,
    turbidityNtuEstimate: 92,
    description: "Sharp localized drop in Blue/Green reflectance ratio with anomalous absorption at 665nm and elevated 705nm backscatter. High spatial gradient adjacent to industrial runoff canal.",
    recommendedAction: "Immediate priority dispatch for field verification, in-situ spectrophotometry, and water intake diversion protocol.",
    baselineImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    anomalyImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    spectralBands: {
      b2_blue: { baseline: 0.088, current: 0.042, unit: "Reflectance" },
      b3_green: { baseline: 0.122, current: 0.215, unit: "Reflectance" },
      b4_red: { baseline: 0.060, current: 0.178, unit: "Reflectance" },
      b5_redEdge: { baseline: 0.040, current: 0.312, unit: "Reflectance" },
      b8_nir: { baseline: 0.028, current: 0.225, unit: "Reflectance" },
      b11_swir1: { baseline: 0.012, current: 0.048, unit: "Reflectance" },
      b12_swir2: { baseline: 0.006, current: 0.024, unit: "Reflectance" }
    },
    historicalTrends: [
      { date: "Aug 01", ndci: 0.11, anomalyKm2: 0.4, rainfallMm: 20, risk: 22 },
      { date: "Aug 25", ndci: 0.14, anomalyKm2: 0.6, rainfallMm: 15, risk: 28 },
      { date: "Sep 15", ndci: 0.18, anomalyKm2: 0.9, rainfallMm: 35, risk: 42 },
      { date: "Oct 05", ndci: 0.29, anomalyKm2: 1.8, rainfallMm: 60, risk: 65 },
      { date: "Oct 24", ndci: 0.41, anomalyKm2: 3.2, rainfallMm: 45, risk: 81 },
      { date: "Nov 05", ndci: 0.52, anomalyKm2: 4.62, rainfallMm: 10, risk: 94 }
    ]
  }
];

export const INCIDENT_ALERTS = [
  {
    id: "ALT-2026-8812",
    waterBodyId: "WB-06",
    waterBodyName: "Emerald Basin Reservoir",
    location: "Sector 7 Hydrological Reserve (37.7749° N, 122.4194° W)",
    timestamp: "2026-11-05T09:42:15Z",
    priority: "CRITICAL",
    category: "Spectral Discoloration & Chemical Runoff Anomaly",
    affectedAreaKm2: 4.62,
    confidencePercent: 95.8,
    status: "PENDING_VERIFICATION",
    assignedOfficer: "Dr. Elena Rostova (Field Investigation Team Alpha)",
    evidenceSummary: "Rapid MNDWI decline accompanied by 142% surge in Red Edge band reflectance across Eastern intake channel. Deviation surpasses 3.5 sigma against 90-day baseline.",
    recommendedSteps: [
      "Collect grab samples at Grid Ref E-44 (Latitude 37.775, Longitude -122.420)",
      "Test for dissolved oxygen (DO), heavy metals, total organic carbon (TOC)",
      "Inspect industrial drainage tributary #3 for unpermitted discharge",
      "Deploy localized boom barrier if oil/surfactant sheen is confirmed"
    ],
    notes: [
      { author: "Automated Sentinel S2A Ingest", date: "2026-11-05 09:43", text: "Anomaly flag triggered with Isolation Forest score 0.912." },
      { author: "Command Dispatch", date: "2026-11-05 10:15", text: "Investigation task auto-assigned to Team Alpha." }
    ]
  },
  {
    id: "ALT-2026-8809",
    waterBodyId: "WB-01",
    waterBodyName: "Bellandur Lake Catchment",
    location: "Bangalore Urban (12.9345° N, 77.6710° E)",
    timestamp: "2026-11-04T14:18:00Z",
    priority: "CRITICAL",
    category: "Severe Cyanobacteria Bloom & Surfactant Froth",
    affectedAreaKm2: 1.84,
    confidencePercent: 94.6,
    status: "IN_PROGRESS",
    assignedOfficer: "Prof. Arvind Rao (Regional Wetland Taskforce)",
    evidenceSummary: "NDCI jumped from 0.24 to 0.48 in 30 days. Extreme cyanobacterial chlorophyll concentration concentrated at downstream weir.",
    recommendedSteps: [
      "Operate aeration fountain cascade",
      "Conduct in-situ microcystin enzyme-linked immunosorbent assay (ELISA)",
      "Activate spray mitigation on foaming crests"
    ],
    notes: [
      { author: "Prof. Rao", date: "2026-11-05 08:30", text: "Team dispatched with handheld fluorometers. Water samples collected at 3 stations." }
    ]
  },
  {
    id: "ALT-2026-8798",
    waterBodyId: "WB-03",
    waterBodyName: "Lake Erie - Western Basin",
    location: "Maumee Bay (41.7500° N, 82.9500° W)",
    timestamp: "2026-10-29T11:05:40Z",
    priority: "HIGH",
    category: "Harmful Algal Bloom (HAB) Expansion",
    affectedAreaKm2: 248.5,
    confidencePercent: 96.1,
    status: "VERIFIED_ANOMALY",
    assignedOfficer: "Capt. Mark Harrison (NOAA Great Lakes Field Unit)",
    evidenceSummary: "Satellite spectral signature matches Microcystis aeruginosa bloom with FAI (Floating Algae Index) > 0.08 over 248 square kilometers.",
    recommendedSteps: [
      "Notify water treatment plants for activated carbon treatment ramp-up",
      "Maintain recreational water advisory for Maumee Bay state parks"
    ],
    notes: [
      { author: "Capt. Harrison", date: "2026-10-31 16:20", text: "Field spectrometry confirms heavy microcystis density. Toxicity reports forwarded to state health agency." }
    ]
  },
  {
    id: "ALT-2026-8785",
    waterBodyId: "WB-02",
    waterBodyName: "Lake Mead - Boulder Basin",
    location: "Nevada / Arizona (36.0150° N, 114.7420° W)",
    timestamp: "2026-11-03T16:50:12Z",
    priority: "MODERATE",
    category: "Suspended Sediment Plume",
    affectedAreaKm2: 14.2,
    confidencePercent: 88.2,
    status: "MONITORING",
    assignedOfficer: "Sarah Jenkins (USGS Water Science Center)",
    evidenceSummary: "Elevated backscatter in B4 and B8 bands due to post-storm sediment transport down the Colorado River canyon.",
    recommendedSteps: [
      "Track sediment settling rate on next Sentinel-2B pass (scheduled Nov 8)",
      "Inspect intake turbidity sensors"
    ],
    notes: [
      { author: "Sarah Jenkins", date: "2026-11-04 11:00", text: "Physical turbidity reads 44 NTU. Consistent with non-toxic silt deposit." }
    ]
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Sentinel-2 Level-2A Multi-Spectral Ingestion",
    description: "Automated ingestion of Bottom-Of-Atmosphere (BOA) surface reflectance calibrated via Sen2Cor, capturing 12 optical and infrared spectral bands at 10m to 20m spatial resolution every 5 days.",
    tag: "Remote Sensing Core"
  },
  {
    step: "02",
    title: "Atmospheric & S2cloudless Cloud Masking",
    description: "Gradient boosted machine learning masking filters out cirrus, cloud shadows, and haze to eliminate false positive water anomalies.",
    tag: "Data Quality Assurance"
  },
  {
    step: "03",
    title: "Dynamic Water Segmentation (MNDWI)",
    description: "Modified Normalized Difference Water Index (Green - SWIR1)/(Green + SWIR1) isolates open water bodies while suppressing built-up urban noise and terrain shadows.",
    tag: "Geospatial Boundary"
  },
  {
    step: "04",
    title: "Multi-Index Spectral Profiling",
    description: "Simultaneous computation of NDWI (moisture), NDCI (chlorophyll-a/algae), FAI (floating vegetation), and SPM (suspended particulate matter) spectral curves.",
    tag: "Bio-Physical Indicators"
  },
  {
    step: "05",
    title: "Isolation Forest Anomaly Scoring",
    description: "Unsupervised machine learning model trains on rolling 90-day baseline reflectance vectors to detect multivariate statistical outliers across spectral bands.",
    tag: "Unsupervised AI"
  },
  {
    step: "06",
    title: "Temporal Evolution & Trajectory Tracking",
    description: "Kalman filtering and spatial clustering track anomaly centroid migration, rate of expansion, and persistence over consecutive orbital passes.",
    tag: "Temporal Analytics"
  },
  {
    step: "07",
    title: "Prioritized Field Investigation Dispatch",
    description: "Synthesizes satellite indicators, catchment rainfall data, and uncertainty metrics into an actionable dossier for physical testing teams.",
    tag: "Ground Truth Action"
  }
];

export const TECH_STACK = [
  { name: "Sentinel-2 MSI", category: "Spaceborne Sensor", badge: "Copernicus ESA", desc: "13 spectral bands, 10m spatial resolution, 5-day revisit cycle." },
  { name: "Google Earth Engine", category: "Geospatial Compute", badge: "Cloud Platform", desc: "Petabyte-scale satellite catalog processing & raster pipelines." },
  { name: "Python / FastAPI", category: "Backend Architecture", badge: "High Performance", desc: "Asynchronous microservices orchestrating GIS analysis and model inference." },
  { name: "PyTorch & Scikit-Learn", category: "Machine Learning", badge: "AI Core", desc: "Isolation Forest, spatial clustering, and temporal anomaly estimators." },
  { name: "Rasterio & GeoPandas", category: "GIS Vector & Raster", badge: "Geospatial", desc: "High-precision coordinate transformation, polygon extraction, and raster clipping." },
  { name: "PostgreSQL & PostGIS", category: "Spatial Database", badge: "Database", desc: "Spatial indexing, bounding box queries, and temporal telemetry store." },
  { name: "Leaflet & WebGL", category: "Interactive Cartography", badge: "Geospatial UI", desc: "Multi-layered dynamic tile visualization and polygon rendering." },
  { name: "React & Tailwind CSS", category: "Frontend Engine", badge: "Modern UI/UX", desc: "Cinematic, responsive command center interface with glassmorphic aesthetics." }
];
