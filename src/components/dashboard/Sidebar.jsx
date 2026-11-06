import React from 'react';
import { 
  Compass, 
  Scan, 
  Activity, 
  BrainCircuit, 
  ShieldAlert, 
  FileText, 
  Sliders, 
  Sparkles, 
  Waves, 
  Satellite,
  ChevronRight,
  Database
} from 'lucide-react';
import { INCIDENT_ALERTS, WATER_BODIES } from '../../data/mockData';

export default function Sidebar({ activeTab, setActiveTab, onOpenDemo }) {
  const primaryNav = [
    { id: 'overview', label: 'Overview', icon: Compass, badge: null },
    { id: 'waterbodies', label: 'Water Bodies', icon: Waves, badge: `${WATER_BODIES.length}` },
    { id: 'satellite', label: 'Observations', icon: Satellite, badge: 'S2A/B' },
    { id: 'detect', label: 'AquaDetect', icon: Scan, badge: 'AI' },
    { id: 'track', label: 'AquaTrack', icon: Activity, badge: 'Temporal' },
    { id: 'predict', label: 'AquaPredict', icon: BrainCircuit, badge: 'Risk' },
    { id: 'alert', label: 'AquaAlert', icon: ShieldAlert, badge: `${INCIDENT_ALERTS.length} Active`, alertStyle: true },
    { id: 'reports', label: 'Investigation Reports', icon: FileText, badge: 'PDF' },
    { id: 'settings', label: 'Settings', icon: Sliders, badge: null }
  ];

  return (
    <aside className="w-64 bg-navy-950 border-r border-ocean-800/80 flex flex-col justify-between h-[calc(100vh-4rem)] p-3 select-none flex-shrink-0">
      
      {/* Navigation Links */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-text-dim uppercase">
          INTELLIGENCE COMMAND
        </div>

        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-aqua/20 to-electric/15 text-white border border-aqua/40 shadow-glow-aqua/10 font-semibold'
                  : 'text-text-secondary hover:text-white hover:bg-ocean-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-aqua' : 'text-text-dim group-hover:text-aqua'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                  item.alertStyle 
                    ? 'bg-coral-alert/20 text-coral-alert border border-coral-alert/30 font-bold animate-pulse'
                    : isActive 
                      ? 'bg-aqua/20 text-aqua border border-aqua/30' 
                      : 'bg-ocean-800 text-text-dim'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Panel: Dedicated WOW Judges Demonstration Launcher */}
      <div className="pt-3 border-t border-ocean-800 space-y-2">
        <div className="p-3 rounded-xl bg-gradient-to-b from-ocean-900/80 to-navy-900 border border-coral-alert/40 shadow-glow-coral/10">
          <div className="flex items-center gap-2 text-coral-alert text-xs font-mono font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>JUDGES' WOW MOMENT</span>
          </div>
          <p className="text-[11px] text-text-secondary leading-snug mb-2.5">
            Guided 7-step reservoir investigation scenario with satellite comparison & report export.
          </p>
          <button
            onClick={onOpenDemo}
            className="w-full py-2 rounded-lg font-mono text-xs font-bold text-navy-950 bg-gradient-to-r from-coral-alert via-coral-alert to-amber-warning hover:shadow-glow-coral transition-all flex items-center justify-center gap-1.5"
          >
            <span>LAUNCH SCENARIO</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-[10px] font-mono text-text-dim text-center py-1">
          Copernicus MSI v2.4 • 10m Res
        </div>
      </div>

    </aside>
  );
}
