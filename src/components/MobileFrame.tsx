import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, FileText, Store, User, Sparkles, ShieldCheck } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeRole: 'customer' | 'partner';
  onToggleRole: (role: 'customer' | 'partner') => void;
  onOpenPrd: () => void;
  cartCount: number;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeRole,
  onToggleRole,
  onOpenPrd,
  cartCount,
}) => {
  const [isFrameEnabled, setIsFrameEnabled] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 lg:p-6 select-none font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Controls Toolbar for Developers & Stakeholders */}
      <header className="w-full max-w-5xl mb-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-extrabold text-lg shadow-md shadow-teal-500/20">
            gM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-['Outfit']">genericMed</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Mobile Frontend
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Price comparison marketplace presenting the lowest price with verified feedback rankings
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Role switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              id="switch-role-customer"
              onClick={() => onToggleRole('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'customer'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer App</span>
            </button>
            <button
              id="switch-role-partner"
              onClick={() => onToggleRole('partner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'partner'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Pharmacy Store</span>
            </button>
          </div>

          {/* PRD Spec button */}
          <button
            id="open-prd-specs-btn"
            onClick={onOpenPrd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95"
            title="Inspect the complete 24-section PRD specification generated from the PDF"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">PRD Spec</span>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.2 rounded font-mono">18 pgs</span>
          </button>

          {/* View toggle (Phone mockup vs responsive container) */}
          <button
            id="toggle-device-frame-btn"
            onClick={() => setIsFrameEnabled(!isFrameEnabled)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            title={isFrameEnabled ? 'Switch to Full-Width View' : 'Switch to Smartphone Frame'}
          >
            {isFrameEnabled ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Full Width</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden md:inline">Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container / Mobile Viewport */}
      <main className="w-full flex items-center justify-center flex-1 pb-4">
        {isFrameEnabled ? (
          /* Phone Shell */
          <div 
            id="mobile-phone-wrapper" 
            className="relative w-full max-w-[412px] h-[860px] max-h-[92vh] bg-slate-900 rounded-[48px] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-[8px] border-slate-800 ring-1 ring-slate-700/60 flex flex-col overflow-hidden"
          >
            {/* Phone Speaker & Notch / Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center pointer-events-none">
              <div className="h-6 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-900/60"></div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
              </div>
            </div>

            {/* Inner Phone Screen */}
            <div 
              id="mobile-screen-viewport" 
              className="w-full h-full bg-slate-50 text-slate-800 rounded-[36px] overflow-hidden flex flex-col relative shadow-inner"
            >
              {/* Status Bar */}
              <div className="h-10 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 z-30 select-none bg-slate-50/80 backdrop-blur-sm">
                <span className="text-[12px] font-bold tracking-tight">{currentTime}</span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  {/* Signal bars */}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="16" width="3" height="6" rx="1" />
                    <rect x="7" y="12" width="3" height="10" rx="1" />
                    <rect x="12" y="8" width="3" height="14" rx="1" />
                    <rect x="17" y="4" width="3" height="18" rx="1" />
                  </svg>
                  {/* 5G icon */}
                  <span className="text-[10px] font-bold">5G</span>
                  {/* Battery */}
                  <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-slate-800 rounded-2xs"></div>
                  </div>
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
                {children}
              </div>

              {/* Bottom Home Indicator */}
              <div className="h-4 bg-slate-50 flex items-center justify-center py-1 shrink-0">
                <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Fluid Responsive View */
          <div 
            id="mobile-screen-viewport-fluid" 
            className="w-full max-w-2xl min-h-[820px] bg-slate-50 text-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative border border-slate-700"
          >
            {children}
          </div>
        )}
      </main>

      {/* Micro-footer */}
      <footer className="text-center text-[11px] text-slate-500 py-1 flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
        <span>genericMed Marketplace • Lowest Price Guarantee • Clinical Bioequivalence Certified</span>
      </footer>
    </div>
  );
};
