export type Screen =
  | 'home'
  | 'catalog'
  | 'product'
  | 'cart'
  | 'profile'
  | 'auth'
  | 'search'
  | 'wishlist';

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
  images?: string[];
  inStock: boolean;
  sizes?: string[];
  materials?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

