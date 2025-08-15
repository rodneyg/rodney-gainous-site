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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            AI Research & Safety Simulations
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Modeling how intelligent systems fracture under pressure—and prototyping the safeguards to hold the line.
          </p>
        </motion.div>

        {/* Research Project Entries */}
        <div className="space-y-20">
          {aiResearchProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="enhanced-card border border-border/50 rounded-2xl p-10 relative overflow-hidden group"
            >
              {/* Gradient overlay for AI Research emphasis */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.span 
                    className="text-4xl float-animation" 
                    aria-hidden="true"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.icon || '🧠'}
                  </motion.span>
                  <h3 className="text-3xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                </div>
                
                {/* Insight */}
                <blockquote className="text-muted-foreground italic leading-relaxed text-lg border-l-4 border-primary/30 pl-6 py-2 bg-primary/5 rounded-r-lg">
                  {project.insight}
                </blockquote>
                
                {/* Description */}
                <p className="text-lg leading-relaxed text-foreground/90">
                  {project.description}
                </p>
                
                {/* Links */}
                <div className="flex items-center flex-wrap gap-6 pt-4">
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">🔗</span>
                      Explore Simulation
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg">💻</span>
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