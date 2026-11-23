import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectFilter from '@/components/ProjectFilter';
import { ExternalLink, Github, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';


function trackWorkWithMe(event: 'work_with_me_view' | 'work_with_me_click') {
  if (import.meta.env.MODE === 'pages') return;

  const body = JSON.stringify({ event });
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/cta-event', blob);
    return;
  }
  void fetch('/api/cta-event', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  });
}

// --- Filtered and Enhanced Project Data ---
const projects = [
  {
    title: "Vouch",
    inspiration: "How can useful conversations carry a little more accountability?",
    description: "A lightweight Chrome extension for PGP identities, signed contributions, and explicit vouches. Anyone can check a shared verification link without signing up. Early access starts with Hacker News.",
    demoUrl: "https://vouch.rodneygainous.com",
    githubUrl: null,
    demoLabel: "Try Vouch",
    icon: '✓',
    tech: "TypeScript • Chrome Extension • OpenPGP • Privacy"
  },
  {
    title: "Nearby Awareness",
    inspiration: "How can people understand which nearby devices might have a camera or microphone?",
    description: "A phone app concept for explaining possible device matches from wireless signals and visual clues. It is in the planning stage; no scanner or app has been built yet.",
    demoUrl: null,
    githubUrl: null,
    icon: '📡',
    tech: "Product Concept • Mobile • Privacy"
  },
  {
    title: "Phantom Audio Lab",
    inspiration: "How can developers test audio delivery before connecting a microphone?",
    description: "An open-source audio transport lab with a Python sender and receiver. It streams a generated tone over a local WebSocket and reports missing or duplicate frames without recording anyone.",
    demoUrl: null,
    githubUrl: "https://github.com/rodneyg/phantom-audio-lab",
    demoLabel: "View on GitHub",
    icon: '🎙️',
    tech: "Python • WebSockets • PCM Audio • Testing"
  },
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
    demoUrl: "https://v0-human-truths-through-metaphor.vercel.app",
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
    demoUrl: "https://safedose.rodneygainous.com/",
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
    inspiration: "What if you could ask a question about a chart or image without leaving the tab?",
    description: "Ask AI about any part of your screen. Chrome extension, bring your own OpenAI key.",
    demoUrl: "https://screenhawk.rodneygainous.com",
    githubUrl: "https://github.com/rodneyg/ScreenHawk",
    demoLabel: "View on GitHub",
    iconImage: `${import.meta.env.BASE_URL}screenhawk-icon.png`,
    tech: "Chrome Extension • TypeScript • OpenAI Vision"
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

  useEffect(() => {
    trackWorkWithMe('work_with_me_view');
  }, []);

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
          <div className="mt-6">
            <Button asChild>
              <a
                href="#contact"
                onClick={() => {
                  trackWorkWithMe('work_with_me_click');
                }}
              >
                Work with me
              </a>
            </Button>
          </div>
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
                className="enhanced-card group relative flex aspect-square overflow-hidden rounded-2xl p-5"
              >
                {/* Project Details */}
                <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                   {/* Icon + Title */}
                   <div className="mb-4 flex items-start gap-3">
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xl ring-1 ring-black/10 dark:ring-white/10"
                        aria-hidden="true"
                      >
                        {project.iconImage ? (
                          <img src={project.iconImage} alt="" width={24} height={24} />
                        ) : (
                          project.icon || '💡'
                        )}
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
