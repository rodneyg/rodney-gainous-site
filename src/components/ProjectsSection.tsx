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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Projects That Started With Questions
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
           Every tool I create begins with a question or observation. Here are some problems I noticed and decided to solve.
          </p>
        </motion.div>

        {/* Project Entries */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="enhanced-card border border-border/50 rounded-2xl p-10 relative overflow-hidden group"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-muted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Project Details */}
              <div className="space-y-6 relative z-10">
                 {/* Icon + Title */}
                 <div className="flex items-center gap-4 mb-6">
                    <motion.span 
                      className="text-4xl float-animation" 
                      aria-hidden="true"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.icon || '💡'}
                    </motion.span>
                    <h3 className="text-3xl font-bold tracking-tight">
                        {project.title}
                    </h3>
                 </div>
                
                {/* Inspiration */}
                <blockquote className="text-muted-foreground italic leading-relaxed text-lg border-l-4 border-primary/20 pl-6 py-2">
                  {project.inspiration}
                </blockquote>
                
                {/* Description */}
                <p className="text-lg leading-relaxed text-foreground/90">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                {project.tech && (
                  <div className="bg-muted/30 rounded-lg px-4 py-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {project.tech}
                    </p>
                  </div>
                )}
                
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
                      Explore Live
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
                      {project.demoLabel || 'View Source'}
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

export default ProjectsNarrative;