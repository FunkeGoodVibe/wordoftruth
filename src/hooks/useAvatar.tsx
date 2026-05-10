import { useEffect, useState } from "react";
import { AVATAR_EVENT, AvatarConfig, loadAvatar } from "@/lib/avatar";

export function useAvatar(): AvatarConfig {
  const [cfg, setCfg] = useState<AvatarConfig>(() => loadAvatar());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<AvatarConfig>).detail;
      if (detail) setCfg(detail);
      else setCfg(loadAvatar());
    };
    window.addEventListener(AVATAR_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(AVATAR_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return cfg;
}
