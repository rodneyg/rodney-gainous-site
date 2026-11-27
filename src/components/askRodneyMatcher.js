export function matchQA(input, pairs) {
  const words = new Set(input.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []);
  let best = null;
  let bestScore = 0;
  for (const pair of pairs) {
    const score = pair.keywords.filter(keyword => words.has(keyword.toLowerCase())).length;
    if (score > bestScore) {
      bestScore = score;
      best = pair;
    }
  }
  return bestScore > 0 ? best : null;
}
