# Questionnaire pop-up with 10% launch discount

## What visitors will see
A soft pop-up, styled like the rest of the site and greeting them by name if they've entered one:

- Heading: "Help shape Words of Life"
- Text: "Take our short questionnaire and get 10% off your first order when the app is released."
- Buttons: "Take the questionnaire" (opens https://form.jotform.com/262603912130345 in a new tab) and "Maybe later"

## When it appears
Only after the visitor has engaged, whichever comes first:
- 3 seconds after they draw their first card, or
- after they've spent 60 seconds on the site and scrolled past the card section.

It never interrupts a card flip or audio that is playing.

## How often
- "Maybe later" or closing it hides the pop-up for 7 days.
- "Take the questionnaire" hides it permanently on that device.
- It shows at most once per visit.

## Notes
- The discount is honoured through the questionnaire itself. The site doesn't create or track discount codes, because there's nothing to buy yet.
- No other part of the site changes.

## Technical details
- New `src/components/QuestionnairePopup.tsx` using the shadcn `Dialog` and semantic tokens. It takes a `name` prop.
- Index.tsx renders it and passes in an `engaged` flag. The flag is set by a 3s timer after the first `recordDraw`, or by a 60s timer combined with a scroll threshold.
- The pop-up state is saved under the localStorage key `wol:survey` as `{ status: "done" | "snoozed", until }`. A sessionStorage flag limits it to once per visit.
