
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import WritingSection from '@/components/WritingSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProjectsSection />
        <WritingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
