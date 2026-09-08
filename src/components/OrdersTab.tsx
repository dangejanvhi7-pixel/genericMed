import React, { useState } from 'react';
import { Order, Medicine, PharmacyOffer } from '../types';
import { 
  Package, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Calculator, 
  ChevronRight, 
  ArrowRight,
  TrendingDown,
  ShieldCheck
} from 'lucide-react';

interface OrdersTabProps {
  orders: Order[];
  medicines: Medicine[];
  onQuickAddBundle: (meds: Medicine[]) => void;
  onGoToCart: () => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  medicines,
  onQuickAddBundle,
  onGoToCart
}) => {
  // Chronic Savings Calculator State: select common chronic drugs
  const [selectedChronicMeds, setSelectedChronicMeds] = useState<string[]>(['med-1', 'med-2', 'med-6']); // Statin, Metformin, Amlodipine

  const toggleChronicMed = (id: string) => {
    if (selectedChronicMeds.includes(id)) {
      if (selectedChronicMeds.length > 1) {
        setSelectedChronicMeds(selectedChronicMeds.filter(m => m !== id));
      }
    } else {
      setSelectedChronicMeds([...selectedChronicMeds, id]);
    }
  };

  const chronicMedsList = medicines.filter(m => selectedChronicMeds.includes(m.id));
  const brandMonthlyTotal = chronicMedsList.reduce((sum, m) => sum + m.brandPrice, 0);
  const genericMonthlyTotal = chronicMedsList.reduce((sum, m) => sum + m.genericLowestPrice, 0);
  const monthlySavings = brandMonthlyTotal - genericMonthlyTotal;
  const annualSavings = monthlySavings * 12;

  const totalAllTimeSaved = orders.reduce((sum, o) => sum + o.totalSavings, 142.50);

  return (
    <div className="p-4 space-y-5 pb-14">
      {/* Lifetime Savings Summary Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">
              Total genericMed Savings
            </span>
            <h3 className="text-2xl font-black font-['Outfit'] tracking-tight">
              ${totalAllTimeSaved.toFixed(2)}
            </h3>
            <p className="text-[11px] text-slate-300">
              Money kept in your pocket compared to brand name prescriptions.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Active Orders List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-bold text-slate-900">Recent genericMed Orders ({orders.length})</h4>
          <span className="text-[11px] text-teal-700 font-semibold">Live Fulfillment</span>
        </div>

        {orders.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No active orders placed yet</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Explore medicines or scan your prescription to place your first order.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400">Order ID</span>
                    <p className="text-xs font-bold text-slate-900">{order.id}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>

                {/* Items preview */}
                <div className="space-y-1 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-slate-600">
                      <span>{item.medicine.name} ({item.quantity}x)</span>
                      <span className="font-bold text-slate-800">
                        ${(item.selectedPharmacy.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pharmacy and Delivery Details */}
                <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] space-y-1 text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Pharmacy: <strong className="text-slate-700">{order.pharmacyName}</strong></span>
                    <span className="flex items-center gap-1 text-teal-700 font-bold">
                      <Clock className="w-3 h-3" /> {order.estimatedDeliveryTime}
                    </span>
                  </div>
                  <p className="truncate">Destination: {order.deliveryAddress}</p>
                </div>

                {/* Order Footer Savings */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-700 font-bold">
                    Saved ${order.totalSavings.toFixed(2)} vs Brand
                  </span>
                  <p className="font-extrabold text-slate-900">
                    Paid: <span className="text-teal-800">${order.totalAmount.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chronic Patient Savings Calculator */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-['Outfit']">Chronic Medication Savings Calculator</h4>
            <p className="text-[11px] text-slate-500">Select your regular daily medications to view yearly savings</p>
          </div>
        </div>

        {/* Medication Selector Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Daily Regimen:</span>
          <div className="flex flex-wrap gap-1.5">
            {medicines.map((m) => {
              const isSelected = selectedChronicMeds.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleChronicMed(m.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-teal-700 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3 h-3 text-teal-200" />}
                  <span>{m.name.split(' ')[0]} ({m.strength})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculation Result */}
        <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Brand-Name Cost (Monthly):</span>
            <span className="line-through font-semibold text-slate-400">${brandMonthlyTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-teal-900 font-bold">
            <span>genericMed Lowest Price (Monthly):</span>
            <span className="text-teal-800 font-black text-sm">${genericMonthlyTotal.toFixed(2)}</span>
          </div>
          <div className="border-t border-emerald-200 pt-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Projected Annual Savings</p>
              <p className="text-lg font-black text-emerald-900 font-['Outfit']">${annualSavings.toFixed(2)} / yr</p>
            </div>
            <button
              onClick={() => {
                onQuickAddBundle(chronicMedsList);
                onGoToCart();
              }}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>Add Regimen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
