import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { saveSubscriberEmail, getStoredSubscribers } from '../data/blogStore';

interface NewsletterSubscriptionCardProps {
  currentUserEmail?: string;
}

export const NewsletterSubscriptionCard: React.FC<NewsletterSubscriptionCardProps> = ({
  currentUserEmail,
}) => {
  const [email, setEmail] = useState(currentUserEmail || '');
  const [status, setStatus] = useState<'idle' | 'success' | 'already_subscribed'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    const currentSubs = getStoredSubscribers();
    const clean = email.trim().toLowerCase();

    if (currentSubs.includes(clean)) {
      setStatus('already_subscribed');
      return;
    }

    saveSubscriberEmail(clean);
    setStatus('success');
  };

  return (
    <div
      id="editorial-newsletter-card"
      className="w-full my-8 p-6 sm:p-8 bg-[#183626] text-white border border-[#2D4537] shadow-lg relative overflow-hidden"
    >
      {/* Editorial Watermark / Accent */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#BE562C]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E8A585] font-bold bg-[#264836] px-2 py-0.5 border border-[#3E5C4B]">
            WEEKLY WATCHDOG DISPATCH
          </span>
          <span className="text-[11px] font-mono text-[#A3B8AC]">• Sent Every Friday</span>
        </div>

        <h3 className="font-editorial-serif text-xl sm:text-2xl font-normal text-white mb-2 leading-snug">
          Subscribe to the UnFasten Weekly Intelligence Briefing
        </h3>

        <p className="text-xs sm:text-sm text-[#D1DDD6] leading-relaxed mb-5">
          Get independent investigative reports, laboratory fabric teardowns, living wage audit
          updates, and newly uncovered greenwashing alerts delivered directly to your inbox every
          week. Zero corporate sponsors. 100% public-interest consumer research.
        </p>

        {status === 'success' ? (
          <div className="p-4 bg-[#234533] border border-[#3E5C4B] text-white flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#86EFAC] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#86EFAC]">
                Subscription Confirmed!
              </p>
              <p className="text-xs text-[#D1DDD6] mt-0.5">
                We&apos;ve added <strong>{email}</strong> to the UnFasten weekly editorial dispatch.
                Your first intelligence dossier arrives this Friday.
              </p>
            </div>
          </div>
        ) : status === 'already_subscribed' ? (
          <div className="p-4 bg-[#234533] border border-[#3E5C4B] text-white flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#86EFAC] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#86EFAC]">
                You&apos;re Already Subscribed!
              </p>
              <p className="text-xs text-[#D1DDD6] mt-0.5">
                <strong>{email}</strong> is actively enrolled in our weekly intelligence updates.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#A3B8AC] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] text-[#183626] text-xs font-mono placeholder:text-[#8D9B93] focus:outline-none focus:ring-2 focus:ring-[#BE562C]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#BE562C] hover:bg-[#a84a24] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer shrink-0"
            >
              <span>Get Updates</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="flex items-center gap-4 text-[10px] font-mono text-[#A3B8AC] mt-3">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#E8A585]" /> No spam or trackers
          </span>
          <span>•</span>
          <span>One-click unsubscribe anytime</span>
        </div>
      </div>
    </div>
  );
};
