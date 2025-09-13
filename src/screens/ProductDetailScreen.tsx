import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const { width } = Dimensions.get('window');

export function ProductDetailScreen({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}: ProductDetailScreenProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.wishlistButton} onPress={() => onToggleWishlist(product)}>
          <Text style={styles.wishlistIcon}>
            {isInWishlist ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
          )}
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Text>
            </View>
          )}
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                style={[styles.star, { color: star <= Math.floor(product.rating) ? '#fbbf24' : '#e5e5e5' }]}
              >
                ★
              </Text>
            ))}
          </View>
          <Text style={styles.ratingText}>
            {product.rating} ({product.reviews} reviews)
          </Text>
        </View>

        <View style={styles.stockContainer}>
          <Text
            style={[styles.stockIcon, { color: product.inStock ? '#22c55e' : '#ef4444' }]}
          >
            {product.inStock ? '✓' : '×'}
          </Text>
          <Text style={[styles.stockText, { color: product.inStock ? '#22c55e' : '#ef4444' }]}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        {product.sizes && (
          <View style={styles.sizesContainer}>
            <Text style={styles.sizeTitle}>Size:</Text>
            <View style={styles.sizes}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSize
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>◆</Text>
            <Text style={styles.featureText}>Premium Quality</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>◇</Text>
            <Text style={styles.featureText}>1 Year Warranty</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>◈</Text>
            <Text style={styles.featureText}>Free Shipping</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.addToCartButton, !product.inStock && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <Text style={styles.cartIcon}>+</Text>
          <Text style={styles.addToCartText}>
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: width,
  },
  wishlistButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    fontSize: 24,
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#22c55e',
  },
  originalPrice: {
    fontSize: 18,
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  stockIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sizesContainer: {
    marginBottom: 24,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  sizes: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  selectedSize: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  sizeText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  selectedSizeText: {
    color: '#fff',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  features: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 16,
    color: '#22c55e',
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  addToCartButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  cartIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});