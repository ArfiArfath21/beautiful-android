import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';

interface HomeScreenProps {
  onViewProduct: (product: Product) => void;
  onCategorySelect: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export function HomeScreen({
  onViewProduct,
  onCategorySelect,
  onAddToCart,
  onToggleWishlist,
  wishlistItems
}: HomeScreenProps) {
  const categories: Category[] = [
    { id: 'rings', name: 'Rings', image: 'https://images.unsplash.com/photo-1669859097642-b8dca596fd14?w=300&h=200&fit=crop' },
    { id: 'necklaces', name: 'Necklaces', image: 'https://images.unsplash.com/photo-1649501984791-07c6177124ca?w=300&h=200&fit=crop' },
    { id: 'earrings', name: 'Earrings', image: 'https://images.unsplash.com/photo-1641290748359-1d944fc8359a?w=300&h=200&fit=crop' },
    { id: 'bracelets', name: 'Bracelets', image: 'https://images.unsplash.com/photo-1569388330292-79cc1ec67270?w=300&h=200&fit=crop' }
  ];

  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Golden Elegance Ring',
      price: 89.99,
      originalPrice: 149.99,
      image: 'https://images.unsplash.com/photo-1669859097642-b8dca596fd14?w=300&h=300&fit=crop',
      category: 'rings',
      rating: 4.8,
      reviews: 324,
      description: 'Stunning gold-plated ring with sparkling crystals',
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
      description: 'Elegant pearl necklace for special occasions',
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
      description: 'Classic diamond stud earrings',
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
      description: 'Delicate silver chain bracelet',
      inStock: true
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => onCategorySelect(category.id)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => onViewProduct(product)}
              onAddToCart={() => onAddToCart(product)}
              onToggleWishlist={() => onToggleWishlist(product)}
              isInWishlist={wishlistItems.some(item => item.id === product.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});