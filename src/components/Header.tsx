
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/theme-toggle';
import MobileNav from '@/components/MobileNav';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
        <Link to="/">Rodney Gainous Jr.</Link>
      </motion.h1>
      <motion.nav 
        className="hidden md:flex space-x-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {isHomePage ? (
          <>
            <a href="#projects" className="nav-link font-medium">Projects</a>
            <a href="#writing" className="nav-link font-medium">Writing</a>
            <a href="#about" className="nav-link font-medium">About</a>
            <a href="#experience" className="nav-link font-medium">Experience</a>
            <a href="#contact" className="nav-link font-medium">Contact</a>
          </>
        ) : (
          <>
            <Link to="/#projects" className="nav-link font-medium">Projects</Link>
            <Link to="/#writing" className="nav-link font-medium">Writing</Link>
            <Link to="/#about" className="nav-link font-medium">About</Link>
            <Link to="/#experience" className="nav-link font-medium">Experience</Link>
            <Link to="/#contact" className="nav-link font-medium">Contact</Link>
          </>
        )}
        <Link to="/blog" className="nav-link font-medium">Blog</Link>
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
