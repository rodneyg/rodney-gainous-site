
import React, { useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AIResearchSection from '@/components/AIResearchSection';
import SafeLabSection from '@/components/SafeLabSection';
import ProjectsSection from '@/components/ProjectsSection';
import WritingSection from '@/components/WritingSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import TechStackBlock from '@/components/TechStackBlock';
import Footer from '@/components/Footer';

// Maps anchor section IDs (used in nav links) to their slide index
const SECTION_TO_SLIDE: Record<string, number> = {
  hero: 0,
  tech: 1,
  projects: 2,
  experience: 3,
  safelab: 4,
  'ai-research': 5,
  writing: 6,
  about: 7,
  contact: 8,
};

const TOTAL_SLIDES = Object.keys(SECTION_TO_SLIDE).length;
const SLIDE_TRANSITION_SETTLE_MS = 450;

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const settleTimerRef = useRef<ReturnType<typeof window.setTimeout>>();

  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (container) {
      const nextIndex = Math.max(0, Math.min(index, TOTAL_SLIDES - 1));
      isAnimatingRef.current = true;
      container.scrollTo({ left: nextIndex * window.innerWidth, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Handle initial hash navigation
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const slideIndex = SECTION_TO_SLIDE[id] ?? -1;
      if (slideIndex >= 0) {
        // Small delay lets the DOM finish its initial layout before scrolling
        setTimeout(() => scrollToSlide(slideIndex), 100);
      }
    }

    // Intercept anchor link clicks so hash navigation drives horizontal scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const sectionId = href.substring(1);
      const slideIndex = SECTION_TO_SLIDE[sectionId] ?? -1;
      if (slideIndex >= 0) {
        e.preventDefault();
        scrollToSlide(slideIndex);
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Notify Header about horizontal scroll position
    const handleContainerScroll = () => {
      activeSlideRef.current = Math.round(container.scrollLeft / window.innerWidth);

      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, SLIDE_TRANSITION_SETTLE_MS);

      window.dispatchEvent(
        new CustomEvent('slideScroll', { detail: { scrollLeft: container.scrollLeft } })
      );
    };
    container.addEventListener('scroll', handleContainerScroll, { passive: true });

    // Mouse wheel: translate dominant vertical scroll into horizontal slide change.
    // Trackpad safety: skip if horizontal delta is dominant (native swipe).
    // NOTE: passive:false is required so we can call preventDefault() to stop the
    // browser's default vertical scroll on the outer container.
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      // Allow normal vertical scrolling inside a content-heavy slide
      const target = e.target as HTMLElement;
      const scrollableEl = target.closest('[data-scrollable="true"]') as HTMLElement | null;
      if (scrollableEl) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableEl;
        const atTop = scrollTop <= 0 && e.deltaY < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
        if (!atTop && !atBottom) return;
      }

      e.preventDefault();
      if (isAnimatingRef.current) return;

      // Use current innerWidth so the value is accurate after any viewport resize
      const nextIndex = activeSlideRef.current + (e.deltaY > 0 ? 1 : -1);
      scrollToSlide(nextIndex);
    };

    // Keyboard: Left/Right arrow keys navigate between slides
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToSlide(activeSlideRef.current + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToSlide(activeSlideRef.current - 1);
      }
    };

    // passive:false is intentional — we need to call preventDefault() on wheel events
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      container.removeEventListener('scroll', handleContainerScroll);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(settleTimerRef.current);
    };
  }, [scrollToSlide]);

  return (
    <>
      <Header />
      <div ref={containerRef} className="slides-container">
        {/* Slide 0 — Hero (full-screen, centered, no inner scroll) */}
        <div className="slide" id="slide-hero">
          <div data-scrollable="true" className="slide-content">
            <Hero onNext={() => scrollToSlide(1)} />
          </div>
        </div>

        {/* Slide 1 — Tech Stack */}
        <div className="slide" id="slide-tech">
          <div data-scrollable="true" className="slide-content">
            <TechStackBlock />
          </div>
        </div>

        {/* Slide 2 — Projects (content-heavy, scrollable) */}
        <div className="slide" id="slide-projects">
          <div data-scrollable="true" className="slide-content">
            <ProjectsSection />
          </div>
        </div>

        {/* Slide 3 — Experience (content-heavy, scrollable) */}
        <div className="slide" id="slide-experience">
          <div data-scrollable="true" className="slide-content">
            <ExperienceSection />
          </div>
        </div>

        {/* Slide 4 — SafeLab */}
        <div className="slide" id="slide-safelab">
          <div data-scrollable="true" className="slide-content">
            <SafeLabSection />
          </div>
        </div>

        {/* Slide 5 — AI Research (scrollable) */}
        <div className="slide" id="slide-ai-research">
          <div data-scrollable="true" className="slide-content">
            <AIResearchSection />
          </div>
        </div>

        {/* Slide 6 — Writing (scrollable) */}
        <div className="slide" id="slide-writing">
          <div data-scrollable="true" className="slide-content">
            <WritingSection />
          </div>
        </div>

        {/* Slide 7 — About */}
        <div className="slide" id="slide-about">
          <div data-scrollable="true" className="slide-content">
            <AboutSection />
          </div>
        </div>

        {/* Slide 8 — Contact + Footer */}
        <div className="slide" id="slide-contact">
          <div data-scrollable="true" className="slide-content">
            <ContactSection />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
