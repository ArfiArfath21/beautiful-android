// App.tsx
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './src/components/Header';
import { BottomNavigation } from './src/components/BottomNavigation';
import { theme } from './src/theme';
import type { CartItem, Product, Screen } from './src/types';
import { Home as HomeScreen } from './src/screens/Home';
import { ProductCatalog } from './src/screens/ProductCatalog';
import { ProductDetail } from './src/screens/ProductDetail';
import { Cart } from './src/screens/Cart';
import { Placeholder } from './src/screens/Placeholder';
import { Search } from './src/screens/Search';
import { Auth } from './src/screens/Auth';
import { Wishlist } from './src/screens/Wishlist';
import { Profile as ProfileScreen } from './src/screens/Profile';
import { ToastProvider, useToast } from './src/components/ToastProvider';

function AppInner() {
  const [current, setCurrent] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [catalogCategory, setCatalogCategory] = useState<string | undefined>('All');
  const { showToast } = useToast();

  const getCartCount = (id: string) => cartItems.filter((i) => i.id === id).reduce((sum, i) => sum + i.quantity, 0);

  const title = useMemo(() => {
    switch (current) {
      case 'home':
        return 'Beautiful';
      case 'catalog':
        return 'Catalog';
      case 'product':
        return 'Product Details';
      case 'cart':
        return 'Shopping Cart';
      case 'profile':
        return 'Profile';
      case 'auth':
        return 'Sign In';
      case 'search':
        return 'Search';
      case 'wishlist':
        return 'Wishlist';
      default:
        return 'Beautiful';
    }
  }, [current]);

  const addToCart = (product: Product, size?: string) => {
    const existing = cartItems.find((i) => i.id === product.id && i.selectedSize === size);
    if (existing) {
      setCartItems((prev) =>
        prev.map((i) =>
          i.id === product.id && i.selectedSize === size ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1, selectedSize: size }]);
    }
    showToast('Added to cart');
  };

  const removeFromCart = (id: string, size?: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.selectedSize === size)));
  };

  const decreaseFromCart = (product: Product, size?: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id && i.selectedSize === size);
      if (idx === -1) return prev;
      const it = prev[idx];
      if (it.quantity <= 1) {
        return prev.filter((_, j) => j !== idx);
      }
      return prev.map((x, j) => (j === idx ? { ...x, quantity: x.quantity - 1 } : x));
    });
    showToast('Updated cart');
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      showToast(exists ? 'Removed from wishlist' : 'Added to wishlist');
      return exists ? prev.filter((p) => p.id !== product.id) : [product, ...prev];
    });
  };

  const showBack = ['product', 'search', 'auth'].includes(current);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={["top", "bottom"]}>
        <Header
          title={title}
          showBack={showBack}
          onBack={() => setCurrent('home')}
          onSearch={() => setCurrent('search')}
          onCart={() => setCurrent('cart')}
          cartItemsCount={cartItems.length}
        />

        <View style={{ flex: 1 }}>
          {current === 'home' && (
            <HomeScreen
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setCurrent('product');
              }}
              onSelectCategory={(c) => {
                setCatalogCategory(c);
                setCurrent('catalog');
              }}
              isInWishlist={(id) => wishlistItems.some((p) => p.id === id)}
              onToggleWishlist={(p) => toggleWishlist(p)}
              onAddToCart={(p, size) => addToCart(p, size)}
              getCartCount={getCartCount}
              onDecrease={(p) => decreaseFromCart(p)}
            />
          )}
          {current === 'catalog' && (
            <ProductCatalog
              initialCategory={catalogCategory}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setCurrent('product');
              }}
              isInWishlist={(id) => wishlistItems.some((p) => p.id === id)}
              onToggleWishlist={(p) => toggleWishlist(p)}
              onAddToCart={(p, size) => addToCart(p, size)}
              getCartCount={getCartCount}
              onDecrease={(p) => decreaseFromCart(p)}
            />
          )}
          {current === 'product' && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onAddToCart={(size) => addToCart(selectedProduct, size)}
              onToggleWishlist={() => toggleWishlist(selectedProduct)}
              inWishlist={wishlistItems.some((p) => p.id === selectedProduct.id)}
            />
          )}
          {current === 'cart' && (
            <Cart items={cartItems} onCheckout={() => {}} onRemove={removeFromCart} />
          )}
          {current === 'wishlist' && (
            <Wishlist
              items={wishlistItems}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setCurrent('product');
              }}
            />
          )}
          {current === 'profile' && <ProfileScreen />}
          {current === 'auth' && <Auth />}
          {current === 'search' && (
            <Search
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setCurrent('product');
              }}
            />
          )}
        </View>

        <BottomNavigation
          current={current}
          onNavigate={(s) => setCurrent(s)}
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
