import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import LandingHero from './components/landing/LandingHero';
import MissionSection from './components/landing/MissionSection';
import MethodologySection from './components/landing/MethodologySection';
import TechStackSection from './components/landing/TechStackSection';
import Footer from './components/common/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import JudgesDemoModal from './components/demo/JudgesDemoModal';
import AuthModal from './components/common/AuthModal';
import { useDatabase } from './context/DatabaseContext';

export default function App() {
  const { waterBodies } = useDatabase();
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWaterBody, setSelectedWaterBody] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    if (waterBodies && waterBodies.length > 0 && !selectedWaterBody) {
      const defaultBasin = waterBodies.find(wb => wb.id === 'WB-06') || waterBodies[0];
      setSelectedWaterBody(defaultBasin);
    }
  }, [waterBodies, selectedWaterBody]);

  const handleLaunchDashboard = () => {
    setCurrentView('dashboard');
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchModule = (moduleId) => {
    setCurrentView('dashboard');
    setActiveTab(moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentBasin = selectedWaterBody || waterBodies[0] || {};

  return (
    <div className="min-h-screen bg-[#06131D] text-[#EDF8FA] antialiased selection:bg-[#20D9D0]/30 selection:text-white">
      
      {/* Navigation Header (Displayed in both views) */}
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main View Switcher */}
      {currentView === 'landing' ? (
        <main>
          {/* Hero Section with 3D Rotating Earth */}
          <LandingHero 
            onLaunchDashboard={handleLaunchDashboard}
            onOpenDemo={() => setIsDemoOpen(true)}
          />

          {/* Mission & Scientific Responsibility */}
          <MissionSection 
            onLaunchModule={handleLaunchModule}
          />

          {/* Scientific Methodology Pipeline */}
          <MethodologySection />

          {/* Technology Stack & Hackathon Banner */}
          <TechStackSection 
            onLaunchDashboard={handleLaunchDashboard}
            onOpenDemo={() => setIsDemoOpen(true)}
          />

          {/* Footer */}
          <Footer />
        </main>
      ) : (
        <div className="pt-16">
          <DashboardLayout 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedWaterBody={currentBasin}
            setSelectedWaterBody={setSelectedWaterBody}
            waterBodies={waterBodies}
            onOpenDemo={() => setIsDemoOpen(true)}
            onBackToLanding={handleBackToLanding}
          />
        </div>
      )}

      {/* Dedicated Judges' WOW Moment 7-Step Interactive Modal */}
      <JudgesDemoModal 
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

    </div>
  );
}
