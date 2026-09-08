import React, { useState } from 'react';
import { Medicine, PharmacyOffer } from '../types';
import { SAMPLE_PRESCRIPTIONS } from '../data/mockData';
import { 
  Camera, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ScanLine, 
  RefreshCw, 
  ShieldCheck,
  Plus
} from 'lucide-react';

interface RxScannerTabProps {
  medicines: Medicine[];
  onAddMultipleToCart: (items: { medicine: Medicine; pharmacy: PharmacyOffer; quantity: number }[]) => void;
  onGoToCart: () => void;
}

export const RxScannerTab: React.FC<RxScannerTabProps> = ({
  medicines,
  onAddMultipleToCart,
  onGoToCart
}) => {
  const [selectedRx, setSelectedRx] = useState(SAMPLE_PRESCRIPTIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(true);
  const [hasAddedToCart, setHasAddedToCart] = useState(false);

  const handleScanSample = (sample: typeof SAMPLE_PRESCRIPTIONS[0]) => {
    setSelectedRx(sample);
    setIsScanning(true);
    setIsScanned(false);
    setHasAddedToCart(false);

    setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
    }, 1000);
  };

  const handleAddAllGenerics = () => {
    const itemsToAdd = selectedRx.items.map(item => {
      const med = medicines.find(m => m.id === item.genericMatchId) || medicines[0];
      const pharmacy = med.pharmacies.find(p => p.isLowestPrice) || med.pharmacies[0];
      return {
        medicine: med,
        pharmacy: pharmacy,
        quantity: 1
      };
    });

    onAddMultipleToCart(itemsToAdd);
    setHasAddedToCart(true);
  };

  return (
    <div className="p-4 space-y-4 pb-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
          <ScanLine className="w-3.5 h-3.5" />
          <span>Automated Rx Substitution Engine</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mt-0.5">
          Scan Prescription & Match Generics
        </h3>
        <p className="text-xs text-slate-500">
          Upload any doctor's prescription to automatically detect branded drugs and substitute with the lowest-priced generics.
        </p>
      </div>

      {/* Upload or Pick Sample Prescription */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span>Choose a Sample Doctor Prescription:</span>
          <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-mono">Demo Mode</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_PRESCRIPTIONS.map((rx) => (
            <button
              key={rx.id}
              onClick={() => handleScanSample(rx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedRx.id === rx.id
                  ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-600'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900 truncate">
                <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span className="truncate">{rx.doctor.split(',')[0]}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 truncate">{rx.clinic.split(' ')[0]} Clinic</p>
              <span className="text-[10px] font-extrabold text-emerald-700 block mt-1">
                Save {rx.savingsPercent}% (${rx.totalSavings.toFixed(2)})
              </span>
            </button>
          ))}
        </div>

        {/* Custom Upload Mock */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Or upload your own image/PDF:</span>
          <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1.5 transition-colors">
            <Camera className="w-3.5 h-3.5 text-teal-600" />
            <span>Take Photo / Upload</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={() => handleScanSample(SAMPLE_PRESCRIPTIONS[1])}
            />
          </label>
        </div>
      </div>

      {/* Scanning Animation State */}
      {isScanning && (
        <div className="p-8 text-center bg-white rounded-2xl border border-teal-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-800">Reading Prescribed Brand Medicines...</p>
          <p className="text-[11px] text-slate-400">Matching bioequivalent active salts & querying local pharmacy prices</p>
        </div>
      )}

      {/* Scanned Results */}
      {!isScanning && isScanned && (
        <div className="space-y-3 animate-in fade-in duration-300">
          {/* Savings Highlight Hero */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  Generic Substitution Match Found
                </span>
                <h4 className="text-xl font-black font-['Outfit'] mt-1">
                  Save ${selectedRx.totalSavings.toFixed(2)} ({selectedRx.savingsPercent}%)
                </h4>
                <p className="text-[11px] text-teal-100 mt-0.5">
                  Brand cost: ${selectedRx.originalTotal.toFixed(2)} → Generic lowest price: <strong className="text-white">${selectedRx.genericTotal.toFixed(2)}</strong>
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-200" />
              </div>
            </div>
          </div>

          {/* Extracted Drug Matches */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-800">Extracted Molecules & Lowest Price Generics:</p>
            {selectedRx.items.map((item, idx) => {
              const med = medicines.find(m => m.id === item.genericMatchId) || medicines[0];
              const lowest = med.pharmacies.find(p => p.isLowestPrice) || med.pharmacies[0];
              const drugSave = med.brandPrice - lowest.price;

              return (
                <div 
                  key={idx}
                  className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-2 shadow-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>Doctor prescribed:</span>
                      <span className="font-semibold text-slate-600 line-through">{item.brandName}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">{med.name}</p>
                    <p className="text-[11px] text-teal-700 font-medium">
                      Active: {med.activeIngredient} • {med.strength}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-semibold">
                      Lowest at {lowest.pharmacyName} ({lowest.deliveryTime})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                      Save ${drugSave.toFixed(2)}
                    </span>
                    <p className="text-sm font-extrabold text-teal-800 mt-1">${lowest.price.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safety & Compliance Badge */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <p className="text-[11px] leading-snug">
              Every substitution is validated by our licensed clinical pharmacist network before packaging.
            </p>
          </div>

          {/* Action button */}
          {!hasAddedToCart ? (
            <button
              id="add-all-rx-to-cart-btn"
              onClick={handleAddAllGenerics}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Add All Generic Substitutes to Cart</span>
              <span>•</span>
              <span>${selectedRx.genericTotal.toFixed(2)}</span>
            </button>
          ) : (
            <button
              id="view-cart-from-rx-btn"
              onClick={onGoToCart}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Items Added! Open Cart & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
