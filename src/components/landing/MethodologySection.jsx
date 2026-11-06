import React, { useState } from 'react';
import { METHODOLOGY_STEPS } from '../../data/mockData';
import { 
  Binary, 
  Cpu, 
  Waves, 
  Sparkles, 
  ChevronRight, 
  Activity, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function MethodologySection() {
  const [selectedStep, setSelectedStep] = useState(0);

  const formulas = [
    {
      name: "NDWI (Normalized Difference Water Index)",
      formula: "NDWI = (Band 3 [Green] - Band 8 [NIR]) / (Band 3 + Band 8)",
      desc: "Distinguishes open water surfaces from vegetation canopy and soil moisture."
    },
    {
      name: "MNDWI (Modified Normalized Difference Water Index)",
      formula: "MNDWI = (Band 3 [Green] - Band 11 [SWIR1]) / (Band 3 + Band 11)",
      desc: "Suppresses built-up urban structures and shadow artifacts to reliably segment complex shorelines."
    },
    {
      name: "NDCI (Normalized Difference Chlorophyll Index)",
      formula: "NDCI = (Band 5 [Red Edge 705nm] - Band 4 [Red 665nm]) / (Band 5 + Band 4)",
      desc: "Highly sensitive to chlorophyll-a absorption and scattering, standard indicator for harmful cyanobacteria."
    }
  ];

  return (
    <section id="methodology" className="py-24 bg-navy-900/60 border-t border-ocean-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/30 text-electric text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>RIGOROUS SCIENTIFIC PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            From Raw Photons to Actionable Environmental Triage
          </h2>

          <p className="text-text-secondary text-base leading-relaxed">
            Every observation passes through rigorous radiometric calibration, sub-pixel atmospheric correction, 
            multivariate machine learning, and temporal baseline subtraction.
          </p>
        </div>

        {/* Step-by-Step Interactive Pipeline Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Step Selector Buttons */}
          <div className="lg:col-span-5 space-y-2">
            {METHODOLOGY_STEPS.map((item, idx) => (
              <button
                key={item.step}
                onClick={() => setSelectedStep(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedStep === idx 
                    ? 'bg-ocean-800/90 border-aqua text-white shadow-glow-aqua/10' 
                    : 'bg-navy-950/60 border-ocean-800/70 text-text-secondary hover:text-white hover:bg-ocean-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs px-2 py-1 rounded ${
                    selectedStep === idx ? 'bg-aqua text-navy-950 font-bold' : 'bg-ocean-800 text-text-dim'
                  }`}>
                    {item.step}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-[11px] font-mono text-text-dim">{item.tag}</div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedStep === idx ? 'text-aqua translate-x-1' : 'text-text-dim'}`} />
              </button>
            ))}
          </div>

          {/* Right Detailed Methodology Inspector Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border-aqua/30 bg-ocean-900/80 shadow-glass-panel relative">
            <div className="flex items-center justify-between pb-4 border-b border-ocean-700/60 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-aqua/15 text-aqua border border-aqua/30">
                  PIPELINE PHASE {METHODOLOGY_STEPS[selectedStep].step} OF 07
                </span>
                <span className="text-xs font-mono text-text-dim">
                  {METHODOLOGY_STEPS[selectedStep].tag}
                </span>
              </div>
              <Activity className="w-4 h-4 text-aqua animate-pulse" />
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-4">
              {METHODOLOGY_STEPS[selectedStep].title}
            </h3>

            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {METHODOLOGY_STEPS[selectedStep].description}
            </p>

            {/* Scientific Formulas Highlight */}
            <div className="space-y-3 pt-4 border-t border-ocean-800">
              <div className="text-xs font-mono text-aqua flex items-center gap-1.5 uppercase tracking-wider">
                <Binary className="w-3.5 h-3.5" />
                <span>Multispectral Indices Utilized</span>
              </div>

              {formulas.map((f, i) => (
                <div key={i} className="p-3 rounded-lg bg-navy-950/80 border border-ocean-800 font-mono text-xs">
                  <div className="text-white font-semibold flex items-center justify-between mb-1">
                    <span>{f.name}</span>
                    <span className="text-[10px] text-text-dim">Sentinel-2 Bands</span>
                  </div>
                  <div className="text-aqua bg-ocean-900/80 px-2 py-1 rounded my-1 font-mono text-[11px] overflow-x-auto">
                    {f.formula}
                  </div>
                  <div className="text-[11px] text-text-dim font-sans">{f.desc}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
