import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRightLeft,
  Search,
  Trash2,
  ExternalLink,
  Plus,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { BrandEvaluation } from '../types';
import { CURATED_BRANDS } from '../data/curatedBrands';
import { fetchBrandEvaluation, normalizeBrandKey } from '../utils/evaluationService';

interface BrandCompareModalProps {
  initialBrands?: BrandEvaluation[];
  currentBrand?: BrandEvaluation | null;
  onClose: () => void;
  onSelectBrandForFullDossier: (brandName: string) => void;
}

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
    return CURATED_BRANDS['nike'] || CURATED_BRANDS['patagonia'];
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

  const [query1, setQuery1] = useState(() => slot1?.brandName || 'Nike');
  const [query2, setQuery2] = useState(() => slot2?.brandName || 'Gap');
  const [query3, setQuery3] = useState('');

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

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

  // Delete / Clear handler - ALWAYS WORKS
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

  const renderCircularScore = (score: number) => {
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let strokeColor = '#BE562C'; // Red-orange (<45)
    if (score >= 70) strokeColor = '#183626'; // Dark green (>=70)
    else if (score >= 45) strokeColor = '#B45309'; // Terracotta/amber

    return (
      <div className="relative w-20 h-20 flex items-center justify-center my-3 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#EFEBE3"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={strokeColor}
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-editorial-serif text-2xl font-bold text-[#183626] leading-none">
            {score}
          </span>
          <span className="text-[10px] font-mono text-[#76877D] mt-0.5 leading-none">
            / 100
          </span>
        </div>
      </div>
    );
  };

  const renderBrandCard = (
    brand: BrandEvaluation | null,
    slotIndex: 1 | 2 | 3,
    isLoading: boolean
  ) => {
    if (isLoading) {
      return (
        <div className="flex-1 bg-white border border-[#E2DBD0] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[480px] shadow-xs">
          <Loader2 className="w-8 h-8 text-[#BE562C] animate-spin mb-3" />
          <p className="font-editorial-serif text-lg text-[#183626]">
            Auditing {slotIndex === 1 ? query1 : slotIndex === 2 ? query2 : query3}...
          </p>
          <p className="text-xs text-[#76877D] mt-1 font-mono">
            Evaluating materials, labor ethics &amp; trust scores
          </p>
        </div>
      );
    }

    if (!brand) {
      return (
        <div className="flex-1 bg-white border-2 border-dashed border-[#DDD5C8] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[480px] text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#DDD5C8] flex items-center justify-center text-[#76877D] mb-3">
            <Search className="w-5 h-5 text-[#BE562C]" />
          </div>
          <h4 className="font-editorial-serif text-lg font-bold text-[#183626] mb-1">
            Slot {slotIndex} is Empty
          </h4>
          <p className="text-xs text-[#76877D] max-w-xs mb-4">
            Type any brand or product name above or click a quick tag to compare.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {['Nike', 'Patagonia', 'Shein', 'Zara'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSearchSlot(slotIndex, tag)}
                className="px-2.5 py-1 text-xs bg-[#FAF8F5] hover:bg-[#183626] hover:text-white border border-[#D5CEC2] rounded-md transition-colors cursor-pointer"
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
      <div className="flex-1 bg-white border border-[#E2DBD0] rounded-2xl p-6 sm:p-7 flex flex-col shadow-xs relative transition-all duration-200">
        {/* Delete / Clear button in top right - ALWAYS WORKS */}
        <button
          type="button"
          onClick={() => handleDeleteSlot(slotIndex)}
          className="absolute top-4 right-4 p-2 text-[#9EAFA5] hover:text-[#BE562C] hover:bg-[#FDF2ED] rounded-lg transition-colors cursor-pointer"
          title={`Delete or clear ${brand.brandName}`}
          aria-label={`Remove ${brand.brandName}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Category Header */}
        <div className="text-center pt-1 pr-6">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#76877D] font-bold block">
            {brand.fashionPace || 'APPAREL & FOOTWEAR'}
          </span>
          <h3 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#183626] mt-1 leading-tight">
            {brand.brandName}
          </h3>
        </div>

        {/* Circular Gauge */}
        {renderCircularScore(brand.score)}

        {/* Italic Summary Quote */}
        <p className="text-center text-xs sm:text-[13px] text-[#BE562C] font-serif italic px-2 sm:px-4 leading-relaxed mb-6">
          &ldquo;{brand.oneLiner}&rdquo;
        </p>

        {/* Metrics with Progress Bars */}
        <div className="space-y-4 pt-4 border-t border-[#EFEBE3]">
          {/* Metric 1: Textile & Fiber Quality */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#183626]">
              <span>Textile &amp; Fiber Quality</span>
              <span className="font-mono text-xs">{textileScore}/100</span>
            </div>
            <div className="h-2 w-full bg-[#EAE5DC] rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-[#183626] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(textileScore, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-[#76877D] mt-1">
              Expected Lifespan: {brand.materials.lifespanEstimate || '30–60 washes'}
            </p>
          </div>

          {/* Metric 2: Labor & Human Rights */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#183626]">
              <span>Labor &amp; Human Rights</span>
              <span className="font-mono text-xs">{laborScore}/100</span>
            </div>
            <div className="h-2 w-full bg-[#EAE5DC] rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-[#183626] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(laborScore, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-[#76877D] mt-1">
              Supply Chain: {brand.laborEthics.transparencyLevel}
            </p>
          </div>

          {/* Metric 3: Trust & Anti-Greenwash */}
          <div>
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#183626]">
              <span>Trust &amp; Anti-Greenwash</span>
              <span className="font-mono text-xs">{trustScore}/100</span>
            </div>
            <div className="h-2 w-full bg-[#EAE5DC] rounded-full overflow-hidden mt-1.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  trustScore >= 70
                    ? 'bg-[#183626]'
                    : trustScore >= 45
                    ? 'bg-[#BE562C]'
                    : 'bg-[#991B1B]'
                }`}
                style={{ width: `${Math.min(trustScore, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-[#76877D] mt-1">
              Greenwashing Risk: {riskLabel}
            </p>
          </div>
        </div>

        {/* Primary Materials Badges */}
        <div className="mt-5 pt-4 border-t border-[#EFEBE3]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#76877D] font-bold block mb-2">
            PRIMARY MATERIALS
          </span>
          <div className="flex flex-wrap gap-1.5">
            {materials.length > 0 ? (
              materials.map((m, idx) => {
                const synthetic = isSynthetic(m.fiber);
                return (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                      synthetic
                        ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
                        : 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
                    }`}
                  >
                    {m.percentageEstimate} {m.fiber}
                  </span>
                );
              })
            ) : (
              <>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium border bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]">
                  {brand.materials.virginSyntheticsShare || 'Virgin Synthetics'}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium border bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]">
                  Natural Fibers
                </span>
              </>
            )}
          </div>
        </div>

        {/* Bottom CTA to view full deep dive */}
        <div className="mt-6 pt-4 border-t border-[#EFEBE3]">
          <button
            type="button"
            onClick={() => {
              onSelectBrandForFullDossier(brand.brandName);
              onClose();
            }}
            className="w-full py-2.5 bg-[#183626] hover:bg-[#224b35] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Open Full {brand.brandName} Dossier</span>
            <ExternalLink className="w-3.5 h-3.5" />
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
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#FAF8F5] rounded-2xl shadow-2xl overflow-hidden border border-[#D5CEC2]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        {/* Top Header Banner matching image (2).png */}
        <div className="bg-[#183626] text-white px-5 sm:px-7 py-4.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#183626] shrink-0 shadow-xs">
              <ArrowRightLeft className="w-5 h-5 text-[#183626]" />
            </div>
            <div>
              <h2
                id="compare-modal-title"
                className="font-editorial-serif text-xl sm:text-2xl font-normal text-white"
              >
                Side-by-Side Brand Watchdog Audit
              </h2>
              <p className="text-xs text-[#A8BDB1] font-sans mt-0.5">
                Type any custom brand or website to compare textile quality, labor ethics, and trust scores
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-[#A8BDB1] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close brand comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F7F3EB] space-y-5">
          {/* Top Search & Filter Columns matching image (2).png */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* BRAND 1 INPUT */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono tracking-wider uppercase font-bold text-[#183626] block">
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
                    placeholder="e.g. Nike, Shein, Fabindia..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5CEC2] rounded-lg text-[#183626] focus:outline-none focus:border-[#183626] focus:ring-1 focus:ring-[#183626]"
                  />
                  {query1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlot(1)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9EAFA5] hover:text-[#BE562C] p-1 cursor-pointer"
                      title="Clear Brand 1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading1 || !query1.trim()}
                  className="px-4 py-2.5 bg-[#183626] hover:bg-[#204732] disabled:opacity-60 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 min-h-[42px]"
                >
                  {loading1 ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
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
                    className={`px-2.5 py-1 text-[11px] rounded-md border transition-colors cursor-pointer ${
                      slot1?.brandName.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#183626] text-white border-[#183626] font-semibold'
                        : 'bg-white hover:bg-[#EDE8DE] border-[#DDD5C8] text-[#3D4F44]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* BRAND 2 INPUT */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono tracking-wider uppercase font-bold text-[#183626] block">
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
                    placeholder="e.g. Gap, Patagonia, Swadeshi..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#D5CEC2] rounded-lg text-[#183626] focus:outline-none focus:border-[#183626] focus:ring-1 focus:ring-[#183626]"
                  />
                  {query2 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlot(2)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9EAFA5] hover:text-[#BE562C] p-1 cursor-pointer"
                      title="Clear Brand 2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading2 || !query2.trim()}
                  className="px-4 py-2.5 bg-[#183626] hover:bg-[#204732] disabled:opacity-60 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 min-h-[42px]"
                >
                  {loading2 ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
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
                    className={`px-2.5 py-1 text-[11px] rounded-md border transition-colors cursor-pointer ${
                      slot2?.brandName.toLowerCase() === tag.toLowerCase()
                        ? 'bg-[#183626] text-white border-[#183626] font-semibold'
                        : 'bg-white hover:bg-[#EDE8DE] border-[#DDD5C8] text-[#3D4F44]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Slot 3 trigger or view if active */}
          {slot3 ? (
            <div className="p-3 bg-white border border-[#DDD5C8] rounded-xl flex items-center justify-between">
              <span className="text-xs font-mono text-[#183626]">
                Comparing 3rd Brand: <strong>{slot3.brandName}</strong>
              </span>
              <button
                type="button"
                onClick={() => handleDeleteSlot(3)}
                className="text-xs font-mono text-[#BE562C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove 3rd Brand</span>
              </button>
            </div>
          ) : (
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setSlot3(CURATED_BRANDS['shein'] || CURATED_BRANDS['patagonia']);
                  setQuery3('Shein');
                }}
                className="text-xs font-mono text-[#54655b] hover:text-[#183626] inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#BE562C]" />
                <span>Compare a 3rd Brand or Garment</span>
              </button>
            </div>
          )}

          {/* Cards Grid matching image (2).png */}
          <div className={`grid gap-5 sm:gap-6 ${slot3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {renderBrandCard(slot1, 1, loading1)}
            {renderBrandCard(slot2, 2, loading2)}
            {slot3 && renderBrandCard(slot3, 3, loading3)}
          </div>
        </div>

        {/* Clean bottom bar */}
        <div className="bg-[#FAF8F5] border-t border-[#E2DBD0] px-6 py-3 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-mono text-[#76877D]">
            Unfasten Fashion Intelligence • Non-Profit Independent Standard
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-mono uppercase tracking-wider text-[#183626] hover:bg-[#EAE4D8] rounded-lg transition-colors cursor-pointer font-semibold"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
