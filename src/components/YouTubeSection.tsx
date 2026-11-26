import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Youtube } from 'lucide-react';
import fallbackFeaturedVideos from '@/data/youtube-shorts.json';
import { useLiveShorts } from '@/hooks/use-live-shorts';

const YouTubeSection = ({ isActive }: { isActive: boolean }) => {
  const featuredVideos = useLiveShorts('personal', fallbackFeaturedVideos, isActive);

  return (
    <section id="youtube" className="px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-7"
        >
          <div className="flex items-center gap-4">
            <img
              src="https://yt3.googleusercontent.com/oWPw94EWBqfe1pCibUMmuO9PsgsF5H6HJMagOpm0tJ7wv3nuDbPTuJn8ZjS7WZosLENQKFjDCQ=s160-c-k-c0x00ffffff-no-rj"
              alt="Rodney Gainous Jr YouTube channel"
              className="media-outline size-16 rounded-full bg-card object-cover shadow-sm"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                YouTube
              </p>
              <h2 className="text-3xl font-bold md:text-5xl">
                Rodney Unfiltered
              </h2>
            </div>
          </div>

          <div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl md:leading-9">
              Short videos on tech, startups, and culture.
            </p>
          </div>

          <motion.a
            href="https://www.youtube.com/@rodneygainous"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sm transition-[background-color,box-shadow,transform] duration-200 hover:bg-primary/90 hover:shadow-md"
            whileTap={{ scale: 0.96 }}
          >
            <Youtube className="size-5" aria-hidden="true" />
            Watch on YouTube
            <ExternalLink className="size-4" aria-hidden="true" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {featuredVideos.map((video) => (
            <motion.a
              key={video.href}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group relative overflow-hidden rounded-xl"
              whileTap={{ scale: 0.96 }}
            >
              <img
                src={video.thumbnail}
                alt={`${video.title} YouTube Short thumbnail`}
                className="media-outline aspect-[9/16] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/80 to-black/70 p-2 text-white">
                <div className="mb-1.5 flex size-7 items-center justify-center rounded-full bg-white/90 text-black shadow-sm">
                  <Play className="ml-0.5 size-3 fill-current" aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold leading-4">
                  {video.title}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-4 text-white/75">
                  {video.viewLabel}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default YouTubeSection;
