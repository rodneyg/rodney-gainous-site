import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

const TechStackBlock = () => {
  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div 
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="mb-12 text-center text-4xl font-bold md:mb-16 md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tech Stack & Methods
        </motion.h2>
        
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <motion.div 
            className="enhanced-card group relative overflow-hidden rounded-2xl border border-border/60 p-6 shadow-sm md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="relative z-10">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                <span 
                  className="flex size-10 items-center justify-center rounded-lg bg-muted text-2xl ring-1 ring-black/10 dark:ring-white/10"
                  aria-hidden="true"
                >
                  📈
                </span>
                Impact
              </h3>
              <p className="text-base leading-8 md:text-lg">
                Personally shipped products that crossed{' '}
                <span className="text-xl font-bold text-foreground tabular-nums">
                  <AnimatedCounter value={250} suffix="K+ installs" />
                </span>
                {' '}and contributed professionally to early mobile apps that now serve{' '}
                <span className="text-xl font-bold text-foreground">
                  millions of users
                </span>
                {' '}on iOS and Android.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="enhanced-card group relative overflow-hidden rounded-2xl border border-border/60 p-6 shadow-sm md:p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <h3 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                <span 
                  className="flex size-10 items-center justify-center rounded-lg bg-muted text-2xl ring-1 ring-black/10 dark:ring-white/10"
                  aria-hidden="true"
                >
                  ⚡
                </span>
                Stack
              </h3>
              <p className="text-base leading-8 md:text-lg">
                <span className="font-semibold text-foreground">TypeScript everywhere</span> — React, Next.js,{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">React Native (mobile)</span> — Node/Express APIs, Postgres & Firebase realtime, OpenAI-powered CV pipelines. Native mobile with{' '}
                <span className="font-semibold text-orange-700 dark:text-orange-600">Java/Kotlin (Android)</span> &{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">Objective-C/Swift (iOS)</span>. CI/CD via GitHub Actions → Vercel / Netlify / Render. Mobile builds through Expo & TestFlight.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TechStackBlock;
