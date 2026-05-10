import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AvatarConfig,
  BACKGROUND_COLORS,
  CLOTHING_COLORS,
  DEFAULT_AVATAR,
  HAIR_COLORS,
  HAIR_STYLES,
  SKIN_COLORS,
  avatarUrl,
  loadAvatar,
  saveAvatar,
} from "@/lib/avatar";
import { cn } from "@/lib/utils";
import { Shuffle } from "lucide-react";

interface Props {
  trigger: React.ReactNode;
}

const Swatch = ({
  color,
  active,
  onClick,
}: {
  color: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={color}
    className={cn(
      "h-8 w-8 rounded-full border-2 transition-transform",
      active ? "border-primary scale-110 shadow-soft" : "border-transparent hover:scale-105"
    )}
    style={{
      background: color === "transparent" ? "transparent" : `#${color}`,
      backgroundImage:
        color === "transparent"
          ? "linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%)"
          : undefined,
      backgroundSize: color === "transparent" ? "8px 8px" : undefined,
      backgroundPosition: color === "transparent" ? "0 0, 0 4px, 4px -4px, -4px 0" : undefined,
    }}
  />
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{title}</p>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const AvatarBuilder = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const [cfg, setCfg] = useState<AvatarConfig>(DEFAULT_AVATAR);

  useEffect(() => {
    if (open) setCfg(loadAvatar());
  }, [open]);

  const update = (patch: Partial<AvatarConfig>) => setCfg((c) => ({ ...c, ...patch }));

  const handleSave = () => {
    saveAvatar(cfg);
    setOpen(false);
  };

  const handleRandomize = () => {
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    setCfg({
      seed: Math.random().toString(36).slice(2, 10),
      skinColor: pick(SKIN_COLORS),
      hair: pick(HAIR_STYLES),
      hairColor: pick(HAIR_COLORS),
      clothingColor: pick(CLOTHING_COLORS),
      backgroundColor: pick(BACKGROUND_COLORS),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Design your avatar</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          <div className="relative">
            <img
              src={avatarUrl(cfg)}
              alt="Avatar preview"
              className="h-32 w-32 rounded-full shadow-soft"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={handleRandomize} className="rounded-full">
            <Shuffle className="mr-2 h-4 w-4" />
            Surprise me
          </Button>
        </div>

        <div className="space-y-5">
          <Section title="Skin">
            {SKIN_COLORS.map((c) => (
              <Swatch key={c} color={c} active={cfg.skinColor === c} onClick={() => update({ skinColor: c })} />
            ))}
          </Section>

          <Section title="Hair colour">
            {HAIR_COLORS.map((c) => (
              <Swatch key={c} color={c} active={cfg.hairColor === c} onClick={() => update({ hairColor: c })} />
            ))}
          </Section>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Hair style</p>
            <div className="flex flex-wrap gap-2">
              {HAIR_STYLES.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => update({ hair: h })}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs capitalize transition",
                    cfg.hair === h
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {h.replace(/([A-Z])/g, " $1").trim()}
                </button>
              ))}
            </div>
          </div>

          <Section title="Clothing">
            {CLOTHING_COLORS.map((c) => (
              <Swatch
                key={c}
                color={c}
                active={cfg.clothingColor === c}
                onClick={() => update({ clothingColor: c })}
              />
            ))}
          </Section>

          <Section title="Background">
            {BACKGROUND_COLORS.map((c) => (
              <Swatch
                key={c}
                color={c}
                active={cfg.backgroundColor === c}
                onClick={() => update({ backgroundColor: c })}
              />
            ))}
          </Section>

          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Face seed (changes eyes / mouth / nose)
            </p>
            <Input
              value={cfg.seed}
              onChange={(e) => update({ seed: e.target.value })}
              placeholder="Type anything…"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-full">
            Cancel
          </Button>
          <Button onClick={handleSave} className="rounded-full">
            Save avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarBuilder;
