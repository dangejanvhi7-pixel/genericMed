import React, { useState } from 'react';
import { Medicine } from '../types';
import { 
  Store, 
  DollarSign, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  Star, 
  ArrowLeft, 
  Edit3, 
  ShieldCheck, 
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface PartnerStoreViewProps {
  medicines: Medicine[];
  onUpdatePharmacyPrice: (medId: string, newPrice: number) => void;
  onSwitchToCustomer: () => void;
}

export const PartnerStoreView: React.FC<PartnerStoreViewProps> = ({
  medicines,
  onUpdatePharmacyPrice,
  onSwitchToCustomer
}) => {
  const [editingMedId, setEditingMedId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<string>('');

  const pharmacyName = 'MedDirect Express';
  const myOffers = medicines.map(m => {
    const offer = m.pharmacies.find(p => p.pharmacyName === pharmacyName) || m.pharmacies[0];
    return {
      medicine: m,
      offer: offer,
      isLowest: offer.isLowestPrice
    };
  });

  const handleStartEdit = (medId: string, currentPrice: number) => {
    setEditingMedId(medId);
    setPriceInput(currentPrice.toString());
  };

  const handleSavePrice = (medId: string) => {
    const num = parseFloat(priceInput);
    if (!isNaN(num) && num > 0) {
      onUpdatePharmacyPrice(medId, num);
    }
    setEditingMedId(null);
  };

  return (
    <div className="p-4 space-y-4 pb-14">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <button
          id="partner-back-to-customer-btn"
          onClick={onSwitchToCustomer}
          className="flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Customer App</span>
        </button>
        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
          Verified Medical Store
        </span>
      </div>

      {/* Store Header Card */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-['Outfit']">{pharmacyName}</h3>
              <p className="text-[11px] text-slate-400">License #NY-PHARM-88921 • Central Park Ward</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-xs font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>4.9</span>
          </div>
        </div>

        {/* Business Metrics (Commission model) */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
          <div className="bg-slate-800/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Total Orders</span>
            <p className="text-xs font-bold text-white mt-0.5">148 this wk</p>
          </div>
          <div className="bg-slate-800/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Gross Sales</span>
            <p className="text-xs font-bold text-emerald-400 mt-0.5">$3,420</p>
          </div>
          <div className="bg-slate-800/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Platform Fee</span>
            <p className="text-xs font-bold text-slate-300 mt-0.5">5% Comm.</p>
          </div>
        </div>
      </div>

      {/* Pricing Management for Marketplace */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div>
            <h4 className="font-bold text-slate-900">Your Generic Medicine Catalog</h4>
            <p className="text-[11px] text-slate-500">Update unit prices to capture the "Lowest Price" badge</p>
          </div>
        </div>

        <div className="space-y-2">
          {myOffers.map(({ medicine, offer, isLowest }) => (
            <div 
              key={medicine.id}
              className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{medicine.name}</span>
                    <span className="text-[10px] text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                      {medicine.strength}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Brand: {medicine.brandNameEquivalent} (${medicine.brandPrice.toFixed(2)})
                  </p>
                </div>

                {isLowest ? (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Winning Lowest Price
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                    Another Store is Lower
                  </span>
                )}
              </div>

              {/* Price adjustment row */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <div className="text-[11px] text-slate-500">
                  <span>Your current price: </span>
                  <strong className="text-slate-900 text-xs font-bold">${offer.price.toFixed(2)}</strong>
                </div>

                {editingMedId === medicine.id ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-100 border border-teal-500 rounded-lg text-xs font-bold text-slate-800"
                    />
                    <button
                      onClick={() => handleSavePrice(medicine.id)}
                      className="px-2.5 py-1 bg-teal-600 text-white rounded-lg text-xs font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartEdit(medicine.id, offer.price)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Price</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info on Commission */}
      <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
        <p className="font-bold text-slate-800">genericMed Marketplace Partnership</p>
        <p>
          As outlined in the business model, genericMed charges a flat 5% platform commission on completed customer orders while driving high patient volume to local certified medical stores.
        </p>
      </div>
    </div>
  );
};
