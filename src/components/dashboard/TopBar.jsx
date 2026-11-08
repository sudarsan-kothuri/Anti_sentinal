import React, { useState, useEffect } from 'react';
import Logo from '../common/Logo';
import { 
  Satellite, 
  Search, 
  Bell, 
  RefreshCw, 
  Globe2, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert,
  ChevronDown,
  User,
  Sliders,
  ExternalLink,
  Database
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export default function TopBar({ 
  selectedWaterBody, 
  onSelectWaterBody, 
  waterBodies, 
  onOpenDemo,
  onBackToLanding,
  onNavigateTab
}) {
  const { alerts, connectionStatus, refreshData } = useDatabase();
  const [currentUtcTime, setCurrentUtcTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSyncData = () => {
    setIsSyncing(true);
    refreshData();
    setTimeout(() => {
      setIsSyncing(false);
    }, 800);
  };

  const filteredWaterBodies = (waterBodies || []).filter(wb => 
    wb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wb.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-16 bg-navy-950 border-b border-ocean-700/80 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      
      {/* Left: Logo & Constellation Status */}
      <div className="flex items-center gap-6">
        <div onClick={onBackToLanding} className="cursor-pointer">
          <Logo size="small" />
        </div>

        {/* Constellation Live Telemetry Pill */}
        <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-full bg-ocean-900 border border-ocean-700/70 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-aqua">
            <Satellite className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-semibold">SENTINEL-2 MSI</span>
          </div>
          <span className="text-ocean-600">|</span>
          <div className="flex items-center gap-1.5 text-emerald-accent">
            <Database className="w-3 h-3 text-emerald-accent animate-pulse" />
            <span className="text-[11px] font-semibold">DB: {connectionStatus.isCloud ? "SUPABASE POSTGRES" : "ACTIVE PERSISTENT"}</span>
          </div>
          <span className="text-ocean-600">|</span>
          <span className="text-text-dim text-[11px]">{currentUtcTime || "SYNCING UTC CLOCK..."}</span>
        </div>
      </div>

      {/* Middle: Universal Water Body Search Bar */}
      <div className="relative max-w-xs sm:max-w-md w-full mx-4">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-text-dim absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search reservoir, catchment, or lake coordinates..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-ocean-900/90 border border-ocean-700 text-xs text-text-primary placeholder:text-text-dim focus:outline-none focus:border-aqua font-mono"
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchQuery.length > 0 && (
          <div className="absolute top-10 left-0 right-0 glass-dropdown rounded-lg shadow-2xl p-2 z-50 max-h-64 overflow-y-auto border-ocean-700">
            {filteredWaterBodies.length > 0 ? (
              filteredWaterBodies.map(wb => (
                <div
                  key={wb.id}
                  onClick={() => {
                    onSelectWaterBody(wb);
                    setSearchQuery('');
                    setShowSearchResults(false);
                  }}
                  className="p-2 rounded hover:bg-ocean-800 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="text-xs font-semibold text-white">{wb.name}</div>
                    <div className="text-[10px] text-text-dim font-mono">{wb.region}</div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    wb.status === 'CRITICAL_ANOMALY' 
                      ? 'bg-coral-alert/20 text-coral-alert border border-coral-alert/40' 
                      : 'bg-amber-warning/20 text-amber-warning border border-amber-warning/40'
                  }`}>
                    Risk {wb.riskScore}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-3 text-xs text-text-dim text-center font-mono">
                No matching water bodies found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Actions, Sync, Notification, User Profile */}
      <div className="flex items-center gap-3">
        
        {/* Judges Demo Shortcut Button */}
        <button
          onClick={onOpenDemo}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-coral-alert bg-coral-alert/15 border border-coral-alert/50 hover:bg-coral-alert/25 shadow-glow-coral/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>RUN DEMO</span>
        </button>

        {/* Sync Database & Satellite Feeds Button */}
        <button
          onClick={handleSyncData}
          title="Force Database & Telemetry Sync"
          className="p-2 rounded-lg bg-ocean-900 border border-ocean-700 text-text-secondary hover:text-aqua hover:border-aqua/50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-aqua' : ''}`} />
        </button>

        {/* Notifications Bell with dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-ocean-900 border border-ocean-700 text-text-secondary hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral-alert text-[9px] font-mono font-bold text-white flex items-center justify-center animate-pulse">
              {(alerts || []).length}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 glass-dropdown rounded-xl shadow-2xl p-3 z-50 border-ocean-700 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-ocean-800 text-xs font-mono">
                <span className="text-white font-bold">ACTIVE INCIDENT ALERTS</span>
                <span className="text-coral-alert">{(alerts || []).length} IN DATABASE</span>
              </div>
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {(alerts || []).map(alert => (
                  <div 
                    key={alert.id}
                    onClick={() => {
                      onNavigateTab('alert');
                      setShowNotifications(false);
                    }}
                    className="p-2 rounded bg-navy-950/80 border border-ocean-800 hover:border-aqua/40 cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                      <span className="text-coral-alert font-bold">{alert.priority}</span>
                      <span className="text-text-dim">{alert.id}</span>
                    </div>
                    <div className="font-semibold text-white truncate">{alert.waterBodyName}</div>
                    <div className="text-[11px] text-text-secondary line-clamp-1">{alert.category}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  onNavigateTab('alert');
                  setShowNotifications(false);
                }}
                className="w-full py-1.5 rounded bg-ocean-800 text-center text-xs font-mono text-aqua hover:bg-ocean-700 transition-colors"
              >
                OPEN ALERT MANAGEMENT
              </button>
            </div>
          )}
        </div>

        {/* User Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-ocean-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-aqua/30 to-electric/30 border border-aqua/40 flex items-center justify-center text-aqua font-bold text-xs font-mono">
            HQ
          </div>
          <div className="hidden lg:block text-left text-xs font-mono">
            <div className="text-white font-semibold leading-tight">Copernicus Hub</div>
            <div className="text-[10px] text-emerald-accent">AUTHORIZED SCIENTIST</div>
          </div>
        </div>

      </div>

    </header>
  );
}
