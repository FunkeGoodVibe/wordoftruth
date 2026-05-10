import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BitmojiIcon from "@/components/BitmojiIcon";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { parables } from "@/data/parables";

interface ParablesSectionProps {
  name: string;
}

const PAGE_SIZE = 6;

const ParablesSection = ({ name }: ParablesSectionProps) => {
  const [page, setPage] = useState(0);

  const protagonist = name?.trim() ? name.trim() : "you";

  const personalised = useMemo(
    () =>
      parables.map((p) => ({
        ...p,
        story: p.story.split("{name}").join(protagonist),
      })),
    [protagonist],
  );

  const totalPages = Math.max(1, Math.ceil(personalised.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * PAGE_SIZE;
  const visible = personalised.slice(start, start + PAGE_SIZE);

  return (
    <section
      id="parables"
      className="relative z-10 px-6 sm:px-12 py-24 sm:py-32"
      aria-labelledby="parables-title"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Stories of Jesus
          </p>
          <h2
            id="parables-title"
            className="font-display text-4xl sm:text-5xl leading-tight text-balance"
          >
            The <span className="italic gradient-text">38 parables</span>
            {name?.trim() ? <> — with you, {name.trim()}, written in</> : null}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {name?.trim()
              ? `Each parable retold with ${name.trim()} as the good and faithful one. A gentle reminder of who you are invited to be.`
              : "Add your name above and watch yourself appear as the good and faithful character in every story."}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={safePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {visible.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-2xl bg-card-front shadow-soft p-6 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <BitmojiIcon name="book" className="h-6 w-6" />
                </div>
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground mb-3">
                  · Parable {start + i + 1} ·
                </p>
                <h3 className="font-display text-xl leading-snug mb-3 text-card-foreground">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-balance">
                  {p.story}
                </p>
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground pt-4">
                  — {p.reference}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

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
          Showing {visible.length} of {personalised.length} parables
        </p>
      </div>
    </section>
  );
};

export default ParablesSection;
