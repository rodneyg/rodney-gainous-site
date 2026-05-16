# Ask Rodney — Setup Guide

The **Ask Rodney** section currently runs fully client-side using pre-canned answers and keyword matching — no API key required for the demo. To wire it up to a real language model, follow the steps below. All deployment instructions assume **Vercel**.

---

## 1. Replace the placeholder avatar

The chat header and AI bubbles currently use `/public/temp-avatar.jpg`.

1. Add your real headshot to `/public/` (e.g. `avatar.jpg`).
2. Open `src/components/AIEngineerShowcase.tsx` and replace every occurrence of:
   ```
   src="/temp-avatar.jpg"
   ```
   with your new filename (e.g. `src="/avatar.jpg"`).

---

## 2. Get an OpenAI API key

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys) → **Create new secret key**.
2. Copy the key — it starts with `sk-`.

**Model:** `gpt-4.5` — accurate, fast, and more than capable at portfolio traffic levels.

---

## 3. Add the key to your environment

### Local development

Create `.env.local` at the project root (already in `.gitignore` — never commit this):

```env
OPENAI_API_KEY=sk-...
```

### Production (Vercel)

1. Open your project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Go to **Settings → Environment Variables**.
3. Add a variable: name `OPENAI_API_KEY`, value `sk-...`, environment **Production** (and **Preview** if you want it in preview deploys).
4. Redeploy for the variable to take effect.

> **Important:** Never use `VITE_` prefix for secrets. Variables prefixed with `VITE_` are embedded in the browser bundle and visible to anyone. The `OPENAI_API_KEY` variable is read only by the Vercel serverless function below — it never reaches the client.

---

## 4. Create the Vercel API route

Create the file `api/ask-rodney.ts` at the project root. Vercel automatically deploys any file in `api/` as a serverless function.

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// ─── System prompt ─────────────────────────────────────────────────────────
// Strict, grounded in real facts about Rodney. The model must stay within
// this context and never fabricate details not listed here.
const SYSTEM_PROMPT = `You are a concise AI assistant that answers questions about Rodney Gainous Jr.
Respond in 2–3 sentences maximum. Be direct, specific, and use a confident first-person voice on his behalf.
Never fabricate details. If you genuinely don't know the answer, say: "That's best answered by Rodney directly — reach out in the contact section."

## Who is Rodney Gainous Jr.?
Rodney is a Detroit-born software engineer and entrepreneur who has been building software since age 13.
He is currently a Staff Software Engineer at Blueprint (Bryan Johnson's longevity company), focused on health technology.
Before that, he was Founder & Principal Engineer of Safe (2020–2025), a venture-backed startup redefining digital trust and identity security.
He also co-founded SafeLab, an open-source health infrastructure project.
Earlier in his career he was a Senior Software Engineer at Bird (the scooter company, 2018–2020), a mobile engineer at Nima Labs (food allergy sensor startup, 2017–2018), and a software engineer at Ford Motor Company (2015–2016) and Nexient (2013–2014).
He was Entrepreneur in Residence at Upfront Ventures (2020–2021) during the early formation of Safe.

## What has he built?
- Safe: a venture-backed digital identity and security startup. Raised funding, built the product, ran the company for over 5 years.
- SafeLab: open-source health infrastructure aimed at democratizing access to health data and tooling.
- AI safety simulations and bias detection systems that make abstract risk concepts tangible for non-technical stakeholders (including executive audiences).
- Production apps wired to Claude and GPT across multiple domains.
- At Bird, he worked on the core mobile platform powering a global network of shared electric scooters.
- At Ford, he built iOS software for one of the world's largest automotive manufacturers.

## What is his technical stack and approach?
He is primarily a product engineer — his focus is always the product layer, turning AI models into experiences real people actually use.
Daily tools: Claude Code for agentic sessions, Cursor for in-editor flow, Next.js + Supabase for fast shipping.
He is model-agnostic and stack-agnostic — he picks whatever fits the outcome.
Philosophy: if he does something twice, he builds a system for it. He uses AI to eliminate tasks entirely, not just go faster.
He believes models are a new primitive — like databases or APIs — and the craft is knowing when and how to wire them into the right product moment.
Speed of iteration beats choice of model, every time.

## Why work with Rodney?
He bridges the gap between cutting-edge AI capabilities and the UX that non-technical users actually experience.
He is not a researcher training foundational models — he ships.
He has operated as both a solo founder and a senior engineer inside teams, so he understands product, code, and stakeholder communication equally well.

## Contact
Visitors who want to talk directly should use the contact section on this site.`;

// ─── Handler ────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { question, history } = req.body ?? {};

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'question field is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> =
    Array.isArray(history) ? history : [];

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: 'gpt-4.5',
      max_tokens: 256,
      temperature: 0.4,   // lower = more factual, less hallucination
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory,
        { role: 'user', content: question.trim() },
      ],
    });

    const answer = completion.choices[0]?.message?.content ?? 'No response generated.';
    return res.status(200).json({ answer });
  } catch (err) {
    console.error('OpenAI API error:', err);
    return res.status(500).json({ error: 'Failed to get a response. Please try again.' });
  }
}
```

Install the required packages:

```sh
npm install openai @vercel/node
```

---

## 5. Wire the API call into the component

In `src/components/AIEngineerShowcase.tsx`, find the `sendQuestion` function and replace the answer resolution block:

```typescript
// Remove this:
const match = matchQA(text);
const answer = match ? match.a : FALLBACK_ANSWER;
const next = match ? match.followUps : [0, 4];

timerRef.current = setTimeout(() => {
  streamText(answer, committed => { ... });
}, 400);

// Add this (make sendQuestion async and add a history state):
setIsStreaming(true);
try {
  const res = await fetch('/api/ask-rodney', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question: text,
      history: messages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text,
      })),
    }),
  });
  const data = await res.json();
  const answer = data.answer ?? FALLBACK_ANSWER;
  streamText(answer, committed => {
    commitMessage(committed);
    timerRef.current = setTimeout(() => setFollowUps([0, 4]), 200);
  });
} catch {
  streamText(FALLBACK_ANSWER, commitMessage);
}
```

The existing `messages` state already holds the full conversation history, so you can map it directly into the `history` array sent to the API.

---

## 6. Deploy

```sh
npm run build
vercel --prod
```

Vercel will automatically detect the `api/` directory and deploy the function alongside the static site.

---

## Cost estimate

| Model | ~Cost per message | ~Monthly cost at portfolio traffic |
|---|---|---|
| `gpt-4.5` | ~$0.002 | < $1 |

At a few hundred conversations per month, total cost is effectively $0.
