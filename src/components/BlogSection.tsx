import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Clock,
  Calendar,
  Heart,
  Search,
  PenTool,
  Star,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { BlogPost, BlogComment, ReactionType } from '../types';
import {
  getStoredPosts,
  saveStoredPosts,
  getStoredComments,
  saveStoredComments,
} from '../data/blogStore';
import { CommunityPostComposerModal } from './CommunityPostComposerModal';
import { BlogPostDetailModal } from './BlogPostDetailModal';
import { NewsletterSubscriptionCard } from './NewsletterSubscriptionCard';

interface BlogSectionProps {
  onNavigateToAudits?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigateToAudits }) => {
  // State management
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredPosts());
  const [comments, setComments] = useState<BlogComment[]>(() => getStoredComments());

  // Modals
  const [isCommunityComposerOpen, setIsCommunityComposerOpen] = useState(false);
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<BlogPost | null>(null);

  // Filters
  const [activeCommunityCategory, setActiveCommunityCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Split posts into Editorial and Community
  const editorialPosts = useMemo(() => {
    return posts.filter((p) => p.type === 'editorial');
  }, [posts]);

  const communityPosts = useMemo(() => {
    return posts.filter((p) => {
      if (p.type !== 'community') return false;
      if (activeCommunityCategory !== 'All' && p.category !== activeCommunityCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          (p.brandMentioned && p.brandMentioned.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [posts, activeCommunityCategory, searchQuery]);

  // Handle Save Community Post
  const handleSaveCommunityPost = (newPost: BlogPost) => {
    const updatedList = [newPost, ...posts];
    setPosts(updatedList);
    saveStoredPosts(updatedList);
  };

  // Handle Reactions
  const handleReact = (postId: string, reactionType: ReactionType) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: post.reactions[reactionType] + 1,
          },
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveStoredPosts(updatedPosts);

    if (selectedPostForDetail && selectedPostForDetail.id === postId) {
      setSelectedPostForDetail({
        ...selectedPostForDetail,
        reactions: {
          ...selectedPostForDetail.reactions,
          [reactionType]: selectedPostForDetail.reactions[reactionType] + 1,
        },
      });
    }
  };

  // Handle Add Comment
  const handleAddComment = (commentData: Omit<BlogComment, 'id' | 'timestamp'>) => {
    const newComment: BlogComment = {
      ...commentData,
      id: `comment-${Date.now()}`,
      timestamp: 'Just now',
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    saveStoredComments(updatedComments);

    const updatedPosts = posts.map((post) => {
      if (post.id === commentData.postId) {
        return {
          ...post,
          commentsCount: (post.commentsCount || 0) + 1,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveStoredPosts(updatedPosts);

    if (selectedPostForDetail && selectedPostForDetail.id === commentData.postId) {
      setSelectedPostForDetail({
        ...selectedPostForDetail,
        commentsCount: (selectedPostForDetail.commentsCount || 0) + 1,
      });
    }
  };

  return (
    <div id="unfasten-blog-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Top Banner & Action Bar with Pen Icon Post Option */}
      <div className="border border-[#D5CEC2] bg-[#FAF8F5] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#BE562C] font-bold bg-[#FDF2EC] border border-[#F4DDD2] px-2 py-0.5">
              UNFASTEN CHRONICLES
            </span>
            <span className="text-xs font-mono text-[#76877D] hidden md:inline">
              • Public Interest Investigative Journalism &amp; Consumer Voices
            </span>
          </div>
          <h1 className="font-editorial-serif text-2xl sm:text-3xl font-normal text-[#183626] mt-1">
            The Watchdog Blog &amp; Experiences
          </h1>
        </div>

        {/* Top Controls: Post with Pen Icon */}
        <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
          <button
            type="button"
            id="top-pen-post-button"
            onClick={() => setIsCommunityComposerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#183626] hover:bg-[#224b35] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-xs"
            title="Share your garment experience or review"
          >
            <PenTool className="w-3.5 h-3.5 text-[#E8A585]" />
            <span>Share Story / Review</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: EDITORIAL BLOG (SPECIAL SECTION AT THE TOP)
          Public interest investigations authored by Core Team
      ───────────────────────────────────────────────────────────── */}
      <section id="editorial-blog-section" className="space-y-6 pt-2">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#183626] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#BE562C]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#183626] font-bold">
                TOP INVESTIGATIVE SECTION
              </span>
            </div>
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#183626]">
              Editorial Blog
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6F65] mt-0.5">
              Forensic laboratory teardowns, living wage audits, and supply chain accountability authored
              by the Unfasten Investigative Team.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F1EA] border border-[#E5DFD4] text-[11px] font-mono text-[#5E6F65]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#BE562C]" />
              <span>Investigative Core Desk</span>
            </div>
          </div>
        </div>

        {/* Featured Editorial Post */}
        {editorialPosts.length > 0 && (
          <div
            id="featured-editorial-article"
            className="border border-[#D5CEC2] bg-[#FAF8F5] p-6 sm:p-8 hover:border-[#183626] transition-all cursor-pointer relative group overflow-hidden"
            onClick={() => setSelectedPostForDetail(editorialPosts[0])}
          >
            {/* Dimmed Cover Image Background */}
            {editorialPosts[0].coverImage && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15 sm:opacity-20 pointer-events-none mix-blend-multiply group-hover:opacity-25 transition-opacity duration-300"
                style={{ backgroundImage: `url(${editorialPosts[0].coverImage})` }}
              />
            )}

            {/* Post Content Layer */}
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-mono text-[#76877D]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#183626] bg-[#E5EFEA] border border-[#A7D0BD] px-2 py-0.5">
                    FEATURED INVESTIGATION
                  </span>
                  <span>•</span>
                  <span>{editorialPosts[0].category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {editorialPosts[0].date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {editorialPosts[0].readingTime}
                  </span>
                </div>
              </div>

              <h3 className="font-editorial-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#183626] group-hover:text-[#BE562C] transition-colors leading-tight mb-2">
                {editorialPosts[0].title}
              </h3>

              {editorialPosts[0].subtitle && (
                <p className="text-sm sm:text-base text-[#5E6F65] leading-relaxed italic mb-3 font-serif">
                  {editorialPosts[0].subtitle}
                </p>
              )}

              <p className="text-xs sm:text-sm text-[#3E5246] leading-relaxed line-clamp-3 mb-6 font-serif max-w-4xl">
                {editorialPosts[0].excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D5CEC2]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#183626] text-white flex items-center justify-center font-mono font-bold text-xs">
                    {editorialPosts[0].authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#183626] flex items-center gap-1.5">
                      <span>{editorialPosts[0].authorName}</span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#BE562C] bg-[#FDF2EC] border border-[#F4DDD2] px-1.5 py-0.2 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5 text-[#BE562C]" />
                        VERIFIED CORE TEAM
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#76877D]">
                      Unfasten Investigative Editorial Desk
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#76877D]">
                  <span className="flex items-center gap-1 text-[#BE562C]">
                    <Heart className="w-3.5 h-3.5" />
                    {editorialPosts[0].reactions.heart}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {comments.filter((c) => c.postId === editorialPosts[0].id).length}
                  </span>
                  <span className="text-[#183626] font-bold group-hover:underline flex items-center gap-0.5">
                    Read Investigation →
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {editorialPosts.slice(1).map((post) => {
            const postCommentsCount = comments.filter((c) => c.postId === post.id).length;
            return (
              <div
                key={post.id}
                onClick={() => setSelectedPostForDetail(post)}
                className="border border-[#D5CEC2] bg-[#FAF8F5] p-5 sm:p-6 flex flex-col justify-between hover:border-[#183626] transition-all cursor-pointer group relative overflow-hidden"
              >
                {post.coverImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 sm:opacity-15 pointer-events-none mix-blend-multiply group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#76877D] mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#183626] font-bold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h4 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] group-hover:text-[#BE562C] transition-colors leading-snug mb-2">
                    {post.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed line-clamp-3 mb-4 font-serif">
                    {post.excerpt}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-[#E5DFD4] flex items-center justify-between text-xs text-[#76877D]">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#183626]">{post.authorName}</span>
                    <span className="text-[9px] font-mono text-[#BE562C] font-bold">• Core Desk</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="flex items-center gap-1 text-[#BE562C]">
                      <Heart className="w-3.5 h-3.5" />
                      {post.reactions.heart}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {postCommentsCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: COMMUNITY VOICES & PERSONAL EXPERIENCES
          Positioned BEFORE the newsletter card
      ───────────────────────────────────────────────────────────── */}
      <section id="community-voices-section" className="space-y-6 pt-4 border-t-2 border-[#D5CEC2]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#BE562C]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#183626] font-bold">
                COMMUNITY STORIES &amp; EXPERIENCES
              </span>
            </div>
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#183626]">
              Consumer Voices &amp; Personal Experiences
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6F65] mt-0.5">
              Real garment owners sharing care tag surprises, thrifted restorations, seam durability
              reviews, and slow fashion experiences.
            </p>
          </div>

          <button
            type="button"
            id="share-experience-section-btn"
            onClick={() => setIsCommunityComposerOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#183626] hover:bg-[#224b35] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
          >
            <PenTool className="w-3.5 h-3.5 text-[#E8A585]" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Search & Filter Bar for Community Stories */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-[#FAF8F5] border border-[#D5CEC2]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Consumer Experience', 'Mending & Longevity', 'Wardrobe Audit', 'Material Discovery'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCommunityCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  activeCommunityCategory === cat
                    ? 'bg-[#183626] text-white font-semibold'
                    : 'bg-white text-[#5E6F65] border border-[#D5CEC2] hover:bg-[#F2ECE1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#76877D] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiences..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626]"
            />
          </div>
        </div>

        {/* Community Posts Grid */}
        {communityPosts.length === 0 ? (
          <div className="p-10 text-center border border-dashed border-[#D5CEC2] bg-[#FAF8F5] space-y-2">
            <p className="font-editorial-serif text-lg text-[#183626]">No community stories found.</p>
            <p className="text-xs text-[#76877D] font-mono">
              Be the first to share your clothing care tag or slow-fashion journey!
            </p>
            <button
              type="button"
              onClick={() => setIsCommunityComposerOpen(true)}
              className="mt-2 px-4 py-2 bg-[#183626] text-white text-xs font-mono uppercase cursor-pointer"
            >
              Post Experience
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {communityPosts.map((post) => {
              const postCommentsCount = comments.filter((c) => c.postId === post.id).length;
              const hasVerifiedMark = Boolean(
                post.isVerifiedAuthor || (post.authorEmail && post.authorEmail.includes('@'))
              );

              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPostForDetail(post)}
                  className="border border-[#D5CEC2] bg-[#FAF8F5] p-5 sm:p-6 flex flex-col justify-between hover:border-[#183626] transition-all cursor-pointer group relative overflow-hidden"
                >
                  {post.coverImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-10 sm:opacity-15 pointer-events-none mix-blend-multiply group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundImage: `url(${post.coverImage})` }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-xs font-mono text-[#76877D] mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-[#183626]">
                          {post.category}
                        </span>
                        {post.brandMentioned && (
                          <span className="text-[11px] text-[#BE562C] font-semibold">
                            • {post.brandMentioned}
                          </span>
                        )}
                      </div>
                      {post.durabilityScore && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#BE562C] bg-[#FDF2EC] px-1.5 py-0.5 border border-[#F4DDD2]">
                          <Star className="w-3 h-3 fill-[#BE562C]" />
                          {post.durabilityScore}/10
                        </span>
                      )}
                    </div>

                    <h4 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] group-hover:text-[#BE562C] transition-colors leading-snug mb-2">
                      {post.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#46574D] leading-relaxed line-clamp-3 mb-4 font-serif">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-[#E5DFD4] flex items-center justify-between text-xs text-[#76877D]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-5 h-5 rounded-full bg-[#3E5246] text-white flex items-center justify-center text-[10px] font-mono">
                        {post.authorName.charAt(0)}
                      </div>
                      <span className="font-medium text-[#183626]">{post.authorName}</span>
                      {hasVerifiedMark && (
                        <span
                          className="inline-flex items-center gap-0.5 text-[#183626] bg-[#E8F0EC] border border-[#BBD4C5] px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold"
                          title={`Verified Author (${post.authorEmail || 'verified'})`}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#183626]" />
                          <span>Verified</span>
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-[#76877D]">• {post.date}</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="flex items-center gap-1 text-[#BE562C]">
                        <Heart className="w-3.5 h-3.5" />
                        {post.reactions.heart}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {postCommentsCount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: NEWSLETTER SUBSCRIPTION (PLACED AFTER CONSUMER VOICES)
      ───────────────────────────────────────────────────────────── */}
      <section id="newsletter-section" className="pt-2">
        <NewsletterSubscriptionCard />
      </section>

      {/* Modals */}
      <CommunityPostComposerModal
        isOpen={isCommunityComposerOpen}
        onClose={() => setIsCommunityComposerOpen(false)}
        onSave={handleSaveCommunityPost}
      />

      <BlogPostDetailModal
        isOpen={!!selectedPostForDetail}
        onClose={() => setSelectedPostForDetail(null)}
        post={selectedPostForDetail}
        comments={comments}
        onReact={handleReact}
        onAddComment={handleAddComment}
      />
    </div>
  );
};
