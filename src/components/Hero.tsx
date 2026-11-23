
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import EnhancedButton from '@/components/EnhancedButton';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView();
  };

  return (
    <section className="relative flex min-h-full items-center justify-center overflow-hidden px-6 py-6">
      <div className="absolute inset-x-0 top-0 h-px bg-border" />

      <motion.div 
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Personal Avatar */}
        <motion.div
          className="mb-5 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          >
            <Avatar className="size-24 border-4 border-background shadow-lg ring-1 ring-black/10 sm:size-32 dark:ring-white/10">
              <AvatarImage 
                src={`${import.meta.env.BASE_URL}temp-avatar.jpg`}
                alt="Rodney Gainous - Smiling professional headshot"
                className="object-cover"
              />
              <AvatarFallback className="bg-muted text-3xl font-bold md:text-4xl">
                RG
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>

        <motion.h2 
          className="mb-5 text-[clamp(2.25rem,8dvh,5rem)] font-bold leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <span>Builder.</span>
          <br />
          <span>Engineer.</span>
          <br />
          <span className="text-muted-foreground font-medium">Problem-solver.</span>
        </motion.h2>
        
        <motion.p 
          className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          I've been building software since I was 13, starting with Java bots and eventually founding my own{' '}
          <span className="text-foreground font-medium">venture-backed security startup</span>. 
          For over a decade, I've tackled challenges across cybersecurity, AI, health technology, and digital infrastructure.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <EnhancedButton
            onClick={scrollToProjects}
            size="lg"
            rightIcon={<ArrowRight className="size-5" />}
          >
            See my work
          </EnhancedButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
