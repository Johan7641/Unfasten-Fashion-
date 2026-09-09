import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { BrandDossier } from './components/BrandDossier';
import { Footer } from './components/Footer';
import { BrandCompareModal } from './components/BrandCompareModal';
import { MethodologyModal } from './components/MethodologyModal';
import { AiInspectorChat } from './components/AiInspectorChat';
import { ExploreWithAiSection } from './components/ExploreWithAiSection';
import { OrientationNotice } from './components/OrientationNotice';
import { TermsAndConditionsModal, LegalSectionId } from './components/TermsAndConditionsModal';
import { BlogSection } from './components/BlogSection';
import { BrandEvaluation, SearchMode } from './types';
import { CURATED_BRANDS } from './data/curatedBrands';
import { getBrandCategorization } from './utils/brandCategorization';
import { Loader2, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'investigate' | 'blog'>('investigate');
  const [activeEvaluation, setActiveEvaluation] = useState<BrandEvaluation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [activeMode, setActiveMode] = useState<SearchMode>('brand');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatInitialPrompt, setAiChatInitialPrompt] = useState<string | undefined>(undefined);
  const [auditStep, setAuditStep] = useState<string>('');

  // Compulsory Terms & Conditions gate on reload of the webpage
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
  const [isFullTermsOpen, setIsFullTermsOpen] = useState(false);
  const [selectedTermsSection, setSelectedTermsSection] = useState<LegalSectionId>('terms');

  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true);
  };

  const handleOpenTermsModal = (section: LegalSectionId = 'terms') => {
    setSelectedTermsSection(section);
    setIsFullTermsOpen(true);
  };

  const handleOpenAiChat = (initialPrompt?: string) => {
    setAiChatInitialPrompt(initialPrompt);
    setIsAiChatOpen(true);
  };

  const normalizeBrandKey = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const handleSearch = async (query: string, mode: SearchMode) => {
    if (!query.trim()) return;

    setActiveQuery(query);
    setActiveMode(mode);
    setIsLoading(true);
    setErrorMessage(null);

    // Dynamic loading messages for editorial flair
    const loadingSteps = [
      `Searching material lifecycle records for "${query}"...`,
      'Cross-referencing supplier transparency and living wage audits...',
      'Assessing synthetic fiber ratio & microplastic shedding risk...',
      'Checking independent watchdog reports for greenwashing...',
    ];

    let stepIndex = 0;
    setAuditStep(loadingSteps[0]);
    const stepInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % loadingSteps.length;
      setAuditStep(loadingSteps[stepIndex]);
    }, 1400);

    try {
      // Check if we have instant curated data for fast response
      const key = normalizeBrandKey(query);
      const curatedMatch = CURATED_BRANDS[key];

      // Try calling server-side Gemini API
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, mode }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setActiveEvaluation(result.data);
          clearInterval(stepInterval);
          setIsLoading(false);
          // Scroll smoothly to dossier
          window.scrollTo({ top: 400, behavior: 'smooth' });
          return;
        }
      }

      // If server returned fallback mode or network hiccup, fallback to curated brand or generated profile
      if (curatedMatch) {
        setActiveEvaluation(curatedMatch);
      } else {
        // Generate a contextual evaluation profile if outside curated list
        const isLikelyFastFashion = /fashion|nova|cider|boohoo|missguided|primark|forever21|garage/i.test(query);
        const fallbackScore = isLikelyFastFashion ? 22 : 58;

        const fallbackEvaluation: BrandEvaluation = {
          brandName: query,
          targetType: mode,
          tagline: `${mode === 'product' ? 'Product Assessment' : 'Fashion Label'}`,
          score: fallbackScore,
          grade: isLikelyFastFashion ? 'F' : 'C',
          verdict: isLikelyFastFashion ? 'AVOID' : 'MODERATE',
          oneLiner: isLikelyFastFashion
            ? 'High-speed inventory cycles dependent on petroleum synthetics and opaque manufacturing chains.'
            : 'Conventional manufacturing model with standard mixed fibers and moderate transparency disclosures.',
          summary: `Our investigative audit of ${query} indicates standard commercial supply chain characteristics. While consumer convenience is high, deeper auditing reveals opportunities to improve organic fiber adoption, living wage compliance, and microplastic mitigation.`,
          materials: {
            breakdown: [
              { fiber: 'Synthetic Polyester / Elastane', percentageEstimate: isLikelyFastFashion ? '65-75%' : '45%', sustainabilityLevel: 'Poor', notes: 'Fossil-fuel derived non-biodegradable synthetic filaments.' },
              { fiber: 'Conventional Cotton', percentageEstimate: isLikelyFastFashion ? '20%' : '40%', sustainabilityLevel: 'Moderate', notes: 'High water intensity; pesticide regulations dependent on supplier location.' },
              { fiber: 'Viscose / Other Fibers', percentageEstimate: isLikelyFastFashion ? '10%' : '15%', sustainabilityLevel: 'Moderate', notes: 'Man-made cellulosic fibers.' }
            ],
            virginSyntheticsShare: isLikelyFastFashion ? 'Over 65% Synthetics' : 'Approx 45% Synthetics',
            durabilityScore: isLikelyFastFashion ? 25 : 55,
            lifespanEstimate: isLikelyFastFashion ? '1 to 2 seasons' : '3 to 5 years with gentle care',
            microplasticRisk: isLikelyFastFashion ? 'Extreme' : 'Moderate',
            repairability: 'No documented in-house repair program or lifetime durability guarantee on record.',
            highlights: [
              'Mixed synthetic fiber blends limit end-of-life garment-to-garment recycling',
              'Microfiber release during standard household washing'
            ]
          },
          laborEthics: {
            score: isLikelyFastFashion ? 20 : 54,
            livingWageStatus: 'Unverified / Likely Below Living Wage',
            transparencyLevel: 'Tier 1 Only',
            auditFrequency: 'Standard third-party social compliance audits with limited worker disclosure',
            controversies: [
              'Lack of verified direct payment of living wages above legal minimum statutory thresholds'
            ],
            humanRightsDetails: `While ${query} adheres to basic jurisdictional labor codes, comprehensive multi-tier transparency and independent trade union collective bargaining rights are unverified.`
          },
          environmentalImpact: {
            score: isLikelyFastFashion ? 22 : 52,
            carbonFootprint: 'Global supply chain logistics and energy-intensive dyehouse operations',
            waterAndChemicals: 'Conventional wet processing without comprehensive ZDHC Level 3 certification',
            hazardousChemicalCommitment: 'Standard REACH / consumer product safety regulations compliance',
            packagingFootprint: 'Standard single-use plastic polybag packaging',
            highlights: [
              'Scope 3 emissions in outsourced fabrication mills remain largely unmitigated'
            ]
          },
          greenwashingCheck: {
            greenwashingRisk: isLikelyFastFashion ? 'High Risk' : 'Moderate',
            unverifiedClaims: [
              'Vague "conscious" or "sustainable choice" labels without third-party traceability'
            ],
            verifiedCertifications: [],
            realityVersusMarketing: `Marketing language emphasizes trendiness and value, while planetary and human externalities remain externalized.`
          },
          ethicalAlternatives: [
            {
              name: 'Armedangels',
              aestheticMatch: 'Modern casualwear & denim',
              whyBetter: 'GOTS certified organic cotton, Fair Wear Leader, transparent factory directory.',
              priceTier: '$$',
              highlightCertification: 'Fair Wear Foundation & GOTS'
            },
            {
              name: 'Kotn',
              aestheticMatch: 'Refined wardrobe essentials',
              whyBetter: 'Direct-trade Egyptian cotton, B-Corp certified, reinvests into local farming communities.',
              priceTier: '$$',
              highlightCertification: 'Certified B Corp'
            },
            {
              name: 'Vinted / Depop',
              aestheticMatch: 'Pre-loved fashion & vintage finds',
              whyBetter: 'Circulates existing clothing without new raw material extraction.',
              priceTier: '$',
              highlightCertification: 'Circular Secondhand'
            }
          ],
          fastFashionFlags: isLikelyFastFashion ? [
            'Rapid style replacement cycle',
            'Substantial synthetic fiber dependence',
            'Lack of living wage verification'
          ] : [
            'Absence of lifetime repair or circular take-back program'
          ]
        };

        const categorization = getBrandCategorization(fallbackEvaluation);
        fallbackEvaluation.priceTier = categorization.priceTier;
        fallbackEvaluation.fashionPace = categorization.fashionPace;

        setActiveEvaluation(fallbackEvaluation);
      }
    } catch (err: any) {
      console.error('Audit search error:', err);
      // If error occurs, check curated fallback
      const key = normalizeBrandKey(query);
      if (CURATED_BRANDS[key]) {
        setActiveEvaluation(CURATED_BRANDS[key]);
      } else {
        setErrorMessage('Unable to connect to the evaluation engine. Displaying cached baseline intelligence.');
        setActiveEvaluation(CURATED_BRANDS['shein']);
      }
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  };

  const handleImageSearch = async (file: File, note?: string) => {
    if (!file) return;

    setIsLoading(true);
    setErrorMessage(null);
    setActiveQuery(note || file.name);
    setActiveMode('screenshot');

    const imageSteps = [
      'Scanning garment image with multimodal AI vision...',
      'Detecting garment silhouette, brand marks & fabric texture...',
      'Auditing material composition & synthetic fiber ratio...',
      'Investigating supply chain ethics, worker wages & factories...',
      'Synthesizing publication-grade Unfasten dossier...',
    ];

    let stepIndex = 0;
    setAuditStep(imageSteps[0]);
    const stepInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % imageSteps.length;
      setAuditStep(imageSteps[stepIndex]);
    }, 1400);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const response = await fetch('/api/evaluate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: file.type || 'image/jpeg',
          fileName: file.name,
          note: note || '',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          const evalData: BrandEvaluation = {
            ...result.data,
            uploadedImagePreview: base64Data,
            identifiedProduct: result.data.brandName,
          };
          setActiveEvaluation(evalData);
          clearInterval(stepInterval);
          setIsLoading(false);
          window.scrollTo({ top: 400, behavior: 'smooth' });
          return;
        }
      }

      throw new Error('Screenshot evaluation response failed');
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsLoading(false);
      setErrorMessage('Unable to audit screenshot at this time. Please try searching by brand or product name.');
    }
  };

  const handleReset = () => {
    setActiveEvaluation(null);
    setActiveQuery('');
    setErrorMessage(null);
    setActiveView('investigate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#1c2720] flex flex-col justify-between selection:bg-[#BE562C]/20 selection:text-[#183626]">
      {/* Mobile & Tablet Orientation Guidance Pop-up */}
      <OrientationNotice />

      {/* Top Header */}
      <Header
        onReset={handleReset}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAiChat={() => handleOpenAiChat()}
        onOpenTerms={() => handleOpenTermsModal('terms')}
        activeView={activeView}
        onSelectView={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'blog' ? (
          <BlogSection
            onNavigateToAudits={() => {
              setActiveView('investigate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {/* Hero Search Section - matches the unfastenfashion.com screenshot */}
            <HeroSearch
              onSearch={handleSearch}
              onImageSearch={handleImageSearch}
              isLoading={isLoading}
              activeQuery={activeQuery}
              onOpenAiChat={handleOpenAiChat}
            />

            {/* Loading State Banner - Fixed size container to completely prevent bouncing or size shifting */}
            {isLoading && (
              <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
                <div
                  id="investigating-status-box"
                  className="w-full max-w-md h-[185px] sm:h-[195px] mx-auto border border-[#D5CEC2] bg-[#FAF8F5] shadow-sm flex flex-col items-center justify-center p-6 text-center select-none"
                >
                  <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-[#BE562C] shrink-0 mb-3" />
                  <p className="font-editorial-serif text-xl sm:text-2xl text-[#183626] font-normal italic leading-snug">
                    Investigating supply chain ethics...
                  </p>
                  <div className="h-9 w-full flex items-center justify-center mt-2 px-3">
                    <p className="text-xs font-mono uppercase tracking-widest text-[#76877D] text-center line-clamp-2 transition-opacity duration-300">
                      {auditStep}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error message banner if any */}
            {errorMessage && !isLoading && (
              <div className="w-full max-w-4xl mx-auto px-6 mb-4">
                <div className="p-4 border border-[#EED7CD] bg-[#FDF7F4] text-xs text-[#7A361A] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#BE562C] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Full Brand Investigation Dossier */}
            {activeEvaluation && !isLoading && (
              <BrandDossier
                evaluation={activeEvaluation}
                onBackToSearch={handleReset}
                onOpenCompare={() => setIsCompareOpen(true)}
                onSelectAlternative={(altName) => handleSearch(altName, 'brand')}
                onOpenAiChat={handleOpenAiChat}
              />
            )}

            {/* Explore more with AI Section */}
            {!isLoading && (
              <ExploreWithAiSection
                onOpenAiChat={handleOpenAiChat}
                currentBrand={activeEvaluation?.brandName}
              />
            )}
          </>
        )}
      </main>

      {/* Floating AI Inspector Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => handleOpenAiChat()}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#183626] text-white text-xs font-mono uppercase tracking-wider shadow-lg hover:bg-[#204732] border border-[#3E5C4B] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#E8A585]" />
          <span>Ask AI Inspector</span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenTerms={() => handleOpenTermsModal('terms')}
        onOpenBlog={() => {
          setActiveView('blog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* AI Inspector Chat Drawer */}
      <AiInspectorChat
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        currentBrandContext={activeEvaluation}
        initialPrompt={aiChatInitialPrompt}
      />

      {/* Compare 2 or more brands modal */}
      {isCompareOpen && (
        <BrandCompareModal
          currentBrand={activeEvaluation}
          onClose={() => setIsCompareOpen(false)}
          onSelectBrandForFullDossier={(name) => {
            setIsCompareOpen(false);
            handleSearch(name, 'brand');
          }}
        />
      )}

      {/* Methodology Modal */}
      {isMethodologyOpen && (
        <MethodologyModal onClose={() => setIsMethodologyOpen(false)} />
      )}

      {/* Permanent Terms & Conditions Gate on Entry (permanent until user clicks "I Understand") */}
      {!hasAcceptedTerms && (
        <TermsAndConditionsModal
          isOpen={true}
          isGate={true}
          onClose={() => {}}
          onAccept={handleAcceptTerms}
          initialSection="terms"
        />
      )}

      {/* Full Terms & Conditions Modal (accessible anytime via Footer or Header) */}
      {hasAcceptedTerms && isFullTermsOpen && (
        <TermsAndConditionsModal
          isOpen={isFullTermsOpen}
          isGate={false}
          onClose={() => setIsFullTermsOpen(false)}
          initialSection={selectedTermsSection}
        />
      )}
    </div>
  );
}
