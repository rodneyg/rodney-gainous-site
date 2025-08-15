
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="py-12 px-6 border-t"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="text-muted-foreground">
            <div>&copy; {currentYear} Rodney Gainous Jr. All rights reserved.</div>
            <div className="text-sm mt-1">Built with Next.js, React Native (mobile), Tailwind, and MDX. Deployed with Vercel preview builds on every pull request.</div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#writing" className="text-muted-foreground hover:text-foreground transition-colors">Writing</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
