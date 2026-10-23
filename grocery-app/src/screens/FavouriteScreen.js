import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function FavouriteScreen({ navigation }) {
  const {
    products,
    favorites,
    toggleFavorite,
    addToCart,
    showToast,
  } = useApp();

  // Filter products that are marked as favorite
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleAddAllToCart = () => {
    if (favoriteProducts.length === 0) return;
    favoriteProducts.forEach((item) => addToCart(item, 1));
    showToast(`Added all ${favoriteProducts.length} favorites to Cart! 🛒`);
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      {/* Heart Remove Button */}
      <TouchableOpacity
        style={styles.favoriteBadge}
        onPress={() => toggleFavorite(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="heart" size={18} color={COLORS.heart} />
      </TouchableOpacity>

      {/* Image */}
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      {/* Title & Price */}
      <View style={styles.cardInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          Rs {item.price}/{item.unit || 'kg'}
        </Text>

        {/* Part-III (ii) Requirement: Add directly from favorite screen to cart */}
        <TouchableOpacity
          style={styles.addCartBtn}
          activeOpacity={0.8}
          onPress={() => addToCart(item, 1)}
        >
          <Ionicons name="cart" size={14} color={COLORS.textDark} />
          <Text style={styles.addCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header matching Figma Screen 4 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Favourite</Text>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={handleAddAllToCart}
        >
          <Ionicons name="cart-outline" size={20} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      {/* Action Subbar */}
      {favoriteProducts.length > 0 && (
        <View style={styles.subBar}>
          <Text style={styles.subBarText}>
            You have {favoriteProducts.length} favourite item
            {favoriteProducts.length > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity
            style={styles.addAllBtn}
            onPress={handleAddAllToCart}
          >
            <Text style={styles.addAllBtnText}>+ Add All to Cart</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 2-Column Grid */}
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <Ionicons name="heart-dislike-outline" size={48} color={COLORS.textLight} />
            </View>
            <Text style={styles.emptyTitle}>No Favourites Yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart icon on any grocery item to keep your favourites here!
            </Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Text style={styles.browseBtnText}>Explore Groceries</Text>
            </TouchableOpacity>
          </View>
        }
      />
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
  subBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subBarText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  addAllBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  addAllBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  listContainer: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    margin: 6,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 115,
    borderRadius: 16,
    marginBottom: 8,
  },
  cardInfo: {
    width: '100%',
    alignItems: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 3,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSub,
    marginBottom: 8,
  },
  addCartBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 7,
    borderRadius: 14,
    gap: 4,
  },
  addCartText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyIconBg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSub,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  browseBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 22,
  },
  browseBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});
