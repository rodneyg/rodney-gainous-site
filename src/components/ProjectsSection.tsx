
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const projects = [
  {
    title: "SafeDose",
    description: "AI-powered syringe dosing assistant. Visual UI guides and protects users from overdose. Open-source. Clinical-ready.",
    image: "/placeholder.svg",
    demoUrl: "https://safedose.healthtools.ai",
    githubUrl: "https://github.com/saferlab/safedose"
  },
  {
    title: "Dosis",
    description: "Open-source animal-to-human equivalent dose calculator for drug research, translating trial data across species and administration routes.",
    image: "/placeholder.svg",
    demoUrl: "#",
    githubUrl: "https://github.com/saferlab/dosis",
    demoLabel: "Try Now"
  },
  {
    title: "Reconstitute",
    description: "A guided calculator providing instructions on how to mix powder and liquid medications (peptides, hormones, antibiotics).",
    image: "/placeholder.svg",
    demoUrl: "#",
    githubUrl: "https://github.com/saferlab/reconstitute",
    demoLabel: "Calculate"
  },
  {
    title: "Blood Interpreter",
    description: "Upload lab results, decode values using clinical/AI insights, and highlight actionable ranges. Coming Soon.",
    image: "/placeholder.svg",
    demoUrl: "#",
    demoLabel: "Coming Soon"
  },
  {
    title: "HealthTools.ai",
    description: "A storefront and distribution base; a curated directory of SafeLab and potentially community-submitted health, AI, and privacy tools.",
    image: "/placeholder.svg",
    demoUrl: "https://healthtools.ai",
    demoLabel: "Visit"
  },
  {
    title: "FlowBot",
    description: "SMS-based tracker for monitoring daily flow state (clarity, tension, energy) to quantify performance and correlate with behaviors or dosing.",
    image: "/placeholder.svg",
    demoUrl: "#",
    demoLabel: "Try Now"
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
  const [activeTab, setActiveTab] = useState('all');
  const categories = ['all', 'open-source', 'AI', 'health', 'experiments'];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => {
        // Filter logic based on project categories
        if (activeTab === 'open-source') return project.githubUrl;
        if (activeTab === 'AI') return project.title.includes('AI') || project.description.includes('AI') || 
          ['JustTalk', 'ScreenHawk', 'SafeDose', 'Blood Interpreter'].includes(project.title);
        if (activeTab === 'health') return ['SafeDose', 'Dosis', 'Reconstitute', 'Blood Interpreter', 'HealthTools.ai'].includes(project.title);
        if (activeTab === 'experiments') return ['TempleToss', 'Letters to Luigi', 'Redflagged', 'FlowBot'].includes(project.title);
        return false;
      });

  return (
    <section id="projects" className="py-28 px-6 bg-slate-50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h3 
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured <span className="text-primary">Projects</span>
        </motion.h3>
        
        <motion.p 
          className="text-xl text-center mb-12 text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A showcase of my work building products that solve real problems
        </motion.p>

        {/* Category filters */}
        <motion.div 
          className="flex justify-center flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all ${
                activeTab === category 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary hover:bg-secondary/70'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Mobile view: Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {filteredProjects.map((project, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <ProjectCard {...project} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>

        {/* Desktop view: Grid */}
        <motion.div 
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No projects in this category yet.</p>
        )}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
