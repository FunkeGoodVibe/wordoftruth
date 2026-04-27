import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What exactly is Word of Truth?",
    a: "A collection of 365 thoughtfully written promise cards — one for each day — designed to offer a quiet word of encouragement, peace, or guidance whenever you need it.",
  },
  {
    q: "How do I use the daily card draw?",
    a: "Simply tap 'Draw your card' and a single promise will be revealed. Sit with it, breathe, and let it shape your day. You can draw again anytime you'd like a new word.",
  },
  {
    q: "Are the physical cards different from the website?",
    a: "The website lets you experience the promises digitally. The Limited Edition deck is a tangible, handcrafted version on premium linen-textured cardstock — perfect for gifting or keeping by your bedside.",
  },
  {
    q: "When will my order ship?",
    a: "Orders typically ship within 3–5 business days. You'll receive a tracking link by email as soon as your deck is on its way.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes — if your cards arrive damaged or you're not satisfied, reach out within 30 days and we'll make it right.",
  },
];

const FaqSection = () => {
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
            Questions
          </p>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-4 text-balance">
            A few <span className="italic gradient-text">gentle</span> answers
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Everything you might wonder before you begin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-card/70 backdrop-blur-md border border-border/60 p-4 sm:p-6 shadow-soft"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="border-border/60 last:border-0"
              >
                <AccordionTrigger className="text-left font-display text-lg hover:no-underline px-2 py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed px-2 pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
