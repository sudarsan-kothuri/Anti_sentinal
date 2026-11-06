import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  FlaskConical, 
  Satellite, 
  Eye, 
  TrendingUp, 
  ArrowRight,
  Scan,
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function MissionSection({ onLaunchModule }) {
  const pillars = [
    {
      id: "detect",
      title: "AquaDetect",
      sub: "AI Anomaly Detection",
      desc: "Multispectral band ratios (B2-B12) and unsupervised Isolation Forest models isolate subtle reflectance anomalies caused by algal blooms, sediment shifts, or surfactant slicks.",
      icon: Scan,
      badge: "Sentinel-2 MSI",
      color: "border-aqua/40 text-aqua"
    },
    {
      id: "track",
      title: "AquaTrack",
      sub: "Pollution Evolution",
      desc: "Temporal trajectory modeling compares observations across orbits to distinguish transient turbid runoff from persisting degradation and map dispersion corridors.",
      icon: TrendingUp,
      badge: "Multi-Temporal",
      color: "border-electric/40 text-electric"
    },
    {
      id: "predict",
      title: "AquaPredict",
      sub: "Risk Intelligence",
      desc: "Integrates catchment precipitation data, seasonal temperature trends, and watershed topography to forecast 30-day environmental vulnerability index.",
      icon: Compass,
      badge: "Risk Modeling",
      color: "border-emerald-accent/40 text-emerald-accent"
    },
    {
      id: "alert",
      title: "AquaAlert",
      sub: "Environmental Response",
      desc: "Automatically prioritizes high-confidence anomalies and compiles GIS-referenced dossiers to dispatch local environmental testing teams with exact GPS coordinates.",
      icon: ShieldCheck,
      badge: "Field Dispatch",
      color: "border-coral-alert/40 text-coral-alert"
    }
  ];

  return (
    <section id="mission" className="py-24 bg-navy-950/70 border-t border-ocean-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua/10 border border-aqua/30 text-aqua text-xs font-mono">
            <Eye className="w-3.5 h-3.5" />
            <span>SEE BEYOND THE SURFACE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Bridging the Critical Gap Between Satellite Eyes & Ground Truth
          </h2>

          <p className="text-text-secondary text-base leading-relaxed">
            Traditional physical testing takes days and leaves vast lakes unmonitored between visits. 
            AquaSentinel continuously screens from orbit to direct physical inspectors to the exact coordinates where anomalous behavior occurs.
          </p>
        </div>

        {/* Scientific Responsibility Callout Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-aqua/30 bg-ocean-900/60 shadow-glass-panel mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-aqua/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-amber-warning text-xs font-mono uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-warning" />
                <span>Foundational Scientific Protocol</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                Satellites Detect Spectral Anomalies — Field Crews Confirm Chemical Chemistry
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Optical remote sensors measure electromagnetic reflectance at distinct wavelengths (visible, red-edge, NIR, SWIR). 
                While spectral deviations correlate with chlorophyll-a, cyanobacteria phycocyanin, and suspended particulates, 
                they cannot determine molecular toxicity (e.g. heavy metal speciation or exact microcystin ppb). 
                AquaSentinel quantifies uncertainty, flags remote indicators, and provides prioritized triage for ground teams.
              </p>
            </div>

            <div className="md:col-span-4 bg-navy-950/80 p-5 rounded-xl border border-ocean-700/80 space-y-3 font-mono text-xs">
              <div className="text-text-dim text-[11px] uppercase tracking-wider">Dual-Tier Verification Pipeline</div>
              <div className="flex items-center gap-2 text-aqua">
                <Satellite className="w-4 h-4" />
                <span>Tier 1: Spaceborne Screening</span>
              </div>
              <div className="text-text-secondary pl-6 text-[11px]">
                5-day orbit revisit • 10m spatial resolution • Multispectral indices
              </div>
              <div className="flex items-center gap-2 text-emerald-accent pt-1">
                <FlaskConical className="w-4 h-4" />
                <span>Tier 2: In-Situ Chemical Assay</span>
              </div>
              <div className="text-text-secondary pl-6 text-[11px]">
                Physical water grab samples • Laboratory spectrometry • Legal compliance
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.id}
                onClick={() => onLaunchModule(pillar.id)}
                className="glass-panel p-6 rounded-xl border-ocean-700/80 hover:border-aqua/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-navy-900 border border-ocean-700 text-aqua group-hover:border-aqua/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-800 text-text-secondary border border-ocean-700">
                      {pillar.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-display font-bold text-white group-hover:text-aqua transition-colors">
                    {pillar.title}
                  </h4>
                  <div className="text-xs text-text-dim font-mono mb-3">{pillar.sub}</div>

                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-ocean-800 flex items-center justify-between text-xs font-mono text-aqua group-hover:text-white transition-colors">
                  <span>LAUNCH MODULE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
