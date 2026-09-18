import { Loader2, Pause, Volume2 } from "lucide-react";
import { usePromiseAudio, type SpokenPromise } from "@/hooks/usePromiseAudio";

interface ListenButtonProps {
  promise: SpokenPromise;
  label?: boolean;
  className?: string;
}

const ListenButton = ({ promise, label = false, className = "" }: ListenButtonProps) => {
  const { activeKey, loadingKey, errorKey, toggle, keyFor } = usePromiseAudio();
  const key = keyFor(promise);
  const isPlaying = activeKey === key;
  const isLoading = loadingKey === key;
  const hasError = errorKey === key;

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggle(promise);
        }}
        disabled={isLoading}
        aria-label={isPlaying ? "Pause the promise" : "Listen to the promise"}
        className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/70 backdrop-blur px-3.5 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-60"
      >
        {isLoading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.8} />
        ) : isPlaying ? (
          <Pause className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
        ) : (
          <Volume2 className="h-3.5 w-3.5 text-primary" strokeWidth={1.8} />
        )}
        {label && <span>{isLoading ? "Preparing" : isPlaying ? "Pause" : "Listen"}</span>}
      </button>
      {hasError && (
        <span className="text-[0.6rem] italic text-muted-foreground">
          Audio unavailable just now
        </span>
      )}
    </div>
  );
};

export default ListenButton;
