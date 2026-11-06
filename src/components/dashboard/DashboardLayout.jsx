import React from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import OverviewTab from './modules/OverviewTab';
import AquaDetectTab from './modules/AquaDetectTab';
import AquaTrackTab from './modules/AquaTrackTab';
import AquaPredictTab from './modules/AquaPredictTab';
import AquaAlertTab from './modules/AquaAlertTab';
import ReportsTab from './modules/ReportsTab';
import WaterBodiesTab from './modules/WaterBodiesTab';
import SatelliteObservationsTab from './modules/SatelliteObservationsTab';
import SettingsTab from './modules/SettingsTab';

export default function DashboardLayout({
  activeTab,
  setActiveTab,
  selectedWaterBody,
  setSelectedWaterBody,
  waterBodies,
  onOpenDemo,
  onBackToLanding
}) {
  return (
    <div className="min-h-screen bg-navy-950 text-text-primary flex flex-col overflow-hidden">
      
      {/* Top Command Bar */}
      <TopBar 
        selectedWaterBody={selectedWaterBody}
        onSelectWaterBody={setSelectedWaterBody}
        waterBodies={waterBodies}
        onOpenDemo={onOpenDemo}
        onBackToLanding={onBackToLanding}
        onNavigateTab={setActiveTab}
      />

      {/* Main Split: Left Sidebar & Tab Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenDemo={onOpenDemo}
        />

        {/* Tab Module Workspace */}
        <main className="flex-1 overflow-y-auto bg-navy-900/40 relative">
          
          {activeTab === 'overview' && (
            <OverviewTab 
              waterBodies={waterBodies}
              selectedWaterBody={selectedWaterBody}
              onSelectWaterBody={setSelectedWaterBody}
              onNavigateTab={setActiveTab}
              onOpenDemo={onOpenDemo}
            />
          )}

          {activeTab === 'detect' && (
            <AquaDetectTab 
              waterBodies={waterBodies}
              selectedWaterBody={selectedWaterBody}
              onSelectWaterBody={setSelectedWaterBody}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'track' && (
            <AquaTrackTab 
              waterBodies={waterBodies}
              selectedWaterBody={selectedWaterBody}
              onSelectWaterBody={setSelectedWaterBody}
            />
          )}

          {activeTab === 'predict' && (
            <AquaPredictTab 
              waterBodies={waterBodies}
              selectedWaterBody={selectedWaterBody}
              onSelectWaterBody={setSelectedWaterBody}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'alert' && (
            <AquaAlertTab 
              onNavigateTab={setActiveTab}
              onSelectWaterBody={setSelectedWaterBody}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab 
              selectedWaterBody={selectedWaterBody}
              waterBodies={waterBodies}
              onSelectWaterBody={setSelectedWaterBody}
            />
          )}

          {activeTab === 'waterbodies' && (
            <WaterBodiesTab 
              waterBodies={waterBodies}
              selectedWaterBody={selectedWaterBody}
              onSelectWaterBody={setSelectedWaterBody}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'satellite' && (
            <SatelliteObservationsTab 
              selectedWaterBody={selectedWaterBody}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab />
          )}

        </main>

      </div>

    </div>
  );
}
