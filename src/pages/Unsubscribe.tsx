import { useEffect, useState } from "react";
import { Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State =
  | "validating"
  | "ready"
  | "already"
  | "invalid"
  | "submitting"
  | "done"
  | "error";

const Unsubscribe = () => {
  const [state, setState] = useState<State>("validating");
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  useEffect(() => {
    document.title = "Unsubscribe — Words of Life";
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } },
        );
        const json = await res.json();
        if (json.valid) setState("ready");
        else if (json.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("invalid");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON,
          },
          body: JSON.stringify({ token }),
        },
      );
      const json = await res.json();
      if (json.success) setState("done");
      else if (json.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center rounded-3xl bg-card/70 backdrop-blur-md border border-border/60 p-10 shadow-soft">
        {state === "validating" && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Checking your link…</p>
          </div>
        )}
        {state === "ready" && (
          <>
            <h1 className="font-display text-3xl mb-3">Unsubscribe</h1>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Confirm to stop receiving emails from Words of Life.
            </p>
            <Button onClick={confirm} size="lg" className="rounded-full px-8">
              Confirm unsubscribe
            </Button>
          </>
        )}
        {state === "submitting" && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Processing…</p>
          </div>
        )}
        {state === "done" && (
          <>
            <Check className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h1 className="font-display text-2xl mb-2">You're unsubscribed</h1>
            <p className="text-sm text-muted-foreground">
              You will no longer receive emails from us.
            </p>
          </>
        )}
        {state === "already" && (
          <>
            <Check className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <h1 className="font-display text-2xl mb-2">Already unsubscribed</h1>
            <p className="text-sm text-muted-foreground">
              This email is already removed from our list.
            </p>
          </>
        )}
        {(state === "invalid" || state === "error") && (
          <>
            <X className="h-8 w-8 mx-auto mb-4 text-destructive" />
            <h1 className="font-display text-2xl mb-2">
              {state === "invalid" ? "Invalid link" : "Something went wrong"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Please try again or contact us if the problem persists.
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
