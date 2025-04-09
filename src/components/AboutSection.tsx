
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3 
            className="text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-primary">Me</span>
          </motion.h3>
          
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg mb-6 leading-relaxed">
              I'm a Detroit-born software engineer and entrepreneur. From launching a viral Java bot at 13 to shipping global products at Bird and Ford, my career has been built around risk, clarity, and software leverage. I founded <motion.span 
                whileHover={{ scale: 1.05 }}
                className="font-semibold text-primary"
              >Safe</motion.span> to redefine digital trust and created <motion.span 
                whileHover={{ scale: 1.05 }}
                className="font-semibold text-primary"
              >SafeLab</motion.span> to open-source health infrastructure.
            </p>
            <p className="text-lg font-medium">
              This is the personal command center for everything I make, fund, or break.
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/30 blur-3xl"></div>
      </div>
    </section>
  );
};

export default AboutSection;
