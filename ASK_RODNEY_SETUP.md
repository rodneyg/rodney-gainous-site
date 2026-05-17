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

---

## Optional: Load external data so context isn't resent every time

The current guide sends a full system prompt on every request. That's fine for a portfolio (it's short and cheap), but there are two ways to take it further — letting the model draw on richer, more dynamic data without pasting a wall of text into every call.

### Option A — Fine-tuning (bake knowledge into the model weights)

Fine-tuning trains a new model variant from your data. The result "knows" the facts without needing them in the system prompt at all.

**When to use it:** The data is stable (doesn't change often), and you want minimal per-request latency and token cost.

**Steps (OpenAI fine-tuning):**

1. **Collect training examples.** Create a `.jsonl` file where each line is a question-answer pair in OpenAI's chat format:
   ```jsonl
   {"messages": [{"role": "system", "content": "You are Rodney's AI assistant."}, {"role": "user", "content": "What companies have you worked at?"}, {"role": "assistant", "content": "Nexient, Ford, Nima Labs, Bird, then I founded Safe, and I'm now a Staff Engineer at Blueprint (Bryan Johnson's longevity company)."}]}
   {"messages": [{"role": "system", "content": "You are Rodney's AI assistant."}, {"role": "user", "content": "What is Safe?"}, {"role": "assistant", "content": "Safe is the venture-backed startup I founded in 2020 to redefine digital identity and trust. I was Founder and Principal Engineer there for over five years."}]}
   ```
   Aim for at least 50–100 diverse examples covering your QA pairs, bio, projects, and philosophy.

2. **Upload and start a fine-tuning job:**
   ```sh
   # Upload the training file
   openai api files.create -f training.jsonl -p fine-tune

   # Start the job (replace FILE_ID with the id returned above)
   openai api fine_tuning.jobs.create \
     --training-file FILE_ID \
     --model gpt-4o-mini-2024-07-18
   ```
   OpenAI's dashboard ([platform.openai.com/finetune](https://platform.openai.com/finetune)) shows job status. Fine-tuning typically takes 15–60 minutes and costs a few dollars for a small dataset.

3. **Use the fine-tuned model.** Once the job completes, you'll get a model ID like `ft:gpt-4o-mini-2024-07-18:personal::XYZ`. Swap it into the API route:
   ```typescript
   model: 'ft:gpt-4o-mini-2024-07-18:personal::XYZ',
   ```
   You can now shorten or remove the long `## Who is Rodney` block from the system prompt — the model already knows it.

**Limitations:** Fine-tuning teaches style and facts, but the knowledge is frozen at training time. If your bio changes, you re-run the job.

---

### Option B — RAG: embeddings + vector store (recommended for dynamic data)

RAG (Retrieval-Augmented Generation) is the more scalable approach. You turn your source documents into vector embeddings, store them in a database, and at query time retrieve only the relevant chunks to inject into the prompt. The full dataset never ships in every request — only the ~3 most relevant paragraphs do.

**When to use it:** You want to pull from many sources (LinkedIn, blog posts, GitHub README files, podcast transcripts, etc.) and keep them up to date without retraining.

**High-level architecture:**

```
Sources (LinkedIn, blog, GitHub, etc.)
       ↓  scrape / copy text
  documents.ts  (array of text chunks)
       ↓  embed with text-embedding-3-small
  Supabase pgvector table  (id, content, embedding)
       ↓  at query time: embed the user's question,
          cosine-search top 3 matching chunks
       ↓  inject those chunks into the system prompt
  GPT-4.5  →  answer
```

**Steps:**

1. **Create a Supabase project** ([supabase.com](https://supabase.com)) and enable the `pgvector` extension:
   ```sql
   create extension if not exists vector;

   create table documents (
     id bigserial primary key,
     content text,
     embedding vector(1536)
   );

   create index on documents using ivfflat (embedding vector_cosine_ops);
   ```

2. **Create a one-time ingestion script** (`scripts/ingest.ts`). Run it locally whenever source data changes:
   ```typescript
   import OpenAI from 'openai';
   import { createClient } from '@supabase/supabase-js';

   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
   const supabase = createClient(
     process.env.SUPABASE_URL!,
     process.env.SUPABASE_SERVICE_ROLE_KEY!
   );

   // Add all your source text here — paste from LinkedIn, blog posts,
   // GitHub bios, podcast transcripts, etc.
   const DOCUMENTS = [
     "Rodney Gainous Jr. is a Detroit-born software engineer and entrepreneur...",
     "He founded Safe in 2020, a venture-backed startup redefining digital identity...",
     "At Bird (2018–2020) he was a Senior Software Engineer on the core mobile platform...",
     // ... add as many chunks as you like
   ];

   async function ingest() {
     for (const content of DOCUMENTS) {
       const res = await openai.embeddings.create({
         model: 'text-embedding-3-small',
         input: content,
       });
       await supabase.from('documents').insert({
         content,
         embedding: res.data[0].embedding,
       });
     }
     console.log('Ingested', DOCUMENTS.length, 'documents');
   }

   ingest();
   ```

   ```sh
   npx ts-node scripts/ingest.ts
   ```

3. **Update the API route** to retrieve relevant chunks at query time instead of using a static system prompt:
   ```typescript
   // In api/ask-rodney.ts, replace the static SYSTEM_PROMPT lookup with:
   const queryEmbedding = await openai.embeddings.create({
     model: 'text-embedding-3-small',
     input: question,
   });

   const { data: chunks } = await supabase.rpc('match_documents', {
     query_embedding: queryEmbedding.data[0].embedding,
     match_threshold: 0.75,
     match_count: 3,
   });

   const context = chunks.map((c: { content: string }) => c.content).join('\n\n');

   const systemPrompt = `You are Rodney's AI assistant. Answer using only the context below.
   Never fabricate. If the answer isn't in the context, say: "That's best answered by Rodney directly."

   Context:
   ${context}`;
   ```

   Add the Supabase match function to your database:
   ```sql
   create or replace function match_documents(
     query_embedding vector(1536),
     match_threshold float,
     match_count int
   )
   returns table (content text, similarity float)
   language sql stable
   as $$
     select content, 1 - (embedding <=> query_embedding) as similarity
     from documents
     where 1 - (embedding <=> query_embedding) > match_threshold
     order by similarity desc
     limit match_count;
   $$;
   ```

4. **Add env vars to Vercel:**
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
   Install the client: `npm install @supabase/supabase-js`

**What to ingest:** The more diverse the sources, the better. Good candidates:
- Your LinkedIn About section and job descriptions (copy/paste)
- Blog posts or newsletter issues
- GitHub repository READMEs
- Podcast transcript excerpts
- Talks or presentation summaries
- Any long-form writing that captures how you think

**Re-ingesting:** Run the script again whenever content changes. Delete old rows first (`delete from documents`) to avoid duplicates.

---

### Which approach to use

| | Current (static prompt) | Fine-tuning | RAG |
|---|---|---|---|
| Setup effort | Done ✅ | Medium | Medium–High |
| Keeps up to date | Manually edit the prompt | Re-run training job | Re-run ingest script |
| Works with many sources | ❌ (prompt gets too long) | ✅ | ✅ |
| Token cost per query | Higher (full prompt every time) | Lowest | Low (only relevant chunks) |
| Best for | Current portfolio size | Stable, curated Q&A | Growing, dynamic content |

For a portfolio right now, the static system prompt in this guide is plenty. RAG becomes the right choice once you want to pull from more than a few paragraphs of source material — e.g. ingesting several blog posts, a full LinkedIn profile, and GitHub README files all at once.
