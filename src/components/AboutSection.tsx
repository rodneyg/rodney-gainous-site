
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
              I'm a Detroit-born software engineer and entrepreneur. From launching a viral Java bot at 13 to shipping global products at Bird and Ford, my career has been built around risk, clarity, and software leverage. I founded <span className="font-medium text-foreground">Safe</span> to redefine digital trust and created <span className="font-medium text-foreground">SafeLab</span> to open-source health infrastructure.
            </p>
            <p className="font-medium">
              This is the personal command center for everything I make, fund, or break.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
