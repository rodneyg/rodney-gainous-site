
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-6 bg-slate-50">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-semibold mb-8">About Me</h3>
        <p className="text-lg mb-6">
          I'm a Detroit-born software engineer and entrepreneur. From launching a viral Java bot at 13 to shipping global products at Bird and Ford, my career has been built around risk, clarity, and software leverage. I founded <strong>Safe</strong> to redefine digital trust and created <strong>SafeLab</strong> to open-source health infrastructure.
        </p>
        <p className="text-lg font-medium">
          This is the personal command center for everything I make, fund, or break.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
