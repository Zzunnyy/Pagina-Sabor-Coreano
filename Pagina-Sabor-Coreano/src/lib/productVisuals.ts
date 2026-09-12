const PALETTE = ["bg-collage-orange", "bg-collage-pink", "bg-collage-lime", "bg-collage-indigo"];
const DEFAULT_EMOJI = ["🍜", "🥢", "🍚", "🌶️", "🥟", "🍢"];

const EMOJI_BY_KEYWORD: [string, string][] = [
  ["kimchi", "🥬"],
  ["tteok", "🍢"],
  ["ramen", "🍜"],
  ["fideo", "🍜"],
  ["soju", "🍶"],
  ["pollo", "🍗"],
  ["arroz", "🍚"],
  ["mandu", "🥟"],
  ["bibimbap", "🍲"],
];

function pickFromId(id: string, options: string[]) {
  const code = id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return options[code % options.length];
}

function pickEmoji(id: string, name: string) {
  const lowerName = name.toLowerCase();
  const match = EMOJI_BY_KEYWORD.find(([keyword]) => lowerName.includes(keyword));
  return match ? match[1] : pickFromId(id, DEFAULT_EMOJI);
}

export function getProductVisual(id: string, name: string) {
  return {
    bg: pickFromId(id, PALETTE),
    emoji: pickEmoji(id, name),
    rotate: (id.charCodeAt(0) % 5) - 2,
  };
}
