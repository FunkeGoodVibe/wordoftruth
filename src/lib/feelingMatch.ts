import type { Affirmation } from "@/data/affirmations";

type Theme = Affirmation["theme"];

const KEYWORDS: Record<Theme, string[]> = {
  peace: ["anxious", "anxiety", "worried", "worry", "stress", "stressed", "overwhelm", "afraid", "scared", "fear", "nervous", "panic", "restless", "calm", "peace", "troubled", "uneasy"],
  strength: ["tired", "exhausted", "weak", "weary", "drained", "burnt", "burned", "struggling", "hard", "defeated", "give up", "hopeless", "sad", "down", "low", "depressed", "discouraged", "broken"],
  love: ["unloved", "rejected", "worthless", "ashamed", "shame", "guilty", "guilt", "heartbroken", "hurt", "grateful", "thankful", "happy", "joy", "loved", "love", "blessed"],
  guidance: ["confused", "lost", "unsure", "uncertain", "decision", "direction", "stuck", "doubt", "don't know", "dont know", "purpose", "future"],
  provision: ["need", "lack", "waiting", "provide", "hungry", "empty"],
  finances: ["money", "debt", "bills", "rent", "broke", "financial", "finance", "afford", "poor", "savings", "mortgage"],
  loneliness: ["lonely", "alone", "isolated", "forgotten", "left out", "no friends", "abandoned", "miss", "missing", "grief", "grieving"],
  health: ["sick", "ill", "pain", "unwell", "hospital", "health", "healing", "diagnosis", "injury", "hurting", "cancer", "fever"],
  work: ["work", "job", "boss", "career", "office", "unemployed", "interview", "colleague", "deadline", "business", "fired", "redundant"],
};

/** Pick themes that match the feeling text, best match first. */
export const themesForFeeling = (feeling: string): Theme[] => {
  const text = ` ${feeling.toLowerCase()} `;
  if (!text.trim()) return [];
  const scores = (Object.keys(KEYWORDS) as Theme[])
    .map((theme) => ({
      theme,
      score: KEYWORDS[theme].filter((k) => text.includes(k)).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scores.map((s) => s.theme);
};
