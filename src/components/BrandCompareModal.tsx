import React, { useState } from 'react';
import { X, ArrowRightLeft, Check, AlertTriangle, Layers, Users, Leaf, ShieldAlert } from 'lucide-react';
import { BrandEvaluation } from '../types';
import { CURATED_BRANDS } from '../data/curatedBrands';

interface BrandCompareModalProps {
  currentBrand: BrandEvaluation;
  onClose: () => void;
  onSelectCompareBrand: (brandName: string) => void;
}

export const BrandCompareModal: React.FC<BrandCompareModalProps> = ({
  currentBrand,
  onClose,
  onSelectCompareBrand,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(
    currentBrand.brandName.toLowerCase() === 'patagonia' ? 'shein' : 'patagonia'
  );

  const compareBrand = CURATED_BRANDS[selectedKey] || CURATED_BRANDS['patagonia'];

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'EXEMPLARY':
      case 'RECOMMENDED':
        return 'text-[#183626] bg-[#ECF4EE] border-[#B7D8C2]';
      case 'MODERATE':
        return 'text-[#B45309] bg-[#FEF3C7] border-[#FCD34D]';
      case 'AVOID':
      case 'EXTREME CAUTION':
      default:
        return 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#183626]/60 backdrop-blur-xs">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] border border-[#D5CEC2] shadow-2xl p-4 sm:p-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD4]">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-[#BE562C] shrink-0" />
            <h2 className="font-editorial-serif text-xl sm:text-2xl font-normal text-[#183626]">
              Side-by-Side Brand Comparison
            </h2>
          </div>
          <button
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#76877D] hover:text-[#183626] transition-colors cursor-pointer"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Select compare target */}
        <div className="py-3 sm:py-4 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono">
          <span className="text-[#76877D] uppercase tracking-wider font-semibold w-full sm:w-auto mb-1 sm:mb-0">
            Compare against:
          </span>
          {Object.keys(CURATED_BRANDS).map((key) => {
            const b = CURATED_BRANDS[key];
            const isCurrent = b.brandName.toLowerCase() === currentBrand.brandName.toLowerCase();
            return (
              <button
                key={key}
                type="button"
                disabled={isCurrent}
                onClick={() => setSelectedKey(key)}
                className={`min-h-[36px] px-3 py-1.5 border transition-colors cursor-pointer text-xs font-mono ${
                  selectedKey === key
                    ? 'bg-[#183626] text-white border-[#183626]'
                    : isCurrent
                    ? 'opacity-40 cursor-not-allowed border-[#DCD5C9]'
                    : 'bg-white border-[#DCD5C9] text-[#183626] hover:bg-[#F2ECE1] active:bg-[#EAE2D5]'
                }`}
              >
                {b.brandName}
              </button>
            );
          })}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {/* Current Brand Card */}
          <div className="border border-[#DCD5C9] bg-white p-5">
            <div className="pb-3 border-b border-[#EDE8DE]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#76877D]">
                Investigated
              </span>
              <h3 className="font-editorial-serif text-2xl font-bold text-[#183626]">
                {currentBrand.brandName}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-editorial-serif text-3xl font-bold text-[#183626]">
                  {currentBrand.score}
                  <span className="text-sm font-normal text-[#76877D]">/100</span>
                </span>
                <span
                  className={`px-2.5 py-0.5 text-xs font-mono font-bold uppercase border ${getVerdictStyle(
                    currentBrand.verdict
                  )}`}
                >
                  Grade {currentBrand.grade} • {currentBrand.verdict}
                </span>
              </div>
            </div>

            <div className="py-3 space-y-3 text-xs">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Virgin Synthetics
                </span>
                <p className="font-semibold text-[#183626]">
                  {currentBrand.materials.virginSyntheticsShare}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Microplastic Shedding
                </span>
                <p className="font-semibold text-[#183626]">
                  {currentBrand.materials.microplasticRisk} Risk
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Living Wage Status
                </span>
                <p className="font-semibold text-[#183626]">
                  {currentBrand.laborEthics.livingWageStatus}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Supply Chain Traceability
                </span>
                <p className="font-semibold text-[#183626]">
                  {currentBrand.laborEthics.transparencyLevel}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Greenwashing Risk
                </span>
                <p className="font-semibold text-[#183626]">
                  {currentBrand.greenwashingCheck.greenwashingRisk}
                </p>
              </div>
            </div>
          </div>

          {/* Compare Brand Card */}
          <div className="border border-[#DCD5C9] bg-white p-5">
            <div className="pb-3 border-b border-[#EDE8DE]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#76877D]">
                Comparison Benchmark
              </span>
              <h3 className="font-editorial-serif text-2xl font-bold text-[#183626]">
                {compareBrand.brandName}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-editorial-serif text-3xl font-bold text-[#183626]">
                  {compareBrand.score}
                  <span className="text-sm font-normal text-[#76877D]">/100</span>
                </span>
                <span
                  className={`px-2.5 py-0.5 text-xs font-mono font-bold uppercase border ${getVerdictStyle(
                    compareBrand.verdict
                  )}`}
                >
                  Grade {compareBrand.grade} • {compareBrand.verdict}
                </span>
              </div>
            </div>

            <div className="py-3 space-y-3 text-xs">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Virgin Synthetics
                </span>
                <p className="font-semibold text-[#183626]">
                  {compareBrand.materials.virginSyntheticsShare}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Microplastic Shedding
                </span>
                <p className="font-semibold text-[#183626]">
                  {compareBrand.materials.microplasticRisk} Risk
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Living Wage Status
                </span>
                <p className="font-semibold text-[#183626]">
                  {compareBrand.laborEthics.livingWageStatus}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Supply Chain Traceability
                </span>
                <p className="font-semibold text-[#183626]">
                  {compareBrand.laborEthics.transparencyLevel}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase text-[#76877D] block">
                  Greenwashing Risk
                </span>
                <p className="font-semibold text-[#183626]">
                  {compareBrand.greenwashingCheck.greenwashingRisk}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal actions */}
        <div className="mt-6 pt-4 border-t border-[#E5DFD4] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#5C6E64] hover:text-[#183626] cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectCompareBrand(compareBrand.brandName);
              onClose();
            }}
            className="px-5 py-2 bg-[#183626] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#224b35] transition-colors cursor-pointer"
          >
            Open Full {compareBrand.brandName} Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
