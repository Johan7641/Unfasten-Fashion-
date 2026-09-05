import React from 'react';
import { Users, AlertOctagon, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';
import { BrandEvaluation } from '../types';

interface LaborAuditProps {
  evaluation: BrandEvaluation;
}

export const LaborAudit: React.FC<LaborAuditProps> = ({ evaluation }) => {
  const { laborEthics } = evaluation;

  const getLivingWageBadge = (status: string) => {
    switch (status) {
      case 'Certified Living Wage':
        return 'text-[#183626] bg-[#ECF4EE] border-[#B7D8C2]';
      case 'Partial Progress':
        return 'text-[#1E3A8A] bg-[#EFF6FF] border-[#BFDBFE]';
      case 'Unverified / Likely Below Living Wage':
        return 'text-[#92400E] bg-[#FEF3C7] border-[#FDE68A]';
      case 'Documented Wage Violations':
      default:
        return 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]';
    }
  };

  return (
    <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-6 md:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#E5DFD4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-[#BE562C]" />
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626]">
              Labor Rights & Supply Chain
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#76877D]">
            Living Wages • Working Conditions • Worker Transparency
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#76877D] block">
              Labor Ethics Score
            </span>
            <span className="font-editorial-serif text-2xl font-bold text-[#183626]">
              {laborEthics.score}
              <span className="text-sm font-normal text-[#76877D]">/100</span>
            </span>
          </div>
          <div className="w-14 h-2 bg-[#E5DFD4] overflow-hidden">
            <div
              className={`h-full ${
                laborEthics.score >= 75
                  ? 'bg-[#183626]'
                  : laborEthics.score >= 45
                  ? 'bg-[#E08D3C]'
                  : 'bg-[#BE562C]'
              }`}
              style={{ width: `${laborEthics.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 py-5 sm:py-6 border-b border-[#E5DFD4]">
        {/* Living Wage Status */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#76877D] block mb-1">
            Living Wage Verification
          </span>
          <div className="mt-1.5 mb-2">
            <span
              className={`inline-block px-3 py-1 text-xs font-mono font-semibold uppercase border ${getLivingWageBadge(
                laborEthics.livingWageStatus
              )}`}
            >
              {laborEthics.livingWageStatus}
            </span>
          </div>
          <p className="text-xs text-[#5D6F65] leading-relaxed">
            Measures whether manufacturing workers earn enough for food, housing, healthcare, transport, and basic savings.
          </p>
        </div>

        {/* Traceability */}
        <div className="p-4 border border-[#E5DFD4] bg-[#F6F2EA]">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#76877D] block mb-1">
            Supply Chain Traceability
          </span>
          <div className="flex items-center gap-2 mt-1 mb-2">
            <Eye className="w-4 h-4 text-[#183626]" />
            <span className="font-editorial-serif text-lg font-semibold text-[#183626]">
              {laborEthics.transparencyLevel}
            </span>
          </div>
          <p className="text-xs text-[#5D6F65] leading-relaxed">
            Audit standard: {laborEthics.auditFrequency}
          </p>
        </div>
      </div>

      {/* Human Rights Deep Dive */}
      <div className="py-6 border-b border-[#E5DFD4]">
        <h3 className="font-editorial-serif text-lg font-medium text-[#183626] mb-2">
          Working Conditions & Human Rights Summary
        </h3>
        <p className="text-sm text-[#4E5E55] leading-relaxed">
          {laborEthics.humanRightsDetails}
        </p>
      </div>

      {/* Documented Labor Controversies */}
      {laborEthics.controversies && laborEthics.controversies.length > 0 && (
        <div className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-[#BE562C]" />
            <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-[#BE562C]">
              Documented Labor Watchdog Disclosures
            </h3>
          </div>
          <div className="space-y-2">
            {laborEthics.controversies.map((controversy, idx) => (
              <div
                key={idx}
                className="p-3 border border-[#EACEC1] bg-[#FDF7F4] text-xs text-[#7A361A] flex items-start gap-2.5 leading-relaxed"
              >
                <span className="font-mono font-bold text-[#BE562C] shrink-0">
                  [{String(idx + 1).padStart(2, '0')}]
                </span>
                <span>{controversy}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
