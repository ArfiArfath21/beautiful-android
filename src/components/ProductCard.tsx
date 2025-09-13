import React from 'react';
import { Image, Text, View, Pressable, Modal, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import type { Product } from '../types';
import { Badge } from './ui/Badge';
import { formatINR } from '../utils/currency';
import { Feather } from '@expo/vector-icons';
import { Chip } from './ui/Chip';
import { GradientBackground } from './ui/Gradient';

export function ProductCard({
  product,
  onPress,
  inWishlist,
  onToggleWishlist,
  onAddToCart,
  cartCount,
  onDecrease,
}: {
  product: Product;
  onPress?: () => void;
  inWishlist?: boolean;
  onToggleWishlist?: () => void;
  onAddToCart?: (size?: string) => void;
  cartCount?: number;
  onDecrease?: () => void;
}) {
  const [sizeSheet, setSizeSheet] = React.useState(false);
  const [size, setSize] = React.useState<string | undefined>(product.sizes?.[0]);
  const [isAdding, setIsAdding] = React.useState(false);
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] }]}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          overflow: 'hidden',
          ...theme.shadow.card,
        }}
      >
        <View style={{ width: '100%', aspectRatio: 1, backgroundColor: '#F3F4F6' }}>
          <Image
            source={{ uri: product.image }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
          {!product.inStock && (
            <View
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
              }}
            >
              <Badge variant="neutral">Out of stock</Badge>
            </View>
          )}
          {onToggleWishlist && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                onToggleWishlist();
              }}
              style={{ position: 'absolute', top: 8, right: 8, padding: 6, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 16 }}
              hitSlop={10}
            >
              <Feather name="heart" size={16} color={inWishlist ? '#EF4444' : theme.colors.muted} />
            </Pressable>
          )}
        </View>
        <View style={{ padding: 12, gap: 6 }}>
          <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '700' }}>
            {product.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '800' }}>{formatINR(product.price)}</Text>
              {product.originalPrice ? (
                <Text
                  style={{ fontSize: 11, color: theme.colors.muted, textDecorationLine: 'line-through', marginTop: 2 }}
                  numberOfLines={1}
                >
                  {formatINR(product.originalPrice)}
                </Text>
              ) : (
                <Text style={{ fontSize: 11, color: 'transparent', marginTop: 2 }}> </Text>
              )}
            </View>
            {onAddToCart && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation?.();
                  if (isAdding) return;
                  if (cartCount && cartCount > 0) {
                    // Show stepper behavior handled by inner controls; do nothing on container press
                    return;
                  } else if (product.sizes && product.sizes.length) {
                    setSize(product.sizes[0]);
                    setSizeSheet(true);
                  } else {
                    setIsAdding(true);
                    onAddToCart();
                    setTimeout(() => setIsAdding(false), 350);
                  }
                }}
                style={{ paddingVertical: 0, paddingHorizontal: 0, borderRadius: theme.radius.sm }}
              >
                <View style={{ position: 'relative', borderRadius: theme.radius.sm, overflow: 'hidden' }}>
                  <GradientBackground style={{ width: 74, height: 28 }} borderRadius={theme.radius.sm} opacity={0.9} />
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 }}>
                    {cartCount && cartCount > 0 ? (
                      <>
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation?.();
                            onDecrease?.();
                          }}
                          style={{ paddingHorizontal: 6, paddingVertical: 4 }}
                          hitSlop={6}
                        >
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>−</Text>
                        </Pressable>
                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '800', minWidth: 16, textAlign: 'center' }}>{cartCount}</Text>
                        <Pressable
                          onPress={(e) => {
                            e.stopPropagation?.();
                            if (product.sizes && product.sizes.length) {
                              setSize(product.sizes[0]);
                              setSizeSheet(true);
                            } else {
                              onAddToCart?.();
                            }
                          }}
                          style={{ paddingHorizontal: 6, paddingVertical: 4 }}
                          hitSlop={6}
                        >
                          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>+</Text>
                        </Pressable>
                      </>
                    ) : isAdding ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <Feather name="shopping-cart" size={14} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 6, fontSize: 12, fontWeight: '700' }}>Add</Text>
                      </>
                    )}
                  </View>
                </View>
              </Pressable>
            )}
          </View>
          <Text style={{ fontSize: 12, color: theme.colors.muted, marginTop: 4 }}>{product.rating.toFixed(1)} • {product.reviews} reviews</Text>
        </View>
        {/* Size Select Modal */}
        {onAddToCart && product.sizes && (
          <Modal transparent animationType="fade" visible={sizeSheet} onRequestClose={() => setSizeSheet(false)}>
            <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} onPress={() => setSizeSheet(false)} />
            <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12, margin: 24 }}>
              <Text style={{ fontWeight: '800', marginBottom: 8 }}>Select size</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => (
                  <View key={s} style={{ marginRight: 8, marginBottom: 8 }}>
                    <Chip label={s} selected={size === s} onPress={() => setSize(s)} />
                  </View>
                ))}
              </View>
              <Pressable
                onPress={() => {
                  setSizeSheet(false);
                  onAddToCart(size);
                }}
                style={{ marginTop: 12, paddingVertical: 12, borderRadius: theme.radius.sm, backgroundColor: theme.colors.primary, alignItems: 'center' }}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>Add to cart</Text>
              </Pressable>
            </View>
          </Modal>
        )}
      </View>
    </Pressable>
  );
}
