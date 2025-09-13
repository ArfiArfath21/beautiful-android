import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { theme } from '../theme';
import { GradientBackground } from './ui/Gradient';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  onSearch?: () => void;
  onCart?: () => void;
  cartItemsCount?: number;
}

export function Header({ title, onBack, showBack, onSearch, onCart, cartItemsCount = 0 }: HeaderProps) {
  return (
    <View style={{ position: 'relative' }}>
      <GradientBackground style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} opacity={1} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {showBack ? (
            <Pressable onPress={onBack} hitSlop={12} style={{ padding: 8 }}>
              <Feather name="chevron-left" size={22} color="#FFFFFF" />
            </Pressable>
          ) : null}
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>{title}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!!onSearch && (
            <Pressable onPress={onSearch} hitSlop={12} style={{ padding: 8, marginRight: 4 }}>
              <Feather name="search" size={20} color="#FFFFFF" />
            </Pressable>
          )}
          {!!onCart && (
            <Pressable onPress={onCart} hitSlop={12} style={{ padding: 8, position: 'relative' }}>
              <Feather name="shopping-cart" size={20} color="#FFFFFF" />
              {cartItemsCount > 0 ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: theme.colors.danger,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 4,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>{cartItemsCount}</Text>
                </View>
              ) : null}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
