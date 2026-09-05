import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Loader2,
  HelpCircle,
  ShieldAlert,
  Layers,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { BrandEvaluation } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AiInspectorChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentBrandContext: BrandEvaluation | null;
  initialPrompt?: string;
}

export const AiInspectorChat: React.FC<AiInspectorChatProps> = ({
  isOpen,
  onClose,
  currentBrandContext,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: currentBrandContext
        ? `Hello, I'm the Unfasten AI Fashion & Textile Inspector. I'm actively analyzing **${currentBrandContext.brandName}** (Score: ${currentBrandContext.score}/100, Grade ${currentBrandContext.grade}). Ask me anything about their fiber composition, factory wages, microplastic shedding, or ask for slower fashion alternatives.`
        : "Hello, I'm the Unfasten AI Fashion & Textile Inspector. You can ask me to evaluate any fashion brand, paste clothing wash tag ingredients (e.g. *'70% polyester, 30% cotton'*), or ask how to identify fast-fashion greenwashing.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isSending) return;

    const userMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          context: currentBrandContext
            ? {
                brandName: currentBrandContext.brandName,
                score: currentBrandContext.score,
                verdict: currentBrandContext.verdict,
                materials: currentBrandContext.materials,
                laborEthics: currentBrandContext.laborEthics,
                greenwashingCheck: currentBrandContext.greenwashingCheck,
              }
            : null,
        }),
      });

      if (!res.ok) throw new Error('AI response failed');

      const data = await res.json();
      const aiReply: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorReply: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: 'Apologies, I encountered a temporary communication glitch with the textile database. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsSending(false);
    }
  };

  const dynamicPrompts = currentBrandContext
    ? [
        `Why did ${currentBrandContext.brandName} get grade ${currentBrandContext.grade}?`,
        `How does their microplastic risk affect ocean ecosystems?`,
        `Are their living wage claims verified by independent NGOs?`,
        `What is the best slow-fashion alternative to this brand?`,
      ]
    : [
        'Is 60% cotton and 40% polyester recyclable?',
        'How can I spot greenwashing on an online clothing shop?',
        'Does OEKO-TEX guarantee fair living wages?',
        'What are the most durable natural clothing fabrics?',
      ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end p-0 sm:p-6 bg-[#183626]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:w-[480px] h-full sm:h-[650px] bg-[#FAF8F5] border-0 sm:border border-[#D5CEC2] shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-4 bg-[#183626] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#BE562C] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-editorial-serif text-base sm:text-lg font-bold tracking-wide">
                  Unfasten AI Inspector
                </h3>
                <span className="text-[9px] font-mono uppercase bg-[#2D583F] px-1.5 py-0.5 rounded-xs text-[#BFE8CE]">
                  Live
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#A6C2B2] font-mono">
                {currentBrandContext
                  ? `Active Dossier: ${currentBrandContext.brandName}`
                  : 'Textile Science & Ethics Intelligence'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#A6C2B2] hover:text-white hover:bg-[#234c36] rounded-xs transition-colors cursor-pointer"
            aria-label="Close AI Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-[#76877D]">
                {m.sender === 'ai' ? (
                  <>
                    <Bot className="w-3 h-3 text-[#183626]" />
                    <span>Unfasten AI</span>
                  </>
                ) : (
                  <>
                    <span>You</span>
                    <User className="w-3 h-3 text-[#BE562C]" />
                  </>
                )}
                <span>•</span>
                <span>{m.timestamp}</span>
              </div>

              <div
                className={`max-w-[88%] p-3.5 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#183626] text-white border border-[#183626]'
                    : 'bg-white text-[#293630] border border-[#DCD5C9] shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line text-xs sm:text-[13px]">
                  {m.text}
                </div>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 text-xs text-[#76877D] font-mono p-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#BE562C]" />
              <span>Unfasten AI is inspecting textile databases & watchdog reports...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Follow-up Suggestions */}
        <div className="p-2.5 sm:p-3 bg-[#F2EDE3] border-t border-[#E5DFD4]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#76877D] block mb-1.5">
            Suggested AI Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
            {dynamicPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isSending}
                onClick={() => handleSend(prompt)}
                className="text-[11px] text-left min-h-[32px] px-2.5 py-1 bg-white hover:bg-[#FAF7F2] active:bg-[#ECE6DC] border border-[#D5CEC2] text-[#183626] hover:border-[#183626] transition-colors cursor-pointer flex items-center"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#D5CEC2]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                currentBrandContext
                  ? `Ask AI about ${currentBrandContext.brandName}...`
                  : 'Ask about any brand, fabric blend, or wash care...'
              }
              className="flex-1 bg-white border border-[#D5CEC2] px-3 py-2.5 text-base sm:text-xs text-[#183626] placeholder:text-[#8C9B92] focus:outline-hidden focus:border-[#183626]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="min-h-[42px] px-3.5 py-2 bg-[#183626] text-white text-xs font-mono uppercase hover:bg-[#234c36] active:bg-[#12281c] disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
