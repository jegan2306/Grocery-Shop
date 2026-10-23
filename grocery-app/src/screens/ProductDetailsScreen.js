import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { productId } = route.params || { productId: 'prod_1' };
  const {
    products,
    isFavorite,
    toggleFavorite,
    addToCart,
    showToast,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Find product or fallback to first
  const product = products.find((p) => p.id === productId) || products[0];
  const favorited = isFavorite(product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleIncrement = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigation.navigate('CartTab');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header matching Figma screens 5 and 6 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Details</Text>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => toggleFavorite(product.id)}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={20}
            color={favorited ? COLORS.heart : COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Dots Indicator matching Figma */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Product Title, Rating & Quantity Selector Row */}
        <View style={styles.detailsCard}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titleName}>Fresh {product.name}</Text>
              {/* Star Rating */}
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={16}
                    color={COLORS.star}
                    style={{ marginRight: 2 }}
                  />
                ))}
                <Text style={styles.ratingText}>{product.rating || '4.9'}</Text>
              </View>
            </View>

            {/* Figma Quantity Pill: (-) 1kg (+) */}
            <View style={styles.quantityPill}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={handleDecrement}
                disabled={quantity <= 1}
              >
                <Ionicons
                  name="remove"
                  size={16}
                  color={quantity <= 1 ? COLORS.textLight : COLORS.textDark}
                />
              </TouchableOpacity>
              <Text style={styles.qtyText}>
                {quantity} {product.unit || 'kg'}
              </Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={handleIncrement}>
                <Ionicons name="add" size={16} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description Section matching Figma */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Description</Text>
            <Text style={styles.descriptionText}>
              {showFullDesc
                ? product.description
                : `${product.description.slice(0, 110)}... `}
              <Text
                style={styles.seeMoreLink}
                onPress={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? 'See less' : 'See more'}
              </Text>
            </Text>
          </View>

          {/* Related Items Section matching Figma */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Related Items</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedRow}
            >
              {relatedProducts.map((rel) => (
                <TouchableOpacity
                  key={rel.id}
                  style={styles.relatedCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.push('ProductDetails', { productId: rel.id });
                  }}
                >
                  <Image
                    source={{ uri: rel.image }}
                    style={styles.relatedImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.relatedName} numberOfLines={1}>
                    {rel.name}
                  </Text>
                  <Text style={styles.relatedPrice}>
                    Rs {rel.price}/{rel.unit || 'kg'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar matching Figma Screens 5 & 6 */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceAmount}>
            Rs {product.price * quantity}{' '}
            <Text style={styles.pricePerUnit}>
              ({quantity} {product.unit || 'kg'})
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart &gt;&gt;</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  heroImage: {
    width: '100%',
    height: 240,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C5D8C3',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 22,
    backgroundColor: COLORS.categoryActive,
  },
  detailsCard: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 4,
  },
  quantityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginHorizontal: 10,
  },
  sectionBlock: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSub,
  },
  seeMoreLink: {
    color: '#8A7B06',
    fontWeight: '800',
  },
  relatedRow: {
    paddingVertical: 6,
    gap: 12,
  },
  relatedCard: {
    width: 105,
    backgroundColor: '#F7FAF3',
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  relatedImage: {
    width: 85,
    height: 70,
    borderRadius: 12,
    marginBottom: 6,
  },
  relatedName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  relatedPrice: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  priceContainer: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  pricePerUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  addToCartBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 13,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});
