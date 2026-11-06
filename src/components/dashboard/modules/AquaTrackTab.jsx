import React, { useState } from 'react';
import { 
  Activity, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  Clock, 
  Compass, 
  Layers, 
  Play, 
  Pause,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';

export default function AquaTrackTab({ 
  waterBodies, 
  selectedWaterBody, 
  onSelectWaterBody 
}) {
  const wb = selectedWaterBody;
  const historyData = wb.historicalTrends || [];

  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(historyData.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play timeline animation
  React.useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setSelectedTimelineIndex(prev => (prev + 1) % historyData.length);
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, historyData.length]);

  const activePoint = historyData[selectedTimelineIndex] || historyData[0] || {};

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-electric/20 text-electric border border-electric/40">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">AquaTrack: Pollution Evolution & Trajectory</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-electric border border-ocean-700">
              Multi-Temporal Orbital Scrubbing
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Track spatial expansion, directional dispersion corridors, and temporal anomaly persistence across consecutive Sentinel-2 orbits.
          </p>
        </div>

        {/* Current Trend Status Badge */}
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-xl bg-navy-950 border border-coral-alert/40 text-xs font-mono flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-coral-alert animate-bounce" />
            <div>
              <div className="text-coral-alert font-bold uppercase tracking-wider">INCREASING ANOMALY</div>
              <div className="text-text-dim text-[10px]">+18.4% expansion rate / 14 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Water Body Selector */}
      <div className="glass-panel p-3 rounded-xl border-ocean-700/80 bg-ocean-900/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-text-dim uppercase">Active Water Body:</span>
          <select 
            value={wb.id} 
            onChange={(e) => {
              const found = waterBodies.find(w => w.id === e.target.value);
              if (found) {
                onSelectWaterBody(found);
                setSelectedTimelineIndex(0);
              }
            }}
            className="bg-navy-950 border border-ocean-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-aqua font-mono"
          >
            {waterBodies.map(w => (
              <option key={w.id} value={w.id}>{w.name} ({w.id})</option>
            ))}
          </select>
        </div>

        <div className="text-xs font-mono text-text-dim hidden sm:block">
          Baseline: <span className="text-aqua">{wb.baselineDate}</span> → Latest: <span className="text-coral-alert">{wb.latestDate}</span>
        </div>
      </div>

      {/* 3-State Condition Comparison Cards: Baseline vs Intermediate vs Peak */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-white font-semibold flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-aqua" />
            <span>THREE-STAGE EVOLUTION COMPARISON</span>
          </span>
          <span className="text-text-dim">SENTINEL-2 TIME-SERIES VISUALIZATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Stage 1: Baseline */}
          <div className="glass-panel rounded-xl overflow-hidden border-ocean-700/80 bg-ocean-900/40">
            <div className="relative h-44 bg-navy-950">
              <img 
                src={wb.baselineImage} 
                alt="Baseline" 
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute top-3 left-3 bg-navy-950/90 text-aqua font-mono text-[10px] px-2 py-0.5 rounded border border-aqua/40">
                STAGE 1: BASELINE NOMINAL
              </div>
              <div className="absolute bottom-2 right-2 bg-navy-950/80 text-text-dim font-mono text-[10px] px-1.5 py-0.5 rounded">
                {historyData[0]?.date || "Jul 15"}
              </div>
            </div>
            <div className="p-3 font-mono text-xs space-y-1">
              <div className="text-white font-bold">Unperturbed Clean State</div>
              <div className="text-[11px] text-text-dim">NDCI: +{historyData[0]?.ndci || 0.12} • Anomaly Area: {historyData[0]?.anomalyKm2 || 0.2} km²</div>
              <div className="text-[10px] text-emerald-accent">Normal baseline reflectance</div>
            </div>
          </div>

          {/* Stage 2: Intermediate Dispersion */}
          <div className="glass-panel rounded-xl overflow-hidden border-amber-warning/40 bg-ocean-900/40">
            <div className="relative h-44 bg-navy-950">
              <img 
                src={wb.baselineImage} 
                alt="Intermediate" 
                className="w-full h-full object-cover filter contrast-125 saturate-125 hue-rotate-15"
              />
              {/* Moderate tint */}
              <div className="absolute inset-0 bg-amber-warning/20 mix-blend-color-burn" />
              <div className="absolute top-3 left-3 bg-navy-950/90 text-amber-warning font-mono text-[10px] px-2 py-0.5 rounded border border-amber-warning/40">
                STAGE 2: INITIAL RUNOFF DIVERGENCE
              </div>
              <div className="absolute bottom-2 right-2 bg-navy-950/80 text-text-dim font-mono text-[10px] px-1.5 py-0.5 rounded">
                {historyData[Math.floor(historyData.length / 2)]?.date || "Sep 08"}
              </div>
            </div>
            <div className="p-3 font-mono text-xs space-y-1">
              <div className="text-white font-bold">Plume Expansion & Inflow</div>
              <div className="text-[11px] text-text-dim">
                NDCI: +{historyData[Math.floor(historyData.length / 2)]?.ndci || 0.28} • Anomaly Area: {historyData[Math.floor(historyData.length / 2)]?.anomalyKm2 || 1.1} km²
              </div>
              <div className="text-[10px] text-amber-warning">Early spectral variance alert</div>
            </div>
          </div>

          {/* Stage 3: Peak Anomaly */}
          <div className="glass-panel rounded-xl overflow-hidden border-coral-alert/50 bg-ocean-900/40">
            <div className="relative h-44 bg-navy-950">
              <img 
                src={wb.anomalyImage} 
                alt="Peak Anomaly" 
                className="w-full h-full object-cover filter contrast-125 saturate-150"
              />
              {/* Intense anomaly tint */}
              <div className="absolute inset-0 bg-coral-alert/25 mix-blend-color-dodge" />
              <div className="absolute top-3 left-3 bg-navy-950/90 text-coral-alert font-mono text-[10px] px-2 py-0.5 rounded border border-coral-alert/40">
                STAGE 3: CRITICAL ANOMALY PEAK
              </div>
              <div className="absolute bottom-2 right-2 bg-navy-950/80 text-text-dim font-mono text-[10px] px-1.5 py-0.5 rounded">
                {historyData[historyData.length - 1]?.date || "Nov 04"}
              </div>
            </div>
            <div className="p-3 font-mono text-xs space-y-1">
              <div className="text-white font-bold">Severe Bloom / Contaminant Footprint</div>
              <div className="text-[11px] text-text-dim">
                NDCI: +{historyData[historyData.length - 1]?.ndci || 0.48} • Anomaly Area: {historyData[historyData.length - 1]?.anomalyKm2 || 1.84} km²
              </div>
              <div className="text-[10px] text-coral-alert font-bold">Field verification triage active</div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Time-Scrubber Control Panel */}
      <div className="glass-panel p-5 rounded-xl border-ocean-700/80 bg-ocean-900/50 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg bg-navy-950 border border-aqua/40 text-aqua hover:bg-ocean-800 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div>
              <span className="text-xs font-mono text-white font-bold flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-aqua" />
                <span>ORBIT DATE SCRUBBER: {activePoint.date} (CURRENT STEP)</span>
              </span>
              <span className="text-[11px] font-mono text-text-dim">
                Drag slider or press Play to animate historical anomaly progression
              </span>
            </div>
          </div>

          <div className="text-right font-mono text-xs hidden sm:block">
            <span className="text-coral-alert font-bold">{activePoint.anomalyKm2} km²</span>
            <span className="text-text-dim"> affected | Risk </span>
            <span className="text-amber-warning font-bold">{activePoint.risk}/100</span>
          </div>
        </div>

        {/* Timeline Range Scrubber Slider */}
        <div className="space-y-2">
          <input 
            type="range"
            min="0"
            max={historyData.length - 1}
            value={selectedTimelineIndex}
            onChange={(e) => setSelectedTimelineIndex(Number(e.target.value))}
            className="w-full accent-aqua h-2 bg-navy-950 rounded-lg appearance-none cursor-pointer border border-ocean-700"
          />

          <div className="flex justify-between font-mono text-[10px] text-text-dim">
            {historyData.map((pt, i) => (
              <span 
                key={i} 
                className={`cursor-pointer ${i === selectedTimelineIndex ? 'text-aqua font-bold' : 'hover:text-white'}`}
                onClick={() => setSelectedTimelineIndex(i)}
              >
                {pt.date}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Historical Anomaly Evolution Charts (Recharts Area & Line) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Anomaly Area Expansion (km²) */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-xl border-ocean-700/80 bg-ocean-900/40 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-ocean-800 text-xs font-mono">
            <span className="text-white font-semibold">ANOMALOUS SURFACE EXTENT (KM²)</span>
            <span className="text-coral-alert font-bold">Trend: Accelerating</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5D65" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#FF5D65" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#11354D" opacity={0.5} />
                <XAxis dataKey="date" stroke="#91A8B5" fontSize={10} fontStyle="monospace" />
                <YAxis stroke="#91A8B5" fontSize={10} fontStyle="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#06131D', borderColor: '#FF5D65', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#20D9D0', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="anomalyKm2" stroke="#FF5D65" strokeWidth={2} fillOpacity={1} fill="url(#areaGrad)" name="Affected Area (km²)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: NDCI Chlorophyll Index vs Rainfall Runoff (mm) */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-xl border-ocean-700/80 bg-ocean-900/40 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-ocean-800 text-xs font-mono">
            <span className="text-white font-semibold">NDCI INDEX VS PRECIPITATION RUNOFF (MM)</span>
            <span className="text-aqua font-bold">Correlation r = 0.82</span>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#11354D" opacity={0.5} />
                <XAxis dataKey="date" stroke="#91A8B5" fontSize={10} fontStyle="monospace" />
                <YAxis yAxisId="left" stroke="#20D9D0" fontSize={10} fontStyle="monospace" />
                <YAxis yAxisId="right" orientation="right" stroke="#319BFF" fontSize={10} fontStyle="monospace" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#06131D', borderColor: '#20D9D0', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                  labelStyle={{ color: '#EDF8FA', fontWeight: 'bold' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="ndci" stroke="#20D9D0" strokeWidth={2.5} name="NDCI Index" dot={{ fill: '#20D9D0', r: 3 }} />
                <Line yAxisId="right" type="monotone" dataKey="rainfallMm" stroke="#319BFF" strokeWidth={1.5} strokeDasharray="4 4" name="Rainfall (mm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
