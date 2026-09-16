import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Apple, ArrowLeft, Heart, Smartphone, Star } from "lucide-react";
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

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-8"
        >
          <div className="mx-auto sm:mx-0 h-24 w-24 shrink-0 rounded-[1.6rem] border border-border/60 bg-card/80 backdrop-blur shadow-soft flex items-center justify-center">
            <span className="font-display text-3xl gradient-text italic">W</span>
          </div>
          <div className="text-center sm:text-left space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Now on mobile</p>
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

        <section className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-full border border-border/60 bg-background/60 backdrop-blur px-6 h-14 min-w-[200px] shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
          >
            <Apple className="h-6 w-6" strokeWidth={1.6} />
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Download on the</div>
              <div className="text-sm font-medium">App Store</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-full border border-border/60 bg-background/60 backdrop-blur px-6 h-14 min-w-[200px] shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
          >
            <Smartphone className="h-6 w-6" strokeWidth={1.6} />
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Get it on</div>
              <div className="text-sm font-medium">Google Play</div>
            </div>
          </a>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl mb-6">A quiet moment, every day</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {screens.map((screen, i) => (
              <motion.div
                key={screen.alt}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl overflow-hidden border border-border/60 bg-card/60 backdrop-blur shadow-soft"
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

        <section className="mt-16 max-w-2xl space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl">About this app</h2>
          <p className="text-muted-foreground leading-relaxed">
            Words of Life gives you one Bible promise at a time, written as a letter to you by name.
            Draw a card each morning, browse all 365 promises by theme — peace, strength, love,
            guidance and provision — and read 38 parables retold with you as the faithful one.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            No adverts, no noise. Just a still place to begin your day.
          </p>
        </section>

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
