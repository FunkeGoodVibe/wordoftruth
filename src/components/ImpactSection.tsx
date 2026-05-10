import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import BitmojiIcon from "@/components/BitmojiIcon";
import UserAvatar from "@/components/UserAvatar";
import { parables } from "@/data/parables";

// TODO: replace with real store URLs once published.
const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";

type Stat = {
  value: string;
  label: string;
  sub: string;
  teaserLabel?: string;
  teaser?: ReactNode;
};

interface ImpactSectionProps {
  name?: string;
}

const ImpactSection = ({ name }: ImpactSectionProps) => {
  const parableTeaser = useMemo(() => {
    const protagonist = name?.trim() || "you";
    const p = parables[Math.floor(Math.random() * parables.length)];
    const firstSentence = p.story.split(/(?<=[.!?])\s/)[0];
    return firstSentence.split("{name}").join(protagonist);
  }, [name]);

  const stats: Stat[] = [
    { value: "2026", label: "Established", sub: "Born from quiet intention" },
    { value: "365", label: "Promises", sub: "Thoughtfully written promises" },
    {
      value: "38",
      label: "Personalised Parables",
      sub: "You as the good and faithful one",
      teaserLabel: "A glimpse",
      teaser: (
        <p className="font-display italic text-xs sm:text-sm text-foreground/80 leading-relaxed text-center text-balance">
          “{parableTeaser}”
        </p>
      ),
    },
    {
      value: "📱",
      label: "Available Now",
      sub: "On the App Store and Google Play",
      teaserLabel: "Get the app",
      teaser: (
        <div className="flex flex-col gap-2">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Words of Life on the App Store"
            className="flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 h-9 text-xs font-medium transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
          >
            <BitmojiIcon name="phone" className="h-6 w-6" />
            <span>App Store</span>
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get Words of Life on Google Play"
            className="flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 h-9 text-xs font-medium transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
          >
            <BitmojiIcon name="phone" className="h-6 w-6" />
            <span>Google Play</span>
          </a>
        </div>
      ),
    },
  ];

  return (
    <section className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
          Our Impact
        </p>
        <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-14 text-balance">
          Built with <span className="italic gradient-text">Love</span>, Shared with Purpose
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center rounded-3xl bg-card/70 backdrop-blur-md border border-border/60 px-6 py-10 shadow-soft transition-all duration-500 hover:shadow-[var(--shadow-glow)] hover:border-primary/40 cursor-default overflow-hidden"
            >
              {/* Soft glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "var(--gradient-glow)" }}
              />

              <div className="relative font-display text-5xl sm:text-6xl gradient-text mb-3 transition-transform duration-500 group-hover:scale-110">
                {stat.value}
              </div>
              <div className="relative text-sm font-medium tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="relative text-xs text-muted-foreground leading-relaxed max-w-[18ch] text-center">
                {stat.sub}
              </div>

              {stat.teaser && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1 + 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative mt-4 pt-4 border-t border-border/50 w-full"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/80 mb-2 text-center">
                    {stat.teaserLabel}
                  </p>
                  {stat.teaser}
                </motion.div>
              )}

              {/* Subtle bottom accent line */}
              <div
                aria-hidden
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent group-hover:w-2/3 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
