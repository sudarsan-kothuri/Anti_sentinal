import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Satellite, 
  Eye, 
  Scan, 
  ShieldAlert, 
  FileText, 
  Layers, 
  Download, 
  Play, 
  RotateCcw,
  Calendar,
  MapPin,
  AlertTriangle,
  Radio,
  Binary
} from 'lucide-react';
import jsPDF from 'jspdf';
import { WATER_BODIES } from '../../data/mockData';

export default function JudgesDemoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReservoir, setSelectedReservoir] = useState(WATER_BODIES.find(w => w.id === 'WB-06') || WATER_BODIES[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  
  // AI processing animation state for Step 4
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState(false);

  const processingSteps = [
    "Loading Sentinel-2 Level-2A BOA Surface Reflectance tiles...",
    "Applying s2cloudless cloud & shadow masking algorithm...",
    "Segmenting open water pixels using MNDWI index...",
    "Extracting multi-spectral reflectance signatures (B2 - B12)...",
    "Comparing spectral patterns against 90-day baseline...",
    "Running unsupervised Isolation Forest spatial anomaly scoring...",
    "Generating anomaly boundary polygons and uncertainty bounds."
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#20D9D0', '#319BFF', '#FF5D65', '#36D69A']
      });
    } catch (e) {
      // fallback if canvas-confetti is not loaded
    }
  };

  const handleRunAiAnalysis = () => {
    setIsProcessing(true);
    setAiAnalysisComplete(false);
    setProcessingStage(0);

    const stepInterval = (idx) => {
      if (idx < processingSteps.length) {
        setProcessingStage(idx);
        setTimeout(() => stepInterval(idx + 1), 600);
      } else {
        setIsProcessing(false);
        setAiAnalysisComplete(true);
      }
    };

    stepInterval(0);
  };

  const handleNextStep = () => {
    if (currentStep === 6) {
      triggerConfetti();
    }
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleDownloadDemoPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(6, 19, 29);
      doc.rect(0, 0, 210, 35, 'F');
      doc.setTextColor(32, 217, 208);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('AquaSentinel Investigation Dossier', 15, 18);
      doc.setFontSize(9);
      doc.setTextColor(145, 168, 181);
      doc.text('HACKATHON DEMO EDITION • COPERNICUS SENTINEL-2 MSI', 15, 26);
      
      doc.setTextColor(20, 30, 40);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Target: ${selectedReservoir.name}`, 15, 48);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Coordinates: ${selectedReservoir.coordinates[0].toFixed(4)}° N, ${selectedReservoir.coordinates[1].toFixed(4)}° W`, 15, 55);
      doc.text(`Anomaly Score: ${selectedReservoir.anomalyConfidence}% (Isolation Forest)`, 15, 62);
      doc.text(`Affected Surface Extent: ${selectedReservoir.affectedAreaKm2} km² (${selectedReservoir.anomalousPixelsPercent}%)`, 15, 69);
      doc.text(`Indicator: ${selectedReservoir.primaryIndicator}`, 15, 76);
      doc.text(`Field Recommendation: ${selectedReservoir.recommendedAction}`, 15, 83);
      
      doc.save(`AquaSentinel-Demo-Dossier-${selectedReservoir.id}.pdf`);
      triggerConfetti();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/85 backdrop-blur-xl animate-fadeIn">
      
      {/* Modal Window Container */}
      <div className="relative w-full max-w-5xl bg-[#071926] border border-coral-alert/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-navy-950 border-b border-ocean-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-coral-alert/20 text-coral-alert border border-coral-alert/40 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">
                  Investigate a Water Body: Guided Scientific Walkthrough
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-coral-alert/20 text-coral-alert border border-coral-alert/40 font-bold uppercase">
                  THE JUDGES' WOW MOMENT
                </span>
              </div>
              <p className="text-xs text-text-dim font-mono">
                A 7-step orbital anomaly investigation proving satellite detection and field triage.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-ocean-900 text-text-dim hover:text-white hover:bg-ocean-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7-Step Navigation Progress Tracker Bar */}
        <div className="px-4 sm:px-6 py-3 bg-navy-950/60 border-b border-ocean-800 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {[
              { num: 1, label: "Select Reservoir" },
              { num: 2, label: "Load Sentinel-2" },
              { num: 3, label: "Compare Observations" },
              { num: 4, label: "Run AI Analysis" },
              { num: 5, label: "Identify Anomalies" },
              { num: 6, label: "Trigger Alert" },
              { num: 7, label: "Export Dossier" }
            ].map(step => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  currentStep === step.num 
                    ? 'bg-gradient-to-r from-coral-alert/20 to-amber-warning/20 text-white border border-coral-alert/50 font-bold'
                    : currentStep > step.num
                      ? 'text-emerald-accent'
                      : 'text-text-dim hover:text-white'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === step.num
                    ? 'bg-coral-alert text-navy-950'
                    : currentStep > step.num
                      ? 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/40'
                      : 'bg-ocean-800 text-text-dim'
                }`}>
                  {currentStep > step.num ? "✓" : step.num}
                </span>
                <span>{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: SELECT RESERVOIR */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-aqua font-bold uppercase">STEP 1 OF 7</span>
                <h4 className="text-xl font-bold font-display text-white">Select a Suspect Water Body</h4>
                <p className="text-xs text-text-secondary">
                  Choose a monitored reservoir where anomalous reflectance has triggered preliminary automated flags.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {WATER_BODIES.map(wb => (
                  <div
                    key={wb.id}
                    onClick={() => setSelectedReservoir(wb)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedReservoir.id === wb.id 
                        ? 'border-coral-alert bg-ocean-800/90 shadow-glow-coral/20' 
                        : 'border-ocean-800 bg-navy-950/60 text-text-secondary hover:text-white hover:border-ocean-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="text-text-dim">{wb.id}</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded ${
                        wb.riskScore >= 85 ? 'bg-coral-alert/20 text-coral-alert' : 'bg-amber-warning/20 text-amber-warning'
                      }`}>
                        Risk {wb.riskScore}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold font-display text-white mb-1">{wb.name}</h5>
                    <div className="text-[11px] text-text-dim font-mono truncate">{wb.region}</div>
                    
                    <div className="mt-3 pt-2 border-t border-ocean-800 text-[10px] font-mono text-aqua flex justify-between">
                      <span>Area: {wb.areaKm2} km²</span>
                      <span>Pass: {wb.latestDate}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-navy-950 border border-ocean-800 text-xs font-mono text-text-secondary flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Selected: {selectedReservoir.name}</span>
                  <span className="text-text-dim">Coordinates: {selectedReservoir.coordinates[0].toFixed(4)}° N, {selectedReservoir.coordinates[1].toFixed(4)}° W</span>
                </div>
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 rounded-lg bg-coral-alert text-navy-950 font-bold hover:shadow-glow-coral transition-all flex items-center gap-1.5"
                >
                  <span>Confirm Target</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LOAD SATELLITE OBSERVATIONS */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-aqua font-bold uppercase">STEP 2 OF 7</span>
                <h4 className="text-xl font-bold font-display text-white">Ingest Sentinel-2 MSI Multi-Spectral Feeds</h4>
                <p className="text-xs text-text-secondary">
                  Retrieving calibrated Bottom-Of-Atmosphere (BOA) surface reflectance tiles for {selectedReservoir.name}.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-navy-950 border border-ocean-800">
                  <div className="text-text-dim text-[10px]">BASELINE ACQUISITION</div>
                  <div className="text-base font-bold text-aqua mt-1">{selectedReservoir.baselineDate}</div>
                  <div className="text-[10px] text-text-dim">Unperturbed State</div>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 border border-ocean-800">
                  <div className="text-text-dim text-[10px]">LATEST ORBIT PASS</div>
                  <div className="text-base font-bold text-coral-alert mt-1">{selectedReservoir.latestDate}</div>
                  <div className="text-[10px] text-coral-alert/80">Suspected Anomaly</div>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 border border-ocean-800">
                  <div className="text-text-dim text-[10px]">SATELLITE SENSOR</div>
                  <div className="text-base font-bold text-white mt-1">Sentinel-2A/B MSI</div>
                  <div className="text-[10px] text-emerald-accent">10m Spatial Res</div>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950 border border-ocean-800">
                  <div className="text-text-dim text-[10px]">CLOUD OBSCURATION</div>
                  <div className="text-base font-bold text-emerald-accent mt-1">{selectedReservoir.cloudCoverPercent}%</div>
                  <div className="text-[10px] text-emerald-accent">s2cloudless Validated</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-ocean-900/60 border border-aqua/30 text-xs text-text-secondary font-mono space-y-2">
                <div className="text-white font-bold flex items-center gap-2">
                  <Radio className="w-4 h-4 text-aqua animate-pulse" />
                  <span>Telemetry Handshake with Copernicus Data Space Ecosystem Verified</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Both Level-2A multi-spectral rasters passed quality control. Atmospheric cirrus masking is complete. 
                  Ready for optical baseline difference calculation.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: COMPARE OBSERVATIONS */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-aqua font-bold uppercase">STEP 3 OF 7</span>
                <h4 className="text-xl font-bold font-display text-white">Compare Observations via Interactive Split Slider</h4>
                <p className="text-xs text-text-secondary">
                  Drag the central divider to inspect the visual and spectral contrast between clean water and the emerging bloom.
                </p>
              </div>

              {/* Slider Component */}
              <div className="relative h-[340px] rounded-xl overflow-hidden border border-ocean-700 select-none shadow-2xl">
                <div className="absolute inset-0 bg-navy-950">
                  <img src={selectedReservoir.anomalyImage} alt="Current" className="w-full h-full object-cover filter contrast-125 saturate-150" />
                  <div className="absolute top-3 right-3 bg-navy-950/90 text-coral-alert font-mono text-xs px-2.5 py-1 rounded border border-coral-alert/40">
                    LATEST: {selectedReservoir.latestDate}
                  </div>
                </div>

                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <img src={selectedReservoir.baselineImage} alt="Baseline" className="absolute inset-0 w-full h-full object-cover" style={{ width: '100%', minWidth: '600px' }} />
                  <div className="absolute top-3 left-3 bg-navy-950/90 text-aqua font-mono text-xs px-2.5 py-1 rounded border border-aqua/40">
                    BASELINE: {selectedReservoir.baselineDate}
                  </div>
                </div>

                <div className="absolute top-0 bottom-0 w-1 bg-aqua shadow-glow-aqua cursor-ew-resize flex items-center justify-center z-10" style={{ left: `${sliderPosition}%` }}>
                  <div className="w-6 h-6 rounded-full bg-navy-950 border-2 border-aqua text-aqua flex items-center justify-center text-[10px] font-bold">
                    ⇄
                  </div>
                </div>

                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                />

                <div className="absolute bottom-3 left-3 right-3 glass-panel px-3 py-1.5 rounded-lg border-ocean-700/80 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                  <span className="text-aqua">BASELINE WATER REFLECTANCE</span>
                  <span className="text-text-dim">DRAG SLIDER</span>
                  <span className="text-coral-alert">ANOMALY BLOOM</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: RUN AI ANALYSIS */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-aqua font-bold uppercase">STEP 4 OF 7</span>
                <h4 className="text-xl font-bold font-display text-white">Execute AquaDetect AI Anomaly Pipeline</h4>
                <p className="text-xs text-text-secondary">
                  Trigger unsupervised Isolation Forest and multi-spectral distance algorithms on the 10m pixel grid.
                </p>
              </div>

              {!isProcessing && !aiAnalysisComplete && (
                <div className="p-8 rounded-xl bg-navy-950/80 border border-ocean-700 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-aqua/20 text-aqua border border-aqua/40 flex items-center justify-center mx-auto">
                    <Scan className="w-8 h-8 animate-pulse" />
                  </div>
                  <h5 className="text-lg font-bold font-display text-white">Ready for Algorithmic Pipeline Run</h5>
                  <p className="text-xs text-text-dim max-w-md mx-auto">
                    The model will segment MNDWI water pixels, calculate NDCI chlorophyll indices, and identify pixels deviating beyond 3.5 sigma.
                  </p>
                  <button
                    onClick={handleRunAiAnalysis}
                    className="px-6 py-3 rounded-xl font-mono text-xs font-bold text-navy-950 bg-gradient-to-r from-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-2 mx-auto"
                  >
                    <Play className="w-4 h-4" />
                    <span>RUN AQUADETECT PIPELINE NOW</span>
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="glass-panel p-6 rounded-xl border-aqua/40 bg-ocean-900/90 shadow-glow-aqua/20 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-aqua font-bold">PIPELINE STAGE {processingStage + 1} OF 7</span>
                    <span className="text-text-dim">{Math.round(((processingStage + 1) / 7) * 100)}% COMPLETE</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-navy-950 border border-ocean-700 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-aqua to-electric transition-all duration-300"
                      style={{ width: `${((processingStage + 1) / 7) * 100}%` }}
                    />
                  </div>

                  <div className="p-3.5 rounded-lg bg-navy-950 font-mono text-xs text-white flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-aqua animate-ping" />
                    <span>{processingSteps[processingStage]}</span>
                  </div>
                </div>
              )}

              {aiAnalysisComplete && (
                <div className="p-6 rounded-xl bg-emerald-accent/10 border border-emerald-accent/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-accent font-mono text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>AI ANOMALY PIPELINE RUN COMPLETE — STATISTICAL DEVIATION CONFIRMED</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-mono">
                    Isolation Forest scored an anomaly density of <strong>95.8%</strong> across the eastern intake sector. 
                    Calculated affected area: <strong>{selectedReservoir.affectedAreaKm2} km²</strong>.
                  </p>
                  <button
                    onClick={handleNextStep}
                    className="px-4 py-2 rounded-lg bg-emerald-accent text-navy-950 font-bold font-mono text-xs hover:shadow-lg transition-all flex items-center gap-1.5"
                  >
                    <span>Proceed to Anomaly Inspection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: IDENTIFY ANOMALIES */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-aqua font-bold uppercase">STEP 5 OF 7</span>
                <h4 className="text-xl font-bold font-display text-white">Isolate Anomalous Spectral Footprint</h4>
                <p className="text-xs text-text-secondary">
                  Detailed inspection of anomalous pixels, affected catchment area, and spectral index metrics.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-navy-950 border border-coral-alert/40">
                  <div className="text-text-dim text-[10px]">ANOMALY CONFIDENCE</div>
                  <div className="text-xl font-bold text-coral-alert">{selectedReservoir.anomalyConfidence}%</div>
                  <div className="text-[10px] text-text-dim">Sigma &gt; 3.5 Deviation</div>
                </div>

                <div className="p-3 rounded-lg bg-navy-950 border border-ocean-800">
                  <div className="text-text-dim text-[10px]">AFFECTED WATER SURFACE</div>
                  <div className="text-xl font-bold text-white">{selectedReservoir.affectedAreaKm2} km²</div>
                  <div className="text-[10px] text-text-dim">{selectedReservoir.anomalousPixelsPercent}% total surface</div>
                </div>

                <div className="p-3 rounded-lg bg-navy-950 border border-ocean-800">
                  <div className="text-text-dim text-[10px]">NDCI INDEX (CHLOROPHYLL)</div>
                  <div className="text-xl font-bold text-aqua">+{selectedReservoir.ndci}</div>
                  <div className="text-[10px] text-coral-alert">Cyanobacteria Risk</div>
                </div>

                <div className="p-3 rounded-lg bg-navy-950 border border-ocean-800">
                  <div className="text-text-dim text-[10px]">TURBIDITY ESTIMATE</div>
                  <div className="text-xl font-bold text-amber-warning">~{selectedReservoir.turbidityNtuEstimate} NTU</div>
                  <div className="text-[10px] text-text-dim">Red Band Scattering</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-navy-950 border border-ocean-800 text-xs font-mono text-text-secondary leading-relaxed">
                <strong className="text-white block mb-1">Algorithmic Diagnostic Summary:</strong>
                {selectedReservoir.description}
              </div>
            </div>
          )}

          {/* STEP 6: GENERATE INVESTIGATION ALERT */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-coral-alert font-bold uppercase">STEP 6 OF 7</span>
                <h4 className="text-xl font-bold font-display text-white">Issue Official Environmental Incident Alert</h4>
                <p className="text-xs text-text-secondary">
                  Publishing high-priority triage incident to regional field verification dispatch.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-coral-alert/15 via-navy-950 to-amber-warning/15 border-2 border-coral-alert shadow-glow-coral/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-coral-alert">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                    <span className="text-sm font-mono font-bold tracking-wider">
                      URGENT FIELD INVESTIGATION DISPATCH ISSUED
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-coral-alert text-navy-950 font-bold">
                    PRIORITY 01
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white">
                  UNUSUAL WATER SPECTRAL CHANGE DETECTED
                </h3>

                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                  Satellite observations indicate an abrupt multi-spectral change that deviates sharply from the established 90-day baseline. 
                  Field verification is recommended to investigate the affected intake sector ({selectedReservoir.coordinates[0].toFixed(4)}° N, {selectedReservoir.coordinates[1].toFixed(4)}° W).
                </p>

                <div className="p-3 rounded-lg bg-navy-950/80 border border-ocean-800 font-mono text-xs flex justify-between">
                  <span className="text-text-dim">ASSIGNED TASKFORCE: Regional Water Quality Unit Alpha</span>
                  <span className="text-emerald-accent">STATUS: DISPATCH TRANSMITTED</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: GENERATE REPORT */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-accent font-bold uppercase">STEP 7 OF 7</span>
                <h4 className="text-xl font-bold font-display text-white">Investigation Evidence Dossier Generated</h4>
                <p className="text-xs text-text-secondary">
                  Complete evidence package compiled with satellite imagery, spectral deviations, and field testing protocol.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-navy-950/90 border border-aqua/40 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/40 flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <h5 className="text-lg font-bold font-display text-white">
                  Official Dossier AS-2026-{selectedReservoir.id} Ready for Export
                </h5>
                <p className="text-xs text-text-dim max-w-md mx-auto font-mono">
                  Contains certified Sentinel-2 spectral charts, GPS coordinates, uncertainty disclosures, and testing chain-of-custody.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleDownloadDemoPDF}
                    className="px-6 py-3 rounded-xl font-mono text-xs font-bold text-navy-950 bg-gradient-to-r from-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD INVESTIGATION DOSSIER (PDF)</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setIsProcessing(false);
                      setAiAnalysisComplete(false);
                    }}
                    className="px-4 py-3 rounded-xl font-mono text-xs text-text-secondary hover:text-white border border-ocean-700 bg-ocean-900 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart Walkthrough</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Controls Navigation */}
        <div className="p-4 bg-navy-950 border-t border-ocean-800 flex items-center justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-lg text-xs font-mono text-text-secondary border border-ocean-800 hover:text-white hover:bg-ocean-900 disabled:opacity-30 transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs font-mono text-text-dim">
            Step {currentStep} of 7
          </span>

          {currentStep < 7 ? (
            <button
              onClick={handleNextStep}
              className="px-5 py-2 rounded-lg text-xs font-mono font-bold text-navy-950 bg-gradient-to-r from-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-xs font-mono font-bold text-white bg-ocean-800 hover:bg-ocean-700 transition-all"
            >
              Close Walkthrough
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
