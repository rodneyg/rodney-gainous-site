import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Eye, Heart, MessageCircle } from 'lucide-react';
import mediumArticles from '@/data/medium-content.json';

const WritingSection = () => {
  return (
    <section id="writing" className="px-6 py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h3
          className="mb-6 text-center text-4xl font-bold tracking-tight md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Writing
        </motion.h3>

        <motion.p
          className="mx-auto mb-14 max-w-2xl text-center text-lg leading-8 text-muted-foreground md:text-xl md:leading-9"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A few pieces from Medium.
        </motion.p>

        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {mediumArticles.map((article) => (
            <motion.div
              key={article.href}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <a
                href={article.href}
                className="group block h-full overflow-hidden rounded-xl border bg-card shadow-sm transition-[background-color,box-shadow,transform,border-color] duration-200 hover:border-primary/20 hover:bg-muted/20 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm font-medium text-muted-foreground">
                      Medium
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h4 className="text-lg font-semibold leading-6">{article.title}</h4>
                    <ExternalLink className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{article.description}</p>
                  {(article.viewsLabel || article.readsLabel || article.clapLabel || article.commentLabel) && (
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
                      {article.viewsLabel && (
                        <span className="inline-flex items-center gap-1.5">
                          <Eye className="size-3.5" aria-hidden="true" />
                          {article.viewsLabel}
                        </span>
                      )}
                      {article.readsLabel && (
                        <span className="inline-flex items-center gap-1.5">
                          <BookOpen className="size-3.5" aria-hidden="true" />
                          {article.readsLabel}
                        </span>
                      )}
                      {article.clapLabel && (
                        <span className="inline-flex items-center gap-1.5">
                          <Heart className="size-3.5" aria-hidden="true" />
                          {article.clapLabel}
                        </span>
                      )}
                      {article.commentLabel && (
                        <span className="inline-flex items-center gap-1.5">
                          <MessageCircle className="size-3.5" aria-hidden="true" />
                          {article.commentLabel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="https://medium.com/@rg2official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium transition-[background-color,border-color] hover:border-primary/30 hover:bg-muted/50"
          >
            Medium
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          <a
            href="https://rg2official.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium transition-[background-color,border-color] hover:border-primary/30 hover:bg-muted/50"
          >
            Substack
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default WritingSection;
