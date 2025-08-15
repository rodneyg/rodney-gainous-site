
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { Beaker, Shield } from "lucide-react";

const SafeLabSection = () => {
  return (
    <section className="py-32 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          SafeLab
        </motion.h2>
        
        <motion.div 
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            SafeLab is my personal R&D environment where I prototype open-source tools at the intersection of AI, health technology, and security. It's where ideas take tangible form before reaching the wider world.
          </p>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Some projects remain experimental proofs-of-concept, while others evolve into full products like SafeDose. The lab serves as a proving ground for tools that should exist but don't yet—filling gaps where technology can enhance health, safety, and digital autonomy.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SafeLabSection;
