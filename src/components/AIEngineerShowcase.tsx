import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Send, Loader2, ArrowRight } from 'lucide-react';

// ======================================================
// IDEA 1 — "Ask Rodney": AI-powered personal assistant
// ======================================================

const QA_PAIRS = [
  {
    q: 'What kind of AI products have you built?',
    a: "I've shipped AI safety simulations, bias detection demos, and production apps wired to Claude and GPT APIs. My focus is always the product layer — turning models into experiences real people actually use.",
  },
  {
    q: 'How do you use AI tools day-to-day?',
    a: "Claude Code for agentic coding, Cursor for in-editor flow, and custom prompt pipelines for recurring engineering tasks. I'm big on automating automation — if I do something twice, I build a workflow for it.",
  },
  {
    q: 'What is your AI engineering philosophy?',
    a: 'Models are a new primitive — like databases or APIs. The craft is knowing when and how to wire them into the right product moment. Speed of iteration matters more than the choice of model.',
  },
];

const AskRodneyDemo = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelect = (idx: number) => {
    if (isTyping) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setSelected(idx);
    setDisplayedAnswer('');
    setIsTyping(true);
    const answer = QA_PAIRS[idx].a;
    let charIdx = 0;

    const tick = () => {
      charIdx++;
      setDisplayedAnswer(answer.slice(0, charIdx));
      if (charIdx < answer.length) {
        timerRef.current = setTimeout(tick, 16);
      } else {
        setIsTyping(false);
      }
    };

    timerRef.current = setTimeout(tick, 600);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Chat window */}
      <div className="min-h-[130px] mb-5 space-y-3">
        {selected === null ? (
          <p className="text-sm text-muted-foreground/60 italic text-center pt-4">
            Select a question below to start the conversation ↓
          </p>
        ) : (
          <>
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[85%] leading-snug">
                {QA_PAIRS[selected].q}
              </div>
            </div>
            {/* AI bubble */}
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2 text-sm max-w-[92%] leading-relaxed">
                {isTyping && displayedAnswer.length === 0 ? (
                  <div className="flex gap-1 items-center py-1">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-muted-foreground/50"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay }}
                      />
                    ))}
                  </div>
                ) : (
                  <span>
                    {displayedAnswer}
                    {isTyping && (
                      <span className="animate-pulse ml-0.5">▌</span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick-select questions */}
      <div className="space-y-1.5">
        {QA_PAIRS.map((pair, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={isTyping}
            className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all duration-200 ${
              selected === idx
                ? 'border-primary/50 bg-primary/5 text-foreground'
                : 'border-border hover:border-primary/30 hover:bg-muted/50 text-muted-foreground'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ChevronRight className="inline h-3 w-3 mr-1 shrink-0" />
            {pair.q}
          </button>
        ))}
      </div>
    </div>
  );
};

// ======================================================
// IDEA 2 — "AI Project Estimator": describe → blueprint
// ======================================================

const SAMPLE_PROMPTS = [
  'A mobile app that tracks daily mood with AI-generated journaling prompts',
  'A browser extension that summarises any article in 3 bullet points',
  'An internal Slack bot that auto-routes support tickets using NLP',
];

interface Estimate {
  complexity: string;
  timeline: string;
  stack: string[];
  risks: string[];
}

const getEstimate = (desc: string): Estimate => {
  const isMobile = /mobile|app/i.test(desc);
  const isExtension = /extension|browser/i.test(desc);
  const len = desc.length;
  return {
    complexity: len > 80 ? 'High' : len > 40 ? 'Medium' : 'Low',
    timeline: len > 80 ? '6–10 weeks' : len > 40 ? '3–5 weeks' : '1–2 weeks',
    stack: isMobile
      ? ['React Native', 'Claude API', 'Supabase', 'Expo']
      : isExtension
      ? ['TypeScript', 'Chrome Extension API', 'OpenAI API']
      : ['Next.js', 'OpenAI API', 'PostgreSQL', 'Vercel'],
    risks: [
      'Prompt reliability under edge-case inputs',
      'API cost & rate-limit management',
      'User trust & AI transparency',
    ],
  };
};

const ProjectEstimatorDemo = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [shown, setShown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEstimate = () => {
    if (!input.trim() || loading) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    setEstimate(null);
    setShown(0);

    timerRef.current = setTimeout(() => {
      const result = getEstimate(input);
      setEstimate(result);
      setLoading(false);
      let step = 0;
      const reveal = () => {
        step++;
        setShown(step);
        if (step < 3) timerRef.current = setTimeout(reveal, 260);
      };
      timerRef.current = setTimeout(reveal, 80);
    }, 1400);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const complexityColor =
    estimate?.complexity === 'High'
      ? 'text-red-500'
      : estimate?.complexity === 'Medium'
      ? 'text-yellow-500'
      : 'text-green-500';

  return (
    <div className="space-y-4">
      {/* Sample prompts */}
      <div className="space-y-1">
        {SAMPLE_PROMPTS.map((s, i) => (
          <button
            key={i}
            onClick={() => { setInput(s); setEstimate(null); setShown(0); }}
            className="w-full text-left text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted/50 transition-colors truncate"
          >
            <span className="text-primary/60 mr-1">→</span>
            {s}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Describe your project idea…"
          className="flex-1 text-sm bg-muted/30 border border-border rounded-lg px-3 py-2 resize-none h-16 focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          onClick={handleEstimate}
          disabled={!input.trim() || loading}
          className="self-end px-3 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-40 hover:bg-primary/90 transition-all"
          aria-label="Generate estimate"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Results */}
      {estimate && (
        <div className="space-y-2 text-sm">
          {shown >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex-1 bg-muted/40 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Complexity</div>
                <div className={`font-bold ${complexityColor}`}>{estimate.complexity}</div>
              </div>
              <div className="flex-1 bg-muted/40 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                <div className="font-bold">{estimate.timeline}</div>
              </div>
            </motion.div>
          )}
          {shown >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-muted/40 rounded-lg p-3"
            >
              <div className="text-xs text-muted-foreground mb-2">Recommended Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {estimate.stack.map(tech => (
                  <span
                    key={tech}
                    className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
          {shown >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-muted/40 rounded-lg p-3"
            >
              <div className="text-xs text-muted-foreground mb-2">Key Risks</div>
              <ul className="space-y-1">
                {estimate.risks.map(risk => (
                  <li key={risk} className="text-xs flex items-start gap-1.5">
                    <span className="text-yellow-500 mt-0.5">⚠</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

// ======================================================
// IDEA 3 — "Automation Pipeline": idea → ship in hours
// ======================================================

const PIPELINE_STEPS = [
  {
    label: 'Idea',
    emoji: '💡',
    detail:
      'Capture the problem in plain language. No tech jargon — AI handles the translation.',
  },
  {
    label: 'Prompt',
    emoji: '✍️',
    detail:
      'Shape the idea into a structured prompt. Specificity beats verbosity every time.',
  },
  {
    label: 'Generate',
    emoji: '🤖',
    detail:
      'Cursor or Claude Code writes the first pass. Usually 80% there in minutes, not days.',
  },
  {
    label: 'Refine',
    emoji: '🔁',
    detail:
      'Run it, break it, fix it. AI handles tedious edge cases; I handle the nuanced ones.',
  },
  {
    label: 'Ship',
    emoji: '🚀',
    detail:
      'Deploy with confidence. Idea → live product in hours, not weeks.',
  },
];

const AutomationPipelineDemo = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runPipeline = () => {
    if (animating) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setAnimating(true);
    setActiveStep(null);

    let step = 0;
    const advance = () => {
      setActiveStep(step);
      step++;
      if (step < PIPELINE_STEPS.length) {
        timerRef.current = setTimeout(advance, 620);
      } else {
        timerRef.current = setTimeout(() => setAnimating(false), 500);
      }
    };
    advance();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="space-y-5">
      {/* Node row */}
      <div className="flex items-center justify-between gap-1">
        {PIPELINE_STEPS.map((step, idx) => (
          <React.Fragment key={step.label}>
            <button
              onClick={() =>
                !animating &&
                setActiveStep(activeStep === idx ? null : idx)
              }
              className="flex flex-col items-center gap-1 group"
              aria-label={`View step: ${step.label}`}
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 ${
                  activeStep === idx
                    ? 'border-primary bg-primary/10 scale-110'
                    : activeStep !== null && idx < activeStep
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-border bg-muted/30 group-hover:border-primary/30'
                }`}
                animate={activeStep === idx ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {step.emoji}
              </motion.div>
              <span
                className={`text-[10px] font-medium ${
                  activeStep === idx
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </button>
            {idx < PIPELINE_STEPS.length - 1 && (
              <div className="flex-1 h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      activeStep !== null && idx < activeStep ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step detail panel */}
      <div className="min-h-[64px]">
        <AnimatePresence mode="wait">
          {activeStep !== null && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-muted/40 rounded-xl p-4 text-sm text-muted-foreground leading-relaxed border border-border/50"
            >
              <span className="font-medium text-foreground mr-2">
                {PIPELINE_STEPS[activeStep].emoji}{' '}
                {PIPELINE_STEPS[activeStep].label}:
              </span>
              {PIPELINE_STEPS[activeStep].detail}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Run button */}
      <button
        onClick={runPipeline}
        disabled={animating}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted/20 transition-all duration-300 disabled:opacity-50"
      >
        {animating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Running pipeline…
          </>
        ) : (
          <>
            <ArrowRight className="h-4 w-4" />
            Run pipeline simulation
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground/50">
        Click any node to inspect — or run the full simulation
      </p>
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
      "What if your portfolio could talk? An AI assistant trained on your background answers visitor questions in real time — replacing the wall-of-text 'about me' with a live dialogue. No more hoping people scroll far enough.",
    DemoComponent: AskRodneyDemo,
  },
  {
    id: 'estimator',
    number: '02',
    icon: '📐',
    title: 'AI Project Estimator',
    tagline: 'Drop an idea. Get a blueprint.',
    description:
      "Describe any project in plain English and the AI returns a complexity score, timeline, tech stack, and risk flags — instantly. A tool I built to streamline the scoping calls that waste everyone's time.",
    DemoComponent: ProjectEstimatorDemo,
  },
  {
    id: 'pipeline',
    number: '03',
    icon: '⚡',
    title: 'Automation Pipeline',
    tagline: 'Automating the automation.',
    description:
      'A visual walkthrough of how I go from raw idea to shipped product using AI at every step. Cursor writes, Claude refines, I steer. The result: products that used to take weeks now take hours.',
    DemoComponent: AutomationPipelineDemo,
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
