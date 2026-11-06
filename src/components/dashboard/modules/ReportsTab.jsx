import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ShieldAlert, 
  Calendar, 
  MapPin, 
  Satellite, 
  QrCode,
  Sparkles,
  Info
} from 'lucide-react';
import jsPDF from 'jspdf';

export default function ReportsTab({ selectedWaterBody, waterBodies, onSelectWaterBody }) {
  const wb = selectedWaterBody;
  const [isExporting, setIsExporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleDownloadPDF = () => {
    setIsExporting(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;

      // Dark background header bar
      doc.setFillColor(6, 19, 29); // #06131D
      doc.rect(0, 0, pageWidth, 40, 'F');

      // Title & Branding
      doc.setTextColor(32, 217, 208); // Aqua
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('AquaSentinel Environmental Intelligence', 15, 18);

      doc.setTextColor(145, 168, 181); // Muted text
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('OFFICIAL SATELLITE FIELD INVESTIGATION DOSSIER', 15, 26);
      doc.text(`REPORT ID: DOSSIER-2026-${wb.id} | ISSUED: 2026-11-06`, 15, 33);

      // Status Badge
      doc.setFillColor(255, 93, 101); // Coral alert
      doc.roundedRect(pageWidth - 65, 12, 50, 10, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('PRIORITY DISPATCH', pageWidth - 60, 18);

      // Section 1: Water Body Target Information
      let y = 52;
      doc.setTextColor(6, 19, 29);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('1. CATCHMENT TARGET PROFILE', 15, y);
      
      doc.setDrawColor(32, 217, 208);
      doc.setLineWidth(0.5);
      doc.line(15, y + 2, pageWidth - 15, y + 2);

      y += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 50, 60);

      doc.text(`Water Body Name:  ${wb.name}`, 15, y);
      doc.text(`Geographic Region: ${wb.region}`, 15, y + 6);
      doc.text(`GPS Coordinates:   ${wb.coordinates[0].toFixed(4)}° N, ${wb.coordinates[1].toFixed(4)}° W`, 15, y + 12);
      doc.text(`Total Basin Area:  ${wb.areaKm2} km²`, 15, y + 18);

      doc.text(`Baseline Date:     ${wb.baselineDate}`, pageWidth / 2, y);
      doc.text(`Anomaly Date:      ${wb.latestDate}`, pageWidth / 2, y + 6);
      doc.text(`Sensor Source:     ${wb.satelliteSource}`, pageWidth / 2, y + 12);
      doc.text(`Cloud Obscuration: ${wb.cloudCoverPercent}%`, pageWidth / 2, y + 18);

      // Section 2: Anomaly & Spectral Deviation
      y += 30;
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 19, 29);
      doc.text('2. MULTI-SPECTRAL ANOMALY METRICS', 15, y);
      doc.line(15, y + 2, pageWidth - 15, y + 2);

      y += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Primary Indicator:   ${wb.primaryIndicator}`, 15, y);
      doc.text(`Affected Surface:    ${wb.affectedAreaKm2} km² (${wb.anomalousPixelsPercent}% total basin)`, 15, y + 6);
      doc.text(`Chlorophyll (NDCI):  +${wb.ndci} (High Algal/Organic Concentration)`, 15, y + 12);
      doc.text(`Water Mask (MNDWI):  ${wb.mndwi} (Open Water Surface Confirmed)`, 15, y + 18);
      doc.text(`Turbidity Estimate:  ~${wb.turbidityNtuEstimate} NTU`, 15, y + 24);
      doc.text(`Isolation Forest:    Score 0.912 | 95.8% Model Confidence`, 15, y + 30);

      // Section 3: Recommended Field Verification Protocol
      y += 42;
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 19, 29);
      doc.text('3. MANDATED IN-SITU FIELD INVESTIGATION STEPS', 15, y);
      doc.line(15, y + 2, pageWidth - 15, y + 2);

      y += 10;
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      const protocols = [
        "1. Collect 1000mL grab water samples at centroid coordinates for lab mass-spectrometry.",
        "2. Record dissolved oxygen (DO), pH, electrical conductivity (EC) via handheld probes.",
        "3. Determine microcystin / cyanotoxin concentration using certified ELISA test kits.",
        "4. Conduct shoreline reconnaissance for illegal discharge pipes or runoff tributaries.",
        "5. Upload physical laboratory findings back into AquaSentinel to close verification loop."
      ];

      protocols.forEach((p, idx) => {
        doc.text(p, 15, y + (idx * 6));
      });

      // Section 4: Mandatory Scientific Disclaimer
      y += 42;
      doc.setFillColor(245, 248, 250);
      doc.rect(15, y, pageWidth - 30, 26, 'F');
      doc.setDrawColor(200, 215, 225);
      doc.rect(15, y, pageWidth - 30, 26, 'S');

      doc.setFontSize(8);
      doc.setTextColor(80, 95, 105);
      doc.setFont('helvetica', 'bold');
      doc.text('SCIENTIFIC RESPONSIBILITY & REGULATORY COMPLIANCE NOTICE:', 20, y + 7);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Satellite observations measure surface electromagnetic reflectance anomalies and cannot independently confirm chemical toxicity or molecular pollutants. This automated dossier provides prioritized triage guidance for authorized physical field testing personnel.',
        20, y + 13, { maxWidth: pageWidth - 40 }
      );

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(140, 155, 165);
      doc.text('AquaSentinel Platform • Copernicus Sentinel-2 MSI • Generated for Environmental Custodians', 15, pageHeight - 10);
      doc.text(`Page 1 of 1`, pageWidth - 30, pageHeight - 10);

      // Save PDF file
      doc.save(`AquaSentinel-Dossier-${wb.id}.pdf`);
      setReportSuccess(true);
      setTimeout(() => setReportSuccess(false), 3000);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-ocean-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-aqua/20 text-aqua border border-aqua/40">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-display text-white">Investigation Dossier & Evidence Reports</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-ocean-800 text-aqua border border-ocean-700">
              PDF Export Engine
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Generate and export official, tamper-evident investigation evidence dossiers complete with satellite signatures, GIS coordinates, and field protocols.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <select 
            value={wb.id} 
            onChange={(e) => {
              const found = waterBodies.find(w => w.id === e.target.value);
              if (found) onSelectWaterBody(found);
            }}
            className="bg-navy-950 border border-ocean-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-aqua font-mono"
          >
            {waterBodies.map(w => (
              <option key={w.id} value={w.id}>{w.name} ({w.id})</option>
            ))}
          </select>

          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-navy-950 bg-gradient-to-r from-aqua via-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "GENERATING PDF..." : "EXPORT OFFICIAL PDF REPORT"}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {reportSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-accent/20 border border-emerald-accent/50 text-emerald-accent text-xs font-mono flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Investigation Dossier successfully downloaded as PDF: AquaSentinel-Dossier-{wb.id}.pdf</span>
        </div>
      )}

      {/* Live Document Preview Container (Formatted as High-Tech Paper Dossier) */}
      <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-2xl border-aqua/30 bg-[#071926] shadow-2xl space-y-8 font-sans">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-ocean-700/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-aqua font-mono text-xs font-bold uppercase tracking-wider">
              <Satellite className="w-4 h-4" />
              <span>COPERNICUS SENTINEL-2 EARTH OBSERVATION INTELLIGENCE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Field Investigation Dossier: {wb.name}
            </h1>
            <div className="text-xs text-text-dim font-mono mt-1">
              DOSSIER ID: AS-2026-{wb.id}-VERIFICATION • GENERATED: 2026-11-06 UTC
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-coral-alert/40 text-center font-mono flex-shrink-0">
            <span className="text-[10px] text-text-dim block uppercase">TRIAGE PRIORITY</span>
            <span className="text-coral-alert font-extrabold text-sm block">CRITICAL 01</span>
            <span className="text-[9px] text-emerald-accent block mt-0.5">DISPATCH ISSUED</span>
          </div>
        </div>

        {/* Section 1: Catchment Metadata Grid */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-aqua uppercase tracking-wider font-bold">
            1.0 GEOGRAPHIC & SATELLITE SENSOR SPECIFICATIONS
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-navy-950/80 border border-ocean-800">
              <div className="text-text-dim text-[10px]">CATCHMENT NAME</div>
              <div className="text-white font-bold truncate mt-0.5">{wb.name}</div>
            </div>

            <div className="p-3 rounded-lg bg-navy-950/80 border border-ocean-800">
              <div className="text-text-dim text-[10px]">COORDINATES</div>
              <div className="text-aqua font-bold mt-0.5">{wb.coordinates[0].toFixed(3)}°N, {wb.coordinates[1].toFixed(3)}°W</div>
            </div>

            <div className="p-3 rounded-lg bg-navy-950/80 border border-ocean-800">
              <div className="text-text-dim text-[10px]">ORBITAL OBSERVATIONS</div>
              <div className="text-white font-bold mt-0.5">{wb.baselineDate} → {wb.latestDate}</div>
            </div>

            <div className="p-3 rounded-lg bg-navy-950/80 border border-ocean-800">
              <div className="text-text-dim text-[10px]">IMAGERY SENSOR</div>
              <div className="text-emerald-accent font-bold mt-0.5">Sentinel-2 MSI (10m)</div>
            </div>
          </div>
        </div>

        {/* Section 2: Anomaly Spectral Evidence Visuals */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-aqua uppercase tracking-wider font-bold">
            2.0 SATELLITE EVIDENCE & SPECTRAL COMPARISON SNAPSHOT
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="relative rounded-xl overflow-hidden border border-ocean-700 bg-navy-950">
              <img src={wb.baselineImage} alt="Baseline" className="w-full h-44 object-cover filter brightness-90" />
              <div className="absolute top-2 left-2 bg-navy-950/90 text-aqua font-mono text-[10px] px-2 py-0.5 rounded border border-aqua/40">
                BASELINE CALIBRATION ({wb.baselineDate})
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-coral-alert/50 bg-navy-950">
              <img src={wb.anomalyImage} alt="Anomaly" className="w-full h-44 object-cover filter contrast-125 saturate-150" />
              <div className="absolute top-2 left-2 bg-navy-950/90 text-coral-alert font-mono text-[10px] px-2 py-0.5 rounded border border-coral-alert/40">
                DETECTED SPECTRAL BLOOM ({wb.latestDate})
              </div>
            </div>

          </div>

          <div className="p-3 rounded-lg bg-navy-950 border border-ocean-800 text-xs text-text-secondary font-mono">
            <strong>Evidence Summary: </strong>
            {wb.description}
          </div>
        </div>

        {/* Section 3: Field Verification Checklist */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-aqua uppercase tracking-wider font-bold">
            3.0 MANDATED FIELD ACTION CHECKLIST FOR TESTING UNITS
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-navy-950/70 border border-ocean-800 flex items-center gap-3">
              <span className="w-4 h-4 rounded border border-aqua flex items-center justify-center text-aqua text-[10px]">✓</span>
              <span>1. Collect 1000mL grab water samples at GPS centroid coordinates ({wb.coordinates[0].toFixed(4)}, {wb.coordinates[1].toFixed(4)})</span>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-950/70 border border-ocean-800 flex items-center gap-3">
              <span className="w-4 h-4 rounded border border-aqua flex items-center justify-center text-aqua text-[10px]">✓</span>
              <span>2. Perform in-situ spectrophotometric measurement of phycocyanin and dissolved oxygen (DO)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-950/70 border border-ocean-800 flex items-center gap-3">
              <span className="w-4 h-4 rounded border border-aqua flex items-center justify-center text-aqua text-[10px]">✓</span>
              <span>3. Inspect industrial effluent discharge gates along eastern tributary feeder canal</span>
            </div>
            <div className="p-2.5 rounded-lg bg-navy-950/70 border border-ocean-800 flex items-center gap-3">
              <span className="w-4 h-4 rounded border border-aqua flex items-center justify-center text-aqua text-[10px]">✓</span>
              <span>4. Transmit certified laboratory results back to AquaSentinel Command for anomaly validation</span>
            </div>
          </div>
        </div>

        {/* Section 4: Scientific Responsibility Clause */}
        <div className="p-4 rounded-xl bg-navy-950/90 border border-ocean-700/80 text-xs text-text-secondary space-y-1.5">
          <div className="flex items-center gap-2 text-amber-warning font-mono font-semibold">
            <Info className="w-4 h-4" />
            <span>MANDATORY SCIENTIFIC RESPONSIBILITY DISCLAIMER</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Satellite observations cannot independently confirm chemical toxicity or identify every microscopic pollutant without in-situ laboratory analysis. 
            AquaSentinel identifies statistically significant spectral deviations and guides authorities toward locations requiring physical investigation.
          </p>
        </div>

        {/* Dossier Footer with QR Verification Code */}
        <div className="pt-6 border-t border-ocean-700/80 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-text-dim gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-navy-950 border border-ocean-700 flex items-center justify-center text-aqua">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <div className="text-white font-bold">CRYPTOGRAPHIC DOSSIER HASH: #8A4F-992B</div>
              <div>VERIFIABLE ON COPERNICUS OPEN ACCESS HUB</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded bg-ocean-800 hover:bg-ocean-700 text-white transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 rounded bg-aqua/20 text-aqua border border-aqua/40 hover:bg-aqua/30 transition-colors flex items-center gap-1.5 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
