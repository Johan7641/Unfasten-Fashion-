import React from 'react';
import { Leaf, Droplets, Wind, PackageCheck, AlertCircle } from 'lucide-react';
import { BrandEvaluation } from '../types';

interface EcoAuditProps {
  evaluation: BrandEvaluation;
}

export const EcoAudit: React.FC<EcoAuditProps> = ({ evaluation }) => {
  const { environmentalImpact } = evaluation;

  return (
    <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-6 md:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#E5DFD4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-5 h-5 text-[#BE562C]" />
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626]">
              Environmental & Chemical Footprint
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#76877D]">
            Carbon Intensity • Toxic Dyeing & Water • Hazardous Chemicals
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#76877D] block">
              Environmental Score
            </span>
            <span className="font-editorial-serif text-2xl font-bold text-[#183626]">
              {environmentalImpact.score}
              <span className="text-sm font-normal text-[#76877D]">/100</span>
            </span>
          </div>
          <div className="w-14 h-2 bg-[#E5DFD4] overflow-hidden">
            <div
              className={`h-full ${
                environmentalImpact.score >= 75
                  ? 'bg-[#183626]'
                  : environmentalImpact.score >= 45
                  ? 'bg-[#E08D3C]'
                  : 'bg-[#BE562C]'
              }`}
              style={{ width: `${environmentalImpact.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of 4 environmental parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-5 sm:py-6 border-b border-[#E5DFD4]">
        {/* Carbon Logistics */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-[#183626]" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-[#183626]">
              Carbon & Logistics
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
            {environmentalImpact.carbonFootprint}
          </p>
        </div>

        {/* Water & Effluent */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-[#183626]" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-[#183626]">
              Water Consumption & Dyes
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
            {environmentalImpact.waterAndChemicals}
          </p>
        </div>

        {/* Hazardous Chemicals */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-[#BE562C]" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-[#183626]">
              Chemical Safety & ZDHC
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
            {environmentalImpact.hazardousChemicalCommitment}
          </p>
        </div>

        {/* Packaging */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <div className="flex items-center gap-2 mb-2">
            <PackageCheck className="w-4 h-4 text-[#183626]" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-[#183626]">
              Packaging & Shipping Materials
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
            {environmentalImpact.packagingFootprint}
          </p>
        </div>
      </div>

      {/* Highlights list */}
      {environmentalImpact.highlights && environmentalImpact.highlights.length > 0 && (
        <div className="pt-6">
          <h3 className="font-editorial-serif text-lg font-medium text-[#183626] mb-3">
            Critical Environmental Audits
          </h3>
          <ul className="space-y-2">
            {environmentalImpact.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-[#46574D] flex items-start gap-2 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#BE562C] mt-2 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
