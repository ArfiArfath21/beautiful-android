import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import { theme } from '../theme';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';
import { Chip } from '../components/ui/Chip';

export function Search({ onSelectProduct }: { onSelectProduct: (p: Product) => void }) {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>(['sneakers', 'backpack', 'linen']);
  const results = useMemo(
    () => PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search products"
          autoFocus
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.pill,
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: '#fff',
            fontSize: 14,
          }}
        />
      </View>
      {query.length === 0 ? (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 12, color: theme.colors.muted, marginBottom: 8 }}>Recent</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {recent.map((r) => (
              <Chip key={r} label={r} onPress={() => setQuery(r)} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flex: 1, marginBottom: 12 }}>
              <ProductCard product={item} onPress={() => onSelectProduct(item)} />
            </View>
          )}
        />
      )}
    </View>
  );
}

