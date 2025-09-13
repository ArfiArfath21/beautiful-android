import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { allProducts } from '../data/products';

interface SearchScreenProps {
  query: string;
  onQueryChange: (query: string) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export function SearchScreen({
  query,
  onQueryChange,
  onViewProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistItems
}: SearchScreenProps) {
  const [recentSearches] = useState<string[]>([
    'gold ring', 'pearl necklace', 'diamond earrings', 'silver bracelet'
  ]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    return allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const popularSearches = ['rings', 'necklaces', 'gold jewelry', 'diamond', 'vintage'];

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

  const renderSearchTag = (text: string, onPress: () => void) => (
    <TouchableOpacity
      key={text}
      style={styles.searchTag}
      onPress={onPress}
    >
      <Text style={styles.searchTagText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>◔</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for jewelry..."
            value={query}
            onChangeText={onQueryChange}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => onQueryChange('')}
            >
              <Text style={styles.clearIcon}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      {query.length > 0 ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeader}>
            {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{query}"
          </Text>

          {searchResults.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsIcon}>◔</Text>
              <Text style={styles.noResultsTitle}>No results found</Text>
              <Text style={styles.noResultsSubtitle}>
                Try different keywords or browse our categories
              </Text>
            </View>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderProduct}
              keyExtractor={item => item.id}
              numColumns={2}
              style={styles.resultsList}
              contentContainerStyle={styles.resultsListContent}
            />
          )}
        </View>
      ) : (
        /* Search Suggestions */
        <View style={styles.suggestionsContainer}>
          {/* Recent Searches */}
          <View style={styles.suggestionSection}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.tagsContainer}>
              {recentSearches.map(search =>
                renderSearchTag(search, () => onQueryChange(search))
              )}
            </View>
          </View>

          {/* Popular Searches */}
          <View style={styles.suggestionSection}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <View style={styles.tagsContainer}>
              {popularSearches.map(search =>
                renderSearchTag(search, () => onQueryChange(search))
              )}
            </View>
          </View>

          {/* Categories */}
          <View style={styles.suggestionSection}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <View style={styles.categoriesGrid}>
              {[
                { name: 'Rings', icon: '◯' },
                { name: 'Necklaces', icon: '◐' },
                { name: 'Earrings', icon: '◑' },
                { name: 'Bracelets', icon: '◒' },
              ].map(category => (
                <TouchableOpacity
                  key={category.name}
                  style={styles.categoryItem}
                  onPress={() => onQueryChange(category.name.toLowerCase())}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clearButton: {
    marginLeft: 8,
  },
  clearIcon: {
    fontSize: 20,
    color: '#6b7280',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsList: {
    flex: 1,
  },
  resultsListContent: {
    padding: 16,
  },
  productWrapper: {
    flex: 1,
    maxWidth: '50%',
    paddingHorizontal: 6,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  noResultsIcon: {
    fontSize: 64,
  },
  noResultsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  suggestionsContainer: {
    flex: 1,
    padding: 16,
  },
  suggestionSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  searchTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  searchTagText: {
    fontSize: 14,
    color: '#6b7280',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: '22%',
    paddingVertical: 16,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
});