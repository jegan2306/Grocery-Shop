import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useApp } from '../context/AppContext';

import TabNavigator from './TabNavigator';
import FavouriteScreen from '../screens/FavouriteScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { currentUser, setRole, cart, favorites } = useApp();
  const isCustomer = currentUser.role === 'Customer';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header Profile Section */}
        <View style={styles.drawerHeader}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            }}
            style={styles.headerAvatar}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{currentUser.name}</Text>
            <Text style={styles.headerEmail} numberOfLines={1}>
              {currentUser.email}
            </Text>
            <View
              style={[
                styles.roleBadge,
                { backgroundColor: isCustomer ? COLORS.customerBadge : COLORS.adminBadge },
              ]}
            >
              <Text style={styles.roleBadgeText}>{currentUser.role}</Text>
            </View>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate('Tabs', { screen: 'HomeTab' })}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="home-outline" size={20} color={COLORS.textDark} />
            </View>
            <Text style={styles.menuText}>Daily Grocery Food</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate('Tabs', { screen: 'FavouriteTab' })}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="heart-outline" size={20} color={COLORS.heart} />
            </View>
            <Text style={styles.menuText}>Favourite Items</Text>
            {favorites.length > 0 && (
              <View style={styles.menuCountBadge}>
                <Text style={styles.menuCountText}>{favorites.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate('Tabs', { screen: 'CartTab' })}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="cart-outline" size={20} color={COLORS.primaryDark} />
            </View>
            <Text style={styles.menuText}>My Cart</Text>
            {cart.length > 0 && (
              <View style={[styles.menuCountBadge, { backgroundColor: COLORS.primaryDark }]}>
                <Text style={styles.menuCountText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate('Tabs', { screen: 'ProfileTab' })}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="person-outline" size={20} color={COLORS.textDark} />
            </View>
            <Text style={styles.menuText}>Customer Profile</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Role Switcher */}
          <TouchableOpacity
            style={styles.roleSwitchItem}
            onPress={() => setRole(isCustomer ? 'Admin' : 'Customer')}
          >
            <Ionicons name="swap-horizontal" size={20} color="#7451EB" />
            <Text style={styles.roleSwitchText}>
              Switch to {isCustomer ? 'Admin' : 'Customer'}
            </Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutItem}
            onPress={() => props.navigation.replace('Home')}
          >
            <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Drawer Footer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.footerCollege}>Grocery Shop Mobile App</Text>
        <Text style={styles.footerExam}>Fresh &amp; Organic Groceries</Text>
      </View>
    </SafeAreaView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.background,
          width: 300,
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="DrawerFavourite" component={FavouriteScreen} />
      <Drawer.Screen name="DrawerCart" component={CartScreen} />
      <Drawer.Screen name="DrawerProfile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: COLORS.cardBg,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 10,
  },
  headerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 2,
  },
  headerEmail: {
    fontSize: 12,
    color: COLORS.textSub,
    marginBottom: 6,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  roleBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 4,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  menuCountBadge: {
    backgroundColor: COLORS.heart,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  menuCountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  roleSwitchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EBFD',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2D3FC',
  },
  roleSwitchText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7451EB',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 10,
    backgroundColor: '#FFEAEA',
    borderWidth: 1,
    borderColor: '#FFD3D3',
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.danger,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
  },
  footerCollege: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  footerExam: {
    fontSize: 11,
    color: COLORS.textSub,
    marginTop: 2,
  },
});
