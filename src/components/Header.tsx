
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

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
      "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 flex justify-between items-center",
      isScrolled ? "bg-background/90 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold"
      >
        Rodney Gainous Jr.
      </motion.h1>
      <motion.nav 
        className="hidden md:flex space-x-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href="#projects" className="nav-link font-medium">Projects</a>
        <a href="#writing" className="nav-link font-medium">Writing</a>
        <a href="#about" className="nav-link font-medium">About</a>
        <a href="#contact" className="nav-link font-medium">Contact</a>
      </motion.nav>
      <div className="md:hidden">
        {/* Mobile menu button could be added here in future */}
      </div>
    </header>
  );
};

export default Header;
