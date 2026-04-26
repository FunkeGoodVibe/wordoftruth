import { motion } from "framer-motion";

const stats = [
  { value: "2,400+", label: "Happy Customers", sub: "Loved by thousands worldwide" },
  { value: "52", label: "Unique Cards", sub: "Thoughtfully written affirmations" },
  { value: "4.9★", label: "Average Rating", sub: "Across all customer reviews" },
  { value: "100%", label: "Handcrafted", sub: "Premium linen-textured cardstock" },
];

const ImpactSection = () => {
  return (
    <section className="relative z-10 px-6 sm:px-12 py-20 sm:py-28">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-4">
          Our Impact
        </p>
        <h2 className="font-display text-4xl sm:text-5xl leading-tight mb-14 text-balance">
          Built with <span className="italic gradient-text">Love</span>, Shared with Purpose
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <div className="font-display text-4xl sm:text-5xl gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium tracking-wide mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground leading-relaxed max-w-[14ch]">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
