import React, { useState } from 'react';
import {
  Layers,
  Clock,
  Wrench,
  ShieldCheck,
  Droplets,
  AlertTriangle,
  Plus,
  Minus,
  Globe,
  Tag,
  Scale,
} from 'lucide-react';
import { BrandEvaluation, MaterialBreakdownItem } from '../types';
import { getMaterialDetailedAudit } from '../utils/materialDetails';

interface MaterialAuditProps {
  evaluation: BrandEvaluation;
}

const FIBER_COLORS = [
  '#183626', // Deep Forest Green
  '#BE562C', // Terracotta Rust
  '#D97706', // Warm Amber
  '#4A6B56', // Sage Green
  '#76877D', // Slate Stone
  '#8C7355', // Warm Taupe
  '#9E6B55', // Clay
  '#5C6E64', // Pine Grey
];

// Helper to determine fiber category
function getFiberCategory(fiber: string): { label: 'SYNTHETIC' | 'NATURAL' | 'CELLULOSIC' | 'RECYCLED'; style: string } {
  const f = fiber.toLowerCase();
  if (f.includes('recycled') || f.includes('circulose') || f.includes('netplus')) {
    return { label: 'RECYCLED', style: 'bg-[#EFF7F2] text-[#183626] border-[#B7D8C2]' };
  }
  if (
    f.includes('poly') ||
    f.includes('nylon') ||
    f.includes('acrylic') ||
    f.includes('elastane') ||
    f.includes('spandex') ||
    f.includes('polyurethane') ||
    f.includes('pvc') ||
    f.includes('synthetic')
  ) {
    return { label: 'SYNTHETIC', style: 'bg-[#FDF7F4] text-[#BE562C] border-[#EED7CD]' };
  }
  if (
    f.includes('viscose') ||
    f.includes('rayon') ||
    f.includes('lyocell') ||
    f.includes('tencel') ||
    f.includes('modal')
  ) {
    return { label: 'CELLULOSIC', style: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]' };
  }
  return { label: 'NATURAL', style: 'bg-[#ECF4EE] text-[#183626] border-[#B7D8C2]' };
}

// Helper to parse percentages for horizontal bar
function parsePercentage(estimate: string): number {
  const rangeMatch = estimate.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    return (parseInt(rangeMatch[1], 10) + parseInt(rangeMatch[2], 10)) / 2;
  }
  const singleMatch = estimate.match(/(\d+)/);
  if (singleMatch) {
    return parseInt(singleMatch[1], 10);
  }
  if (estimate.includes('<1')) return 1;
  return 10;
}

export const MaterialAudit: React.FC<MaterialAuditProps> = ({ evaluation }) => {
  const { materials } = evaluation;
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

  // Compute normalized percentage widths for the horizontal stacked bar
  const rawPercentages = materials.breakdown.map((item) => parsePercentage(item.percentageEstimate));
  const rawSum = rawPercentages.reduce((a, b) => a + b, 0) || 100;
  const normalizedPercentages = rawPercentages.map((p) => Math.max(3, (p / rawSum) * 100));
  const normalizedSum = normalizedPercentages.reduce((a, b) => a + b, 0);

  return (
    <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-6 md:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#E5DFD4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-[#BE562C]" />
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626]">
              Material Integrity &amp; Durability
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#76877D]">
            Textile Science Lab Audit • Microplastic Index • Lifespan Projection
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

          <div className="w-16 h-3 bg-[#E5DFD4] rounded-none overflow-hidden border border-[#D5CEC2]">
            <div
              className={`h-full rounded-none ${
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
              className={`inline-block px-2.5 py-1 text-xs font-mono font-semibold uppercase border rounded-none ${getMicroplasticColor(
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

      {/* Horizontal Bar: Identified Fiber Breakdown */}
      <div className="pt-6 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
          <h3 className="font-editorial-serif text-lg sm:text-xl font-medium text-[#183626]">
            Identified Fiber Breakdown
          </h3>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#76877D]">
            Based on label testing &amp; watchdog spectroscopy
          </span>
        </div>

        {/* Horizontal Stacked Bar (SQUARED CORNERS STRICTLY MAINTAINED) */}
        <div className="w-full h-8 sm:h-9 flex overflow-hidden border border-[#D5CEC2] rounded-none bg-[#EAE5DC] shadow-2xs">
          {materials.breakdown.map((item, index) => {
            const widthPercent = (normalizedPercentages[index] / normalizedSum) * 100;
            const color = FIBER_COLORS[index % FIBER_COLORS.length];
            const displayPct = item.percentageEstimate;
            return (
              <div
                key={index}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: color,
                }}
                title={`${item.fiber}: ${item.percentageEstimate}`}
                className="h-full flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-white tracking-wider border-r border-white/20 last:border-r-0 transition-all duration-300 relative group select-none rounded-none"
              >
                {widthPercent >= 8 && (
                  <span className="truncate px-1 drop-shadow-xs">
                    {displayPct.includes('%') ? displayPct : `${Math.round(widthPercent)}%`}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Horizontal Bar Legend (Squared markers) */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 pt-2 text-xs font-mono">
          {materials.breakdown.map((item, index) => {
            const color = FIBER_COLORS[index % FIBER_COLORS.length];
            return (
              <div key={index} className="inline-flex items-center gap-2 text-[#46574D]">
                <span
                  className="w-3 h-3 rounded-none shrink-0 border border-black/10"
                  style={{ backgroundColor: color }}
                />
                <span className="font-medium text-[#183626]">{item.fiber}</span>
                <span className="text-[#76877D]">({item.percentageEstimate})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Fiber Detailed Cards Grid */}
      <div className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {materials.breakdown.map((item, index) => {
            const category = getFiberCategory(item.fiber);
            const isSynthetic = category.label === 'SYNTHETIC';
            const detail = getMaterialDetailedAudit(
              item,
              evaluation.brandName,
              evaluation.fashionPace,
              evaluation.score
            );
            const isExpanded = !!expandedIndices[index];

            return (
              <div
                key={index}
                className="p-4 border border-[#E5DFD4] bg-white rounded-none flex flex-col justify-between shadow-2xs transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-editorial-serif text-base font-semibold text-[#183626]">
                        {item.fiber}
                      </h4>
                      <span className="font-mono text-xs font-bold text-[#76877D]">
                        {item.percentageEstimate} of garment weight
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border rounded-none ${category.style}`}
                      >
                        {category.label}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider font-semibold rounded-none ${getSustainabilityBadge(
                          item.sustainabilityLevel
                        )}`}
                      >
                        {item.sustainabilityLevel}
                      </span>
                      {/* Plus Button requested by user */}
                      <button
                        type="button"
                        id={`material-plus-btn-${index}`}
                        onClick={() => toggleExpand(index)}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? `Collapse details for ${item.fiber}` : `Expand details for ${item.fiber}`}
                        className={`w-6 h-6 border flex items-center justify-center transition-all cursor-pointer rounded-none shrink-0 ${
                          isExpanded
                            ? 'bg-[#183626] text-white border-[#183626]'
                            : 'border-[#D5CEC2] bg-[#FAF8F5] text-[#183626] hover:bg-[#183626] hover:text-white hover:border-[#183626]'
                        }`}
                        title={isExpanded ? 'Collapse sourcing & usage details' : 'Expand how brand uses material, sourcing origin, and score out of 10'}
                      >
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#5D6F65] leading-relaxed mt-2">
                    {item.notes}
                  </p>
                </div>

                <div>
                  <div className="mt-3 pt-3 border-t border-[#F2EDE3] flex items-center justify-between text-[11px] font-mono text-[#76877D]">
                    <span>
                      Microplastic Risk:{' '}
                      <strong className={isSynthetic ? 'text-[#BE562C]' : 'text-[#183626]'}>
                        {isSynthetic ? 'Critical' : 'Negligible'}
                      </strong>
                    </span>
                    <span>
                      Lifecycle Impact:{' '}
                      <strong className={item.sustainabilityLevel === 'Poor' ? 'text-[#BE562C]' : 'text-[#183626]'}>
                        {item.sustainabilityLevel === 'Poor' ? 'High' : item.sustainabilityLevel === 'Moderate' ? 'Moderate' : 'Low'}
                      </strong>
                    </span>
                  </div>

                  {/* Expand/Collapse prompt bar */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(index)}
                    className="mt-2.5 pt-2 border-t border-[#F2EDE3] flex items-center justify-between text-[11px] font-mono text-[#76877D] hover:text-[#183626] transition-colors w-full cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5 font-medium">
                      {isExpanded ? (
                        <Minus className="w-3 h-3 text-[#BE562C]" />
                      ) : (
                        <Plus className="w-3 h-3 text-[#BE562C]" />
                      )}
                      <span>
                        {isExpanded ? 'Hide Sourcing & Usage' : 'Sourcing, Usage & Score Details'}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-[#FAF3EC] border border-[#EED7CD] text-[#BE562C]">
                      {detail.sustainabilityScore}/10
                    </span>
                  </button>
                </div>

                {/* Expanded Sourcing, Usage & Sustainability Score (/10) Section */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#E5DFD4] bg-[#FAF8F5] -mx-4 -mb-4 p-4 space-y-3 animate-in fade-in duration-200">
                    {/* 1. Sustainability Score out of 10 */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#EAE4D9]">
                      <div className="flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-[#BE562C]" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#76877D] font-bold">
                          Material Sustainability Score
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-[#E5DFD4] rounded-none overflow-hidden border border-[#D5CEC2]">
                          <div
                            className={`h-full rounded-none ${
                              detail.sustainabilityScore >= 7.5
                                ? 'bg-[#183626]'
                                : detail.sustainabilityScore >= 4.5
                                ? 'bg-[#E08D3C]'
                                : 'bg-[#BE562C]'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(8, detail.sustainabilityScore * 10))}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs font-extrabold text-[#183626]">
                          {detail.sustainabilityScore.toFixed(1)}{' '}
                          <span className="text-[10px] font-normal text-[#76877D]">/ 10</span>
                        </span>
                      </div>
                    </div>

                    {/* 2. How the brand or product uses the specific material */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Tag className="w-3 h-3 text-[#BE562C] shrink-0" />
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#183626]">
                          How {evaluation.identifiedProduct ? 'This Product' : evaluation.brandName} Uses {item.fiber}:
                        </span>
                      </div>
                      <p className="text-xs text-[#46574D] leading-relaxed pl-4">
                        {detail.usageDetails}
                      </p>
                    </div>

                    {/* 3. Where it is sourced from */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Globe className="w-3 h-3 text-[#183626] shrink-0" />
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#183626]">
                          Sourcing Footprint &amp; Origin:
                        </span>
                      </div>
                      <p className="text-xs text-[#46574D] leading-relaxed pl-4">
                        {detail.sourcingOrigin}
                      </p>
                    </div>

                    {/* Score breakdown pillars */}
                    <div className="pt-2 border-t border-[#EAE4D9] grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-mono text-[#5D6F65]">
                      <div>
                        <strong className="text-[#183626] block uppercase tracking-wider">Resource Impact:</strong>
                        <span>{detail.scoreBreakdown.resourceImpact}</span>
                      </div>
                      <div>
                        <strong className="text-[#183626] block uppercase tracking-wider">Circularity:</strong>
                        <span>{detail.scoreBreakdown.circularity}</span>
                      </div>
                      <div>
                        <strong className="text-[#183626] block uppercase tracking-wider">Traceability:</strong>
                        <span>{detail.scoreBreakdown.supplyTransparency}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lab Summary Diagnostics (3 Horizontal Boxes with Squared Corners) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-[#E5DFD4]">
        <div className="p-4 border border-[#E5DFD4] bg-white rounded-none">
          <div className="flex items-center gap-2 mb-1.5">
            <Clock className="w-4 h-4 text-[#BE562C]" />
            <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-[#183626]">
              Expected Lifespan
            </h5>
          </div>
          <p className="text-xs text-[#46574D] leading-relaxed">
            {materials.lifespanEstimate}
          </p>
        </div>

        <div className="p-4 border border-[#E5DFD4] bg-white rounded-none">
          <div className="flex items-center gap-2 mb-1.5">
            <Droplets className="w-4 h-4 text-[#BE562C]" />
            <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-[#183626]">
              Microplastic Emission
            </h5>
          </div>
          <p className="text-xs text-[#46574D] leading-relaxed">
            {materials.microplasticRisk} shedding intensity driven by {materials.virginSyntheticsShare}.
          </p>
        </div>

        <div className="p-4 border border-[#E5DFD4] bg-white rounded-none">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-[#183626]" />
            <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-[#183626]">
              Circularity &amp; Repair
            </h5>
          </div>
          <p className="text-xs text-[#46574D] leading-relaxed">
            {materials.repairability}
          </p>
        </div>
      </div>
    </div>
  );
};

