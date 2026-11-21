
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3 
            className="text-4xl font-bold mb-12 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-muted-foreground">Me</span>
          </motion.h3>
          
          <motion.div
            className="space-y-8 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p>
              I’m a Detroit-born engineer. I started writing Java bots at 13, shipped products at Bird and Ford, and went on to found <span className="font-medium text-foreground">Safe</span>, a venture-backed security startup.
            </p>
            <p>
              Now I build products with AI and test how models behave when they’re part of a real workflow. I use Claude Code and Cursor in my own work. I’ve worked on production AI agents, including classifying failures so the system knows when to stop retrying and when to escalate.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
