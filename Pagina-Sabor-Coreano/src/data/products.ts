export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  isNew?: boolean;
}

export interface Category {
  slug: string;
  label: string;
}
