import React, { useState } from 'react';
import { X, Lock, Mail, Key, ShieldCheck, Satellite } from 'lucide-react';
import Logo from './Logo';

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('scientist@copernicus.eu');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-navy-900 border border-ocean-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-text-dim hover:text-white bg-ocean-950/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="large" />
          </div>
          <h3 className="text-xl font-bold font-display text-white pt-2">
            Copernicus Planetary Access
          </h3>
          <p className="text-xs text-text-secondary font-mono">
            Authenticate to access Sentinel-2 MSI L2A tasking and field triage dispatch.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-text-dim uppercase text-[10px] mb-1">Scientist / Agency Email</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-text-dim absolute left-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-ocean-700 rounded-lg text-white focus:outline-none focus:border-aqua"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-dim uppercase text-[10px] mb-1">Copernicus Hub Secret Key</label>
            <div className="relative flex items-center">
              <Key className="w-4 h-4 text-text-dim absolute left-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-ocean-700 rounded-lg text-white focus:outline-none focus:border-aqua"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-navy-950/70 border border-ocean-800 text-[11px] text-text-dim flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-accent flex-shrink-0" />
            <span>Pre-authorized with demo credentials for hackathon evaluation.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-bold text-xs text-navy-950 bg-gradient-to-r from-aqua to-electric hover:shadow-glow-aqua transition-all flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? "AUTHENTICATING..." : "SIGN IN TO COMMAND CENTER"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
