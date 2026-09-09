export type SearchMode = 'brand' | 'product' | 'link' | 'screenshot';

export interface MaterialBreakdownItem {
  fiber: string;
  percentageEstimate: string;
  sustainabilityLevel: 'Poor' | 'Moderate' | 'Good' | 'Excellent';
  notes: string;
  usageDetails?: string; // How the brand or product specifically uses this material
  sourcingOrigin?: string; // Where the material is sourced from (regions, farms, mills, traceability)
  sustainabilityScore?: number; // Material sustainability score out of 10
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
    priceTier: '$' | '$$' | '$$$' | '$$$$' | '$$$$$';
    highlightCertification: string;
    score?: number;
  }>;
  fastFashionFlags: string[];
  priceTier?: '$' | '$$' | '$$$' | '$$$$' | '$$$$$';
  fashionPace?:
    | 'Ultra Fast Fashion'
    | 'Fast Fashion'
    | 'Mid-Range Fashion'
    | 'Luxury Fashion'
    | 'Ultra / Extreme Luxury Fashion'
    | string;
  redFlags?: string[];
  positiveSteps?: string[];
  uploadedImagePreview?: string;
  identifiedProduct?: string;
}

export type ReactionType = 'heart' | 'insight' | 'eco' | 'alert' | 'applause';

export interface UserSession {
  id?: string;
  email: string;
  name: string;
  role: 'core_editor' | 'community_member';
  isCoreTeam: boolean;
  avatarColor?: string;
  avatarUrl?: string;
  provider?: 'google' | 'email';
  createdAt?: string;
  lastLoginAt?: string;
  loginCount?: number;
}

export interface DatabaseUserRecord {
  id: string;
  email: string;
  name: string;
  role: 'core_editor' | 'community_member';
  isCoreTeam: boolean;
  avatarColor?: string;
  avatarUrl?: string;
  provider: 'google' | 'email';
  createdAt: string;
  lastLoginAt: string;
  loginCount: number;
}

export interface DraftPost {
  id: string;
  authorEmail: string;
  authorName: string;
  title: string;
  subtitle?: string;
  category: string;
  brandTag?: string;
  verdictBadge?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  durabilityScore?: number;
  tags?: string[];
  isEditorial: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLogRecord {
  id: string;
  timestamp: string;
  action: 'LOGIN' | 'CREATE_POST' | 'EDIT_POST' | 'PUBLISH_POST' | 'DELETE_POST' | 'SAVE_DRAFT' | 'DELETE_DRAFT' | 'ADD_COMMENT' | 'REACT';
  userId?: string;
  userName: string;
  userEmail: string;
  isCoreTeam: boolean;
  provider?: string;
  targetId?: string;
  targetTitle?: string;
  description: string;
  details?: Record<string, any>;
}

export interface ManagerAnalyticsSummary {
  totalUsers: number;
  totalEditorialDeskUsers: number;
  totalCommunityUsers: number;
  totalLogins: number;
  totalDrafts: number;
  totalActivityLogs: number;
  recentLoginsCount24h: number;
  providerBreakdown: {
    google: number;
    email: number;
  };
}

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  isCoreTeam: boolean;
  content: string;
  timestamp: string;
  parentId?: string; // If replying to another comment
  replyToAuthor?: string;
  reactions?: Record<string, number>;
}

export interface BlogPost {
  id: string;
  type: 'editorial' | 'community';
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorEmail: string;
  isCoreTeam: boolean;
  isVerifiedAuthor?: boolean;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  brandMentioned?: string;
  durabilityScore?: number; // 1-10 for personal experiences
  reactions: {
    heart: number;
    insight: number;
    eco: number;
    alert: number;
    applause: number;
  };
  userReactions?: Record<string, ReactionType[]>; // user email -> reactions given
  commentsCount?: number;
}
