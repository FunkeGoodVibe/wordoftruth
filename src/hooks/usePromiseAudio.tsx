import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SpokenPromise {
  text: string;
  reference: string;
}

const promiseKey = (p: SpokenPromise) => `${p.text}|${p.reference}`;

interface PromiseAudioValue {
  activeKey: string | null;
  loadingKey: string | null;
  errorKey: string | null;
  toggle: (promise: SpokenPromise) => void;
  keyFor: (promise: SpokenPromise) => string;
}

const PromiseAudioContext = createContext<PromiseAudioValue | null>(null);

export function PromiseAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlCache = useRef<Map<string, string>>(new Map());
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveKey(null);
  }, []);

  const play = useCallback((key: string, url: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const el = audioRef.current;
    el.src = url;
    el.onended = () => setActiveKey(null);
    el.onerror = () => {
      setActiveKey(null);
      setErrorKey(key);
    };
    setActiveKey(key);
    void el.play().catch(() => {
      setActiveKey(null);
      setErrorKey(key);
    });
  }, []);

  const toggle = useCallback(
    (promise: SpokenPromise) => {
      const key = promiseKey(promise);
      setErrorKey(null);

      if (activeKey === key) {
        stop();
        return;
      }
      stop();
      if (loadingKey) return;

      const cached = urlCache.current.get(key);
      if (cached) {
        play(key, cached);
        return;
      }

      setLoadingKey(key);
      void (async () => {
        try {
          const { data, error } = await supabase.functions.invoke("speak-promise", {
            body: { text: promise.text, reference: promise.reference },
          });
          if (error || !data?.url) throw new Error(error?.message ?? "No audio");
          urlCache.current.set(key, data.url as string);
          play(key, data.url as string);
        } catch {
          setErrorKey(key);
        } finally {
          setLoadingKey(null);
        }
      })();
    },
    [activeKey, loadingKey, play, stop],
  );

  const value = useMemo<PromiseAudioValue>(
    () => ({ activeKey, loadingKey, errorKey, toggle, keyFor: promiseKey }),
    [activeKey, loadingKey, errorKey, toggle],
  );

  return <PromiseAudioContext.Provider value={value}>{children}</PromiseAudioContext.Provider>;
}

export function usePromiseAudio() {
  const ctx = useContext(PromiseAudioContext);
  if (!ctx) throw new Error("usePromiseAudio must be used within PromiseAudioProvider");
  return ctx;
}
