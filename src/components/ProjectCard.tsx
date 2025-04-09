
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
      className="group overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="overflow-hidden h-56 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h4 className="font-bold text-2xl mb-2 group-hover:text-primary transition-colors duration-300">{title}</h4>
        <p className="text-muted-foreground mb-6 line-clamp-2">{description}</p>
        <div className="flex gap-3">
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
