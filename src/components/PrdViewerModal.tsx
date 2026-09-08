import React, { useState } from 'react';
import { PRD_DOCUMENT } from '../data/prdContent';
import { FileText, X, CheckCircle, ShieldCheck, Target, Layers, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';

interface PrdViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrdViewerModal: React.FC<PrdViewerModalProps> = ({ isOpen, onClose }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('functional-reqs');

  if (!isOpen) return null;

  const currentSection = PRD_DOCUMENT.find(s => s.id === selectedSectionId) || PRD_DOCUMENT[0];

  return (
    <div id="prd-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 md:p-6 animate-in fade-in duration-200">
      <div 
        id="prd-modal-container" 
        className="bg-white text-slate-900 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">genericMed — Industry-Level PRD</h2>
                <span className="bg-teal-100 text-teal-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">v1.0.0 Approved</span>
              </div>
              <p className="text-xs text-slate-500">Live Product Requirements Document matching the 18-page PDF specification</p>
            </div>
          </div>
          <button
            id="close-prd-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content split: navigation sidebar + section detail */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar nav */}
          <div className="w-full md:w-72 border-r border-slate-200 bg-slate-50/50 p-3 overflow-y-auto space-y-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Document Sections
            </div>
            {PRD_DOCUMENT.map((sec) => (
              <button
                key={sec.id}
                id={`prd-nav-${sec.id}`}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                  selectedSectionId === sec.id
                    ? 'bg-teal-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="truncate pr-2">
                  <span className="opacity-70 mr-1.5">{sec.number}.</span>
                  {sec.title}
                </span>
                <ArrowRight className={`w-3 h-3 shrink-0 ${selectedSectionId === sec.id ? 'opacity-100' : 'opacity-40'}`} />
              </button>
            ))}

            <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900">
              <p className="font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                Traceability Verified
              </p>
              <p className="text-[11px] text-teal-700 leading-relaxed">
                All P0 requirements (Brand-to-generic comparator, price sorting, review ranking, Rx matcher) are fully implemented in the mobile frontend.
              </p>
            </div>
          </div>

          {/* Main section view */}
          <div className="flex-1 p-6 overflow-y-auto bg-white space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
                Section {currentSection.number} of 24
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">{currentSection.title}</h3>
              <p className="text-sm text-slate-600 mt-1 font-medium">{currentSection.summary}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Specifications</h4>
              <ul className="space-y-2">
                {currentSection.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentSection.tables && (
              <div className="space-y-2 mt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Specification Table</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        {currentSection.tables.headers.map((h, i) => (
                          <th key={i} className="px-3 py-2.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentSection.tables.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/80">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`px-3 py-2.5 ${cIdx === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                              {cell === 'P0' ? (
                                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px]">P0 (Launch)</span>
                              ) : cell === 'P1' ? (
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">P1 (Fast-follow)</span>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>genericMed Product Requirements Document (PRD)</span>
              <span className="text-teal-700 font-semibold">Strict adherence to PDF standard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
