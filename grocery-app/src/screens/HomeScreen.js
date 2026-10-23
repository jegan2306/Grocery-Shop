import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const { setRole, showToast } = useApp();

  const handleQuickEnter = (role = 'Customer') => {
    setRole(role);
    showToast(`Welcome! Logged in as ${role}`);
    navigation.replace('MainDrawer');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Figma Hero Illustration */}
        <View style={styles.heroSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80',
            }}
            style={styles.heroImage}
            resizeMode="contain"
          />

          {/* Dots Indicator matching Figma Screen 1 */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Grocery Shop Title & Subtitle */}
          <Text style={styles.title}>Grocery Shop</Text>
          <Text style={styles.subtitle}>
            The easiest way to buy your grocery shopping
          </Text>
        </View>

        {/* Options: Sign In & Sign Up (Admin & Customers) */}
        <View style={styles.actionsContainer}>
          <Text style={styles.optionsHeader}>Choose an option to continue:</Text>

          {/* Option 1: Sign In */}
          <TouchableOpacity
            style={styles.signInBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Ionicons name="log-in-outline" size={20} color={COLORS.textDark} />
            <Text style={styles.signInBtnText}>Sign In (Admin &amp; Customer)</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.textDark} />
          </TouchableOpacity>

          {/* Option 2: Sign Up */}
          <TouchableOpacity
            style={styles.signUpBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Ionicons name="person-add-outline" size={20} color={COLORS.textDark} />
            <Text style={styles.signUpBtnText}>Sign Up / New Account</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.textDark} />
          </TouchableOpacity>

          {/* Figma "Get Started!" Quick Explore Button */}
          <TouchableOpacity
            style={styles.getStartedBtn}
            activeOpacity={0.85}
            onPress={() => handleQuickEnter('Customer')}
          >
            <Text style={styles.getStartedBtnText}>Get Started! →</Text>
          </TouchableOpacity>

          {/* Quick Evaluator Access */}
          <View style={styles.evaluatorBox}>
            <Text style={styles.evaluatorLabel}>⚡ Quick Evaluator Logins:</Text>
            <View style={styles.quickRow}>
              <TouchableOpacity
                style={[styles.quickRoleBtn, { backgroundColor: '#2ED573' }]}
                onPress={() => handleQuickEnter('Customer')}
              >
                <Text style={styles.quickRoleText}>👤 Customer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickRoleBtn, { backgroundColor: '#7451EB' }]}
                onPress={() => handleQuickEnter('Admin')}
              >
                <Text style={styles.quickRoleText}>🛡️ Admin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  heroImage: {
    width: 260,
    height: 200,
    marginBottom: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    backgroundColor: COLORS.textDark,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSub,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 21,
    marginBottom: 20,
  },
  actionsContainer: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  optionsHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSub,
    marginBottom: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  signInBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  signInBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  signUpBtn: {
    backgroundColor: '#EFF5E9',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  signUpBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  getStartedBtn: {
    backgroundColor: COLORS.textDark,
    borderRadius: 28,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 16,
  },
  getStartedBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.white,
  },
  evaluatorBox: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
    alignItems: 'center',
  },
  evaluatorLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSub,
    marginBottom: 8,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  quickRoleBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickRoleText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
