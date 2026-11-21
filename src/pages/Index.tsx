
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AIResearchSection from '@/components/AIResearchSection';
import SafeLabSection from '@/components/SafeLabSection';
import PodcastSection from '@/components/PodcastSection';
import YouTubeSection from '@/components/YouTubeSection';
import UnsplashSection from '@/components/UnsplashSection';
import ProjectsSection from '@/components/ProjectsSection';
import WritingSection from '@/components/WritingSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import TechStackBlock from '@/components/TechStackBlock';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  // Smooth scroll to section when URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <Hero />
        <TechStackBlock />
        <ProjectsSection />
        <AIResearchSection />
        <SafeLabSection />
        <ExperienceSection />
        <WritingSection />
        <PodcastSection />
        <YouTubeSection />
        <UnsplashSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
