
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { motion } from 'framer-motion';

export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  demoLabel?: string;
  tech?: string; // Added tech field for displaying tech stack
}

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  demoUrl, 
  githubUrl,
  demoLabel = "Launch",
  tech
}: ProjectProps) => {
  return (
    <motion.div 
      className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="overflow-hidden h-56 relative">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h4 className="mb-2 text-2xl font-bold transition-colors duration-200 group-hover:text-primary">{title}</h4>
        <p className="text-muted-foreground mb-2 line-clamp-2">{description}</p>
        {tech && (
          <p className="text-sm text-muted-foreground mb-4">Tech: {tech}</p>
        )}
        <div className="flex flex-wrap gap-3">
          {demoUrl && (
            <Button className="flex-1" asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                {demoLabel}
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button variant="outline" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
