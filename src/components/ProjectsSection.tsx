
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "SafeDose",
    description: "AI-powered syringe dosing assistant. Visual UI guides and protects users from overdose. Open-source. Clinical-ready.",
    image: "/placeholder.svg",
    demoUrl: "https://safedose.healthtools.ai",
    githubUrl: "https://github.com/saferlab/safedose"
  },
  {
    title: "JustTalk",
    description: "Transcribe and convert speech into email, stories, and summaries using Whisper + GPT. Your voice, reformatted.",
    image: "/placeholder.svg",
    demoUrl: "#",
    demoLabel: "Try Now"
  },
  {
    title: "TempleToss",
    description: "Minimalist mobile game with subtle backend flex. Built for flow, fun, and dopamine return loops.",
    image: "/placeholder.svg",
    demoUrl: "#",
    demoLabel: "Play"
  },
  {
    title: "Letters to Luigi",
    description: "Send letters to a prisoner. Read replies. Explore public archives. A platform on justice, raw speech, and moral ambiguity.",
    image: "/placeholder.svg",
    demoUrl: "#",
    demoLabel: "Explore"
  },
  {
    title: "Redflagged",
    description: "View and share anonymous red flags from interviews. Transparent. Filterable. Anonymous accountability layer.",
    image: "/placeholder.svg",
    demoUrl: "#",
    demoLabel: "Submit"
  },
  {
    title: "ScreenHawk",
    description: "Capture any web page screenshot and interrogate it using GPT-4 Vision. Chrome extension for visual reasoning and fast insight.",
    image: "/placeholder.svg",
    demoUrl: "#",
    demoLabel: "Add to Chrome",
    githubUrl: "https://github.com/saferlab/screenhawk"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-semibold mb-12 text-center">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              demoLabel={project.demoLabel}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
