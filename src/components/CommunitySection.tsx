import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dailyPromise } from "@/lib/dailyPromise";
import { useAuth } from "@/hooks/useAuth";

const CommunitySection = ({ name }: { name?: string }) => {
  const promise = dailyPromise();
  const { user } = useAuth();

  return (
    <section className="relative z-10 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Community</p>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight text-balance">
          {name ? `${name}, you're not reading alone` : "You're not reading alone"}
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Everyone receives the same promise each day. Share that it resonated with you, see who
          else it met, and message them quietly.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-3xl border border-primary/20 bg-background/60 backdrop-blur-xl p-8"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary/70">
            Today, everyone is reading
          </p>
          <p className="mt-4 font-display text-2xl sm:text-3xl italic gradient-text leading-snug">
            {promise.text}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{promise.reference}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm">
            {[
              { icon: Heart, label: "Say it resonated" },
              { icon: Users, label: "See who it met" },
              { icon: MessageCircle, label: "Message privately" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background/70 px-4 py-3"
              >
                <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <Button asChild className="mt-8 rounded-full h-12 px-8 text-base shadow-soft">
            <Link to={user ? "/community" : "/auth"}>
              {user ? "Open the community" : "Join the community"}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
