
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDown } from "lucide-react";
import EnhancedButton from '@/components/EnhancedButton';

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
        {/* Personal Avatar */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-2xl shadow-primary/10">
              <AvatarImage 
                src="/temp-avatar.jpg" 
                alt="Rodney Gainous - Smiling professional headshot"
                className="object-cover"
              />
              <AvatarFallback className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary/20 to-muted">
                RG
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </motion.div>

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
          <EnhancedButton
            onClick={scrollToProjects}
            size="lg"
            rightIcon={<ArrowDown className="h-6 w-6" />}
          >
            See my work
          </EnhancedButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
