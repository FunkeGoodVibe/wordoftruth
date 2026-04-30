import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";

const DonateSection = () => {
  const { openCheckout, closeCheckout, isOpen, checkoutElement } = useStripeCheckout();

  const handleDonate = () => {
    openCheckout({
      priceId: "donation_10_gbp",
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  };

  return (
    <section className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Voluntary donation
        </p>
        <h2 className="font-display text-4xl sm:text-5xl leading-tight text-balance">
          Give <span className="italic gradient-text">£10</span>, give a little hope.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          The app is yours, freely. If it has met you in a quiet moment, consider a £10
          donation — every contribution goes to a good cause.
        </p>
        <div className="pt-2">
          <Button
            size="lg"
            onClick={handleDonate}
            className="rounded-full px-8 h-12 text-base font-medium shadow-soft"
          >
            <Heart className="mr-2 h-4 w-4" strokeWidth={2} />
            Donate £10
          </Button>
        </div>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start sm:items-center justify-center overflow-y-auto py-10 px-4">
          <div className="relative w-full max-w-xl bg-background rounded-2xl shadow-soft border border-border">
            <button
              onClick={closeCheckout}
              aria-label="Close"
              className="absolute top-3 right-3 rounded-full p-2 hover:bg-muted transition-colors z-10"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-4 sm:p-6">
              {checkoutElement}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DonateSection;
