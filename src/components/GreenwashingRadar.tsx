import React from 'react';
import { ShieldCheck, AlertTriangle, FileX2, CheckCircle } from 'lucide-react';
import { BrandEvaluation } from '../types';

interface GreenwashingRadarProps {
  evaluation: BrandEvaluation;
}

export const GreenwashingRadar: React.FC<GreenwashingRadarProps> = ({
  evaluation,
}) => {
  const { greenwashingCheck } = evaluation;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High Risk':
        return 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]';
      case 'Moderate':
        return 'text-[#B45309] bg-[#FEF3C7] border-[#FCD34D]';
      case 'Low / Genuine':
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
            <ShieldCheck className="w-5 h-5 text-[#BE562C]" />
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626]">
              The Truth Test & Greenwashing Radar
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#76877D]">
            Marketing Claims vs. Independent Audits • Third-Party Certifications
          </p>
        </div>

        <div className="shrink-0">
          <span
            className={`inline-block px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border ${getRiskColor(
              greenwashingCheck.greenwashingRisk
            )}`}
          >
            {greenwashingCheck.greenwashingRisk}
          </span>
        </div>
      </div>

      {/* Editorial Reality vs Marketing */}
      <div className="py-5 sm:py-6 border-b border-[#E5DFD4]">
        <h3 className="font-editorial-serif text-lg font-medium text-[#183626] mb-2">
          Reality vs. Brand Marketing
        </h3>
        <p className="text-sm text-[#46574D] leading-relaxed">
          {greenwashingCheck.realityVersusMarketing}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-5 sm:pt-6">
        {/* Unverified / Questionable Claims */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-[#BE562C]">
            <FileX2 className="w-4 h-4" />
            <h4 className="font-mono text-xs uppercase tracking-widest font-semibold">
              Unverified / Misleading Claims
            </h4>
          </div>

          {greenwashingCheck.unverifiedClaims &&
          greenwashingCheck.unverifiedClaims.length > 0 ? (
            <ul className="space-y-2">
              {greenwashingCheck.unverifiedClaims.map((claim, idx) => (
                <li
                  key={idx}
                  className="p-3 border border-[#EED7CD] bg-[#FDF7F4] text-xs text-[#7A361A] flex items-start gap-2 leading-relaxed"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-[#BE562C] mt-0.5 shrink-0" />
                  <span>{claim}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 border border-[#E5DFD4] bg-white text-xs text-[#627369]">
              No flagrant unverified or deceptive marketing claims detected in current public campaigns.
            </div>
          )}
        </div>

        {/* Verified Certifications */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-[#183626]">
            <CheckCircle className="w-4 h-4" />
            <h4 className="font-mono text-xs uppercase tracking-widest font-semibold">
              Verified Third-Party Certifications
            </h4>
          </div>

          {greenwashingCheck.verifiedCertifications &&
          greenwashingCheck.verifiedCertifications.length > 0 ? (
            <ul className="space-y-2">
              {greenwashingCheck.verifiedCertifications.map((cert, idx) => (
                <li
                  key={idx}
                  className="p-3 border border-[#D1E5D8] bg-[#F4F9F6] text-xs text-[#183626] flex items-center gap-2 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-[#183626]" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 border border-[#E5DFD4] bg-white text-xs text-[#627369]">
              Zero independent, gold-standard third-party certifications (e.g. GOTS, B Corp, Fair Trade) on record.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
