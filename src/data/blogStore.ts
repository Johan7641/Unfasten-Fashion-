import {
  BlogPost,
  BlogComment,
  UserSession,
  ReactionType,
  DatabaseUserRecord,
  DraftPost,
  ActivityLogRecord,
  ManagerAnalyticsSummary,
} from '../types';

export const CORE_EDITORIAL_EMAILS = [
  '7641@gsis.ac.in',
  '8254@gsis.ac.in',
  '8524@gsis.ac.in',
] as const;

export const CURATED_COVER_IMAGES = [
  {
    id: 'textile-fibers',
    label: 'Synthetic Yarn & Microfiber Spools',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'garment-factory',
    label: 'Apparel Factory & Sewing Floor',
    url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'care-label',
    label: 'Clothing Care Tag & Fabric Blend',
    url: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wool-texture',
    label: 'Heritage Wool & Natural Fiber Knit',
    url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wardrobe-rack',
    label: 'Minimalist Wardrobe & Thrift Rack',
    url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'weaving-loom',
    label: 'Traditional Loom & Linen Weave',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
  },
];

export const isCoreEditorialEmail = (email: string): boolean => {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return CORE_EDITORIAL_EMAILS.some((coreEmail) => coreEmail.toLowerCase() === clean);
};

export const INITIAL_EDITORIAL_POSTS: BlogPost[] = [
  {
    id: 'editorial-1',
    type: 'editorial',
    title: 'The Petrochemical Wardrobe: Why 69% of Ultra-Fast Fashion is Literally Fossil Fuel',
    subtitle: 'An investigative teardown of synthetic fiber dependency and the hidden polymer supply chain.',
    excerpt:
      'Our lab teardowns of 450 apparel items reveal that modern ultra-fast fashion retailers produce garments that are chemically closer to plastic bottles than traditional textiles.',
    content: `For decades, clothing was predominantly woven from plant fibers and animal hair—cellulose, linen, wool, and silk. Today, the global apparel industry consumes more than 70 million barrels of crude oil every single year simply to synthesize virgin polyester, elastane, nylon, and acrylic.

### The Virgin Polymer Lock-In
When an ultra-fast fashion retailer drops 8,000 new styles per day, natural fiber agricultural cycles cannot keep pace. Cotton takes months to grow, irrigate, and harvest. Polyester, by contrast, is continuously extruded in chemical plants near coastal oil refineries at fractions of a cent per yard.

In our mechanical teardown tests of 450 garments purchased anonymously across leading discount portals:
- Over 68.7% of items contained at least 80% virgin polyester.
- 92% of the care labels advertised as "conscious" or "recycled" contained less than 15% certified post-consumer rPET.
- Mechanical rub and wash tests revealed that the majority shed over 700,000 microplastic filaments per initial domestic laundry cycle.

### The Real Cost of Disposable Polymer
Because polyester does not biodegrade, discarded garments sent to global secondary markets in Accra (Kantamanto) or the Atacama Desert remain intact for centuries, slowly breaking down into airborne microplastic dust that enters marine food chains.

True sustainability begins by challenging the volume of production and transitioning back to regenerative organic mono-fibers that can decompose or be mechanically recycled without toxic off-gassing.`,
    authorName: 'Core Editorial Desk',
    authorEmail: '7641@gsis.ac.in',
    isCoreTeam: true,
    date: 'September 5, 2026',
    readingTime: '5 min read',
    category: 'Material Investigation',
    coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Synthetics', 'Microplastics', 'Fossil Fuels', 'Polyester'],
    reactions: {
      heart: 38,
      insight: 24,
      eco: 41,
      alert: 19,
      applause: 15,
    },
    commentsCount: 3,
  },
  {
    id: 'editorial-2',
    type: 'editorial',
    title: 'Behind the Barcode: The Illusion of Voluntary Supply-Chain Audits in Southeast Asia',
    subtitle: 'Why corporate codes of conduct consistently fail to secure living wages on the factory floor.',
    excerpt:
      'We cross-referenced 12 major fashion conglomerates against verified Anker living wage benchmarks. The gap between statutory minimum wage and a dignified life remains staggering.',
    content: `When a multinational apparel brand faces scrutiny over garment worker exploitation, the standard public relations response is immediate: "We require all supplier factories to abide by our strict Supplier Code of Conduct."

Yet behind these voluntary codes lies a systemic audit industry designed more to shield brands from legal liability than to guarantee human dignity.

### The Statutory vs. Living Wage Divide
Across major manufacturing hubs in Dhaka, Phnom Penh, and Tirupur, statutory minimum wages set by local governments are routinely kept artificially low to attract foreign direct investment. In many regions, the legal minimum wage covers only 35% to 48% of the basic cost of nutritious food, clean shelter, and school fees calculated under the global Anker Methodology.

When brands claim their factories are "100% compliant with local labor laws," they are effectively admitting that workers are paid starvation wages legally.

### How Brands Shift Risk Downstream
1. **Unrealistic Lead Times:** Ultra-fast order turnaround cycles of 7 to 10 days force factory managers to demand mandatory unpaid overtime or subcontract work to informal, uninspected shadow workshops.
2. **Downward Price Pressure:** Brands demand lower cost-per-minute rates year over year, while simultaneously penalizing suppliers for delivery delays.
3. **Ghost Audits:** Pre-announced compliance checks allow facilities to falsify punch-cards and temporarily hide adolescent workers during auditor walk-throughs.

Our platform demands binding, enforceable agreements where fashion brands are legally held liable for living wage payments across all Tier 1 through Tier 4 facilities.`,
    authorName: 'Core Investigative Desk',
    authorEmail: '8524@gsis.ac.in',
    isCoreTeam: true,
    date: 'September 2, 2026',
    readingTime: '6 min read',
    category: 'Labor & Human Rights',
    coverImage: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=80',
    tags: ['Living Wage', 'Supply Chain', 'Worker Dignity', 'Transparency'],
    reactions: {
      heart: 52,
      insight: 31,
      eco: 18,
      alert: 44,
      applause: 27,
    },
    commentsCount: 2,
  },
  {
    id: 'editorial-3',
    type: 'editorial',
    title: 'The Greenwashing Radar: Decoding 7 Deceptive Eco-Labels on Modern Garments',
    subtitle: 'How marketing departments invent vague buzzwords to circumvent emerging consumer watchdog regulations.',
    excerpt:
      'From "Eco-Vero" blends to "Conscious Choice" tags, here is our forensic guide on how to spot greenwashing before you reach the checkout counter.',
    content: `With consumers increasingly demanding ethical apparel, fast fashion giants have pivoted heavily toward environmental marketing. However, without strict statutory definitions, deceptive terminology abounds.

### The Top 3 Red Flag Claims:
1. **"100% Recyclable" (When No Recycling Infrastructure Exists):**
A garment made of blended polyester and polyurethane may theoretically be recyclable in a laboratory autoclave, but virtually no municipal textile recycling program can handle it. Calling it recyclable is consumer deception.

2. **"Sustainably Sourced Viscose":**
Unless certified by FSC or CanopyStyle with complete supply-chain traceability, conventional viscose and rayon manufacturing routinely causes deforestation in ancient rainforests and relies on toxic carbon disulfide that endangers factory communities.

3. **"Carbon Neutral Collection":**
Purchasing dubious, unverified forestry carbon offsets while expanding net production volume by 20% annually is an accounting sleight-of-hand. Real environmental accountability requires direct emission abatement in supply-chain tier mills.

Always check for independent certifications with traceable transaction numbers, such as GOTS (Global Organic Textile Standard), OEKO-TEX Standard 100, and Fair Trade USA.`,
    authorName: 'Core Editorial Desk',
    authorEmail: '7641@gsis.ac.in',
    isCoreTeam: true,
    date: 'August 28, 2026',
    readingTime: '4 min read',
    category: 'Greenwashing Radar',
    coverImage: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=80',
    tags: ['Certifications', 'Greenwashing', 'Consumer Guide', 'Eco-Labels'],
    reactions: {
      heart: 29,
      insight: 45,
      eco: 36,
      alert: 14,
      applause: 22,
    },
    commentsCount: 1,
  },
];

export const INITIAL_COMMUNITY_POSTS: BlogPost[] = [
  {
    id: 'community-1',
    type: 'community',
    title: 'Why I stopped shopping at ultra-fast fashion haul sites after checking their fabric tags',
    subtitle: 'A 6-month wardrobe challenge that transformed how I view garment longevity.',
    excerpt:
      'I used to order $10 tops every month. When I started examining the stitching, seam allowances, and polyester smell, everything clicked.',
    content: `Like a lot of students, I was caught in the cycle of buying cheap clothes for weekend outings and throwing them to the back of my closet once they lost their shape in the wash. 

Last year, I decided to inspect the care labels of my 25 favorite tops. Every single one was 100% polyester or 95% acrylic. The seams were unraveling after only 3 gentle washes, and the collars were pilling. 

I set a rule for myself: buy only secondhand garments made from natural fibers (wool, linen, 100% cotton) or support slow-fashion makers who disclose their factory locations. My wardrobe has shrunk by 60%, but every piece looks timeless, breathes naturally, and has survived over 40 washes without a single thread coming loose.`,
    authorName: 'Maya Thorne',
    authorEmail: 'maya.slowwardrobe@gmail.com',
    isCoreTeam: false,
    date: 'September 4, 2026',
    readingTime: '3 min read',
    category: 'Consumer Experience',
    coverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Wardrobe Audit', 'Thrifting', 'Natural Fibers'],
    brandMentioned: 'Shein / Zara',
    durabilityScore: 3,
    reactions: {
      heart: 41,
      insight: 18,
      eco: 39,
      alert: 5,
      applause: 31,
    },
    commentsCount: 2,
  },
  {
    id: 'community-2',
    type: 'community',
    title: 'Found a 1994 Made in Scotland Shetland wool sweater: The tactile difference is shocking',
    subtitle: 'Comparing 30-year-old knitwear craftsmanship against modern department store acrylic sweaters.',
    excerpt:
      'Holding this vintage piece next to a $75 mall sweater opened my eyes to how drastically textile density has been downgraded.',
    content: `Last weekend I found a 1994 vintage Shetland wool sweater at an estate sale for $18. The gauge of the yarn, the hand-linked collar, and the density of the wool are completely incomparable to anything sold in modern malls today.

Modern fast-fashion brands blend 80% acrylic with 20% recycled wool, resulting in a sweater that feels soft on the hanger but turns into static fuzz within 2 weeks. Pure, unblended Shetland wool repels light rain, keeps you warm even when damp, and can be aired out overnight without needing constant washing.

Learning how to de-pill and mend natural knitwear is the best sustainable fashion skill anyone can learn!`,
    authorName: 'Julian Vance',
    authorEmail: 'julian.craft@outlook.com',
    isCoreTeam: false,
    date: 'August 31, 2026',
    readingTime: '3 min read',
    category: 'Mending & Longevity',
    coverImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vintage', 'Wool', 'Knitwear', 'Slow Fashion'],
    brandMentioned: 'Vintage Shetland Wool',
    durabilityScore: 10,
    reactions: {
      heart: 33,
      insight: 22,
      eco: 28,
      alert: 2,
      applause: 26,
    },
    commentsCount: 1,
  },
];

export const INITIAL_COMMENTS: BlogComment[] = [
  {
    id: 'comment-1',
    postId: 'editorial-1',
    authorName: 'Prof. David K.',
    authorEmail: 'david.textiles@oxford.edu',
    isCoreTeam: false,
    content:
      'Crucial investigation. The thermodynamic energy required to convert petroleum into polyester pellets is often excluded from brand lifecycle disclosures by categorizing it under raw material acquisition. Kudos to the Unfasten team.',
    timestamp: '2 days ago',
  },
  {
    id: 'comment-2',
    postId: 'editorial-1',
    authorName: 'Core Editorial Desk',
    authorEmail: '7641@gsis.ac.in',
    isCoreTeam: true,
    parentId: 'comment-1',
    replyToAuthor: 'Prof. David K.',
    content:
      'Thank you Professor! We are currently working on a laboratory follow-up tracking microfiber shedding rates under standard cold-water versus 40°C wash cycles to publish in our next weekly dispatch.',
    timestamp: '1 day ago',
  },
  {
    id: 'comment-3',
    postId: 'editorial-1',
    authorName: 'Sita Nair',
    authorEmail: 'sita.nair@ethicalconsumer.org',
    isCoreTeam: false,
    content:
      'The microplastic wash data is alarming. Have you tested if Guppyfriend wash bags actually reduce shedding for garments that consumers already own?',
    timestamp: '18 hours ago',
  },
  {
    id: 'comment-4',
    postId: 'editorial-2',
    authorName: 'Liam O’Connor',
    authorEmail: 'liam.fairwork@network.org',
    isCoreTeam: false,
    content:
      'The point about statutory minimum wage being used as an ethical shield is spot on. In Bangladesh, trade unions have been demanding at least 23,000 Taka as a baseline living wage while statutory rates linger far below.',
    timestamp: '3 days ago',
  },
  {
    id: 'comment-5',
    postId: 'editorial-2',
    authorName: 'Core Investigative Desk',
    authorEmail: '8524@gsis.ac.in',
    isCoreTeam: true,
    parentId: 'comment-4',
    replyToAuthor: 'Liam O’Connor',
    content:
      'Exactly Liam. We cross-reference every brand audit against the Asia Floor Wage and Anker benchmarks specifically because statutory wage baselines are systematically suppressed.',
    timestamp: '2 days ago',
  },
  {
    id: 'comment-6',
    postId: 'community-1',
    authorName: 'Klara B.',
    authorEmail: 'klara.berlin@gmail.com',
    isCoreTeam: false,
    content:
      'I had the exact same realization! Looking at the seam allowance inside garments is the biggest tell. Fast fashion seams are barely 3mm wide and overlocked with cheap thread.',
    timestamp: 'Yesterday',
  },
  {
    id: 'comment-7',
    postId: 'community-1',
    authorName: 'Maya Thorne',
    authorEmail: 'maya.slowwardrobe@gmail.com',
    isCoreTeam: false,
    parentId: 'comment-6',
    replyToAuthor: 'Klara B.',
    content:
      'Yes! And when they overlock with polyester monofilament, it scratches your skin as soon as the seam starts curling.',
    timestamp: '12 hours ago',
  },
];

// Helper to manage storage
const STORAGE_KEYS = {
  POSTS: 'unfasten_blog_posts_v2',
  COMMENTS: 'unfasten_blog_comments_v1',
  USER: 'unfasten_current_user_v1',
  SUBSCRIBERS: 'unfasten_newsletter_subscribers_v1',
  DRAFTS: 'unfasten_user_drafts_v1',
};

export const getStoredPosts = (): BlogPost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse stored posts', e);
  }
  const initial = [...INITIAL_EDITORIAL_POSTS, ...INITIAL_COMMUNITY_POSTS];
  saveStoredPosts(initial);
  return initial;
};

export const saveStoredPosts = (posts: BlogPost[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  } catch (e) {
    console.error('Failed to save posts', e);
  }
};

export const getStoredComments = (): BlogComment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse stored comments', e);
  }
  saveStoredComments(INITIAL_COMMENTS);
  return INITIAL_COMMENTS;
};

export const saveStoredComments = (comments: BlogComment[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  } catch (e) {
    console.error('Failed to save comments', e);
  }
};

export const getStoredUser = (): UserSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) {
      const user = JSON.parse(raw);
      // Synchronize with server database in background to keep metadata up to date
      if (user && user.email) {
        fetch(`/api/auth/user/${encodeURIComponent(user.email)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.user) {
              const merged: UserSession = {
                ...user,
                ...data.user,
                isCoreTeam: isCoreEditorialEmail(user.email) || data.user.isCoreTeam,
              };
              localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(merged));
            }
          })
          .catch(() => {
            // Offline or server unreachable fallback
          });
      }
      return user;
    }
  } catch (e) {
    console.error('Failed to load user', e);
  }
  return null;
};

export const persistUserToDatabase = async (
  sessionData: {
    email: string;
    name?: string;
    avatarColor?: string;
    avatarUrl?: string;
    provider?: 'google' | 'email';
    password?: string;
    mode?: 'signup' | 'signin';
  }
): Promise<{ user: UserSession; isNewUser: boolean; totalUsers: number }> => {
  const response = await fetch('/api/auth/register-or-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sessionData),
  });

  if (!response.ok) {
    let errorMsg = 'Authentication failed';
    try {
      const errData = await response.json();
      if (errData?.error) {
        errorMsg = errData.error;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  if (data.user) {
    return {
      user: data.user,
      isNewUser: Boolean(data.isNewUser),
      totalUsers: data.totalRegisteredUsers || 1,
    };
  }

  throw new Error('Invalid server authentication response');
};

export const fetchRegisteredUsers = async (managerEmail?: string): Promise<DatabaseUserRecord[]> => {
  try {
    const headers: Record<string, string> = {};
    if (managerEmail) {
      headers['x-manager-email'] = managerEmail;
    }
    const res = await fetch('/api/auth/users', { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.users)) {
        return data.users;
      }
    }
  } catch (err) {
    console.warn('Could not fetch registered users from database:', err);
  }
  return [];
};

export const fetchActivityLogs = async (managerEmail?: string): Promise<ActivityLogRecord[]> => {
  try {
    const headers: Record<string, string> = {};
    if (managerEmail) {
      headers['x-manager-email'] = managerEmail;
    }
    const res = await fetch('/api/activity/logs', { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.logs)) {
        return data.logs;
      }
    }
  } catch (err) {
    console.warn('Could not fetch activity logs from database:', err);
  }
  return [];
};

export const recordClientActivity = async (entry: {
  action: 'LOGIN' | 'CREATE_POST' | 'EDIT_POST' | 'DELETE_POST' | 'SAVE_DRAFT' | 'DELETE_DRAFT' | 'ADD_COMMENT' | 'REACT';
  userName: string;
  userEmail: string;
  isCoreTeam?: boolean;
  targetId?: string;
  targetTitle?: string;
  description?: string;
  details?: Record<string, any>;
}): Promise<void> => {
  try {
    await fetch('/api/activity/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
  } catch (e) {
    // Non-blocking
  }
};

export const fetchUserDrafts = async (email: string): Promise<DraftPost[]> => {
  if (!email) return [];
  const cleanEmail = email.trim().toLowerCase();

  // Try server first
  try {
    const res = await fetch(`/api/drafts?email=${encodeURIComponent(cleanEmail)}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.drafts)) {
        // Cache locally for offline availability
        try {
          const stored = getLocalDrafts();
          const otherUsersDrafts = stored.filter((d) => d.authorEmail.toLowerCase() !== cleanEmail);
          localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify([...otherUsersDrafts, ...data.drafts]));
        } catch {
          // ignore
        }
        return data.drafts;
      }
    }
  } catch (err) {
    console.warn('Could not query server drafts, checking local cache:', err);
  }

  // Fallback to local cache
  return getLocalDrafts().filter((d) => d.authorEmail.toLowerCase() === cleanEmail);
};

export const getLocalDrafts = (): DraftPost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load local drafts', e);
  }
  return [];
};

export const saveUserDraft = async (
  draft: Partial<DraftPost> & { authorEmail: string; title: string }
): Promise<DraftPost> => {
  const cleanEmail = draft.authorEmail.trim().toLowerCase();
  const nowIso = new Date().toISOString();

  const preparedDraft: DraftPost = {
    id: draft.id || 'draft_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    authorEmail: cleanEmail,
    authorName: draft.authorName || 'Anonymous Author',
    title: draft.title.trim(),
    subtitle: draft.subtitle?.trim(),
    category: draft.category || 'Slow Fashion',
    brandTag: draft.brandTag?.trim(),
    verdictBadge: draft.verdictBadge?.trim(),
    excerpt: draft.excerpt?.trim() || draft.content?.slice(0, 160),
    content: draft.content || '',
    coverImage: draft.coverImage || undefined,
    durabilityScore: draft.durabilityScore,
    tags: Array.isArray(draft.tags) ? draft.tags : [],
    isEditorial: Boolean(draft.isEditorial),
    createdAt: draft.createdAt || nowIso,
    updatedAt: nowIso,
  };

  // 1. Update local cache immediately
  try {
    const drafts = getLocalDrafts();
    const idx = drafts.findIndex((d) => d.id === preparedDraft.id);
    if (idx >= 0) {
      drafts[idx] = preparedDraft;
    } else {
      drafts.unshift(preparedDraft);
    }
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  } catch (e) {
    console.error('Failed to save draft locally', e);
  }

  // 2. Persist to permanent server database
  try {
    const res = await fetch('/api/drafts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preparedDraft),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.draft) {
        return data.draft;
      }
    }
  } catch (err) {
    console.warn('Server draft sync error (saved locally):', err);
  }

  return preparedDraft;
};

export const deleteUserDraft = async (draftId: string, email: string): Promise<boolean> => {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Remove from local cache
  try {
    const drafts = getLocalDrafts();
    const remaining = drafts.filter((d) => d.id !== draftId);
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(remaining));
  } catch (e) {
    console.error('Failed to delete draft locally', e);
  }

  // 2. Delete from server database
  try {
    const res = await fetch(`/api/drafts/${encodeURIComponent(draftId)}?email=${encodeURIComponent(cleanEmail)}`, {
      method: 'DELETE',
      headers: { 'x-user-email': cleanEmail },
    });
    return res.ok;
  } catch (err) {
    console.warn('Failed to delete draft on server:', err);
    return false;
  }
};

export const fetchManagerAnalytics = async (
  managerEmail: string
): Promise<ManagerAnalyticsSummary | null> => {
  try {
    const res = await fetch('/api/manager/analytics', {
      headers: { 'x-manager-email': managerEmail },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.analytics) {
        return data.analytics;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch manager analytics:', err);
  }
  return null;
};

export const saveStoredUser = (user: UserSession | null): void => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      // Asynchronously ensure record exists in permanent server database
      persistUserToDatabase({
        email: user.email,
        name: user.name,
        avatarColor: user.avatarColor,
        avatarUrl: user.avatarUrl,
        provider: user.provider || 'email',
      }).catch(() => {
        // Handled internally
      });
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (e) {
    console.error('Failed to persist user session', e);
  }
};

export const getStoredSubscribers = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load subscribers', e);
  }
  return [];
};

export const saveSubscriberEmail = (email: string): boolean => {
  try {
    const subs = getStoredSubscribers();
    const clean = email.trim().toLowerCase();
    if (!subs.includes(clean)) {
      subs.push(clean);
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subs));
    }
    return true;
  } catch (e) {
    console.error('Failed to save subscriber', e);
    return false;
  }
};
