import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shuffle, Sparkles } from "lucide-react";
import AffirmationCard from "@/components/AffirmationCard";
import ImpactSection from "@/components/ImpactSection";
import PromisesLibrary from "@/components/PromisesLibrary";
import PurchaseSection from "@/components/PurchaseSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { affirmations, type Affirmation } from "@/data/affirmations";

const NAME_STORAGE_KEY = "stillpoint:name";

const drawRandom = (exclude?: Affirmation | null): Affirmation => {
  const pool = exclude ? affirmations.filter((a) => a.text !== exclude.text) : affirmations;
  return pool[Math.floor(Math.random() * pool.length)];
};

const Index = () => {
  const [revealed, setRevealed] = useState(false);
  const [current, setCurrent] = useState<Affirmation | null>(null);
  const [drawCount, setDrawCount] = useState(0);
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(NAME_STORAGE_KEY);
    if (saved) {
      setName(saved);
      setNameInput(saved);
    }
  }, []);

  const handleNameSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim().slice(0, 40);
    setName(trimmed);
    if (trimmed) {
      window.localStorage.setItem(NAME_STORAGE_KEY, trimmed);
    } else {
      window.localStorage.removeItem(NAME_STORAGE_KEY);
    }
  }, [nameInput]);

  const handleDraw = useCallback(() => {
    if (!revealed) {
      setCurrent(drawRandom());
      setRevealed(true);
      setDrawCount((c) => c + 1);
    }
  }, [revealed]);

  const handleNew = useCallback(() => {
    // Flip back, then change card after the flip completes
    setRevealed(false);
    window.setTimeout(() => {
      setCurrent((prev) => drawRandom(prev));
      setRevealed(true);
      setDrawCount((c) => c + 1);
    }, 700);
  }, []);

  useEffect(() => {
    document.title = "Daily Affirmations — Draw Your Card";
  }, []);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Soft floating orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[8%] h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-[12%] right-[6%] h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-[40%] right-[20%] h-64 w-64 rounded-full bg-mint/30 blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center gap-2 font-display text-lg">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
          <span className="tracking-tight">Word of Truth</span>
        </div>
        <p className="hidden sm:block text-xs uppercase tracking-[0.35em] text-muted-foreground">
          {today}
        </p>
      </header>

      {/* Hero / Card */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-6 pb-20 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mb-10 sm:mb-14 space-y-5"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            A daily ritual
          </p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[1.05] text-balance">
            {name ? (
              <>
                Hello, <span className="italic gradient-text">{name}</span>.
                <br className="hidden sm:block" /> One card. One breath.
              </>
            ) : (
              <>
                One card. <span className="italic gradient-text">One breath.</span>
                <br className="hidden sm:block" /> One small truth.
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Draw a card whenever you need a quiet word from yourself. It will be waiting.
          </p>

          <form
            onSubmit={handleNameSubmit}
            className="flex items-center gap-2 max-w-sm mx-auto pt-2"
          >
            <Input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={name ? "Change your name" : "What shall we call you?"}
              aria-label="Your name"
              maxLength={40}
              className="rounded-full bg-background/60 backdrop-blur border-primary/20 h-11 px-5 text-center sm:text-left"
            />
            <Button
              type="submit"
              variant="ghost"
              className="rounded-full h-11 px-5 hover:bg-primary/10"
            >
              {name ? "Update" : "Save"}
            </Button>
          </form>
        </motion.div>

        <AffirmationCard
          revealed={revealed}
          affirmation={current}
          onClick={handleDraw}
          name={name}
        />

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center gap-4 h-16">
          {!revealed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={handleDraw}
                className="rounded-full px-8 h-12 text-base font-medium shadow-soft"
              >
                <Sparkles className="mr-2 h-4 w-4" strokeWidth={2} />
                Draw your card
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <Button
                variant="ghost"
                onClick={handleNew}
                className="rounded-full px-6 h-11 text-sm hover:bg-primary/10"
              >
                <Shuffle className="mr-2 h-4 w-4" strokeWidth={1.8} />
                Draw another
              </Button>
              <p className="text-xs text-muted-foreground italic">
                {drawCount === 1
                  ? "Sit with it for a moment."
                  : `${drawCount} cards drawn today`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <PromisesLibrary />
      <PurchaseSection />
      <ContactSection />
      <ImpactSection />

      {/* Footer */}
      <footer className="relative z-10 px-6 pb-10 text-center">
        <p className="font-display italic text-sm text-muted-foreground">
          made with quiet intention
        </p>
      </footer>
    </main>
  );
};

export default Index;
