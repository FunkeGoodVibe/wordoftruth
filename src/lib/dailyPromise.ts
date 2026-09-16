import { affirmations, type Affirmation } from "@/data/affirmations";

/** Local calendar date as YYYY-MM-DD */
export const todayKey = (d: Date = new Date()): string => {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/** Deterministic index so every member sees the same promise on a given day */
export const dailyPromiseIndex = (key: string = todayKey()): number => {
  const days = Math.floor(Date.parse(`${key}T00:00:00Z`) / 86_400_000);
  return ((days % affirmations.length) + affirmations.length) % affirmations.length;
};

export const dailyPromise = (key: string = todayKey()): Affirmation =>
  affirmations[dailyPromiseIndex(key)];

export const prettyDate = (key: string): string =>
  new Date(`${key}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
