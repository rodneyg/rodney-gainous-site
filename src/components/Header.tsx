
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

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
      isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <h1 className="text-2xl font-bold">Rodney Gainous Jr.</h1>
      <nav className="space-x-6">
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#writing" className="nav-link">Writing</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
