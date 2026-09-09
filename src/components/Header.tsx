import React from 'react';
import { Sparkles, ShieldCheck, FileText, BookOpen, Search, ArrowRightLeft } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onOpenMethodology: () => void;
  onOpenCompare: () => void;
  onOpenAiChat: () => void;
  onOpenTerms?: () => void;
  activeView?: 'investigate' | 'blog';
  onSelectView?: (view: 'investigate' | 'blog') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onOpenMethodology,
  onOpenCompare,
  onOpenAiChat,
  onOpenTerms,
  activeView = 'investigate',
  onSelectView,
}) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8 pb-3 sm:pb-4">
      <div className="flex items-center justify-between gap-3">
        <button
          id="unfasten-home-logo"
          onClick={onReset}
          className="group text-left focus:outline-none cursor-pointer py-1 min-h-[44px] flex flex-col justify-center"
        >
          <span className="font-editorial-serif tracking-[0.25em] text-base sm:text-lg font-bold uppercase text-[#183626] group-hover:text-[#be562c] transition-colors">
            UNFASTEN
          </span>
          <span className="block text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#738379] font-medium mt-0.5">
            Fashion Intelligence
          </span>
        </button>

        {/* Center / Navigation Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#FAF8F5] p-1 border border-[#D5CEC2]">
          <button
            type="button"
            onClick={() => onSelectView && onSelectView('investigate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer min-h-[34px] ${
              activeView === 'investigate'
                ? 'bg-[#183626] text-white font-semibold shadow-xs'
                : 'text-[#54655b] hover:text-[#183626]'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Brand Audits</span>
            <span className="sm:hidden">Audits</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView && onSelectView('blog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer min-h-[34px] ${
              activeView === 'blog'
                ? 'bg-[#183626] text-white font-semibold shadow-xs'
                : 'text-[#54655b] hover:text-[#183626]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial &amp; Blog</span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D5CEC2] bg-[#FAF8F5] text-xs font-mono tracking-wider uppercase text-[#183626] hover:border-[#183626] hover:bg-[#F2ECE1] active:bg-[#EAE2D5] transition-colors cursor-pointer min-h-[38px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BE562C]" />
            <span className="hidden md:inline">AI Inspector</span>
          </button>

          {/* Compare Brands - placed right next to Methodology */}
          <button
            id="compare-nav-btn"
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-[#D5CEC2] bg-[#FAF8F5] hover:bg-[#183626] hover:text-white hover:border-[#183626] text-xs font-mono tracking-wider uppercase text-[#183626] transition-colors cursor-pointer min-h-[38px] group"
            title="Compare 2 or More Brands Side-by-Side"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#be562c] group-hover:text-[#E8A585]" />
            <span className="font-semibold">Compare</span>
          </button>

          <button
            id="methodology-nav-btn"
            onClick={onOpenMethodology}
            className="flex items-center gap-1.5 px-2 sm:px-0 py-1.5 text-xs tracking-wider uppercase text-[#54655b] hover:text-[#183626] transition-colors cursor-pointer font-medium min-h-[38px]"
            title="Audit Methodology"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#be562c]" />
            <span className="hidden sm:inline">Methodology</span>
          </button>

          {onOpenTerms && (
            <button
              id="terms-nav-btn"
              onClick={onOpenTerms}
              className="flex items-center gap-1.5 px-2 sm:px-0 py-1.5 text-xs tracking-wider uppercase text-[#54655b] hover:text-[#183626] transition-colors cursor-pointer font-medium min-h-[38px]"
              title="Legal, Disclaimers & Privacy"
            >
              <FileText className="w-3.5 h-3.5 text-[#183626]" />
              <span className="hidden lg:inline">Legal</span>
            </button>
          )}
        </div>
      </div>

      <div className="w-full mt-3 sm:mt-4 border-subtle-rule"></div>
    </header>
  );
};
