export type Screen = 'home' | 'catalog' | 'product' | 'cart' | 'profile' | 'search' | 'wishlist';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}