import { useState } from 'react';
import { Button } from '@/components/ui/button';

const prototypes = [
  {
    title: 'Evidence Explorer',
    description: 'See how an answer changes when its source changes.',
    question: 'Is the sample release ready?',
    examples: [
      { label: 'Release notes', result: 'Ready for review', detail: 'Release notes, line 4: “The preview is ready for review.”' },
      { label: 'Test report', result: 'Release still on hold', detail: 'Test report, line 8: “Two mobile checks still need to pass.”' },
    ],
  },
  {
    title: 'Agent Dry Run',
    description: 'Inspect what an agent can do on its own and where it needs approval.',
    question: 'Prepare a sample release.',
    examples: [
      { label: 'Preview plan', result: 'Waiting for approval', detail: 'Check links → build preview → ask before publishing.' },
      { label: 'Approve once', result: 'Approved in simulation', detail: 'This approval covers one publish action for this preview.' },
    ],
  },
  {
    title: 'Model Scorecard',
    description: 'See how a model choice changes when accuracy matters more than speed.',
    question: 'Which configuration would you ship?',
    examples: [
      { label: 'Faster replies', result: 'Fast profile · 0.4 s median', detail: '7 of 10 answers matched the reference.' },
      { label: 'Higher accuracy', result: 'Careful profile · 1.2 s median', detail: '9 of 10 answers matched the reference.' },
    ],
  },
];

type Prototype = (typeof prototypes)[number];

function PrototypeCard({ title, description, question, examples }: Prototype) {
  const [selected, setSelected] = useState(0);
  const { result, detail } = examples[selected];

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border bg-card p-5 text-card-foreground">
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mb-4 mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      <p className="mb-2 mt-auto text-sm font-medium">{question}</p>
      <div role="group" aria-label={question} className="flex flex-wrap gap-2">
        {examples.map(({ label }, index) => (
          <Button
            key={label}
            type="button"
            size="sm"
            variant={selected === index ? 'default' : 'outline'}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div role="status" aria-atomic="true" className="mt-4 min-h-28 rounded-xl bg-muted p-3 text-sm">
        <p className="font-medium">{result}</p>
        <p className="mt-1 leading-5 text-muted-foreground">{detail}</p>
      </div>
    </article>
  );
}

export default function AIPrototypeLab() {
  return (
    <section aria-labelledby="ai-prototype-lab-title" className="mb-12 rounded-3xl border bg-muted/40 p-4 sm:p-6">
      <h3 id="ai-prototype-lab-title" className="text-2xl font-bold">AI Prototype Lab</h3>
      <p className="mb-5 mt-1 text-sm leading-6 text-muted-foreground">
        Try three interactive simulations with sample data.
      </p>
      <div className="grid gap-4 lg:grid-cols-3">
        {prototypes.map((prototype) => <PrototypeCard key={prototype.title} {...prototype} />)}
      </div>
    </section>
  );
}
