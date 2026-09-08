import React, { useState } from 'react';
import { Medicine, PharmacyOffer } from '../types';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Clock, 
  Store, 
  Check, 
  Plus, 
  Minus, 
  Award, 
  Activity, 
  AlertCircle,
  ThumbsUp,
  Share2
} from 'lucide-react';

interface MedicineDetailModalProps {
  medicine: Medicine | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (medicine: Medicine, pharmacy: PharmacyOffer, quantity: number) => void;
}

export const MedicineDetailModal: React.FC<MedicineDetailModalProps> = ({
  medicine,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!isOpen || !medicine) return null;

  // Default selected pharmacy to the lowest price one
  const lowestPharmacy = medicine.pharmacies.find(p => p.isLowestPrice) || medicine.pharmacies[0];
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyOffer>(lowestPharmacy);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'prices' | 'reviews' | 'clinical'>('prices');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const savingsAmount = medicine.brandPrice - selectedPharmacy.price;
  const savingsPercent = Math.round((savingsAmount / medicine.brandPrice) * 100);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div id="medicine-detail-overlay" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        id="medicine-detail-modal" 
        className="bg-white text-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
              {medicine.category}
            </span>
            {medicine.prescriptionRequired && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Rx Required
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              title="Share comparison"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="close-medicine-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {copiedNotification && (
          <div className="bg-teal-600 text-white text-xs font-semibold py-1 px-3 text-center">
            Link copied! Share generic savings with friends & family.
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Title & Brand vs Generic Banner */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">{medicine.name}</h2>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-900">{medicine.overallRating}</span>
                <span className="text-[10px] text-slate-400">({medicine.reviewCount})</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-0.5">
              Active: <span className="font-semibold text-slate-700">{medicine.activeIngredient}</span> • {medicine.dosageForm}
            </p>

            {/* Brand Comparison Pill */}
            <div className="mt-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-500">Brand Equivalent:</p>
                <p className="text-xs font-bold text-slate-800">{medicine.brandNameEquivalent}</p>
                <p className="text-[11px] text-slate-400 line-through">Brand MRP: ${medicine.brandPrice.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  SAVE {savingsPercent}%
                </span>
                <p className="text-base font-extrabold text-teal-800 mt-0.5">
                  ${selectedPharmacy.price.toFixed(2)}
                </p>
                <p className="text-[10px] text-emerald-700 font-medium">Save ${(savingsAmount * quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Sub-tabs: Pharmacy Prices, Reviews, Clinical Info */}
          <div className="flex border-b border-slate-200 gap-1 text-xs">
            <button
              id="tab-prices"
              onClick={() => setActiveTab('prices')}
              className={`pb-2 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'prices'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Stores & Prices ({medicine.pharmacies.length})</span>
            </button>
            <button
              id="tab-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Reviews & Rank</span>
            </button>
            <button
              id="tab-clinical"
              onClick={() => setActiveTab('clinical')}
              className={`pb-2 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 ${
                activeTab === 'clinical'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Clinical Proof</span>
            </button>
          </div>

          {/* Tab 1: Pharmacy Price Comparison */}
          {activeTab === 'prices' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Verified Local Medical Stores</span>
                <span>Sorted by lowest price</span>
              </div>

              <div className="space-y-2">
                {medicine.pharmacies.map((pharmacy) => {
                  const isSelected = selectedPharmacy.pharmacyId === pharmacy.pharmacyId;
                  return (
                    <div
                      key={pharmacy.pharmacyId}
                      onClick={() => setSelectedPharmacy(pharmacy)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-600 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{pharmacy.pharmacyName}</p>
                          {pharmacy.isLowestPrice && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded-md">
                              Lowest Price
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500">
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {pharmacy.deliveryTime}
                          </span>
                          <span>•</span>
                          <span>{pharmacy.distanceKm} km away</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-700 font-semibold">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {pharmacy.rating}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-extrabold text-slate-900">${pharmacy.price.toFixed(2)}</p>
                        <div className={`mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                          isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{isSelected ? 'Selected' : 'Choose'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Reviews & Ranking */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Feedback Ranking Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Award className="w-4 h-4 text-teal-600" />
                    <span>genericMed Feedback Ranking</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Calculated from {medicine.reviewCount} verified purchases & efficacy ratings
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-lg font-['Outfit'] shadow-sm">
                    {medicine.feedbackRankScore}
                  </div>
                  <span className="text-[10px] text-teal-800 font-bold">Top 5% Rank</span>
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-700">Verified Patient Testimonials</p>
                {medicine.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{rev.userName}</p>
                        <p className="text-[10px] text-slate-400">Condition: {rev.conditionTreated} • Used for {rev.durationUsed}</p>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                      <span className="text-emerald-700 font-semibold">✓ Verified genericMed Patient</span>
                      <span>•</span>
                      <span>Side effects: <strong className="text-slate-700">{rev.sideEffectsReported}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Clinical Proof & Usages */}
          {activeTab === 'clinical' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-teal-950">100% Certified Bioequivalent</h4>
                  <p className="text-teal-800 text-[11px] mt-0.5 leading-relaxed">
                    Laboratory verified at <strong className="font-bold">{medicine.bioequivalenceScore}%</strong> bioequivalence to {medicine.brandNameEquivalent}. Active molecule release, absorption, and bioavailability match brand standards strictly.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800">Primary Clinical Indications</h4>
                <div className="flex flex-wrap gap-1.5">
                  {medicine.usages.map((usage, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                      {usage}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800">Known Side Effects & Advice</h4>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
                  {medicine.sideEffects.map((side, idx) => (
                    <li key={idx}>{side}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Manufactured by FDA / GMP compliant lab: {medicine.manufacturer}</span>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom Action: Quantity + Add to Cart */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-slate-800">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            id="modal-add-to-cart-btn"
            onClick={() => {
              onAddToCart(medicine, selectedPharmacy, quantity);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 active:scale-98 transition-all"
          >
            <span>Add from {selectedPharmacy.pharmacyName}</span>
            <span>•</span>
            <span>${(selectedPharmacy.price * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
