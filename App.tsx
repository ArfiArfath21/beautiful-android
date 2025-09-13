import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Screen, Product, CartItem } from './src/types';
import { Header } from './src/components/Header';
import { BottomNavigation } from './src/components/BottomNavigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { CatalogScreen } from './src/screens/CatalogScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { CartScreen } from './src/screens/CartScreen';
import { WishlistScreen } from './src/screens/WishlistScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const addToCart = (product: Product, size?: string) => {
    const existingItem = cartItems.find(item =>
      item.id === product.id && item.selectedSize === size
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, selectedSize: size }]);
    }
  };

  const removeFromCart = (productId: string, size?: string) => {
    setCartItems(cartItems.filter(item =>
      !(item.id === productId && item.selectedSize === size)
    ));
  };

  const updateCartQuantity = (productId: string, size: string | undefined, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === productId && item.selectedSize === size
        ? { ...item, quantity }
        : item
    ));
  };

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onViewProduct={viewProduct}
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              setCurrentScreen('catalog');
            }}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlistItems={wishlistItems}
          />
        );
      case 'catalog':
        return (
          <CatalogScreen
            onViewProduct={viewProduct}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlistItems={wishlistItems}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={() => setCurrentScreen('catalog')}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isInWishlist={wishlistItems.some(item => item.id === selectedProduct.id)}
          />
        ) : null;
      case 'cart':
        return (
          <CartScreen
            items={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
          />
        );
      case 'profile':
        return <ProfileScreen />;
      case 'search':
        return (
          <SearchScreen
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlistItems={wishlistItems}
          />
        );
      case 'wishlist':
        return (
          <WishlistScreen
            items={wishlistItems}
            onViewProduct={viewProduct}
            onRemoveFromWishlist={toggleWishlist}
            onAddToCart={addToCart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app} edges={['top']}>
        <Header
          currentScreen={currentScreen}
          onSearch={() => setCurrentScreen('search')}
          onCart={() => setCurrentScreen('cart')}
          cartItemsCount={cartItems.length}
          onBack={() => {
            if (currentScreen === 'product') {
              setCurrentScreen('catalog');
            } else if (['search', 'catalog'].includes(currentScreen)) {
              setCurrentScreen('home');
            }
          }}
        />

        <View style={styles.main}>
          {renderScreen()}
        </View>

        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={navigateToScreen}
          cartItemsCount={cartItems.length}
          wishlistCount={wishlistItems.length}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  main: {
    flex: 1,
    paddingBottom: 80,
  },
});
