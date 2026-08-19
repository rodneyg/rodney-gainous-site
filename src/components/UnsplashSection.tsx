import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Eye } from 'lucide-react';
import unsplashData from '@/data/unsplash-photos.json';

const UnsplashSection = () => {
  return (
    <section id="photos" className="px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Photos
            </motion.p>
            <motion.h2
              className="text-4xl font-bold tracking-tight md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Unsplash
            </motion.h2>
            <motion.p
              className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Photos I have shared on Unsplash.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium">
              <Eye className="size-4 text-muted-foreground" aria-hidden="true" />
              {unsplashData.profile.viewLabel}
            </span>
            <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium">
              <Download className="size-4 text-muted-foreground" aria-hidden="true" />
              {unsplashData.profile.downloadLabel}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {unsplashData.photos.map((photo) => (
            <motion.a
              key={photo.id}
              href={photo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl border bg-card shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/20 hover:shadow-lg"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="size-3.5" aria-hidden="true" />
                    {photo.viewLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Download className="size-3.5" aria-hidden="true" />
                    {photo.downloadLabel}
                  </span>
                </div>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-6 flex justify-center">
          <a
            href={unsplashData.profile.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium transition-[background-color,border-color] hover:border-primary/30 hover:bg-muted/50"
          >
            View Unsplash
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default UnsplashSection;
