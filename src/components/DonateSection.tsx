import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { isPaymentsConfigured } from "@/lib/stripe";

const PRESETS = [5, 10, 25, 50];
// Stripe's minimum charge is 50p.
const MIN_CENTS = 50;

const formatGbp = (cents: number) => {
  const pounds = cents / 100;
  return `£${Number.isInteger(pounds) ? pounds : pounds.toFixed(2)}`;
};

const DonateSection = () => {
  const [amountStr, setAmountStr] = useState("");
  const { openCheckout, closeCheckout, isOpen, checkoutElement } = useStripeCheckout();
  const paymentsReady = isPaymentsConfigured();

  const parsed = Number.parseFloat(amountStr);
  const amountInCents = Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
  const isValid = amountInCents >= MIN_CENTS && amountInCents <= 1_000_000;

  const handleDonate = () => {
    if (!isValid) return;
    openCheckout({
      amountInCents,
      returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  };

  return (
    <section id="donate" className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Voluntary donation</p>
        <h2 className="font-display text-4xl sm:text-5xl leading-tight text-balance">
          Give <span className="italic gradient-text">any amount</span>, give a little hope.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          The app is yours, freely. If it has met you in a quiet moment, consider a donation of
          whatever feels right to you.
        </p>

        <div className="pt-2 space-y-4">
          <div className="relative max-w-[200px] mx-auto">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground font-display">
              £
            </span>
            <Input
              type="number"
              inputMode="decimal"
              min="0.5"
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="Enter an amount"
              aria-label="Donation amount in pounds"
              className="rounded-full bg-background/80 backdrop-blur border-primary/30 h-12 pl-10 pr-4 text-center text-lg focus-visible:ring-primary/40 focus-visible:border-primary/60"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {PRESETS.map((preset) => {
              const selected = amountInCents === preset * 100;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmountStr(String(preset))}
                  className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50 hover:bg-primary/10"
                  }`}
                >
                  £{preset}
                </button>
              );
            })}
          </div>

          <div>
            <Button
              size="lg"
              onClick={handleDonate}
              disabled={!paymentsReady || !isValid}
              className="rounded-full px-8 h-12 text-base font-medium shadow-soft"
            >
              <Heart className="mr-2 h-4 w-4" strokeWidth={2} />
              {isValid ? `Donate ${formatGbp(amountInCents)}` : "Donate"}
            </Button>
            {!paymentsReady && (
              <p className="mt-4 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Donations aren't open just yet — they'll go live as soon as the payment setup is
                complete.
              </p>
            )}
            {paymentsReady && amountStr.trim() !== "" && !isValid && (
              <p className="mt-4 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Please enter an amount of £0.50 or more.
              </p>
            )}
          </div>
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
            <div className="p-4 sm:p-6">{checkoutElement}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DonateSection;
