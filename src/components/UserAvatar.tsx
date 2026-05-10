import { avatarUrl } from "@/lib/avatar";
import { useAvatar } from "@/hooks/useAvatar";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  alt?: string;
}

const UserAvatar = ({ className, alt = "Your avatar" }: Props) => {
  const cfg = useAvatar();
  return (
    <img
      src={avatarUrl(cfg)}
      alt={alt}
      className={cn("rounded-full select-none", className)}
      draggable={false}
    />
  );
};

export default UserAvatar;
