import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Send,
  AlertCircle
} from 'lucide-react';
import { INCIDENT_ALERTS, WATER_BODIES } from '../../../data/mockData';

export default function AquaAlertTab({ onNavigateTab, onSelectWaterBody }) {
  const [alerts, setAlerts] = useState(INCIDENT_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState(INCIDENT_ALERTS[0]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [newNoteText, setNewNoteText] = useState('');

  const filteredAlerts = alerts.filter(a => {
    if (statusFilter === 'ALL') return true;
    return a.status === statusFilter;
  });

  const handleUpdateStatus = (newStatus) => {
    const updated = alerts.map(a => {
      if (a.id === selectedAlert.id) {
        return { ...a, status: newStatus };
      }
      return a;
    });
    setAlerts(updated);
    setSelectedAlert(prev => ({ ...prev, status: newStatus }));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote = {
      author: "Officer On-Duty (HQ)",
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      text: newNoteText.trim()
    };

    const updated = alerts.map(a => {
      if (a.id === selectedAlert.id) {
        return { ...a, notes: [...(a.notes || []), newNote] };
      }
      return a;
    });

    setAlerts(updated);
    setSelectedAlert(prev => ({ ...prev, notes: [...(prev.notes || []), newNote] }));
    setNewNoteText('');
  };

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-coral-alert/20 text-coral-alert border border-coral-alert/40">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">AquaAlert: Environmental Incident Management</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-coral-alert border border-ocean-700">
              Field Triage Dispatch
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Dispatch physical sampling teams to satellite-detected coordinates, track laboratory chain-of-custody, and document field verification.
          </p>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-2">
          {['ALL', 'PENDING_VERIFICATION', 'IN_PROGRESS', 'VERIFIED_ANOMALY'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                statusFilter === status 
                  ? 'bg-aqua/20 text-aqua border border-aqua/40 font-semibold' 
                  : 'bg-navy-950 text-text-secondary border border-ocean-800 hover:text-white'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Alert List (5 cols) & Alert Detail Dossier (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Alerts Queue Feed */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white font-semibold">INCIDENT QUEUE ({filteredAlerts.length})</span>
            <span className="text-coral-alert font-bold">Priority Triage</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {filteredAlerts.map(alert => {
              const isSelected = selectedAlert.id === alert.id;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-ocean-800/90 border-coral-alert text-white shadow-glow-coral/20' 
                      : 'bg-navy-950/70 border-ocean-800 text-text-secondary hover:text-white hover:border-ocean-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950 text-text-dim border border-ocean-800">
                      {alert.id}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      alert.priority === 'CRITICAL' ? 'bg-coral-alert/20 text-coral-alert border border-coral-alert/40' : 'bg-amber-warning/20 text-amber-warning border border-amber-warning/40'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-display text-white mb-1">
                    {alert.waterBodyName}
                  </h4>

                  <div className="text-xs text-coral-alert font-mono mb-2">
                    {alert.category}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-text-dim pt-2 border-t border-ocean-800">
                    <span>{alert.affectedAreaKm2} km² affected</span>
                    <span className="text-emerald-accent">{alert.confidencePercent}% Confidence</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Investigation Management Dossier */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border-ocean-700/80 bg-ocean-900/50 space-y-6">
          
          {/* Dossier Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ocean-700/70 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-coral-alert/20 text-coral-alert border border-coral-alert/40 font-bold">
                  {selectedAlert.id}
                </span>
                <span className="text-xs font-mono text-text-dim">
                  TIMESTAMP: {selectedAlert.timestamp}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white mt-1">
                {selectedAlert.waterBodyName}
              </h3>
              <p className="text-xs text-text-dim font-mono flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-aqua" />
                <span>{selectedAlert.location}</span>
              </p>
            </div>

            {/* Change Status Dropdown */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono text-text-dim uppercase">INVESTIGATION STATUS</label>
              <select
                value={selectedAlert.status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="bg-navy-950 border border-ocean-700 rounded-lg px-3 py-1.5 text-xs text-coral-alert font-mono font-bold focus:outline-none focus:border-coral-alert"
              >
                <option value="PENDING_VERIFICATION">PENDING VERIFICATION</option>
                <option value="IN_PROGRESS">IN PROGRESS (TEAM DISPATCHED)</option>
                <option value="VERIFIED_ANOMALY">VERIFIED ANOMALY (FIELD CONFIRMED)</option>
                <option value="RESOLVED">RESOLVED (CLEARED)</option>
                <option value="FALSE_POSITIVE">FALSE POSITIVE (NATURAL VARIATION)</option>
              </select>
            </div>
          </div>

          {/* Assigned Officer & Evidence Summary */}
          <div className="p-4 rounded-xl bg-navy-950/80 border border-ocean-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-text-dim">ASSIGNED FIELD COMMANDER:</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-accent" />
                <span>{selectedAlert.assignedOfficer}</span>
              </span>
            </div>

            <div className="text-xs text-text-secondary leading-relaxed pt-2 border-t border-ocean-800">
              <strong className="text-white block mb-1">Automated Satellite Evidence Summary:</strong>
              {selectedAlert.evidenceSummary}
            </div>
          </div>

          {/* Recommended Field Verification Steps */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-aqua flex items-center gap-1.5 uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Standard Operational Field Protocols</span>
            </div>

            <div className="space-y-1.5">
              {selectedAlert.recommendedSteps.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-navy-950/60 border border-ocean-800 flex items-start gap-2.5 text-xs">
                  <span className="w-5 h-5 rounded bg-ocean-800 text-aqua font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="text-text-primary">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Field Log / Investigation Notes */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-white font-semibold flex items-center justify-between">
              <span>FIELD OBSERVATION LOG</span>
              <span className="text-text-dim">{selectedAlert.notes?.length || 0} Entries</span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {selectedAlert.notes?.map((n, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-navy-950 border border-ocean-800 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-text-dim">
                    <span className="text-aqua font-bold">{n.author}</span>
                    <span>{n.date}</span>
                  </div>
                  <div className="text-text-secondary font-sans text-xs">{n.text}</div>
                </div>
              ))}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input 
                type="text"
                placeholder="Log physical field observation or sample bottle barcode..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="flex-1 bg-navy-950 border border-ocean-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-text-dim focus:outline-none focus:border-aqua font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-ocean-800 hover:bg-ocean-700 border border-ocean-600 text-aqua font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>LOG</span>
              </button>
            </form>
          </div>

          {/* Quick Action Button: Export Investigation PDF Report */}
          <div className="pt-4 border-t border-ocean-700/70 flex items-center justify-between">
            <div className="text-[11px] font-mono text-text-dim">
              Chain-of-Custody Dossier Ready
            </div>
            <button
              onClick={() => onNavigateTab('reports')}
              className="px-5 py-2.5 rounded-lg font-mono text-xs font-bold text-navy-950 bg-gradient-to-r from-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>GENERATE OFFICIAL INVESTIGATION DOSSIER</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
