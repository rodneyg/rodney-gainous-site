
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="py-8 px-6 border-t text-center text-muted-foreground"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <div>&copy; {currentYear} Rodney Gainous Jr. All rights reserved.</div>
          <div className="text-sm mt-1">Built with Next.js, React Native (mobile), Tailwind, and MDX. Deployed with Vercel preview builds on every pull request.</div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#writing" className="hover:text-primary transition-colors">Writing</a>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
