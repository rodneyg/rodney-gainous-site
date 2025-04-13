import React from 'react';
import { motion } from 'framer-motion';
// Assuming you have an icon library like react-icons
// import { FiGithub, FiExternalLink, FiEye, FiCpu } from 'react-icons/fi'; // Example icons

// --- Filtered and Enhanced Project Data ---
const projects = [
  {
    title: "Reddit Post Time Analyzer",
    inspiration: "I noticed myself guessing the 'right' time to share something on Reddit, often feeling like it got lost. I wondered: could data reveal the actual peak engagement moments for any community?",
    description: "An analyzer that digs into subreddit activity to find the optimal posting times based on recent engagement data. Visualizes insights with heatmaps and offers GPT-powered suggestions.",
    demoUrl: "https://reddit-analytics-nu.vercel.app/",
    githubUrl: "https://github.com/rodneyg/reddit-analytics",
    icon: '📊' // Simple emoji icon placeholder
  },
  {
    title: "SafeDose",
    inspiration: "The potential for tiny errors in medication dosing leading to significant harm felt unacceptable. I envisioned a visual guide, an AI safety layer directly on the syringe itself, to prevent overdose.",
    description: "An AI-powered visual assistant for syringe dosing. It guides users to draw the correct amount, aiming to drastically reduce errors. Open-source and designed with clinical readiness in mind.",
    demoUrl: "https://safedoseai.com/", // Updated URL
    githubUrl: "https://github.com/rodneyg/SafeDose", // Updated URL
    icon: '💉'
  },
  {
    title: "Did TikTok Get Banned?",
    inspiration: "Amidst constant speculation and confusing headlines, the simple question 'Is TikTok banned *right now*?' lacked a clear, immediate answer. I wanted to create that definitive, single-source status check.",
    description: "A minimalist, single-purpose site that directly answers whether TikTok is currently banned in the US, cutting through the noise with a clear status.",
    demoUrl: "https://www.didtiktokgetbanned.com/",
    githubUrl: "https://github.com/rodneyg/tiktok-ban-site",
    icon: '🚫'
  },
  {
    title: "ScreenHawk",
    inspiration: "How many times do we screenshot complex charts, UIs, or data visualizations and wish we could just *ask* the image questions? I wanted a way to directly query the visual content of my screen.",
    description: "A Chrome extension leveraging GPT-4 Vision to analyze screenshots. Capture any part of a webpage and instantly ask questions about its content for rapid visual reasoning.",
    demoUrl: null, // No live demo link provided
    githubUrl: "https://github.com/rodneyg/ScreenHawk", // Updated URL
    demoLabel: "View on GitHub", // Specific label since no demo
    icon: '🦅'
  },
  {
    title: "TempleToss",
    inspiration: "There's a specific kind of mental flow state found in simple, rewarding loops. I felt the need to craft a minimalist game focused purely on that satisfying cycle of action, feedback, and dopamine.",
    description: "A deliberately simple mobile game built for focused engagement and satisfying feedback loops. Minimalist aesthetic meets subtle backend mechanics for pure flow.",
    demoUrl: "https://temple-toss.vercel.app/",
    githubUrl: "https://github.com/rodneyg/TempleToss", // Updated URL
    icon: '🎯'
  }
];

// --- Refactored Projects Section Component ---
const ProjectsNarrative = () => {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto" // Wider max-width for side-by-side layout
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
            Sparks & Responses
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-serif italic">
            Every tool starts with a question, an itch, an observation. Below are explorations born from noticing something... and deciding to build.
          </p>
        </motion.div>

        {/* Project Entries */}
        <div className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} // Slide in from alternating sides
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`md:grid md:grid-cols-12 md:gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`} // Alternating layout using grid-flow
            >
              {/* --- The Spark (Inspiration) --- */}
              <div className={`md:col-span-5 ${index % 2 !== 0 ? 'md:col-start-8' : ''} mb-6 md:mb-0`}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
                   {/* Decorative element */}
                   <span className="absolute -top-3 -left-3 text-4xl opacity-10" aria-hidden="true">
                    {/* <FiEye /> */} {/* Placeholder for an 'observation' icon */}
                    👀
                   </span>
                   <p className="text-gray-600 italic leading-relaxed">
                     {project.inspiration}
                   </p>
                </div>
              </div>

              {/* --- The Response (Project Details) --- */}
              <div className={`md:col-span-7 ${index % 2 !== 0 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                 {/* Icon + Title */}
                 <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl" aria-hidden="true">{project.icon || '💡'}</span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-primary">
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
                      {/* <FiExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" /> */}
                      <span className="inline-block w-4 h-4">🔗</span>
                      Explore Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                      {/* <FiGithub className="w-4 h-4 group-hover:scale-110 transition-transform" /> */}
                      <span className="inline-block w-4 h-4">💻</span>
                      {project.demoLabel || 'View Source'} {/* Use specific label if provided */}
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

export default ProjectsNarrative;