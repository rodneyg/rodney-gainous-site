import { ArrowUpRight } from 'lucide-react';

import { InteractiveStoryHero } from '@/components/InteractiveStoryHero';
import { ThemeToggle } from '@/components/theme-toggle';

const selectedWork = [
  {
    title: 'SafeDose',
    description: 'Visual guidance for safer syringe dosing.',
    href: 'https://safedose.rodneygainous.com/',
  },
  {
    title: 'AI Safety Research',
    description: 'Small simulations for testing model failure modes.',
    href: 'https://rodneygainous.com/#ai-research',
  },
  {
    title: 'Rodney Unfiltered',
    description: 'Short ideas on technology, startups, and culture.',
    href: 'https://www.youtube.com/@rodneygainous',
  },
];

export function HeroDemo() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/95 px-5 backdrop-blur md:px-8">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4">
          <a href="https://rodneygainous.com" className="font-bold sm:text-lg">
            Rodney Gainous Jr.
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">Concept preview</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <InteractiveStoryHero />

        <section className="border-t bg-muted/35 px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold text-muted-foreground">Selected work</p>
            <div className="mt-6 grid gap-0 border-y md:grid-cols-3 md:divide-x">
              {selectedWork.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-40 flex-col justify-between border-b py-6 last:border-b-0 md:border-b-0 md:px-6 md:first:pl-0 md:last:pr-0"
                >
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-[transform,color] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="mt-2 max-w-xs text-pretty text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
