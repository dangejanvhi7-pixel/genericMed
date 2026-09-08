import React from 'react';
import { Home, Search, Camera, ShoppingBag, UserCheck, Sparkles } from 'lucide-react';

export type TabType = 'home' | 'compare' | 'scan' | 'orders' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  cartItemCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  cartItemCount
}) => {
  return (
    <nav 
      id="mobile-bottom-navigation" 
      className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around z-30 shadow-lg"
    >
      {/* Home Tab */}
      <button
        id="nav-tab-home"
        onClick={() => onChangeTab('home')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          activeTab === 'home'
            ? 'text-teal-700 font-bold scale-105'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* Compare Tab */}
      <button
        id="nav-tab-compare"
        onClick={() => onChangeTab('compare')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          activeTab === 'compare'
            ? 'text-teal-700 font-bold scale-105'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <Search className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Compare</span>
      </button>

      {/* Center Action: Scan Prescription */}
      <button
        id="nav-tab-scan"
        onClick={() => onChangeTab('scan')}
        className="flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 ring-4 ring-white">
          <Camera className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-semibold text-teal-800 mt-0.5">Rx Scan</span>
      </button>

      {/* Orders / Cart Tab */}
      <button
        id="nav-tab-orders"
        onClick={() => onChangeTab('orders')}
        className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          activeTab === 'orders'
            ? 'text-teal-700 font-bold scale-105'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Orders</span>
        {cartItemCount > 0 && (
          <span className="absolute top-0.5 right-2 w-4 h-4 bg-rose-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Profile Tab */}
      <button
        id="nav-tab-profile"
        onClick={() => onChangeTab('profile')}
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
          activeTab === 'profile'
            ? 'text-teal-700 font-bold scale-105'
            : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <UserCheck className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Profile</span>
      </button>
    </nav>
  );
};
