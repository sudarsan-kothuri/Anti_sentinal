import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  Maximize2, 
  RotateCcw, 
  MapPin, 
  AlertCircle,
  Crosshair,
  Satellite,
  Compass
} from 'lucide-react';

export default function GeospatialMap({ 
  waterBodies, 
  selectedWaterBody, 
  onSelectWaterBody 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const anomaliesLayerRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [activeTileLayer, setActiveTileLayer] = useState('dark'); // 'dark' | 'satellite' | 'street'
  const [showAnomalies, setShowAnomalies] = useState(true);
  const [showPrioritiesOnly, setShowPrioritiesOnly] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Default center on Emerald Basin or global view
    const initialCenter = selectedWaterBody ? selectedWaterBody.coordinates : [30.0, -40.0];
    const initialZoom = selectedWaterBody ? 7 : 3;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      attributionControl: false
    });

    // CartoDB Dark Matter (High-Tech Command Center Look)
    const darkTiles = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 19, subdomains: 'abcd' }
    );

    darkTiles.addTo(map);
    tileLayerRef.current = darkTiles;

    // Feature Layer Groups
    markersLayerRef.current = L.layerGroup().addTo(map);
    anomaliesLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Base Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let newTileLayer;
    if (activeTileLayer === 'satellite') {
      newTileLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      );
    } else if (activeTileLayer === 'street') {
      newTileLayer = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19 }
      );
    } else {
      newTileLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, subdomains: 'abcd' }
      );
    }

    newTileLayer.addTo(map);
    tileLayerRef.current = newTileLayer;
  }, [activeTileLayer]);

  // Update Markers & Anomaly Polygons
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !markersLayerRef.current || !anomaliesLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    anomaliesLayerRef.current.clearLayers();

    waterBodies.forEach((wb) => {
      if (showPrioritiesOnly && wb.riskScore < 75) return;

      const isSelected = selectedWaterBody && selectedWaterBody.id === wb.id;

      // Color based on risk/status
      let markerColor = '#36D69A'; // emerald
      if (wb.status === 'CRITICAL_ANOMALY') markerColor = '#FF5D65'; // coral
      else if (wb.status === 'ELEVATED_RISK' || wb.status === 'MODERATE_ANOMALY') markerColor = '#FFB84D'; // amber

      // Custom pulsing HTML Marker
      const customIcon = L.divIcon({
        className: 'custom-geo-marker',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="absolute w-8 h-8 rounded-full ${isSelected ? 'animate-ping' : ''}" style="background-color: ${markerColor}; opacity: 0.35;"></div>
            <div class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-lg" style="background-color: ${markerColor}">
              <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-navy-950/90 text-white font-mono text-[10px] px-1.5 py-0.5 rounded border border-ocean-700 whitespace-nowrap opacity-90 group-hover:opacity-100">
              ${wb.name.split(' - ')[0]}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(wb.coordinates, { icon: customIcon });

      // Popup Content
      const popupHtml = `
        <div style="font-family: inherit; font-size: 12px; color: #EDF8FA; min-width: 220px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-weight: 700; color: #20D9D0; font-size: 13px;">${wb.name}</span>
            <span style="background: ${markerColor}22; color: ${markerColor}; border: 1px solid ${markerColor}66; border-radius: 4px; padding: 2px 6px; font-size: 10px; font-family: monospace;">
              Risk ${wb.riskScore}
            </span>
          </div>
          <div style="color: #91A8B5; font-size: 11px; margin-bottom: 8px;">${wb.region}</div>
          <div style="background: #06131D; padding: 6px; border-radius: 6px; border: 1px solid #11354D; font-family: monospace; font-size: 11px;">
            <div>ANOMALY: <span style="color: ${markerColor}">${wb.primaryIndicator.split('&')[0]}</span></div>
            <div>AFFECTED AREA: <span style="color: #FFF">${wb.affectedAreaKm2} km²</span> (${wb.anomalousPixelsPercent}%)</div>
            <div>LATEST PASS: <span style="color: #20D9D0">${wb.latestDate}</span></div>
          </div>
          <div style="margin-top: 8px; text-align: right;">
            <span style="color: #319BFF; font-size: 10px; font-weight: 600; cursor: pointer;">CLICK MARKER TO INSPECT</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        onSelectWaterBody(wb);
      });

      markersLayerRef.current.addLayer(marker);

      // Anomaly Footprint Zone Circle / Polygon Overlay
      if (showAnomalies && wb.status !== 'HEALTHY') {
        const radiusMeters = Math.min(Math.sqrt(wb.affectedAreaKm2) * 1200, 15000);
        const anomalyCircle = L.circle(wb.coordinates, {
          radius: radiusMeters,
          color: markerColor,
          weight: 1.5,
          dashArray: '4 4',
          fillColor: markerColor,
          fillOpacity: 0.18
        });

        anomaliesLayerRef.current.addLayer(anomalyCircle);
      }
    });
  }, [waterBodies, selectedWaterBody, showAnomalies, showPrioritiesOnly]);

  // Fly to selected water body when changed
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedWaterBody) return;

    map.flyTo(selectedWaterBody.coordinates, 10, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [selectedWaterBody]);

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([30.0, -40.0], 3, { duration: 1.2 });
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-xl overflow-hidden border border-ocean-700/80 shadow-glass-panel">
      
      {/* Map DOM target */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Map Controls HUD - Top Left */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        
        {/* Layer Mode Switcher */}
        <div className="glass-panel p-1.5 rounded-lg border-ocean-700/80 flex items-center gap-1 shadow-md">
          <button
            onClick={() => setActiveTileLayer('dark')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
              activeTileLayer === 'dark' 
                ? 'bg-aqua/20 text-aqua border border-aqua/40 font-semibold' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Dark GIS
          </button>
          <button
            onClick={() => setActiveTileLayer('satellite')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
              activeTileLayer === 'satellite' 
                ? 'bg-aqua/20 text-aqua border border-aqua/40 font-semibold' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            ESRI Satellite
          </button>
          <button
            onClick={() => setActiveTileLayer('street')}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
              activeTileLayer === 'street' 
                ? 'bg-aqua/20 text-aqua border border-aqua/40 font-semibold' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Terrain/OSM
          </button>
        </div>

        {/* Feature Toggles */}
        <div className="glass-panel p-2 rounded-lg border-ocean-700/80 flex flex-col gap-1.5 text-xs font-mono">
          <button
            onClick={() => setShowAnomalies(!showAnomalies)}
            className="flex items-center justify-between gap-3 text-text-secondary hover:text-white"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-coral-alert" />
              Anomaly Footprints
            </span>
            {showAnomalies ? <Eye className="w-3.5 h-3.5 text-aqua" /> : <EyeOff className="w-3.5 h-3.5 text-text-dim" />}
          </button>

          <button
            onClick={() => setShowPrioritiesOnly(!showPrioritiesOnly)}
            className="flex items-center justify-between gap-3 text-text-secondary hover:text-white pt-1 border-t border-ocean-700/50"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-warning" />
              Priority Only (Risk &gt; 75)
            </span>
            <span className={`text-[10px] px-1 rounded ${showPrioritiesOnly ? 'bg-amber-warning/20 text-amber-warning' : 'text-text-dim'}`}>
              {showPrioritiesOnly ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

      </div>

      {/* Floating Map Zoom / Recenter HUD - Top Right */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-text-secondary hover:text-aqua hover:border-aqua/50 transition-colors"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-text-secondary hover:text-aqua hover:border-aqua/50 transition-colors"
        >
          -
        </button>
        <button
          onClick={handleResetView}
          title="Global View"
          className="w-8 h-8 rounded-lg glass-panel flex items-center justify-center text-text-secondary hover:text-aqua hover:border-aqua/50 transition-colors mt-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 glass-panel px-3 py-2 rounded-lg border-ocean-700/80 flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-coral-alert animate-ping" />
          <span className="text-white">Critical Anomaly (&gt;80)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-warning" />
          <span className="text-white">Elevated Risk (60-80)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent" />
          <span className="text-white">Baseline (&lt;60)</span>
        </div>
      </div>

      {/* Selected Water Body Quick Bar on Bottom Right */}
      {selectedWaterBody && (
        <div className="absolute bottom-4 right-4 z-10 glass-panel px-4 py-2 rounded-lg border-aqua/40 max-w-sm hidden sm:block">
          <div className="text-[10px] font-mono text-aqua uppercase">ACTIVE WATER BODY FOCUS</div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span>{selectedWaterBody.name}</span>
            <span className="text-[11px] font-mono text-text-dim">[{selectedWaterBody.id}]</span>
          </div>
        </div>
      )}

    </div>
  );
}
