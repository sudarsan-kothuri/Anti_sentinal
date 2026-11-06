import React, { useState } from 'react';
import { 
  Scan, 
  Layers, 
  Sparkles, 
  Calendar, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Sliders, 
  HelpCircle,
  Eye,
  RefreshCw,
  Binary,
  Radio,
  FileText
} from 'lucide-react';

export default function AquaDetectTab({ 
  waterBodies, 
  selectedWaterBody, 
  onSelectWaterBody,
  onNavigateTab 
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [activeBandFilter, setActiveBandFilter] = useState('ALL');

  const processingSteps = [
    "Ingesting Sentinel-2 Level-2A surface reflectance tiles...",
    "Executing s2cloudless cloud & shadow masking algorithm...",
    "Computing MNDWI mask to segment water body shoreline...",
    "Extracting multi-spectral reflectance signatures (B2-B12)...",
    "Calculating baseline cosine divergence & spectral distance...",
    "Running unsupervised Isolation Forest spatial anomaly scoring...",
    "Synthesizing anomaly polygons & confidence intervals."
  ];

  const handleRunAnalysis = () => {
    setIsProcessing(true);
    setAnalysisComplete(false);
    setProcessingStage(0);

    const runStep = (step) => {
      if (step < processingSteps.length) {
        setProcessingStage(step);
        setTimeout(() => runStep(step + 1), 600);
      } else {
        setIsProcessing(false);
        setAnalysisComplete(true);
      }
    };

    runStep(0);
  };

  const wb = selectedWaterBody;

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-aqua/20 text-aqua border border-aqua/40">
              <Scan className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">AquaDetect: AI Anomaly Detection</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-aqua border border-ocean-700">
              Sentinel-2 MSI Level-2A
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Isolate spectral deviations against historical reflectance baselines to flag suspected algal blooms, sediment shifts, or surface contaminants.
          </p>
        </div>

        {/* Action Button: Run AquaDetect Analysis */}
        <button
          onClick={handleRunAnalysis}
          disabled={isProcessing}
          className="relative px-6 py-3 rounded-xl font-mono text-xs font-bold text-navy-950 bg-gradient-to-r from-aqua via-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>PROCESSING STAGE {processingStage + 1}/7...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>RUN AQUADETECT ANALYSIS</span>
            </>
          )}
        </button>
      </div>

      {/* Observation Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 glass-panel p-4 rounded-xl border-ocean-700/80 bg-ocean-900/40">
        
        <div>
          <label className="block text-[10px] font-mono text-text-dim uppercase mb-1">Target Water Body</label>
          <select 
            value={wb.id} 
            onChange={(e) => {
              const found = waterBodies.find(w => w.id === e.target.value);
              if (found) onSelectWaterBody(found);
            }}
            className="w-full bg-navy-950 border border-ocean-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-aqua font-mono"
          >
            {waterBodies.map(w => (
              <option key={w.id} value={w.id}>{w.name} ({w.id})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-text-dim uppercase mb-1">Baseline Acquisition Date</label>
          <div className="flex items-center gap-2 bg-navy-950 border border-ocean-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono">
            <Calendar className="w-3.5 h-3.5 text-aqua" />
            <span>{wb.baselineDate} (Sentinel-2)</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-text-dim uppercase mb-1">Latest Observation Date</label>
          <div className="flex items-center gap-2 bg-navy-950 border border-ocean-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono">
            <Calendar className="w-3.5 h-3.5 text-coral-alert" />
            <span>{wb.latestDate} (Sentinel-2)</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-text-dim uppercase mb-1">Radiometric Quality</label>
          <div className="flex items-center justify-between bg-navy-950 border border-ocean-700 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-emerald-accent flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>BOA Refl. Valid</span>
            </span>
            <span className="text-text-dim">Cloud: {wb.cloudCoverPercent}%</span>
          </div>
        </div>

      </div>

      {/* Animated Scientific Processing Pipeline Overlay (When Clicked) */}
      {isProcessing && (
        <div className="glass-panel p-6 rounded-xl border-aqua/40 bg-ocean-900/90 shadow-glow-aqua/10 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-aqua">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="font-bold">AQUADETECT PIPELINE EXECUTING: STAGE {processingStage + 1} OF 7</span>
            </div>
            <span className="text-text-dim">{Math.round(((processingStage + 1) / 7) * 100)}% COMPLETE</span>
          </div>

          <div className="w-full h-2 rounded-full bg-navy-950 border border-ocean-700 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-aqua to-electric transition-all duration-300"
              style={{ width: `${((processingStage + 1) / 7) * 100}%` }}
            />
          </div>

          <div className="p-3 rounded-lg bg-navy-950 font-mono text-xs text-white flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-aqua animate-ping" />
            <span>{processingSteps[processingStage]}</span>
          </div>
        </div>
      )}

      {/* Main Split Comparison Visualizer & Anomaly Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Split Comparison View (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-semibold flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-aqua" />
              <span>ORBITAL REFLECTANCE COMPARISON SLIDER</span>
            </span>
            <span className="text-text-dim">SLIDE TO COMPARE BASELINE VS ANOMALY</span>
          </div>

          {/* Interactive Split Comparison Card */}
          <div className="relative h-[380px] sm:h-[440px] rounded-xl overflow-hidden border border-ocean-700 select-none shadow-2xl group">
            
            {/* Background Image: Latest Anomaly State with false-color spectral bloom */}
            <div className="absolute inset-0 bg-navy-950">
              <img 
                src={wb.anomalyImage} 
                alt="Current Anomaly" 
                className="w-full h-full object-cover filter contrast-125 saturate-150"
              />
              {/* False Color Anomaly Heatmap Shader Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-coral-alert/30 via-amber-warning/20 to-transparent mix-blend-color-dodge pointer-events-none" />
              <div className="absolute top-4 right-4 bg-navy-950/90 text-coral-alert font-mono text-xs px-2.5 py-1 rounded border border-coral-alert/40 backdrop-blur-md">
                LATEST PASS: {wb.latestDate} [ANOMALOUS]
              </div>
            </div>

            {/* Foreground Image: Baseline Observation (Clipped by Slider) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={wb.baselineImage} 
                alt="Baseline Clean" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-95"
                style={{ width: '100%', minWidth: '500px' }}
              />
              <div className="absolute top-4 left-4 bg-navy-950/90 text-aqua font-mono text-xs px-2.5 py-1 rounded border border-aqua/40 backdrop-blur-md">
                BASELINE: {wb.baselineDate} [CALIBRATED]
              </div>
            </div>

            {/* Draggable Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-aqua shadow-glow-aqua cursor-ew-resize flex items-center justify-center z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-7 h-7 rounded-full bg-navy-950 border-2 border-aqua text-aqua flex items-center justify-center text-[10px] font-bold shadow-lg">
                ⇄
              </div>
            </div>

            {/* Invisible Range Input for Dragging */}
            <input 
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
            />

            {/* Bottom HUD Bar */}
            <div className="absolute bottom-3 left-3 right-3 glass-panel px-3 py-2 rounded-lg border-ocean-700/80 flex items-center justify-between text-[11px] font-mono pointer-events-none">
              <span className="text-aqua">BASELINE WATER SIGNATURE</span>
              <span className="text-text-dim">DRAG CENTER SLIDER</span>
              <span className="text-coral-alert">SPECTRAL ANOMALY FOOTPRINT</span>
            </div>

          </div>

          {/* Anomaly Polygon Statistics Summary */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
            <div className="p-2.5 rounded-lg bg-navy-950 border border-ocean-800">
              <div className="text-text-dim text-[10px]">ANOMALOUS PIXELS</div>
              <div className="text-base font-bold text-coral-alert">{wb.anomalousPixelsPercent}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-950 border border-ocean-800">
              <div className="text-text-dim text-[10px]">AFFECTED SURFACE</div>
              <div className="text-base font-bold text-white">{wb.affectedAreaKm2} km²</div>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-950 border border-ocean-800">
              <div className="text-text-dim text-[10px]">MODEL CONFIDENCE</div>
              <div className="text-base font-bold text-emerald-accent">{wb.anomalyConfidence}%</div>
            </div>
          </div>

        </div>

        {/* Right: Sentinel-2 Multi-Spectral Band Profiles (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Spectral Indices Card */}
          <div className="glass-panel p-5 rounded-xl border-ocean-700/80 bg-ocean-900/50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-ocean-800">
              <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
                <Binary className="w-4 h-4 text-aqua" />
                <span>WATER-QUALITY INDEX GAUGES</span>
              </div>
              <span className="text-[10px] font-mono text-text-dim">Level-2A BOA</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white">NDCI (Chlorophyll / Cyanobacteria)</span>
                  <span className="text-coral-alert font-bold">+{wb.ndci} [Critical Bloom]</span>
                </div>
                <div className="w-full h-2 rounded bg-navy-950 border border-ocean-800 overflow-hidden">
                  <div className="h-full bg-coral-alert" style={{ width: `${(wb.ndci + 0.2) * 120}%` }} />
                </div>
                <span className="text-[10px] text-text-dim">Threshold &gt; 0.25 indicates heavy organic/algal concentration</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white">MNDWI (Water Delimitation)</span>
                  <span className="text-aqua font-bold">{wb.mndwi} [Water Confirmed]</span>
                </div>
                <div className="w-full h-2 rounded bg-navy-950 border border-ocean-800 overflow-hidden">
                  <div className="h-full bg-aqua" style={{ width: `${wb.mndwi * 100}%` }} />
                </div>
                <span className="text-[10px] text-text-dim">Open water boundary verified without cloud shadow contamination</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white">Estimated Turbidity Indicator</span>
                  <span className="text-amber-warning font-bold">~{wb.turbidityNtuEstimate} NTU</span>
                </div>
                <div className="w-full h-2 rounded bg-navy-950 border border-ocean-800 overflow-hidden">
                  <div className="h-full bg-amber-warning" style={{ width: `${Math.min(wb.turbidityNtuEstimate, 100)}%` }} />
                </div>
                <span className="text-[10px] text-text-dim">Derived from Red (B4) backscattering intensity</span>
              </div>

            </div>
          </div>

          {/* Sentinel-2 Raw Spectral Reflectance Bands Comparison */}
          <div className="glass-panel p-5 rounded-xl border-ocean-700/80 bg-ocean-900/50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-ocean-800">
              <span className="text-white font-semibold text-xs font-mono">
                SENTINEL-2 SPECTRAL BANDS (B2 - B12)
              </span>
              <span className="text-[10px] font-mono text-text-dim">Baseline vs Anomaly</span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              {Object.entries(wb.spectralBands).map(([bandKey, vals]) => {
                const isDivergent = Math.abs(vals.current - vals.baseline) > 0.05;
                const bandLabel = bandKey.replace('_', ' ').toUpperCase();
                return (
                  <div key={bandKey} className="p-2 rounded bg-navy-950/80 border border-ocean-800 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold">{bandLabel}</span>
                      <div className="text-[10px] text-text-dim">
                        Base: {vals.baseline} → Now: <span className={isDivergent ? 'text-coral-alert font-bold' : 'text-aqua'}>{vals.current}</span>
                      </div>
                    </div>
                    {isDivergent ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-coral-alert/20 text-coral-alert border border-coral-alert/40">
                        Δ Divergence
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-ocean-800 text-text-dim">
                        Nominal
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Scientific disclaimer notice */}
            <div className="p-3 rounded-lg bg-navy-950/90 border border-ocean-800 text-[11px] text-text-secondary leading-relaxed">
              <span className="text-amber-warning font-semibold font-mono block mb-1">
                ⚠️ Remote Sensing Notice:
              </span>
              Optical spectral indices reflect surface optical properties. Chemical toxicity requires physical grab sampling confirmation.
            </div>

            {/* Quick Button to Proceed to Alert / Report */}
            <button
              onClick={() => onNavigateTab('alert')}
              className="w-full py-2 rounded-lg font-mono text-xs font-bold text-coral-alert border border-coral-alert/40 bg-coral-alert/10 hover:bg-coral-alert/20 transition-all flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>DISPATCH INVESTIGATION ALERT FOR THIS WATER BODY</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
