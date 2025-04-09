
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <motion.div 
        className="text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Founder. Engineer.<br />Systems Thinker.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mx-auto mb-8 max-w-3xl">
          I build secure software, health tools, and tech experiments that scale. From Java bots at 13 to founding a venture-backed security startup, I've been solving problems across cybersecurity, AI, healthtech, and digital infrastructure for over a decade.
        </p>
        <Button onClick={scrollToProjects} className="mt-4 px-6 py-6" size="lg">
          See my work <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
