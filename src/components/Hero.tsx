
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative bg-gradient-to-b from-transparent to-slate-50/30">
      <motion.div 
        className="text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Builder. Engineer.<br />
          <span className="text-primary">Problem-solver.</span>
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mx-auto mb-10 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I've been building software since I was 13, starting with Java bots and eventually founding my own venture-backed security startup. For over a decade, I've tackled challenges across cybersecurity, AI, health technology, and digital infrastructure. My work focuses on creating secure software, health tools, and experimental tech that scales.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            onClick={scrollToProjects} 
            className="mt-4 px-8 py-7 text-lg group" 
            size="lg"
          >
            See my work 
            <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
};

export default Hero;
