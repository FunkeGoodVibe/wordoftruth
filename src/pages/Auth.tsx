import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({
  displayName: z.string().trim().min(1, "Please add a name").max(40).optional(),
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(6, "Use at least 6 characters").max(72),
});

const AuthPage = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Join the Community — Words of Life";
    const saved = window.localStorage.getItem("stillpoint:name");
    if (saved) setDisplayName(saved);
  }, []);

  useEffect(() => {
    if (!loading && user) navigate("/community", { replace: true });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      displayName: mode === "signup" ? displayName : undefined,
      email,
      password,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/community`,
            data: { display_name: displayName.trim().slice(0, 40) },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setSent(true);
          toast.success("Check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in did not complete. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate("/community", { replace: true });
  };

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[12%] left-[10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header className="relative z-10 px-6 sm:px-12 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
          <span className="tracking-tight">Words of Life</span>
        </Link>
      </header>

      <section className="relative z-10 flex-1 flex items-center justify-center px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-3xl border border-primary/20 bg-background/70 backdrop-blur-xl p-8 shadow-soft"
        >
          <h1 className="font-display text-3xl sm:text-4xl text-center leading-tight">
            {mode === "signup" ? "Join the circle" : "Welcome back"}
          </h1>
          <p className="mt-3 text-center text-sm text-muted-foreground leading-relaxed">
            One promise a day, shared with everyone. See who it met today, and say hello.
          </p>

          {sent ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              We've sent a confirmation link to <span className="text-foreground">{email}</span>.
              Open it to finish joining.
            </p>
          ) : (
            <>
              <form onSubmit={submit} className="mt-8 space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Your name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      maxLength={40}
                      placeholder="What shall we call you?"
                      className="rounded-full bg-background/80 h-11 px-5"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-full bg-background/80 h-11 px-5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="rounded-full bg-background/80 h-11 px-5"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full h-11 text-base shadow-soft"
                >
                  {mode === "signup" ? "Create my account" : "Sign in"}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">or</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={google}
                disabled={busy}
                className="w-full rounded-full h-11 bg-background/80"
              >
                Continue with Google
              </Button>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                  className="text-primary underline underline-offset-4"
                >
                  {mode === "signup" ? "Sign in" : "Create one"}
                </button>
              </p>
            </>
          )}
        </motion.div>
      </section>
    </main>
  );
};

export default AuthPage;
