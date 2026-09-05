import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Copy,
  Check,
  ArrowRightLeft,
  AlertTriangle,
  FileText,
  Layers,
  Users,
  Leaf,
  ShieldCheck,
  Sparkles,
  Menu,
  ChevronDown,
  X,
} from 'lucide-react';
import { BrandEvaluation } from '../types';
import { MaterialAudit } from './MaterialAudit';
import { LaborAudit } from './LaborAudit';
import { EcoAudit } from './EcoAudit';
import { GreenwashingRadar } from './GreenwashingRadar';
import { EthicalSwaps } from './EthicalSwaps';

interface BrandDossierProps {
  evaluation: BrandEvaluation;
  onBackToSearch: () => void;
  onOpenCompare: () => void;
  onSelectAlternative: (brandName: string) => void;
  onOpenAiChat: (initialPrompt?: string) => void;
}

type TabType = 'all' | 'materials' | 'labor' | 'environmental' | 'truth' | 'swaps';

const TABS: Array<{ id: TabType; label: string; icon: React.ElementType }> = [
  { id: 'all', label: 'ALL AUDITS', icon: Layers },
  { id: 'materials', label: 'MATERIALS & DURABILITY', icon: Layers },
  { id: 'labor', label: 'LABOR RIGHTS', icon: Users },
  { id: 'environmental', label: 'ENVIRONMENT & CARBON', icon: Leaf },
  { id: 'truth', label: 'GREENWASHING RADAR', icon: ShieldCheck },
  { id: 'swaps', label: 'ETHICAL SWAPS', icon: Sparkles },
];

export const BrandDossier: React.FC<BrandDossierProps> = ({
  evaluation,
  onBackToSearch,
  onOpenCompare,
  onSelectAlternative,
  onOpenAiChat,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Sync active tab with user's scroll position
  useEffect(() => {
    const sectionIds: Array<{ id: string; tab: TabType }> = [
      { id: 'audit-section-materials', tab: 'materials' },
      { id: 'audit-section-labor', tab: 'labor' },
      { id: 'audit-section-environmental', tab: 'environmental' },
      { id: 'audit-section-greenwashing', tab: 'truth' },
      { id: 'audit-section-swaps', tab: 'swaps' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const match = sectionIds.find((s) => s.id === visibleEntry.target.id);
          if (match) {
            setActiveTab(match.tab);
          }
        }
      },
      {
        rootMargin: '-15% 0px -55% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [evaluation]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);

    if (tab === 'all') {
      const el = document.getElementById('audit-section-materials') || document.getElementById('audit-navigation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    const sectionIdMap: Record<Exclude<TabType, 'all'>, string> = {
      materials: 'audit-section-materials',
      labor: 'audit-section-labor',
      environmental: 'audit-section-environmental',
      truth: 'audit-section-greenwashing',
      swaps: 'audit-section-swaps',
    };

    const targetId = sectionIdMap[tab];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'text-[#183626] border-[#183626] bg-[#ECF4EE]';
    if (score >= 60) return 'text-[#2A5E43] border-[#2A5E43] bg-[#EFF7F2]';
    if (score >= 40) return 'text-[#B45309] border-[#D97706] bg-[#FEF3C7]';
    return 'text-[#BE562C] border-[#BE562C] bg-[#FBEFE9]';
  };

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

  const handleCopySummary = () => {
    const text = `Unfasten Audit for ${evaluation.brandName}:
Score: ${evaluation.score}/100 (Grade ${evaluation.grade} • ${evaluation.verdict})
"${evaluation.oneLiner}"
Synthetics: ${evaluation.materials.virginSyntheticsShare}
Microplastics: ${evaluation.materials.microplasticRisk} Risk
Living Wages: ${evaluation.laborEthics.livingWageStatus}
Evaluated on unfastenfashion.com`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentTabInfo = TABS.find((t) => t.id === activeTab) || TABS[0];
  const CurrentTabIcon = currentTabInfo.icon;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-in fade-in duration-300">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E5DFD4]">
        <button
          type="button"
          onClick={onBackToSearch}
          className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] text-xs font-mono uppercase tracking-widest text-[#5C6E64] hover:text-[#183626] hover:bg-[#F2ECE1] transition-all duration-300 ease-out cursor-pointer min-h-[38px] self-start hover:-translate-y-0.5 active:translate-y-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Search
        </button>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={() => onOpenAiChat(`Explain the details behind ${evaluation.brandName}'s score of ${evaluation.score}/100`)}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#BE562C] hover:border-[#8C3413] bg-[#FDF6F3] text-[#BE562C] hover:bg-[#FBEFE9] active:bg-[#F9E2D6] transition-all duration-300 ease-out cursor-pointer font-semibold min-h-[38px] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BE562C]" />
            <span>Ask AI Inspector</span>
          </button>

          <button
            type="button"
            onClick={onOpenCompare}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] text-[#183626] hover:bg-[#F2ECE1] active:bg-[#EAE2D5] transition-all duration-300 ease-out cursor-pointer font-medium min-h-[38px] hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#BE562C]" />
            <span>Compare Brand</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] text-[#183626] hover:bg-[#F2ECE1] active:bg-[#EAE2D5] transition-all duration-300 ease-out cursor-pointer font-medium min-h-[38px] hover:-translate-y-0.5 active:translate-y-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#183626]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#76877D]" />
                <span>Share Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Dossier Header Card */}
      <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-8 md:p-10 mb-8 relative overflow-hidden shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8">
          {/* Left Column: Brand Bio */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#BE562C] font-semibold">
                INVESTIGATION DOSSIER #{Math.abs(evaluation.brandName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000))}
              </span>

              <span
                className={`px-2.5 sm:px-3 py-0.5 text-[11px] sm:text-xs font-mono font-bold uppercase border ${getVerdictStyle(
                  evaluation.verdict
                )}`}
              >
                VERDICT: {evaluation.verdict}
              </span>
            </div>

            <h1 className="font-editorial-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#183626] tracking-tight mb-2">
              {evaluation.brandName}
            </h1>

            <p className="text-xs sm:text-base font-medium text-[#76877D] mb-4">
              {evaluation.tagline}
              {evaluation.headquarters && ` • HQ: ${evaluation.headquarters}`}
              {evaluation.foundedYear && ` • Est. ${evaluation.foundedYear}`}
            </p>

            {/* Uploaded Screenshot Badge if audited from image */}
            {evaluation.uploadedImagePreview && (
              <div className="mb-4 inline-flex items-center gap-3 p-2.5 sm:p-3 border border-[#D5CEC2] bg-white max-w-lg shadow-2xs">
                <img
                  src={evaluation.uploadedImagePreview}
                  alt="Uploaded Product Screenshot"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover border border-[#D5CEC2] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#BE562C] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>AUDITED FROM PRODUCT SCREENSHOT</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#183626] font-medium truncate mt-0.5">
                    {evaluation.identifiedProduct || evaluation.brandName}
                  </p>
                </div>
              </div>
            )}

            {/* Editorial One-Liner */}
            <div className="p-3 sm:p-4 border-l-2 border-[#BE562C] bg-[#F5EFE4] mb-5 sm:mb-6">
              <p className="font-editorial-serif italic text-base sm:text-lg text-[#183626] leading-relaxed">
                &ldquo;{evaluation.oneLiner}&rdquo;
              </p>
            </div>

            {/* Full Summary */}
            <p className="text-xs sm:text-base text-[#46574D] leading-relaxed">
              {evaluation.summary}
            </p>
          </div>

          {/* Right Column: Scorecard & Stamp */}
          <div className="shrink-0 flex flex-col items-center lg:items-end justify-center w-full lg:w-auto">
            <div className="border border-[#D5CEC2] bg-white p-5 sm:p-6 text-center w-full max-w-xs sm:max-w-[240px] shadow-sm">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#76877D] block mb-1">
                UNFASTEN SCORE
              </span>

              <div className="font-editorial-serif text-5xl sm:text-6xl font-bold text-[#183626] my-1 sm:my-2">
                {evaluation.score}
                <span className="text-xl font-normal text-[#76877D]">/100</span>
              </div>

              <div className="inline-block px-4 py-1 text-xs sm:text-sm font-mono font-bold uppercase border mb-3 rounded-none">
                GRADE {evaluation.grade}
              </div>

              <div className="w-full bg-[#E5DFD4] h-1.5 overflow-hidden">
                <div
                  className={`h-full ${
                    evaluation.score >= 70
                      ? 'bg-[#183626]'
                      : evaluation.score >= 45
                      ? 'bg-[#E08D3C]'
                      : 'bg-[#BE562C]'
                  }`}
                  style={{ width: `${evaluation.score}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-[#8C9B92] block mt-2">
                INDEPENDENT SCIENTIFIC AUDIT
              </span>
            </div>
          </div>
        </div>

        {/* Fast Fashion Flags Callout */}
        {evaluation.fastFashionFlags && evaluation.fastFashionFlags.length > 0 && (
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E5DFD4]">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#BE562C]" />
              <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#BE562C]">
                Critical Warning Flags
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
              {evaluation.fastFashionFlags.map((flag, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3 border border-[#EED7CD] bg-[#FDF7F4] text-xs text-[#7A361A] font-medium leading-relaxed"
                >
                  • {flag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Filter Tabs for Dossier Sections - Sticky navigation */}
      <div
        id="audit-navigation"
        className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md py-2.5 mb-8 border-b border-[#D5CEC2] shadow-xs"
      >
        {/* Mobile & Tablet Bar: 3-line menu button + current page button in green background */}
        <div className="flex xl:hidden items-center gap-2">
          {/* 3 lines menu options button */}
          <button
            type="button"
            id="audit-menu-toggle-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle section navigation menu"
            aria-expanded={isMenuOpen}
            className="min-h-[44px] min-w-[44px] px-3 py-2 border border-[#D5CEC2] bg-[#FAF8F5] text-[#183626] hover:bg-[#F0EAE0] active:bg-[#E5DFD4] flex items-center justify-center transition-all duration-300 ease-out cursor-pointer shadow-xs shrink-0"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-[#183626] transition-transform duration-300 ease-out" />
            ) : (
              <Menu className="w-5 h-5 text-[#183626] transition-transform duration-300 ease-out" />
            )}
          </button>

          {/* Towards the right of it in the same green background, a button showing which page you're on */}
          <button
            type="button"
            id="audit-current-section-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex-1 min-h-[44px] px-4 py-2 bg-[#183626] text-white border border-[#183626] hover:bg-[#204732] active:bg-[#12281c] flex items-center justify-between gap-2.5 transition-all duration-300 ease-out cursor-pointer shadow-xs overflow-hidden"
          >
            <div className="flex items-center gap-2.5 truncate">
              <CurrentTabIcon className="w-4 h-4 shrink-0 text-[#E8A585]" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold truncate">
                {currentTabInfo.label}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 shrink-0 text-[#B8C8BF] transition-transform duration-300 ease-out ${
                isMenuOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </div>

        {/* Sliding Main Menu (slides smoothly down when user clicks the menu button, NOT 2 rows!) */}
        <div
          id="audit-sliding-menu"
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen
              ? 'max-h-96 opacity-100 mt-2.5 pt-2.5 border-t border-[#E5DFD4]'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-1.5 py-1">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    handleTabClick(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`min-h-[42px] px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-left flex items-center justify-between transition-all duration-300 ease-out cursor-pointer ${
                    isActive
                      ? 'bg-[#183626] text-white shadow-xs'
                      : 'bg-white border border-[#E5DFD4] text-[#2D4537] hover:bg-[#F2ECE1] hover:border-[#183626] hover:text-[#183626] active:bg-[#ECE6DC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TabIcon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#E8A585]' : 'text-[#BE562C]'
                      }`}
                    />
                    <span>{tab.label}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-[#E8A585] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Single-Row Tab Bar (shown on large screens where all 6 tabs fit cleanly without wrapping) */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-mono">
          {TABS.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`tab-audit-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`shrink-0 whitespace-nowrap min-h-[40px] px-4 py-2 transition-all duration-300 ease-out cursor-pointer uppercase tracking-wider font-semibold flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 ${
                  isActive
                    ? 'bg-[#183626] text-white shadow-xs border border-[#183626]'
                    : 'border border-[#D5CEC2] bg-[#FAF8F5] text-[#2D4537] hover:border-[#183626] hover:text-[#183626] hover:bg-[#F0EAE0]'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections rendered in full with smooth-scroll target IDs and scroll margins */}
      <div className="space-y-10">
        <div id="audit-section-materials" className="scroll-mt-20 sm:scroll-mt-24">
          <MaterialAudit evaluation={evaluation} />
        </div>

        <div id="audit-section-labor" className="scroll-mt-20 sm:scroll-mt-24">
          <LaborAudit evaluation={evaluation} />
        </div>

        <div id="audit-section-environmental" className="scroll-mt-20 sm:scroll-mt-24">
          <EcoAudit evaluation={evaluation} />
        </div>

        <div id="audit-section-greenwashing" className="scroll-mt-20 sm:scroll-mt-24">
          <GreenwashingRadar evaluation={evaluation} />
        </div>

        <div id="audit-section-swaps" className="scroll-mt-20 sm:scroll-mt-24">
          <EthicalSwaps
            evaluation={evaluation}
            onSelectAlternative={onSelectAlternative}
          />
        </div>
      </div>

      {/* Bottom return to search */}
      <div className="mt-12 text-center pb-8 border-dashed-fine pt-6">
        <button
          type="button"
          onClick={onBackToSearch}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#183626] text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#234c36] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Investigate Another Brand or Product
        </button>
      </div>
    </section>
  );
};
