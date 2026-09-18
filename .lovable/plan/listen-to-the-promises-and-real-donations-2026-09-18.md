# Listen to the promises, and real donations

Two things: spoken audio for every promise, and the £20 Donate button taking real money.

## 1. Listen to a promise

A small "Listen" button appears on the drawn card and on every promise in the browse library. Tapping it reads the promise aloud in a warm, calm voice, with the Bible reference spoken at the end.

- The first time a promise is played, the audio is created with AI and saved, so every later play is instant and costs nothing.
- The button shows a gentle loading state while the first recording is made, then turns into a pause control.
- Only one promise plays at a time; starting another stops the first.
- If audio can't be made, the button shows a short, plain message and the promise still reads normally on screen.

No upfront batch run of all 419 promises — they build up naturally as people listen, which avoids a long generation job and unnecessary cost.

## 2. Donate £20 for real

The donation flow and the £20 amount are already built; it is currently pointing at a test Stripe environment that has expired. To take real donations you need to claim the Stripe account and finish Stripe's identity, business and bank checks — I can't complete those on your behalf.

I'll open the payments setup for you in this app. Once the account is claimed and verified, the Donate £20 button switches to live automatically, and I'll then run a check that the checkout opens in live mode and confirm the money lands in your account.

## Technical notes

- New edge function `speak-promise` (verify_jwt = false, same origin-restricted CORS as `create-checkout`): takes a promise text + reference, returns the audio.
- Uses the Lovable AI Gateway text-to-speech endpoint, `google/gemini-3.1-flash-tts-preview`, voice `Kore`, prompted with "Say gently and warmly: …". Server-side only with `LOVABLE_API_KEY`.
- Caching: a public storage bucket `promise-audio` keyed by a hash of the promise text. The function checks the bucket first, otherwise generates non-streaming WAV audio, uploads it, and returns the public URL. Promises are short, so a single request per promise — no chunking needed.
- Frontend: `src/hooks/usePromiseAudio.tsx` holds one shared `HTMLAudioElement` plus loading/playing state keyed by promise; a small `ListenButton` component used by `AffirmationCard` and `PromisesLibrary`.
- Payments: run the payments provider recommendation, then the Stripe payments setup tool. No change to `create-checkout` — it already picks sandbox vs live from `getStripeEnvironment()`.
