
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { Beaker, Shield } from "lucide-react";

const SafeLabSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-slate-50/70">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Beaker className="h-6 w-6 text-primary" />
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SafeLab
          </motion.h2>
          <Shield className="h-6 w-6 text-primary" />
        </div>
        
        <Separator className="my-6 max-w-[120px] mx-auto bg-primary/30" />
        
        <motion.div 
          className="space-y-6 text-center"
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
