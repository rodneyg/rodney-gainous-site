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
    <section id="ai-research" className="px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-20"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            AI Research & Safety Simulations
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            Modeling how intelligent systems fracture under pressure—and prototyping the safeguards to hold the line.
          </p>
        </motion.div>

        {/* Research Project Entries */}
        <div className="space-y-8 md:space-y-10">
          {aiResearchProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="enhanced-card group relative overflow-hidden rounded-2xl border border-border/60 p-6 shadow-sm md:p-10"
            >
              <div className="relative z-10 space-y-6">
                {/* Icon + Title */}
                <div className="mb-6 flex items-start gap-4">
                  <span 
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl ring-1 ring-black/10 dark:ring-white/10" 
                    aria-hidden="true"
                  >
                    {project.icon || '🧠'}
                  </span>
                  <h3 className="pt-1 text-2xl font-bold md:text-3xl">
                    {project.title}
                  </h3>
                </div>
                
                {/* Insight */}
                <blockquote className="rounded-r-lg border-l-2 border-primary/30 bg-muted/50 py-2 pl-5 text-base italic leading-8 text-muted-foreground md:text-lg">
                  {project.insight}
                </blockquote>
                
                {/* Description */}
                <p className="text-base leading-8 text-foreground/90 md:text-lg">
                  {project.description}
                </p>
                
                {/* Links */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target={project.demoUrl.startsWith('http') ? '_blank' : undefined}
                      rel={project.demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-primary/90 hover:shadow-md"
                      whileTap={{ scale: 0.96 }}
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      {project.demoLabel || 'Explore Simulation'}
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium transition-[background-color,transform] duration-200 hover:bg-muted/50"
                      whileTap={{ scale: 0.96 }}
                    >
                      <Github className="size-4" aria-hidden="true" />
                      View Research Code
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
