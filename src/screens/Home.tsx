import React from 'react';
import { View, Text, Image, FlatList, ScrollView, Pressable } from 'react-native';
import { theme } from '../theme';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';



const CATEGORIES: { key: string; label: string; image: string }[] = [
  {
    key: 'Necklaces',
    label: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1610223515982-5bae48b7c2c2?q=80&w=400&auto=format&fit=crop',
  },
  {
    key: 'Earrings',
    label: 'Earrings',
    image: 'https://images.unsplash.com/photo-1693212793204-bcea856c75fe?w=900&auto=format&fit=crop&q=60',
  },
  {
    key: 'Rings',
    label: 'Rings',
    image: 'https://images.unsplash.com/photo-1603561589171-f8f02d8d6a5a?q=80&w=400&auto=format&fit=crop',
  },
  {
    key: 'Bracelets',
    label: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1731406322274-fb018de6fa97?q=80&w=400&auto=format&fit=crop',
  },
];

export function Home({ onSelectProduct, onSelectCategory, isInWishlist, onToggleWishlist, onAddToCart, getCartCount, onDecrease }: { onSelectProduct: (p: Product) => void; onSelectCategory: (c: string) => void; isInWishlist: (id: string) => boolean; onToggleWishlist: (p: Product) => void; onAddToCart: (p: Product, size?: string) => void; getCartCount: (id: string) => number; onDecrease: (p: Product) => void }) {
  return (
    <FlatList
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 12 }}>Browse by category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <Pressable key={cat.key} onPress={() => onSelectCategory(cat.key)} style={{ alignItems: 'center', marginRight: 16 }}>
                <View
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 34,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                  }}
                >
                  <Image source={{ uri: cat.image }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                </View>
                <Text style={{ marginTop: 8, fontSize: 12, fontWeight: '600' }}>{cat.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={{ fontSize: 18, fontWeight: '800', marginTop: 16, marginBottom: 8 }}>Featured</Text>
        </View>
      }
      data={PRODUCTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 12 }}>
          <ProductCard
            product={item}
            onPress={() => onSelectProduct(item)}
            inWishlist={isInWishlist(item.id)}
            onToggleWishlist={() => onToggleWishlist(item)}
            onAddToCart={(size) => onAddToCart(item, size)}
            cartCount={getCartCount ? getCartCount(item.id) : undefined}
            onDecrease={() => onDecrease(item)}
          />
        </View>
      )}
    />
  );
}
