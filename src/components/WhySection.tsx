import { motion } from "framer-motion";
import { Heart, Sparkles, Sun } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Curated with Care",
    body: "Each affirmation is thoughtfully written, drawn from scripture and quiet reflection.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    body: "Printed on luxurious 400gsm linen-textured cardstock with soft gold foil accents.",
  },
  {
    icon: Sun,
    title: "Daily Ritual",
    body: "Draw a card each morning to set your intention and carry it through the day.",
  },
];

const WhySection = () => {
  return (
    <section className="relative z-10 px-6 sm:px-12 py-20 sm:py-28 bg-background/40 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl sm:text-5xl leading-tight text-balance">
            Why <span className="italic gradient-text">Words that Transform</span>?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-primary/15 bg-card/60 backdrop-blur p-7 shadow-soft text-center"
              >
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
