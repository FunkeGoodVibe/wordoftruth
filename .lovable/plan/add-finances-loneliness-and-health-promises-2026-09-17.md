# Add Finances, Loneliness and Health promises

Extend the promise collection with three new topics, each with 18 verses, so visitors can filter for the area of life they need.

## What changes

- 54 new promises added to the collection: 18 on finances and provision worries, 18 on loneliness and being unseen, 18 on health, healing and strength of body.
- The browse section gains three new filter buttons: Finances, Loneliness, Health — sitting alongside All, Peace, Strength, Love, Guidance, Provision.
- Each new promise carries its Bible reference and shows its topic label on the card, exactly like the existing ones.
- The heading still reads "Browse all 365 promises"; the count line under the pages updates automatically to the new total (419).
- Daily draws and the three-a-day limit continue to work, now drawing from the wider set.

## Technical notes

- `src/data/affirmations.ts`: widen the `Affirmation["theme"]` union with `"finances" | "loneliness" | "health"`, add the three labelled blocks of 18 entries, and add the matching `themeLabel` entries.
- `src/components/PromisesLibrary.tsx`: append the three themes to the `THEMES` array. Pagination, filtering and animation logic need no other change.
- No backend or data-model change.
