import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  onSearch: () => void;
  onCart: () => void;
  cartItemsCount: number;
  onBack: () => void;
}

export function Header({ currentScreen, onSearch, onCart, cartItemsCount, onBack }: HeaderProps) {
  const getTitle = () => {
    switch (currentScreen) {
      case 'home': return 'Jewelry Store';
      case 'catalog': return 'Catalog';
      case 'product': return 'Product';
      case 'cart': return 'Cart';
      case 'profile': return 'Profile';
      case 'search': return 'Search';
      case 'wishlist': return 'Wishlist';
      default: return 'Jewelry Store';
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {currentScreen !== 'home' && (
          <TouchableOpacity onPress={onBack} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{getTitle()}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={onSearch} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>◔</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCart} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>◑</Text>
            {cartItemsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    position: 'relative',
  },
  headerButtonText: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
});