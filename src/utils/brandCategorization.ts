import { BrandEvaluation } from '../types';

export type FashionPaceType =
  | 'Ultra Fast Fashion'
  | 'Fast Fashion'
  | 'Mid-Range Fashion'
  | 'Luxury Fashion'
  | 'Ultra / Extreme Luxury Fashion';

export type PriceTierType = '$' | '$$' | '$$$' | '$$$$' | '$$$$$';

export interface BrandCategoryResult {
  priceTier: PriceTierType;
  fashionPace: FashionPaceType;
  label: string; // e.g. "$$$$$ • ULTRA / EXTREME LUXURY FASHION"
  badgeColorClass: string;
}

// 1. ULTRA / EXTREME LUXURY FASHION ($$$$$)
// Characterized by haute maroquinerie, multi-thousand to multi-hundred-thousand dollar price points,
// bespoke hand-stitching ateliers, generational heirlooms, and artificial scarcity.
const ULTRA_EXTREME_LUXURY_BRANDS = [
  'hermes',
  'hermès',
  'chanel',
  'brunello cucinelli',
  'cucinelli',
  'loro piana',
  'goyard',
  'patek philippe',
  'delvaux',
  'stefano ricci',
  'kiton',
  'brioni',
  'moynat',
  'the row',
  'berluti',
  'schiaparelli',
  'boucheron',
  'graff',
  'harry winston',
];

// 2. LUXURY FASHION ($$$$)
// Major designer runway fashion houses and luxury conglomerates (LVMH, Kering, Richemont).
const LUXURY_FASHION_BRANDS = [
  'louis vuitton',
  'gucci',
  'dior',
  'christian dior',
  'prada',
  'saint laurent',
  'yves saint laurent',
  'ysl',
  'balenciaga',
  'bottega veneta',
  'burberry',
  'fendi',
  'celine',
  'valentino',
  'givenchy',
  'alexander mcqueen',
  'versace',
  'loewe',
  'tom ford',
  'cartier',
  'tiffany',
  'moncler',
  'jacquemus',
  'stella mccartney',
  'maison margiela',
  'margiela',
  'vivienne westwood',
  'balmain',
  'miu miu',
  'ferragamo',
  'salvatore ferragamo',
  'giorgio armani',
  'armani',
  'dolce & gabbana',
  'dolce and gabbana',
  'd&g',
  'rick owens',
  'off-white',
  'acne studios',
  'max mara',
  'chloe',
  'chloé',
  'lanvin',
  'dries van noten',
  'jil sander',
  'isabel marant',
  'marni',
  'kenzo',
];

// 3. MID-RANGE FASHION ($$$)
// Contemporary, premium athleisure, heritage durable brands, and ethical slow fashion labels.
const MID_RANGE_BRANDS = [
  'lululemon',
  'patagonia',
  'arc\'teryx',
  'arcteryx',
  'levi\'s',
  'levis',
  'everlane',
  'aritzia',
  'reformation',
  'cos',
  'sézane',
  'sezane',
  'arket',
  '& other stories',
  'other stories',
  'ganni',
  'ralph lauren',
  'polo ralph lauren',
  'tommy hilfiger',
  'calvin klein',
  'coach',
  'michael kors',
  'tory burch',
  'kate spade',
  'ted baker',
  'allsaints',
  'sandro',
  'maje',
  'ba&sh',
  'nudie jeans',
  'mud jeans',
  'armedangels',
  'veja',
  'on running',
  'hoka',
  'alo yoga',
  'alo',
  'gymshark',
  'carhartt',
  'carhartt wip',
  'barbour',
  'j.crew',
  'j crew',
  'madewell',
  'eileen fisher',
  'filippa k',
  'stüssy',
  'stussy',
  'supreme',
  'diesel',
  'scotch & soda',
  'free people',
  'anthropologie',
  'urban outfitters',
  'massimo dutti',
  'banana republic',
  'lacoste',
  'colorful standard',
  'organic basics',
  'kotn',
  'finisterre',
  'houdini sportswear',
  'houdini',
  'pact',
  'lucy & yak',
  'tentree',
  'boody',
  'girlfriend collective',
  'vuori',
  'rhone',
];

// 4. FAST FASHION ($$)
// High-street retailers with rapid micro-seasons (2-4 week cycles) and high mass-production volume.
const FAST_FASHION_BRANDS = [
  'zara',
  'h&m',
  'h & m',
  'hennes & mauritz',
  'mango',
  'uniqlo',
  'asos',
  'forever 21',
  'topshop',
  'gap',
  'old navy',
  'american eagle',
  'aerie',
  'hollister',
  'abercrombie & fitch',
  'abercrombie',
  'cotton on',
  'pull&bear',
  'pull & bear',
  'stradivarius',
  'bershka',
  'oysho',
  'river island',
  'next',
  'primark',
  'new look',
  'marks & spencer',
  'm&s',
  'target apparel',
  'walmart apparel',
  'monki',
  'weekday',
  'brandy melville',
];

// 5. ULTRA FAST FASHION ($)
// Algorithmic, on-demand marketplaces uploading thousands of styles daily with extreme disposable culture.
const ULTRA_FAST_FASHION_BRANDS = [
  'shein',
  'temu',
  'cider',
  'fashion nova',
  'boohoo',
  'prettylittlething',
  'plt',
  'nasty gal',
  'missguided',
  'zaful',
  'romwe',
  'aliexpress',
  'wish',
  'garage',
  'princess polly',
  'yesstyle',
  'dhgate',
  'halara',
  'emmiol',
  'cupshe',
  'shien',
];

/**
 * Categorizes any fashion brand into one of the 5 canonical tiers:
 * 1. Ultra Fast Fashion ($)
 * 2. Fast Fashion ($$)
 * 3. Mid-Range Fashion ($$$)
 * 4. Luxury Fashion ($$$$)
 * 5. Ultra / Extreme Luxury Fashion ($$$$$)
 */
export function getBrandCategorization(evaluation: BrandEvaluation): BrandCategoryResult {
  const name = (evaluation.brandName || '').toLowerCase().trim();
  const summaryText = (
    (evaluation.summary || '') +
    ' ' +
    (evaluation.tagline || '') +
    ' ' +
    (evaluation.oneLiner || '') +
    ' ' +
    (evaluation.parentCompany || '')
  ).toLowerCase();

  // 1. Check if evaluation already has an explicit valid fashionPace from curated data or Gemini
  if (evaluation.fashionPace && evaluation.priceTier) {
    const pace = evaluation.fashionPace.toLowerCase();
    if (pace.includes('extreme luxury') || pace.includes('ultra luxury')) {
      return {
        priceTier: '$$$$$',
        fashionPace: 'Ultra / Extreme Luxury Fashion',
        label: '$$$$$ • ULTRA / EXTREME LUXURY FASHION',
        badgeColorClass: 'text-[#5A2C18] bg-[#FAF2EB] border-[#DFC9BA]',
      };
    }
    if (pace.includes('luxury')) {
      return {
        priceTier: '$$$$',
        fashionPace: 'Luxury Fashion',
        label: '$$$$ • LUXURY FASHION',
        badgeColorClass: 'text-[#4A2D5C] bg-[#F7F2FA] border-[#D8C7E3]',
      };
    }
    if (pace.includes('mid-range') || pace.includes('mid range') || pace.includes('contemporary')) {
      return {
        priceTier: '$$$',
        fashionPace: 'Mid-Range Fashion',
        label: '$$$ • MID-RANGE FASHION',
        badgeColorClass: 'text-[#183626] bg-[#ECF4EE] border-[#B7D8C2]',
      };
    }
    if (pace.includes('ultra-fast') || pace.includes('ultra fast')) {
      return {
        priceTier: '$',
        fashionPace: 'Ultra Fast Fashion',
        label: '$ • ULTRA FAST FASHION',
        badgeColorClass: 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]',
      };
    }
    if (pace.includes('fast')) {
      return {
        priceTier: '$$',
        fashionPace: 'Fast Fashion',
        label: '$$ • FAST FASHION',
        badgeColorClass: 'text-[#BE562C] bg-[#FDF7F4] border-[#EED7CD]',
      };
    }
  }

  // 2. Rigorous Name Lookup across the 5 categories (Checking Extreme Luxury FIRST so it never falls into fast fashion!)
  for (const b of ULTRA_EXTREME_LUXURY_BRANDS) {
    if (name === b || name.includes(b) || b.includes(name)) {
      return {
        priceTier: '$$$$$',
        fashionPace: 'Ultra / Extreme Luxury Fashion',
        label: '$$$$$ • ULTRA / EXTREME LUXURY FASHION',
        badgeColorClass: 'text-[#5A2C18] bg-[#FAF2EB] border-[#DFC9BA]',
      };
    }
  }

  for (const b of LUXURY_FASHION_BRANDS) {
    if (name === b || name.includes(b) || b.includes(name)) {
      return {
        priceTier: '$$$$',
        fashionPace: 'Luxury Fashion',
        label: '$$$$ • LUXURY FASHION',
        badgeColorClass: 'text-[#4A2D5C] bg-[#F7F2FA] border-[#D8C7E3]',
      };
    }
  }

  for (const b of ULTRA_FAST_FASHION_BRANDS) {
    if (name === b || name.includes(b) || b.includes(name)) {
      return {
        priceTier: '$',
        fashionPace: 'Ultra Fast Fashion',
        label: '$ • ULTRA FAST FASHION',
        badgeColorClass: 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]',
      };
    }
  }

  for (const b of FAST_FASHION_BRANDS) {
    if (name === b || name.includes(b) || b.includes(name)) {
      return {
        priceTier: '$$',
        fashionPace: 'Fast Fashion',
        label: '$$ • FAST FASHION',
        badgeColorClass: 'text-[#BE562C] bg-[#FDF7F4] border-[#EED7CD]',
      };
    }
  }

  for (const b of MID_RANGE_BRANDS) {
    if (name === b || name.includes(b) || b.includes(name)) {
      return {
        priceTier: '$$$',
        fashionPace: 'Mid-Range Fashion',
        label: '$$$ • MID-RANGE FASHION',
        badgeColorClass: 'text-[#183626] bg-[#ECF4EE] border-[#B7D8C2]',
      };
    }
  }

  // 3. Heuristic Keyword Matching (High-end indicators checked first!)
  if (
    summaryText.includes('haute couture') ||
    summaryText.includes('extreme luxury') ||
    summaryText.includes('ultra luxury') ||
    summaryText.includes('haute maroquinerie') ||
    summaryText.includes('birkin') ||
    summaryText.includes('kelly bag') ||
    summaryText.includes('saddle stitch')
  ) {
    return {
      priceTier: '$$$$$',
      fashionPace: 'Ultra / Extreme Luxury Fashion',
      label: '$$$$$ • ULTRA / EXTREME LUXURY FASHION',
      badgeColorClass: 'text-[#5A2C18] bg-[#FAF2EB] border-[#DFC9BA]',
    };
  }

  if (
    summaryText.includes('luxury maison') ||
    summaryText.includes('luxury fashion house') ||
    summaryText.includes('designer label') ||
    summaryText.includes('runway collection') ||
    summaryText.includes('luxury goods')
  ) {
    return {
      priceTier: '$$$$',
      fashionPace: 'Luxury Fashion',
      label: '$$$$ • LUXURY FASHION',
      badgeColorClass: 'text-[#4A2D5C] bg-[#F7F2FA] border-[#D8C7E3]',
    };
  }

  if (
    summaryText.includes('ultra-fast') ||
    summaryText.includes('ultra fast') ||
    summaryText.includes('micro-trend') ||
    summaryText.includes('thousands of new styles daily')
  ) {
    return {
      priceTier: '$',
      fashionPace: 'Ultra Fast Fashion',
      label: '$ • ULTRA FAST FASHION',
      badgeColorClass: 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]',
    };
  }

  if (
    summaryText.includes('fast-fashion') ||
    summaryText.includes('fast fashion') ||
    summaryText.includes('two-week cycle') ||
    summaryText.includes('high-street')
  ) {
    return {
      priceTier: '$$',
      fashionPace: 'Fast Fashion',
      label: '$$ • FAST FASHION',
      badgeColorClass: 'text-[#BE562C] bg-[#FDF7F4] border-[#EED7CD]',
    };
  }

  // Fallback defaults based on priceTier or score
  if (evaluation.priceTier === '$$$$') {
    return {
      priceTier: '$$$$',
      fashionPace: 'Luxury Fashion',
      label: '$$$$ • LUXURY FASHION',
      badgeColorClass: 'text-[#4A2D5C] bg-[#F7F2FA] border-[#D8C7E3]',
    };
  }

  if (evaluation.priceTier === '$$$' || evaluation.score >= 60) {
    return {
      priceTier: '$$$',
      fashionPace: 'Mid-Range Fashion',
      label: '$$$ • MID-RANGE FASHION',
      badgeColorClass: 'text-[#183626] bg-[#ECF4EE] border-[#B7D8C2]',
    };
  }

  if (evaluation.score <= 20) {
    return {
      priceTier: '$',
      fashionPace: 'Ultra Fast Fashion',
      label: '$ • ULTRA FAST FASHION',
      badgeColorClass: 'text-[#BE562C] bg-[#FBEFE9] border-[#E8A585]',
    };
  }

  return {
    priceTier: '$$',
    fashionPace: 'Fast Fashion',
    label: '$$ • FAST FASHION',
    badgeColorClass: 'text-[#BE562C] bg-[#FDF7F4] border-[#EED7CD]',
  };
}
