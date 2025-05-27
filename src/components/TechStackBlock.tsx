import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

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
        <Card className="rounded-xl shadow-sm bg-muted/40 px-8 py-10 max-w-4xl mx-auto">
          <div className="md:flex md:gap-8">
            <p className="text-lg text-muted-foreground flex-1 max-w-[80ch]">
              <strong>Impact:</strong> Personally shipped products that crossed <strong>250 K+ installs</strong> and contributed professionally to early mobile apps that now serve <strong>millions of users</strong> on iOS and Android.
            </p>
            <p className="text-lg text-muted-foreground flex-1 mt-4 md:mt-0 max-w-[80ch]">
              <strong>Stack:</strong> TypeScript everywhere — React, Next.js, <strong>React Native (mobile)</strong> — Node/Express APIs, Postgres &amp; Firebase realtime, OpenAI-powered CV pipelines. CI/CD via GitHub Actions → Vercel / Netlify / Render. Mobile builds through Expo &amp; TestFlight.
            </p>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default TechStackBlock;