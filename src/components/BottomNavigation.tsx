import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { theme } from '../theme';
import type { Screen } from '../types';
import { Feather } from '@expo/vector-icons';
// import { GradientBackground } from './ui/Gradient';

interface BottomNavigationProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount?: number;
  wishlistCount?: number;
}

const items: { id: Screen; label: string; icon: React.ComponentProps<typeof Feather>['name'] }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'catalog', label: 'Catalog', icon: 'grid' },
  { id: 'cart', label: 'Cart', icon: 'shopping-cart' },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

export function BottomNavigation({ current, onNavigate, cartCount = 0, wishlistCount = 0 }: BottomNavigationProps) {
  // Original solid style colors
  const ICON_ACTIVE = theme.colors.primary;
  const ICON_INACTIVE = theme.colors.muted;
  const LABEL_ACTIVE = theme.colors.primary;
  const LABEL_INACTIVE = theme.colors.muted;
  const ACTIVE_PILL_BG = '#F5F7FB';

  /*
  // Gradient bar alternative (uncomment to try):
  // <GradientBackground style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} opacity={1} />
  // const ICON_ACTIVE = '#FFFFFF';
  // const ICON_INACTIVE = '#9CA3AF';
  // const LABEL_ACTIVE = '#FFFFFF';
  // const LABEL_INACTIVE = '#9CA3AF';
  // const ACTIVE_PILL_BG = 'rgba(255,255,255,0.12)';
  */

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, backgroundColor: theme.colors.surface, borderTopWidth: 1, borderTopColor: theme.colors.border }}>
      {/* Gradient background (experimental): */}
      {/* <GradientBackground style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} opacity={1} /> */}
      <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
        {items.map((it) => {
          const active = current === it.id;
          const badge = it.id === 'cart' ? cartCount : it.id === 'wishlist' ? wishlistCount : 0;
          return (
            <Pressable
              key={it.id}
              onPress={() => onNavigate(it.id)}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: theme.radius.pill,
                  backgroundColor: active ? ACTIVE_PILL_BG : 'transparent',
                }}
              >
                <Feather
                  name={it.icon}
                  size={20}
                  color={active ? ICON_ACTIVE : ICON_INACTIVE}
                />
                <Text style={{ fontSize: 11, marginTop: 4, fontWeight: active ? '800' : '600', color: active ? LABEL_ACTIVE : LABEL_INACTIVE }}>
                  {it.label}
                </Text>
                {badge > 0 ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      minWidth: 18,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: theme.colors.danger,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>{badge}</Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
