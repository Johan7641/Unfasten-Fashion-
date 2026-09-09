import React, { useState, useEffect } from 'react';
import {
  X,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  Link,
  Eye,
  Check,
  CheckCircle2,
  ShieldCheck,
  User,
  Mail,
} from 'lucide-react';
import { BlogPost, DraftPost } from '../types';
import { CURATED_COVER_IMAGES } from '../data/blogStore';

interface CommunityPostComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDraft?: DraftPost | null;
  onSave: (post: BlogPost) => void;
}

export const CommunityPostComposerModal: React.FC<CommunityPostComposerModalProps> = ({
  isOpen,
  onClose,
  initialDraft,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [brandMentioned, setBrandMentioned] = useState('');
  const [durabilityScore, setDurabilityScore] = useState(7);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Consumer Experience');
  const [tagsString, setTagsString] = useState('Personal Experience, Garment Quality');
  const [coverImage, setCoverImage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialDraft) {
      setTitle(initialDraft.title);
      setAuthorName(initialDraft.authorName || '');
      setAuthorEmail(initialDraft.authorEmail || '');
      setBrandMentioned(initialDraft.brandTag || '');
      setDurabilityScore(initialDraft.durabilityScore || 7);
      setContent(initialDraft.content);
      setCategory(initialDraft.category || 'Consumer Experience');
      setTagsString(initialDraft.tags?.join(', ') || 'Personal Experience, Garment Quality');
      setCoverImage(initialDraft.coverImage || '');
    } else {
      setTitle('');
      setAuthorName('');
      setAuthorEmail('');
      setBrandMentioned('');
      setDurabilityScore(7);
      setContent('');
      setCategory('Consumer Experience');
      setTagsString('Personal Experience, Garment Quality');
      setCoverImage('');
      setError(null);
    }
  }, [initialDraft, isOpen]);

  if (!isOpen) return null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError('Please provide a title and your personal story or garment evaluation.');
      return;
    }

    const cleanEmail = authorEmail.trim().toLowerCase();
    const isVerified = Boolean(cleanEmail && cleanEmail.includes('@'));
    const cleanName =
      authorName.trim() ||
      (cleanEmail ? cleanEmail.split('@')[0].replace(/[._-]/g, ' ') : 'Anonymous Contributor');

    const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    const tags = tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newPost: BlogPost = {
      id: `community-${Date.now()}`,
      type: 'community',
      title: title.trim(),
      excerpt: content.trim().slice(0, 160) + (content.length > 160 ? '...' : ''),
      content: content.trim(),
      coverImage: coverImage.trim() || undefined,
      authorName: formattedName,
      authorEmail: cleanEmail,
      isVerifiedAuthor: isVerified,
      isCoreTeam: false,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      readingTime: '2 min read',
      category,
      brandMentioned: brandMentioned.trim() || undefined,
      durabilityScore,
      tags: tags.length ? tags : ['Consumer Voice', 'Personal Experience'],
      reactions: { heart: 0, insight: 0, eco: 0, alert: 0, applause: 0 },
      commentsCount: 0,
    };

    onSave(newPost);
    onClose();
  };

  return (
    <div
      id="community-composer-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#183626]/80 backdrop-blur-xs"
    >
      <div
        id="community-composer-container"
        className="w-full max-w-xl max-h-[90vh] flex flex-col bg-[#FAF8F5] border border-[#D5CEC2] shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#183626] text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#2D4537]">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-[#E8A585]" />
            <div>
              <h2 className="font-editorial-serif text-lg sm:text-xl font-normal text-white">
                Share an Experience or Story
              </h2>
              <p className="text-[11px] font-mono text-[#A3B8AC]">
                Public Consumer Voice • Open &amp; Independent
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#A3B8AC] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handlePublish} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs font-sans">
          {error && (
            <div className="p-3 bg-[#FDF2EC] border border-[#F4DDD2] text-[#BE562C] flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Author Identity & Verification Badge Information */}
          <div className="p-3.5 bg-[#F2ECE1] border border-[#D5CEC2] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-wider text-[#183626] font-bold text-[11px] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#BE562C]" />
                Author Credentials (Optional)
              </span>
              {authorEmail.trim().includes('@') ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 bg-[#E8F0EC] text-[#183626] border border-[#BBD4C5] font-semibold rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-[#183626]" />
                  Verified Mark Will Be Added
                </span>
              ) : (
                <span className="text-[10px] font-mono text-[#76877D]">
                  Anonymous by default
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#5E6F65] mb-1">
                  Your Name / Pen Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Maya Lin (or leave blank)"
                  className="w-full px-3 py-2 bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#5E6F65] mb-1 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#BE562C]" />
                  Email ID (For Verified Mark)
                </label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="e.g. maya@example.com"
                  className="w-full px-3 py-2 bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626]"
                />
              </div>
            </div>

            <p className="text-[11px] text-[#5E6F65] leading-relaxed">
              💡 <strong>Verification Policy:</strong> If you provide your email ID, a green verified mark (✓) will be placed next to your name on the blog post. If left empty, your story will be published anonymously.
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#183626] font-bold mb-1">
              Title of Experience / Review <span className="text-[#BE562C]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 18 Months in a Wool Coat: How the Linings Held Up"
              required
              className="w-full px-3 py-2.5 bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626] text-sm font-editorial-serif font-bold"
            />
          </div>

          {/* Category & Brand Mentioned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#183626] font-bold mb-1">
                Story Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626]"
              >
                <option value="Consumer Experience">Consumer Experience</option>
                <option value="Mending & Longevity">Mending &amp; Longevity</option>
                <option value="Wardrobe Audit">Wardrobe Audit</option>
                <option value="Material Discovery">Material Discovery</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#183626] font-bold mb-1">
                Brand / Garment Mentioned
              </label>
              <input
                type="text"
                value={brandMentioned}
                onChange={(e) => setBrandMentioned(e.target.value)}
                placeholder="e.g. Patagonia, H&amp;M, or Vintage"
                className="w-full px-3 py-2 bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626]"
              />
            </div>
          </div>

          {/* Durability Score Slider */}
          <div className="p-3 bg-white border border-[#D5CEC2]">
            <div className="flex items-center justify-between mb-1.5 font-mono">
              <span className="text-xs uppercase tracking-wider text-[#183626] font-bold">
                Garment Longevity / Durability Rating
              </span>
              <span className="text-xs font-bold px-2 py-0.5 bg-[#FDF2EC] text-[#BE562C] border border-[#F4DDD2]">
                {durabilityScore} / 10
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={durabilityScore}
              onChange={(e) => setDurabilityScore(Number(e.target.value))}
              className="w-full accent-[#BE562C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#76877D] font-mono mt-1">
              <span>1 = Fell apart in washes</span>
              <span>5 = Average wear</span>
              <span>10 = Heirloom / Unbreakable</span>
            </div>
          </div>

          {/* Story Content */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#183626] font-bold mb-1">
              Your Personal Story / Investigation Details <span className="text-[#BE562C]">*</span>
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Detail your experience with the materials, seam construction, wash wear, microplastic shedding, or customer service..."
              required
              className="w-full p-3 bg-white border border-[#D5CEC2] focus:border-[#183626] focus:outline-none text-[#183626] font-serif leading-relaxed"
            />
          </div>

          {/* Cover Image Preset Picker */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#183626] font-bold mb-1.5">
              Choose an Archive Cover Image
            </label>
            <div className="grid grid-cols-5 gap-2">
              {CURATED_COVER_IMAGES.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCoverImage(imgUrl)}
                  className={`relative aspect-video overflow-hidden border cursor-pointer ${
                    coverImage === imgUrl ? 'border-2 border-[#BE562C] scale-95' : 'border-[#D5CEC2] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Cover preview" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-3 border-t border-[#D5CEC2] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D5CEC2] hover:bg-[#F2ECE1] text-[#5E6F65] font-mono text-xs uppercase cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="publish-experience-submit-btn"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#183626] hover:bg-[#224b35] text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-[#E8A585]" />
              <span>Publish Experience</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
