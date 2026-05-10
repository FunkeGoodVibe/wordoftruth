import { cn } from "@/lib/utils";
import sparkle from "@/assets/bitmoji-sparkle.png";
import heart from "@/assets/bitmoji-heart.png";
import book from "@/assets/bitmoji-book.png";
import phone from "@/assets/bitmoji-phone.png";
import mail from "@/assets/bitmoji-mail.png";

const SOURCES = { sparkle, heart, book, phone, mail } as const;

export type BitmojiName = keyof typeof SOURCES;

type Props = {
  name: BitmojiName;
  className?: string;
  alt?: string;
};

/**
 * Bitmoji-style avatar used as a friendly emoji/icon throughout the site.
 * Sized via className (e.g. "h-6 w-6") just like a lucide icon.
 */
const BitmojiIcon = ({ name, className, alt = "" }: Props) => (
  <img
    src={SOURCES[name]}
    alt={alt}
    aria-hidden={alt === "" ? true : undefined}
    loading="lazy"
    width={512}
    height={512}
    className={cn("inline-block object-contain select-none pointer-events-none", className)}
    draggable={false}
  />
);

export default BitmojiIcon;
