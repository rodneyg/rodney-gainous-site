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
          TypeScript everywhere—React, Next.js, <strong>React Native</strong>—Node/Express APIs, Postgres & Firebase realtime data, OpenAI & custom computer-vision pipelines, CI/CD via GitHub Actions → Vercel / Netlify / Render. Mobile builds ship through Expo & TestFlight. Early career: native Android (Java/Kotlin) + iOS (Obj-C/Swift).
        </p>
      </motion.div>
    </section>
  );
};

export default TechStackBlock;