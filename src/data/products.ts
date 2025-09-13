import { Product } from '../types';

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Golden Elegance Ring',
    price: 89.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1669859097642-b8dca596fd14?w=300&h=300&fit=crop',
    category: 'rings',
    rating: 4.8,
    reviews: 324,
    description: 'Stunning gold-plated ring with sparkling crystals. Perfect for special occasions or everyday elegance.',
    inStock: true,
    sizes: ['6', '7', '8', '9', '10']
  },
  {
    id: '2',
    name: 'Pearl Dream Necklace',
    price: 129.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1649501984791-07c6177124ca?w=300&h=300&fit=crop',
    category: 'necklaces',
    rating: 4.9,
    reviews: 156,
    description: 'Elegant pearl necklace for special occasions. Classic and timeless design.',
    inStock: true
  },
  {
    id: '3',
    name: 'Diamond Stud Earrings',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1641290748359-1d944fc8359a?w=300&h=300&fit=crop',
    category: 'earrings',
    rating: 4.7,
    reviews: 89,
    description: 'Classic diamond stud earrings that never go out of style.',
    inStock: true
  },
  {
    id: '4',
    name: 'Silver Chain Bracelet',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?w=300&h=300&fit=crop',
    category: 'bracelets',
    rating: 4.6,
    reviews: 203,
    description: 'Delicate silver chain bracelet with intricate details.',
    inStock: true
  },
  {
    id: '5',
    name: 'Vintage Rose Gold Ring',
    price: 159.99,
    originalPrice: 229.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
    category: 'rings',
    rating: 4.5,
    reviews: 78,
    description: 'Beautiful vintage-inspired rose gold ring with antique details.',
    inStock: true,
    sizes: ['5', '6', '7', '8', '9']
  },
  {
    id: '6',
    name: 'Statement Gold Necklace',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
    category: 'necklaces',
    rating: 4.8,
    reviews: 134,
    description: 'Bold statement gold necklace that makes any outfit special.',
    inStock: false
  },
  {
    id: '7',
    name: 'Crystal Drop Earrings',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
    category: 'earrings',
    rating: 4.6,
    reviews: 92,
    description: 'Elegant crystal drop earrings that catch the light beautifully.',
    inStock: true
  },
  {
    id: '8',
    name: 'Tennis Bracelet',
    price: 299.99,
    originalPrice: 449.99,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop',
    category: 'bracelets',
    rating: 4.9,
    reviews: 167,
    description: 'Classic tennis bracelet with brilliant cut crystals.',
    inStock: true
  },
  {
    id: '9',
    name: 'Infinity Ring',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop',
    category: 'rings',
    rating: 4.4,
    reviews: 156,
    description: 'Symbolic infinity ring representing eternal love and commitment.',
    inStock: true,
    sizes: ['6', '7', '8', '9']
  },
  {
    id: '10',
    name: 'Layered Chain Necklace',
    price: 99.99,
    originalPrice: 139.99,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300&h=300&fit=crop',
    category: 'necklaces',
    rating: 4.3,
    reviews: 112,
    description: 'Trendy layered chain necklace perfect for modern styling.',
    inStock: true
  }
];