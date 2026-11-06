import React from 'react';
import GeospatialMap from '../GeospatialMap';
import { 
  ShieldAlert, 
  Activity, 
  Satellite, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Scan, 
  FileText, 
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { SYSTEM_STATS } from '../../../data/mockData';

export default function OverviewTab({ 
  waterBodies, 
  selectedWaterBody, 
  onSelectWaterBody, 
  onNavigateTab,
  onOpenDemo 
}) {
  return (
    <div className="space-y-4 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Top Telemetry KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        
        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="flex items-center justify-between text-text-dim text-[11px] font-mono uppercase mb-1">
            <span>MONITORED BASINS</span>
            <Satellite className="w-3.5 h-3.5 text-aqua" />
          </div>
          <div className="text-2xl font-bold font-display text-white">{SYSTEM_STATS.monitoredBodies}</div>
          <div className="text-[10px] text-aqua font-mono mt-0.5">Global Sentinel Coverage</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="flex items-center justify-between text-text-dim text-[11px] font-mono uppercase mb-1">
            <span>SPECTRAL ANOMALIES</span>
            <ShieldAlert className="w-3.5 h-3.5 text-coral-alert" />
          </div>
          <div className="text-2xl font-bold font-display text-coral-alert">{SYSTEM_STATS.detectedAnomalies}</div>
          <div className="text-[10px] text-coral-alert/80 font-mono mt-0.5">Deviation &gt; 2.5 Sigma</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="flex items-center justify-between text-text-dim text-[11px] font-mono uppercase mb-1">
            <span>FIELD TRIAGE TEAMS</span>
            <Activity className="w-3.5 h-3.5 text-amber-warning" />
          </div>
          <div className="text-2xl font-bold font-display text-amber-warning">0{SYSTEM_STATS.priorityInvestigations}</div>
          <div className="text-[10px] text-amber-warning/80 font-mono mt-0.5">Active Ground Missions</div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border-ocean-700/80 bg-ocean-900/40">
          <div className="flex items-center justify-between text-text-dim text-[11px] font-mono uppercase mb-1">
            <span>CLOUD MASKING CONFIDENCE</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-accent" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-accent">96.4%</div>
          <div className="text-[10px] text-emerald-accent/80 font-mono mt-0.5">s2cloudless Filter</div>
        </div>

      </div>

      {/* Main Command Map & Focused Water Body Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Map Experience (8 cols) */}
        <div className="lg:col-span-8 h-[520px]">
          <GeospatialMap 
            waterBodies={waterBodies}
            selectedWaterBody={selectedWaterBody}
            onSelectWaterBody={onSelectWaterBody}
          />
        </div>

        {/* Selected Water Body Intelligence Dossier (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between glass-panel p-5 rounded-xl border-ocean-700/80 bg-ocean-900/50">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-ocean-700/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-coral-alert animate-ping" />
                <span className="text-[11px] font-mono text-aqua uppercase tracking-wider font-semibold">
                  SURFACE TELEMETRY DOSSIER
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-text-dim border border-ocean-700">
                {selectedWaterBody.id}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold font-display text-white leading-tight">
                {selectedWaterBody.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1 font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-text-dim" />
                <span>{selectedWaterBody.region}</span>
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded bg-navy-950/80 border border-ocean-800">
                <div className="text-text-dim text-[10px]">ANOMALY SCORE</div>
                <div className="text-lg font-bold text-coral-alert">{selectedWaterBody.anomalyConfidence}%</div>
                <div className="text-[10px] text-text-dim">{selectedWaterBody.affectedAreaKm2} km² affected</div>
              </div>

              <div className="p-2.5 rounded bg-navy-950/80 border border-ocean-800">
                <div className="text-text-dim text-[10px]">RISK CATEGORY</div>
                <div className="text-lg font-bold text-amber-warning">{selectedWaterBody.riskCategory}</div>
                <div className="text-[10px] text-text-dim">Score: {selectedWaterBody.riskScore}/100</div>
              </div>

              <div className="p-2.5 rounded bg-navy-950/80 border border-ocean-800">
                <div className="text-text-dim text-[10px]">OPTICAL CHLOROPHYLL (NDCI)</div>
                <div className="text-base font-bold text-aqua">+{selectedWaterBody.ndci}</div>
                <div className="text-[10px] text-text-dim">Turbidity ~{selectedWaterBody.turbidityNtuEstimate} NTU</div>
              </div>

              <div className="p-2.5 rounded bg-navy-950/80 border border-ocean-800">
                <div className="text-text-dim text-[10px]">LATEST ORBIT PASS</div>
                <div className="text-xs font-semibold text-white mt-1">{selectedWaterBody.latestDate}</div>
                <div className="text-[10px] text-emerald-accent">Cloud: {selectedWaterBody.cloudCoverPercent}%</div>
              </div>
            </div>

            {/* Primary Anomaly Indicator Description */}
            <div className="p-3 rounded-lg bg-navy-950/60 border border-ocean-800 space-y-1.5 text-xs">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-coral-alert" />
                <span>Detected Spectral Divergence</span>
              </div>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                {selectedWaterBody.description}
              </p>
            </div>
          </div>

          {/* Quick Action Navigation Buttons to Modules */}
          <div className="pt-4 border-t border-ocean-800/80 space-y-2">
            <button
              onClick={() => onNavigateTab('detect')}
              className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-navy-950 bg-gradient-to-r from-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center justify-center gap-2"
            >
              <Scan className="w-4 h-4" />
              <span>Inspect Anomaly in AquaDetect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateTab('track')}
                className="py-2 px-2 rounded-lg text-xs font-mono text-text-secondary bg-ocean-800/70 border border-ocean-700 hover:text-white hover:bg-ocean-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-aqua" />
                <span>AquaTrack</span>
              </button>

              <button
                onClick={() => onNavigateTab('reports')}
                className="py-2 px-2 rounded-lg text-xs font-mono text-text-secondary bg-ocean-800/70 border border-ocean-700 hover:text-white hover:bg-ocean-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-electric" />
                <span>Export Dossier</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Priority Water Bodies Quick Shelf */}
      <div className="glass-panel p-4 rounded-xl border-ocean-700/80">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-coral-alert" />
            <span>CRITICAL SURFACE MONITORING QUEUE</span>
          </div>
          <span className="text-text-dim">SELECT TO FOCUS MAP & INSTRUMENTS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {waterBodies.map(wb => (
            <div
              key={wb.id}
              onClick={() => onSelectWaterBody(wb)}
              className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                selectedWaterBody.id === wb.id 
                  ? 'bg-ocean-800/90 border-aqua text-white shadow-glow-aqua/10' 
                  : 'bg-navy-950/70 border-ocean-800 text-text-secondary hover:text-white hover:border-ocean-600'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{wb.name}</span>
                  {wb.id === 'WB-06' && (
                    <span className="text-[9px] font-mono px-1 rounded bg-coral-alert/20 text-coral-alert border border-coral-alert/30">
                      DEMO
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-text-dim font-mono">{wb.primaryIndicator.split('&')[0]}</div>
              </div>

              <div className="text-right font-mono">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  wb.riskScore >= 85 ? 'text-coral-alert bg-coral-alert/15' : 'text-amber-warning bg-amber-warning/15'
                }`}>
                  Risk {wb.riskScore}
                </span>
                <div className="text-[10px] text-text-dim mt-0.5">{wb.affectedAreaKm2} km²</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
