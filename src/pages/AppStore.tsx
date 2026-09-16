// ============= App listing page =============
// When the app is approved on each store, replace the two placeholder URLs
// below with the real listing links. Everything else can stay as-is.

const APP_STORE_URL = "https://apps.apple.com/app/words-of-life/idPLACEHOLDER";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.wordsoflife.app";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Apple, ArrowLeft, Heart, Info, Smartphone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import libraryScreen from "@/assets/app-screen-library.png.asset.json";
import communityScreen from "@/assets/app-screen-community.png.asset.json";

const screens = [
  { src: libraryScreen.url, alt: "Browsing the library of 365 Bible promises by theme" },
  {
    src: communityScreen.url,
    alt: "Community screen — connect with others who resonate with the same promise",
  },
];

const appInfo = [
  { label: "Price", value: "Free" },
  { label: "Category", value: "Lifestyle" },
  { label: "Compatibility", value: "iPhone, iPad & Android" },
  { label: "Languages", value: "English" },
  { label: "Age rating", value: "4+" },
  { label: "Developer", value: "Words of Life" },
  { label: "In-app donations", value: "Voluntary £20" },
];

const AppStorePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div aria-hidden className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Words of Life
        </Link>

        {/* Store-style header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-8"
        >
          <div className="mx-auto sm:mx-0 h-28 w-28 shrink-0 rounded-[1.8rem] border border-border/60 bg-card/80 backdrop-blur shadow-soft flex items-center justify-center">
            <span className="font-display text-4xl gradient-text italic">W</span>
          </div>
          <div className="text-center sm:text-left space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Words of Life Dev</p>
            <h1 className="font-display text-4xl sm:text-5xl leading-tight text-balance">
              Words of <span className="italic gradient-text">Life</span>
            </h1>
            <p className="text-muted-foreground">
              Daily Bible promises, personally addressed to you.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4" strokeWidth={1.8} /> Free to download
              </span>
              <span>365 promises</span>
              <span>38 parables</span>
              <span>iOS &amp; Android</span>
            </div>
          </div>
        </motion.header>

        {/* Download buttons — placeholder store links, swap when approved */}
        <section className="mt-12">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-border/60 bg-background/60 backdrop-blur px-6 h-14 min-w-[200px] shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
            >
              <Apple className="h-6 w-6" strokeWidth={1.6} />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Download on the</div>
                <div className="text-sm font-medium">App Store</div>
              </div>
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-border/60 bg-background/60 backdrop-blur px-6 h-14 min-w-[200px] shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
            >
              <Smartphone className="h-6 w-6" strokeWidth={1.6} />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Get it on</div>
                <div className="text-sm font-medium">Google Play</div>
              </div>
            </a>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" strokeWidth={1.8} />
            Coming soon to the App Store and Google Play.
          </p>
        </section>

        {/* Screenshots, store style */}
        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl mb-6">Preview</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 snap-x">
            {screens.map((screen, i) => (
              <motion.div
                key={screen.alt}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="snap-center shrink-0 w-[240px] sm:w-[280px] rounded-[2rem] overflow-hidden border border-border/60 bg-card/60 backdrop-blur shadow-soft"
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  loading="lazy"
                  width={640}
                  height={1280}
                  className="w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* About this app */}
        <section className="mt-16 max-w-2xl space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl">About this app</h2>
          <p className="text-muted-foreground leading-relaxed">
            Words of Life gives you one Bible promise at a time, written as a letter to you by name.
            Draw a card each morning, browse all 365 promises by theme — peace, strength, love,
            guidance and provision — and read 38 parables retold with you as the faithful one.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You can also connect with others in the app who resonate with the same affirmation as
            you on any given day — a gentle way to share the journey. No adverts, no noise. Just a
            still place to begin your day.
          </p>
        </section>

        {/* App information */}
        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl mb-6">Information</h2>
          <dl className="max-w-2xl rounded-3xl border border-border/60 bg-card/60 backdrop-blur shadow-soft divide-y divide-border/40">
            {appInfo.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-6 px-6 py-4">
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-medium text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Donation */}
        <section className="mt-16 rounded-3xl border border-primary/20 bg-card/70 backdrop-blur p-10 text-center shadow-soft">
          <h2 className="font-display text-3xl sm:text-4xl mb-4 text-balance">
            Free to keep. <span className="italic gradient-text">£20</span> if it moved you.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            The app costs nothing. If it has met you in a quiet moment, a voluntary £20 donation goes
            to a good cause.
          </p>
          <Button asChild size="lg" className="rounded-full px-8 h-12 text-base font-medium shadow-soft">
            <Link to="/#donate">
              <Heart className="mr-2 h-4 w-4" strokeWidth={2} />
              Donate £20
            </Link>
          </Button>
        </section>
      </div>
    </main>
  );
};

export default AppStorePage;
