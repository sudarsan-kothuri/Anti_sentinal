import React from 'react';
import { TECH_STACK } from '../../data/mockData';
import { Server, Layers, Cpu, Database, Globe, ArrowRight, Sparkles } from 'lucide-react';

export default function TechStackSection({ onLaunchDashboard, onOpenDemo }) {
  return (
    <section className="py-24 bg-navy-950 border-t border-ocean-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-accent/10 border border-emerald-accent/30 text-emerald-accent text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>ENTERPRISE GEOSPATIAL STACK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Engineered for Planetary Scale Observation
          </h2>

          <p className="text-text-secondary text-base leading-relaxed">
            Built using cloud-native geospatial computation, accelerated deep learning pipelines, and responsive geospatial cartography.
          </p>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {TECH_STACK.map((tech, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-5 rounded-xl border-ocean-700/60 bg-ocean-900/40 hover:border-aqua/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-800 text-aqua border border-ocean-700">
                    {tech.category}
                  </span>
                  <span className="text-[10px] font-mono text-text-dim">
                    {tech.badge}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{tech.name}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Cinematic Hackathon Banner / CTA */}
        <div className="relative glass-panel rounded-3xl p-8 sm:p-14 border-aqua/40 bg-gradient-to-r from-ocean-900 via-navy-900 to-ocean-800 text-center overflow-hidden shadow-2xl">
          {/* Decorative ambient background glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-aqua/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-electric/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-block text-xs font-mono tracking-widest text-aqua uppercase">
              COPERNICUS EARTH INTELLIGENCE • HACKATHON EDITION
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight">
              "THE EARTH CANNOT SPEAK.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aqua via-electric to-emerald-accent">
                LET SATELLITE INTELLIGENCE HELP US LISTEN."
              </span>
            </h3>

            <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto leading-relaxed">
              Empower environmental custodians with multi-date orbital change detection and ground verification triage.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={onLaunchDashboard}
                className="px-8 py-4 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-aqua via-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-2"
              >
                <span>Launch Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDemo}
                className="px-6 py-4 rounded-xl font-mono text-xs font-semibold text-coral-alert border border-coral-alert/50 bg-coral-alert/10 hover:bg-coral-alert/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Judges Demo Scenario</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
