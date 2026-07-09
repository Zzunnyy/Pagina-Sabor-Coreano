import Link from "next/link";
import CollageFrame from "@/components/CollageFrame";
import CollageSticker from "@/components/CollageSticker";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    category?: string;
    isNew?: boolean;
  };
}

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

export default function ProductCard({ product }: ProductCardProps) {
  const bg = pickFromId(product.id, PALETTE);
  const emoji = pickEmoji(product.id, product.name);
  const rotate = (product.id.charCodeAt(0) % 5) - 2;

  return (
    <div className="group h-full flex flex-col p-5 rounded-[2rem] bg-white border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/productos/${product.id}`} className="block mb-5">
        <CollageFrame
          emoji={emoji}
          bg={bg}
          rotate={rotate}
          badge={product.isNew ? <CollageSticker bg="bg-collage-pink" text="text-white" rotate={-10}>🆕 Nuevo</CollageSticker> : undefined}
          badgePosition="top-left"
        />
      </Link>

      <div className="flex flex-col flex-1">
        {product.category && (
          <span className="font-display font-semibold text-xs uppercase tracking-wide text-collage-indigo/70 mb-1">
            {product.category}
          </span>
        )}
        <h3 className="font-display font-semibold text-xl text-collage-ink mb-1 line-clamp-1">
          <Link href={`/productos/${product.id}`} className="hover:text-collage-pink transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-collage-ink/70 mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-3">
          <CollageSticker bg="bg-collage-lime" rotate={-4}>
            ${product.price.toFixed(2)}
          </CollageSticker>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full border-[3px] border-collage-ink bg-collage-indigo text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] transition-transform hover:scale-110 hover:rotate-12 active:scale-95"
            title="Añadir al carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
