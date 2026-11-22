import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

import fallbackFeaturedVideos from '@/data/youtube-shorts.json';
import { useLiveShorts } from '@/hooks/use-live-shorts';
import { StoryStageVisual, type StoryStageId } from '@/components/StoryStageVisual';

type StoryStage = {
  id: StoryStageId;
  marker: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

const storyStages: StoryStage[] = [
  {
    id: 'origin',
    marker: '13',
    eyebrow: 'Age 13',
    title: 'Started with Java bots.',
    description: 'The first projects were small, curious, and built for the thrill of making software respond.',
    cta: 'See selected work',
    href: 'https://rodneygainous.com/#projects',
  },
  {
    id: 'teenager',
    marker: '16',
    eyebrow: 'Age 16',
    title: 'Turned software into a business.',
    description: 'A high school product reached 150,000 downloads and generated $200,000.',
    cta: 'Read the story',
    href: 'https://medium.com/tech-product-and-life/how-i-made-200-000-when-i-was-16-years-old-304f0e87cfb6',
  },
  {
    id: 'career',
    marker: 'Career',
    eyebrow: '2013 to 2020',
    title: 'Shipped mobile products at scale.',
    description: 'Built across automotive, health technology, venture, and global mobility.',
    cta: 'View experience',
    href: 'https://rodneygainous.com/#experience',
  },
  {
    id: 'founder',
    marker: 'Founder',
    eyebrow: 'Founder',
    title: 'Built a venture-backed security company.',
    description: 'Moved from shipping features to shaping the company, product, and technical foundation.',
    cta: 'Explore the work',
    href: 'https://rodneygainous.com/#projects',
  },
  {
    id: 'now',
    marker: 'Now',
    eyebrow: 'Right now',
    title: 'Building in public across AI, health, and media.',
    description: 'Products, research, writing, and short-form ideas now live in one continuously updated body of work.',
    cta: 'Watch the video',
    href: '',
  },
];

const proofPoints = [
  { value: '250K', label: 'product downloads' },
  { value: '220K', label: 'story views' },
  { value: '10+', label: 'years shipping' },
];

export function InteractiveStoryHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const liveShorts = useLiveShorts('personal', fallbackFeaturedVideos);
  const currentClip = liveShorts[0] ?? fallbackFeaturedVideos[0];
  const activeStage = storyStages[activeIndex];
  const activeHref = activeStage.id === 'now' ? currentClip.href : activeStage.href;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + storyStages.length) % storyStages.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % storyStages.length);
  };

  return (
    <section className="px-5 pb-12 pt-8 md:px-8 md:pt-8">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.08fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="lg:col-start-1 lg:row-start-1"
        >
          <div className="mb-5 flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}temp-avatar.jpg`}
              alt="Rodney Gainous Jr."
              className="size-12 rounded-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
            <div>
              <p className="font-semibold leading-tight">Rodney Gainous Jr.</p>
              <p className="text-sm text-muted-foreground">Engineer, founder, and creator</p>
            </div>
          </div>

          <h1 className="max-w-xl text-balance text-5xl font-bold leading-[0.98] md:text-6xl">
            I&apos;ve been shipping software since I was 13.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
            I build products where AI, health, security, and real human problems meet.
          </p>
        </motion.div>

        <motion.div
          id="story"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="rounded-lg bg-card p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06),0_18px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <div className="grid grid-cols-5 gap-1 rounded-md bg-muted p-1" aria-label="Rodney's story timeline">
            {storyStages.map((stage, index) => (
              <button
                key={stage.id}
                type="button"
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`min-h-11 rounded-sm px-1 text-xs font-semibold transition-[background-color,color,box-shadow] duration-150 sm:text-sm ${
                  index === activeIndex
                    ? 'bg-background text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {stage.marker}
              </button>
            ))}
          </div>

          <div className="mt-2 overflow-hidden rounded-md bg-muted/40">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStage.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: 'easeOut' }}
              >
                <StoryStageVisual stageId={activeStage.id} currentClip={currentClip} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid min-h-40 grid-cols-[1fr_auto] gap-4 px-4 py-4 sm:px-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStage.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.18 }}
              >
                <p className="text-xs font-bold uppercase text-muted-foreground">{activeStage.eyebrow}</p>
                <h2 className="mt-2 text-balance text-2xl font-bold leading-tight">{activeStage.title}</h2>
                <p className="mt-3 max-w-xl text-pretty leading-7 text-muted-foreground">{activeStage.description}</p>
                <a
                  href={activeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-10 items-center gap-1.5 font-semibold underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-muted-foreground"
                >
                  {activeStage.cta}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-end gap-2">
              <motion.button
                type="button"
                onClick={showPrevious}
                aria-label="Show previous chapter"
                title="Previous chapter"
                className="flex size-11 items-center justify-center rounded-md bg-background text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] transition-[box-shadow,color] duration-150 hover:text-muted-foreground hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_2px_5px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                whileTap={{ scale: 0.96 }}
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </motion.button>
              <motion.button
                type="button"
                onClick={showNext}
                aria-label="Show next chapter"
                title="Next chapter"
                className="flex size-11 items-center justify-center rounded-md bg-foreground text-background shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] transition-[background-color,box-shadow] duration-150 hover:bg-foreground/85 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_2px_5px_rgba(0,0,0,0.1)]"
                whileTap={{ scale: 0.96 }}
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          className="lg:col-start-1 lg:row-start-2"
        >
          <dl className="grid max-w-xl grid-cols-3 border-y py-4">
            {proofPoints.map((point) => (
              <div key={point.label} className="min-w-0 pr-3 last:pr-0">
                <dt className="text-pretty text-xs font-medium leading-4 text-muted-foreground sm:text-sm">
                  {point.label}
                </dt>
                <dd className="mt-1 tabular-nums text-2xl font-bold sm:text-3xl">{point.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={() => setActiveIndex(storyStages.length - 1)}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-foreground py-3 pl-5 pr-[18px] font-semibold text-background shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_5px_rgba(0,0,0,0.12)] transition-[background-color,box-shadow] duration-150 hover:bg-foreground/90 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_3px_8px_rgba(0,0,0,0.16)]"
              whileTap={{ scale: 0.96 }}
            >
              See what I&apos;m building now
              <ArrowRight className="size-4" aria-hidden="true" />
            </motion.button>
            <motion.a
              href="https://rodneygainous.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-background py-3 pl-5 pr-[18px] font-semibold shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] transition-[box-shadow,color] duration-150 hover:text-foreground/70 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_2px_5px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
              whileTap={{ scale: 0.96 }}
            >
              Current site
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
