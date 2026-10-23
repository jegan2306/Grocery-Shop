import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function CartScreen({ navigation }) {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    currentUser,
    showToast,
  } = useApp();

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Checkout form validation fields
  const [address, setAddress] = useState(currentUser.address || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [checkoutErrors, setCheckoutErrors] = useState({});

  const deliveryFee = cartTotal > 300 || cartTotal === 0 ? 0 : 30;
  const finalTotal = cartTotal + deliveryFee;

  const validateCheckout = () => {
    let errs = {};
    if (!address.trim()) errs.address = 'Delivery address is required';
    if (!phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      errs.phone = 'Enter valid 10-digit mobile number';
    }
    setCheckoutErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateCheckout()) {
      setCheckoutModal(false);
      setOrderSuccess(true);
      clearCart();
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartCard}>
      {/* Product Image */}
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      {/* Item Info */}
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle || item.category}</Text>
        <Text style={styles.itemPrice}>
          Rs {item.price}/{item.unit || 'kg'}
        </Text>
      </View>

      {/* Part-III (iii) Requirement: Add or Subtract items in cart screen */}
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => updateCartQuantity(item.productId, 1)}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Ionicons name="add" size={16} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.counterText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => updateCartQuantity(item.productId, -1)}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Ionicons name="remove" size={16} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      {/* Remove Button */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => removeFromCart(item.productId)}
      >
        <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header matching Figma Screen 7 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => {
            if (cart.length > 0) clearCart();
          }}
        >
          <Ionicons
            name={cart.length > 0 ? 'trash' : 'search'}
            size={20}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      {/* Cart List */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="cart-outline" size={54} color={COLORS.textLight} />
            </View>
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Looks like you haven't added any fresh groceries yet.
            </Text>
            <TouchableOpacity
              style={styles.shopNowBtn}
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Text style={styles.shopNowText}>Shop Fresh Groceries</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Bottom Summary Bar matching Figma Screen 7 */}
      {cart.length > 0 && (
        <View style={styles.bottomCheckoutBar}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              Rs {finalTotal.toFixed(2)}
            </Text>
          </View>

          {deliveryFee > 0 && (
            <Text style={styles.deliveryNote}>
              + Rs {deliveryFee} delivery fee (Free delivery on orders over Rs 300)
            </Text>
          )}

          {/* Figma Pill Button: "Book Now >>>" */}
          <TouchableOpacity
            style={styles.bookNowBtn}
            activeOpacity={0.85}
            onPress={() => setCheckoutModal(true)}
          >
            <Text style={styles.bookNowText}>Book Now &gt;&gt;&gt;</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Checkout Validation Modal */}
      <Modal
        visible={checkoutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCheckoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Delivery Details</Text>
              <TouchableOpacity onPress={() => setCheckoutModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.summaryBadge}>
                <Text style={styles.summaryBadgeText}>
                  Order Total: <Text style={{ fontWeight: '800' }}>Rs {finalTotal.toFixed(2)}</Text> ({cart.length} items)
                </Text>
              </View>

              <Text style={styles.inputLabel}>Delivery Address *</Text>
              <TextInput
                style={[styles.inputField, { height: 60, textAlignVertical: 'top' }]}
                placeholder="Enter street, area, pincode..."
                placeholderTextColor={COLORS.textLight}
                multiline
                value={address}
                onChangeText={setAddress}
              />
              {checkoutErrors.address && (
                <Text style={styles.errorText}>{checkoutErrors.address}</Text>
              )}

              <Text style={styles.inputLabel}>Contact Phone *</Text>
              <TextInput
                style={styles.inputField}
                placeholder="10-digit mobile number"
                placeholderTextColor={COLORS.textLight}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              {checkoutErrors.phone && (
                <Text style={styles.errorText}>{checkoutErrors.phone}</Text>
              )}

              <Text style={styles.inputLabel}>Delivery Instructions (Optional)</Text>
              <TextInput
                style={styles.inputField}
                placeholder="e.g. Leave at front door"
                placeholderTextColor={COLORS.textLight}
                value={deliveryNote}
                onChangeText={setDeliveryNote}
              />

              <TouchableOpacity
                style={styles.confirmOrderBtn}
                activeOpacity={0.85}
                onPress={handlePlaceOrder}
              >
                <Text style={styles.confirmOrderText}>Confirm &amp; Place Order</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Order Placed Success Modal */}
      <Modal
        visible={orderSuccess}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setOrderSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { alignItems: 'center', paddingVertical: 30 }]}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark-done" size={44} color={COLORS.white} />
            </View>
            <Text style={styles.successTitle}>Booking Confirmed! 🎉</Text>
            <Text style={styles.successSubtitle}>
              Your grocery order has been placed successfully and will be delivered shortly.
            </Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={() => {
                setOrderSuccess(false);
                navigation.navigate('HomeTab');
              }}
            >
              <Text style={styles.successBtnText}>Back to Home</Text>
            </TouchableOpacity>
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
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 160,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  itemImage: {
    width: 65,
    height: 65,
    borderRadius: 14,
    marginRight: 14,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: COLORS.textSub,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  quantityControls: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginRight: 8,
  },
  counterBtn: {
    padding: 4,
  },
  counterText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
    marginVertical: 2,
  },
  deleteBtn: {
    padding: 6,
  },
  bottomCheckoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textSub,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  deliveryNote: {
    fontSize: 11,
    color: COLORS.textSub,
    marginBottom: 12,
  },
  bookNowBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 70,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textSub,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  shopNowBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 22,
  },
  shopNowText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
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
  summaryBadge: {
    backgroundColor: '#EFF7EA',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  summaryBadgeText: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
    marginTop: 8,
  },
  inputField: {
    backgroundColor: '#F7FAF3',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textDark,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 11,
    marginTop: 3,
    fontWeight: '600',
  },
  confirmOrderBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  confirmOrderText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  successCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 13,
    color: COLORS.textSub,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 19,
    marginBottom: 24,
  },
  successBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 22,
  },
  successBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});
