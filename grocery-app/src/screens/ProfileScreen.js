import React from 'react';
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

export default function ProfileScreen({ navigation }) {
  const {
    currentUser,
    setRole,
    favorites,
    cart,
    cartTotal,
  } = useApp();

  const isCustomer = currentUser.role === 'Customer';

  const handleRoleToggle = () => {
    setRole(isCustomer ? 'Admin' : 'Customer');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={22} color={COLORS.textDark} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="create-outline" size={20} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              }}
              style={styles.avatarImage}
            />
            <View
              style={[
                styles.roleBadge,
                { backgroundColor: isCustomer ? COLORS.customerBadge : COLORS.adminBadge },
              ]}
            >
              <Text style={styles.roleBadgeText}>{currentUser.role}</Text>
            </View>
          </View>

          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userEmail}>{currentUser.email}</Text>

          {/* Edit Profile Button (Customer) */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Ionicons name="pencil" size={14} color={COLORS.textDark} />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favourites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{cart.length}</Text>
            <Text style={styles.statLabel}>Cart Items</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>Rs {cartTotal}</Text>
            <Text style={styles.statLabel}>Cart Value</Text>
          </View>
        </View>

        {/* User Details Details Card */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionHeading}>Contact &amp; Delivery</Text>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color={COLORS.textSub} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Mobile Number</Text>
              <Text style={styles.infoVal}>{currentUser.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={COLORS.textSub} style={styles.infoIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Delivery Address</Text>
              <Text style={styles.infoVal}>{currentUser.address}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="ribbon-outline" size={18} color={COLORS.textSub} style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Account Status</Text>
              <Text style={styles.infoVal}>Verified Customer</Text>
            </View>
          </View>
        </View>

        {/* Role Switcher Button for Evaluation */}
        <TouchableOpacity
          style={styles.roleSwitchCard}
          onPress={handleRoleToggle}
          activeOpacity={0.8}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.roleSwitchTitle}>Switch User Role</Text>
            <Text style={styles.roleSwitchDesc}>
              Currently logged in as {currentUser.role}. Tap to switch to {isCustomer ? 'Admin' : 'Customer'} mode.
            </Text>
          </View>
          <Ionicons name="swap-horizontal" size={24} color={COLORS.textDark} />
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Home')}
        >
          <Ionicons name="log-out-outline" size={18} color={COLORS.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  roleBadge: {
    position: 'absolute',
    bottom: -4,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  roleBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textSub,
    marginBottom: 14,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSub,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  infoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  infoIcon: {
    width: 32,
    marginRight: 10,
  },
  infoTitle: {
    fontSize: 11,
    color: COLORS.textSub,
    fontWeight: '600',
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 1,
  },
  roleSwitchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EBFD',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2D3FC',
  },
  roleSwitchTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7451EB',
    marginBottom: 2,
  },
  roleSwitchDesc: {
    fontSize: 11,
    color: '#6542D0',
    paddingRight: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFEAEA',
    paddingVertical: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD3D3',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.danger,
  },
});
