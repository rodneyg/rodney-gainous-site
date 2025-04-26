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
    <section id="ai-research" className="py-24 md:py-32 px-6 bg-gradient-to-tr from-gray-100 to-slate-200 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            AI Research & Safety Simulations
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-serif italic">
            Modeling how intelligent systems fracture under pressure—and prototyping the safeguards to hold the line.
          </p>
        </motion.div>

        {/* Research Project Entries */}
        <div className="space-y-20 md:space-y-28">
          {aiResearchProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`md:grid md:grid-cols-12 md:gap-12 items-start ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}
            >
              {/* Insight Spark */}
              <div className={`md:col-span-5 ${index % 2 !== 0 ? 'md:col-start-8' : ''} mb-6 md:mb-0`}>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 relative">
                   <span className="absolute -top-4 -left-4 text-4xl opacity-10" aria-hidden="true">
                     
                   </span>
                   <p className="text-gray-700 italic leading-relaxed">
                     {project.insight}
                   </p>
                </div>
              </div>

              {/* Research Details */}
              <div className={`md:col-span-7 ${index % 2 !== 0 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" aria-hidden="true">{project.icon || '🧠'}</span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-indigo-800">
                    {project.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-800 mb-5 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-sm">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-800 transition-colors group"
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
                      className="inline-flex items-center gap-1.5 font-medium text-gray-600 hover:text-gray-900 transition-colors group"
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