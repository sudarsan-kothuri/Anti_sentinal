import React from 'react';
import Logo from './Logo';
import { Satellite, Globe2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-ocean-800 text-xs text-text-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-3">
            <Logo size="default" showTagline={true} />
            <p className="text-xs text-text-dim max-w-sm leading-relaxed pt-2">
              Next-generation AI-powered remote sensing platform identifying spectral water-quality anomalies to guide environmental field investigations.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 font-mono text-[11px]">
            <div className="text-white font-semibold uppercase tracking-wider">Earth Observation Feeds</div>
            <div className="text-text-dim flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-aqua" />
              <span>ESA Copernicus Sentinel-2 MSI Level-2A</span>
            </div>
            <div className="text-text-dim flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-electric" />
              <span>USGS / NASA Landsat-9 Surface Reflectance</span>
            </div>
            <div className="text-text-dim flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-accent" />
              <span>Google Earth Engine Planetary Catalog</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 font-mono text-[11px]">
            <div className="text-white font-semibold uppercase tracking-wider">Platform Integrity</div>
            <p className="text-text-dim leading-relaxed">
              Remote sensing indicators do not substitute chemical assays. Laboratory and in-situ field verification are required for official regulatory enforcement.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-ocean-800/60 flex flex-col sm:flex-row items-center justify-between text-text-dim text-[11px] font-mono gap-4">
          <div>
            © 2026 AquaSentinel Platform. Built for Environmental Protection & Open Science.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-aqua">Status: Sentinel-2 Synchronized</span>
            <span>Latency: 42ms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
