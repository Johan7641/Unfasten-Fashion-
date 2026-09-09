import React, { useState, useEffect } from 'react';
import {
  FileText,
  Scale,
  Lock,
  CheckCircle2,
  X,
  Check,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  Mail,
  ChevronRight,
} from 'lucide-react';

export type LegalSectionId = 'terms' | 'watchdog' | 'privacy' | 'brand-protocol';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGate?: boolean;
  onAccept?: () => void;
  initialSection?: LegalSectionId;
}

export const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  isOpen,
  onClose,
  isGate = false,
  onAccept,
  initialSection = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<LegalSectionId>(initialSection);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialSection);
    }
  }, [initialSection, isOpen]);

  if (!isOpen) return null;

  const handleUnderstand = () => {
    if (onAccept) {
      onAccept();
    }
    onClose();
  };

  return (
    <div
      id="terms-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#183626]/80 backdrop-blur-xs transition-opacity duration-300"
    >
      <div
        id="terms-modal-container"
        className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#FAF8F5] border border-[#D5CEC2] shadow-2xl rounded-none overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-heading"
      >
        {/* Top Header Bar - Matches Screenshot with deep forest green background and orange scale */}
        <div className="bg-[#183626] text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#2D4537]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-none flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-[#E8A585]" />
            </div>
            <div className="min-w-0">
              <h2
                id="terms-modal-heading"
                className="font-editorial-serif text-lg sm:text-xl font-normal text-white tracking-wide truncate"
              >
                Terms &amp; Conditions &amp; Watchdog Policy
              </h2>
              <p className="text-[11px] font-mono text-[#A3B8AC] tracking-wide mt-0.5 truncate">
                UnFasten Fashion Independent Research Standard • Effective September 2024
              </p>
            </div>
          </div>

          {!isGate ? (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#A3B8AC] hover:text-white transition-colors cursor-pointer rounded-none shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8A585] border border-[#3E5C4B] bg-[#1F402F] px-2.5 py-1 font-semibold rounded-none shrink-0">
              MANDATORY REVIEW
            </span>
          )}
        </div>

        {/* Tab Navigation Bar - Matches Screenshot with 4 tabs & bottom indicator */}
        <div className="flex border-b border-[#D5CEC2] bg-[#F2EDE3] overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-4 sm:px-5 py-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'terms'
                ? 'text-[#183626] border-[#183626] bg-[#FAF8F5]'
                : 'text-[#5E6F65] border-transparent hover:text-[#183626] hover:bg-[#EBE5DA]'
            }`}
          >
            1. TERMS OF SERVICE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('watchdog')}
            className={`px-4 sm:px-5 py-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'watchdog'
                ? 'text-[#183626] border-[#183626] bg-[#FAF8F5]'
                : 'text-[#5E6F65] border-transparent hover:text-[#183626] hover:bg-[#EBE5DA]'
            }`}
          >
            2. WATCHDOG DISCLAIMER
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-4 sm:px-5 py-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'privacy'
                ? 'text-[#183626] border-[#183626] bg-[#FAF8F5]'
                : 'text-[#5E6F65] border-transparent hover:text-[#183626] hover:bg-[#EBE5DA]'
            }`}
          >
            3. IMAGE UPLOAD PRIVACY
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('brand-protocol')}
            className={`px-4 sm:px-5 py-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'brand-protocol'
                ? 'text-[#183626] border-[#183626] bg-[#FAF8F5]'
                : 'text-[#5E6F65] border-transparent hover:text-[#183626] hover:bg-[#EBE5DA]'
            }`}
          >
            4. BRAND REVIEW PROTOCOL
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-6 text-[#2D4537] leading-relaxed">
          {/* TAB 1: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  1. Acceptance of Terms &amp; Non-Commercial Consumer Research
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D]">
                  By accessing or utilizing <strong>UnFasten Fashion</strong> (unfastenfashion.com),
                  you acknowledge and agree to be bound by these Terms and Conditions. UnFasten is
                  an independent consumer education and watchdog intelligence engine built to
                  promote supply-chain transparency, textile longevity, and worker rights in the
                  global fashion industry.
                </p>
              </div>

              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  2. Permitted Consumer Use
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D]">
                  Our ratings, material analyses, score cards, and watchdog syntheses are provided
                  strictly for personal, non-commercial decision-making before purchasing garments.
                  You may not scrape, mirror, or repackage UnFasten data for commercial resale without
                  prior written authorization.
                </p>
              </div>

              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  3. Autonomous AI &amp; Multimodal Analysis (Powered by Gemini 3.8 Flash)
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D] mb-3">
                  UnFasten utilizes multimodal Artificial Intelligence (grounded in verified labor
                  registries, textile research papers, and public corporate disclosures) to evaluate
                  brands, clothing care labels, and product URLs. While our pipeline cross-references
                  industry standards, scores represent computational and editorial watchdog assessments,
                  not guarantees of merchantability.
                </p>

                {/* Specific Safety & Lawsuit Protection Clause */}
                <div className="p-4 border border-[#D5CEC2] bg-[#FAF8F5] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#BE562C]">
                    <Cpu className="w-4 h-4 text-[#BE562C] shrink-0" />
                    <span>Engine &amp; Algorithmic Architecture Disclosure</span>
                  </div>
                  <p className="text-xs text-[#3E5246] leading-relaxed">
                    <strong>Core Model Disclosure:</strong> All automated brand scoring, category
                    classifications, garment fiber appraisals, and greenwashing radar syntheses are
                    programmatically generated by Google DeepMind&apos;s <strong>Gemini 3.8 Flash</strong> multimodal
                    architecture. Ratings reflect computational evaluations of publicly available corporate
                    disclosures, third-party labor databases, and academic textile literature.
                  </p>
                  <p className="text-xs text-[#3E5246] leading-relaxed">
                    <strong>Legal Safe Harbor &amp; Protected Opinion:</strong> Evaluations produced by the
                    Gemini 3.8 Flash engine represent protected algorithmic commentary, consumer education, and
                    academic criticism. They do not constitute assertions of verified judicial malfeasance or
                    tortious commercial interference. UnFasten expressly disclaims all commercial warranties,
                    and any party claiming wrongful categorization agrees to pursue the non-litigious
                    re-evaluation process described in Section 4 before initiating any legal action.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  4. Limitation of Corporate Liability &amp; Pre-Litigation Protocol
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D]">
                  To the fullest extent permissible by law, UnFasten Fashion, its contributors, and
                  technical operators bear no liability for commercial decisions, consumer brand boycotts,
                  or market shifts resulting from our published metrics. Commercial apparel brands agree that
                  any perceived factual discrepancy or categorization dispute will be addressed exclusively
                  through the verifiable evidentiary review process outlined in our Brand Review Protocol.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: WATCHDOG DISCLAIMER */}
          {activeTab === 'watchdog' && (
            <div className="space-y-6">
              {/* Top Banner Matching Screenshot */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E5DFD4] text-xs text-[#46574D] leading-relaxed">
                <p>
                  <strong>Zero-Sponsorship Guarantee:</strong> UnFasten maintains an absolute independence
                  charter. We reject advertising revenue, sponsored brand integrations, affiliate kickbacks,
                  paid preferential scoring for fast fashion retailers, or corporate hush payments.
                </p>
              </div>

              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  Independent Watchdog Methodology
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D] mb-3">
                  Every score out of 100 is derived from three rigorous pillars:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#3E5246]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#183626]">•</span>
                    <span>
                      <strong>Textile Quality &amp; Microplastic Risk (33.3%):</strong> Fiber mechanical
                      lifespan, tensile strength, synthetic vs regenerative natural fiber proportion, and
                      washing shed rate.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#183626]">•</span>
                    <span>
                      <strong>Labor &amp; Human Rights (33.3%):</strong> Living wages (versus statutory
                      minimum wage), collective bargaining protection, forced labor risk, and Tier 1–4 supplier
                      transparency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#183626]">•</span>
                    <span>
                      <strong>Trust &amp; Greenwashing Veracity (33.3%):</strong> Substantiation of
                      environmental claims, independent third-party certifications (GOTS, OEKO-TEX, Fair Trade,
                      B Corp), and historical regulatory sanctions.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  Anti-Hallucination Standard: Zero Speculation on Trust &amp; Ethics
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
                  UnFasten enforces an ironclad <strong>Anti-Hallucination Protocol</strong>. If there is
                  insufficient public audit data regarding a brand&apos;s factory conditions, worker wages, or
                  environmental truthfulness (for instance, if an apparel maker conceals its supplier lists or
                  has never undergone accredited third-party auditing by Good On You, Remake, or Fair Wear
                  Foundation), <strong>our system simply states that data is insufficient</strong>. We will never
                  fabricate living wage numbers, invent factory audits, or assume compliance without verified evidence.
                </p>
              </div>

              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  Fair Use &amp; Anti-SLAPP Protection
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
                  Our published watchdog reviews, red flags, and green flags constitute protected public-interest
                  commentary, academic fair-use consumer criticism, and computational journalism under applicable
                  free speech and Anti-SLAPP statutes. Any retaliatory legal threats or SLAPP litigation intended
                  to silence consumer supply-chain transparency will be publicly documented and vigorously defended.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: IMAGE UPLOAD PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-3">
                  3. Image Upload &amp; Care Tag Data Notice
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D] mb-4">
                  When you upload a garment photograph, care tag label, or product screenshot to UnFasten:
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 p-3.5 bg-white border border-[#E5DFD4]">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-[#183626]">
                        Ephemeral Processing
                      </h4>
                      <p className="text-xs text-[#46574D] mt-0.5">
                        Images are processed in-memory solely to transcribe fiber composition, style codes,
                        and care symbols via Gemini 3.8 Flash. Image data is never written to permanent disk storage.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-white border border-[#E5DFD4]">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-[#183626]">
                        No Biometric or Personal Tracking
                      </h4>
                      <p className="text-xs text-[#46574D] mt-0.5">
                        Please do not upload photos containing human faces, personal identification, or
                        sensitive payment receipts. Any unintended biometric artifacts are discarded during preprocessing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 bg-white border border-[#E5DFD4]">
                    <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-[#183626]">
                        Zero Data Brokering
                      </h4>
                      <p className="text-xs text-[#46574D] mt-0.5">
                        UnFasten never sells user queries, browsing behavior, or uploaded images to fashion
                        conglomerates, data brokers, or third-party advertisers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BRAND REVIEW PROTOCOL */}
          {activeTab === 'brand-protocol' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] mb-2">
                  4. Brand Audit Review &amp; Correction Protocol
                </h3>
                <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
                  We encourage fashion brands and textile manufacturers to publicly disclose their supply chains.
                  If a brand has recently achieved certified living wage compliance (such as through the Fair Wear
                  Foundation or Fair Trade USA) or updated its factory supplier list, you may submit verifiable
                  documentation.
                </p>
              </div>

              {/* Card matching Screenshot 1 */}
              <div className="p-4 sm:p-5 border border-[#D5CEC2] bg-[#FAF8F5] rounded-none space-y-3">
                <h4 className="font-sans font-bold text-xs sm:text-sm text-[#183626]">
                  Required Verification Evidence:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#3E5246]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#183626]">•</span>
                    <span>Current third-party living wage wage-ladder audit reports (Anker methodology).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#183626]">•</span>
                    <span>Complete Tier 1 through Tier 4 manufacturing facility addresses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#183626]">•</span>
                    <span>Certified organic cotton certificates (GOTS transaction certificates).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#183626]">•</span>
                    <span>Raw textile chemical compliance (ZDHC MRSL level 3).</span>
                  </li>
                </ul>
              </div>

              <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed">
                Send audit submissions to{' '}
                <a
                  href="mailto:audits@unfastenfashion.com"
                  className="font-mono text-[#183626] font-bold underline hover:text-[#BE562C]"
                >
                  audits@unfastenfashion.com
                </a>
                . Marketing press releases without third-party laboratory or labor union verification will not alter
                watchdog scores.
              </p>

              <div className="p-3.5 bg-[#F4F1EA] border-l-2 border-[#183626] text-xs text-[#46574D]">
                <p>
                  <strong>Pre-Action Evidentiary Covenant:</strong> Brands seeking score adjustments agree to
                  submit verifiable audit documentation at least thirty (30) days prior to any formal dispute.
                  Verified disclosures are processed within 14 business days to update public records accordingly.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer - Matches Screenshot with Padlock and "I Understand & Agree" button */}
        <div className="bg-[#FAF8F5] border-t border-[#E5DFD4] px-5 sm:px-7 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5E6F65]">
            <Lock className="w-4 h-4 text-[#76877D] shrink-0" />
            <span>UnFasten Public Interest Consumer Standard</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              id="terms-agree-btn"
              onClick={handleUnderstand}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#183626] hover:bg-[#224b35] active:bg-[#12281c] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-none sm:rounded-md transition-colors cursor-pointer shadow-xs min-h-[40px]"
            >
              <span>I Understand &amp; Agree</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
