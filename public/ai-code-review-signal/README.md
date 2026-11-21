# AI Code Review: Signal or Noise

## Question

If you ask AI to find problems in code, will it find real bugs or just make up things to fix?

## Why This Matters

AI code review can save time. It can also waste time.

One tool may say the code is fine. Another tool may find more issues. Then the real question is:

Did it find a real problem, or did it find something because we asked it to look?

## Demo Idea

Show a small piece of working code:

```ts
type LineItem = {
  priceCents: number;
  quantity: number;
};

export function subtotalCents(items: LineItem[]) {
  return items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );
}
```

Then show AI review comments like:

- What if quantity is below zero?
- What if priceCents is not a whole number?
- What if the total gets too large?
- Should this check taxes?
- Should this check discounts?

Those comments are not always wrong. They need context.

If the app already checks those rules somewhere else, the comments are noise.

If the app does not check them, the comments are signal.

## Signal

A useful AI review comment:

- Shows a failing test
- Shows a real way the app can break
- Points to a rule the code breaks
- Protects users or data

## Noise

A weak AI review comment:

- Says "consider" with no clear reason
- Asks for a check that already exists
- Is just a style opinion
- Only appears after asking AI to find more

## What The Research Says

- One study of 16 AI review tools found valid AI comments led to code changes 0.9% to 19.2% of the time. Human comments led to changes 60% of the time.
- One code review test found correct code got bad AI suggestions up to 24.8% of the time.
- Atlassian tested a filtered AI reviewer. Its comments led to fixes 38.7% of the time.
- A Tencent study found AI plus static analysis removed 94% to 98% of false alarms.

## Takeaway

The value of AI code review is not how many comments it gives.

The value is how many comments survive proof.

AI should be allowed to say:

> No real issue found.

## Sources

- [Does AI Code Review Lead to Code Changes?](https://arxiv.org/html/2508.18771v2)
- [Evaluating Large Language Models for Code Review](https://arxiv.org/html/2505.20206v1)
- [Bias in the Loop: Auditing LLM-as-a-Judge for Software Engineering](https://arxiv.org/html/2604.16790v1)
- [RovoDev Code Reviewer at Atlassian](https://arxiv.org/html/2601.01129v2)
- [Reducing False Positives in Static Bug Detection with LLMs](https://arxiv.org/html/2601.18844v1)
- [Human-AI Synergy in Agentic Code Review](https://arxiv.org/html/2603.15911v1)
