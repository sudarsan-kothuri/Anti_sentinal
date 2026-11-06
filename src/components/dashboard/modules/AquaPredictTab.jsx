import React, { useState } from 'react';
import { 
  BrainCircuit, 
  CloudRain, 
  Thermometer, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Area, 
  AreaChart 
} from 'recharts';

export default function AquaPredictTab({ 
  waterBodies, 
  selectedWaterBody, 
  onSelectWaterBody,
  onNavigateTab 
}) {
  const wb = selectedWaterBody;

  // 30-day forecast simulation with lower and upper confidence bounds
  const forecastData = [
    { day: "Current", riskEstimate: wb.riskScore, upperBound: wb.riskScore, lowerBound: wb.riskScore },
    { day: "Day +5", riskEstimate: Math.min(wb.riskScore + 2, 98), upperBound: Math.min(wb.riskScore + 5, 100), lowerBound: Math.max(wb.riskScore - 2, 10) },
    { day: "Day +10", riskEstimate: Math.min(wb.riskScore + 4, 99), upperBound: Math.min(wb.riskScore + 8, 100), lowerBound: Math.max(wb.riskScore - 3, 10) },
    { day: "Day +15", riskEstimate: Math.min(wb.riskScore + 3, 98), upperBound: Math.min(wb.riskScore + 10, 100), lowerBound: Math.max(wb.riskScore - 5, 10) },
    { day: "Day +20", riskEstimate: Math.min(wb.riskScore + 1, 96), upperBound: Math.min(wb.riskScore + 12, 100), lowerBound: Math.max(wb.riskScore - 7, 10) },
    { day: "Day +30", riskEstimate: Math.max(wb.riskScore - 2, 60), upperBound: Math.min(wb.riskScore + 14, 100), lowerBound: Math.max(wb.riskScore - 12, 10) },
  ];

  const riskFactors = [
    { name: "Catchment Runoff & Precipitation", weight: "35%", value: "High (120mm in 30d)", impact: "+28 pts", status: "CRITICAL" },
    { name: "Spectral NDCI Divergence Rate", weight: "30%", value: `+${wb.ndci} (Significant)`, impact: "+25 pts", status: "CRITICAL" },
    { name: "Water Residence Time & Heat Flux", weight: "20%", value: "24.6°C Surface Temp", impact: "+16 pts", status: "MODERATE" },
    { name: "Historical Anomaly Recurrence", weight: "15%", value: "3 occurrences in 2026", impact: "+12 pts", status: "MODERATE" }
  ];

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/40">
              <BrainCircuit className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">AquaPredict: Environmental Risk Intelligence</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-emerald-accent border border-ocean-700">
              Multi-Factor Predictive AI
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Synthesize historical anomaly frequency, meteorological runoff forecasts, and watershed vulnerability to estimate 30-day degradation risk.
          </p>
        </div>

        {/* Selected Water Body Selector */}
        <select 
          value={wb.id} 
          onChange={(e) => {
            const found = waterBodies.find(w => w.id === e.target.value);
            if (found) onSelectWaterBody(found);
          }}
          className="bg-navy-950 border border-ocean-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-aqua font-mono"
        >
          {waterBodies.map(w => (
            <option key={w.id} value={w.id}>{w.name} (Risk: {w.riskScore})</option>
          ))}
        </select>
      </div>

      {/* Top Composite Risk Score & Status Badges */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Risk Gauge Card (5 cols) */}
        <div className="md:col-span-5 glass-panel p-6 rounded-2xl border-coral-alert/30 bg-ocean-900/60 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-text-dim uppercase">COMPOSITE RISK INDEX</span>
              <span className="text-coral-alert font-bold">{wb.riskCategory.toUpperCase()} RISK</span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black font-display text-coral-alert">{wb.riskScore}</span>
              <span className="text-lg font-mono text-text-dim">/ 100</span>
            </div>

            {/* Gauge Level Progress Bar */}
            <div className="w-full h-3 rounded-full bg-navy-950 border border-ocean-700 overflow-hidden flex my-3">
              <div className="h-full bg-emerald-accent" style={{ width: '25%' }} title="Low" />
              <div className="h-full bg-amber-warning" style={{ width: '25%' }} title="Moderate" />
              <div className="h-full bg-orange-500" style={{ width: '25%' }} title="Elevated" />
              <div className="h-full bg-coral-alert" style={{ width: '25%' }} title="Critical" />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-text-dim">
              <span>0 (Low)</span>
              <span>50 (Moderate)</span>
              <span>75 (Elevated)</span>
              <span className="text-coral-alert font-bold">100 (Critical)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950/80 border border-ocean-800 text-xs font-mono space-y-1">
            <div className="flex items-center justify-between text-text-dim">
              <span>MODEL CONFIDENCE:</span>
              <span className="text-emerald-accent font-bold">95.4%</span>
            </div>
            <div className="flex items-center justify-between text-text-dim">
              <span>UNCERTAINTY BOUNDS:</span>
              <span className="text-white">± 4.2 Sigma</span>
            </div>
            <div className="flex items-center justify-between text-text-dim">
              <span>FIELD PRIORITY:</span>
              <span className="text-coral-alert font-bold">URGENT DISPATCH</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('alert')}
            className="w-full py-2.5 rounded-lg text-xs font-mono font-bold text-navy-950 bg-gradient-to-r from-coral-alert to-amber-warning hover:shadow-glow-coral transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>GENERATE ENVIRONMENTAL ALERT</span>
          </button>
        </div>

        {/* AI Synthesis & Reasoning Explainer (7 cols) */}
        <div className="md:col-span-7 glass-panel p-6 rounded-2xl border-ocean-700/80 bg-ocean-900/40 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-aqua text-xs font-mono">
              <Sparkles className="w-4 h-4" />
              <span>AI REASONING SYNTHESIS FOR ENVIRONMENTAL AUTHORITIES</span>
            </div>

            <h3 className="text-lg font-bold font-display text-white">
              Why Has This Catchment Been Prioritized for Field Investigation?
            </h3>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-ocean-800/80 text-xs text-text-secondary leading-relaxed space-y-2">
              <p>
                <strong className="text-white">Primary Divergence: </strong> 
                Recent Sentinel-2 observations indicate a pronounced spectral anomaly ({wb.affectedAreaKm2} km² affected, {wb.anomalousPixelsPercent}% surface area). 
                Optical reflectance deviates sharply from the established 90-day baseline ({wb.baselineDate}).
              </p>
              <p>
                <strong className="text-white">Environmental Drivers: </strong> 
                Cumulative catchment rainfall and elevated thermal radiance create favorable conditions for accelerated cyanobacterial growth or surfactant dispersion along the eastern inflow channel.
              </p>
              <p className="text-aqua font-mono text-[11px] pt-1">
                Recommendation: Physical grab sampling is recommended at coordinates ({wb.coordinates[0].toFixed(4)}° N, {wb.coordinates[1].toFixed(4)}° W) to evaluate dissolved oxygen and chemical toxicity.
              </p>
            </div>
          </div>

          {/* Factor Breakdown */}
          <div className="space-y-2 font-mono text-xs">
            <div className="text-[11px] text-text-dim uppercase tracking-wider">Contributing Risk Weights</div>
            {riskFactors.map((factor, i) => (
              <div key={i} className="p-2 rounded bg-navy-950/60 border border-ocean-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold">{factor.name}</span>
                  <div className="text-[10px] text-text-dim">{factor.value}</div>
                </div>
                <div className="text-right">
                  <span className="text-coral-alert font-bold">{factor.impact}</span>
                  <div className="text-[10px] text-text-dim">Weight: {factor.weight}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 30-Day Predictive Projection Chart with Uncertainty Cones */}
      <div className="glass-panel p-6 rounded-2xl border-ocean-700/80 bg-ocean-900/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-ocean-800 text-xs font-mono gap-2">
          <div>
            <span className="text-white font-bold text-sm block">30-DAY ENVIRONMENTAL RISK PROJECTION CONE</span>
            <span className="text-text-dim text-[11px]">Ensemble model projection with 95% confidence intervals</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-coral-alert">
              <span className="w-2.5 h-2.5 rounded-full bg-coral-alert" />
              Estimated Risk
            </span>
            <span className="flex items-center gap-1.5 text-text-dim">
              <span className="w-2.5 h-2.5 rounded-full bg-ocean-700" />
              Uncertainty Cone
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#319BFF" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#319BFF" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#11354D" opacity={0.5} />
              <XAxis dataKey="day" stroke="#91A8B5" fontSize={11} fontStyle="monospace" />
              <YAxis domain={[0, 100]} stroke="#91A8B5" fontSize={11} fontStyle="monospace" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#06131D', borderColor: '#20D9D0', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                labelStyle={{ color: '#20D9D0', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="upperBound" stroke="none" fill="url(#coneGrad)" name="Upper 95% Bound" />
              <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#06131D" name="Lower 95% Bound" />
              <Line type="monotone" dataKey="riskEstimate" stroke="#FF5D65" strokeWidth={3} dot={{ fill: '#FF5D65', r: 4 }} name="Projected Risk" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Scientific Transparency Footnote */}
        <div className="p-3 rounded-lg bg-navy-950 border border-ocean-800 text-[11px] font-mono text-text-dim flex items-center gap-2">
          <Info className="w-4 h-4 text-aqua flex-shrink-0" />
          <span>
            Predictive projections are mathematical simulations based on remote sensing time-series and weather models. Never interpret risk estimates as confirmed toxicity without in-situ chemical laboratory testing.
          </span>
        </div>
      </div>

    </div>
  );
}
