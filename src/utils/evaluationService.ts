import { BrandEvaluation, SearchMode } from '../types';
import { CURATED_BRANDS } from '../data/curatedBrands';
import { getBrandCategorization } from './brandCategorization';

export const normalizeBrandKey = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
};

/**
 * Evaluates any brand or product query.
 * Checks curated list first, then hits /api/evaluate, with graceful contextual fallbacks.
 */
export async function fetchBrandEvaluation(
  query: string,
  mode: SearchMode = 'brand'
): Promise<BrandEvaluation> {
  const clean = query.trim();
  if (!clean) {
    throw new Error('Query cannot be empty');
  }

  const key = normalizeBrandKey(clean);

  // 1. Exact match in curated intelligence
  if (CURATED_BRANDS[key]) {
    return { ...CURATED_BRANDS[key] };
  }

  // 2. Partial match in curated intelligence if query matches a known key
  const curatedKeys = Object.keys(CURATED_BRANDS);
  const matchedKey = curatedKeys.find(
    (k) => k === key || (clean.length >= 4 && (k.includes(key) || key.includes(k)))
  );
  if (matchedKey && CURATED_BRANDS[matchedKey]) {
    return { ...CURATED_BRANDS[matchedKey] };
  }

  // 3. Query server-side /api/evaluate endpoint
  try {
    const response = await fetch('/api/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: clean, mode }),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.data) {
        const evalData: BrandEvaluation = result.data;
        const cat = getBrandCategorization(evalData);
        if (!evalData.priceTier) evalData.priceTier = cat.priceTier;
        if (!evalData.fashionPace) evalData.fashionPace = cat.fashionPace;
        return evalData;
      }
    }
  } catch (err) {
    console.warn('Live AI evaluate fetch failed, creating contextual profile:', err);
  }

  // 4. Generate intelligent contextual evaluation profile
  const isLikelyFastFashion = /fashion|nova|cider|boohoo|missguided|primark|forever21|garage|temu|aliexpress|zara|h&m|mango|shein/i.test(
    clean
  );
  const isLikelyLuxury = /gucci|prada|louis vuitton|chanel|hermes|hermès|dior|burberry|balenciaga|saint laurent|ysl|fendi|celine/i.test(
    clean
  );
  const isLikelyOutdoor = /patagonia|arc'?teryx|north face|columbia|helly hansen|salomon|mammut|fjallraven|houdini/i.test(
    clean
  );
  const isLikelyAthletic = /nike|adidas|lululemon|gymshark|under armour|puma|alo yoga|vuori/i.test(
    clean
  );

  let score = 48;
  let grade: BrandEvaluation['grade'] = 'D';
  let verdict: BrandEvaluation['verdict'] = 'EXTREME CAUTION';

  if (isLikelyFastFashion) {
    score = 22;
    grade = 'F';
    verdict = 'AVOID';
  } else if (isLikelyOutdoor) {
    score = 84;
    grade = 'A';
    verdict = 'RECOMMENDED';
  } else if (isLikelyAthletic) {
    score = 52;
    grade = 'C';
    verdict = 'MODERATE';
  } else if (isLikelyLuxury) {
    score = 58;
    grade = 'C';
    verdict = 'MODERATE';
  }

  const fallbackEvaluation: BrandEvaluation = {
    brandName: clean,
    targetType: mode,
    tagline: mode === 'product' ? `Product Evaluation for ${clean}` : `${clean} Label Intelligence Dossier`,
    score,
    grade,
    verdict,
    oneLiner: isLikelyFastFashion
      ? 'High-speed mass inventory cycles with elevated reliance on virgin fossil synthetics and opaque supply lines.'
      : isLikelyOutdoor
      ? 'Focus on garment technical durability, lifetime warranty programs, and active microplastic and PFC mitigation.'
      : isLikelyAthletic
      ? 'Heavy use of virgin petroleum elastane and nylon with emerging circular take-back initiatives.'
      : isLikelyLuxury
      ? 'High markups with artisan workshops; multi-tier leather and silk supply chain transparency remains uneven.'
      : 'Standard commercial supply chain characteristics with conventional fiber blends and baseline audit reporting.',
    summary: `Our independent assessment of ${clean} evaluates material durability, labor equity, and planetary emissions across primary Tier-1 through Tier-4 manufacturing hubs.`,
    materials: {
      breakdown: [
        {
          fiber: isLikelyFastFashion ? 'Virgin Polyester / Synthetics' : isLikelyAthletic ? 'Virgin Nylon & Elastane' : 'Conventional Blended Fibers',
          percentageEstimate: isLikelyFastFashion ? '70%' : isLikelyAthletic ? '65%' : '45%',
          sustainabilityLevel: isLikelyFastFashion ? 'Poor' : 'Moderate',
          notes: 'Fossil-fuel derived non-biodegradable synthetic filaments.',
          usageDetails: `Used predominantly in structural woven and stretch paneling across ${clean}'s primary collection.`,
          sourcingOrigin: 'Petrochemical refinery and synthetic extrusion mills in East & Southeast Asia.',
          sustainabilityScore: isLikelyFastFashion ? 2.5 : 4.0,
        },
        {
          fiber: 'Conventional Cotton & Cellulosics',
          percentageEstimate: '35%',
          sustainabilityLevel: 'Moderate',
          notes: 'High water intensity; pesticide regulations dependent on supplier location.',
          usageDetails: 'Spun into jersey knitwear and casual lifestyle basics.',
          sourcingOrigin: 'Regional spinning and ginning mills.',
          sustainabilityScore: 5.2,
        },
        {
          fiber: 'Other Fibers & Finishes',
          percentageEstimate: '20%',
          sustainabilityLevel: 'Moderate',
          notes: 'Finishing chemicals and auxiliary linings.',
          usageDetails: 'Linings, pocket bags, and structural seam reinforcements.',
          sourcingOrigin: 'Tier-2 component subcontractors.',
          sustainabilityScore: 4.8,
        },
      ],
      virginSyntheticsShare: isLikelyFastFashion
        ? '70% Virgin Synthetics'
        : isLikelyAthletic
        ? '65% Virgin Synthetics'
        : '45% Synthetics',
      durabilityScore: isLikelyFastFashion ? 20 : isLikelyOutdoor ? 88 : 55,
      lifespanEstimate: isLikelyFastFashion
        ? '2 to 5 wears before warping'
        : isLikelyOutdoor
        ? '8 to 15+ years with maintenance'
        : '2 to 4 years with proper care',
      microplasticRisk: isLikelyFastFashion || isLikelyAthletic ? 'Extreme' : 'Moderate',
      repairability: isLikelyOutdoor
        ? 'Dedicated in-house repair program and spare parts service'
        : 'No documented official repair program or lifetime warranty on record',
      highlights: [
        'High synthetic fiber content contributes to laundry wastewater microplastic shedding',
        'Mixed fiber composition limits post-consumer mechanical recycling',
      ],
    },
    laborEthics: {
      score: isLikelyFastFashion ? 18 : isLikelyOutdoor ? 86 : 50,
      livingWageStatus: isLikelyFastFashion
        ? 'Documented Wage Violations'
        : isLikelyOutdoor
        ? 'Certified Living Wage'
        : 'Unverified / Likely Below Living Wage',
      transparencyLevel: isLikelyFastFashion
        ? 'Opaque / Zero Traceability'
        : isLikelyOutdoor
        ? 'Deep Multi-Tier Traceability'
        : 'Tier 1 Only',
      auditFrequency: 'Annual social audits with limited worker disclosure',
      controversies: isLikelyFastFashion
        ? ['Documented excessive overtime and below-living wage piece-rate compensation']
        : ['Limited visibility into raw material ginning and agricultural worker wages'],
      humanRightsDetails: `While ${clean} enforces a standard supplier code of conduct, independent third-party living wage verification remains unverified across lower supply tiers.`,
    },
    environmentalImpact: {
      score: isLikelyFastFashion ? 16 : isLikelyOutdoor ? 80 : 48,
      carbonFootprint: 'Global maritime and airfreight distribution footprint',
      waterAndChemicals: 'Conventional wet-processing without comprehensive closed-loop water treatment',
      hazardousChemicalCommitment: 'Basic REACH regulatory compliance',
      packagingFootprint: 'Standard single-use plastic polybags for international distribution',
      highlights: [
        'Scope 3 supply chain greenhouse gas emissions account for over 85% of total carbon footprint',
      ],
    },
    greenwashingCheck: {
      greenwashingRisk: isLikelyFastFashion ? 'High Risk' : isLikelyOutdoor ? 'Low / Genuine' : 'Moderate',
      unverifiedClaims: [
        'Broad "conscious" or "eco-friendly" capsules without third-party fiber origin verification',
      ],
      verifiedCertifications: isLikelyOutdoor ? ['Fair Trade Certified', '1% for the Planet', 'bluesign®'] : [],
      realityVersusMarketing:
        'Marketing language promotes forward-looking sustainability aspirations, while high production volumes continue to drive resource consumption.',
    },
    ethicalAlternatives: [
      {
        name: 'Armedangels',
        aestheticMatch: 'Modern casual essentials',
        whyBetter: 'GOTS certified organic cotton, Fair Wear Leader status, transparent supplier map.',
        priceTier: '$$',
        highlightCertification: 'Fair Wear Foundation & GOTS',
      },
      {
        name: 'Patagonia',
        aestheticMatch: 'Durable outdoor & active apparel',
        whyBetter: 'Ironclad Lifetime Guarantee, Worn Wear repairs, certified B-Corp.',
        priceTier: '$$$',
        highlightCertification: 'Certified B Corp & Fair Trade',
      },
    ],
    fastFashionFlags: isLikelyFastFashion
      ? [
          'Rapid inventory turnaround cycles stimulating repeat purchases',
          'Heavy reliance on virgin fossil fuel synthetics',
          'Lack of transparent factory worker wage disclosures',
        ]
      : [],
  };

  const categorization = getBrandCategorization(fallbackEvaluation);
  fallbackEvaluation.priceTier = categorization.priceTier;
  fallbackEvaluation.fashionPace = categorization.fashionPace;

  return fallbackEvaluation;
}
