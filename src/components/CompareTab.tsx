import React, { useState } from 'react';
import { Medicine, PharmacyOffer } from '../types';
import { 
  ArrowRightLeft, 
  ShieldCheck, 
  TrendingDown, 
  Sparkles, 
  Store, 
  Star, 
  Clock, 
  Plus, 
  Check, 
  Info,
  Calendar
} from 'lucide-react';

interface CompareTabProps {
  medicines: Medicine[];
  onSelectMedicine: (med: Medicine) => void;
  onAddToCart: (med: Medicine, pharmacy: PharmacyOffer, qty: number) => void;
}

export const CompareTab: React.FC<CompareTabProps> = ({
  medicines,
  onSelectMedicine,
  onAddToCart
}) => {
  const [selectedMedId, setSelectedMedId] = useState<string>(medicines[0]?.id || 'med-1');
  const [supplyMonths, setSupplyMonths] = useState<number>(1);

  const currentMedicine = medicines.find(m => m.id === selectedMedId) || medicines[0];
  const lowestPharmacy = currentMedicine.pharmacies.find(p => p.isLowestPrice) || currentMedicine.pharmacies[0];
  
  const singleSavings = currentMedicine.brandPrice - lowestPharmacy.price;
  const totalSavings = singleSavings * supplyMonths;
  const annualSavings = singleSavings * 12;

  return (
    <div className="p-4 space-y-4 pb-14">
      {/* Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Price & Molecule Comparator</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mt-0.5">
          Brand vs Generic Breakdown
        </h3>
        <p className="text-xs text-slate-500">
          Compare chemical equivalence, pharmacy offers, and patient feedback rankings.
        </p>
      </div>

      {/* Drug Picker Pill Carousel */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-600">Select Prescribed Medicine to Compare:</label>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {medicines.map((m) => {
            const isSelected = m.id === selectedMedId;
            return (
              <button
                key={m.id}
                id={`compare-selector-${m.id}`}
                onClick={() => setSelectedMedId(m.id)}
                className={`px-3 py-2 rounded-xl text-left shrink-0 transition-all border ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/80 ring-1 ring-teal-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <p className="text-[10px] text-slate-500">{m.brandNameEquivalent.split(' ')[0]}</p>
                <p className="text-xs font-bold text-slate-900">{m.name.split(' ')[0]}</p>
                <span className="text-[10px] font-bold text-emerald-700">
                  Save {Math.round(((m.brandPrice - m.genericLowestPrice) / m.brandPrice) * 100)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
          {/* Brand Column */}
          <div className="p-3.5 bg-slate-50/50 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Prescribed Brand</span>
            <h4 className="text-xs font-bold text-slate-800">{currentMedicine.brandNameEquivalent}</h4>
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 block">Retail Price:</span>
              <span className="text-base font-bold text-slate-400 line-through">
                ${currentMedicine.brandPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 space-y-1 pt-1 border-t border-slate-200">
              <p>Patent: Expired</p>
              <p>Advertising: High Markup</p>
            </div>
          </div>

          {/* Generic Column */}
          <div className="p-3.5 bg-teal-50/30 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-600" />
              Generic Equivalent
            </span>
            <h4 className="text-xs font-bold text-teal-950">{currentMedicine.name}</h4>
            <div className="pt-2">
              <span className="text-[10px] text-emerald-700 font-bold block">Lowest Available:</span>
              <span className="text-base font-extrabold text-teal-800">
                ${lowestPharmacy.price.toFixed(2)}
              </span>
            </div>
            <div className="text-[10px] text-teal-900 font-semibold space-y-1 pt-1 border-t border-teal-200/60">
              <p className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-600" />
                {currentMedicine.bioequivalenceScore}% Bioequivalent
              </p>
              <p className="text-emerald-700 font-bold">
                Save ${singleSavings.toFixed(2)} ({Math.round((singleSavings / currentMedicine.brandPrice) * 100)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Chemical Equivalence Summary */}
        <div className="p-3.5 bg-slate-50 text-xs space-y-2 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Active Chemical Ingredient</span>
            <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {currentMedicine.activeIngredient}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Clinical Efficacy Ranking</span>
            <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {currentMedicine.overallRating} / 5.0 (Rank #{currentMedicine.feedbackRankScore})
            </span>
          </div>
        </div>

        {/* Annual Savings Projection */}
        <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-700" />
            <div>
              <p className="font-bold text-emerald-950">Annual Savings on this Rx</p>
              <p className="text-[11px] text-emerald-800">Switching from brand saves over a year</p>
            </div>
          </div>
          <p className="text-base font-black text-emerald-800">${annualSavings.toFixed(2)}</p>
        </div>
      </div>

      {/* Cross Pharmacy Comparison for this Medicine */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-bold text-slate-900">Compare Local Medical Stores for this Medicine</h4>
          <span className="text-[11px] text-teal-700 font-semibold">{currentMedicine.pharmacies.length} pharmacies</span>
        </div>

        <div className="space-y-2">
          {currentMedicine.pharmacies.map((pharmacy) => (
            <div
              key={pharmacy.pharmacyId}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                pharmacy.isLowestPrice
                  ? 'border-emerald-500 bg-emerald-50/30 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{pharmacy.pharmacyName}</span>
                  {pharmacy.isLowestPrice && (
                    <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                      Lowest Guaranteed
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {pharmacy.deliveryTime}
                  </span>
                  <span>•</span>
                  <span>{pharmacy.distanceKm} km</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-700">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {pharmacy.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">${pharmacy.price.toFixed(2)}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">
                    Save ${(currentMedicine.brandPrice - pharmacy.price).toFixed(2)}
                  </p>
                </div>
                <button
                  id={`add-from-store-${pharmacy.pharmacyId}`}
                  onClick={() => onAddToCart(currentMedicine, pharmacy, 1)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-xs active:scale-95 transition-transform flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Buy</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient review preview */}
      {currentMedicine.reviews[0] && (
        <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-bold text-slate-800">Top Verified Patient Feedback</span>
            <span className="text-emerald-700 font-semibold">100% Verified</span>
          </div>
          <p className="text-slate-600 italic">"{currentMedicine.reviews[0].comment}"</p>
          <p className="text-[10px] text-slate-400">— {currentMedicine.reviews[0].userName} (Treated {currentMedicine.reviews[0].conditionTreated})</p>
        </div>
      )}
    </div>
  );
};
