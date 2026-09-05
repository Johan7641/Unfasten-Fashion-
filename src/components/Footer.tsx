import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenMethodology: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMethodology }) => {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-14 sm:pb-16 mt-8 sm:mt-12 text-[#5E6F65]">
      <div className="border-t border-[#D5CEC2] pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-editorial-serif tracking-[0.25em] text-base font-bold uppercase text-[#183626]">
              UNFASTEN
            </span>
            <span className="text-xs font-mono text-[#BE562C] font-semibold">
              EST. SLOW • 2026
            </span>
          </div>
          <p className="text-xs text-[#7A8A81] mt-1 max-w-md">
            Dedicated to radical transparency in global garment manufacturing, material durability, and human dignity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono">
          <button
            type="button"
            onClick={onOpenMethodology}
            className="hover:text-[#183626] transition-colors cursor-pointer uppercase tracking-wider min-h-[36px] flex items-center"
          >
            Audit Methodology
          </button>
          <span className="text-[#B5C2BA] hidden sm:inline">•</span>
          <span className="text-xs text-[#7A8A81]">
            Powered by Google AI Studio
          </span>
        </div>
      </div>
    </footer>
  );
};
