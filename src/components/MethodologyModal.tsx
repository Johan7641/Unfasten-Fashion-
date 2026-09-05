import React from 'react';
import { X, ShieldCheck, Scale, Cpu, Search, CheckCircle2 } from 'lucide-react';

interface MethodologyModalProps {
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#183626]/60 backdrop-blur-xs">
      <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#FAF8F5] border border-[#D5CEC2] shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DFD4]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#BE562C]" />
            <h2 className="font-editorial-serif text-2xl font-normal text-[#183626]">
              Unfasten Audit Methodology
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#76877D] hover:text-[#183626] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6 text-[#3F4F46] text-sm leading-relaxed">
          <div>
            <h3 className="font-editorial-serif text-lg font-semibold text-[#183626] mb-2">
              The Mission: Taking the &ldquo;Fast&rdquo; Out of Fashion
            </h3>
            <p>
              Unfasten Fashion is a student-led non-profit organization dedicated to promoting transparency, sustainability, and ethical practices in the fashion industry. Our mission is to help consumers make informed choices by highlighting how clothing materials, production methods, and labor conditions affect both people and the planet. We aim to inspire responsible buying habits and encourage brands to prioritize quality, durability, and fairness over speed and profit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 border border-[#DCD5C9] bg-white">
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#BE562C] mb-1">
                1. Material Quality & Durability (35%)
              </h4>
              <p className="text-xs text-[#5D6F65]">
                We assess how fashion products are made &mdash; from fiber strength and stitching resilience to the use of synthetic materials and microplastic shedding. Our goal is to ensure that buyers understand the long-term value and environmental impact of their clothing.
              </p>
            </div>

            <div className="p-4 border border-[#DCD5C9] bg-white">
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#183626] mb-1">
                2. Human Rights & Fair Wages (30%)
              </h4>
              <p className="text-xs text-[#5D6F65]">
                We advocate for fair treatment of garment workers worldwide. By researching wage transparency and ethical sourcing, we help consumers support brands that respect human dignity and provide safe working conditions.
              </p>
            </div>

            <div className="p-4 border border-[#DCD5C9] bg-white">
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#183626] mb-1">
                3. Environmental & Chemical Safety (20%)
              </h4>
              <p className="text-xs text-[#5D6F65]">
                We track pollution caused by textile dyes, packaging waste, and shipping emissions. Our team encourages eco-friendly production and responsible waste management to protect ecosystems and communities.
              </p>
            </div>

            <div className="p-4 border border-[#DCD5C9] bg-white">
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#BE562C] mb-1">
                4. Greenwashing Awareness (15%)
              </h4>
              <p className="text-xs text-[#5D6F65]">
                We expose misleading &ldquo;eco-friendly&rdquo; claims and verify certifications like GOTS, Fair Trade, and B Corp. Our research helps buyers distinguish genuine sustainability from marketing tactics.
              </p>
            </div>
          </div>

          <div className="p-4 border border-[#B7D8C2] bg-[#ECF4EE] text-xs text-[#183626] space-y-1">
            <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#183626]">
              Zero Bias Promise
            </h4>
            <p className="text-xs text-[#183626] leading-relaxed">
              Unfasten Fashion does not accept sponsorships or paid promotions. Every rating and report we publish is based solely on verified environmental and ethical criteria &mdash; ensuring that our mission remains independent, educational, and trustworthy.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5DFD4] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#183626] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#224b35] transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
