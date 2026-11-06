import React, { useState } from 'react';
import { 
  Sliders, 
  Save, 
  CheckCircle2, 
  RotateCcw, 
  Satellite, 
  Database, 
  ShieldCheck, 
  BellRing,
  HelpCircle
} from 'lucide-react';

export default function SettingsTab() {
  const [cloudCoverThreshold, setCloudCoverThreshold] = useState(15);
  const [anomalySensitivity, setAnomalySensitivity] = useState(2.5);
  const [autoDispatchAlerts, setAutoDispatchAlerts] = useState(true);
  const [demoMode, setDemoMode] = useState(true);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-ocean-800 text-aqua border border-ocean-700">
              <Sliders className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">System Settings & Sensor Calibration</h2>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Configure Google Earth Engine ingestion parameters, Isolation Forest detection sensitivities, and automated alert dispatch thresholds.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-navy-950 bg-gradient-to-r from-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>SAVE CONFIGURATION</span>
        </button>
      </div>

      {savedNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-accent/20 border border-emerald-accent/50 text-emerald-accent text-xs font-mono flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Sensor calibration and operational parameters updated successfully.</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-4">
        
        {/* Radiometric & Cloud Filtering */}
        <div className="glass-panel p-6 rounded-2xl border-ocean-700/80 bg-ocean-900/40 space-y-4">
          <div className="text-sm font-bold font-display text-white pb-2 border-b border-ocean-800 flex items-center justify-between">
            <span>RADIOMETRIC & CLOUD MASKING (SEN2COR / S2CLOUDLESS)</span>
            <span className="text-xs font-mono text-aqua">Active</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white">Maximum Permissible Cloud Cover:</span>
              <span className="text-aqua font-bold">{cloudCoverThreshold}%</span>
            </div>
            <input 
              type="range"
              min="0"
              max="40"
              value={cloudCoverThreshold}
              onChange={(e) => setCloudCoverThreshold(Number(e.target.value))}
              className="w-full accent-aqua h-2 bg-navy-950 rounded-lg appearance-none cursor-pointer border border-ocean-700"
            />
            <span className="text-[11px] text-text-dim block">
              Tiles with scene cloud obscuration exceeding this threshold are discarded to prevent false positive spectral shifts.
            </span>
          </div>
        </div>

        {/* AI Model Sensitivities */}
        <div className="glass-panel p-6 rounded-2xl border-ocean-700/80 bg-ocean-900/40 space-y-4">
          <div className="text-sm font-bold font-display text-white pb-2 border-b border-ocean-800 flex items-center justify-between">
            <span>UNSUPERVISED ISOLATION FOREST ANOMALY SENSITIVITY</span>
            <span className="text-xs font-mono text-coral-alert">Tuned</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white">Statistical Sigma Deviation Threshold:</span>
              <span className="text-coral-alert font-bold">{anomalySensitivity} σ</span>
            </div>
            <input 
              type="range"
              min="1.5"
              max="4.0"
              step="0.1"
              value={anomalySensitivity}
              onChange={(e) => setAnomalySensitivity(Number(e.target.value))}
              className="w-full accent-coral-alert h-2 bg-navy-950 rounded-lg appearance-none cursor-pointer border border-ocean-700"
            />
            <span className="text-[11px] text-text-dim block">
              Multi-band Euclidean distance deviation required against 90-day rolling baseline before triggering an anomaly flag.
            </span>
          </div>
        </div>

        {/* Demonstration & Data Mode */}
        <div className="glass-panel p-6 rounded-2xl border-ocean-700/80 bg-ocean-900/40 space-y-4">
          <div className="text-sm font-bold font-display text-white pb-2 border-b border-ocean-800 flex items-center justify-between">
            <span>EVALUATION / HACKATHON DEMO MODE</span>
            <span className="text-xs font-mono text-emerald-accent">Enabled</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Enable High-Fidelity Simulated Telemetry</div>
              <div className="text-[11px] text-text-dim">
                Allows offline evaluation of the 7-step investigation walkthrough without live ESA Copernicus API keys.
              </div>
            </div>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                demoMode 
                  ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/50' 
                  : 'bg-navy-950 text-text-dim border border-ocean-800'
              }`}
            >
              {demoMode ? "ACTIVE (DEMO ON)" : "LIVE API"}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
