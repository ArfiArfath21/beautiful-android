import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Modal, Pressable } from 'react-native';
import { theme } from '../theme';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';

export function ProductCatalog({
  onSelectProduct,
  initialCategory,
  isInWishlist,
  onToggleWishlist,
  onAddToCart,
  getCartCount,
  onDecrease,
}: {
  onSelectProduct: (p: Product) => void;
  initialCategory?: string;
  isInWishlist: (id: string) => boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, size?: string) => void;
  getCartCount: (id: string) => number;
  onDecrease: (p: Product) => void;
}) {
  const [category, setCategory] = useState<string>(initialCategory || 'All');
  const cats = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets'];
  const [inStockOnly, setInStockOnly] = useState(false);
  const allMaterials = Array.from(new Set(PRODUCTS.flatMap((p) => p.materials || [])));
  const [materials, setMaterials] = useState<string[]>([]);
  const [priceBand, setPriceBand] = useState<'all' | 'under-15000' | '15-30' | '30-plus'>('all');
  const [sort, setSort] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const filtered = PRODUCTS
    .filter((p) => (category === 'All' ? true : p.category === category))
    .filter((p) => (inStockOnly ? p.inStock : true))
    .filter((p) => (materials.length ? (p.materials || []).some((m) => materials.includes(m)) : true))
    .filter((p) => {
      switch (priceBand) {
        case 'under-15000':
          return p.price < 15000;
        case '15-30':
          return p.price >= 15000 && p.price <= 30000;
        case '30-plus':
          return p.price > 30000;
        default:
          return true;
      }
    });
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);
  return (
    <FlatList
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      columnWrapperStyle={{ gap: 12 }}
      ListHeaderComponent={
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 8 }}>Catalog</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cats.map((c) => (
              <View key={c} style={{ marginRight: 8 }}>
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: theme.radius.pill,
                    borderWidth: 1,
                    borderColor: category === c ? theme.colors.primary : theme.colors.border,
                    backgroundColor: category === c ? '#F5F7FB' : '#fff',
                  }}
                >
                  <Text onPress={() => setCategory(c)} style={{ fontSize: 12, color: category === c ? theme.colors.primary : theme.colors.muted, fontWeight: '600' }}>{c}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <Pressable onPress={() => setShowSort(true)} style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: theme.radius.sm, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff' }}>
              <Text style={{ textAlign: 'center', fontWeight: '700' }}>Sort</Text>
            </Pressable>
            <Pressable onPress={() => setShowFilter(true)} style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: theme.radius.sm, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff' }}>
              <Text style={{ textAlign: 'center', fontWeight: '700' }}>Filter</Text>
            </Pressable>
          </View>
        </View>
      }
      data={sorted}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={{ flex: 1, marginBottom: 12 }}>
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
      ListFooterComponent={<>
        <Modal transparent animationType="slide" visible={showSort} onRequestClose={() => setShowSort(false)}>
          <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} onPress={() => setShowSort(false)} />
          <View style={{ backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            {([
              { key: 'popular', label: 'Recommended' },
              { key: 'price-asc', label: 'Price: Low to High' },
              { key: 'price-desc', label: 'Price: High to Low' },
              { key: 'rating', label: 'Rating' },
            ] as const).map((opt) => (
              <Pressable key={opt.key} onPress={() => { setSort(opt.key); setShowSort(false); }} style={{ paddingVertical: 14 }}>
                <Text style={{ fontWeight: sort === opt.key ? '800' : '600', color: sort === opt.key ? theme.colors.primary : theme.colors.muted }}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        </Modal>

        <Modal transparent animationType="slide" visible={showFilter} onRequestClose={() => setShowFilter(false)}>
          <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} onPress={() => setShowFilter(false)} />
          <View style={{ backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', marginBottom: 12 }}>Filters</Text>
            <Pressable onPress={() => setInStockOnly((s) => !s)} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
              <View style={{ width: 18, height: 18, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: inStockOnly ? theme.colors.primary : '#fff', marginRight: 8 }} />
              <Text style={{ fontWeight: '600' }}>In stock only</Text>
            </Pressable>
            <Text style={{ fontSize: 12, color: theme.colors.muted, marginTop: 12, marginBottom: 6 }}>Price</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'under-15000', label: 'Under ₹15k' },
                { id: '15-30', label: '₹15k–₹30k' },
                { id: '30-plus', label: '₹30k+' },
              ].map((b) => (
                <Pressable key={b.id} onPress={() => setPriceBand(b.id as any)} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: priceBand === b.id ? theme.colors.primary : theme.colors.border, backgroundColor: priceBand === b.id ? '#F5F7FB' : '#fff', marginRight: 8, marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: priceBand === b.id ? theme.colors.primary : theme.colors.muted }}>{b.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={{ fontSize: 12, color: theme.colors.muted, marginTop: 12, marginBottom: 6 }}>Materials</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {allMaterials.map((m) => {
                const selected = materials.includes(m);
                return (
                  <Pressable key={m} onPress={() => setMaterials((arr) => (arr.includes(m) ? arr.filter((x) => x !== m) : [...arr, m]))} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: selected ? theme.colors.primary : theme.colors.border, backgroundColor: selected ? '#F5F7FB' : '#fff', marginRight: 8, marginBottom: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: selected ? theme.colors.primary : theme.colors.muted }}>{m}</Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              <Pressable onPress={() => { setInStockOnly(false); setCategory('All'); }} style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: theme.radius.sm, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: '#fff' }}>
                <Text style={{ textAlign: 'center', color: theme.colors.muted, fontWeight: '700' }}>Reset</Text>
              </Pressable>
              <Pressable onPress={() => setShowFilter(false)} style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 12, borderRadius: theme.radius.sm, borderWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.primary }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '700' }}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>}
    />
  );
}
