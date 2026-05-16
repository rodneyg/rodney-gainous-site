import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Wand2, AlertTriangle, AlertCircle, Lightbulb } from 'lucide-react';

// ======================================================
// IDEA 1 — "Ask Rodney": multi-turn AI personal assistant
// ======================================================

interface QAPair {
  keywords: string[];
  q: string;
  a: string;
  followUps: number[];
}

const QA_PAIRS: QAPair[] = [
  {
    keywords: ['built', 'product', 'shipped', 'made', 'created'],
    q: 'What AI products have you built?',
    a: "I've shipped AI safety simulations, bias detection systems, and production apps wired to Claude and GPT APIs. My focus is always the product layer — turning models into experiences real people actually use.",
    followUps: [1, 2],
  },
  {
    keywords: ['daily', 'tools', 'cursor', 'claude', 'workflow', 'use'],
    q: 'How do you use AI tools day-to-day?',
    a: "Claude Code for agentic coding sessions, Cursor for in-editor flow, and custom prompt pipelines for recurring tasks. If I do something twice, I build a workflow for it — that's the whole game.",
    followUps: [2, 3],
  },
  {
    keywords: ['philosophy', 'approach', 'think', 'believe', 'opinion'],
    q: 'What is your AI engineering philosophy?',
    a: "Models are a new primitive — like databases or APIs. The craft is knowing when and how to wire them into the right product moment. Speed of iteration beats the choice of model every time.",
    followUps: [0, 4],
  },
  {
    keywords: ['automate', 'automation', 'automating', 'workflow', 'process'],
    q: "What do you mean by 'automating automation'?",
    a: "Most engineers use AI to go faster on tasks they already do. I go a level deeper — I use AI to build the systems that automate those tasks so I never have to do them again. The compounding effect is real.",
    followUps: [1, 5],
  },
  {
    keywords: ['different', 'unique', 'stand', 'special', 'why', 'hire'],
    q: 'What makes you different as an AI engineer?',
    a: "I'm not a researcher training foundational models. I'm a product builder who ships. I bridge the gap between cutting-edge AI capabilities and the UX that non-technical users actually experience — that's a rare combination.",
    followUps: [0, 2],
  },
  {
    keywords: ['next', 'working', 'building', 'future', 'plan'],
    q: 'What are you working on next?',
    a: "I'm focused on AI-native applications — products where intelligence is structural, not bolted on. Think: systems that genuinely improve with every interaction, not just apps with a chat box added at the end.",
    followUps: [3, 4],
  },
];

const FALLBACK_ANSWER =
  "Great question — that one would need a real conversation. Reach out via the contact section and let's talk.";

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  id: number;
}

const CHAT_STREAM_MS = 14;
const PROMPT_STREAM_MS = 12;

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

const AskRodneyDemo = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [followUps, setFollowUps] = useState<number[]>([0, 1, 2]);
  const [inputValue, setInputValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const msgCounterRef = useRef(0);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const streamAnswer = (answer: string, nextFollowUps: number[]) => {
    let charIdx = 0;
    setStreamedText('');
    setIsTyping(true);

    const tick = () => {
      charIdx++;
      setStreamedText(answer.slice(0, charIdx));
      if (charIdx < answer.length) {
        timerRef.current = setTimeout(tick, CHAT_STREAM_MS);
      } else {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { role: 'ai', text: answer, id: ++msgCounterRef.current },
        ]);
        setStreamedText('');
        setFollowUps(nextFollowUps);
      }
    };

    timerRef.current = setTimeout(tick, 500);
  };

  const sendQuestion = (text: string) => {
    if (!text.trim() || isTyping) return;
    clearTimers();
    setFollowUps([]);
    setMessages(prev => [
      ...prev,
      { role: 'user', text: text.trim(), id: ++msgCounterRef.current },
    ]);
    setInputValue('');

    const match = matchQA(text);
    const answer = match ? match.a : FALLBACK_ANSWER;
    const next = match ? match.followUps : [0, 1];
    streamAnswer(answer, next);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamedText]);

  useEffect(() => () => clearTimers(), []);

  const showSuggestions = messages.length === 0 && !isTyping;

  return (
    <div className="flex flex-col gap-3">
      {/* Chat window */}
      <div className="h-[220px] overflow-y-auto space-y-3 pr-1">
        {showSuggestions && (
          <div className="flex flex-col gap-1.5 pt-2">
            <p className="text-xs text-muted-foreground/50 text-center mb-1">
              Suggested questions
            </p>
            {[0, 1, 2].map(idx => (
              <button
                key={idx}
                onClick={() => sendQuestion(QA_PAIRS[idx].q)}
                className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200"
              >
                {QA_PAIRS[idx].q}
              </button>
            ))}
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`text-xs leading-relaxed px-3 py-2 rounded-2xl max-w-[88%] ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Streaming AI bubble */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="text-xs leading-relaxed px-3 py-2 rounded-2xl rounded-tl-sm bg-muted max-w-[88%]">
              {streamedText.length === 0 ? (
                <div className="flex gap-1 items-center py-0.5">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  {streamedText}
                  <span className="animate-pulse ml-0.5">|</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Follow-up chips */}
        {!isTyping && followUps.length > 0 && messages.length > 0 && (
          <div className="flex flex-col gap-1 pt-1">
            <p className="text-[10px] text-muted-foreground/40 pl-1">Follow-up</p>
            {followUps.map(idx => (
              <button
                key={idx}
                onClick={() => sendQuestion(QA_PAIRS[idx].q)}
                className="self-start text-[11px] px-2.5 py-1 rounded-full border border-dashed border-primary/30 text-primary/70 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                {QA_PAIRS[idx].q}
              </button>
            ))}
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendQuestion(inputValue)}
          placeholder="Ask anything about Rodney…"
          disabled={isTyping}
          className="flex-1 text-xs bg-muted/30 border border-border rounded-xl px-3 py-2 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
        />
        <button
          onClick={() => sendQuestion(inputValue)}
          disabled={!inputValue.trim() || isTyping}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-40 hover:bg-primary/90 transition-all"
          aria-label="Send"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

// ======================================================
// IDEA 2 — "Prompt Polisher": weak → production-grade
// ======================================================

interface PromptExample {
  label: string;
  rough: string;
  polished: string;
  tags: string[];
}

const PROMPT_EXAMPLES: PromptExample[] = [
  {
    label: 'Summarize an article',
    rough: 'summarize this article for me',
    polished:
      'You are a research analyst. Summarize the following article in exactly 3 bullet points. Each point must be one sentence covering: the key insight, supporting evidence, and practical implication. Article: [ARTICLE]',
    tags: ['Added role', 'Specified format', 'Set constraints', 'Clarified focus'],
  },
  {
    label: 'Fix broken code',
    rough: 'fix this code its broken',
    polished:
      'You are a senior TypeScript engineer. Review the code below and: (1) identify the specific bug, (2) explain why it occurs, (3) provide the corrected version with inline comments. Do not rewrite unrelated sections. Code: [CODE]',
    tags: ['Assigned persona', 'Structured output', 'Added scope limit', 'Requested reasoning'],
  },
  {
    label: 'Write an email',
    rough: 'write an email asking for a meeting',
    polished:
      'Write a professional email under 80 words requesting a 30-minute discovery call with a potential investor. Tone: confident, not pushy. Include: one-sentence value prop, specific ask, two available time slots. No filler phrases. Context: [CONTEXT]',
    tags: ['Set length limit', 'Defined tone', 'Listed elements', 'Banned filler'],
  },
];

const PromptPolisherDemo = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [polishing, setPolishing] = useState(false);
  const [streamedPolished, setStreamedPolished] = useState('');
  const [done, setDone] = useState(false);
  const [shownTags, setShownTags] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleSelect = (idx: number) => {
    clearTimers();
    setSelected(idx);
    setPolishing(false);
    setStreamedPolished('');
    setDone(false);
    setShownTags(0);
  };

  const handlePolish = () => {
    if (selected === null || polishing) return;
    clearTimers();
    setPolishing(true);
    setStreamedPolished('');
    setDone(false);
    setShownTags(0);

    const text = PROMPT_EXAMPLES[selected].polished;
    let charIdx = 0;

    const tick = () => {
      charIdx++;
      setStreamedPolished(text.slice(0, charIdx));
      if (charIdx < text.length) {
        timerRef.current = setTimeout(tick, PROMPT_STREAM_MS);
      } else {
        setPolishing(false);
        setDone(true);
        let tagStep = 0;
        const revealTag = () => {
          tagStep++;
          setShownTags(tagStep);
          if (tagStep < PROMPT_EXAMPLES[selected].tags.length) {
            timerRef.current = setTimeout(revealTag, 200);
          }
        };
        timerRef.current = setTimeout(revealTag, 200);
      }
    };

    timerRef.current = setTimeout(tick, 900);
  };

  useEffect(() => () => clearTimers(), []);

  return (
    <div className="space-y-3">
      {/* Example selector */}
      <div className="flex gap-1.5 flex-wrap">
        {PROMPT_EXAMPLES.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-200 ${
              selected === idx
                ? 'border-primary bg-primary/10 text-foreground font-medium'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {selected !== null ? (
        <>
          {/* Before */}
          <div className="bg-muted/30 border border-border rounded-xl p-3">
            <div className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1.5">
              Before
            </div>
            <p className="text-xs text-muted-foreground italic">
              "{PROMPT_EXAMPLES[selected].rough}"
            </p>
          </div>

          {/* Polish button */}
          <button
            onClick={handlePolish}
            disabled={polishing || done}
            className="w-full flex items-center justify-center gap-2 py-2 bg-primary/10 border border-primary/20 rounded-xl text-xs font-medium text-primary hover:bg-primary/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {polishing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Polishing…
              </>
            ) : (
              <>
                <Wand2 className="h-3.5 w-3.5" />
                {done ? 'Polished' : 'Polish with AI'}
              </>
            )}
          </button>

          {/* After */}
          {(streamedPolished || done) && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 space-y-2">
              <div className="text-[10px] text-primary/50 uppercase tracking-widest">
                After
              </div>
              <p className="text-xs leading-relaxed">
                {streamedPolished || PROMPT_EXAMPLES[selected].polished}
                {polishing && <span className="animate-pulse ml-0.5">|</span>}
              </p>
              {/* Improvement tags */}
              {shownTags > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PROMPT_EXAMPLES[selected].tags.slice(0, shownTags).map(tag => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                    >
                      + {tag}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-xs text-muted-foreground/50 italic text-center py-4">
          Select an example above to see the transformation
        </p>
      )}
    </div>
  );
};

// ======================================================
// IDEA 3 — "AI Code Review": inline AI feedback on code
// ======================================================

interface ReviewComment {
  line: number;
  type: 'bug' | 'warning' | 'suggestion';
  text: string;
}

interface CodeSnippet {
  label: string;
  code: string;
  comments: ReviewComment[];
}

const CODE_SNIPPETS: CodeSnippet[] = [
  {
    label: 'React Hook',
    code: `const useUserData = (userId) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api/users/' + userId)
      .then(res => res.json())
      .then(setData);
  }, []);

  return data;
};`,
    comments: [
      { line: 1, type: 'warning', text: 'Missing TypeScript types for userId and return value' },
      { line: 2, type: 'bug', text: 'useState() without initial value — use useState<User | null>(null)' },
      { line: 5, type: 'bug', text: 'No error handling — fetch can reject silently on network failure' },
      { line: 8, type: 'warning', text: 'Missing userId in dependency array — stale closure will miss updates' },
    ],
  },
  {
    label: 'Async Function',
    code: `async function processItems(items) {
  const results = [];
  for (const item of items) {
    const result = await processOne(item);
    results.push(result);
  }
  return results;
}`,
    comments: [
      { line: 1, type: 'warning', text: 'No TypeScript types — add items: Item[] and return Promise<Result[]>' },
      { line: 3, type: 'suggestion', text: 'Sequential await in a loop — use Promise.all(items.map(...)) for parallel execution' },
      { line: 4, type: 'warning', text: 'Missing try/catch — a single failure will reject the entire function' },
    ],
  },
  {
    label: 'Config Object',
    code: `const config = {
  apiUrl: 'http://api.example.com',
  timeout: 5000,
  retries: 3,
  debug: true,
  apiKey: 'sk-abc123'
};`,
    comments: [
      { line: 2, type: 'warning', text: 'HTTP not HTTPS — all traffic is unencrypted' },
      { line: 5, type: 'suggestion', text: 'debug: true should not ship to production — use env variable' },
      { line: 6, type: 'bug', text: 'API key hardcoded in source — move to environment variable immediately' },
    ],
  },
];

const COMMENT_ICONS = {
  bug: AlertCircle,
  warning: AlertTriangle,
  suggestion: Lightbulb,
};

const COMMENT_COLORS = {
  bug: 'text-red-500',
  warning: 'text-yellow-500',
  suggestion: 'text-blue-500',
};

const COMMENT_BG = {
  bug: 'bg-red-500/5 border-red-500/20',
  warning: 'bg-yellow-500/5 border-yellow-500/20',
  suggestion: 'bg-blue-500/5 border-blue-500/20',
};

const AICodeReviewDemo = () => {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shownComments, setShownComments] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleTabChange = (idx: number) => {
    clearTimers();
    setActiveSnippet(idx);
    setScanning(false);
    setProgress(0);
    setShownComments(0);
  };

  const handleReview = () => {
    if (scanning) return;
    clearTimers();
    setScanning(true);
    setProgress(0);
    setShownComments(0);

    const totalComments = CODE_SNIPPETS[activeSnippet].comments.length;

    // Animate progress bar to 100% over 1.2s
    let p = 0;
    const progressTick = () => {
      p += 5;
      setProgress(Math.min(p, 100));
      if (p < 100) {
        timerRef.current = setTimeout(progressTick, 60);
      } else {
        setScanning(false);
        let shown = 0;
        const revealComment = () => {
          shown++;
          setShownComments(shown);
          if (shown < totalComments) {
            timerRef.current = setTimeout(revealComment, 280);
          }
        };
        revealComment();
      }
    };
    timerRef.current = setTimeout(progressTick, 60);
  };

  useEffect(() => () => clearTimers(), []);

  const snippet = CODE_SNIPPETS[activeSnippet];
  const lines = snippet.code.split('\n');
  const reviewed = shownComments > 0;

  return (
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex gap-1.5">
        {CODE_SNIPPETS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`text-[11px] px-2.5 py-1 rounded-full border transition-all duration-200 ${
              activeSnippet === idx
                ? 'border-primary bg-primary/10 text-foreground font-medium'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="bg-muted/20 border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50 bg-muted/30">
          <span className="text-[10px] font-mono text-muted-foreground/50">{snippet.label.toLowerCase().replace(/\s+/g, '_')}.ts</span>
          {!reviewed && (
            <button
              onClick={handleReview}
              disabled={scanning}
              className="flex items-center gap-1.5 text-[10px] font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
            >
              {scanning ? (
                <><Loader2 className="h-3 w-3 animate-spin" /> Scanning…</>
              ) : (
                'Run AI Review →'
              )}
            </button>
          )}
        </div>

        {/* Progress bar */}
        {(scanning || reviewed) && (
          <div className="h-0.5 bg-border">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        )}

        {/* Code lines */}
        <div className="p-3 font-mono text-[11px] space-y-0.5">
          {lines.map((line, lineIdx) => {
            const lineNum = lineIdx + 1;
            const comment = snippet.comments.find(c => c.line === lineNum);
            const isHighlighted =
              reviewed &&
              comment &&
              snippet.comments.indexOf(comment) < shownComments;
            const Icon = comment ? COMMENT_ICONS[comment.type] : null;

            return (
              <div key={lineIdx}>
                <div
                  className={`flex gap-2 px-1 py-0.5 rounded transition-colors duration-300 ${
                    isHighlighted ? 'bg-primary/5' : ''
                  }`}
                >
                  <span className="text-muted-foreground/30 select-none w-4 shrink-0 text-right">
                    {lineNum}
                  </span>
                  <span className={`flex-1 ${isHighlighted ? 'text-foreground' : 'text-muted-foreground/70'}`}>
                    {line || '\u00A0'}
                  </span>
                  {isHighlighted && Icon && comment && (
                    <Icon className={`h-3 w-3 shrink-0 mt-0.5 ${COMMENT_COLORS[comment.type]}`} />
                  )}
                </div>
                {/* Inline comment bubble */}
                {isHighlighted && comment && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mx-6 mb-1 mt-0.5 text-[10px] px-2.5 py-1.5 rounded-lg border leading-snug ${COMMENT_BG[comment.type]}`}
                  >
                    <span className={`font-semibold uppercase text-[9px] tracking-wide mr-1 ${COMMENT_COLORS[comment.type]}`}>
                      {comment.type}
                    </span>
                    {comment.text}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!reviewed && !scanning && (
        <p className="text-[11px] text-muted-foreground/40 text-center">
          Click "Run AI Review" above to see inline feedback
        </p>
      )}
    </div>
  );
};

// ======================================================
// MAIN SECTION
// ======================================================

interface IdeaConfig {
  id: string;
  number: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  DemoComponent: React.FC;
}

const IDEAS: IdeaConfig[] = [
  {
    id: 'ask',
    number: '01',
    icon: '💬',
    title: 'Ask Rodney',
    tagline: 'Your portfolio, in conversation.',
    description:
      "What if your portfolio could talk back? An AI assistant trained on Rodney's background answers visitor questions in real time. Type anything — or tap a suggestion — and get a direct, streaming response. No scrolling required.",
    DemoComponent: AskRodneyDemo,
  },
  {
    id: 'polisher',
    number: '02',
    icon: '✨',
    title: 'Prompt Polisher',
    tagline: 'Weak prompts in. Production prompts out.',
    description:
      "Prompt engineering is an underrated core skill of AI development. This tool takes rough, throwaway prompts and rewrites them into precise, production-grade instructions — showing exactly what changed and why.",
    DemoComponent: PromptPolisherDemo,
  },
  {
    id: 'review',
    number: '03',
    icon: '🔍',
    title: 'AI Code Review',
    tagline: 'Line-level AI feedback, instantly.',
    description:
      "Paste any code and watch an AI reviewer scan it in real time — surfacing bugs, warnings, and suggestions inline, just like a senior engineer would. This is what AI-assisted development actually looks like in practice.",
    DemoComponent: AICodeReviewDemo,
  },
];

const AIEngineerShowcase = () => {
  return (
    <section id="ai-engineer" className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            AI Engineer
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Three ideas. Three live demos. No slides needed.
          </p>
        </motion.div>

        {/* Idea cards */}
        <div className="space-y-16">
          {IDEAS.map((idea, index) => {
            const Demo = idea.DemoComponent;
            return (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="enhanced-card border border-border/50 rounded-2xl overflow-hidden group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left — description */}
                  <div className="p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border/50">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-mono text-muted-foreground/50 tracking-widest">
                        {idea.number}
                      </span>
                      <span className="text-3xl">{idea.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">
                      {idea.title}
                    </h3>
                    <p className="text-primary/70 font-medium mb-4 text-sm">
                      {idea.tagline}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {idea.description}
                    </p>
                  </div>

                  {/* Right — demo */}
                  <div className="p-8 bg-muted/5 relative">
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">
                      Live Demo
                    </div>
                    <div className="mt-4">
                      <Demo />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default AIEngineerShowcase;
