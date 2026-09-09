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

          {/* Who We Are & About Us */}
          <div className="pt-4 border-t border-[#E5DFD4] space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#BE562C] font-semibold block mb-1">
                About Unfasten Fashion
              </span>
              <h3 className="font-editorial-serif text-xl font-bold text-[#183626] mb-2">
                Who We Are
              </h3>
              <p className="text-xs sm:text-sm text-[#3F4F46] leading-relaxed bg-white p-4 border border-[#DCD5C9]">
                &ldquo;Unfasten Fashion is a student-led non-profit initiative founded by a group of passionate changemakers determined to challenge the fast fashion industry. We believe that fashion should empower people, not exploit them and that every purchase carries the power to shape a more ethical, sustainable future. Our mission is to raise awareness among buyers about the quality, materials, and human impact behind the clothes they wear, promoting transparency and responsibility in every thread. Part of a passion and IFSPD project.&rdquo;
              </p>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#76877D] font-bold block mb-2">
                Led By
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 bg-white border border-[#DCD5C9]">
                  <h4 className="font-editorial-serif font-bold text-sm text-[#183626]">
                    Johan Mathew Shareen
                  </h4>
                  <p className="text-[11px] font-mono text-[#BE562C] font-medium mt-0.5">
                    Co Founder and Executive Head
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#DCD5C9]">
                  <h4 className="font-editorial-serif font-bold text-sm text-[#183626]">
                    Ved Marella
                  </h4>
                  <p className="text-[11px] font-mono text-[#BE562C] font-medium mt-0.5">
                    Co Founder: Chief Executive Designer
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#DCD5C9]">
                  <h4 className="font-editorial-serif font-bold text-sm text-[#183626]">
                    Sanavi Barman
                  </h4>
                  <p className="text-[11px] font-mono text-[#5D6F65] font-medium mt-0.5">
                    Operations Lead &amp; Core Team
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#DCD5C9]">
                  <h4 className="font-editorial-serif font-bold text-sm text-[#183626]">
                    Vaishnavi Sarnaik
                  </h4>
                  <p className="text-[11px] font-mono text-[#5D6F65] font-medium mt-0.5">
                    Content Manager &amp; Core Team
                  </p>
                </div>

                <div className="p-3 bg-white border border-[#DCD5C9] sm:col-span-2">
                  <h4 className="font-editorial-serif font-bold text-sm text-[#183626]">
                    Almir Mullapuram
                  </h4>
                  <p className="text-[11px] font-mono text-[#5D6F65] font-medium mt-0.5">
                    Project Manager &amp; Core Team
                  </p>
                </div>
              </div>
            </div>
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
