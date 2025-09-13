import React, { useState } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import type { CartItem } from '../types';
import { theme } from '../theme';
import { Button } from '../components/ui/Button';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { formatINR } from '../utils/currency';
import { Feather } from '@expo/vector-icons';

export function Cart({ items, onCheckout, onRemove }: { items: CartItem[]; onCheckout: () => void; onRemove: (id: string, size?: string) => void }) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(items.map((it) => [it.id + (it.selectedSize ?? ''), it.quantity]))
  );
  const total = items.reduce((sum, it) => sum + it.price * (quantities[it.id + (it.selectedSize ?? '')] ?? it.quantity), 0);
  return (
    <FlatList
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      ListHeaderComponent={<Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 8 }}>Shopping Cart</Text>}
      data={items}
      keyExtractor={(item) => item.id + (item.selectedSize ?? '')}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            marginBottom: 12,
            backgroundColor: '#fff',
            position: 'relative',
          }}
        >
          <Pressable onPress={() => onRemove(item.id, item.selectedSize)} style={{ position: 'absolute', top: 10, right: 10, padding: 6, zIndex: 10 }} hitSlop={8}>
            <Feather name="trash-2" size={18} color={theme.colors.muted} />
          </Pressable>
          <Image source={{ uri: item.image }} resizeMode="cover" style={{ width: 72, height: 72, borderRadius: theme.radius.sm }} />
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={{ fontWeight: '700' }}>{item.name}</Text>
            <Text style={{ color: theme.colors.muted, fontSize: 12 }}>
              {item.selectedSize ? `Size ${item.selectedSize} • ` : ''}Qty {quantities[item.id + (item.selectedSize ?? '')] ?? item.quantity}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
              <QuantityStepper
                value={quantities[item.id + (item.selectedSize ?? '')] ?? item.quantity}
                onChange={(v) =>
                  setQuantities((q) => ({ ...q, [item.id + (item.selectedSize ?? '')]: v }))
                }
              />
              <Text style={{ fontWeight: '800' }}>
                {formatINR(item.price * (quantities[item.id + (item.selectedSize ?? '')] ?? item.quantity))}
              </Text>
            </View>
          </View>
        </View>
      )}
      ListFooterComponent={
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: theme.colors.muted }}>Subtotal</Text>
            <Text style={{ fontWeight: '800' }}>{formatINR(total)}</Text>
          </View>
          <Button title="Checkout" onPress={onCheckout} />
        </View>
      }
    />
  );
}
