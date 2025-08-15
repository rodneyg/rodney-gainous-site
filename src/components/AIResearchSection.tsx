import React from 'react';
import { motion } from 'framer-motion';

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
  }
];

const AIResearchSection = () => {
  return (
    <section id="ai-research" className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 tracking-tight">
            AI Research & Safety Simulations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modeling how intelligent systems fracture under pressure—and prototyping the safeguards to hold the line.
          </p>
        </motion.div>

        {/* Research Project Entries */}
        <div className="space-y-16">
          {aiResearchProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-border rounded-xl p-8"
            >
              <div className="space-y-6">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl" aria-hidden="true">{project.icon || '🧠'}</span>
                  <h3 className="text-2xl font-semibold">
                    {project.title}
                  </h3>
                </div>
                
                {/* Insight */}
                <p className="text-muted-foreground italic leading-relaxed">
                  {project.insight}
                </p>
                
                {/* Description */}
                <p className="text-lg leading-relaxed">
                  {project.description}
                </p>
                
                {/* Links */}
                <div className="flex items-center flex-wrap gap-6 text-sm">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium hover:text-muted-foreground transition-colors"
                    >
                      <span className="inline-block w-4 h-4">🔗</span>
                      Explore Simulation
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium hover:text-muted-foreground transition-colors"
                    >
                      <span className="inline-block w-4 h-4">💻</span>
                      View Research Code
                    </a>
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