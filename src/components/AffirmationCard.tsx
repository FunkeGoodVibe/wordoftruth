import { motion, AnimatePresence } from "framer-motion";
import BitmojiIcon from "@/components/BitmojiIcon";
import UserAvatar from "@/components/UserAvatar";
import type { Affirmation } from "@/data/affirmations";
import { themeLabel } from "@/data/affirmations";

type Props = {
  revealed: boolean;
  affirmation: Affirmation | null;
  onClick: () => void;
  name?: string;
};

const AffirmationCard = ({ revealed, affirmation, onClick, name }: Props) => {
  return (
    <div className="perspective relative">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl bg-glow animate-pulse-glow"
      />

      <motion.button
        onClick={onClick}
        aria-label={revealed ? "Affirmation card" : "Draw a card"}
        className="relative h-[28rem] w-[20rem] sm:h-[32rem] sm:w-[22rem] preserve-3d rounded-[2rem] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: revealed ? 1 : 1.03, y: revealed ? 0 : -6 }}
      >
        {/* BACK (decorative) — visible when not revealed */}
        <div className="card-face absolute inset-0 rounded-[2rem] bg-card-back shadow-card overflow-hidden">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 40%)",
            }}
          />
          {/* Border frame */}
          <div className="absolute inset-4 rounded-[1.5rem] border border-primary-foreground/30" />
          <div className="absolute inset-6 rounded-[1.25rem] border border-primary-foreground/20" />

          <div className="relative h-full w-full flex flex-col items-center justify-center text-primary-foreground p-10 gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <BitmojiIcon name="sparkle" className="h-24 w-24 drop-shadow-lg" />
            </motion.div>
            <UserAvatar className="h-16 w-16 ring-2 ring-primary-foreground/40 shadow-soft" />
            <div className="text-center space-y-2">
              <p className="font-display italic text-2xl tracking-wide">
                a gentle word
              </p>
              <p className="text-xs uppercase tracking-[0.4em] opacity-70">
                tap to draw
              </p>
            </div>
            <div className="absolute bottom-8 flex gap-1.5">
              <span className="h-1 w-1 rounded-full bg-primary-foreground/60" />
              <span className="h-1 w-6 rounded-full bg-primary-foreground/60" />
              <span className="h-1 w-1 rounded-full bg-primary-foreground/60" />
            </div>
          </div>
        </div>

        {/* FRONT — visible when revealed */}
        <div
          className="card-face absolute inset-0 rounded-[2rem] bg-card-front shadow-card overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-4 rounded-[1.5rem] border border-primary/20" />

          <div className="relative h-full w-full flex flex-col items-center justify-between text-card-foreground p-8 sm:p-10">
            {/* Theme tag */}
            <AnimatePresence mode="wait">
              {affirmation && (
                <motion.span
                  key={affirmation.text + "-tag"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.55, duration: 0.6 }}
                  className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground"
                >
                  · {themeLabel[affirmation.theme]} ·
                </motion.span>
              )}
            </AnimatePresence>

            {/* The promise */}
            <div className="flex-1 flex flex-col items-center justify-center px-2 gap-4">
              <AnimatePresence mode="wait">
                {affirmation && (
                  <motion.div
                    key={affirmation.text + (name ?? "")}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3 text-center"
                  >
                    {name && (
                      <p className="font-display italic text-base text-muted-foreground">
                        Dear{" "}
                        <motion.span
                          initial={{ opacity: 0, scale: 0.6, y: 6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-block gradient-text not-italic font-display text-2xl sm:text-3xl animate-pulse-glow"
                        >
                          {name}
                        </motion.span>
                        ,
                      </p>
                    )}
                    <p className="font-display text-2xl sm:text-[1.65rem] leading-snug text-balance gradient-text">
                      “{affirmation.text}”
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground pt-1">
                      — {affirmation.reference}
                    </p>
                    <p className="font-display italic text-base text-muted-foreground pt-2">
                      Love from your Father
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {affirmation && (
                <motion.div
                  key={affirmation.text + "-foot"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.85, duration: 0.6 }}
                  className="flex flex-col items-center gap-3"
                >
                  <BitmojiIcon name="sparkle" className="h-7 w-7" />
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    a promise for you
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

export default AffirmationCard;
