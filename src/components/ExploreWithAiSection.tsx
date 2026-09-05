import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageSquare, HelpCircle, ShieldCheck, Leaf } from 'lucide-react';

interface ExploreWithAiSectionProps {
  onOpenAiChat: (prompt?: string) => void;
  currentBrand?: string;
}

const SAMPLE_AI_QUERIES = [
  'How can I spot greenwashing on clothing tags?',
  'Do microplastics shed from recycled polyester?',
  'What does a 60% cotton / 40% polyester blend mean for recycling?',
  'Which slow-fashion brands actually pay certified living wages?',
  'How should I wash synthetic clothes to stop microplastic shedding?',
];

export const ExploreWithAiSection: React.FC<ExploreWithAiSectionProps> = ({
  onOpenAiChat,
  currentBrand,
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onOpenAiChat(question.trim());
      setQuestion('');
    }
  };

  const brandSpecificQueries = currentBrand
    ? [
        `Why did ${currentBrand} receive this rating?`,
        `What are the most ethical alternatives to ${currentBrand}?`,
        `Does ${currentBrand} use virgin polyester in their clothes?`,
      ]
    : [];

  const displayQueries = brandSpecificQueries.length > 0
    ? [...brandSpecificQueries, ...SAMPLE_AI_QUERIES.slice(0, 3)]
    : SAMPLE_AI_QUERIES;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-6 md:p-8 shadow-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#E5DFD4]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#BE562C]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#BE562C] font-semibold">
                AI Textile & Ethics Intelligence
              </span>
            </div>
            <h2 className="font-editorial-serif text-2xl sm:text-3xl text-[#183626] font-normal">
              Explore more with AI
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6E64] mt-1 max-w-2xl font-normal leading-relaxed">
              Ask candid questions about textile durability, decode wash tag fiber blends, or uncover greenwashing claims in real-time.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenAiChat()}
            className="w-full sm:w-auto min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#183626] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#204732] active:bg-[#12281c] transition-colors self-start sm:self-center shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#E8A585]" />
            <span>Open AI Chat</span>
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#76877D] block mb-2.5">
            Quick Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {displayQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenAiChat(q)}
                className="text-xs min-h-[38px] px-3 py-2 bg-white hover:bg-[#F2ECE1] active:bg-[#ECE6DC] border border-[#D5CEC2] text-[#183626] hover:border-[#183626] transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>{q}</span>
                <ArrowRight className="w-3 h-3 text-[#BE562C] opacity-60 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Inline AI Query Box */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about clothing fabrics, ethical certifications, or brand practices..."
            className="flex-1 bg-white border border-[#D5CEC2] px-4 py-3 text-base sm:text-sm text-[#183626] placeholder:text-[#9A9184] focus:outline-hidden focus:border-[#183626]"
          />
          <button
            type="submit"
            disabled={!question.trim()}
            className="min-h-[44px] px-6 py-3 bg-[#183626] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#204732] active:bg-[#12281c] disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Ask AI</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D88A68]" />
          </button>
        </form>
      </div>
    </section>
  );
};
