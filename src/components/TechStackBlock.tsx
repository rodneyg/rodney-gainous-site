import React from 'react';
import { motion } from 'framer-motion';

const TechStackBlock = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-5">Tech Stack & Methods</h2>
        <p className="text-lg text-muted-foreground max-w-[75ch]">
          Early career: native Android (Java ➜ Kotlin) &amp; iOS (Obj-C ➜ Swift) — shipped 100K+ installs.
          Now: TypeScript everywhere — React, Next.js, React Native (mobile) — Node/Express APIs, Postgres &amp; Firebase realtime, OpenAI-powered CV pipelines. CI/CD via GitHub Actions ➜ Vercel / Netlify / Render. Mobile builds through Expo &amp; TestFlight.
        </p>
      </motion.div>
    </section>
  );
};

export default TechStackBlock;