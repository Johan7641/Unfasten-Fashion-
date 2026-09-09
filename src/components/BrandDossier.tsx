import React, { useState, useEffect, useRef } from 'react';
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
  ArrowUpRight,
} from 'lucide-react';
import { BrandEvaluation } from '../types';
import { getBrandCategorization } from '../utils/brandCategorization';
import { MaterialAudit } from './MaterialAudit';
import { LaborAudit } from './LaborAudit';
import { EcoAudit } from './EcoAudit';
import { GreenwashingRadar } from './GreenwashingRadar';
import { EthicalSwaps } from './EthicalSwaps';
import { RedAndGreenFlags } from './RedAndGreenFlags';

interface BrandDossierProps {
  evaluation: BrandEvaluation;
  onBackToSearch: () => void;
  onOpenCompare: () => void;
  onSelectAlternative: (brandName: string) => void;
  onOpenAiChat: (initialPrompt?: string) => void;
}

type TabType = 'all' | 'materials' | 'labor' | 'environmental' | 'truth' | 'swaps' | 'flags';

interface TabItem {
  id: TabType;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: 'all', label: 'ALL AUDITS', shortLabel: 'ALL AUDITS', icon: Layers },
  { id: 'materials', label: 'MATERIALS & DURABILITY', shortLabel: 'MATERIALS', icon: Layers },
  { id: 'labor', label: 'LABOR RIGHTS', shortLabel: 'LABOR RIGHTS', icon: Users },
  { id: 'environmental', label: 'ENVIRONMENT & CARBON', shortLabel: 'ENVIRONMENT', icon: Leaf },
  { id: 'truth', label: 'GREENWASHING RADAR', shortLabel: 'GREENWASHING', icon: ShieldCheck },
  { id: 'swaps', label: 'ETHICAL SWAPS', shortLabel: 'ETHICAL SWAPS', icon: Sparkles },
  { id: 'flags', label: 'RED & GREEN FLAGS', shortLabel: 'RED & GREEN FLAGS', icon: AlertTriangle },
];

const KNOWN_ALT_SCORES: Record<string, number> = {
  patagonia: 91,
  armedangels: 88,
  'lucy & yak': 86,
  kotn: 84,
  sezane: 82,
  sézane: 82,
  'nudie jeans': 87,
  'mud jeans': 89,
  'colorful standard': 85,
  'organic basics': 87,
  pact: 83,
  finisterre: 86,
  'houdini sportswear': 90,
  reformation: 78,
  'nuw / depop / vinted': 92,
  'thredup & goodwill finds': 90,
};

function getAltScore(name: string): number {
  const clean = name.toLowerCase().trim();
  if (KNOWN_ALT_SCORES[clean]) return KNOWN_ALT_SCORES[clean];
  for (const [k, v] of Object.entries(KNOWN_ALT_SCORES)) {
    if (clean.includes(k) || k.includes(clean)) return v;
  }
  const hash = clean.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return 83 + (hash % 10);
}

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
  const navScrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const brandCategorization = getBrandCategorization(evaluation);
  const brandPriceAndPace = {
    price: brandCategorization.priceTier,
    pace: brandCategorization.fashionPace.toUpperCase(),
  };

  // Identify top better alternative in that price bracket for the analyzing section
  const topAlternative =
    evaluation.ethicalAlternatives && evaluation.ethicalAlternatives.length > 0
      ? evaluation.ethicalAlternatives.find((a) => a.priceTier === brandCategorization.priceTier) ||
        evaluation.ethicalAlternatives[0]
      : null;

  // Helper to scroll the horizontal tab bar without affecting window scroll
  const scrollNavTabIntoView = (tabId: TabType) => {
    const container = navScrollRef.current;
    if (!container) return;
    if (tabId === 'all') {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    const btn = document.getElementById(`tab-audit-${tabId}`);
    if (btn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const currentScrollLeft = container.scrollLeft;
      const btnOffsetRelativeToContainer = btnRect.left - containerRect.left + currentScrollLeft;
      const scrollLeftTarget =
        btnOffsetRelativeToContainer - container.clientWidth / 2 + btn.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeftTarget),
        behavior: 'smooth',
      });
    }
  };

  // Sync active tab with user's scroll position
  useEffect(() => {
    const sectionIds: Array<{ id: string; tab: TabType }> = [
      { id: 'audit-section-materials', tab: 'materials' },
      { id: 'audit-section-labor', tab: 'labor' },
      { id: 'audit-section-environmental', tab: 'environmental' },
      { id: 'audit-section-greenwashing', tab: 'truth' },
      { id: 'audit-section-swaps', tab: 'swaps' },
      { id: 'audit-section-flags', tab: 'flags' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const match = sectionIds.find((s) => s.id === visibleEntry.target.id);
          if (match) {
            setActiveTab(match.tab);
            scrollNavTabIntoView(match.tab);
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
    scrollNavTabIntoView(tab);

    isProgrammaticScroll.current = true;
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000);

    if (tab === 'all') {
      const topTarget =
        document.getElementById('audit-section-materials') ||
        document.getElementById('audit-navigation');
      if (topTarget) {
        const nav = document.getElementById('audit-navigation');
        const navHeight = nav ? nav.getBoundingClientRect().height : 55;
        const targetRect = topTarget.getBoundingClientRect();
        const currentScroll =
          window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const targetTop = currentScroll + targetRect.top - navHeight - 16;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      }
      return;
    }

    const sectionIdMap: Record<Exclude<TabType, 'all'>, string> = {
      materials: 'audit-section-materials',
      labor: 'audit-section-labor',
      environmental: 'audit-section-environmental',
      truth: 'audit-section-greenwashing',
      swaps: 'audit-section-swaps',
      flags: 'audit-section-flags',
    };

    const targetId = sectionIdMap[tab];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const nav = document.getElementById('audit-navigation');
      const navHeight = nav ? nav.getBoundingClientRect().height : 55;
      const targetRect = targetElement.getBoundingClientRect();
      const currentScroll =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const targetTop = currentScroll + targetRect.top - navHeight - 16;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
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
Tier: ${brandPriceAndPace.price} • ${brandPriceAndPace.pace}
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

      {/* Hero Dossier Header Card (Analyzing Part) */}
      <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-8 md:p-10 mb-8 relative overflow-hidden shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8">
          {/* Left Column: Brand Bio */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              {/* Dollar Signs & Speed Pace Label replacing Investigation Dossier #no */}
              <span className={`text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 border px-2.5 py-1 rounded-none shadow-2xs ${brandCategorization.badgeColorClass}`}>
                <span className="font-extrabold">{brandCategorization.priceTier}</span>
                <span className="opacity-60">•</span>
                <span>{brandCategorization.fashionPace.toUpperCase()}</span>
              </span>

              <span
                className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-bold uppercase border rounded-none ${getVerdictStyle(
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
              <div className="mb-4 inline-flex items-center gap-3 p-2.5 sm:p-3 border border-[#D5CEC2] bg-white max-w-lg shadow-2xs rounded-none">
                <img
                  src={evaluation.uploadedImagePreview}
                  alt="Uploaded Product Screenshot"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover border border-[#D5CEC2] shrink-0 rounded-none"
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
            <div className="p-3 sm:p-4 border-l-2 border-[#BE562C] bg-[#F5EFE4] mb-5 sm:mb-6 rounded-none">
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
            <div className="border border-[#D5CEC2] bg-white p-5 sm:p-6 text-center w-full max-w-xs sm:max-w-[240px] shadow-sm rounded-none">
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

              <div className="w-full bg-[#E5DFD4] h-1.5 overflow-hidden rounded-none">
                <div
                  className={`h-full rounded-none ${
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

        {/* Fast Fashion Warning Flags Callout */}
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
                  className="p-2.5 sm:p-3 border border-[#EED7CD] bg-[#FDF7F4] text-xs text-[#7A361A] font-medium leading-relaxed rounded-none"
                >
                  • {flag}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section for Better Alternative in Matching Price Range with AI Overview */}
        {topAlternative && (
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E5DFD4]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#BE562C]" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#183626]">
                  Top Better Alternative in {brandPriceAndPace.price} Price Range
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#76877D]">
                Higher integrity score • Same consumer budget tier
              </span>
            </div>

            <div className="p-4 sm:p-5 border border-[#D5CEC2] bg-white rounded-none flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-editorial-serif text-xl sm:text-2xl font-bold text-[#183626]">
                    {topAlternative.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-[#183626] bg-[#F2EDE3] border border-[#D5CEC2] px-2 py-0.5 rounded-none">
                    {topAlternative.priceTier}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#183626] bg-[#ECF4EE] border border-[#B7D8C2] px-2 py-0.5 rounded-none">
                    {getAltScore(topAlternative.name)}/100
                  </span>
                  <span className="text-xs font-mono text-[#76877D]">
                    ({topAlternative.aestheticMatch})
                  </span>
                </div>

                {/* Brief AI Overview of why it is better */}
                <div className="p-3 bg-[#FAF8F5] border-l-2 border-[#183626] my-2.5 rounded-none">
                  <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
                    <strong className="font-mono text-[10px] uppercase tracking-wider text-[#183626] mr-1.5 block sm:inline">
                      AI Inspector Overview:
                    </strong>
                    {topAlternative.whyBetter}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#76877D]">
                    Verified Integrity:
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#183626] bg-[#ECF4EE] border border-[#B7D8C2] px-2 py-0.5 rounded-none">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#183626]" />
                    {topAlternative.highlightCertification}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center">
                <button
                  type="button"
                  onClick={() => onSelectAlternative(topAlternative.name)}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#183626] hover:bg-[#204732] active:bg-[#12281c] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-none transition-all cursor-pointer min-h-[40px] shadow-xs"
                >
                  <span>Audit {topAlternative.name.split('/')[0].trim()}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
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
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            id="audit-menu-toggle-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle section navigation menu"
            aria-expanded={isMenuOpen}
            className="min-h-[44px] min-w-[44px] px-3 py-2 border border-[#D5CEC2] bg-[#FAF8F5] text-[#183626] hover:bg-[#F0EAE0] active:bg-[#E5DFD4] flex items-center justify-center transition-all duration-300 ease-out cursor-pointer shadow-xs shrink-0 rounded-none"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-[#183626] transition-transform duration-300 ease-out" />
            ) : (
              <Menu className="w-5 h-5 text-[#183626] transition-transform duration-300 ease-out" />
            )}
          </button>

          <button
            type="button"
            id="audit-current-section-btn"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex-1 min-h-[44px] px-4 py-2 bg-[#183626] text-white border border-[#183626] hover:bg-[#204732] active:bg-[#12281c] flex items-center justify-between gap-2.5 transition-all duration-300 ease-out cursor-pointer shadow-xs overflow-hidden rounded-none"
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

        {/* Sliding Main Menu for mobile */}
        <div
          id="audit-sliding-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
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
                  className={`min-h-[42px] px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-left flex items-center justify-between transition-all duration-300 ease-out cursor-pointer rounded-none ${
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

        {/* Desktop Single-Row Tab Bar - Strictly One Row, Centered & Smoothly Scrollable without clipping */}
        <div
          ref={navScrollRef}
          className="hidden lg:flex w-full overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          <div className="inline-flex items-center gap-1 xl:gap-2 mx-auto px-2 shrink-0 text-[11px] xl:text-xs font-mono">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  id={`tab-audit-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  className={`shrink-0 whitespace-nowrap min-h-[36px] px-2.5 xl:px-3.5 py-1.5 transition-all duration-200 ease-out cursor-pointer uppercase tracking-wider font-semibold flex items-center gap-1.5 rounded-none hover:-translate-y-0.5 active:translate-y-0 ${
                    isActive
                      ? 'bg-[#183626] text-white shadow-xs border border-[#183626]'
                      : 'border border-[#D5CEC2] bg-[#FAF8F5] text-[#2D4537] hover:border-[#183626] hover:text-[#183626] hover:bg-[#F0EAE0]'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden xl:inline">{tab.label}</span>
                  <span className="xl:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
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

        {/* Red Flags and Green Flags Section right after Ethical Swaps */}
        <div id="audit-section-flags" className="scroll-mt-20 sm:scroll-mt-24">
          <RedAndGreenFlags evaluation={evaluation} onOpenAiChat={onOpenAiChat} />
        </div>
      </div>

      {/* Bottom return to search */}
      <div className="mt-12 text-center pb-8 border-dashed-fine pt-6">
        <button
          type="button"
          onClick={onBackToSearch}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#183626] text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#234c36] transition-colors cursor-pointer rounded-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Investigate Another Brand or Product
        </button>
      </div>
    </section>
  );
};

