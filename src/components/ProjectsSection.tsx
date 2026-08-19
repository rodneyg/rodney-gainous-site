import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectFilter from '@/components/ProjectFilter';
import { ExternalLink, Github, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Filtered and Enhanced Project Data ---
const projects = [
  {
    title: "AutoFighterPro",
    inspiration: "I built my first software business at 13 by turning repetitive RuneScape gameplay into a reliable automation product.",
    description: "Built at 13, AutoFighterPro automated RuneScape combat, looting, healing, and banking. It grew into a software business that generated roughly $500K in revenue.",
    demoUrl: null,
    githubUrl: "https://github.com/rodneyg/AutoFighterPro",
    demoLabel: "Source",
    icon: '⚔️',
    tech: "Java • Swing • Automation • State Machines"
  },
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // Extract all technologies from projects
  const availableTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      if (project.tech) {
        project.tech.split('•').forEach(tech => {
          techs.add(tech.trim());
        });
      }
    });
    return Array.from(techs).sort();
  }, []);

  // Filter projects based on search term and selected technologies
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter
      const matchesSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.inspiration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tech && project.tech.toLowerCase().includes(searchTerm.toLowerCase()));

      // Technology filter
      const matchesTech = selectedTechs.length === 0 ||
        selectedTechs.some(tech => project.tech && project.tech.includes(tech));

      return matchesSearch && matchesTech;
    });
  }, [searchTerm, selectedTechs]);

  return (
    <section id="projects" className="px-6 py-20 md:py-24">
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
            Projects That Started With Questions
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Every tool I create begins with a question or observation. Here are some problems I noticed and decided to solve.
          </p>
        </motion.div>

        {/* Project Filter */}
        <ProjectFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTechs={selectedTechs}
          setSelectedTechs={setSelectedTechs}
          availableTechs={availableTechs}
          totalProjects={projects.length}
          filteredCount={filteredProjects.length}
        />

        {/* Project Entries */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm sm:col-span-2 xl:col-span-3"
            >
              <SearchX className="mx-auto mb-4 size-10 text-muted-foreground" aria-hidden="true" />
              <h3 className="mb-2 text-2xl font-bold">No projects found</h3>
              <p className="mx-auto mb-6 max-w-md text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTechs([]);
                }}
                variant="outline"
              >
                Clear all filters
              </Button>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="enhanced-card group relative flex aspect-square overflow-hidden rounded-2xl border border-border/60 p-5 shadow-sm"
              >
                {/* Project Details */}
                <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                   {/* Icon + Title */}
                   <div className="mb-4 flex items-start gap-3">
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xl ring-1 ring-black/10 dark:ring-white/10"
                        aria-hidden="true"
                      >
                        {project.icon || '💡'}
                      </span>
                      <h3 className="pt-1 text-balance text-xl font-bold md:text-2xl">
                          {project.title}
                      </h3>
                   </div>
                  
                  {/* Description */}
                  <p className="line-clamp-4 text-pretty text-sm leading-6 text-foreground/80 md:text-base">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  {project.tech && (
                    <div className="mt-4 rounded-lg bg-muted/60 px-3 py-2 ring-1 ring-black/5 dark:ring-white/10">
                      <p className="line-clamp-2 text-xs font-medium leading-5 text-muted-foreground">
                        {project.tech}
                      </p>
                    </div>
                  )}
                  
                  {/* Links */}
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
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
                        {project.demoLabel || 'Source'}
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsNarrative;
