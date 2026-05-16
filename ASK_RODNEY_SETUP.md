# Ask Rodney — Setup Guide

The **Ask Rodney** section currently runs fully client-side using pre-canned answers and keyword matching — no API key required for the demo. To wire it up to a real language model so it answers any question intelligently, follow the steps below.

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

## 2. Choose a language model provider

Pick one of the following. The swap is the same in either case — only the API call changes.

| Provider | Model recommendation | Docs |
|---|---|---|
| Anthropic | `claude-3-5-haiku-20241022` (fast, cheap) | [docs.anthropic.com](https://docs.anthropic.com) |
| OpenAI | `gpt-4o-mini` | [platform.openai.com](https://platform.openai.com) |

---

## 3. Get an API key

### Anthropic
1. Go to [console.anthropic.com](https://console.anthropic.com) → **API Keys** → **Create Key**.
2. Copy the key (starts with `sk-ant-...`).

### OpenAI
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys) → **Create new secret key**.
2. Copy the key (starts with `sk-...`).

---

## 4. Add the key to your environment

### Local development

Create a `.env.local` file at the project root (it is already in `.gitignore` — never commit this):

```env
# Anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-...

# — OR — OpenAI
VITE_OPENAI_API_KEY=sk-...
```

### Production (Netlify / Vercel)

Set the same variable in your hosting dashboard:

- **Netlify:** Site settings → Environment variables → Add variable.
- **Vercel:** Project settings → Environment Variables → Add.

> **Important:** Calling AI APIs directly from the browser exposes your key to anyone who inspects network traffic. For production, route requests through a serverless function or edge function that reads the key server-side.

---

## 5. Create a serverless API route (recommended for production)

### Netlify Functions example (`netlify/functions/ask-rodney.ts`)

```typescript
import Anthropic from '@anthropic-ai/sdk';

export const handler = async (event: { body: string | null }) => {
  // Validate request body
  if (!event.body) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Request body is required' }) };
  }

  let question: string;
  let history: Array<{ role: string; content: string }>;

  try {
    const parsed = JSON.parse(event.body);
    question = parsed.question;
    history = parsed.history ?? [];
    if (!question || typeof question !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'question field is required' }) };
    }
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 256,
      system: `You are an AI assistant for Rodney Gainous Jr., an AI engineer and product builder.
Answer questions about his work, skills, and philosophy concisely (2-3 sentences max).
If you don't know something specific, suggest they reach out via the contact section.`,
      messages: [
        ...history,
        { role: 'user', content: question },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: (message.content[0] as { text: string }).text }),
    };
  } catch (err) {
    console.error('Anthropic API error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to get a response. Please try again.' }) };
  }
};
```

---

## 6. Wire the API call into the component

In `src/components/AIEngineerShowcase.tsx`, replace the `sendQuestion` handler's answer resolution:

```typescript
// Replace this block:
const match = matchQA(text);
const answer = match ? match.a : FALLBACK_ANSWER;
const next = match ? match.followUps : [0, 4];

timerRef.current = setTimeout(() => {
  streamText(answer, committed => { ... });
}, 400);

// With this:
const res = await fetch('/.netlify/functions/ask-rodney', {
  method: 'POST',
  body: JSON.stringify({ question: text, history: conversationHistory }),
});
const { answer } = await res.json();
streamText(answer, committed => {
  commitMessage(committed);
  timerRef.current = setTimeout(() => setFollowUps([0, 4]), 200);
});
```

You'll also want to maintain a `conversationHistory` array in state to pass context for multi-turn replies.

---

## 7. Deploy

```sh
npm run build
# then deploy /dist to Netlify, Vercel, or your host of choice
```

---

## Cost estimate

| Provider | Model | ~Cost per conversation |
|---|---|---|
| Anthropic | claude-3-5-haiku | < $0.001 |
| OpenAI | gpt-4o-mini | < $0.001 |

At portfolio traffic levels, monthly cost is effectively $0.
