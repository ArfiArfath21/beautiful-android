import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { theme } from '../theme';
import type { Product } from '../types';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { RatingStars } from '../components/ui/RatingStars';
import { formatINR } from '../utils/currency';

export function ProductDetail({ product, onAddToCart, onToggleWishlist, inWishlist }: { product: Product; onAddToCart: (size?: string) => void; onToggleWishlist?: () => void; inWishlist?: boolean }) {
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 200 }}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        style={{ borderRadius: theme.radius.lg, overflow: 'hidden' }}
      >
        {(product.images && product.images.length ? product.images : [product.image]).map((src, idx) => (
          <View key={idx} style={{ width: 320, maxWidth: '100%', borderWidth: 1, borderColor: theme.colors.border }}>
            <Image source={{ uri: src }} resizeMode="cover" style={{ width: '100%', aspectRatio: 1 }} />
          </View>
        ))}
      </ScrollView>
      <View style={{ paddingVertical: 16, gap: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>{product.name}</Text>
        <Text style={{ fontSize: 14, color: theme.colors.muted }}>{product.category}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <RatingStars rating={product.rating} />
          <Text style={{ fontSize: 12, color: theme.colors.muted }}>({product.reviews})</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <Text style={{ fontSize: 22, fontWeight: '900' }}>{formatINR(product.price)}</Text>
          {product.originalPrice ? (
            <Text style={{ fontSize: 14, color: theme.colors.muted, textDecorationLine: 'line-through' }}>
              {formatINR(product.originalPrice)}
            </Text>
          ) : null}
        </View>
        <Text style={{ fontSize: 14, lineHeight: 20 }}>{product.description}</Text>
        {product.sizes && product.sizes.length ? (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: theme.colors.muted, marginBottom: 8 }}>Select size</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.sizes.map((s) => (
                <Chip key={s} label={s} selected={size === s} onPress={() => setSize(s)} />
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 64,
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: theme.colors.muted }}>Price</Text>
            <Text style={{ fontSize: 18, fontWeight: '900' }}>{formatINR(product.price)}</Text>
          </View>
          <Button title="Add to cart" onPress={() => onAddToCart(size)} />
        </View>
      </View>
    </View>
  );
}
