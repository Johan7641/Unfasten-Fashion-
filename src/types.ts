export type SearchMode = 'brand' | 'product' | 'link' | 'screenshot';

export interface MaterialBreakdownItem {
  fiber: string;
  percentageEstimate: string;
  sustainabilityLevel: 'Poor' | 'Moderate' | 'Good' | 'Excellent';
  notes: string;
}

export interface BrandEvaluation {
  brandName: string;
  targetType: SearchMode;
  tagline: string;
  foundedYear?: string;
  headquarters?: string;
  parentCompany?: string;
  score: number; // 0-100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  verdict: 'AVOID' | 'EXTREME CAUTION' | 'MODERATE' | 'RECOMMENDED' | 'EXEMPLARY';
  oneLiner: string;
  summary: string;
  materials: {
    breakdown: MaterialBreakdownItem[];
    virginSyntheticsShare: string;
    durabilityScore: number; // 0-100
    lifespanEstimate: string;
    microplasticRisk: 'Extreme' | 'High' | 'Moderate' | 'Low';
    repairability: string;
    highlights: string[];
  };
  laborEthics: {
    score: number; // 0-100
    livingWageStatus: 'Documented Wage Violations' | 'Unverified / Likely Below Living Wage' | 'Partial Progress' | 'Certified Living Wage';
    transparencyLevel: 'Opaque / Zero Traceability' | 'Tier 1 Only' | 'Deep Multi-Tier Traceability';
    auditFrequency: string;
    controversies: string[];
    humanRightsDetails: string;
  };
  environmentalImpact: {
    score: number; // 0-100
    carbonFootprint: string;
    waterAndChemicals: string;
    hazardousChemicalCommitment: string;
    packagingFootprint: string;
    highlights: string[];
  };
  greenwashingCheck: {
    greenwashingRisk: 'High Risk' | 'Moderate' | 'Low / Genuine';
    unverifiedClaims: string[];
    verifiedCertifications: string[];
    realityVersusMarketing: string;
  };
  ethicalAlternatives: Array<{
    name: string;
    aestheticMatch: string;
    whyBetter: string;
    priceTier: '$' | '$$' | '$$$' | '$$$$';
    highlightCertification: string;
  }>;
  fastFashionFlags: string[];
  uploadedImagePreview?: string;
  identifiedProduct?: string;
}
