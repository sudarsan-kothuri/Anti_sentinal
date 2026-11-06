import React from 'react';
import { 
  Satellite, 
  Layers, 
  Calendar, 
  Radio, 
  Database, 
  CheckCircle2, 
  ArrowUpRight,
  ExternalLink 
} from 'lucide-react';

export default function SatelliteObservationsTab({ selectedWaterBody }) {
  const wb = selectedWaterBody;

  const sentinelBands = [
    { band: "B01", name: "Coastal Aerosol", wavelength: "443 nm", res: "60m", use: "Atmospheric correction & aerosol optical thickness" },
    { band: "B02", name: "Blue Channel", wavelength: "490 nm", res: "10m", use: "Chlorophyll absorption & clear water penetration" },
    { band: "B03", name: "Green Channel", wavelength: "560 nm", res: "10m", use: "Algal bloom reflectance & NDWI peak indicator" },
    { band: "B04", name: "Red Channel", wavelength: "665 nm", res: "10m", use: "Chlorophyll-a absorption peak & sediment scattering" },
    { band: "B05", name: "Red Edge 1", wavelength: "705 nm", res: "20m", use: "NDCI denominator & cyanobacteria phycocyanin sensing" },
    { band: "B06", name: "Red Edge 2", wavelength: "740 nm", res: "20m", use: "Vegetation & floating macrophyte biomass index" },
    { band: "B07", name: "Red Edge 3", wavelength: "783 nm", res: "20m", use: "Leaf area and organic matter canopy assessment" },
    { band: "B08", name: "Near Infrared (NIR)", wavelength: "842 nm", res: "10m", use: "Open water vs land contrast & FAI floating algae" },
    { band: "B8A", name: "Narrow NIR", wavelength: "865 nm", res: "20m", use: "Atmospheric water vapor & thin cirrus validation" },
    { band: "B09", name: "Water Vapor", wavelength: "945 nm", res: "60m", use: "Sub-pixel columnar atmospheric vapor correction" },
    { band: "B11", name: "SWIR-1", wavelength: "1610 nm", res: "20m", use: "MNDWI computation & total water absorption" },
    { band: "B12", name: "SWIR-2", wavelength: "2190 nm", res: "20m", use: "Hydrocarbon film, sludge, & urban interference removal" },
  ];

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-electric/20 text-electric border border-electric/40">
              <Satellite className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">Copernicus Sentinel-2 MSI Multi-Spectral Catalog</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-electric border border-ocean-700">
              Level-2A BOA Surface Reflectance
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Raw 13-channel radiometric instrumentation telemetry calibrated through Sen2Cor radiative transfer code.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-accent bg-navy-950 px-3 py-1.5 rounded-lg border border-ocean-800">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>COPERNICUS OPEN ACCESS HUB SYNCED</span>
        </div>
      </div>

      {/* Sensor Specs Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="text-text-dim text-[10px]">CURRENT ORBIT PASS</div>
          <div className="text-base font-bold text-white mt-1">S2B_MSIL2A_20261104</div>
          <div className="text-[10px] text-aqua">Tile: T43PGH (Relative Orbit R062)</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="text-text-dim text-[10px]">SPATIAL RESOLUTION</div>
          <div className="text-base font-bold text-white mt-1">10m / 20m / 60m</div>
          <div className="text-[10px] text-electric">Multi-Resolution Swath 290 km</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="text-text-dim text-[10px]">SOLAR ZENITH ANGLE</div>
          <div className="text-base font-bold text-white mt-1">32.48°</div>
          <div className="text-[10px] text-text-dim">Solar Azimuth: 148.12°</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="text-text-dim text-[10px]">NEXT SCHEDULED ORBIT</div>
          <div className="text-base font-bold text-emerald-accent mt-1">2026-11-09 05:22 UTC</div>
          <div className="text-[10px] text-text-dim">Revisit Interval: 5 Days</div>
        </div>
      </div>

      {/* 13 Spectral Bands Catalog Table */}
      <div className="glass-panel rounded-2xl border-ocean-700/80 bg-ocean-900/40 overflow-hidden">
        <div className="p-4 border-b border-ocean-800 flex items-center justify-between text-xs font-mono">
          <span className="text-white font-bold">12 MULTI-SPECTRAL RADIOMETER BANDS (LEVEL-2A BOA)</span>
          <span className="text-text-dim">CALIBRATED SURFACE REFLECTANCE</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-navy-950/80 text-text-dim text-[11px] border-b border-ocean-800">
              <tr>
                <th className="p-3">BAND</th>
                <th className="p-3">DESIGNATION</th>
                <th className="p-3">CENTRAL WAVELENGTH</th>
                <th className="p-3">RESOLUTION</th>
                <th className="p-3">PRIMARY SCIENTIFIC APPLICATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean-800/60">
              {sentinelBands.map((b) => (
                <tr key={b.band} className="hover:bg-ocean-800/40 transition-colors">
                  <td className="p-3 font-bold text-aqua">{b.band}</td>
                  <td className="p-3 text-white">{b.name}</td>
                  <td className="p-3 text-text-secondary">{b.wavelength}</td>
                  <td className="p-3 text-text-dim">{b.res}</td>
                  <td className="p-3 text-text-secondary font-sans text-xs">{b.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
