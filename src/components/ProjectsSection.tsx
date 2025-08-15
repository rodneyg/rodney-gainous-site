import React from 'react';
import { motion } from 'framer-motion';
// Assuming you have an icon library like react-icons
// import { FiGithub, FiExternalLink, FiEye, FiCpu } from 'react-icons/fi'; // Example icons

// --- Filtered and Enhanced Project Data ---
const projects = [
  {
    title: "SeenClearly",
    inspiration: "Complex truths often hide in plain sight. What if we could crystallize profound lessons into single, undeniable visual insights—instantly understood and impossible to forget?",
    description: "A platform that generates clear, impactful visuals paired with concise truths about life, relationships, and human behavior. Each image distills complexity into immediate visual clarity, designed for rapid insight and sharing.",
    demoUrl: "https://seenclearly.com",
    githubUrl: null, // Private repository or not yet public
    demoLabel: "See Clearly",
    icon: '🔍',
    tech: "React • NextJS • TailwindCSS • OpenAI • Vercel"
  },
  {
    title: "Reddit Post Time Analyzer",
    inspiration: "I noticed myself guessing the 'right' time to share something on Reddit, often feeling like it got lost. I wondered: could data reveal the actual peak engagement moments for any community?",
    description: "An analyzer that digs into subreddit activity to find the optimal posting times based on recent engagement data. Visualizes insights with heatmaps and offers GPT-powered suggestions.",
    demoUrl: "https://reddit-analytics-nu.vercel.app/",
    githubUrl: "https://github.com/rodneyg/reddit-analytics",
    icon: '📊', // Simple emoji icon placeholder
    tech: "React • NextJS • TypeScript • Reddit API • GPT-4 • Vercel"
  },
  {
    title: "SafeDose",
    inspiration: "The potential for tiny errors in medication dosing leading to significant harm felt unacceptable. I envisioned a visual guide, an AI safety layer directly on the syringe itself, to prevent overdose.",
    description: "An AI-powered visual assistant for syringe dosing. It guides users to draw the correct amount, aiming to drastically reduce errors. Open-source and designed with clinical readiness in mind.",
    demoUrl: "https://safedoseai.com/", // Updated URL
    githubUrl: "https://github.com/rodneyg/SafeDose", // Updated URL
    icon: '💉',
    tech: "React Native • Expo • TypeScript • OpenAI Vision • Firebase"
  },
  {
    title: "Did TikTok Get Banned?",
    inspiration: "Amidst constant speculation and confusing headlines, the simple question 'Is TikTok banned *right now*?' lacked a clear, immediate answer. I wanted to create that definitive, single-source status check.",
    description: "A minimalist, single-purpose site that directly answers whether TikTok is currently banned in the US, cutting through the noise with a clear status.",
    demoUrl: "https://www.didtiktokgetbanned.com/",
    githubUrl: "https://github.com/rodneyg/tiktok-ban-site",
    icon: '🚫',
    tech: "React • NextJS • TailwindCSS • Vercel"
  },
  {
    title: "ScreenHawk",
    inspiration: "How many times do we screenshot complex charts, UIs, or data visualizations and wish we could just *ask* the image questions? I wanted a way to directly query the visual content of my screen.",
    description: "A Chrome extension leveraging GPT-4 Vision to analyze screenshots. Capture any part of a webpage and instantly ask questions about its content for rapid visual reasoning.",
    demoUrl: null, // No live demo link provided
    githubUrl: "https://github.com/rodneyg/ScreenHawk", // Updated URL
    demoLabel: "View on GitHub", // Specific label since no demo
    icon: '🦅',
    tech: "Chrome Extension • JavaScript • GPT-4 Vision • OpenAI"
  },
  {
    title: "TempleToss",
    inspiration: "There's a specific kind of mental flow state found in simple, rewarding loops. I felt the need to craft a minimalist game focused purely on that satisfying cycle of action, feedback, and dopamine.",
    description: "A deliberately simple mobile game built for focused engagement and satisfying feedback loops. Minimalist aesthetic meets subtle backend mechanics for pure flow.",
    demoUrl: "https://temple-toss.vercel.app/",
    githubUrl: "https://github.com/rodneyg/TempleToss", // Updated URL
    icon: '🎯',
    tech: "React Native • Expo • TypeScript • Firebase • Vercel"
  }
];

// --- Refactored Projects Section Component ---
const ProjectsNarrative = () => {
  return (
    <section id="projects" className="py-32 px-6">
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
          Projects That Started With Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
           Every tool I create begins with a question or observation. Here are some problems I noticed and decided to solve.
          </p>
        </motion.div>

        {/* Project Entries */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-border rounded-xl p-8"
            >
              {/* Project Details */}
              <div className="space-y-6">
                 {/* Icon + Title */}
                 <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl" aria-hidden="true">{project.icon || '💡'}</span>
                    <h3 className="text-2xl font-semibold">
                        {project.title}
                    </h3>
                 </div>
                
                {/* Inspiration */}
                <p className="text-muted-foreground italic leading-relaxed">
                  {project.inspiration}
                </p>
                
                {/* Description */}
                <p className="text-lg leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                {project.tech && (
                  <p className="text-sm text-muted-foreground">
                    {project.tech}
                  </p>
                )}
                
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
                      Explore Live
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
                      {project.demoLabel || 'View Source'}
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