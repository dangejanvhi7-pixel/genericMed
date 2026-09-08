import React from 'react';
import { MapPin, ShoppingCart, Bell, Search, Sparkles, ChevronDown } from 'lucide-react';

interface AppHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onSelectSuggestion?: (query: string) => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onSelectSuggestion
}) => {
  return (
    <div className="bg-white px-4 pt-3 pb-3 border-b border-slate-100 shadow-xs sticky top-0 z-20">
      {/* Top row: Location & Cart/Bell */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deliver to</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <p className="text-xs font-bold text-slate-800 truncate max-w-[170px] sm:max-w-[240px]">
              Central Park West, NY (10001)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Guarantee pill */}
          <div className="hidden sm:flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Lowest Price Guarantee</span>
          </div>

          {/* Cart button */}
          <button
            id="header-open-cart-btn"
            onClick={onOpenCart}
            className="relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            id="main-medicine-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search brand (e.g., Lipitor) or salt..."
            className="w-full pl-9 pr-8 py-2 bg-slate-100 hover:bg-slate-100/90 focus:bg-white text-xs text-slate-800 rounded-xl border border-transparent focus:border-teal-500 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
