import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PurchaseSection = () => {
  return (
    <section className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-primary/20 bg-card/70 backdrop-blur p-10 sm:p-14 text-center shadow-soft overflow-hidden"
        >
          {/* Decorative orb */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          />

          <p className="relative text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
            Limited Edition
          </p>
          <h2 className="relative font-display text-4xl sm:text-5xl leading-tight mb-5 text-balance">
            Begin Your <span className="italic gradient-text">Practice</span>
          </h2>
          <p className="relative text-base text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
            52 affirmation cards + a guidebook for daily rituals, packaged in a beautiful keepsake box.
          </p>

          <div className="relative flex flex-col items-center gap-1 mb-8">
            <div className="font-display text-5xl gradient-text">£25.00</div>
            <p className="text-xs text-muted-foreground italic">Free shipping in the UK</p>
          </div>

          <div className="relative flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-10 h-12 text-base font-medium shadow-soft"
            >
              <Sparkles className="mr-2 h-4 w-4" strokeWidth={2} />
              Buy Now
            </Button>
            <p className="text-xs text-muted-foreground tracking-wide">
              Apple Pay · PayPal · Card
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              ★★★★★ Loved by 2,400+ customers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PurchaseSection;
