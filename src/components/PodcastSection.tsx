import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Headphones, HeartHandshake, Instagram, Music, Play, Youtube } from 'lucide-react';
import fallbackPodcastClips from '@/data/beat-the-odds-shorts.json';
import episodes from '@/data/beat-the-odds-episodes.json';
import { useLiveShorts } from '@/hooks/use-live-shorts';

const podcastLinks = [
  {
    label: 'Apple Podcasts',
    href: 'https://podcasts.apple.com/us/podcast/beat-the-odds-with-dre-rodney-brylan/id1639175138',
    description: 'Listen to the show',
    icon: Headphones,
    variant: 'primary',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/show/1ZgWdURhqi0S2q2SExfqbW',
    description: 'Audio episodes',
    icon: Music,
    variant: 'secondary',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@beattheoddspod',
    description: 'Full episodes and clips',
    icon: Youtube,
    variant: 'secondary',
  },
  {
    label: 'Patreon',
    href: 'https://www.patreon.com/BeatTheOddsPod',
    description: 'Support the show',
    icon: HeartHandshake,
    variant: 'secondary',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/btopodofficial/',
    description: 'Short clips',
    icon: Instagram,
    variant: 'secondary',
  },
];

const PodcastSection = ({ isActive }: { isActive: boolean }) => {
  const podcastClips = useLiveShorts('podcast', fallbackPodcastClips, isActive);
  const [youtubePlaying, setYoutubePlaying] = useState(false);

  return (
    <section id="podcast" className="border-y bg-muted/30 px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-5xl flex-col gap-8 md:gap-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5 sm:gap-6"
        >
          <div className="surface-card w-24 shrink-0 overflow-hidden rounded-xl sm:w-36 md:w-44">
            <img
              src={episodes.coverArt.src}
              alt={episodes.coverArt.alt}
              className="media-outline aspect-square w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-4xl font-bold md:text-6xl">
              Beat The Odds
            </h2>
            <p className="mt-2 text-base text-muted-foreground md:text-lg">
              with Dre, Rodney, and Brylan
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="surface-card overflow-hidden rounded-xl"
        >
          {youtubePlaying ? (
            <iframe
              title={episodes.youtube.title}
              src={`${episodes.youtube.embedSrc}?autoplay=1`}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setYoutubePlaying(true)}
              className="group relative block aspect-video w-full overflow-hidden"
              aria-label={`Play ${episodes.youtube.title}`}
            >
              <img
                src={episodes.youtube.thumbnail}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-black shadow-md transition-transform group-hover:scale-105">
                  <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
                </span>
              </span>
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="grid gap-3 md:grid-cols-2"
        >
          <iframe
            title={`Spotify: ${episodes.spotify.title}`}
            src={episodes.spotify.embedSrc}
            className="h-[152px] w-full rounded-xl"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <iframe
            title={`Apple Podcasts: ${episodes.apple.title}`}
            src={episodes.apple.embedSrc}
            className="h-[175px] w-full overflow-hidden rounded-xl"
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            loading="lazy"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {podcastLinks.map((link) => {
            const Icon = link.icon;
            const isPrimary = link.variant === 'primary';

            return (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  isPrimary
                    ? 'inline-flex min-h-16 items-center justify-between gap-4 rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-primary/90 hover:shadow-md'
                    : 'inline-flex min-h-16 items-center justify-between gap-4 rounded-lg border border-border bg-background/70 px-4 py-3 shadow-sm transition-[background-color,border-color,transform] duration-200 hover:border-primary/30 hover:bg-background'
                }
                whileTap={{ scale: 0.96 }}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="size-5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-semibold leading-5">{link.label}</span>
                    <span className={isPrimary ? 'block text-sm leading-5 text-primary-foreground/75' : 'block text-sm leading-5 text-muted-foreground'}>
                      {link.description}
                    </span>
                  </span>
                </span>
                <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {podcastClips.map((clip) => (
            <motion.a
              key={clip.href}
              href={clip.href}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group relative overflow-hidden rounded-lg"
              whileTap={{ scale: 0.96 }}
            >
              <img
                src={clip.thumbnail}
                alt={`${clip.title} Beat The Odds clip thumbnail`}
                className="media-outline aspect-[9/16] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/80 to-black/70 p-2 text-white">
                <div className="mb-1.5 flex size-7 items-center justify-center rounded-full bg-white/90 text-black shadow-sm">
                  <Play className="ml-0.5 size-3 fill-current" aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold leading-4">
                  {clip.title}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-4 text-white/75">
                  {clip.viewLabel}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PodcastSection;
