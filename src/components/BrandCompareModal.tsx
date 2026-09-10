import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRightLeft,
  Search,
  Trash2,
  ExternalLink,
  Plus,
  Minus,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { BrandEvaluation } from '../types';
import { CURATED_BRANDS } from '../data/curatedBrands';
import { fetchBrandEvaluation } from '../utils/evaluationService';

interface BrandCompareModalProps {
  initialBrands?: BrandEvaluation[];
  currentBrand?: BrandEvaluation | null;
  onClose: () => void;
  onSelectBrandForFullDossier: (brandName: string) => void;
}

type DetailSectionKey = 'materials' | 'labor' | 'trust' | 'primaryMaterials';

const COLUMN_1_TAGS = [
  'Shein',
  'Patagonia',
  'Fabindia',
  'Swadeshi',
  'Raw Mango',
  'Harris Tweed',
  'Barbour',
  'Pendleton',
];

const COLUMN_2_TAGS = [
  'Patagonia',
  'Fabindia',
  'Swadeshi',
  'Anokhi',
  'Aran Crafts',
  'Dale of Norway',
  'Johnstons of Elgin',
  'Momotaro',
];

export const BrandCompareModal: React.FC<BrandCompareModalProps> = ({
  initialBrands,
  currentBrand,
  onClose,
  onSelectBrandForFullDossier,
}) => {
  // Slots holding the evaluated brand or null if cleared
  const [slot1, setSlot1] = useState<BrandEvaluation | null>(() => {
    if (initialBrands && initialBrands.length >= 1) return initialBrands[0];
    if (currentBrand) return currentBrand;
    return CURATED_BRANDS['patagonia'] || CURATED_BRANDS['nike'];
  });

  const [slot2, setSlot2] = useState<BrandEvaluation | null>(() => {
    if (initialBrands && initialBrands.length >= 2) return initialBrands[1];
    if (currentBrand) {
      const otherKey =
        currentBrand.brandName.toLowerCase() === 'patagonia' ? 'zara' : 'patagonia';
      return CURATED_BRANDS[otherKey] || CURATED_BRANDS['shein'];
    }
    return CURATED_BRANDS['zara'] || CURATED_BRANDS['shein'];
  });

  // Optional 3rd slot for comparing 3 brands
  const [slot3, setSlot3] = useState<BrandEvaluation | null>(() => {
    if (initialBrands && initialBrands.length >= 3) return initialBrands[2];
    return null;
  });

  const [query1, setQuery1] = useState(() => slot1?.brandName || 'Patagonia');
  const [query2, setQuery2] = useState(() => slot2?.brandName || 'Zara');
  const [query3, setQuery3] = useState('');

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  // Track expanded accordion details per slot & subheading
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleDetail = (slotIndex: 1 | 2 | 3, section: DetailSectionKey) => {
    const key = `${slotIndex}-${section}`;
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isSectionExpanded = (slotIndex: 1 | 2 | 3, section: DetailSectionKey) => {
    return !!expandedSections[`${slotIndex}-${section}`];
  };

  const toggleAllDetails = () => {
    const sections: DetailSectionKey[] = ['materials', 'labor', 'trust', 'primaryMaterials'];
    const anyOpen = Object.values(expandedSections).some(Boolean);

    if (anyOpen) {
      setExpandedSections({});
    } else {
      const allOpen: Record<string, boolean> = {};
      [1, 2, 3].forEach((slot) => {
        sections.forEach((sec) => {
          allOpen[`${slot}-${sec}`] = true;
        });
      });
      setExpandedSections(allOpen);
    }
  };

  // Sync when currentBrand is provided
  useEffect(() => {
    if (currentBrand) {
      setSlot1(currentBrand);
      setQuery1(currentBrand.brandName);
    }
  }, [currentBrand]);

  const handleSearchSlot = async (slotIndex: 1 | 2 | 3, queryToSearch?: string) => {
    const query = (
      queryToSearch !== undefined
        ? queryToSearch
        : slotIndex === 1
        ? query1
        : slotIndex === 2
        ? query2
        : query3
    ).trim();

    if (!query) return;

    if (slotIndex === 1) {
      setLoading1(true);
      setQuery1(query);
    } else if (slotIndex === 2) {
      setLoading2(true);
      setQuery2(query);
    } else {
      setLoading3(true);
      setQuery3(query);
    }

    try {
      const evaluation = await fetchBrandEvaluation(query, 'brand');
      if (slotIndex === 1) setSlot1(evaluation);
      else if (slotIndex === 2) setSlot2(evaluation);
      else setSlot3(evaluation);
    } catch (err) {
      console.error(`Failed to evaluate ${query}:`, err);
    } finally {
      if (slotIndex === 1) setLoading1(false);
      else if (slotIndex === 2) setLoading2(false);
      else setLoading3(false);
    }
  };

  // Delete / Clear handler
  const handleDeleteSlot = (slotIndex: 1 | 2 | 3) => {
    if (slotIndex === 1) {
      setSlot1(null);
      setQuery1('');
    } else if (slotIndex === 2) {
      setSlot2(null);
      setQuery2('');
    } else {
      setSlot3(null);
      setQuery3('');
    }
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

  const renderBrandCard = (
    brand: BrandEvaluation | null,
    slotIndex: 1 | 2 | 3,
    isLoading: boolean
  ) => {
    if (isLoading) {
      return (
        <div className="flex-1 bg-white border border-[#D5CEC2] rounded-none p-8 flex flex-col items-center justify-center min-h-[480px]">
          <Loader2 className="w-8 h-8 text-[#BE562C] animate-spin mb-3" />
          <p className="font-editorial-serif text-xl text-[#183626]">
            Auditing {slotIndex === 1 ? query1 : slotIndex === 2 ? query2 : query3}...
          </p>
          <p className="text-xs text-[#76877D] mt-1 font-mono uppercase tracking-widest">
            Investigating materials, labor ethics &amp; trust scores
          </p>
        </div>
      );
    }

    if (!brand) {
      return (
        <div className="flex-1 bg-white border-2 border-dashed border-[#D5CEC2] rounded-none p-8 flex flex-col items-center justify-center min-h-[480px] text-center">
          <div className="w-12 h-12 rounded-none bg-[#FAF8F5] border border-[#D5CEC2] flex items-center justify-center text-[#76877D] mb-3">
            <Search className="w-5 h-5 text-[#BE562C]" />
          </div>
          <h4 className="font-editorial-serif text-2xl font-bold text-[#183626] mb-1">
            Slot {slotIndex} is Empty
          </h4>
          <p className="text-xs text-[#76877D] font-mono max-w-xs mb-5">
            Type any brand or product name above or click a quick tag to compare.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {['Nike', 'Patagonia', 'Shein', 'Zara'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSearchSlot(slotIndex, tag)}
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#FAF8F5] hover:bg-[#183626] hover:text-white border border-[#D5CEC2] rounded-none transition-colors cursor-pointer"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Material breakdown pills
    const materials = brand.materials.breakdown || [];
    const isSynthetic = (name: string) =>
      /poly|nylon|elast|span|acrylic|synth|vinyl/i.test(name);

    // Scores & Progress Metrics
    const textileScore = brand.materials.durabilityScore || Math.round(brand.score * 0.95);
    const laborScore = brand.laborEthics.score || Math.round(brand.score * 0.85);
    const trustScore =
      brand.greenwashingCheck.greenwashingRisk === 'Low / Genuine'
        ? 88
        : brand.greenwashingCheck.greenwashingRisk === 'Moderate'
        ? 52
        : 34;

    const riskLabel =
      brand.greenwashingCheck.greenwashingRisk === 'High Risk'
        ? 'Elevated'
        : brand.greenwashingCheck.greenwashingRisk === 'Moderate'
        ? 'Moderate'
        : 'Low / Genuine';

    return (
      <div className="flex-1 bg-white border border-[#D5CEC2] rounded-none p-6 sm:p-8 flex flex-col relative transition-colors">
        {/* Delete / Clear button in top right */}
        <button
          type="button"
          onClick={() => handleDeleteSlot(slotIndex)}
          className="absolute top-4 right-4 p-2 text-[#76877D] hover:text-[#BE562C] hover:bg-[#FBEFE9] border border-transparent hover:border-[#E8A585] rounded-none transition-colors cursor-pointer"
          title={`Delete or clear ${brand.brandName}`}
          aria-label={`Remove ${brand.brandName}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Category Header */}
        <div className="text-center pt-1 pr-6">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#76877D] font-bold block mb-1">
            {brand.fashionPace || 'APPAREL & FOOTWEAR'}
          </span>
          <h3 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#183626] leading-tight">
            {brand.brandName}
          </h3>
        </div>

        {/* Original Unfasten Score Stamp */}
        <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 text-center my-4 rounded-none max-w-[220px] mx-auto w-full">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#76877D] block mb-0.5">
            UNFASTEN SCORE
          </span>
          <div className="font-editorial-serif text-4xl sm:text-5xl font-bold text-[#183626] my-1">
            {brand.score}
            <span className="text-sm font-normal text-[#76877D] font-mono">/100</span>
          </div>
          <div
            className={`inline-block px-3 py-0.5 text-xs font-mono font-bold uppercase border rounded-none ${getVerdictStyle(
              brand.verdict
            )}`}
          >
            GRADE {brand.grade} • {brand.verdict}
          </div>
        </div>

        {/* Editorial One-Liner Quote */}
        <div className="p-3 sm:p-4 border-l-2 border-[#BE562C] bg-[#FAF8F5] mb-5 rounded-none">
          <p className="font-editorial-serif italic text-sm sm:text-base text-[#BE562C] leading-relaxed">
            &ldquo;{brand.oneLiner}&rdquo;
          </p>
        </div>

        {/* Metrics with Progress Bars and Plus Buttons for Deep Details */}
        <div className="space-y-4 pt-3 border-t border-[#E5DFD4]">
          {/* ========================================================= */}
          {/* Metric 1: Textile & Fiber Quality + Expand Button */}
          {/* ========================================================= */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#183626]">
              <div className="flex items-center gap-2">
                <span className="font-editorial-serif text-sm sm:text-base">
                  Textile &amp; Fiber Quality
                </span>
                <button
                  type="button"
                  onClick={() => toggleDetail(slotIndex, 'materials')}
                  className="w-4 h-4 rounded-none border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] hover:bg-[#183626] hover:text-white flex items-center justify-center text-[#BE562C] transition-colors cursor-pointer"
                  title={
                    isSectionExpanded(slotIndex, 'materials')
                      ? 'Collapse details'
                      : 'Show detailed audit'
                  }
                  aria-label="Toggle textile details"
                >
                  {isSectionExpanded(slotIndex, 'materials') ? (
                    <Minus className="w-2.5 h-2.5" />
                  ) : (
                    <Plus className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>
              <span className="font-mono text-xs">{textileScore}/100</span>
            </div>

            <div className="h-1.5 w-full bg-[#E5DFD4] rounded-none overflow-hidden mt-1.5">
              <div
                className="h-full bg-[#183626] rounded-none transition-all duration-500"
                style={{ width: `${Math.min(textileScore, 100)}%` }}
              />
            </div>
            <p className="text-[11px] font-mono text-[#76877D] mt-1">
              Expected Lifespan: {brand.materials.lifespanEstimate || '30–60 washes'}
            </p>

            {/* Expanded Detailed Audit for Textile Quality */}
            {isSectionExpanded(slotIndex, 'materials') && (
              <div className="mt-2.5 p-3.5 bg-[#FAF8F5] border border-[#D5CEC2] rounded-none space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-white border border-[#E5DFD4]">
                    <span className="text-[10px] text-[#76877D] uppercase tracking-wider block">
                      Virgin Synthetics
                    </span>
                    <span className="font-bold text-[#183626] text-xs mt-0.5 block">
                      {brand.materials.virginSyntheticsShare || 'N/A'}
                    </span>
                  </div>
                  <div className="p-2 bg-white border border-[#E5DFD4]">
                    <span className="text-[10px] text-[#76877D] uppercase tracking-wider block">
                      Microplastics Risk
                    </span>
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase mt-0.5 border ${
                        brand.materials.microplasticRisk === 'Low'
                          ? 'bg-[#ECF4EE] text-[#183626] border-[#B7D8C2]'
                          : brand.materials.microplasticRisk === 'Moderate'
                          ? 'bg-[#FEF3C7] text-[#B45309] border-[#FCD34D]'
                          : 'bg-[#FBEFE9] text-[#BE562C] border-[#E8A585]'
                      }`}
                    >
                      {brand.materials.microplasticRisk} Risk
                    </span>
                  </div>
                </div>

                {brand.materials.repairability && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#76877D] block mb-0.5">
                      Repairability &amp; Circularity
                    </span>
                    <p className="text-xs text-[#3D4F44] font-sans leading-relaxed">
                      {brand.materials.repairability}
                    </p>
                  </div>
                )}

                {brand.materials.highlights && brand.materials.highlights.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#76877D] block mb-1">
                      Material Integrity Highlights
                    </span>
                    <ul className="space-y-1 text-xs text-[#3D4F44] font-sans">
                      {brand.materials.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#BE562C] font-mono font-bold leading-none mt-1">
                            •
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* Metric 2: Labor & Human Rights + Expand Button */}
          {/* ========================================================= */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#183626]">
              <div className="flex items-center gap-2">
                <span className="font-editorial-serif text-sm sm:text-base">
                  Labor &amp; Human Rights
                </span>
                <button
                  type="button"
                  onClick={() => toggleDetail(slotIndex, 'labor')}
                  className="w-4 h-4 rounded-none border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] hover:bg-[#183626] hover:text-white flex items-center justify-center text-[#BE562C] transition-colors cursor-pointer"
                  title={
                    isSectionExpanded(slotIndex, 'labor')
                      ? 'Collapse details'
                      : 'Show detailed audit'
                  }
                  aria-label="Toggle labor details"
                >
                  {isSectionExpanded(slotIndex, 'labor') ? (
                    <Minus className="w-2.5 h-2.5" />
                  ) : (
                    <Plus className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>
              <span className="font-mono text-xs">{laborScore}/100</span>
            </div>

            <div className="h-1.5 w-full bg-[#E5DFD4] rounded-none overflow-hidden mt-1.5">
              <div
                className="h-full bg-[#183626] rounded-none transition-all duration-500"
                style={{ width: `${Math.min(laborScore, 100)}%` }}
              />
            </div>
            <p className="text-[11px] font-mono text-[#76877D] mt-1">
              Supply Chain: {brand.laborEthics.transparencyLevel}
            </p>

            {/* Expanded Detailed Audit for Labor Rights */}
            {isSectionExpanded(slotIndex, 'labor') && (
              <div className="mt-2.5 p-3.5 bg-[#FAF8F5] border border-[#D5CEC2] rounded-none space-y-3 animate-in fade-in duration-200">
                <div className="p-2.5 bg-white border border-[#E5DFD4]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#76877D] block mb-0.5">
                    Living Wage Benchmark
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-mono font-bold uppercase border ${
                      brand.laborEthics.livingWageStatus === 'Certified Living Wage'
                        ? 'bg-[#ECF4EE] text-[#183626] border-[#B7D8C2]'
                        : brand.laborEthics.livingWageStatus === 'Partial Progress'
                        ? 'bg-[#FEF3C7] text-[#B45309] border-[#FCD34D]'
                        : 'bg-[#FBEFE9] text-[#BE562C] border-[#E8A585]'
                    }`}
                  >
                    {brand.laborEthics.livingWageStatus}
                  </span>
                </div>

                {brand.laborEthics.auditFrequency && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#76877D] block mb-0.5">
                      Factory Audit Protocol
                    </span>
                    <p className="text-xs font-sans text-[#3D4F44] leading-relaxed">
                      {brand.laborEthics.auditFrequency}
                    </p>
                  </div>
                )}

                {brand.laborEthics.humanRightsDetails && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#76877D] block mb-0.5">
                      Human Rights &amp; Worker Protections
                    </span>
                    <p className="text-xs font-sans text-[#3D4F44] leading-relaxed">
                      {brand.laborEthics.humanRightsDetails}
                    </p>
                  </div>
                )}

                {brand.laborEthics.controversies && brand.laborEthics.controversies.length > 0 && (
                  <div className="p-2.5 bg-[#FDF2ED] border-l-2 border-[#BE562C]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#BE562C] font-bold block mb-1">
                      Documented Labor Flags
                    </span>
                    <ul className="space-y-1 text-xs text-[#8C3413] font-sans">
                      {brand.laborEthics.controversies.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#BE562C] font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* Metric 3: Trust & Anti-Greenwash + Expand Button */}
          {/* ========================================================= */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#183626]">
              <div className="flex items-center gap-2">
                <span className="font-editorial-serif text-sm sm:text-base">
                  Trust &amp; Anti-Greenwash
                </span>
                <button
                  type="button"
                  onClick={() => toggleDetail(slotIndex, 'trust')}
                  className="w-4 h-4 rounded-none border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] hover:bg-[#183626] hover:text-white flex items-center justify-center text-[#BE562C] transition-colors cursor-pointer"
                  title={
                    isSectionExpanded(slotIndex, 'trust')
                      ? 'Collapse details'
                      : 'Show detailed audit'
                  }
                  aria-label="Toggle trust details"
                >
                  {isSectionExpanded(slotIndex, 'trust') ? (
                    <Minus className="w-2.5 h-2.5" />
                  ) : (
                    <Plus className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>
              <span className="font-mono text-xs">{trustScore}/100</span>
            </div>

            <div className="h-1.5 w-full bg-[#E5DFD4] rounded-none overflow-hidden mt-1.5">
              <div
                className={`h-full rounded-none transition-all duration-500 ${
                  trustScore >= 70
                    ? 'bg-[#183626]'
                    : trustScore >= 45
                    ? 'bg-[#BE562C]'
                    : 'bg-[#991B1B]'
                }`}
                style={{ width: `${Math.min(trustScore, 100)}%` }}
              />
            </div>
            <p className="text-[11px] font-mono text-[#76877D] mt-1">
              Greenwashing Risk: {riskLabel}
            </p>

            {/* Expanded Detailed Audit for Greenwashing */}
            {isSectionExpanded(slotIndex, 'trust') && (
              <div className="mt-2.5 p-3.5 bg-[#FAF8F5] border border-[#D5CEC2] rounded-none space-y-3 animate-in fade-in duration-200">
                {brand.greenwashingCheck.realityVersusMarketing && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#76877D] block mb-0.5">
                      Marketing Claims vs. Reality
                    </span>
                    <p className="text-xs font-sans text-[#3D4F44] leading-relaxed">
                      {brand.greenwashingCheck.realityVersusMarketing}
                    </p>
                  </div>
                )}

                {brand.greenwashingCheck.verifiedCertifications &&
                  brand.greenwashingCheck.verifiedCertifications.length > 0 && (
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#76877D] block mb-1">
                        Verified Third-Party Certifications
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {brand.greenwashingCheck.verifiedCertifications.map((cert, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[11px] font-mono font-medium text-[#183626] bg-[#ECF4EE] border border-[#B7D8C2]"
                          >
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {brand.greenwashingCheck.unverifiedClaims &&
                  brand.greenwashingCheck.unverifiedClaims.length > 0 && (
                    <div className="p-2.5 bg-[#FDF2ED] border-l-2 border-[#BE562C]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#BE562C] font-bold block mb-1">
                        Unverified Claims Watchlist
                      </span>
                      <ul className="space-y-1 text-xs text-[#8C3413] font-sans">
                        {brand.greenwashingCheck.unverifiedClaims.map((claim, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#BE562C] font-bold">⚠</span>
                            <span>{claim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Primary Materials Badges + Expand Button */}
        {/* ========================================================= */}
        <div className="mt-5 pt-4 border-t border-[#E5DFD4]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#76877D] font-bold">
                PRIMARY MATERIALS
              </span>
              <button
                type="button"
                onClick={() => toggleDetail(slotIndex, 'primaryMaterials')}
                className="w-4 h-4 rounded-none border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] hover:bg-[#183626] hover:text-white flex items-center justify-center text-[#BE562C] transition-colors cursor-pointer"
                title={
                  isSectionExpanded(slotIndex, 'primaryMaterials')
                    ? 'Collapse material notes'
                    : 'Show detailed fiber origins'
                }
                aria-label="Toggle primary materials details"
              >
                {isSectionExpanded(slotIndex, 'primaryMaterials') ? (
                  <Minus className="w-2.5 h-2.5" />
                ) : (
                  <Plus className="w-2.5 h-2.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {materials.length > 0 ? (
              materials.map((m, idx) => {
                const synthetic = isSynthetic(m.fiber);
                return (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-none text-xs font-mono font-medium border ${
                      synthetic
                        ? 'bg-[#FBEFE9] text-[#BE562C] border-[#E8A585]'
                        : 'bg-[#ECF4EE] text-[#183626] border-[#B7D8C2]'
                    }`}
                  >
                    {m.percentageEstimate} {m.fiber}
                  </span>
                );
              })
            ) : (
              <>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono font-medium border bg-[#FBEFE9] text-[#BE562C] border-[#E8A585]">
                  {brand.materials.virginSyntheticsShare || 'Virgin Synthetics'}
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono font-medium border bg-[#ECF4EE] text-[#183626] border-[#B7D8C2]">
                  Natural Fibers
                </span>
              </>
            )}
          </div>

          {/* Expanded Fiber Laboratory Breakdown */}
          {isSectionExpanded(slotIndex, 'primaryMaterials') && materials.length > 0 && (
            <div className="mt-3 p-3.5 bg-[#FAF8F5] border border-[#D5CEC2] rounded-none space-y-2.5 animate-in fade-in duration-200">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#76877D] block mb-1">
                Fiber Lifecycle &amp; Origins
              </span>
              <div className="space-y-2">
                {materials.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-white border border-[#E5DFD4] text-xs font-sans">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="font-mono text-[#183626] text-xs">
                        {item.percentageEstimate} {item.fiber}
                      </strong>
                      <span
                        className={`text-[10px] font-mono uppercase px-1.5 py-0.5 border ${
                          item.sustainabilityLevel === 'Excellent' || item.sustainabilityLevel === 'Good'
                            ? 'bg-[#ECF4EE] text-[#183626] border-[#B7D8C2]'
                            : item.sustainabilityLevel === 'Moderate'
                            ? 'bg-[#FEF3C7] text-[#B45309] border-[#FCD34D]'
                            : 'bg-[#FBEFE9] text-[#BE562C] border-[#E8A585]'
                        }`}
                      >
                        {item.sustainabilityLevel}
                      </span>
                    </div>
                    {item.sourcingOrigin && (
                      <p className="text-[11px] text-[#76877D] font-mono mb-1">
                        Origin: {item.sourcingOrigin}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-xs text-[#3D4F44] leading-relaxed">
                        {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA to view full deep dive */}
        <div className="mt-6 pt-5 border-t border-[#E5DFD4]">
          <button
            type="button"
            onClick={() => {
              onSelectBrandForFullDossier(brand.brandName);
              onClose();
            }}
            className="w-full py-2.5 bg-[#183626] hover:bg-[#204732] text-white text-xs font-mono uppercase tracking-widest font-semibold rounded-none border border-[#183626] transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[40px]"
          >
            <span>Open Full {brand.brandName} Dossier</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E8A585]" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      id="brand-compare-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#183626]/80 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        id="brand-compare-container"
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#FAF8F5] rounded-none shadow-2xl overflow-hidden border border-[#D5CEC2]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        {/* Top Header Banner matching Unfasten theme */}
        <div className="bg-[#183626] text-white px-5 sm:px-8 py-4 flex items-center justify-between shrink-0 border-b border-[#2D4537] rounded-none">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 rounded-none bg-[#244332] border border-[#3E5C4B] flex items-center justify-center text-[#E8A585] shrink-0">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h2
                id="compare-modal-title"
                className="font-editorial-serif text-xl sm:text-2xl font-normal text-white"
              >
                Side-by-Side Brand Watchdog Audit
              </h2>
              <p className="text-xs font-mono text-[#A3B8AC] tracking-wider mt-0.5">
                Type any custom brand or website to compare textile quality, labor ethics, and trust scores
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#A3B8AC] hover:text-white hover:bg-[#244332] rounded-none transition-colors cursor-pointer"
            aria-label="Close brand comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF8F5] space-y-6">
          {/* Top Search & Filter Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 p-4 sm:p-6 bg-white border border-[#D5CEC2] rounded-none">
            {/* BRAND 1 INPUT */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-[#183626] block">
                BRAND 1 (TYPE WHAT YOU WANT):
              </label>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchSlot(1);
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={query1}
                    onChange={(e) => setQuery1(e.target.value)}
                    placeholder="e.g. Patagonia, Nike, Fabindia..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-[#FAF8F5] border border-[#D5CEC2] rounded-none text-[#183626] focus:outline-none focus:border-[#183626] focus:bg-white"
                  />
                  {query1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlot(1)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#76877D] hover:text-[#BE562C] p-1 cursor-pointer"
                      title="Clear Brand 1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading1 || !query1.trim()}
                  className="px-4 py-2.5 bg-[#183626] hover:bg-[#204732] disabled:opacity-60 text-white rounded-none border border-[#183626] text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 min-h-[40px]"
                >
                  {loading1 ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E8A585]" />
                  ) : (
                    <Search className="w-3.5 h-3.5 text-[#E8A585]" />
                  )}
                  <span>Search</span>
                </button>
              </form>

              {/* Quick Tags for Column 1 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COLUMN_1_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSearchSlot(1, tag)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-none border transition-colors cursor-pointer ${
                      slot1?.brandName.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#183626] text-white border-[#183626] font-bold'
                        : 'bg-[#FAF8F5] hover:bg-[#EDE8DE] border-[#D5CEC2] text-[#3D4F44]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* BRAND 2 INPUT */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-[0.2em] uppercase font-bold text-[#183626] block">
                BRAND 2 (TYPE WHAT YOU WANT):
              </label>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchSlot(2);
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={query2}
                    onChange={(e) => setQuery2(e.target.value)}
                    placeholder="e.g. Zara, Shein, Swadeshi..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono bg-[#FAF8F5] border border-[#D5CEC2] rounded-none text-[#183626] focus:outline-none focus:border-[#183626] focus:bg-white"
                  />
                  {query2 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlot(2)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#76877D] hover:text-[#BE562C] p-1 cursor-pointer"
                      title="Clear Brand 2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading2 || !query2.trim()}
                  className="px-4 py-2.5 bg-[#183626] hover:bg-[#204732] disabled:opacity-60 text-white rounded-none border border-[#183626] text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 min-h-[40px]"
                >
                  {loading2 ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E8A585]" />
                  ) : (
                    <Search className="w-3.5 h-3.5 text-[#E8A585]" />
                  )}
                  <span>Search</span>
                </button>
              </form>

              {/* Quick Tags for Column 2 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COLUMN_2_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSearchSlot(2, tag)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded-none border transition-colors cursor-pointer ${
                      slot2?.brandName.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#183626] text-white border-[#183626] font-bold'
                        : 'bg-[#FAF8F5] hover:bg-[#EDE8DE] border-[#D5CEC2] text-[#3D4F44]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Bar: Toggle All Details & 3rd Brand Option */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={toggleAllDetails}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#183626] border border-[#D5CEC2] rounded-none uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              {Object.values(expandedSections).some(Boolean) ? (
                <>
                  <Minus className="w-3.5 h-3.5 text-[#BE562C]" />
                  <span>Collapse All Details</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-[#BE562C]" />
                  <span>Expand All Details ([+] on Subheadings)</span>
                </>
              )}
            </button>

            {slot3 ? (
              <div className="p-2 bg-white border border-[#D5CEC2] rounded-none flex items-center gap-3">
                <span className="text-[#183626]">
                  Comparing 3rd Brand: <strong>{slot3.brandName}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteSlot(3)}
                  className="uppercase tracking-wider text-[#BE562C] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove 3rd</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSlot3(CURATED_BRANDS['shein'] || CURATED_BRANDS['patagonia']);
                  setQuery3('Shein');
                }}
                className="uppercase tracking-wider text-[#54655b] hover:text-[#183626] inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#BE562C]" />
                <span>+ Compare a 3rd Brand or Garment</span>
              </button>
            )}
          </div>

          {/* Cards Grid with Unfasten Sharp Border Aesthetic */}
          <div
            className={`grid gap-6 ${
              slot3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {renderBrandCard(slot1, 1, loading1)}
            {renderBrandCard(slot2, 2, loading2)}
            {slot3 && renderBrandCard(slot3, 3, loading3)}
          </div>
        </div>

        {/* Clean bottom bar */}
        <div className="bg-[#FAF8F5] border-t border-[#D5CEC2] px-6 py-3.5 flex items-center justify-between shrink-0 rounded-none">
          <span className="text-xs font-mono text-[#76877D]">
            Unfasten Fashion Intelligence • Non-Profit Independent Standard
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono uppercase tracking-widest text-[#183626] hover:bg-[#EAE4D8] border border-[#D5CEC2] rounded-none transition-colors cursor-pointer font-semibold"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
