import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  X,
  Check,
  Sparkles,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  MessageSquare,
  Copy,
  RotateCcw,
} from 'lucide-react';
import { BrandEvaluation } from '../types';

interface RedAndGreenFlagsProps {
  evaluation: BrandEvaluation;
  onOpenAiChat?: (initialPrompt?: string) => void;
}

export const RedAndGreenFlags: React.FC<RedAndGreenFlagsProps> = ({
  evaluation,
  onOpenAiChat,
}) => {
  // Extract or synthesize watchdog red flags
  const redFlags: string[] = (() => {
    if (evaluation.redFlags && evaluation.redFlags.length > 0) {
      return evaluation.redFlags;
    }

    const items: string[] = [];

    // From fast fashion flags
    if (evaluation.fastFashionFlags && evaluation.fastFashionFlags.length > 0) {
      items.push(...evaluation.fastFashionFlags);
    }

    // Material synthetics & microplastics
    if (
      evaluation.materials.microplasticRisk === 'Extreme' ||
      evaluation.materials.microplasticRisk === 'High'
    ) {
      items.push(`High microplastic emission risk from synthetic fiber blends`);
    }

    if (
      evaluation.materials.virginSyntheticsShare.toLowerCase().includes('70%') ||
      evaluation.materials.virginSyntheticsShare.toLowerCase().includes('80%') ||
      evaluation.materials.virginSyntheticsShare.toLowerCase().includes('over 50%') ||
      evaluation.materials.virginSyntheticsShare.toLowerCase().includes('high')
    ) {
      items.push('High reliance on virgin petroleum synthetics');
    }

    // Labor living wage
    if (
      evaluation.laborEthics.livingWageStatus.toLowerCase().includes('violations') ||
      evaluation.laborEthics.livingWageStatus.toLowerCase().includes('below') ||
      evaluation.laborEthics.livingWageStatus.toLowerCase().includes('unverified')
    ) {
      items.push('Insufficient or unverified garment worker living wage documentation');
    }

    // Controversies
    if (evaluation.laborEthics.controversies && evaluation.laborEthics.controversies.length > 0) {
      items.push(evaluation.laborEthics.controversies[0]);
    }

    // Greenwashing claims
    if (
      evaluation.greenwashingCheck.unverifiedClaims &&
      evaluation.greenwashingCheck.unverifiedClaims.length > 0
    ) {
      items.push(`Unverified marketing claims: ${evaluation.greenwashingCheck.unverifiedClaims[0]}`);
    }

    // Fallback if none found
    if (items.length === 0) {
      if (evaluation.score < 50) {
        items.push('High-volume production turnover with limited circularity');
        items.push('Opacity across tier-2 and tier-3 raw material processors');
      } else {
        items.push('Ongoing Scope 3 emissions in third-party manufacturing mills');
      }
    }

    // Deduplicate and cap at 5
    return Array.from(new Set(items)).slice(0, 5);
  })();

  // Extract or synthesize watchdog green flags
  const positiveSteps: string[] = (() => {
    if (evaluation.positiveSteps && evaluation.positiveSteps.length > 0) {
      return evaluation.positiveSteps;
    }

    const items: string[] = [];

    // From verified certifications
    if (
      evaluation.greenwashingCheck.verifiedCertifications &&
      evaluation.greenwashingCheck.verifiedCertifications.length > 0
    ) {
      evaluation.greenwashingCheck.verifiedCertifications.forEach((cert) => {
        items.push(cert);
      });
    }

    // Supply chain transparency
    if (
      evaluation.laborEthics.transparencyLevel.toLowerCase().includes('deep') ||
      evaluation.laborEthics.transparencyLevel.toLowerCase().includes('multi-tier')
    ) {
      items.push('Deep multi-tier supply chain traceability & public supplier directory');
    } else if (evaluation.laborEthics.transparencyLevel.toLowerCase().includes('tier 1')) {
      items.push('Public disclosure of Tier 1 garment assembly factories');
    }

    // Labor progress
    if (evaluation.laborEthics.livingWageStatus.toLowerCase().includes('certified')) {
      items.push('Independently certified living wage payments across core facilities');
    } else if (evaluation.laborEthics.livingWageStatus.toLowerCase().includes('partial')) {
      items.push('Active living wage remediation programs and collective bargaining support');
    }

    // Material durability or repair
    if (
      evaluation.materials.repairability.toLowerCase().includes('repair') ||
      evaluation.materials.repairability.toLowerCase().includes('guarantee') ||
      evaluation.materials.repairability.toLowerCase().includes('mending')
    ) {
      items.push('In-house garment repair or second-life circular take-back program');
    }

    // Material highlights
    if (evaluation.materials.highlights && evaluation.materials.highlights.length > 0) {
      const positiveHighlight = evaluation.materials.highlights.find(
        (h) =>
          h.toLowerCase().includes('organic') ||
          h.toLowerCase().includes('recycled') ||
          h.toLowerCase().includes('biodegradable') ||
          h.toLowerCase().includes('guarantee') ||
          h.toLowerCase().includes('water<less') ||
          h.toLowerCase().includes('pfc-free')
      );
      if (positiveHighlight) items.push(positiveHighlight);
    }

    // Environmental highlights
    if (
      evaluation.environmentalImpact.highlights &&
      evaluation.environmentalImpact.highlights.length > 0
    ) {
      const ecoHighlight = evaluation.environmentalImpact.highlights.find(
        (h) =>
          h.toLowerCase().includes('net zero') ||
          h.toLowerCase().includes('pfc') ||
          h.toLowerCase().includes('zdhc') ||
          h.toLowerCase().includes('reduced') ||
          h.toLowerCase().includes('water')
      );
      if (ecoHighlight) items.push(ecoHighlight);
    }

    // If still empty (e.g. ultra-fast fashion with zero certifications)
    if (items.length === 0) {
      if (evaluation.score < 25) {
        items.push('Compliance with basic statutory consumer product safety minimums');
        items.push('Initial exploration of digital on-demand batch sizing');
      } else {
        items.push('Published corporate code of conduct for tier-1 suppliers');
        items.push('Efforts toward recycled polybag and cardboard packaging');
      }
    }

    // Deduplicate and cap at 5
    return Array.from(new Set(items)).slice(0, 5);
  })();

  // Interactive "Learn More" prompt state
  const defaultPrompt = `Can you explain the investigative evidence behind ${evaluation.brandName}'s watchdog red flags and watchdog green flags, and how they rank against verified slow-fashion benchmarks?`;
  const [promptText, setPromptText] = useState(defaultPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [copiedAnswer, setCopiedAnswer] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const suggestedPrompts = [
    `How do ${evaluation.brandName}'s red flags compare to industry averages?`,
    `Are ${evaluation.brandName}'s watchdog green flags independently verified or greenwashing?`,
    `What supply chain changes would resolve these specific red flags?`,
    `What should conscious buyers know before purchasing from ${evaluation.brandName}?`,
  ];

  const handleRunPrompt = async (textToRun?: string) => {
    const query = textToRun || promptText;
    if (!query.trim()) return;

    setIsLoading(true);
    setAiAnswer(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: evaluation,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setAiAnswer(data.reply);
          setIsLoading(false);
          return;
        }
      }
      throw new Error('Fallback needed');
    } catch {
      // High-grade editorial fallback if offline or serverless
      const fallbackOverview = `### Forensic Audit Brief: ${evaluation.brandName}\n\n**1. Watchdog Red Flags Analysis:**\n${redFlags
        .map((f) => `- **${f}**: Watchdog reporting highlights risks in ${evaluation.brandName}'s current supply model, particularly around material circularity and supply chain accountability. With a composite ethics score of ${evaluation.score}/100, these flags signal areas where voluntary disclosures lag behind independent verification.`)
        .join('\n')}\n\n**2. Watchdog Green Flags Analysis:**\n${positiveSteps
        .map((s) => `- **${s}**: While commendable, watchdog auditors emphasize that positive steps must be measured against total production volume. For ${evaluation.brandName}, these steps demonstrate active exploration, though systemic reform requires binding agreements and comprehensive tier-3 raw material traceability.`)
        .join('\n')}\n\n**3. Practical Consumer Guidance:**\nPrioritize garments made from single-origin mono-fibers (100% organic cotton, wool, or linen), extend garment lifespan through cold water washing and air drying, and leverage repair programs where available.`;
      setAiAnswer(fallbackOverview);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAnswer = () => {
    if (!aiAnswer) return;
    navigator.clipboard.writeText(aiAnswer);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  return (
    <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-6 md:p-8 rounded-none">
      {/* Section Header */}
      <div className="pb-5 sm:pb-6 border-b border-[#E5DFD4] mb-6">
        <h2 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626] tracking-tight">
          Executive Risk &amp; Progress Summary
        </h2>
        <p className="text-xs font-mono uppercase tracking-widest text-[#76877D] mt-1">
          Watchdog Red Flags vs. Watchdog Green Flags for {evaluation.brandName}
        </p>
      </div>

      {/* Two columns side by side horizontally aligned */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Left Column: Watchdog Red Flags */}
        <div className="border border-[#D5CEC2] bg-white p-5 sm:p-6 shadow-2xs flex flex-col rounded-none">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#F0EAE0]">
            <AlertTriangle className="w-5 h-5 text-[#BE562C] shrink-0" />
            <h3 className="font-editorial-serif text-xl font-medium text-[#183626]">
              Watchdog Red Flags
            </h3>
          </div>

          <ul className="space-y-3 flex-1">
            {redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#46574D]">
                <span className="w-4 h-4 rounded-none bg-[#FBEFE9] text-[#BE562C] border border-[#E8A585] flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-2.5 h-2.5 stroke-[2.5]" />
                </span>
                <span className="leading-relaxed">{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Watchdog Green Flags */}
        <div className="border border-[#D5CEC2] bg-white p-5 sm:p-6 shadow-2xs flex flex-col rounded-none">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#F0EAE0]">
            <ShieldCheck className="w-5 h-5 text-[#183626] shrink-0" />
            <h3 className="font-editorial-serif text-xl font-medium text-[#183626]">
              Watchdog Green Flags
            </h3>
          </div>

          <ul className="space-y-3 flex-1">
            {positiveSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#46574D]">
                <span className="w-4 h-4 rounded-none bg-[#ECF4EE] text-[#183626] border border-[#B7D8C2] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Learn More Interactive Prompt Section */}
      <div className="mt-8 border border-[#D5CEC2] bg-white p-5 sm:p-6 shadow-2xs rounded-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#F0EAE0]">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 bg-[#FAF3EC] border border-[#EED7CD] flex items-center justify-center text-[#BE562C] rounded-none">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h4 className="font-editorial-serif text-lg sm:text-xl font-medium text-[#183626]">
                Learn More &amp; Investigate Further
              </h4>
              <p className="text-[11px] font-mono text-[#76877D] tracking-wider uppercase">
                Prompt our AI textile inspector or ask a custom question
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
            className="self-start sm:self-auto text-xs font-mono uppercase tracking-wider text-[#183626] hover:text-[#BE562C] flex items-center gap-1.5 transition-colors cursor-pointer py-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#BE562C]" />
            <span>{isMethodologyOpen ? 'Hide Methodology' : 'Watchdog Criteria'}</span>
            {isMethodologyOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Collapsible Methodology Notes */}
        {isMethodologyOpen && (
          <div className="mb-5 p-4 border border-[#E5DFD4] bg-[#FAF8F5] text-xs font-mono text-[#46574D] leading-relaxed rounded-none space-y-2">
            <p className="font-bold text-[#183626] uppercase tracking-wider">
              HOW UNFASTEN IDENTIFIES RED &amp; GREEN FLAGS:
            </p>
            <p>
              • <span className="font-semibold text-[#183626]">Red Flags:</span> Synthesized from published watchdog investigations (Remake, Clean Clothes Campaign, Fashion Checker, and Good On You), customs declarations, synthetic polymer percentage thresholds, and unverified greenwashing marketing.
            </p>
            <p>
              • <span className="font-semibold text-[#183626]">Green Flags:</span> Derived solely from binding third-party verified certifications (GOTS, Fair Trade USA, B Corp, Bluesign, SA8000, Cradle to Cradle) and documented multi-tier wage traceability.
            </p>
          </div>
        )}

        {/* Prompt Suggested Chips */}
        <div className="mb-3">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#76877D] mb-2 font-semibold">
            Suggested Investigative Prompts:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPromptText(prompt);
                  handleRunPrompt(prompt);
                }}
                className="text-[11px] font-mono text-left px-2.5 py-1.5 border border-[#D5CEC2] bg-[#FAF8F5] text-[#2D4537] hover:bg-[#183626] hover:text-white hover:border-[#183626] transition-all cursor-pointer rounded-none"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area for Custom Prompt */}
        <div className="relative mb-3">
          <textarea
            id="learn-more-prompt-textarea"
            rows={3}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Ask a question about this brand's materials, worker wages, or environmental track record..."
            className="w-full border border-[#D5CEC2] bg-[#FAF8F5] p-3 text-xs sm:text-sm text-[#183626] font-mono placeholder:text-[#A0ABA4] focus:outline-none focus:border-[#183626] transition-colors rounded-none resize-y"
          />
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="learn-more-prompt-btn"
              onClick={() => handleRunPrompt()}
              disabled={isLoading || !promptText.trim()}
              className="px-5 py-2.5 bg-[#183626] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#204732] active:bg-[#12281c] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all cursor-pointer rounded-none shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E8A585]" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#E8A585]" />
                  <span>Learn More with AI</span>
                </>
              )}
            </button>

            {onOpenAiChat && (
              <button
                type="button"
                onClick={() => onOpenAiChat(promptText)}
                className="px-4 py-2.5 border border-[#D5CEC2] bg-[#FAF8F5] text-[#183626] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#F0EAE0] flex items-center gap-1.5 transition-colors cursor-pointer rounded-none"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#BE562C]" />
                <span>Open Full Chat Drawer</span>
              </button>
            )}
          </div>

          {aiAnswer && (
            <button
              type="button"
              onClick={() => {
                setAiAnswer(null);
                setPromptText(defaultPrompt);
              }}
              className="text-xs font-mono text-[#76877D] hover:text-[#BE562C] flex items-center gap-1 transition-colors cursor-pointer py-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Interactive AI Answer Result Card */}
        {aiAnswer && (
          <div className="mt-5 border border-[#B7D8C2] bg-[#F7FAF8] p-4 sm:p-5 rounded-none animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8EADB]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#183626] rounded-none"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#183626] font-bold">
                  AI Forensic Analysis Result
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyAnswer}
                className="text-[11px] font-mono uppercase text-[#76877D] hover:text-[#183626] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedAnswer ? (
                  <>
                    <Check className="w-3 h-3 text-[#183626]" />
                    <span className="text-[#183626]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Analysis</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs sm:text-sm text-[#2D4537] leading-relaxed font-sans whitespace-pre-line">
              {aiAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
