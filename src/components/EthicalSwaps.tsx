import React from 'react';
import { ArrowUpRight, Sparkles, CheckCheck } from 'lucide-react';
import { BrandEvaluation } from '../types';

interface EthicalSwapsProps {
  evaluation: BrandEvaluation;
  onSelectAlternative: (brandName: string) => void;
}

export const EthicalSwaps: React.FC<EthicalSwapsProps> = ({
  evaluation,
  onSelectAlternative,
}) => {
  const { ethicalAlternatives, brandName } = evaluation;

  if (!ethicalAlternatives || ethicalAlternatives.length === 0) {
    return null;
  }

  return (
    <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="pb-5 sm:pb-6 border-b border-[#E5DFD4]">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-[#BE562C]" />
          <h2 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626]">
            Ethical Slow-Fashion Swaps
          </h2>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-[#76877D]">
          Better choices with similar aesthetic appeal and proven material transparency
        </p>
      </div>

      {/* Grid of alternatives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6">
        {ethicalAlternatives.map((alt, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 border border-[#DCD5C9] bg-white flex flex-col justify-between hover:border-[#183626] transition-all group shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-editorial-serif text-xl font-semibold text-[#183626] group-hover:text-[#BE562C] transition-colors">
                  {alt.name}
                </h3>
                <span className="font-mono text-xs font-bold text-[#76877D] bg-[#F2EDE3] px-2 py-0.5">
                  {alt.priceTier}
                </span>
              </div>

              <div className="mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#BE562C] font-semibold block mb-0.5">
                  Style Match
                </span>
                <p className="text-xs text-[#5D6F65]">
                  {alt.aestheticMatch}
                </p>
              </div>

              <div className="mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#183626] font-semibold block mb-0.5">
                  Why It&apos;s Better
                </span>
                <p className="text-xs text-[#46574D] leading-relaxed">
                  {alt.whyBetter}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE8DE] flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#183626] bg-[#ECF4EE] px-2 py-0.5">
                <CheckCheck className="w-3 h-3 text-[#183626]" />
                {alt.highlightCertification}
              </span>

              <button
                type="button"
                onClick={() => onSelectAlternative(alt.name)}
                className="text-xs font-mono font-semibold uppercase tracking-wider text-[#BE562C] hover:text-[#183626] active:text-[#12281c] flex items-center gap-0.5 cursor-pointer min-h-[36px] py-1 px-1.5"
              >
                Inspect
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
