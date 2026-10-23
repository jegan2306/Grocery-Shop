import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function DailyGroceryScreen({ navigation }) {
  const {
    products,
    favorites,
    toggleFavorite,
    isFavorite,
    addToCart,
    currentUser,
    addProduct,
    showToast,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Admin Add Product Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Fruits');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdErrors, setNewProdErrors] = useState({});

  const categories = ['Fruits', 'Vegetables', 'All'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'All' ? true : p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const validateAndAddProduct = () => {
    let errs = {};
    if (!newProdName.trim()) errs.name = 'Product name is required';
    if (!newProdPrice.trim()) {
      errs.price = 'Price is required';
    } else if (isNaN(newProdPrice) || Number(newProdPrice) <= 0) {
      errs.price = 'Price must be a positive number';
    }
    if (!newProdDesc.trim()) errs.desc = 'Description is required';

    setNewProdErrors(errs);
    if (Object.keys(errs).length === 0) {
      addProduct({
        name: newProdName.trim(),
        subtitle: newProdCategory === 'Fruits' ? 'Fresh fruits' : 'Fresh vegetable',
        category: newProdCategory,
        price: Number(newProdPrice),
        unit: 'kg',
        description: newProdDesc.trim(),
        image:
          newProdCategory === 'Fruits'
            ? 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=500&q=80'
            : 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
      });
      setModalVisible(false);
      setNewProdName('');
      setNewProdPrice('');
      setNewProdDesc('');
      setNewProdErrors({});
    }
  };

  const renderProductItem = ({ item }) => {
    const favorited = isFavorite(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      >
        {/* Heart Favorite Toggle Button */}
        <TouchableOpacity
          style={styles.favoriteBadge}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={18}
            color={favorited ? COLORS.heart : COLORS.heartInactive}
          />
        </TouchableOpacity>

        {/* Product Image */}
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Product Details */}
        <View style={styles.cardInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>
            Rs {item.price}/{item.unit || 'kg'}
          </Text>

          {/* Add to Cart Button */}
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header matching Figma */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={22} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Daily Grocery Food</Text>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => setShowSearch(!showSearch)}
        >
          <Ionicons
            name={showSearch ? 'close' : 'search'}
            size={20}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      {/* Admin Quick Indicator */}
      {currentUser.role === 'Admin' && (
        <View style={styles.adminBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="shield-checkmark" size={16} color="#7451EB" />
            <Text style={styles.adminBarText}>Logged in as Admin Manager</Text>
          </View>
          <TouchableOpacity
            style={styles.adminAddBtn}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={16} color={COLORS.white} />
            <Text style={styles.adminAddBtnText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search Input Bar */}
      {showSearch && (
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={18} color={COLORS.textSub} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search fresh groceries..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      {/* Category Pills matching Figma: Fruits (Yellow), Vegetables (Muted grey) */}
      <View style={styles.categoryRow}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryPill,
                isActive ? styles.categoryPillActive : styles.categoryPillInactive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  isActive
                    ? styles.categoryTextActive
                    : styles.categoryTextInactive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Section Subheader matching Figma: "Found more fruits !" */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Found more {selectedCategory.toLowerCase()} !
        </Text>
        <Text style={styles.itemCountText}>
          {filteredProducts.length} items
        </Text>
      </View>

      {/* 2-Column Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="basket-outline" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No products found matching your search</Text>
          </View>
        }
      />

      {/* Admin Add Product Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Grocery Product</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Product Name *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Fresh Mango"
                placeholderTextColor={COLORS.textLight}
                value={newProdName}
                onChangeText={setNewProdName}
              />
              {newProdErrors.name && (
                <Text style={styles.modalError}>{newProdErrors.name}</Text>
              )}

              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.modalCatRow}>
                {['Fruits', 'Vegetables'].map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.modalCatBtn,
                      newProdCategory === c && styles.modalCatBtnActive,
                    ]}
                    onPress={() => setNewProdCategory(c)}
                  >
                    <Text
                      style={[
                        styles.modalCatText,
                        newProdCategory === c && styles.modalCatTextActive,
                      ]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Price (Rs per kg) *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. 95"
                placeholderTextColor={COLORS.textLight}
                keyboardType="numeric"
                value={newProdPrice}
                onChangeText={setNewProdPrice}
              />
              {newProdErrors.price && (
                <Text style={styles.modalError}>{newProdErrors.price}</Text>
              )}

              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.modalInput, { height: 70, textAlignVertical: 'top' }]}
                placeholder="Nutritional value, fresh details..."
                placeholderTextColor={COLORS.textLight}
                multiline
                value={newProdDesc}
                onChangeText={setNewProdDesc}
              />
              {newProdErrors.desc && (
                <Text style={styles.modalError}>{newProdErrors.desc}</Text>
              )}

              <TouchableOpacity
                style={styles.modalSubmitBtn}
                onPress={validateAndAddProduct}
              >
                <Text style={styles.modalSubmitText}>Save to Catalog</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  adminBar: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3EBFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2D3FC',
  },
  adminBarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7451EB',
  },
  adminAddBtn: {
    backgroundColor: '#7451EB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  adminAddBtnText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 12,
  },
  categoryPill: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPillActive: {
    backgroundColor: COLORS.categoryActive, // Warm yellow in Figma
    shadowColor: COLORS.categoryActive,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryPillInactive: {
    backgroundColor: COLORS.categoryInactive, // Muted grey-sage in Figma
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  categoryTextInactive: {
    color: COLORS.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  listContainer: {
    paddingHorizontal: 14,
    paddingBottom: 25,
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
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.textSub,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 10,
    marginBottom: 5,
  },
  modalInput: {
    backgroundColor: '#F7FAF3',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textDark,
  },
  modalCatRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalCatBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#F0F5E8',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalCatBtnActive: {
    backgroundColor: COLORS.textDark,
    borderColor: COLORS.textDark,
  },
  modalCatText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  modalCatTextActive: {
    color: COLORS.white,
  },
  modalError: {
    color: COLORS.danger,
    fontSize: 11,
    marginTop: 3,
    fontWeight: '600',
  },
  modalSubmitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  modalSubmitText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});
