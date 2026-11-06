import React from 'react';
import Earth3D from './Earth3D';
import { 
  Sparkles, 
  Satellite, 
  ArrowRight, 
  Activity, 
  ShieldAlert, 
  ChevronDown, 
  Radar, 
  Globe2,
  Database,
  Layers
} from 'lucide-react';
import { SYSTEM_STATS } from '../../data/mockData';

export default function LandingHero({ onLaunchDashboard, onOpenDemo }) {
  const scrollToExplore = () => {
    const el = document.getElementById('mission');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between bg-scientific-grid overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-aqua/15 via-electric/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Upper Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ocean-900/90 border border-aqua/30 text-aqua shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-aqua animate-ping" />
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">
                NEXT-GENERATION ENVIRONMENTAL INTELLIGENCE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-white">
              THE FUTURE OF{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aqua via-electric to-emerald-accent text-glow-aqua">
                WATER PROTECTION
              </span>{' '}
              STARTS FROM SPACE.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl font-normal">
              Monitor Earth's water bodies through satellite intelligence. Detect unusual spectral changes, 
              understand environmental trends, and guide authorities toward locations that deserve investigation.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onLaunchDashboard}
                className="group relative px-6 py-3.5 rounded-xl font-semibold text-sm text-navy-950 bg-gradient-to-r from-aqua via-aqua to-electric hover:shadow-glow-aqua transition-all duration-300 flex items-center gap-2"
              >
                <span>Explore Intelligence</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onLaunchDashboard}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-text-primary bg-ocean-800/80 hover:bg-ocean-700/80 border border-ocean-600 hover:border-aqua/50 transition-all flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-aqua animate-pulse" />
                <span>View Live Monitoring</span>
              </button>
            </div>

            {/* Quick Demonstration Link */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenDemo}
                className="text-xs font-mono text-coral-alert hover:underline flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Experience Interactive 7-Step Anomaly Demo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Floating Scientific Statistics Bar */}
            <div className="pt-6 border-t border-ocean-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-navy-900/60 border border-ocean-700/50">
                <span className="block text-[11px] font-mono text-text-dim uppercase">Monitored Bodies</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-white">{SYSTEM_STATS.monitoredBodies}</span>
                <span className="text-[10px] text-aqua block font-mono">10m Res / Global</span>
              </div>

              <div className="p-3 rounded-lg bg-navy-900/60 border border-ocean-700/50">
                <span className="block text-[11px] font-mono text-text-dim uppercase">Observations</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-electric">{SYSTEM_STATS.totalObservations}</span>
                <span className="text-[10px] text-text-secondary block font-mono">Sentinel-2 L2A</span>
              </div>

              <div className="p-3 rounded-lg bg-navy-900/60 border border-ocean-700/50">
                <span className="block text-[11px] font-mono text-text-dim uppercase">Active Anomalies</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-amber-warning">{SYSTEM_STATS.detectedAnomalies}</span>
                <span className="text-[10px] text-amber-warning/80 block font-mono">Spectral Shifts</span>
              </div>

              <div className="p-3 rounded-lg bg-navy-900/60 border border-ocean-700/50">
                <span className="block text-[11px] font-mono text-text-dim uppercase">Field Priorities</span>
                <span className="text-xl sm:text-2xl font-bold font-display text-coral-alert">0{SYSTEM_STATS.priorityInvestigations}</span>
                <span className="text-[10px] text-coral-alert/80 block font-mono">Action Required</span>
              </div>
            </div>

            {/* Scientific disclaimer label */}
            <div className="text-[11px] font-mono text-text-dim flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-aqua" />
              <span>*Demo figures & telemetry presented as illustrative sample datasets for evaluation.</span>
            </div>

          </div>

          {/* Right Column: 3D Earth Experience */}
          <div className="lg:col-span-6 relative flex justify-center">
            <Earth3D />
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-8 cursor-pointer" onClick={scrollToExplore}>
        <span className="text-[11px] font-mono tracking-widest text-text-dim uppercase hover:text-aqua transition-colors">
          SCROLL TO EXPLORE ARCHITECTURE
        </span>
        <ChevronDown className="w-4 h-4 text-aqua animate-bounce mt-1" />
      </div>

    </section>
  );
}
