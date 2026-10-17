/**
 * RichmondAI — Automated Test Suite
 * Validates all 26 Generators, Offline Templates, Markdown Parser, and Quota Integrity.
 * Run with: node tests/generators.test.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appPath = path.join(__dirname, '..', 'app.js');
let code = fs.readFileSync(appPath, 'utf8');

// Expose internal classes and objects for unit testing
code = code.replace(
  'window.RichmondApp = new RichmondStudio();',
  `window.GENERATORS = GENERATORS;
   window.PedagogicalGenerator = PedagogicalGenerator;
   window.LocalQuotaStore = LocalQuotaStore;
   window.BACKEND_CONFIG = BACKEND_CONFIG;
   window.utcToday = utcToday;
   if (typeof parseMarkdownToHtml === 'function') window.parseMarkdownToHtml = parseMarkdownToHtml;`
);

let domCallback = null;
const mockWindow = {};
const mockDocument = {
  addEventListener: (event, cb) => {
    if (event === 'DOMContentLoaded') domCallback = cb;
  },
  getElementById: () => null
};
const mockLocalStorageStore = {};
const mockLocalStorage = {
  getItem: (k) => (mockLocalStorageStore[k] !== undefined ? mockLocalStorageStore[k] : null),
  setItem: (k, v) => { mockLocalStorageStore[k] = String(v); },
  removeItem: (k) => { delete mockLocalStorageStore[k]; },
  clear: () => { for (const k in mockLocalStorageStore) delete mockLocalStorageStore[k]; }
};

const context = {
  window: mockWindow,
  document: mockDocument,
  localStorage: mockLocalStorage,
  console,
  setTimeout,
  clearTimeout,
  Date,
  Math
};

vm.createContext(context);
vm.runInContext(code, context);
if (domCallback) domCallback();

const GENERATORS = context.window.GENERATORS;
const PedagogicalGenerator = context.window.PedagogicalGenerator;
const LocalQuotaStore = context.window.LocalQuotaStore;
const utcToday = context.window.utcToday;

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
}

console.log('\n--- 1. Testing Registry of 26 Generators ---');
const genKeys = Object.keys(GENERATORS);
assert(genKeys.length === 26, `Catalog contains exactly 26 generators (found ${genKeys.length})`);

genKeys.forEach(id => {
  const g = GENERATORS[id];
  assert(g.id === id && g.name && g.category && g.desc, `Generator '${id}' has complete metadata`);
});

console.log('\n--- 2. Testing Offline Topic-Aware Output for All 26 Generators ---');
const customTopic = 'Cryogenic Rocket Propulsion Systems';
const customCefr = 'C1';

genKeys.forEach(id => {
  try {
    const res = PedagogicalGenerator.generate({
      generatorId: id,
      topic: customTopic,
      cefr: customCefr,
      count: 4,
      learnerProfile: 'Aerospace Engineering Trainees',
      sends: ['dyslexia']
    });
    const topicIncluded = res.markdown && res.markdown.includes(customTopic);
    assert(topicIncluded, `Generator '${id}' integrates custom topic into output`);
    assert(res.markdown.length > 200, `Generator '${id}' produces substantial content (${res.markdown.length} chars)`);
  } catch (err) {
    assert(false, `Generator '${id}' threw error: ${err.message}`);
  }
});

console.log('\n--- 3. Testing Signed Local Quota & Tamper Resistance ---');
mockLocalStorage.clear();
const quotaKey = 'test_quota_key';
const store = new LocalQuotaStore(quotaKey);
const initial = store.load({ email: 'test@richmond.edu' }, 15);

assert(initial.used === 0 && initial.max === 15, 'Initial quota starts at 0 used of 15 max');
assert(Boolean(initial.sig), 'Quota payload includes FNV-1a cryptographic signature');

// Simulate 1 usage
const updated = store.save({ date: utcToday(), used: 1, max: 15 });
assert(updated.used === 1, 'Saved quota tracks usage');

// Simulate tampering with localStorage
const raw = JSON.parse(mockLocalStorage.getItem(quotaKey));
raw.used = 0; // User attempts to reset their counter manually
mockLocalStorage.setItem(quotaKey, JSON.stringify(raw));

const reloaded = store.load({ email: 'test@richmond.edu' }, 15);
assert(reloaded.used === 15, 'Tampered signature is detected and forces day as exhausted (15/15)');

console.log('\n--- 4. Testing Rich Markdown Parser & Pedagogical Formatting ---');
const parseMarkdownToHtml = context.window.parseMarkdownToHtml;
assert(typeof parseMarkdownToHtml === 'function', 'parseMarkdownToHtml function is exposed');

const testMarkdown = `# Advanced Aviation Ground Procedures
## Lesson Plan Stages
| Stage | Time | Interaction | Focus |
|---|---|---|---|
| Warmer | 5 min | T-Ss | Quick vocabulary recall |
| Roleplay | 20 min | Pairs | Radio communications |

### Student Practice Task
Complete the procedure: First check the ______ before departure.
- Item 1: Verify fuel pressure
- Item 2: Calibrate altimeter

**Teacher**: Welcome to the flight simulator.
**Student**: Good morning captain, systems checked.

## Answer Key
1. Check instruments
2. Confirm clearance
`;

const renderedHtml = parseMarkdownToHtml(testMarkdown);

assert(renderedHtml.includes('<table class="richmond-table">'), 'Markdown parser renders styled richmond-table');
assert(renderedHtml.includes('<th>Stage</th>') && renderedHtml.includes('<td>Warmer</td>'), 'Table headers and cells correctly converted');
assert(renderedHtml.includes('<span class="cloze-blank">______</span>'), 'Cloze blanks rendered with interactive underline styling');
assert(renderedHtml.includes('<div class="answer-key-section">'), 'Answer key section isolated in printable container');
assert(renderedHtml.includes('<div class="dialogue-line"><span class="dialogue-speaker">Teacher</span>'), 'Dialogue speakers formatted with badges');
assert(renderedHtml.includes('class="tts-inline-btn"'), 'Dialogue lines include inline TTS listen buttons');

console.log(`\n========================================`);
console.log(`Test Results: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}

