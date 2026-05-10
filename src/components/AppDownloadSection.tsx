import { motion } from "framer-motion";
import BitmojiIcon from "@/components/BitmojiIcon";
import UserAvatar from "@/components/UserAvatar";

const AppDownloadSection = () => {
  return (
    <section className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-primary/20 bg-card/70 backdrop-blur p-10 sm:p-14 text-center shadow-soft overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          />

          <p className="relative text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
            Take it with you
          </p>
          <div className="relative flex justify-center mb-4">
            <UserAvatar className="h-16 w-16 ring-2 ring-primary/30 shadow-soft" />
          </div>
          <h2 className="relative font-display text-4xl sm:text-5xl leading-tight mb-5 text-balance">
            Download the <span className="italic gradient-text">App</span>
          </h2>
          <p className="relative text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
            A daily card, wherever you are. Quiet, beautiful, always within reach.
          </p>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group flex items-center gap-3 rounded-full border border-border/60 bg-background/60 backdrop-blur px-6 h-14 min-w-[200px] shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
            >
              <BitmojiIcon name="phone" className="h-9 w-9" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Download on the
                </div>
                <div className="text-sm font-medium">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="group flex items-center gap-3 rounded-full border border-border/60 bg-background/60 backdrop-blur px-6 h-14 min-w-[200px] shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
            >
              <BitmojiIcon name="phone" className="h-9 w-9" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Get it on
                </div>
                <div className="text-sm font-medium">Google Play</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
