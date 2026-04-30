import { motion } from "framer-motion";

const stats = [
  { value: "2026", label: "Established", sub: "Born from quiet intention" },
  { value: "365", label: "Promises", sub: "Thoughtfully written promises" },
  { value: "100%", label: "Handcrafted", sub: "Premium linen-textured cardstock" },
  { value: "38", label: "Personalised Parables", sub: "You as the good and faithful one" },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col items-center rounded-3xl bg-card/70 backdrop-blur-md border border-border/60 px-6 py-10 shadow-soft transition-all duration-500 hover:shadow-[var(--shadow-glow)] hover:border-primary/40 cursor-default overflow-hidden"
            >
              {/* Soft glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "var(--gradient-glow)" }}
              />

              <div className="relative font-display text-5xl sm:text-6xl gradient-text mb-3 transition-transform duration-500 group-hover:scale-110">
                {stat.value}
              </div>
              <div className="relative text-sm font-medium tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="relative text-xs text-muted-foreground leading-relaxed max-w-[18ch] text-center">
                {stat.sub}
              </div>

              {/* Subtle bottom accent line */}
              <div
                aria-hidden
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent group-hover:w-2/3 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
