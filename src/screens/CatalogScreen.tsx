import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { allProducts } from '../data/products';

interface CatalogScreenProps {
  onViewProduct: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

export function CatalogScreen({
  onViewProduct,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onAddToCart,
  onToggleWishlist,
  wishlistItems
}: CatalogScreenProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'rings', name: 'Rings' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets' },
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
  ];

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return products;
  }, [selectedCategory, searchQuery, sortBy]);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productWrapper}>
      <ProductCard
        product={item}
        onPress={() => onViewProduct(item)}
        onAddToCart={() => onAddToCart(item)}
        onToggleWishlist={() => onToggleWishlist(item)}
        isInWishlist={wishlistItems.some(wishItem => wishItem.id === item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.selectedCategory
              ]}
              onPress={() => onCategoryChange(item.id)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === item.id && styles.selectedCategoryText
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Header with count and sort */}
      <View style={styles.header}>
        <Text style={styles.resultCount}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </Text>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.sortIcon}>≡</Text>
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Options */}
      {showFilters && (
        <View style={styles.sortOptions}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortOption,
                sortBy === option.id && styles.selectedSortOption
              ]}
              onPress={() => {
                setSortBy(option.id as SortOption);
                setShowFilters(false);
              }}
            >
              <Text style={[
                styles.sortOptionText,
                sortBy === option.id && styles.selectedSortOptionText
              ]}>
                {option.name}
              </Text>
              {sortBy === option.id && (
                <Text style={styles.checkIcon}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>◔</Text>
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your search or filter criteria
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          style={styles.productList}
          contentContainerStyle={styles.productListContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  categoryContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultCount: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
  },
  sortIcon: {
    fontSize: 16,
    color: '#000',
  },
  sortText: {
    fontSize: 14,
    color: '#000',
  },
  sortOptions: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 8,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedSortOption: {
    backgroundColor: '#f0f9ff',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#000',
  },
  selectedSortOptionText: {
    fontWeight: '600',
    color: '#22c55e',
  },
  checkIcon: {
    fontSize: 16,
    color: '#22c55e',
  },
  productList: {
    flex: 1,
  },
  productListContent: {
    padding: 16,
  },
  productWrapper: {
    flex: 1,
    maxWidth: '50%',
    paddingHorizontal: 6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});