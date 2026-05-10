import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import BitmojiIcon from "@/components/BitmojiIcon";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please share your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email must be under 255 characters" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Please write a short message" })
    .max(1000, { message: "Message must be under 1000 characters" }),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Please check your details",
        description: result.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.functions.invoke(
        "send-transactional-email",
        {
          body: {
            templateName: "contact-form-notification",
            idempotencyKey: `contact-${id}`,
            templateData: {
              name: result.data.name,
              email: result.data.email,
              message: result.data.message,
            },
          },
        },
      );
      if (error) throw error;
      toast({
        title: "Message received",
        description: "Thank you for reaching out — we'll be in touch soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Couldn't send your message",
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-4 text-balance">
            A <span className="italic gradient-text">word</span> with us
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Questions, reflections, or a quiet hello — we'd love to hear from you.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-card/70 backdrop-blur-md border border-border/60 p-8 sm:p-10 shadow-soft"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                Your name
              </label>
              <Input
                id="contact-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="What shall we call you?"
                maxLength={100}
                className="h-12 rounded-xl bg-background/60 border-primary/20 px-5"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                maxLength={255}
                className="h-12 rounded-xl bg-background/60 border-primary/20 px-5"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
              >
                Message
              </label>
              <Textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Share what's on your heart…"
                maxLength={1000}
                rows={5}
                className="rounded-xl bg-background/60 border-primary/20 px-5 py-4 resize-none"
                required
              />
              <p className="text-[11px] text-muted-foreground text-right">
                {form.message.length}/1000
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full rounded-full h-12 text-base font-medium shadow-soft"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" strokeWidth={2} />
                  Send message
                </>
              )}
            </Button>

            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <BitmojiIcon name="mail" className="h-5 w-5" />
              We usually reply within a day or two.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
