import { ReactNode } from "react";

interface CollageFrameProps {
  emoji?: string;
  imageUrl?: string;
  bg: string;
  rotate?: number;
  badge?: ReactNode;
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

const badgePositions: Record<string, string> = {
  "top-left": "-top-4 -left-4",
  "top-right": "-top-4 -right-4",
  "bottom-left": "-bottom-4 -left-4",
  "bottom-right": "-bottom-4 -right-4",
};

export default function CollageFrame({
  emoji,
  imageUrl,
  bg,
  rotate = 0,
  badge,
  badgePosition = "bottom-right",
  className = "",
}: CollageFrameProps) {
  return (
    <div
      className={`group relative aspect-square ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className={`relative w-full h-full ${bg} rounded-[2.5rem] border-[6px] border-white shadow-[6px_8px_0_0_rgba(24,20,44,0.25)] overflow-hidden transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]`}
        style={{ transform: `rotate(${-rotate}deg) scale(1.15)` }}
      >
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots" />
        <div className="w-full h-full flex items-center justify-center text-6xl md:text-7xl drop-shadow-sm">
          {imageUrl ? (
            <img src={imageUrl} alt="Frame image" className="w-full h-full object-cover" />
          ) : (
            emoji
          )}
        </div>
      </div>
      {badge && (
        <div className={`absolute ${badgePositions[badgePosition]} z-10`}>
          {badge}
        </div>
      )}
    </div>
  );
}
