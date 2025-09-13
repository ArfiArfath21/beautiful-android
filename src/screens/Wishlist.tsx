import React from 'react';
import { View, Text, FlatList } from 'react-native';
import type { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export function Wishlist({ items, onSelectProduct }: { items: Product[]; onSelectProduct: (p: Product) => void }) {
  if (!items.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>Your wishlist is empty</Text>
        <Text style={{ marginTop: 6, color: '#777C85' }}>Save products to revisit later.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ flex: 1, marginBottom: 12 }}>
          <ProductCard product={item} onPress={() => onSelectProduct(item)} />
        </View>
      )}
    />
  );
}

