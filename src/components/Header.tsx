
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import MobileNav from '@/components/MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 pt-[calc(1rem+env(safe-area-inset-top))] transition-[background-color,box-shadow,border-color] duration-200",
      isScrolled ? "border-b bg-background/95 shadow-sm" : "bg-transparent"
    )}>
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold md:text-2xl"
      >
        Rodney Gainous Jr.
      </motion.h1>
      <motion.nav 
        className="hidden items-center gap-8 md:flex"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href="#projects" className="nav-link font-medium">Projects</a>
        <a href="#ai-research" className="nav-link font-medium">Research</a>
        <a href="#experience" className="nav-link font-medium">Experience</a>
        <a href="#writing" className="nav-link font-medium">Writing</a>
        <a href="#podcast" className="nav-link font-medium">Podcast</a>
        <a href="#contact" className="nav-link font-medium">Contact</a>
      </motion.nav>
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <MobileNav isScrolled={isScrolled} />
      </motion.div>
    </header>
  );
};

export default Header;
