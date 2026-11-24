import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Headphones, HeartHandshake, Instagram, Music, Play, Youtube } from 'lucide-react';
import fallbackPodcastClips from '@/data/beat-the-odds-shorts.json';
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

const PodcastSection = () => {
  const podcastClips = useLiveShorts('podcast', fallbackPodcastClips);

  return (
    <section id="podcast" className="border-y bg-muted/30 px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-xs"
        >
          <div className="surface-card overflow-hidden rounded-xl">
            <img
              src="https://i.scdn.co/image/ab67656300005f1fc9ffb944d9a776a186571929"
              alt="Beat The Odds with Dre, Rodney, and Brylan cover art"
              className="media-outline aspect-square w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Podcast
            </p>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold md:text-6xl">
                Beat The Odds
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
                I co-host Beat The Odds with Dre and Brylan. We talk through the near future: AI, business, markets, technology, and the people pushing things forward.
              </p>
              <p className="max-w-3xl text-base leading-7 text-foreground/85 md:text-lg md:leading-8">
                We started it in 2022 after building venture-backed companies, raising nearly $10M combined, and working as product people and engineers at places like Ford, Disney, Affirm, and Bird.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
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
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PodcastSection;
