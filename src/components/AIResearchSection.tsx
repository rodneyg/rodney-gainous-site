import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

type AIResearchProject = {
  title: string;
  insight: string;
  description: string;
  demoUrl: string;
  demoLabel?: string;
  githubUrl?: string;
  icon: string;
};

const aiResearchProjects = [
  {
    title: "Bias Detection & Security",
    insight: "AI systems are only as safe as their guardrails. What if the AI could detect bias and protect user data before damage is done?",
    description: "A live simulation of an AI assistant designed with transparency-first principles. Detects biased prompts across four axes (leading questions, emotional language, false dichotomies, framing manipulation) and blocks unauthorized personal data access. Features real-time bias tagging, secure memory handling, and interaction verification mechanisms.",
    demoUrl: "https://v0-bias-detection-system.vercel.app/",
    githubUrl: "https://github.com/rodneyg/AI-Safety-1",
    icon: '🛡️'
  },
  {
    title: "Boundary Erosion",
    insight: "Failure often isn’t a sudden collapse—it’s erosion by inches. What if AI could visualize how repeated, subtle prompts gradually fracture its defenses?",
    description: "An interactive demo modeling how conversational AI can be manipulated via incremental prompt shifts. Highlights the vulnerability of compliance-by-accumulation, where no single prompt breaks the rules but the aggregate drift leads to misalignment. Features a Boundary Meter, drift visualization, and reset simulation.",
    demoUrl: "https://v0-interactive-ai-demo.vercel.app/",
    githubUrl: "https://github.com/rodneyg/AI-Safety-2",
    icon: '🧠'
  },
  {
    title: "Code Review Signal vs Noise",
    insight: "If an AI reviewer is told to find problems, will it find real bugs or just make up things to fix?",
    description: "A simple test of AI code review. The demo shows working code, asks an AI to review it, and separates useful fixes from comments that only waste time.",
    demoUrl: "https://ai-code-review-demo-fcvgd0mdi-rodneygs-projects.vercel.app/",
    demoLabel: "Explore Simulation",
    githubUrl: "https://github.com/rodneyg/AI-Research-1",
    icon: 'CR'
  }
] satisfies AIResearchProject[];

const AIResearchSection = () => {
  return (
    <section id="ai-research" className="px-6 py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-12"
        >
          <h2 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
            AI Research & Safety Simulations
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Modeling how intelligent systems fracture under pressure—and prototyping the safeguards to hold the line.
          </p>
        </motion.div>

        {/* Research Project Entries */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aiResearchProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="enhanced-card group relative flex aspect-square overflow-hidden rounded-2xl border border-border/60 p-5 shadow-sm"
            >
              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                {/* Icon + Title */}
                <div className="mb-4 flex items-start gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-lg font-bold ring-1 ring-black/10 dark:ring-white/10"
                    aria-hidden="true"
                  >
                    {project.icon || '🧠'}
                  </span>
                  <h3 className="pt-1 text-balance text-xl font-bold md:text-2xl">
                    {project.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="line-clamp-6 text-pretty text-sm leading-6 text-foreground/80 md:text-base">
                  {project.description}
                </p>
                
                {/* Links */}
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target={project.demoUrl.startsWith('http') ? '_blank' : undefined}
                      rel={project.demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-primary/90 hover:shadow-md"
                      whileTap={{ scale: 0.96 }}
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      Visit
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-[background-color,transform] duration-200 hover:bg-muted/50"
                      whileTap={{ scale: 0.96 }}
                    >
                      <Github className="size-4" aria-hidden="true" />
                      Source
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AIResearchSection;
