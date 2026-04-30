import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <Sparkles className="h-10 w-10 text-primary mx-auto" strokeWidth={1.5} />
        <h1 className="font-display text-4xl">Thank you</h1>
        {sessionId ? (
          <p className="text-muted-foreground leading-relaxed">
            Your donation went through. Every contribution flows to a good cause —
            we're grateful you're part of it.
          </p>
        ) : (
          <p className="text-muted-foreground">
            We couldn't find your payment details. If you were charged, please get in touch.
          </p>
        )}
        <Button asChild className="rounded-full">
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
