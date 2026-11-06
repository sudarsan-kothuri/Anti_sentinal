import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { 
  Compass, 
  Scan, 
  Activity, 
  BrainCircuit, 
  ShieldAlert, 
  Layers, 
  Sparkles, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  Terminal
} from 'lucide-react';

export default function Header({ 
  currentView, 
  setCurrentView, 
  activeTab, 
  setActiveTab, 
  onOpenDemo,
  onOpenAuth
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", tab: "overview", icon: Compass },
    { label: "AquaDetect", tab: "detect", icon: Scan },
    { label: "AquaTrack", tab: "track", icon: Activity },
    { label: "AquaPredict", tab: "predict", icon: BrainCircuit },
    { label: "AquaAlert", tab: "alert", icon: ShieldAlert },
  ];

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setCurrentView('dashboard');
    setMobileMenuOpen(false);
  };

  const handleScrollToSection = (sectionId) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView === 'dashboard' 
          ? 'bg-navy-950/85 backdrop-blur-xl border-b border-ocean-700/60 shadow-glass-panel py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div onClick={() => setCurrentView('landing')} className="cursor-pointer">
          <Logo size="default" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-ocean-900/60 p-1.5 rounded-full border border-ocean-700/70 backdrop-blur-md">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              currentView === 'landing' 
                ? 'bg-aqua/20 text-aqua border border-aqua/40 shadow-glow-aqua/30' 
                : 'text-text-secondary hover:text-white hover:bg-ocean-800/60'
            }`}
          >
            Home / Mission
          </button>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentView === 'dashboard' && activeTab === link.tab;
            return (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-aqua/20 to-electric/20 text-aqua border border-aqua/40' 
                    : 'text-text-secondary hover:text-white hover:bg-ocean-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleScrollToSection('methodology')}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-text-secondary hover:text-white hover:bg-ocean-800/50 transition-all"
          >
            Methodology
          </button>
          
          <button
            onClick={() => handleScrollToSection('about')}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-text-secondary hover:text-white hover:bg-ocean-800/50 transition-all"
          >
            About
          </button>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* WOW Demo Trigger Button */}
          <button
            onClick={onOpenDemo}
            className="relative group overflow-hidden px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wide text-coral-alert border border-coral-alert/40 bg-coral-alert/10 hover:bg-coral-alert/20 transition-all flex items-center gap-1.5 shadow-glow-coral/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-coral-alert animate-spin" style={{ animationDuration: '6s' }} />
            <span>JUDGES DEMO SCENARIO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-coral-alert animate-ping" />
          </button>

          <button
            onClick={onOpenAuth}
            className="text-xs font-medium text-text-secondary hover:text-white px-3 py-1.5 transition-colors"
          >
            Sign In
          </button>

          {currentView === 'landing' ? (
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setActiveTab('overview');
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-navy-950 bg-gradient-to-r from-aqua via-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-1.5"
            >
              <span>Launch Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('landing')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-aqua bg-ocean-800 border border-aqua/40 hover:bg-ocean-700 transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-aqua" />
              <span>Landing View</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenDemo}
            className="px-2 py-1 rounded text-[11px] font-mono text-coral-alert border border-coral-alert/40 bg-coral-alert/10"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-text-secondary hover:text-white bg-ocean-900 border border-ocean-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-aqua" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dropdown border-b border-ocean-700 px-4 py-5 mt-2 space-y-3">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-ocean-800"
            >
              Home / Mission
            </button>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.tab}
                  onClick={() => handleNavClick(link.tab)}
                  className="flex items-center gap-2.5 text-left px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-aqua hover:bg-ocean-800"
                >
                  <Icon className="w-4 h-4 text-aqua" />
                  <span>{link.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleScrollToSection('methodology')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white"
            >
              Scientific Methodology
            </button>
            <button
              onClick={() => handleScrollToSection('about')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white"
            >
              About Platform
            </button>
          </div>

          <div className="pt-3 border-t border-ocean-700 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg text-xs font-mono font-bold text-coral-alert bg-coral-alert/15 border border-coral-alert/50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>JUDGES DEMO SCENARIO</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setActiveTab('overview');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-navy-950 bg-gradient-to-r from-aqua to-electric text-center"
            >
              Launch Dashboard Command Center
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
