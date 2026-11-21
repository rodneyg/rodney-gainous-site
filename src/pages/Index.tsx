
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
import { Button } from '@/components/ui/button';

const slides = [
  { label: 'Home', content: <Hero /> },
  { label: 'Tech Stack and Methods', content: <TechStackBlock /> },
  { label: 'Projects', content: <ProjectsSection /> },
  { label: 'Research', content: <AIResearchSection /> },
  { label: 'Safe Lab', content: <SafeLabSection /> },
  { label: 'Experience', content: <ExperienceSection /> },
  { label: 'Writing', content: <WritingSection /> },
  { label: 'Podcast', content: <PodcastSection /> },
  { label: 'YouTube', content: <YouTubeSection /> },
  { label: 'Photography', content: <UnsplashSection /> },
  { label: 'About', content: <AboutSection /> },
  { label: 'Contact', content: <><ContactSection /><Footer /></> },
];

const getCurrentSlide = (deck: HTMLElement) => Math.round(deck.scrollLeft / deck.clientWidth);

const moveSlide = (deck: HTMLElement | null, direction: number) => {
  if (!deck) return;
  const current = getCurrentSlide(deck);
  const next = Math.max(0, Math.min(current + direction, slides.length - 1));
  if (next === current) return;

  deck.scrollTo({ left: next * deck.clientWidth, behavior: 'instant' });
  if (deck.children[current].contains(document.activeElement)) {
    deck.children[next].querySelector<HTMLElement>('.pitch-deck-content')?.focus({ preventScroll: true });
  }
};

const Index = () => {
  const deckRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    let anchorFrame: number;
    const syncHash = () => {
      window.cancelAnimationFrame(anchorFrame);
      anchorFrame = window.requestAnimationFrame(() => {
        const hash = window.location.hash.slice(1);
        if (!hash) {
          deck.scrollTo({ left: 0, behavior: 'instant' });
          return;
        }
        const target = document.getElementById(hash);
        if (target && deck.contains(target)) {
          target.scrollIntoView({ block: 'start', inline: 'start', behavior: 'instant' });
        }
      });
    };
    syncHash();

    let wheelTimer: number | undefined;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const content = event.target instanceof Element ? event.target.closest('.pitch-deck-content') : null;
      if (content && content.scrollHeight > content.clientHeight + 1) return;

      event.preventDefault();
      if (wheelTimer === undefined) moveSlide(deck, Math.sign(event.deltaY));
      window.clearTimeout(wheelTimer);
      // Keep a burst of wheel events from skipping multiple slides.
      wheelTimer = window.setTimeout(() => { wheelTimer = undefined; }, 160);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof Element &&
        event.target.closest('input, textarea, select, [contenteditable], [role="dialog"], [role="slider"]')) return;

      event.preventDefault();
      moveSlide(deck, event.key === 'ArrowRight' ? 1 : -1);
    };

    deck.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);
    window.addEventListener('hashchange', syncHash);
    return () => {
      window.cancelAnimationFrame(anchorFrame);
      window.clearTimeout(wheelTimer);
      deck.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('hashchange', syncHash);
    };
  }, []);

  return (
    <div className="pitch-deck-page">
      <Header />
      <main
        ref={deckRef}
        className="pitch-deck"
        onScroll={(event) => setActiveSlide(getCurrentSlide(event.currentTarget))}
      >
        {slides.map(({ label, content }) => (
          <div key={label} className="pitch-deck-slide">
            <div className="pitch-deck-content" role="region" aria-label={label} tabIndex={0}>
              {content}
            </div>
          </div>
        ))}
      </main>
      <nav aria-label="Slide navigation" className="flex items-center justify-center gap-4 border-t px-4 pb-[env(safe-area-inset-bottom)]">
        <Button type="button" variant="ghost" size="icon" aria-label="Previous slide" disabled={activeSlide === 0}
          onClick={() => moveSlide(deckRef.current, -1)}>
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Button>
        <span className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
          {activeSlide + 1} / {slides.length}
        </span>
        <Button type="button" variant="ghost" size="icon" aria-label="Next slide" disabled={activeSlide === slides.length - 1}
          onClick={() => moveSlide(deckRef.current, 1)}>
          <ArrowRight className="size-5" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
};

export default Index;
