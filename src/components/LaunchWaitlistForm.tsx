import { useState } from "react";
import { BellRing, Loader2, Check } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email" })
  .max(255, { message: "Email must be under 255 characters" });

const LaunchWaitlistForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [wantsTesting, setWantsTesting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: "Please check your email",
        description: parsed.error.issues[0]?.message ?? "Invalid email",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("app_launch_waitlist")
        .insert({ email: parsed.data, wants_testing: wantsTesting });

      if (error && error.code !== "23505") throw error;

      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-form-notification",
          idempotencyKey: `waitlist-${parsed.data.toLowerCase()}`,
          templateData: {
            name: "App launch waitlist",
            email: parsed.data,
            message: wantsTesting
              ? "Wants to be alerted at launch AND would like to help test the app."
              : "Wants to be alerted when the app launches.",
          },
        },
      });

      setDone(true);
      setEmail("");
      setWantsTesting(false);
      toast({
        title: "You're on the list",
        description: "We'll let you know the moment the app launches.",
      });
    } catch (err) {
      toast({
        title: "Couldn't add you just yet",
        description: err instanceof Error ? err.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative mt-10 rounded-2xl border border-border/60 bg-background/60 backdrop-blur p-6 sm:p-8 text-left">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
        <BellRing className="h-3.5 w-3.5" strokeWidth={1.8} />
        Be first to know
      </p>

      {done ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground leading-relaxed">
          <Check className="h-4 w-4 text-primary" strokeWidth={2} />
          Thank you — we'll be in touch as soon as the app is ready.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Leave your email and we'll let you know the moment the app launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              maxLength={255}
              aria-label="Email address"
              className="h-12 rounded-xl bg-background/70 border-primary/20 px-5"
              required
            />
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="rounded-full h-12 px-6 text-base font-medium shadow-soft shrink-0"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding…
                </>
              ) : (
                "Notify me"
              )}
            </Button>
          </div>

          <label className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed cursor-pointer">
            <Checkbox
              checked={wantsTesting}
              onCheckedChange={(v) => setWantsTesting(v === true)}
              className="mt-0.5"
            />
            I'd also like to help test the app before it launches.
          </label>
        </form>
      )}
    </div>
  );
};

export default LaunchWaitlistForm;
