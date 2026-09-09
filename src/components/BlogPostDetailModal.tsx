import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Heart,
  Lightbulb,
  Leaf,
  AlertTriangle,
  ThumbsUp,
  MessageSquare,
  Reply,
  Send,
  Calendar,
  Clock,
  Tag,
  Share2,
  Check,
  CheckCircle2,
  User,
  Star,
} from 'lucide-react';
import { BlogPost, BlogComment, UserSession, ReactionType } from '../types';
import { isCoreEditorialEmail } from '../data/blogStore';

interface BlogPostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
  comments: BlogComment[];
  currentUser?: UserSession | null;
  onReact: (postId: string, reaction: ReactionType) => void;
  onAddComment: (comment: Omit<BlogComment, 'id' | 'timestamp'>) => void;
  onPromptSignIn?: (reason?: string) => void;
  onEditEditorial?: (post: BlogPost) => void;
}

export const BlogPostDetailModal: React.FC<BlogPostDetailModalProps> = ({
  isOpen,
  onClose,
  post,
  comments,
  currentUser,
  onReact,
  onAddComment,
  onPromptSignIn,
  onEditEditorial,
}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyAuthorName, setReplyAuthorName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !post) return null;

  const postComments = comments.filter((c) => c.postId === post.id);
  const isCoreUser = Boolean(currentUser && isCoreEditorialEmail(currentUser.email));

  // Group top-level comments and replies
  const topLevelComments = postComments.filter((c) => !c.parentId);
  const getReplies = (commentId: string) =>
    postComments.filter((c) => c.parentId === commentId);

  const handlePostTopLevelComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const name = commenterName.trim() || 'Reader Contributor';

    onAddComment({
      postId: post.id,
      authorName: name,
      authorEmail: '',
      isCoreTeam: false,
      content: newCommentText.trim(),
    });

    setNewCommentText('');
  };

  const handlePostReply = (parentComment: BlogComment) => {
    if (!replyText.trim()) return;

    const name = replyAuthorName.trim() || 'Reader Contributor';

    onAddComment({
      postId: post.id,
      authorName: name,
      authorEmail: '',
      isCoreTeam: false,
      content: replyText.trim(),
      parentId: parentComment.id,
      replyToAuthor: parentComment.authorName,
    });

    setReplyText('');
    setReplyingToCommentId(null);
  };

  const handleReactionClick = (type: ReactionType) => {
    onReact(post.id, type);
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  // Reactions configuration with styling and labels
  const reactionsList: Array<{
    type: ReactionType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count: number;
    color: string;
  }> = [
    {
      type: 'heart',
      label: 'Like',
      icon: Heart,
      count: post.reactions.heart,
      color: 'text-[#BE562C] hover:bg-[#FDF2EC]',
    },
    {
      type: 'insight',
      label: 'Insightful',
      icon: Lightbulb,
      count: post.reactions.insight,
      color: 'text-[#D97706] hover:bg-[#FEF3C7]',
    },
    {
      type: 'eco',
      label: 'Eco Truth',
      icon: Leaf,
      count: post.reactions.eco,
      color: 'text-[#15803D] hover:bg-[#DCFCE7]',
    },
    {
      type: 'alert',
      label: 'Alert',
      icon: AlertTriangle,
      count: post.reactions.alert,
      color: 'text-[#DC2626] hover:bg-[#FEE2E2]',
    },
    {
      type: 'applause',
      label: 'Inspiring',
      icon: ThumbsUp,
      count: post.reactions.applause,
      color: 'text-[#2563EB] hover:bg-[#DBEAFE]',
    },
  ];

  return (
    <div
      id="blog-detail-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#183626]/85 backdrop-blur-xs"
    >
      <div
        id="blog-detail-container"
        className="w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#FAF8F5] border border-[#D5CEC2] shadow-2xl rounded-none overflow-hidden"
        role="dialog"
      >
        {/* Top Bar */}
        <div className="bg-[#183626] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#2D4537] shrink-0">
          <div className="flex items-center gap-2">
            {post.type === 'editorial' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#E8A585] font-bold bg-[#244332] px-2.5 py-1 border border-[#3E5C4B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E8A585]" />
                EDITORIAL INVESTIGATION
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#A3B8AC] font-bold bg-[#244332] px-2.5 py-1 border border-[#3E5C4B]">
                <MessageSquare className="w-3.5 h-3.5 text-[#A3B8AC]" />
                COMMUNITY VOICE
              </span>
            )}
            <span className="text-xs font-mono text-[#A3B8AC] hidden sm:inline">• {post.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {post.type === 'editorial' && isCoreUser && onEditEditorial && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEditEditorial(post);
                }}
                className="px-2.5 py-1 bg-[#E8A585] text-[#183626] text-[11px] font-mono uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer"
              >
                Edit Article
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              title="Share Article"
              className="p-1.5 text-[#A3B8AC] hover:text-white transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#86EFAC]" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#A3B8AC] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-7 relative">
          {/* Dimmed & Partially Transparent Cover Image Banner */}
          {post.coverImage && (
            <div className="relative -mx-5 sm:-mx-7 md:-mx-8 -mt-5 sm:-mt-7 md:-mt-8 mb-6 h-44 sm:h-56 overflow-hidden border-b border-[#D5CEC2] bg-[#183626]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover opacity-30 filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/50 to-transparent" />
              <div className="absolute bottom-3 left-5 sm:left-7 text-[10px] font-mono text-[#183626] uppercase tracking-widest bg-[#FAF8F5]/90 px-2.5 py-0.5 border border-[#D5CEC2]">
                Cover Investigation Archive
              </div>
            </div>
          )}

          {/* Article Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#76877D] mb-2.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
              {post.brandMentioned && (
                <>
                  <span>•</span>
                  <span className="text-[#183626] font-semibold">
                    Focus: {post.brandMentioned}
                  </span>
                </>
              )}
              {post.durabilityScore && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[#BE562C] font-semibold bg-[#FDF2EC] px-1.5 py-0.5">
                    <Star className="w-3 h-3 fill-[#BE562C]" />
                    Durability {post.durabilityScore}/10
                  </span>
                </>
              )}
            </div>

            <h1 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#183626] leading-tight mb-3">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="text-sm sm:text-base text-[#5E6F65] leading-relaxed italic mb-4 font-serif">
                {post.subtitle}
              </p>
            )}

            {/* Author Credit */}
            <div className="flex items-center justify-between border-y border-[#E5DFD4] py-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#183626] text-white flex items-center justify-center font-mono font-bold text-xs">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#183626] flex items-center gap-1.5 flex-wrap">
                    <span>{post.authorName}</span>
                    {post.isCoreTeam ? (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#BE562C] bg-[#FDF2EC] border border-[#F4DDD2] px-1.5 py-0.2 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#BE562C]" />
                        VERIFIED CORE TEAM
                      </span>
                    ) : (post.isVerifiedAuthor || (post.authorEmail && post.authorEmail.includes('@'))) ? (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#183626] bg-[#E8F0EC] border border-[#BBD4C5] px-1.5 py-0.2 font-semibold flex items-center gap-1 rounded-full" title={`Verified Contributor (${post.authorEmail})`}>
                        <CheckCircle2 className="w-3 h-3 text-[#183626]" />
                        Verified Author
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] font-mono text-[#76877D]">
                    {post.isCoreTeam
                      ? 'Unfasten Investigative Editorial Desk'
                      : post.authorEmail || 'Anonymous Community Contributor'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="text-sm sm:text-base text-[#2D4537] leading-relaxed space-y-4 font-serif">
            {post.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] pt-3 pb-1"
                  >
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('- ')) {
                const items = block.split('\n- ').map((item) => item.replace('- ', ''));
                return (
                  <ul key={idx} className="space-y-1.5 pl-4 list-disc marker:text-[#BE562C] text-sm">
                    {items.map((it, itemIdx) => (
                      <li key={itemIdx}>{it}</li>
                    ))}
                  </ul>
                );
              }
              if (block.match(/^\d+\.\s/)) {
                return (
                  <div key={idx} className="p-3 bg-[#FAF8F5] border-l-2 border-[#183626] text-sm">
                    {block}
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-mono uppercase tracking-wider bg-[#F2EDE3] text-[#4F6156] px-2 py-1 border border-[#E5DFD4]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* INTERACTIVE EXPRESSIONS / REACTIONS BAR */}
          <div className="p-4 sm:p-5 bg-[#FAF8F5] border border-[#D5CEC2] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#76877D] font-bold">
                Show Expressions &amp; Reactions:
              </span>
              <span className="text-[11px] font-mono text-[#76877D]">
                {(Object.values(post.reactions) as number[]).reduce((a: number, b: number) => a + b, 0)} total reactions
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {reactionsList.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleReactionClick(item.type)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[#D5CEC2] bg-white transition-all cursor-pointer active:scale-95 ${item.color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-semibold">{item.label}</span>
                    <span className="bg-[#FAF8F5] border border-[#E5DFD4] px-1.5 py-0.2 rounded-full text-[10px] text-[#183626] font-bold">
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMMENTS & REPLIES SECTION */}
          <div className="pt-4 border-t border-[#D5CEC2] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#183626] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#BE562C]" />
                <span>Discussion &amp; Replies ({postComments.length})</span>
              </h3>
            </div>

            {/* Top-Level Add Comment Box */}
            <form onSubmit={handlePostTopLevelComment} className="space-y-2.5 bg-[#F2ECE1] p-3 border border-[#D5CEC2]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-[#5E6F65] font-semibold">Your Name (Optional):</span>
                <input
                  type="text"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  placeholder="e.g. Maya or Reader"
                  className="px-2.5 py-1 text-xs bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626] max-w-[200px]"
                />
              </div>
              <div className="relative">
                <textarea
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add your perspective, ask a question, or share garment feedback..."
                  className="w-full p-3 text-xs sm:text-sm bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626] leading-relaxed"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[11px] font-mono text-[#76877D]">
                  Open community discussion. Keep dialogue respectful &amp; evidence-based.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#183626] hover:bg-[#224b35] text-white text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer transition-colors"
                >
                  <span>Post Comment</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4 pt-2">
              {topLevelComments.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-[#D5CEC2] text-xs font-mono text-[#76877D]">
                  No comments yet. Be the first to share your perspective!
                </div>
              ) : (
                topLevelComments.map((comment) => {
                  const replies = getReplies(comment.id);
                  const isReplying = replyingToCommentId === comment.id;

                  return (
                    <div
                      key={comment.id}
                      className="p-4 bg-white border border-[#E5DFD4] space-y-3"
                    >
                      {/* Comment Header */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#183626] text-white flex items-center justify-center text-[11px] font-bold font-mono">
                            {comment.authorName.charAt(0)}
                          </div>
                          <span className="font-bold text-[#183626]">{comment.authorName}</span>
                          {comment.isCoreTeam && (
                            <span className="text-[9px] font-mono uppercase tracking-wider text-[#BE562C] bg-[#FDF2EC] border border-[#F4DDD2] px-1 py-0.2 font-bold">
                              CORE TEAM
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-[#76877D]">
                          {comment.timestamp}
                        </span>
                      </div>

                      {/* Comment Content */}
                      <p className="text-xs sm:text-sm text-[#3E5246] leading-relaxed">
                        {comment.content}
                      </p>

                      {/* Reply Action */}
                      <div className="flex items-center gap-4 text-xs font-mono text-[#76877D] pt-1">
                        <button
                          type="button"
                          onClick={() => setReplyingToCommentId(isReplying ? null : comment.id)}
                          className="inline-flex items-center gap-1 hover:text-[#183626] cursor-pointer"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>

                      {/* Nested Reply Box */}
                      {isReplying && (
                        <div className="mt-3 p-3 bg-[#FAF8F5] border border-[#E5DFD4] space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-mono text-[#76877D]">
                              Replying to <strong className="text-[#183626]">@{comment.authorName}</strong>:
                            </p>
                            <input
                              type="text"
                              value={replyAuthorName}
                              onChange={(e) => setReplyAuthorName(e.target.value)}
                              placeholder="Your name (optional)"
                              className="px-2 py-0.5 text-[10px] bg-white border border-[#D5CEC2] focus:outline-none"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full p-2 text-xs bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setReplyingToCommentId(null)}
                              className="px-2.5 py-1 text-[11px] font-mono uppercase text-[#5E6F65]"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePostReply(comment)}
                              className="px-3 py-1 bg-[#183626] text-white text-[11px] font-mono uppercase font-semibold cursor-pointer"
                            >
                              Send Reply
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Threaded Nested Replies */}
                      {replies.length > 0 && (
                        <div className="mt-3 pl-4 sm:pl-6 border-l-2 border-[#E5DFD4] space-y-2.5 pt-2">
                          {replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="p-3 bg-[#FAF8F5] border border-[#E5DFD4] space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-[#183626]">{reply.authorName}</span>
                                  {reply.isCoreTeam && (
                                    <span className="text-[9px] font-mono uppercase text-[#BE562C] bg-[#FDF2EC] border border-[#F4DDD2] px-1 font-bold">
                                      CORE TEAM
                                    </span>
                                  )}
                                  {reply.replyToAuthor && (
                                    <span className="text-[#76877D]">
                                      replying to <strong className="text-[#183626]">@{reply.replyToAuthor}</strong>
                                    </span>
                                  )}
                                </div>
                                <span className="font-mono text-[#76877D] text-[10px]">
                                  {reply.timestamp}
                                </span>
                              </div>
                              <p className="text-xs text-[#3E5246] leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
