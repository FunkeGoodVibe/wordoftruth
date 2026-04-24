export type Affirmation = {
  text: string;
  theme: "calm" | "courage" | "love" | "growth" | "abundance";
};

export const affirmations: Affirmation[] = [
  { text: "I am exactly where I need to be.", theme: "calm" },
  { text: "My breath is my anchor in any storm.", theme: "calm" },
  { text: "Stillness is a kind of strength.", theme: "calm" },
  { text: "I release what I cannot control.", theme: "calm" },
  { text: "Today, I move at the speed of joy.", theme: "calm" },

  { text: "I trust the wisdom my fear is hiding.", theme: "courage" },
  { text: "I am braver than the voice that doubts me.", theme: "courage" },
  { text: "I begin, even before I feel ready.", theme: "courage" },
  { text: "My voice deserves to be heard.", theme: "courage" },
  { text: "I walk toward what lights me up.", theme: "courage" },

  { text: "I am worthy of soft, patient love.", theme: "love" },
  { text: "I speak to myself the way I'd speak to a friend.", theme: "love" },
  { text: "My heart is a garden, and it is blooming.", theme: "love" },
  { text: "I am whole, exactly as I am right now.", theme: "love" },
  { text: "Love is not something I earn — it is something I am.", theme: "love" },

  { text: "Every ending makes room for a tender beginning.", theme: "growth" },
  { text: "I am becoming, and that is enough.", theme: "growth" },
  { text: "My mistakes are how I meet my future self.", theme: "growth" },
  { text: "I give myself permission to evolve.", theme: "growth" },
  { text: "Small steps, taken often, become a path.", theme: "growth" },

  { text: "Good things are quietly finding their way to me.", theme: "abundance" },
  { text: "I welcome more than I think I deserve.", theme: "abundance" },
  { text: "My life is rich in ways I'm only beginning to notice.", theme: "abundance" },
  { text: "I am open to receive.", theme: "abundance" },
  { text: "Joy lives in the smallest moments of my day.", theme: "abundance" },
];

export const themeLabel: Record<Affirmation["theme"], string> = {
  calm: "Calm",
  courage: "Courage",
  love: "Love",
  growth: "Growth",
  abundance: "Abundance",
};
