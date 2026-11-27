import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AIResearchSection from '@/components/AIResearchSection';
import AIEngineerShowcase from '@/components/AIEngineerShowcase';
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
import { Button } from '@/components/ui/button';

const slides = [
  { title: 'Introduction', content: <Hero /> },
  { title: 'Tech Stack', content: <TechStackBlock /> },
  { title: 'Projects', content: <ProjectsSection /> },
  { title: 'AI Research', content: <AIResearchSection /> },
  { title: 'Ask Rodney', content: <AIEngineerShowcase /> },
  { title: 'Safe Lab', content: <SafeLabSection /> },
  { title: 'Experience', content: <ExperienceSection /> },
  { title: 'Writing', content: <WritingSection /> },
  { title: 'Podcast', content: (isActive: boolean) => <PodcastSection isActive={isActive} /> },
  { title: 'YouTube', content: (isActive: boolean) => <YouTubeSection isActive={isActive} /> },
  { title: 'Photography', content: <UnsplashSection /> },
  { title: 'About', content: <AboutSection /> },
  { title: 'Contact', content: <><ContactSection /><Footer /></> },
];

function slideIndex(deck: HTMLElement) {
  return Math.max(0, Math.min(slides.length - 1, Math.round(deck.scrollLeft / deck.clientWidth)));
}

function moveSlide(deck: HTMLElement, direction: number) {
  const index = slideIndex(deck);
  const next = Math.max(0, Math.min(slides.length - 1, index + direction));
  if (next !== index) deck.scrollTo({ left: next * deck.clientWidth });
}

const Index = () => {
  const deckRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const navigateToHash = () => {
      if (!window.location.hash) return;
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      const targetSlide = target?.closest<HTMLElement>('.portfolio-slide');
      const targetIndex = targetSlide ? Array.from(deck.children).indexOf(targetSlide) : -1;
      if (targetIndex >= 0) {
        deck.scrollTo({ left: targetIndex * deck.clientWidth, behavior: 'instant' });
        setActiveSlide(targetIndex);
      }
    };
    window.addEventListener('hashchange', navigateToHash);
    navigateToHash();

    let lastWheelTime = -Infinity;
    let wheelDistance = 0;
    let wheelMoved = false;

    const handleWheel = (event: WheelEvent) => {
      if (
        event.defaultPrevented || !event.cancelable || event.ctrlKey || event.shiftKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      ) return;

      const slide = (event.target as Element).closest<HTMLElement>('.portfolio-slide');
      if (slide && slide.scrollHeight - slide.clientHeight > 1) return;

      event.preventDefault();
      // Move once per wheel gesture so the trackpad's tail cannot skip slides.
      if (event.timeStamp - lastWheelTime > 180) {
        wheelDistance = 0;
        wheelMoved = false;
      }
      lastWheelTime = event.timeStamp;
      if (wheelMoved) return;

      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? deck.clientHeight : 1;
      wheelDistance += event.deltaY * unit;
      if (Math.abs(wheelDistance) >= 24) {
        moveSlide(deck, Math.sign(wheelDistance));
        wheelMoved = true;
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      const target = event.target as HTMLElement;
      if (target.isContentEditable || target.closest('input, textarea, select, [role="dialog"], [role="menu"], [role="slider"]')) return;

      event.preventDefault();
      if (!event.repeat) moveSlide(deck, event.key === 'ArrowRight' ? 1 : -1);
    };

    const updateSlide = () => {
      const index = slideIndex(deck);
      if (Math.abs(deck.scrollLeft - index * deck.clientWidth) < 1) setActiveSlide(index);
    };
    updateSlide();
    deck.addEventListener('scroll', updateSlide, { passive: true });
    deck.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);
    return () => {
      deck.removeEventListener('scroll', updateSlide);
      deck.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('hashchange', navigateToHash);
    };
  }, []);

  return (
    <div className="portfolio-layout">
      <Header />
      <main ref={deckRef} className="portfolio-deck" aria-label="Portfolio slides">
        {slides.map(({ title, content }, index) => (
          <div key={title} className="portfolio-slide" role="region" aria-label={title} tabIndex={0}>
            {typeof content === 'function' ? content(activeSlide === index) : content}
          </div>
        ))}
      </main>
      <nav aria-label="Slide navigation" className="portfolio-controls flex items-center justify-center gap-3 border-t bg-background px-2 pt-1 text-sm sm:gap-5">
        <Button type="button" variant="ghost" size="icon" aria-label="Previous slide" aria-disabled={!activeSlide}
          className="aria-disabled:opacity-40" onClick={() => deckRef.current && moveSlide(deckRef.current, -1)}>
          <ArrowLeft aria-hidden="true" />
        </Button>
        <span aria-live="polite" aria-atomic="true" className="w-44 text-center">
          {activeSlide + 1} / {slides.length} · {slides[activeSlide].title}
        </span>
        <Button type="button" variant="ghost" size="icon" aria-label="Next slide" aria-disabled={activeSlide === slides.length - 1}
          className="aria-disabled:opacity-40" onClick={() => deckRef.current && moveSlide(deckRef.current, 1)}>
          <ArrowRight aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
};

export default Index;
