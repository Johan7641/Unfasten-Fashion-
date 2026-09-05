import React from 'react';
import { Layers, AlertTriangle, Clock, Wrench, Sparkles } from 'lucide-react';
import { BrandEvaluation } from '../types';

interface MaterialAuditProps {
  evaluation: BrandEvaluation;
}

export const MaterialAudit: React.FC<MaterialAuditProps> = ({ evaluation }) => {
  const { materials } = evaluation;

  const getSustainabilityBadge = (level: string) => {
    switch (level) {
      case 'Excellent':
        return 'bg-[#183626] text-white';
      case 'Good':
        return 'bg-[#2A5E43] text-white';
      case 'Moderate':
        return 'bg-[#E08D3C] text-white';
      case 'Poor':
      default:
        return 'bg-[#BE562C] text-white';
    }
  };

  const getMicroplasticColor = (risk: string) => {
    switch (risk) {
      case 'Extreme':
      case 'High':
        return 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]';
      case 'Moderate':
        return 'text-[#B45309] bg-[#FEF3C7] border-[#FCD34D]';
      case 'Low':
      default:
        return 'text-[#183626] bg-[#ECF4EE] border-[#B7D8C2]';
    }
  };

  return (
    <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-6 md:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#E5DFD4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-[#BE562C]" />
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626]">
              Material Integrity & Durability
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#76877D]">
            Textile Science • Microplastic Index • Lifespan Projection
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#76877D] block">
              Durability Index
            </span>
            <span className="font-editorial-serif text-2xl font-bold text-[#183626]">
              {materials.durabilityScore}
              <span className="text-sm font-normal text-[#76877D]">/100</span>
            </span>
          </div>

          <div className="w-14 h-2 bg-[#E5DFD4] overflow-hidden">
            <div
              className={`h-full ${
                materials.durabilityScore >= 75
                  ? 'bg-[#183626]'
                  : materials.durabilityScore >= 45
                  ? 'bg-[#E08D3C]'
                  : 'bg-[#BE562C]'
              }`}
              style={{ width: `${materials.durabilityScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-6 border-b border-[#E5DFD4]">
        {/* Metric 1: Virgin Synthetics */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#76877D] block mb-1">
            Fossil-Fuel Synthetic Share
          </span>
          <p className="font-editorial-serif text-xl sm:text-2xl font-semibold text-[#183626]">
            {materials.virginSyntheticsShare}
          </p>
          <p className="text-xs text-[#5D6F65] mt-1.5 leading-relaxed">
            Non-biodegradable petroleum fibers that shed microplastics into water systems.
          </p>
        </div>

        {/* Metric 2: Microplastic Shedding Risk */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#76877D] block mb-1">
            Microplastic Shedding
          </span>
          <div className="mt-1">
            <span
              className={`inline-block px-2.5 py-1 text-xs font-mono font-semibold uppercase border ${getMicroplasticColor(
                materials.microplasticRisk
              )}`}
            >
              {materials.microplasticRisk} Risk
            </span>
          </div>
          <p className="text-xs text-[#5D6F65] mt-2 leading-relaxed">
            Rate of non-filterable microfilament release per standard household laundry wash.
          </p>
        </div>

        {/* Metric 3: Garment Lifespan */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#76877D] block mb-1">
            Projected Garment Lifespan
          </span>
          <div className="flex items-center gap-1.5 mt-1 text-[#183626]">
            <Clock className="w-4 h-4 text-[#BE562C] shrink-0" />
            <p className="text-sm font-medium leading-snug">
              {materials.lifespanEstimate}
            </p>
          </div>
        </div>
      </div>

      {/* Fiber Composition Breakdown Table */}
      <div className="pt-6">
        <h3 className="font-editorial-serif text-lg font-medium text-[#183626] mb-3">
          Estimated Fiber Composition Breakdown
        </h3>

        <div className="space-y-3">
          {materials.breakdown.map((item, index) => (
            <div
              key={index}
              className="p-3.5 border border-[#E5DFD4] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#183626]">
                    {item.fiber}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider font-semibold ${getSustainabilityBadge(
                      item.sustainabilityLevel
                    )}`}
                  >
                    {item.sustainabilityLevel}
                  </span>
                </div>
                <p className="text-xs text-[#627369] mt-1 leading-relaxed">
                  {item.notes}
                </p>
              </div>

              <div className="font-mono text-sm font-bold text-[#183626] text-right shrink-0">
                {item.percentageEstimate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repairability & Circularity Assessment */}
      <div className="mt-6 pt-6 border-t border-[#E5DFD4]">
        <div className="flex items-start gap-3 p-4 border border-[#DCD5C9] bg-[#F5F0E6]">
          <Wrench className="w-4 h-4 text-[#BE562C] mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest font-semibold text-[#183626] mb-1">
              Repairability & Circular Design Policy
            </h4>
            <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
              {materials.repairability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
