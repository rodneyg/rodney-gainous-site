import assert from 'node:assert/strict';
import { test } from 'node:test';

import { matchQA } from '../src/components/askRodneyMatcher.js';
const pairs = [
  { keywords: ['use', 'tools'], q: 'tools', a: 'tools answer', followUps: [], category: 'tools' },
  { keywords: ['built'], q: 'built', a: 'built answer', followUps: [], category: 'work' },
];

test('matches whole words without matching keyword substrings', () => {
  assert.equal(matchQA('What do you use?', pairs), pairs[0]);
  assert.equal(matchQA('What did you build?', pairs), null);
  assert.equal(matchQA('I rebuilt it', pairs), null);
  assert.equal(matchQA('TOOLS and BUILT', pairs), pairs[0]);
});
