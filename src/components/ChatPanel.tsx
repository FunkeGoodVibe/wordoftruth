import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export type Message = {
  id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  created_at: string;
};

type Props = {
  meId: string;
  partnerId: string;
  partnerName: string;
};

const ChatPanel = ({ meId, partnerId, partnerName }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("direct_messages")
      .select("id, sender_id, recipient_id, body, created_at")
      .or(
        `and(sender_id.eq.${meId},recipient_id.eq.${partnerId}),and(sender_id.eq.${partnerId},recipient_id.eq.${meId})`,
      )
      .order("created_at", { ascending: true })
      .limit(200);
    if (error) return;
    setMessages((data ?? []) as Message[]);
  }, [meId, partnerId]);

  useEffect(() => {
    void load();
    const channel = supabase
      .channel(`dm-${[meId, partnerId].sort().join("-")}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "direct_messages" },
        (payload) => {
          const row = payload.new as Message;
          const relevant =
            (row.sender_id === meId && row.recipient_id === partnerId) ||
            (row.sender_id === partnerId && row.recipient_id === meId);
          if (!relevant) return;
          setMessages((prev) => (prev.some((m) => m.id === row.id) ? prev : [...prev, row]));
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [load, meId, partnerId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim().slice(0, 1000);
    if (!body) return;
    setSending(true);
    const { error } = await supabase
      .from("direct_messages")
      .insert({ sender_id: meId, recipient_id: partnerId, body });
    setSending(false);
    if (error) {
      toast.error("Message could not be sent.");
      return;
    }
    setDraft("");
    void load();
  };

  return (
    <div className="flex flex-col h-[60vh] sm:h-[420px]">
      <ScrollArea className="flex-1 pr-3">
        <div className="space-y-3 py-2">
          {messages.length === 0 && (
            <p className="text-sm text-muted-foreground italic text-center py-10">
              No messages yet. Say hello to {partnerName}.
            </p>
          )}
          {messages.map((m) => {
            const mine = m.sender_id === meId;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    mine
                      ? "bg-primary/15 text-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {m.body}
                </div>
              </motion.div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <form onSubmit={send} className="mt-3 flex items-center gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={1000}
          placeholder={`Message ${partnerName}…`}
          className="rounded-full bg-background/80 h-11 px-5"
        />
        <Button type="submit" disabled={sending} className="rounded-full h-11 px-5">
          <Send className="h-4 w-4" strokeWidth={1.8} />
        </Button>
      </form>
    </div>
  );
};

export default ChatPanel;
