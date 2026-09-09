import { BrandEvaluation } from '../types';

export const CURATED_BRANDS: Record<string, BrandEvaluation> = {
  shein: {
    brandName: 'SHEIN',
    targetType: 'brand',
    tagline: 'Ultra-Fast Fashion Marketplace Giant',
    foundedYear: '2008',
    headquarters: 'Singapore (originally Nanjing, China)',
    parentCompany: 'Roadget Business Pte. Ltd.',
    priceTier: '$',
    fashionPace: 'Ultra Fast Fashion',
    score: 12,
    grade: 'F',
    verdict: 'AVOID',
    oneLiner: 'Astronomical production volumes powered by unverified labor, petroleum fibers, and extreme disposable culture.',
    summary: 'Shein represents the pinnacle of ultra-fast fashion, uploading between 6,000 to 10,000 new styles daily to its digital storefront. Its business model hinges on ultra-low margins, non-durable synthetic textiles, and hyper-fragmented subcontracted manufacturing that systematically obscures supply chain accountability.',
    materials: {
      breakdown: [
        { fiber: 'Virgin Polyester & Synthetics', percentageEstimate: '75-80%', sustainabilityLevel: 'Poor', notes: 'Fossil-fuel derived, sheds persistent microplastics with every wash cycle.' },
        { fiber: 'Conventional Cotton & Blends', percentageEstimate: '15-20%', sustainabilityLevel: 'Poor', notes: 'High pesticide and water intensity; persistent supply chain origin questions.' },
        { fiber: 'Viscose / Rayon', percentageEstimate: '5-8%', sustainabilityLevel: 'Moderate', notes: 'Frequently linked to deforestation and toxic carbon disulfide discharge in dissolving pulp processing.' },
        { fiber: 'Recycled or Certified Fibers', percentageEstimate: '<1%', sustainabilityLevel: 'Poor', notes: 'Minimal presence despite occasional marketing capsule collections.' }
      ],
      virginSyntheticsShare: '78% Virgin Synthetics',
      durabilityScore: 15,
      lifespanEstimate: 'Estimated 2 to 5 wear cycles before seams warp, pills form, or zippers fail.',
      microplasticRisk: 'Extreme',
      repairability: 'Non-repairable; construction tolerances and fragile fabric gauge make tailoring economically unfeasible.',
      highlights: [
        'Over 75% fossil-fuel-based virgin synthetics',
        'Extreme microplastic release index',
        'Designed for rapid discard cycle (average lifespan under 3 months)'
      ]
    },
    laborEthics: {
      score: 10,
      livingWageStatus: 'Documented Wage Violations',
      transparencyLevel: 'Opaque / Zero Traceability',
      auditFrequency: 'Irregular internal spot checks with high supplier turnover',
      controversies: [
        'Public Eye NGO investigation revealed 75-hour workweeks with one day off per month in informal Guangzhou workshops',
        'Piece-rate wage systems penalizing workers for defective seams down to pennies per garment',
        'Scrutiny over forced labor exposure in cotton sourcing'
      ],
      humanRightsDetails: 'While Shein publishes a supplier code of conduct, independent investigations consistently uncover systemic overtime violations, hazardous workshop ventilation, and lack of collective bargaining protections.'
    },
    environmentalImpact: {
      score: 14,
      carbonFootprint: 'Over 16.7 million tons CO2e annually, exacerbated by airfreight-centric direct consumer shipping',
      waterAndChemicals: 'Heavy textile dyeing runoff without certified closed-loop wastewater recycling',
      hazardousChemicalCommitment: 'No commitment to Zero Discharge of Hazardous Chemicals (ZDHC)',
      packagingFootprint: 'Individual virgin plastic zip bags for every single item shipped worldwide',
      highlights: [
        'Heavy reliance on individual air freight deliveries dramatically spiking scope 3 emissions',
        'Hazardous lead and phthalate levels discovered in third-party product safety tests (Greenpeace Canada)',
        'Negligible post-consumer garment collection or circular recycling'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'High Risk',
      unverifiedClaims: [
        'Promotes "evoluSHEIN" eco-collection while it accounts for less than 0.5% of total SKUs',
        'Claims on-demand production prevents waste while millions of unsold returned parcels end up in landfills'
      ],
      verifiedCertifications: [],
      realityVersusMarketing: 'Marketing promotes digital agility and consumer affordability, while concealing immense planetary externalities and sweatshop-adjacent labor dynamics.'
    },
    ethicalAlternatives: [
      {
        name: 'Nuw / Depop / Vinted',
        aestheticMatch: 'Trend-driven style experimentation',
        whyBetter: 'Zero new raw material extraction, extends existing garment lifecycle.',
        priceTier: '$',
        highlightCertification: 'Circular Secondhand Economy'
      },
      {
        name: 'Lucy & Yak',
        aestheticMatch: 'Vibrant, playful casualwear',
        whyBetter: 'Organic GOTS cotton, living wage certified factories, complete supplier directory.',
        priceTier: '$$',
        highlightCertification: 'Living Wage Foundation & GOTS'
      },
      {
        name: 'Armedangels',
        aestheticMatch: 'Modern everyday essentials',
        whyBetter: 'Leader in eco-materials, GOTS certified, Fair Wear Foundation Leader.',
        priceTier: '$$',
        highlightCertification: 'Fair Wear Foundation & PETA-Approved Vegan'
      }
    ],
    fastFashionFlags: [
      '10,000+ new garment additions per day',
      'Sub-$10 price points indicating suppressed labor compensation',
      'Extensive use of virgin petroleum polyester',
      'Disposable garment culture encouragement'
    ]
  },

  patagonia: {
    brandName: 'Patagonia',
    targetType: 'brand',
    tagline: 'Certified B-Corp & Regenerative Outdoor Leader',
    foundedYear: '1973',
    headquarters: 'Ventura, California, USA',
    parentCompany: 'Patagonia Purpose Trust & Holdfast Collective',
    priceTier: '$$$',
    fashionPace: 'Mid-Range Fashion',
    score: 91,
    grade: 'A+',
    verdict: 'EXEMPLARY',
    oneLiner: 'The global benchmark for textile durability, regenerative raw materials, and corporate purpose ownership.',
    summary: 'Patagonia has systematically restructured its legal ownership so that 100% of non-reinvested profits fund environmental conservation. It leads the industry in supply chain transparency, post-consumer circularity with Worn Wear, and radical supply chain auditing.',
    materials: {
      breakdown: [
        { fiber: 'Recycled Polyester & Nylon', percentageEstimate: '88% of synthetics', sustainabilityLevel: 'Good', notes: 'Post-consumer plastic bottles and discarded fishing nets (NetPlus®).' },
        { fiber: 'Regenerative Organic Certified™ Cotton', percentageEstimate: '100% of virgin cotton', sustainabilityLevel: 'Excellent', notes: 'Grown to restore topsoil biology and absorb carbon.' },
        { fiber: 'Responsibly Sourced Down & Wool', percentageEstimate: '100% certified', sustainabilityLevel: 'Excellent', notes: 'Advanced Global Traceable Down & Responsible Wool Standard (RWS).' },
        { fiber: 'Hemp & TENCEL™ Lyocell', percentageEstimate: 'Select lines', sustainabilityLevel: 'Excellent', notes: 'Low water requirement, non-toxic closed loop processing.' }
      ],
      virginSyntheticsShare: 'Under 12% across total product portfolio',
      durabilityScore: 94,
      lifespanEstimate: 'Designed for 10+ to 25+ years of active technical wear; backed by lifetime repair policy.',
      microplasticRisk: 'Moderate',
      repairability: 'Industry-leading: Worn Wear operates North Americas largest garment repair facility and distributes DIY repair kits.',
      highlights: [
        'Ironclad Lifetime Guarantee covering repair or replacement',
        'NetPlus® material repurposes over 1,000 tons of discarded marine nets',
        'Pioneer of Regenerative Organic Certified (ROC™) agricultural standards'
      ]
    },
    laborEthics: {
      score: 87,
      livingWageStatus: 'Partial Progress',
      transparencyLevel: 'Deep Multi-Tier Traceability',
      auditFrequency: 'Rigorous Fair Labor Association (FLA) accreditation and announced/unannounced multi-tier audits',
      controversies: [
        'Documented historical challenges ensuring living wages at contract sewing tier in Southeast Asia, though actively paying Fair Trade premiums'
      ],
      humanRightsDetails: 'Over 85% of Patagonia line is Fair Trade Certified™ sewn, meaning factory workers directly vote on and receive cash premiums. Complete factory locations, mill partners, and farm origins are published openly on The Footprint Chronicles.'
    },
    environmentalImpact: {
      score: 93,
      carbonFootprint: 'Committed to Net Zero emissions by 2040; self-imposes 1% Earth Tax on gross revenue since 1985 ($140M+ donated)',
      waterAndChemicals: 'Over 90% of fabrics are Bluesign® approved, eliminating toxic dyes and hazardous chemicals',
      hazardousChemicalCommitment: 'PFC/PFAS-free DWR finishes transitioned across outerwear',
      packagingFootprint: '100% recycled paper packaging and roll-packing to eliminate polybags where possible',
      highlights: [
        'Pivoted to 100% PFC/PFAS-free durable water repellent technologies',
        'Holdfast Collective channels ~100 million annually into climate activism',
        'Robust buy-back trade-in system giving older gear second and third lives'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'Low / Genuine',
      unverifiedClaims: [],
      verifiedCertifications: [
        'Certified B Corporation (Score: 151.4)',
        'Fair Trade Certified™',
        'Regenerative Organic Certified (ROC™)',
        'Bluesign® Certified System Partner',
        'Responsible Down Standard (RDS)',
        '1% for the Planet Founding Member'
      ],
      realityVersusMarketing: 'Patagonia famously ran the "Dont Buy This Jacket" campaign urging consumers to repair rather than repurchase. Their commercial policies genuinely align with durability over volume.'
    },
    ethicalAlternatives: [
      {
        name: 'Finisterre',
        aestheticMatch: 'Cold-water maritime outdoor outerwear',
        whyBetter: 'B-Corp certified, circular wetsuit recycling, microplastic reduction research.',
        priceTier: '$$$',
        highlightCertification: 'Certified B Corp'
      },
      {
        name: 'Houdini Sportswear',
        aestheticMatch: 'Minimalist Scandinavian technical gear',
        whyBetter: '100% circular design, rental service, fully compostable and recyclable apparel.',
        priceTier: '$$$',
        highlightCertification: 'Bluesign Partner & Circular Design'
      }
    ],
    fastFashionFlags: []
  },

  zara: {
    brandName: 'Zara',
    targetType: 'brand',
    tagline: 'High-Street Trend Pioneer',
    foundedYear: '1975',
    headquarters: 'Arteixo, Galicia, Spain',
    parentCompany: 'Inditex S.A.',
    priceTier: '$$',
    fashionPace: 'Fast Fashion',
    score: 42,
    grade: 'D',
    verdict: 'EXTREME CAUTION',
    oneLiner: 'Rapid two-week trend cycles generating massive inventory volumes with mixed material durability.',
    summary: 'Zara pioneered the fast-fashion speed model, turning sketches into global retail inventory in under 15 days. While parent Inditex has published commendable 2030 decarbonization and raw material targets under "Join Life", the underlying high-frequency consumption engine remains at odds with sustainability.',
    materials: {
      breakdown: [
        { fiber: 'Virgin & Blended Polyester', percentageEstimate: '45-50%', sustainabilityLevel: 'Poor', notes: 'Substantial use of synthetic blends that prevent mechanical recycling.' },
        { fiber: 'Cotton (Conventional & BCI)', percentageEstimate: '35%', sustainabilityLevel: 'Moderate', notes: 'Heavy reliance on Better Cotton Initiative rather than verified organic.' },
        { fiber: 'Viscose & Lyocell', percentageEstimate: '10-12%', sustainabilityLevel: 'Moderate', notes: 'Committed to CanopyStyle green shirt audit sourcing.' },
        { fiber: 'Wool / Linen / Silk', percentageEstimate: '3-5%', sustainabilityLevel: 'Moderate', notes: 'Restricted mostly to premium capsule collections.' }
      ],
      virginSyntheticsShare: 'Approx 48% Synthetics',
      durabilityScore: 46,
      lifespanEstimate: 'Average 1 to 2 seasons. Seam construction and synthetic lining degrade with frequent washing.',
      microplasticRisk: 'High',
      repairability: 'Rolled out Zara Pre-Owned repair service in select European/UK markets, but uptake is low compared to sales volume.',
      highlights: [
        '500+ new designs released per week across international stores',
        'Complex fiber blends (poly-cotton-elastane) make end-of-life recycling nearly impossible',
        'Increasing use of NextGen textile tech (e.g. Circulose) but currently at pilot scale'
      ]
    },
    laborEthics: {
      score: 48,
      livingWageStatus: 'Unverified / Likely Below Living Wage',
      transparencyLevel: 'Tier 1 Only',
      auditFrequency: 'Over 10,000 Inditex supplier audits yearly, with remediation agreements',
      controversies: [
        'Global union agreements exist through IndustriALL, but living wage gap remains unclosed in Bangladesh and Turkey suppliers',
        'Subcontracting leaks in Southern European and South Asian assembly facilities'
      ],
      humanRightsDetails: 'Inditex publishes lists of tier-1 manufacturing clusters and holds an international framework agreement with IndustriALL Global Union, putting it ahead of ultra-fast brands, yet direct verification of living wage payouts across third-party mills is lacking.'
    },
    environmentalImpact: {
      score: 44,
      carbonFootprint: 'High operational footprint across 5,800+ stores and just-in-time global logistics',
      waterAndChemicals: 'Active member of ZDHC; pledged zero discharge of hazardous chemicals',
      hazardousChemicalCommitment: 'Inditex "Clear to Wear" product safety standard',
      packagingFootprint: 'Transitioning to 100% recycled paper bags and hangers in stores',
      highlights: [
        'Nearshoring 50% of production to Spain, Portugal, Morocco and Turkey reduces long-haul shipping emissions',
        'Overproduction volume remains the root environmental issue'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'Moderate',
      unverifiedClaims: [
        'Inditex "Join Life" labeling was criticized for setting low baseline thresholds and has been phased down in favor of broader percentages',
        'Highlighting capsule collections made of circular fibers while core product lines remain virgin synthetics'
      ],
      verifiedCertifications: [
        'Better Cotton Initiative (BCI)',
        'CanopyStyle Audit',
        'ZDHC Contributor'
      ],
      realityVersusMarketing: 'Aesthetic editorial campaigns give the illusion of quiet luxury, but underlying garment turnover is industrial fast fashion.'
    },
    ethicalAlternatives: [
      {
        name: 'Sézane',
        aestheticMatch: 'Chic European tailoring and knitwear',
        whyBetter: 'B-Corp certified, 85% eco-certified materials, small batch production.',
        priceTier: '$$$',
        highlightCertification: 'Certified B Corp'
      },
      {
        name: 'Reformation',
        aestheticMatch: 'Trendy statement dresses and eveningwear',
        whyBetter: 'Publishes RefScale carbon & water footprint for every item; Climate Neutral certified.',
        priceTier: '$$$',
        highlightCertification: 'Climate Neutral & FSC Certified'
      },
      {
        name: 'Kotn',
        aestheticMatch: 'Refined modern essentials',
        whyBetter: 'Direct farm-to-hanger Egyptian cotton, B-Corp certified, builds local schools in farming communities.',
        priceTier: '$$',
        highlightCertification: 'Certified B Corp & Direct Trade'
      }
    ],
    fastFashionFlags: [
      'Two-week runway-to-shelf design cycles',
      'Over 450 million garments manufactured annually',
      'High synthetic blend ratio hindering textile recycling'
    ]
  },

  levis: {
    brandName: "Levi's",
    targetType: 'brand',
    tagline: 'Heritage Denim & Water<Less™ Pioneer',
    foundedYear: '1853',
    headquarters: 'San Francisco, California, USA',
    parentCompany: 'Levi Strauss & Co.',
    priceTier: '$$$',
    fashionPace: 'Mid-Range Fashion',
    score: 68,
    grade: 'B',
    verdict: 'RECOMMENDED',
    oneLiner: 'Durable construction and groundbreaking Water<Less denim technology, with ongoing supply chain challenges.',
    summary: "Levi's 501 jeans remain a hallmark of timeless, rugged durability that survives decades. The brand revolutionized commercial denim finishing with its open-source Water<Less™ techniques, saving billions of liters of water, while Levi's Tailor Shops promote denim repair.",
    materials: {
      breakdown: [
        { fiber: 'Cotton (Cottonized Hemp & Organic)', percentageEstimate: '85%', sustainabilityLevel: 'Good', notes: 'High cotton purity facilitates recycling; expanding cottonized hemp blends.' },
        { fiber: 'Elastane / Spandex (Stretch Denim)', percentageEstimate: '5-10%', sustainabilityLevel: 'Moderate', notes: 'Poly-stretch blends degrade circularity compared to 100% rigid cotton.' },
        { fiber: 'Recycled Denim / Circulose®', percentageEstimate: '5%', sustainabilityLevel: 'Good', notes: 'Pioneered circular 501 jeans made with organic cotton and Circulose pulp.' }
      ],
      virginSyntheticsShare: 'Under 10% in core heritage lines (higher in Levi Strauss Signature)',
      durabilityScore: 82,
      lifespanEstimate: '7 to 15+ years for rigid denim; 3 to 6 years for high-stretch women lines.',
      microplasticRisk: 'Low',
      repairability: 'Excellent for rigid denim: Levi’s Tailor Shops offer visible mending, sashiko patches, and hem customization.',
      highlights: [
        'Rigid 100% cotton denim is naturally biodegradable and highly durable',
        'Levi’s SecondHand program resells pre-loved vintage denim',
        'Open-sourced over 20 water-saving techniques to the broader apparel industry'
      ]
    },
    laborEthics: {
      score: 64,
      livingWageStatus: 'Partial Progress',
      transparencyLevel: 'Deep Multi-Tier Traceability',
      auditFrequency: 'Regular supplier assessments under Worker Well-being (WWB) initiative',
      controversies: [
        'Worker rights advocacy groups note gap between legal minimum wage in Bangladesh/Pakistan suppliers and true family living wage',
        'Signed the International Accord for Health and Safety in the Textile and Garment Industry'
      ],
      humanRightsDetails: 'Levi Strauss established the apparel industry first supplier code of conduct (Terms of Engagement) in 1991. The Worker Well-being initiative invests directly in factory health and financial education programs.'
    },
    environmentalImpact: {
      score: 72,
      carbonFootprint: 'Science Based Targets initiative (SBTi) approved: 90% reduction in Scope 1 & 2 emissions by 2025',
      waterAndChemicals: 'Water<Less™ processes cut finishing water by up to 96% on key styles',
      hazardousChemicalCommitment: 'Active ZDHC leader and Screened Chemistry program',
      packagingFootprint: 'Transitioning to 100% sustainably sourced packaging and FSC paper tags',
      highlights: [
        'Saved over 4.2 billion liters of water since introducing Water<Less in 2011',
        'Zero discharge of hazardous chemicals across wet processing facilities'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'Low / Genuine',
      unverifiedClaims: [
        'Stretch blends labeled as eco-denim despite microplastic shedding and unrecyclable elastane core'
      ],
      verifiedCertifications: [
        'Better Cotton Initiative (BCI)',
        'ZDHC Pioneer Member',
        'Apparel Impact Institute Partner'
      ],
      realityVersusMarketing: "Levi's campaigns emphasizing 'Buy Better, Wear Longer' reflect authentic vintage durability in their heavyweight 100% cotton lines."
    },
    ethicalAlternatives: [
      {
        name: 'Nudie Jeans',
        aestheticMatch: 'Raw & selvedge denim',
        whyBetter: '100% organic cotton, free repairs for life at repair shops, complete living wage transparency.',
        priceTier: '$$$',
        highlightCertification: 'Fair Wear Leader & GOTS'
      },
      {
        name: 'Mud Jeans',
        aestheticMatch: 'Modern casual denim',
        whyBetter: 'Lease A Jeans circular model, 40% post-consumer recycled denim, carbon neutral.',
        priceTier: '$$$',
        highlightCertification: 'B Corp & Cradle to Cradle'
      }
    ],
    fastFashionFlags: [
      'Secondary diffusion lines sold at hypermarkets cut fabric weight and durability'
    ]
  },

  uniqlo: {
    brandName: 'Uniqlo',
    targetType: 'brand',
    tagline: 'LifeWear Essentials & Functional Synthetics',
    foundedYear: '1984',
    headquarters: 'Yamaguchi & Tokyo, Japan',
    parentCompany: 'Fast Retailing Co., Ltd.',
    priceTier: '$$',
    fashionPace: 'Fast Fashion',
    score: 54,
    grade: 'C',
    verdict: 'MODERATE',
    oneLiner: 'Timeless functional staples with high quality control, balanced by deep reliance on synthetic microfibers.',
    summary: "Uniqlo positions its 'LifeWear' philosophy as the antithesis of disposable fast fashion, prioritizing durable basics, heat retention (HEATTECH), and moisture wicking (AIRism). However, its staple high-tech items rely almost entirely on virgin petrochemical fibers.",
    materials: {
      breakdown: [
        { fiber: 'Polyester, Acrylic & Spandex (HEATTECH/AIRism)', percentageEstimate: '50-55%', sustainabilityLevel: 'Poor', notes: 'Proprietary synthetic microfibers prone to significant wash cycle shedding.' },
        { fiber: 'Conventional & Supima Cotton', percentageEstimate: '30%', sustainabilityLevel: 'Moderate', notes: 'High fiber staple length yields durable wear, though cotton traceability has faced scrutiny.' },
        { fiber: 'Merino Wool & Down', percentageEstimate: '10%', sustainabilityLevel: 'Good', notes: 'Responsible Down Standard certified and non-mulesed wool commitments.' },
        { fiber: 'Recycled Synthetics', percentageEstimate: '5-8%', sustainabilityLevel: 'Moderate', notes: 'Expanding recycled DRY-EX and fleece made from PET bottles.' }
      ],
      virginSyntheticsShare: 'Over 50% Synthetic Fibers',
      durabilityScore: 68,
      lifespanEstimate: '3 to 6+ years for jackets and outerwear; 1 to 2 years for daily HEATTECH baselayers.',
      microplasticRisk: 'Extreme',
      repairability: 'RE.UNIQLO repair studios in major flagship stores offering mending and upcycling.',
      highlights: [
        'Proprietary knitting produces resilient fabric that outlasts standard fast-fashion by years',
        'Microfiber shedding from fleece and thermal baselayers is a critical marine pollutant',
        'RE.UNIQLO initiative recycles collected down jackets into new garments'
      ]
    },
    laborEthics: {
      score: 52,
      livingWageStatus: 'Unverified / Likely Below Living Wage',
      transparencyLevel: 'Deep Multi-Tier Traceability',
      auditFrequency: 'Publishes core sewing factory and fabric mill list openly',
      controversies: [
        'US Customs blocked a shipment of Uniqlo cotton shirts in 2021 over raw cotton origin documentation requirements',
        'NGO Clean Clothes Campaign spotlighted unpaid worker severance in Jaba Garmindo supplier closure'
      ],
      humanRightsDetails: 'Fast Retailing publishes a full list of garment manufacturing factories and core fabric mills, scoring relatively well on public disclosure, but independent proof of living wages across Indonesian and Vietnamese suppliers is incomplete.'
    },
    environmentalImpact: {
      score: 50,
      carbonFootprint: 'Aiming for 90% reduction in greenhouse gas emissions from Fast Retailing stores by 2030',
      waterAndChemicals: 'BlueCycle denim laser finishing reduces wash water by up to 99%',
      hazardousChemicalCommitment: 'ZDHC Roadmap to Zero participant',
      packagingFootprint: 'Shifted shopping bags to FSC certified paper and reduced single-use plastic',
      highlights: [
        'BlueCycle denim technology drastically cuts water consumption',
        'High volume of microplastic shedding synthetics remains unmitigated'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'Moderate',
      unverifiedClaims: [
        'Branding HEATTECH as green innovation when it is petrochemical acrylic/polyester blend'
      ],
      verifiedCertifications: [
        'Responsible Down Standard (RDS)',
        'Better Cotton Initiative (BCI)',
        'ZDHC Contributor'
      ],
      realityVersusMarketing: "LifeWear garments genuinely feature higher construction standards than Shein or Zara, but mass-producing synthetic garments at global scale presents severe planetary drawbacks."
    },
    ethicalAlternatives: [
      {
        name: 'Colorful Standard',
        aestheticMatch: 'Vibrant basic tees, hoodies & merino wool',
        whyBetter: '100% organic cotton and recycled extra-fine merino wool, made ethically in Portugal.',
        priceTier: '$$',
        highlightCertification: 'Oeko-Tex & GOTS Certified'
      },
      {
        name: 'Organic Basics',
        aestheticMatch: 'High-tech baselayers, underwear & loungewear',
        whyBetter: 'TENCEL Lyocell, recycled nylon, GOTS organic cotton with transparent factory maps.',
        priceTier: '$$',
        highlightCertification: 'Certified B Corp'
      }
    ],
    fastFashionFlags: [
      'Mass production volume exceeding 1 billion garments annually',
      'High synthetic fiber saturation'
    ]
  },

  temu: {
    brandName: 'Temu',
    targetType: 'brand',
    tagline: 'Ultra-Discount Direct-From-Factory Platform',
    foundedYear: '2022',
    headquarters: 'Boston, USA & Dublin, Ireland',
    parentCompany: 'PDD Holdings Inc.',
    priceTier: '$',
    fashionPace: 'Ultra Fast Fashion',
    score: 8,
    grade: 'F',
    verdict: 'AVOID',
    oneLiner: 'Unregulated marketplace flooded with ultra-cheap, disposable synthetic apparel and opaque manufacturing chains.',
    summary: 'Temu connects consumers directly to unvetted Chinese third-party manufacturers, weaponizing deep discounts, gamified shopping algorithms, and customs exemptions (de minimis loop). Apparel sold on the platform exhibits near-zero accountability regarding chemical safety, labor standards, or material purity.',
    materials: {
      breakdown: [
        { fiber: 'Virgin Polyester, Nylon & PVC', percentageEstimate: '85-90%', sustainabilityLevel: 'Poor', notes: 'Lowest-grade synthetic filaments; rapid breakdown and pungent chemical odors reported.' },
        { fiber: 'Uncertified Cotton Blends', percentageEstimate: '10%', sustainabilityLevel: 'Poor', notes: 'Zero traceability to harvest region or pesticide usage.' },
        { fiber: 'Faux Leather / Polyurethane', percentageEstimate: '5%', sustainabilityLevel: 'Poor', notes: 'High likelihood of toxic phthalate plasticizers and non-biodegradable degradation.' }
      ],
      virginSyntheticsShare: 'Over 85% Virgin Synthetics',
      durabilityScore: 9,
      lifespanEstimate: 'Frequently discarded after 1 to 3 wears due to poor fit, ripped seams, or textile distortion in the wash.',
      microplasticRisk: 'Extreme',
      repairability: 'Economically and structurally non-repairable.',
      highlights: [
        'Chemical and heavy metal contamination documented in independent lab tests',
        'Misleading fiber content labeling (garments labeled cotton tested as 100% polyester)',
        'Extremely low tensile strength and flimsy seam allowances'
      ]
    },
    laborEthics: {
      score: 6,
      livingWageStatus: 'Documented Wage Violations',
      transparencyLevel: 'Opaque / Zero Traceability',
      auditFrequency: 'No published audit reports or verified supplier inspection logs',
      controversies: [
        'US Congressional Committee report identified an extremely high risk of forced labor in Temu supply chains',
        'Pressure on small suppliers with mandatory price reductions and merchant penalty fines',
        'Complete evasion of standard import labor compliance through de minimis parcel shipping'
      ],
      humanRightsDetails: 'Temu admits it does not conduct audits of third-party sellers on its marketplace, leaving human rights protections completely unenforced.'
    },
    environmentalImpact: {
      score: 9,
      carbonFootprint: 'Massive carbon intensity driven by air-shipping millions of individual packages daily around the globe',
      waterAndChemicals: 'Zero public environmental policies, wastewater standards, or chemical phase-outs',
      hazardousChemicalCommitment: 'None',
      packagingFootprint: 'Excessive plastic bubble wrap and synthetic tape wrapping',
      highlights: [
        'Exclusively relies on transatlantic air cargo, generating 50x more emissions than maritime shipping',
        'No recycling, take-back, or post-consumer circularity infrastructure whatsoever'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'High Risk',
      unverifiedClaims: [
        'Claims efficiency eliminates waste, whereas gamified impulse buying generates catastrophic household disposal'
      ],
      verifiedCertifications: [],
      realityVersusMarketing: 'Presents itself as a budget miracle while operating as an environmental and labor emergency.'
    },
    ethicalAlternatives: [
      {
        name: 'ThredUP & Goodwill Finds',
        aestheticMatch: 'Budget-friendly varied clothing',
        whyBetter: 'Real clothes at sub-$10 prices without fueling sweatshops or extracting new fossil fuels.',
        priceTier: '$',
        highlightCertification: 'Pre-Loved Secondhand'
      },
      {
        name: 'Pact',
        aestheticMatch: 'Affordable everyday essentials',
        whyBetter: 'GOTS certified organic cotton, Fair Trade certified factories, carbon-neutral shipping.',
        priceTier: '$$',
        highlightCertification: 'GOTS & Fair Trade Certified'
      }
    ],
    fastFashionFlags: [
      'Items sold for $1 to $4, defying sustainable manufacturing economics',
      'Opaque third-party supplier network with zero labor audits',
      'Mass individual air-freight parcel logistics'
    ]
  },

  hermes: {
    brandName: 'Hermès',
    targetType: 'brand',
    tagline: 'Historic Parisian Haute Maroquinerie & Extreme Luxury Maison',
    foundedYear: '1837',
    headquarters: 'Paris, France',
    parentCompany: 'Hermès International S.A.',
    priceTier: '$$$$$',
    fashionPace: 'Ultra / Extreme Luxury Fashion',
    score: 38,
    grade: 'D',
    verdict: 'EXTREME CAUTION',
    oneLiner: 'Unrivaled artisanal longevity and lifetime repairability juxtaposed against opaque exotic leather supply chains and resistance to independent audits.',
    summary: 'Hermès represents the pinnacle of extreme luxury craftsmanship: iconic goods like the Birkin and Kelly bags are hand-stitched by single artisans in France using generational saddle-stitch techniques designed to last decades. However, independent watchdog assessments (Good On You, Remake) penalize Hermès heavily for ethical vulnerabilities: intensive captive farming of exotic reptiles (crocodiles, lizards), lack of public living wage verification across upstream ranches and tanneries, and absence of validated Science Based Targets (SBTi) for Scope 3 emissions.',
    materials: {
      breakdown: [
        { fiber: 'Full-Grain Box Calfskin & Taurillon Clemence', percentageEstimate: '55%', sustainabilityLevel: 'Good', notes: 'Biodegradable, exceptionally thick full-grain leather engineered for decades of structural integrity.' },
        { fiber: 'Mulberry Silk Twill', percentageEstimate: '20%', sustainabilityLevel: 'Good', notes: 'Woven for iconic silk carrés; hand-rolled edges sewn by specialized artisans.' },
        { fiber: 'Cashmere & Virgin Wool', percentageEstimate: '15%', sustainabilityLevel: 'Good', notes: 'High staple length natural animal fibers from certified European and Mongolian suppliers.' },
        { fiber: 'Exotic Crocodile, Alligator & Lizard Skins', percentageEstimate: '5-10%', sustainabilityLevel: 'Poor', notes: 'Captive exotic farming heavily criticized by animal rights watchdogs and biodiversity researchers.' }
      ],
      virginSyntheticsShare: 'Under 3% across entire product portfolio',
      durabilityScore: 98,
      lifespanEstimate: '30 to 80+ years. Genuine heirloom artifacts passed down across generations with remarkable secondary market value retention.',
      microplasticRisk: 'Low',
      repairability: 'Exceptional: In-house Parisian and global restoration ateliers offer full lifetime mending, re-stitching, leather conditioning, and hardware replating.',
      highlights: [
        'Traditional two-needle saddle-stitch technique will not unravel even if an individual stitch breaks',
        'Virtually zero fossil-fuel synthetic fiber dependency across leather goods and silk scarves',
        'École Hermès des savoir-faire maintains centuries-old European artisanal leather-crafting heritage'
      ]
    },
    laborEthics: {
      score: 48,
      livingWageStatus: 'Partial Progress',
      transparencyLevel: 'Tier 1 Only',
      auditFrequency: 'Internal audits across French leather ateliers; negligible third-party disclosure for upstream farms',
      controversies: [
        'Undercover investigations by PETA and wildlife protection groups documenting intensive farming conditions in Australian crocodile facilities supplying Hermès tanneries',
        'Consistent refusal to disclose Tier-2 to Tier-4 supply chain facilities in public registries, scoring under 30% on the Fashion Transparency Index'
      ],
      humanRightsDetails: 'In-house French leather artisans enjoy high unionized compensation, comprehensive healthcare, and ergonomic ateliers. However, Hermès discloses almost no verifiable evidence of living wages or independent worker unionization across upstream agricultural ranches, exotic reptile farms, and contract tanneries.'
    },
    environmentalImpact: {
      score: 36,
      carbonFootprint: 'Substantial Scope 3 footprint linked to livestock rearing and energy-intensive chemical leather tanning',
      waterAndChemicals: 'High water usage and chromium tanning compounds in conventional hide processing',
      hazardousChemicalCommitment: 'Strict adherence to European REACH regulations, but lacks ZDHC Level 3 wastewater roadmaps',
      packagingFootprint: 'Signature orange boxes made with FSC-certified recycled paper and non-toxic water-based inks',
      highlights: [
        'Extremely low unit production volumes compared to mass-market retailers prevent aggregate landfill waste',
        'High per-unit ecological and animal welfare footprint for exotic reptile skin sourcing'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'Moderate',
      unverifiedClaims: [
        'Marketing leans on timeless craftsmanship to deflect public scrutiny from Scope 3 agricultural emissions and exotic skin procurement'
      ],
      verifiedCertifications: [
        'Leather Working Group (LWG) Tannery Audits (Partial)',
        'FSC Certified Packaging'
      ],
      realityVersusMarketing: 'Hermès is the antithesis of fast fashion in terms of physical durability and timelessness, but its extreme luxury heritage storytelling obscures systemic gaps in biodiversity protection and upstream traceability.'
    },
    ethicalAlternatives: [
      {
        name: 'Savette',
        aestheticMatch: 'Minimalist luxury leather handbags',
        whyBetter: 'Handcrafted in third-generation Italian family workshops using traceable calfskin with zero exotic skins.',
        priceTier: '$$$$',
        highlightCertification: 'Small-Batch Italian Craft'
      },
      {
        name: 'Stella McCartney',
        aestheticMatch: 'High-fashion designer tailoring and luxury bags',
        whyBetter: 'Pioneer of luxury circularity, 100% vegetarian, bio-based vegan leather, and transparent SBTi emissions roadmap.',
        priceTier: '$$$$',
        highlightCertification: 'Cruelty-Free & Circular Luxury'
      },
      {
        name: 'Elvis & Kresse',
        aestheticMatch: 'Durable luxury leather and canvas accessories',
        whyBetter: 'Certified B-Corp reclaiming decommissioned British firehoses and Burberry leather offcuts into lifetime-guaranteed goods.',
        priceTier: '$$$',
        highlightCertification: 'Certified B Corp & Circular Design'
      }
    ],
    fastFashionFlags: [],
    redFlags: [
      'Intensive captive farming of exotic reptiles (crocodiles, lizards) for luxury leather goods',
      'Opaque upstream supply chain (Tier 2-4 farms, ranches, and raw tanneries undisclosed)',
      'Low Fashion Transparency Index score (consistently under 30% disclosure)',
      'Absence of verified Science Based Targets initiative (SBTi) 1.5°C climate roadmap',
      'Heavy water and chemical footprint associated with conventional leather tanning'
    ],
    positiveSteps: [
      'Generational heirloom durability backed by global Hermès repair and restoration ateliers',
      'In-house French leather artisans receive rigorous multi-year training and high unionized wages',
      'Anti-disposable business model: limited production batches with remarkable resale value retention',
      'Primary reliance on biodegradable, premium natural fibers (calfskin, mulberry silk, cashmere)'
    ]
  },

  lululemon: {
    brandName: 'Lululemon',
    targetType: 'brand',
    tagline: 'Technical Athleisure & Functional Innovation Brand',
    foundedYear: '1998',
    headquarters: 'Vancouver, British Columbia, Canada',
    parentCompany: 'Lululemon Athletica Inc.',
    priceTier: '$$$',
    fashionPace: 'Mid-Range Fashion',
    score: 46,
    grade: 'D',
    verdict: 'EXTREME CAUTION',
    oneLiner: 'Beloved high-performance activewear undermined by heavy fossil-fuel synthetic reliance and rising Scope 3 emissions.',
    summary: 'Lululemon pioneered modern athleisure with proprietary technical fabrics like Luon and Nulu. While the brand demonstrates progress in Tier-1 factory disclosure and circular resale ("Like New"), its core business model remains heavily anchored in virgin petroleum-derived synthetics that shed microplastics. Stand.earth and other environmental watchdogs have heavily criticized Lululemon for expanding coal-powered manufacturing in Vietnam and Cambodia while marketing an eco-wellness ethos.',
    materials: {
      breakdown: [
        { fiber: 'Virgin Nylon (Polyamide) & Elastane (Lycra®)', percentageEstimate: '65%', sustainabilityLevel: 'Poor', notes: 'Fossil-fuel derived petrochemical fibers powering signature buttery-soft leggings.' },
        { fiber: 'Polyester (Virgin & Recycled)', percentageEstimate: '20%', sustainabilityLevel: 'Moderate', notes: 'Transitioning select lines to recycled polyester, but microfiber wash shedding remains high.' },
        { fiber: 'Cotton (Pima & Conventional)', percentageEstimate: '10%', sustainabilityLevel: 'Moderate', notes: 'Used in hoodies and casual tees; sourcing mix of BCI and organic cotton.' },
        { fiber: 'Bio-based Synthetics (Genomatica)', percentageEstimate: '<1%', sustainabilityLevel: 'Good', notes: 'Piloting plant-based nylon alternatives at research scale.' }
      ],
      virginSyntheticsShare: 'Over 75% Synthetic Fibers',
      durabilityScore: 72,
      lifespanEstimate: '3 to 6 years with proper athletic care (gentle cycle, cold water, line dry).',
      microplasticRisk: 'Extreme',
      repairability: 'Select flagship stores offer complimentary hemming and seam repair, alongside the Lululemon Like New trade-in resale program.',
      highlights: [
        'Proprietary knitting delivers resilient 4-way stretch and shape retention across hundreds of wears',
        'Leggings shed tens of thousands of synthetic microfibers per laundry wash cycle',
        'Lululemon Like New circular program extends garment lifecycle via trade-ins'
      ]
    },
    laborEthics: {
      score: 52,
      livingWageStatus: 'Unverified / Likely Below Living Wage',
      transparencyLevel: 'Deep Multi-Tier Traceability',
      auditFrequency: 'Regular third-party SMETA and FLA audits across finished goods facilities',
      controversies: [
        'Stand.earth international campaign targeting Lululemon for coal-powered fabric mills and wet processing in Asia',
        'Worker rights advocacy groups highlight absence of verified living wages in Vietnamese and Cambodian contract factories'
      ],
      humanRightsDetails: 'Lululemon publishes an open map of Tier-1 manufacturing facilities and key fabric mills, scoring above average on transparency. However, independent proof of living wages (above statutory minimums) across outsourced Southeast Asian sewing floors remains unverified.'
    },
    environmentalImpact: {
      score: 41,
      carbonFootprint: 'Total greenhouse gas emissions increased due to rapid revenue expansion (Power of Three x2 strategy)',
      waterAndChemicals: 'Partners with bluesign® and OEKO-TEX® to audit restricted substances in technical fabrics',
      hazardousChemicalCommitment: 'Committed to zero discharge of hazardous chemicals (ZDHC) Roadmap to Zero',
      packagingFootprint: 'Redesigned reusable shopper totes; expanding recycled polybags for shipping',
      highlights: [
        'Pledged to achieve 100% renewable electricity in owned facilities, but Scope 3 mill decarbonization lags',
        'Investing in enzyme-based textile recycling startups to address elastane separation challenges'
      ]
    },
    greenwashingCheck: {
      greenwashingRisk: 'High Risk',
      unverifiedClaims: [
        'The "Be Planet" advertising campaign was formally investigated by the Canadian Competition Bureau for alleged deceptive marketing regarding carbon increases',
        'Marketing emphasis on wellness and mindfulness conflicts with reliance on coal-fired manufacturing grids'
      ],
      verifiedCertifications: [
        'bluesign® System Partner (Select fabrics)',
        'OEKO-TEX® Standard 100',
        'Fair Labor Association (FLA) Accredited'
      ],
      realityVersusMarketing: 'Active marketing portrays planetary harmony, while rapid corporate growth has driven absolute greenhouse gas emissions upward.'
    },
    ethicalAlternatives: [
      {
        name: 'Girlfriend Collective',
        aestheticMatch: 'Vibrant compressive leggings and activewear',
        whyBetter: 'Certified circular closed-loop recycling (ReGirlfriend), recycled water bottles, SA8000 fair wage certified.',
        priceTier: '$$',
        highlightCertification: 'SA8000 & OEKO-TEX Standard 100'
      },
      {
        name: 'Boody',
        aestheticMatch: 'Soft breathable bamboo athletic basics',
        whyBetter: 'FSC-certified organically grown bamboo, closed-loop processing, B-Corp certified.',
        priceTier: '$$',
        highlightCertification: 'Certified B Corp & PETA Vegan'
      },
      {
        name: 'Patagonia Active',
        aestheticMatch: 'Technical running and yoga apparel',
        whyBetter: 'Fair Trade Certified™ sewn, NetPlus® recycled ocean fishing nets, 1% for the Planet.',
        priceTier: '$$$',
        highlightCertification: 'Fair Trade Certified & B Corp'
      }
    ],
    fastFashionFlags: [
      'Rapid weekly product drops and seasonal color iterations designed to stimulate repeat buying',
      'Over 75% petroleum-derived synthetic fibers driving microplastic pollution'
    ],
    redFlags: [
      'High reliance on virgin petroleum synthetics (nylon, elastane) causing severe microplastic shedding',
      'Scope 3 supply chain greenhouse gas emissions rising alongside aggressive corporate expansion',
      'Canadian Competition Bureau investigation into "Be Planet" environmental claims',
      'Fabric mills in Southeast Asia heavily dependent on coal-fired power grids'
    ],
    positiveSteps: [
      'Public disclosure of Tier-1 manufacturing factories and primary fabric mills',
      'Active "Lululemon Like New" circular resale and garment trade-in program',
      'Complimentary garment hemming and minor seam mending at retail store locations',
      'bluesign® and OEKO-TEX® certifications for chemical and dye safety across select technical fabrics'
    ]
  }
};

