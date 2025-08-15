import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const TechStackBlock = () => {
  return (
    <section className="py-24 px-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12 tracking-tight">Tech Stack & Methods</h2>
        <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
          <p>
            <span className="text-foreground font-medium">Impact:</span> Personally shipped products that crossed <span className="text-foreground font-medium">250K+ installs</span> and contributed professionally to early mobile apps that now serve <span className="text-foreground font-medium">millions of users</span> on iOS and Android.
          </p>
          <p>
            <span className="text-foreground font-medium">Stack:</span> TypeScript everywhere — React, Next.js, <span className="text-foreground font-medium">React Native (mobile)</span> — Node/Express APIs, Postgres &amp; Firebase realtime, OpenAI-powered CV pipelines. Native mobile with <span className="text-foreground font-medium">Java/Kotlin (Android)</span> &amp; <span className="text-foreground font-medium">Objective-C/Swift (iOS)</span>. CI/CD via GitHub Actions → Vercel / Netlify / Render. Mobile builds through Expo &amp; TestFlight.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default TechStackBlock;