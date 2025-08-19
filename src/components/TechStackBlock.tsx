import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AnimatedCounter from '@/components/AnimatedCounter';

const TechStackBlock = () => {
  return (
    <section className="py-32 px-6">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-16 tracking-tight text-center bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tech Stack & Methods
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="enhanced-card p-8 rounded-2xl border border-border/50 relative overflow-hidden group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <motion.span 
                  className="text-3xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  📈
                </motion.span>
                Impact
              </h3>
              <p className="text-lg leading-relaxed">
                Personally shipped products that crossed{' '}
                <span className="text-foreground font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  <AnimatedCounter value={250} suffix="K+ installs" />
                </span>
                {' '}and contributed professionally to early mobile apps that now serve{' '}
                <span className="text-foreground font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  millions of users
                </span>
                {' '}on iOS and Android.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="enhanced-card p-8 rounded-2xl border border-border/50 relative overflow-hidden group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <motion.span 
                  className="text-3xl"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  ⚡
                </motion.span>
                Stack
              </h3>
              <p className="text-lg leading-relaxed">
                <span className="font-semibold text-foreground">TypeScript everywhere</span> — React, Next.js,{' '}
                <span className="font-semibold text-purple-600">React Native (mobile)</span> — Node/Express APIs, Postgres & Firebase realtime, OpenAI-powered CV pipelines. Native mobile with{' '}
                <span className="font-semibold text-orange-600">Java/Kotlin (Android)</span> &{' '}
                <span className="font-semibold text-blue-600">Objective-C/Swift (iOS)</span>. CI/CD via GitHub Actions → Vercel / Netlify / Render. Mobile builds through Expo & TestFlight.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TechStackBlock;