import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { affirmations, themeLabel, type Affirmation } from "@/data/affirmations";

const PAGE_SIZE = 9;
const THEMES: Array<Affirmation["theme"] | "all"> = [
  "all",
  "peace",
  "strength",
  "love",
  "guidance",
  "provision",
];

interface PromisesLibraryProps {
  name?: string;
}

const PromisesLibrary = ({ name }: PromisesLibraryProps) => {
  const [activeTheme, setActiveTheme] = useState<Affirmation["theme"] | "all">("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(
    () =>
      activeTheme === "all"
        ? affirmations
        : affirmations.filter((a) => a.theme === activeTheme),
    [activeTheme],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const handleTheme = (theme: Affirmation["theme"] | "all") => {
    setActiveTheme(theme);
    setPage(0);
  };

  return (
    <section
      id="promises-library"
      className="relative z-10 px-6 sm:px-12 py-24 sm:py-32"
      aria-labelledby="promises-library-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {name ? `Curated for ${name}` : "The full collection"}
          </p>
          <h2
            id="promises-library-title"
            className="font-display text-4xl sm:text-5xl leading-tight text-balance"
          >
            {name ? (
              <>
                <span className="italic gradient-text">{name}</span>, browse all{" "}
                <span className="italic gradient-text">365 promises</span>
              </>
            ) : (
              <>
                Browse all <span className="italic gradient-text">365 promises</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {name
              ? `Wander through the library at your own pace, ${name}. Filter by theme, turn the pages, and let the right word find you.`
              : "Wander through the library at your own pace. Filter by theme, turn the pages, and let the right word find you."}
          </p>
        </div>

        {/* Theme filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {THEMES.map((theme) => {
            const isActive = activeTheme === theme;
            return (
              <button
                key={theme}
                onClick={() => handleTheme(theme)}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-background/60 backdrop-blur border border-primary/15 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
                aria-pressed={isActive}
              >
                {theme === "all" ? "All" : themeLabel[theme]}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTheme}-${safePage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visible.map((a, i) => (
              <article
                key={`${a.reference}-${start + i}`}
                className="group relative rounded-2xl bg-card-front shadow-soft p-6 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground mb-3">
                  · {themeLabel[a.theme]} ·
                </p>
                <p className="font-display text-lg leading-snug text-balance text-card-foreground">
                  &ldquo;{a.text}&rdquo;
                </p>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground pt-4">
                  — {a.reference}
                </p>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="rounded-full h-11 w-11 hover:bg-primary/10"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground min-w-[8rem] text-center">
            Page {safePage + 1} of {totalPages}
          </p>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={safePage >= totalPages - 1}
            className="rounded-full h-11 w-11 hover:bg-primary/10"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground italic">
          Showing {visible.length} of {filtered.length}
          {activeTheme !== "all" ? ` ${themeLabel[activeTheme].toLowerCase()} promises` : " promises"}
        </p>
      </div>
    </section>
  );
};

export default PromisesLibrary;
