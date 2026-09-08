import React from 'react';
import { 
  User, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  CreditCard, 
  HeartPulse, 
  HelpCircle, 
  ChevronRight, 
  Award,
  Sparkles,
  Store
} from 'lucide-react';

interface ProfileTabProps {
  onOpenPrd: () => void;
  onSwitchToPartner: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  onOpenPrd,
  onSwitchToPartner
}) => {
  return (
    <div className="p-4 space-y-4 pb-14">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-teal-600/20">
          RV
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">Robert Vance</h3>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
              Verified Patient
            </span>
          </div>
          <p className="text-xs text-slate-500">robert.vance@example.com • 58 yrs</p>
          <p className="text-[11px] text-teal-700 font-semibold mt-0.5">
            Prescription on file: Metro Heart & Vascular
          </p>
        </div>
      </div>

      {/* Chronic Health Tags */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            Monitored Health Profiles
          </span>
          <span className="text-[11px] text-teal-700 font-semibold">Manage</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium">
            High Cholesterol (Hyperlipidemia)
          </span>
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium">
            Hypertension (Stage 1)
          </span>
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium">
            Type 2 Diabetes
          </span>
        </div>
      </div>

      {/* Settings & Preferences List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 text-xs">
        <button 
          onClick={onOpenPrd}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-teal-600" />
            <div>
              <span className="font-bold text-slate-800">genericMed PRD Specification (18 pgs)</span>
              <p className="text-[11px] text-slate-400">View functional requirements, data entities, and NFRs from PDF</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button 
          onClick={onSwitchToPartner}
          className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Store className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="font-bold text-slate-800">Switch to Pharmacy Partner Portal</span>
              <p className="text-[11px] text-slate-400">View how local pharmacies manage pricing & incoming orders</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <div>
              <span className="font-bold text-slate-800">Automatic Generic Substitution</span>
              <p className="text-[11px] text-slate-400">Default to highest-rated lowest-price generic equivalent</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            defaultChecked 
            className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
          />
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <div>
              <span className="font-bold text-slate-800">Saved Addresses</span>
              <p className="text-[11px] text-slate-400">742 Evergreen Terrace, Apt 4B, New York, NY</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <div>
              <span className="font-bold text-slate-800">Payment & Insurance Co-pay</span>
              <p className="text-[11px] text-slate-400">Visa ending in •••• 4242</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Regulatory Badge */}
      <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-1">
        <p className="font-bold text-slate-700">Marketplace Transparency & Safety</p>
        <p className="text-[11px] leading-relaxed">
          genericMed operates as an online marketplace connecting patients directly to licensed physical pharmacies. All generics comply with bioequivalence testing standards.
        </p>
      </div>
    </div>
  );
};
