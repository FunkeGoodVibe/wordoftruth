# Add a "Work" promises section

Follow the exact pattern used for Finances, Loneliness and Health.

## Changes

1. **src/data/affirmations.ts**
   - Add `"work"` to the `theme` union in the `Affirmation` type.
   - Append ~18 work-themed Bible promises (new `// ── Work ──` block at the end of the array) — covering purpose in work, diligence, integrity at work, resting from labour, God's favour on the work of your hands (e.g. Colossians 3:23, Proverbs 16:3, Psalm 90:17, Genesis 39:2-3, Proverbs 22:29, Ecclesiastes 3:13, Matthew 11:28, 1 Corinthians 10:31, Proverbs 14:23, Colossians 3:17, Proverbs 12:11, Deuteronomy 28:12, 1 Thessalonians 4:11-12, Psalm 128:2, Exodus 33:14, Proverbs 13:4, Ecclesiastes 5:12, 2 Thessalonians 3:3-style encouragement). NIV/ESV paraphrase style, same as the rest.
   - Add `work: "Work"` to `themeLabel`.

2. **src/components/PromisesLibrary.tsx**
   - Add `"work"` to the `THEMES` filter array (after `"health"`).

No other files change — the filter grid, heading count and pagination pick this up automatically.
