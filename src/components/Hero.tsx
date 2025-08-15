
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20 -z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-5">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-muted/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div 
        className="text-center max-w-5xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9] tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Builder.
          </span>
          <br />
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Engineer.
          </span>
          <br />
          <span className="text-muted-foreground font-medium">Problem-solver.</span>
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mx-auto mb-16 max-w-4xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          I've been building software since I was 13, starting with Java bots and eventually founding my own{' '}
          <span className="text-foreground font-medium">venture-backed security startup</span>. 
          For over a decade, I've tackled challenges across cybersecurity, AI, health technology, and digital infrastructure.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Button 
            onClick={scrollToProjects} 
            className="px-10 py-7 text-xl group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            size="lg"
          >
            <span className="relative z-10">See my work</span>
            <ArrowDown className="ml-3 h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
