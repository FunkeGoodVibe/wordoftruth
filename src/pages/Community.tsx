import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { dailyPromise, dailyPromiseIndex, prettyDate, todayKey } from "@/lib/dailyPromise";
import ChatPanel from "@/components/ChatPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Member = { id: string; display_name: string };
type Comment = { id: string; user_id: string; body: string; created_at: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

const Community = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const dateKey = useMemo(() => todayKey(), []);
  const promise = useMemo(() => dailyPromise(dateKey), [dateKey]);

  const [resonated, setResonated] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [authors, setAuthors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState("");
  const [chatWith, setChatWith] = useState<Member | null>(null);

  useEffect(() => {
    document.title = "Community — Words of Life";
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  const namesFor = useCallback(async (ids: string[]) => {
    const unique = Array.from(new Set(ids)).filter(Boolean);
    if (unique.length === 0) return {} as Record<string, string>;
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", unique);
    return Object.fromEntries(
      ((data ?? []) as Member[]).map((p) => [p.id, p.display_name]),
    ) as Record<string, string>;
  }, []);

  const loadResonances = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("resonances")
      .select("user_id")
      .eq("promise_date", dateKey);
    const ids = ((data ?? []) as { user_id: string }[]).map((r) => r.user_id);
    setResonated(ids.includes(user.id));
    const map = await namesFor(ids);
    setMembers(
      ids
        .filter((id) => id !== user.id)
        .map((id) => ({ id, display_name: map[id] ?? "A friend" })),
    );
  }, [dateKey, namesFor, user]);

  const loadComments = useCallback(async () => {
    const { data } = await supabase
      .from("promise_comments")
      .select("id, user_id, body, created_at")
      .eq("promise_date", dateKey)
      .order("created_at", { ascending: true })
      .limit(200);
    const rows = (data ?? []) as Comment[];
    setComments(rows);
    setAuthors(await namesFor(rows.map((c) => c.user_id)));
  }, [dateKey, namesFor]);

  useEffect(() => {
    if (!user) return;
    void loadResonances();
    void loadComments();

    const channel = supabase
      .channel(`community-${dateKey}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "promise_comments" },
        () => void loadComments(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "resonances" },
        () => void loadResonances(),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [dateKey, loadComments, loadResonances, user]);

  const toggleResonate = async () => {
    if (!user) return;
    if (resonated) {
      const { error } = await supabase
        .from("resonances")
        .delete()
        .eq("user_id", user.id)
        .eq("promise_date", dateKey);
      if (error) return toast.error("Could not update that just now.");
      setResonated(false);
    } else {
      const { error } = await supabase.from("resonances").insert({
        user_id: user.id,
        promise_date: dateKey,
        promise_index: dailyPromiseIndex(dateKey),
      });
      if (error) return toast.error("Could not update that just now.");
      setResonated(true);
      toast.success("Shared. You'll see who else this met today.");
    }
    void loadResonances();
  };

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const body = draft.trim().slice(0, 600);
    if (!body) return;
    const { error } = await supabase
      .from("promise_comments")
      .insert({ user_id: user.id, promise_date: dateKey, body });
    if (error) return toast.error("Your message could not be posted.");
    setDraft("");
    void loadComments();
  };

  if (loading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-display italic text-muted-foreground">one moment…</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[8%] left-[6%] h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-[10%] right-[8%] h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.8} />
          <span className="tracking-tight">Words of Life</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {profile?.display_name}
          </span>
          <Button variant="ghost" className="rounded-full h-9 px-4 text-sm" onClick={() => void signOut()}>
            Sign out
          </Button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Today's promise · {prettyDate(dateKey)}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl leading-tight text-balance">
            <span className="gradient-text italic">{promise.text}</span>
          </h1>
          <p className="text-sm text-muted-foreground">{promise.reference}</p>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Button
            onClick={toggleResonate}
            variant={resonated ? "outline" : "default"}
            className="rounded-full h-12 px-7 text-base shadow-soft"
          >
            <Heart
              className={`mr-2 h-4 w-4 ${resonated ? "fill-primary text-primary" : ""}`}
              strokeWidth={1.8}
            />
            {resonated ? "This resonated with me" : "This resonates with me"}
          </Button>
        </div>

        {/* Who it met today */}
        <div className="mt-14 rounded-3xl border border-primary/20 bg-background/60 backdrop-blur-xl p-7">
          <h2 className="font-display text-2xl">Who this promise met today</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {resonated
              ? members.length > 0
                ? "Say hello — a private message stays between the two of you."
                : "You're first today. Others will appear here as the day unfolds."
              : "Share that today's promise resonates with you to see who else it met."}
          </p>

          {resonated && members.length > 0 && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {members.map((m, i) => (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-medium">
                      {initials(m.display_name)}
                    </span>
                    <span className="truncate text-sm">{m.display_name}</span>
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-xs hover:bg-primary/10"
                    onClick={() => setChatWith(m)}
                  >
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.8} />
                    Message
                  </Button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Public thread */}
        <div className="mt-8 rounded-3xl border border-primary/20 bg-background/60 backdrop-blur-xl p-7">
          <h2 className="font-display text-2xl">Today's conversation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Open to everyone reading today's promise.
          </p>

          <form onSubmit={postComment} className="mt-5 flex items-center gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={600}
              placeholder="What did this promise stir in you?"
              className="rounded-full bg-background/80 h-11 px-5"
            />
            <Button type="submit" className="rounded-full h-11 px-5">
              <Send className="h-4 w-4" strokeWidth={1.8} />
            </Button>
          </form>

          <ul className="mt-6 space-y-4">
            {comments.length === 0 && (
              <li className="text-sm italic text-muted-foreground">
                No reflections yet — yours can be the first.
              </li>
            )}
            {comments.map((c) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/40 text-xs font-medium">
                  {initials(authors[c.user_id] ?? "F")}
                </span>
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{authors[c.user_id] ?? "A friend"}</span>{" "}
                    <span className="text-muted-foreground text-xs">
                      {new Date(c.created_at).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">
                    {c.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Dialog open={!!chatWith} onOpenChange={(open) => !open && setChatWith(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {chatWith?.display_name}
            </DialogTitle>
          </DialogHeader>
          {chatWith && (
            <ChatPanel
              meId={user.id}
              partnerId={chatWith.id}
              partnerName={chatWith.display_name}
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Community;
