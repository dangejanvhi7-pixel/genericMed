import React, { useState } from 'react';
import { Medicine, MedicineCategory, PharmacyOffer } from '../types';
import { CATEGORIES } from '../data/mockData';
import { 
  Sparkles, 
  ArrowUpDown, 
  ShieldCheck, 
  Star, 
  Store, 
  Camera, 
  ChevronRight, 
  TrendingDown,
  Clock,
  Plus
} from 'lucide-react';

interface HomeTabProps {
  medicines: Medicine[];
  selectedCategory: MedicineCategory;
  onSelectCategory: (cat: MedicineCategory) => void;
  sortBy: 'price' | 'savings' | 'rating' | 'fastest';
  onSortChange: (sort: 'price' | 'savings' | 'rating' | 'fastest') => void;
  onSelectMedicine: (med: Medicine) => void;
  onOpenRxScanner: () => void;
  onQuickAddToCart: (med: Medicine, pharmacy: PharmacyOffer) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  medicines,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onSelectMedicine,
  onOpenRxScanner,
  onQuickAddToCart
}) => {
  return (
    <div className="p-4 space-y-4 pb-12">
      {/* Hero Prescription Card */}
      <div 
        id="hero-rx-card"
        onClick={onOpenRxScanner}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 p-4 text-white shadow-md cursor-pointer active:scale-[0.99] transition-all"
      >
        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-1.5 max-w-[240px]">
            <span className="inline-flex items-center gap-1 bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              Save up to 92% on Medicines
            </span>
            <h3 className="text-base font-bold font-['Outfit'] leading-tight">
              Scan Doctor's Rx to Find Generic Equivalents
            </h3>
            <p className="text-[11px] text-teal-100/80 leading-relaxed">
              Upload prescription image or select demo Rx. We instantly find the lowest-priced generic equivalents.
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
            <Camera className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-emerald-300 font-semibold">
          <span>Try Rx Auto-Matcher</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Browse Conditions</span>
          <span className="text-[11px] text-slate-400">Bioequivalent Generics</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting & Filter Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <span className="font-bold text-slate-900">{medicines.length}</span>
          <span>generics available</span>
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1 text-xs text-slate-700 shadow-2xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            id="sort-medicines-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
          >
            <option value="price">Lowest Price First</option>
            <option value="savings">Highest Savings %</option>
            <option value="rating">Top Feedback Rank</option>
            <option value="fastest">Fastest Delivery</option>
          </select>
        </div>
      </div>

      {/* Medicine Cards Grid */}
      <div className="space-y-3">
        {medicines.map((medicine) => {
          const lowestOffer = medicine.pharmacies.find(p => p.isLowestPrice) || medicine.pharmacies[0];
          const savings = medicine.brandPrice - lowestOffer.price;
          const savingsPct = Math.round((savings / medicine.brandPrice) * 100);

          return (
            <div
              key={medicine.id}
              id={`med-card-${medicine.id}`}
              className="bg-white rounded-2xl p-3.5 border border-slate-200 hover:border-teal-300 transition-all shadow-xs space-y-2.5"
            >
              {/* Top info */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 
                      onClick={() => onSelectMedicine(medicine)}
                      className="text-xs font-extrabold text-slate-900 hover:text-teal-700 cursor-pointer font-['Outfit']"
                    >
                      {medicine.name}
                    </h4>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                      {medicine.strength}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Substitutes for <span className="font-semibold text-slate-700">{medicine.brandNameEquivalent}</span>
                  </p>
                </div>

                {/* Feedback Rank badge */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{medicine.overallRating}</span>
                  </div>
                  <span className="text-[9px] text-teal-700 font-semibold mt-0.5">Rank #{medicine.feedbackRankScore}/100</span>
                </div>
              </div>

              {/* Price comparison section */}
              <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400">Brand Price:</span>
                  <p className="text-xs text-slate-400 line-through font-medium">${medicine.brandPrice.toFixed(2)}</p>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <TrendingDown className="w-3 h-3" />
                    SAVE {savingsPct}%
                  </span>
                  <p className="text-[9px] text-slate-400 mt-0.5">Save ${savings.toFixed(2)}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-800 font-bold block">Lowest Price:</span>
                  <p className="text-sm font-black text-teal-800">${lowestOffer.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Pharmacy store snippet & Actions */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Store className="w-3.5 h-3.5 text-teal-600" />
                  <span className="truncate max-w-[140px] font-medium">{lowestOffer.pharmacyName}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{lowestOffer.deliveryTime}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    id={`compare-btn-${medicine.id}`}
                    onClick={() => onSelectMedicine(medicine)}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Stores ({medicine.pharmacies.length})
                  </button>
                  <button
                    id={`quick-add-${medicine.id}`}
                    onClick={() => onQuickAddToCart(medicine, lowestOffer)}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <p className="font-bold text-slate-800">100% Bioequivalent Guarantee</p>
          <p className="text-[11px] text-slate-500 leading-snug">
            All generic medicines listed are chemically identical in active ingredients and bioavailability to their brand names, inspected by certified pharmacists.
          </p>
        </div>
      </div>
    </div>
  );
};
