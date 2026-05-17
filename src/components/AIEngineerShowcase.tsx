import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// ─── Data ──────────────────────────────────────────────────────────────────

interface QAPair {
  keywords: string[];
  q: string;
  a: string;
  followUps: number[];
  category: 'work' | 'tools' | 'thinking';
}

const QA_PAIRS: QAPair[] = [
  {
    keywords: ['built', 'product', 'shipped', 'made', 'project', 'created'],
    q: 'What have you built?',
    a: "AI safety simulations, bias detection systems, production apps wired to Claude and GPT. My focus is always the product layer — turning models into experiences real people actually use.",
    followUps: [1, 4],
    category: 'work',
  },
  {
    keywords: ['best', 'proud', 'favorite', 'notable', 'impressive'],
    q: "What's your best work?",
    a: "Probably the AI safety demo I built to make abstract risk concepts tangible for non-technical stakeholders. It changed how a room full of executives thought about the problem. That's the kind of impact I chase.",
    followUps: [0, 5],
    category: 'work',
  },
  {
    keywords: ['tools', 'stack', 'use', 'cursor', 'claude', 'daily', 'workflow'],
    q: "What's in your stack?",
    a: "Claude Code for agentic sessions, Cursor for in-editor flow, Next.js + Supabase for shipping fast, and whatever model fits the task. I'm stack-agnostic — I optimize for outcomes.",
    followUps: [3, 4],
    category: 'tools',
  },
  {
    keywords: ['automate', 'automation', 'twice', 'process', 'pipeline'],
    q: 'How do you approach automation?',
    a: "If I do something twice, I build a system for it. Most engineers use AI to go faster — I use AI to build the systems that eliminate the task entirely. The compounding effect changes everything.",
    followUps: [2, 5],
    category: 'tools',
  },
  {
    keywords: ['philosophy', 'approach', 'believe', 'principle', 'opinion', 'think'],
    q: 'What drives your engineering?',
    a: "Models are a new primitive — like databases or APIs before them. The craft is knowing when and how to wire them into the right product moment. Speed of iteration beats choice of model, every time.",
    followUps: [5, 0],
    category: 'thinking',
  },
  {
    keywords: ['different', 'unique', 'hire', 'why', 'special', 'stand'],
    q: 'Why work with you?',
    a: "I'm not a researcher training foundational models. I'm a product builder who ships. I bridge the gap between cutting-edge AI capabilities and the UX non-technical users actually experience. That combination is rare.",
    followUps: [4, 1],
    category: 'thinking',
  },
];

const GREETING =
  "Hey — I'm Rodney's AI. Ask me anything about his work, tools, or how he thinks.";

const FALLBACK_ANSWER =
  "That one's better answered in person. Drop a message in the contact section and let's talk.";

const CATEGORIES = [
  { key: 'work',     label: 'Work',     indices: [0, 1] },
  { key: 'tools',    label: 'Tools',    indices: [2, 3] },
  { key: 'thinking', label: 'Thinking', indices: [4, 5] },
] as const;

const STREAM_MS = 18;

// ─── Helpers ────────────────────────────────────────────────────────────────

function matchQA(input: string): QAPair | null {
  const lower = input.toLowerCase();
  let best: QAPair | null = null;
  let bestScore = 0;
  for (const pair of QA_PAIRS) {
    const score = pair.keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      best = pair;
    }
  }
  return bestScore > 0 ? best : null;
}

// ─── Message types ───────────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  id: number;
}

// ─── Main component ──────────────────────────────────────────────────────────

const AIEngineerShowcase = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamedText, setStreamedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [followUps, setFollowUps] = useState<number[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const msgIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasGreetedRef = useRef(false);

  // Only fire once the section is actually on screen — never on mount
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Stream any text into the chat as an AI bubble
  const streamText = (text: string, onDone?: (text: string) => void) => {
    let idx = 0;
    setStreamedText('');
    setIsStreaming(true);
    setShowCategories(false);

    const tick = () => {
      idx++;
      setStreamedText(text.slice(0, idx));
      if (idx < text.length) {
        timerRef.current = setTimeout(tick, STREAM_MS);
      } else {
        setIsStreaming(false);
        onDone?.(text);
      }
    };
    timerRef.current = setTimeout(tick, 0);
  };

  // Commit streamed text into message history
  const commitMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      { role: 'ai', text, id: ++msgIdRef.current },
    ]);
    setStreamedText('');
  };

  // Auto-greet only once the section scrolls into view
  useEffect(() => {
    if (!isInView || hasGreetedRef.current) return;
    hasGreetedRef.current = true;
    timerRef.current = setTimeout(() => {
      streamText(GREETING, text => {
        commitMessage(text);
        timerRef.current = setTimeout(() => setShowCategories(true), 300);
      });
    }, 400);
    return clearTimers;
  }, [isInView]);

  // Scroll the chat container to bottom (never scrolls the page viewport)
  const scrollToBottom = () => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  // Auto-scroll within the chat box whenever content changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedText, followUps, showCategories]);

  const sendQuestion = (text: string) => {
    if (!text.trim() || isStreaming) return;
    clearTimers();
    setShowCategories(false);
    setFollowUps([]);
    setMessages(prev => [
      ...prev,
      { role: 'user', text: text.trim(), id: ++msgIdRef.current },
    ]);
    setInputValue('');

    const match = matchQA(text);
    const answer = match ? match.a : FALLBACK_ANSWER;
    const next = match ? match.followUps : [0, 4];

    timerRef.current = setTimeout(() => {
      streamText(answer, committed => {
        commitMessage(committed);
        timerRef.current = setTimeout(() => {
          setFollowUps(next);
        }, 200);
      });
    }, 400);
  };

  return (
    <section ref={sectionRef} id="ai-engineer" className="py-32 px-6 relative">
      {/* Ambient glow — overflow-hidden scoped to this wrapper so sticky works */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-2xl mx-auto sticky top-8">
        {/* Section header — fade only, no y-movement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-muted/30 text-xs text-muted-foreground mb-6 font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            AI
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Ask Rodney
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            An AI trained on his work. Start a conversation.
          </p>
        </motion.div>

        {/* Chat card — fade only, no y-movement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border border-border/60 rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 bg-background/80 backdrop-blur-sm"
        >
          {/* Card header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-muted/20">
            <Avatar className="w-8 h-8 border border-border/60">
              <AvatarImage src="/temp-avatar.jpg" alt="Rodney" />
              <AvatarFallback className="text-xs font-bold bg-primary/10">RG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold leading-none">Rodney</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">AI Assistant</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground/50 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              online
            </div>
          </div>

          {/* Chat messages — overflow-anchor:none prevents browser scroll anchoring from moving the page */}
          <div
            ref={scrollContainerRef}
            className="h-72 overflow-y-auto px-5 py-4 space-y-4"
            style={{ overflowAnchor: 'none', scrollBehavior: 'auto' }}
          >
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'items-end'}`}
              >
                {msg.role === 'ai' && (
                  <Avatar className="w-6 h-6 shrink-0 border border-border/50">
                    <AvatarImage src="/temp-avatar.jpg" alt="Rodney" />
                    <AvatarFallback className="text-[9px] font-bold bg-primary/10">RG</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`text-sm leading-relaxed px-4 py-2.5 rounded-2xl max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Live streaming bubble */}
            {isStreaming && (
              <div className="flex gap-2.5 items-end">
                <Avatar className="w-6 h-6 shrink-0 border border-border/50">
                  <AvatarImage src="/temp-avatar.jpg" alt="Rodney" />
                  <AvatarFallback className="text-[9px] font-bold bg-primary/10">RG</AvatarFallback>
                </Avatar>
                <div className="text-sm leading-relaxed px-4 py-2.5 rounded-2xl rounded-bl-sm bg-muted max-w-[85%]">
                  {streamedText.length === 0 ? (
                    <div className="flex gap-1 items-center h-5">
                      {[0, 0.18, 0.36].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 inline-block"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay }}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      {streamedText}
                      <span className="inline-block w-0.5 h-[1em] bg-foreground/70 ml-0.5 animate-pulse align-middle" />
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Category chips (shown after greeting) */}
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 pt-1"
                >
                  {CATEGORIES.map(cat => (
                    <div key={cat.key} className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest w-14 shrink-0">
                        {cat.label}
                      </span>
                      {cat.indices.map(idx => (
                        <button
                          key={idx}
                          onClick={() => sendQuestion(QA_PAIRS[idx].q)}
                          className="text-xs px-3 py-1 rounded-full border border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-primary/5 transition-all duration-200"
                        >
                          {QA_PAIRS[idx].q}
                        </button>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Follow-up chips */}
            <AnimatePresence>
              {!isStreaming && followUps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-wrap gap-1.5 pl-8"
                >
                  {followUps.map(idx => (
                    <button
                      key={idx}
                      onClick={() => sendQuestion(QA_PAIRS[idx].q)}
                      className="text-xs px-3 py-1 rounded-full border border-dashed border-primary/30 text-primary/70 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      {QA_PAIRS[idx].q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-border/50 bg-muted/10">
            <div className="flex gap-3 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendQuestion(inputValue)}
                placeholder="Ask anything…"
                disabled={isStreaming}
                className="flex-1 text-sm bg-transparent border-0 focus:outline-none placeholder:text-muted-foreground/40 disabled:opacity-50"
              />
              <button
                onClick={() => sendQuestion(inputValue)}
                disabled={!inputValue.trim() || isStreaming}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-30 hover:bg-primary/90 transition-all shrink-0"
                aria-label="Send"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Subtle footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground/30 mt-6"
        >
          Responses are curated. For a real conversation, use the contact section.
        </motion.p>
      </div>
    </section>
  );
};

export default AIEngineerShowcase;
