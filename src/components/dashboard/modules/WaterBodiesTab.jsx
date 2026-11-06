import React, { useState } from 'react';
import { 
  Waves, 
  MapPin, 
  Calendar, 
  Search, 
  Filter, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export default function WaterBodiesTab({ 
  waterBodies, 
  selectedWaterBody, 
  onSelectWaterBody,
  onNavigateTab 
}) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = waterBodies.filter(wb => {
    const matchesSearch = wb.name.toLowerCase().includes(search.toLowerCase()) ||
                          wb.region.toLowerCase().includes(search.toLowerCase());
    if (filterType === 'CRITICAL') return matchesSearch && wb.status === 'CRITICAL_ANOMALY';
    if (filterType === 'MODERATE') return matchesSearch && (wb.status === 'ELEVATED_RISK' || wb.status === 'MODERATE_ANOMALY');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-aqua/20 text-aqua border border-aqua/40">
              <Waves className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">Monitored Water Bodies Directory</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-aqua border border-ocean-700">
              {waterBodies.length} Active Basins
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Global catalog of reservoirs, freshwater lakes, and estuarine catchments tracked via Sentinel-2 MSI satellite orbits.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-text-dim absolute left-3 top-2.5 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search basin name or region..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg bg-navy-950 border border-ocean-700 text-xs text-white placeholder:text-text-dim focus:outline-none focus:border-aqua font-mono"
            />
          </div>

          <div className="flex items-center gap-1 font-mono text-xs">
            {['ALL', 'CRITICAL', 'MODERATE'].map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === t 
                    ? 'bg-aqua/20 text-aqua border border-aqua/40 font-bold' 
                    : 'bg-navy-950 text-text-secondary border border-ocean-800 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Water Bodies Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(wb => {
          const isSelected = selectedWaterBody.id === wb.id;
          return (
            <div
              key={wb.id}
              className={`glass-panel p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected 
                  ? 'border-aqua bg-ocean-800/80 shadow-glow-aqua/20' 
                  : 'border-ocean-700/80 bg-ocean-900/40 hover:border-ocean-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950 text-text-dim border border-ocean-800">
                    {wb.id}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    wb.status === 'CRITICAL_ANOMALY' 
                      ? 'bg-coral-alert/20 text-coral-alert border border-coral-alert/40' 
                      : 'bg-amber-warning/20 text-amber-warning border border-amber-warning/40'
                  }`}>
                    Risk {wb.riskScore} • {wb.riskCategory}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-1">
                  {wb.name}
                </h3>
                <div className="text-xs text-text-dim font-mono flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-aqua" />
                  <span>{wb.region}</span>
                </div>

                <div className="p-3 rounded-lg bg-navy-950/80 border border-ocean-800 space-y-1.5 font-mono text-xs mb-4">
                  <div className="flex justify-between text-text-dim">
                    <span>PRIMARY ANOMALY:</span>
                    <span className="text-coral-alert font-semibold truncate max-w-[150px]">
                      {wb.primaryIndicator.split('&')[0]}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-dim">
                    <span>AFFECTED EXTENT:</span>
                    <span className="text-white">{wb.affectedAreaKm2} km² ({wb.anomalousPixelsPercent}%)</span>
                  </div>
                  <div className="flex justify-between text-text-dim">
                    <span>LATEST PASS:</span>
                    <span className="text-aqua">{wb.latestDate}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-ocean-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    onSelectWaterBody(wb);
                    onNavigateTab('overview');
                  }}
                  className="text-xs font-mono text-aqua hover:underline flex items-center gap-1"
                >
                  <span>Focus On Map</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => {
                    onSelectWaterBody(wb);
                    onNavigateTab('detect');
                  }}
                  className="px-3 py-1.5 rounded bg-ocean-800 hover:bg-ocean-700 text-xs font-mono text-white border border-ocean-600 transition-colors"
                >
                  Analyze Anomaly
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
