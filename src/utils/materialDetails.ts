import { MaterialBreakdownItem } from '../types';

export interface DetailedMaterialAudit {
  fiber: string;
  percentageEstimate: string;
  sustainabilityLevel: 'Poor' | 'Moderate' | 'Good' | 'Excellent';
  notes: string;
  usageDetails: string;
  sourcingOrigin: string;
  sustainabilityScore: number; // 0.0 to 10.0
  scoreBreakdown: {
    resourceImpact: string;
    circularity: string;
    supplyTransparency: string;
  };
}

export function getMaterialDetailedAudit(
  item: MaterialBreakdownItem,
  brandName = 'The brand',
  fashionPace = 'Fast Fashion',
  overallScore = 45
): DetailedMaterialAudit {
  const fiberLower = item.fiber.toLowerCase();
  const isEthicalBrand =
    overallScore >= 70 ||
    fashionPace.toLowerCase().includes('slow') ||
    brandName.toLowerCase().includes('patagonia') ||
    brandName.toLowerCase().includes('armedangels') ||
    brandName.toLowerCase().includes('nili') ||
    brandName.toLowerCase().includes('reformation') ||
    brandName.toLowerCase().includes('everlane') ||
    brandName.toLowerCase().includes('eileen');

  const isUltraFast =
    overallScore <= 25 ||
    fashionPace.toLowerCase().includes('ultra') ||
    brandName.toLowerCase().includes('shein') ||
    brandName.toLowerCase().includes('temu') ||
    brandName.toLowerCase().includes('cider') ||
    brandName.toLowerCase().includes('boohoo');

  // If already specified in data
  if (item.usageDetails && item.sourcingOrigin && typeof item.sustainabilityScore === 'number') {
    return {
      fiber: item.fiber,
      percentageEstimate: item.percentageEstimate,
      sustainabilityLevel: item.sustainabilityLevel,
      notes: item.notes,
      usageDetails: item.usageDetails,
      sourcingOrigin: item.sourcingOrigin,
      sustainabilityScore: item.sustainabilityScore,
      scoreBreakdown: getScoreBreakdown(item.sustainabilityScore, fiberLower),
    };
  }

  let usage = item.usageDetails || '';
  let sourcing = item.sourcingOrigin || '';
  let score = item.sustainabilityScore ?? 5.0;

  // 1. COTTON
  if (fiberLower.includes('cotton')) {
    const isOrganic = fiberLower.includes('organic') || item.notes.toLowerCase().includes('organic');
    const isRecycled = fiberLower.includes('recycled') || item.notes.toLowerCase().includes('recycled');

    if (isOrganic || isRecycled) {
      usage = `${brandName} specifies certified organic or recycled cotton for primary jersey knits, denim, and woven shirting to eliminate synthetic pesticides and safeguard farm-level soil integrity.`;
      sourcing = isEthicalBrand
        ? `GOTS-certified (Global Organic Textile Standard) agricultural cooperatives in India, Turkey, and Texas. Verified non-GMO seeds, natural rain-fed or drip irrigation, and direct fair-trade farmer contracts.`
        : `Third-party certified organic mills in India and Turkey, though batch tracing down to specific regional farming cooperatives remains partially aggregated.`;
      score = isEthicalBrand ? 9.2 : 8.0;
    } else if (isUltraFast) {
      usage = `Blended into high-turnover cheap t-shirts, hoodies, and basic tops. Blended with polyester or elastane at lower fiber gauge to speed machine cutting and reduce per-yard manufacturing cost.`;
      sourcing = `Low-cost commodity spot markets and spinning mills in China (Guangdong, Xinjiang high-risk supply chains), Bangladesh, and Pakistan. Zero farm-level traceability with severe vulnerability to forced labor and unregulated pesticide use.`;
      score = 2.4;
    } else if (isEthicalBrand) {
      usage = `Used across premium apparel with heavy emphasis on durability, higher yarn counts, and preshrunk treatments to extend wear life.`;
      sourcing = `Sourced through certified Better Cotton (BCI) partners and vetted Tier-2 yarn spinners in the US, Portugal, and Japan, with published mill disclosures.`;
      score = 7.1;
    } else {
      // Conventional Fast Fashion / Mid-Range
      usage = `Core primary fiber for everyday apparel including tees, denim, chinos, and sweaters. High reliance on conventional agricultural production.`;
      sourcing = `Commercial spinning mills across India, China, Vietnam, and Pakistan. Largely reliant on mass-market BCI mass-balance credits rather than segregated physical traceability to specific farm gate origins.`;
      score = 4.8;
    }
  }
  // 2. POLYESTER
  else if (fiberLower.includes('poly') || fiberLower.includes('pet')) {
    const isRecycled = fiberLower.includes('recycled') || item.notes.toLowerCase().includes('recycled');
    if (isRecycled) {
      usage = `Utilized in performance fleece, technical jackets, lining, and swimwear to redirect post-consumer PET bottles from landfills into synthetic textiles.`;
      sourcing = `Mechanical recycling plants in Taiwan, Japan, and Vietnam certified under the Global Recycled Standard (GRS). Reduces virgin petroleum use by ~50%, though microplastic shedding during washing persists.`;
      score = isEthicalBrand ? 6.8 : 5.5;
    } else if (isUltraFast) {
      usage = `Dominant primary fiber across 70%+ of the catalogue, utilized for rapid-turnover dresses, tops, loungewear, and linings due to rock-bottom raw material cost (~$1.20/kg) and rapid thermal printing capability.`;
      sourcing = `Virgin crude oil petrochemical refineries and extrusion plants across East Asia (China, Malaysia). Untracked coal-powered polymerization with intense greenhouse gas emissions and non-biodegradable lifespan lasting 200+ years.`;
      score = 1.3;
    } else {
      usage = `Integrated into athletic wear, garment linings, outerwear shells, and wrinkle-resistant blends to provide tensile strength and easy care properties.`;
      sourcing = `Industrial petrochemical synthetic fiber mills in China, Indonesia, and Vietnam. Sourced as virgin polyester filament with significant fossil fuel footprint and documented domestic wash microplastic shedding.`;
      score = 2.8;
    }
  }
  // 3. VISCOSE / RAYON / MODAL / LYOCELL
  else if (
    fiberLower.includes('viscose') ||
    fiberLower.includes('rayon') ||
    fiberLower.includes('modal') ||
    fiberLower.includes('lyocell') ||
    fiberLower.includes('tencel')
  ) {
    const isTencel = fiberLower.includes('tencel') || fiberLower.includes('lyocell');
    if (isTencel) {
      usage = `Selected for fluid dresses, soft shirting, and luxury-hand knits as an eco-conscious alternative to conventional viscose and silk.`;
      sourcing = `Lenzing AG facilities in Austria and Czech Republic. Sourced from sustainably harvested FSC/PEFC certified eucalyptus and beech wood pulp using a non-toxic closed-loop solvent spinning process that recycles >99.5% of water and solvent.`;
      score = 9.0;
    } else if (isUltraFast) {
      usage = `Employed in cheap printed sundresses, flowy blouses, and fast-drape fast-fashion items to mimic silky textures at lowest possible price.`;
      sourcing = `High-risk dissolving pulp mills in Indonesia and Southeast Asia often flagged by CanopyStyle audits for ancient forest deforestation risk and open toxic carbon disulfide wastewater effluent into local waterways.`;
      score = 2.2;
    } else {
      usage = `Utilized for soft drape garments, blouses, lightweight summer trousers, and breathable linings.`;
      sourcing = `Wood pulp suppliers in China, India, and Southeast Asia. Partially audited under CanopyStyle commitments, though chemical closed-loop recovery at Tier-3 spinning mills is only partially verified.`;
      score = 4.5;
    }
  }
  // 4. NYLON / POLYAMIDE
  else if (fiberLower.includes('nylon') || fiberLower.includes('polyamide')) {
    const isRecycled = fiberLower.includes('recycled') || fiberLower.includes('econyl');
    if (isRecycled) {
      usage = `Engineered into high-durability swimwear, active leggings, and technical outdoor shells where stretch and abrasion resistance are vital.`;
      sourcing = `Regenerated nylon processors (such as Aquafil ECONYL® in Italy/Slovenia) repurposing post-industrial waste, ghost fishing nets, and carpet remnants.`;
      score = 7.5;
    } else {
      usage = `Reinforces stress points, hosiery, windbreakers, and elastic sportswear requiring high tensile tear strength.`;
      sourcing = `Petroleum-derived synthetic polymer plants in China, Taiwan, and the US. Manufacturing releases nitrous oxide (N2O)—a greenhouse gas ~300x more potent than CO2. High microplastic shedding.`;
      score = 2.5;
    }
  }
  // 5. WOOL / MERINO / CASHMERE
  else if (
    fiberLower.includes('wool') ||
    fiberLower.includes('merino') ||
    fiberLower.includes('cashmere') ||
    fiberLower.includes('alpaca')
  ) {
    const isCertified =
      fiberLower.includes('rws') ||
      fiberLower.includes('recycled') ||
      item.notes.toLowerCase().includes('rws') ||
      isEthicalBrand;
    if (isCertified) {
      usage = `Constructed into heritage knitwear, winter coats, and thermal base layers designed for multi-decade durability and natural thermoregulation.`;
      sourcing = `Responsible Wool Standard (RWS) certified pasture farms in New Zealand, South Africa, and Patagonia. Prohibits mulesing, mandates progressive soil and grassland management, and ensures sheep welfare.`;
      score = 8.8;
    } else {
      usage = `Used in seasonal sweaters, tailored blazers, and cold-weather knit accessories.`;
      sourcing = `Commercial shearing auctions in Australia, China, and Mongolia. Conventional wool chains often suffer from supply opacity regarding grazing land degradation and mulesing practices.`;
      score = 5.2;
    }
  }
  // 6. LINEN / HEMP
  else if (fiberLower.includes('linen') || fiberLower.includes('flax') || fiberLower.includes('hemp')) {
    usage = `Chosen for breathable summer tailoring, shirts, resort wear, and relaxed trousers due to exceptional natural cooling and antibacterial qualities.`;
    sourcing = `European Flax certified agriculture across France, Belgium, and the Netherlands. Naturally rain-fed crop requiring near-zero chemical pesticides or fertilizers; 100% biodegradable with zero microplastic release.`;
    score = isEthicalBrand ? 9.5 : 8.6;
  }
  // 7. SPANDEX / ELASTANE / ELASTOMER
  else if (
    fiberLower.includes('elastane') ||
    fiberLower.includes('spandex') ||
    fiberLower.includes('lycra')
  ) {
    usage = `Blended in 2%–10% concentrations to deliver mechanical stretch, recovery, and form-fitting comfort in denim, leggings, swimwear, and intimates.`;
    sourcing = `Specialty polyurethane petrochemical synthesis facilities in East Asia. Because it is chemically co-extruded and tightly woven with other fibers, it makes post-consumer textile-to-textile mechanical recycling nearly impossible today.`;
    score = 2.0;
  }
  // 8. LEATHER / EXOTIC SKINS
  else if (fiberLower.includes('leather') || fiberLower.includes('skin') || fiberLower.includes('suede')) {
    const isVegetable =
      item.notes.toLowerCase().includes('vegetable') || fiberLower.includes('vegetable');
    if (isVegetable || isEthicalBrand) {
      usage = `Artisanal footwear, bags, belts, and heirloom leather jackets built for decades of repairability.`;
      sourcing = `Leather Working Group (LWG) Gold-rated tanneries in Italy, France, or Germany utilizing vegetable tannins (chestnut, mimosa bark) without toxic hexavalent chromium (Cr VI).`;
      score = 7.4;
    } else {
      usage = `Handbags, footwear uppers, jackets, and accessories.`;
      sourcing = `Commercial tanneries in Bangladesh, China, and India. Predominantly chrome-tanned with significant toxic heavy-metal wastewater effluent and slaughterhouse supply traceability challenges.`;
      score = 3.6;
    }
  }
  // 9. SILK
  else if (fiberLower.includes('silk')) {
    usage = `Used for premium scarves, slips, blouses, and dresses for lightweight luster and temperature-regulating drape.`;
    sourcing = `Mulberry sericulture farms and reeling mills concentrated in Zhejiang and Jiangsu, China. High process energy during cocoon boiling, with organic or Ahimsa (Peace Silk) options reducing animal welfare concerns.`;
    score = isEthicalBrand ? 7.6 : 5.8;
  }
  // 10. ACRYLIC
  else if (fiberLower.includes('acrylic')) {
    usage = `Woven as a low-cost substitute for wool in bulky knitwear, winter beanies, and synthetic scarves.`;
    sourcing = `Petrochemical synthesis of polyacrylonitrile (PAN) in mainland China and Turkey. Uses toxic acrylonitrile monomer with high thermal production energy and extreme microplastic shed rates during machine washing.`;
    score = 1.4;
  }
  // DEFAULT / OTHER FIBERS
  else {
    usage = `Integrated into the product construction to balance structural drape, hand-feel, and commercial cost margins.`;
    sourcing = isEthicalBrand
      ? `Vetted Tier-1 and Tier-2 component suppliers with independent social and environmental compliance documentation.`
      : `Broad commercial supply chain intermediaries with limited upstream transparency beyond initial garment assembly.`;
    score = isEthicalBrand ? 7.0 : 4.0;
  }

  return {
    fiber: item.fiber,
    percentageEstimate: item.percentageEstimate,
    sustainabilityLevel: item.sustainabilityLevel,
    notes: item.notes,
    usageDetails: usage,
    sourcingOrigin: sourcing,
    sustainabilityScore: Number(score.toFixed(1)),
    scoreBreakdown: getScoreBreakdown(score, fiberLower),
  };
}

function getScoreBreakdown(score: number, fiber: string) {
  if (score >= 8.0) {
    return {
      resourceImpact: 'Low environmental footprint; regenerative or renewable agricultural inputs.',
      circularity: 'High circularity; biodegradable or cleanly recyclable mono-fiber.',
      supplyTransparency: 'Verified multi-tier transparency with independent third-party certifications.',
    };
  }
  if (score >= 5.0) {
    return {
      resourceImpact: 'Moderate footprint; partially mitigated through efficiency or certified programs.',
      circularity: 'Moderate circularity; blending may restrict mechanical recycling at end of life.',
      supplyTransparency: 'Partial traceability; factory disclosures verified down to Tier 2 spinning mills.',
    };
  }
  return {
    resourceImpact: 'High resource intensity; fossil-fuel depletion or chemical-intensive farming.',
    circularity: 'Severe circularity barrier; persistent synthetic microplastics or non-recyclable blend.',
    supplyTransparency: 'Opaque supply chain; spot-market commodity sourcing without farm/refinery tracing.',
  };
}
