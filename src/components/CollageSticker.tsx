import { ReactNode } from "react";

interface CollageStickerProps {
  children: ReactNode;
  bg?: string;
  text?: string;
  rotate?: number;
  className?: string;
}

export default function CollageSticker({
  children,
  bg = "bg-collage-cream",
  text = "text-collage-ink",
  rotate = -8,
  className = "",
}: CollageStickerProps) {
  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full border-[3px] border-collage-ink ${bg} ${text} font-display font-semibold text-xs md:text-sm shadow-[3px_3px_0_0_var(--color-collage-ink)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}
