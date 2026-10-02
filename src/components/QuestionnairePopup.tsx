import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SURVEY_URL = "https://form.jotform.com/262603912130345";
const STORAGE_KEY = "wol:survey";
const SESSION_KEY = "wol:survey-shown";
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

const canShow = () => {
  try {
    if (window.sessionStorage.getItem(SESSION_KEY)) return false;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const s = JSON.parse(raw) as { status?: string; until?: number };
    if (s.status === "done") return false;
    if (s.status === "snoozed" && typeof s.until === "number" && s.until > Date.now()) return false;
  } catch {
    /* ignore */
  }
  return true;
};

const QuestionnairePopup = ({ engaged, name }: { engaged: boolean; name?: string }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (engaged && canShow()) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    }
  }, [engaged]);

  const snooze = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: "snoozed", until: Date.now() + SNOOZE_MS }));
    setOpen(false);
  };

  const take = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: "done" }));
    window.open(SURVEY_URL, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : snooze())}>
      <DialogContent className="rounded-3xl border-primary/20 bg-card/95 backdrop-blur text-center sm:max-w-md">
        <DialogHeader className="items-center space-y-3">
          <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.6} />
          <DialogTitle className="font-display text-3xl leading-tight text-center">
            {name ? (
              <>
                {name}, help shape <span className="italic gradient-text">Words of Life</span>
              </>
            ) : (
              <>
                Help shape <span className="italic gradient-text">Words of Life</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-center">
            Take our short questionnaire and get 10% off your first order when the app is released.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={take} className="rounded-full h-11 shadow-soft">
            Take the questionnaire
          </Button>
          <Button variant="ghost" onClick={snooze} className="rounded-full h-10 hover:bg-primary/10">
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnairePopup;
