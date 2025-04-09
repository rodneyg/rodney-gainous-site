
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  demoLabel?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  demoUrl, 
  githubUrl,
  demoLabel = "Launch" 
}: ProjectProps) => {
  return (
    <motion.div 
      className="project-card"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="project-image"
        />
      </div>
      <div className="p-6">
        <h4 className="font-bold text-xl mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-3">
          {demoUrl && (
            <Button asChild>
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
