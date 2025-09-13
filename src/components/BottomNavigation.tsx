import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../types';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  cartItemsCount: number;
  wishlistCount: number;
}

export function BottomNavigation({
  currentScreen,
  onNavigate,
  cartItemsCount,
  wishlistCount
}: BottomNavigationProps) {
  const navItems = [
    { id: 'home' as Screen, icon: '◯', label: 'Home' },
    { id: 'catalog' as Screen, icon: '▢', label: 'Catalog' },
    { id: 'cart' as Screen, icon: '◑', label: 'Cart', badge: cartItemsCount },
    { id: 'wishlist' as Screen, icon: '♡', label: 'Wishlist', badge: wishlistCount },
    { id: 'profile' as Screen, icon: '◌', label: 'Profile' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => onNavigate(item.id)}
          >
            <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
              {item.icon}
            </Text>
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {item.label}
            </Text>

            {item.badge && item.badge > 0 && (
              <View style={styles.navBadge}>
                <Text style={styles.navBadgeText}>{item.badge}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: '#f3f4f6',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navIconActive: {
    color: '#000000',
  },
  navLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#000000',
    fontWeight: '600',
  },
  navBadge: {
    position: 'absolute',
    top: 4,
    right: '25%',
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
});