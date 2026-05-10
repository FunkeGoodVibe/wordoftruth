// Personal avatar built with DiceBear "personas" — an Open Peeps–inspired,
// Bitmoji-style cartoon set that can be fully customised in the browser.

export type AvatarConfig = {
  seed: string;
  skinColor: string;
  hair: string;
  hairColor: string;
  clothingColor: string;
  backgroundColor: string;
};

export const AVATAR_STORAGE_KEY = "stillpoint:avatar";
export const AVATAR_EVENT = "stillpoint:avatar-changed";

// DiceBear personas options (hex without #)
export const SKIN_COLORS = ["b16a5b", "d78774", "e5a07e", "e7a391", "eeb4a4", "f8d25c"];
export const HAIR_STYLES = [
  "bobBangs",
  "bobCut",
  "bunUndercut",
  "buzzcut",
  "cap",
  "curly",
  "curlyBun",
  "curlyHighTop",
  "extraLong",
  "fade",
  "long",
  "mohawk",
  "pigtails",
  "shortCombover",
  "shortComboverChops",
  "sideShave",
  "straightBun",
];
export const HAIR_COLORS = ["6c4545", "362c47", "dee1f5", "e15c66", "e16381", "f27d65", "f29c65"];
export const CLOTHING_COLORS = ["6dbb58", "54d7c7", "456dff", "8338ec", "f55d81", "f9c80e", "f86624"];
export const BACKGROUND_COLORS = ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf", "transparent"];

export const DEFAULT_AVATAR: AvatarConfig = {
  seed: "felix",
  skinColor: "e5a07e",
  hair: "shortCombover",
  hairColor: "362c47",
  clothingColor: "456dff",
  backgroundColor: "ffdfbf",
};

export function avatarUrl(cfg: AvatarConfig): string {
  const params = new URLSearchParams({
    seed: cfg.seed || "felix",
    skinColor: cfg.skinColor,
    hair: cfg.hair,
    hairColor: cfg.hairColor,
    clothingColor: cfg.clothingColor,
    backgroundColor: cfg.backgroundColor,
    radius: "50",
  });
  return `https://api.dicebear.com/9.x/personas/svg?${params.toString()}`;
}

export function loadAvatar(): AvatarConfig {
  if (typeof window === "undefined") return DEFAULT_AVATAR;
  try {
    const raw = window.localStorage.getItem(AVATAR_STORAGE_KEY);
    if (!raw) return DEFAULT_AVATAR;
    return { ...DEFAULT_AVATAR, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_AVATAR;
  }
}

export function saveAvatar(cfg: AvatarConfig) {
  window.localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(cfg));
  window.dispatchEvent(new CustomEvent(AVATAR_EVENT, { detail: cfg }));
}
