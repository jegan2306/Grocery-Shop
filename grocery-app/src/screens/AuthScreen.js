import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function AuthScreen({ navigation }) {
  const { setRole, showToast } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Customer'); // 'Customer' or 'Admin'

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (isSignUp && !name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (isSignUp) {
      if (!phone.trim()) {
        errs.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
        errs.phone = 'Enter a valid 10-digit mobile number';
      }
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setRole(selectedRole);
      showToast(`Welcome! Logged in as ${selectedRole}`);
      navigation.replace('MainDrawer');
    }
  };

  const handleQuickLogin = (role) => {
    setRole(role);
    showToast(`Quick Login: ${role} Mode`);
    navigation.replace('MainDrawer');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Hero Banner matching Figma Screen 1 */}
          <View style={styles.heroSection}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80',
              }}
              style={styles.heroImage}
              resizeMode="contain"
            />
            {/* Slider Dots */}
            <View style={styles.dotsContainer}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

            <Text style={styles.title}>Grocery Shop</Text>
            <Text style={styles.subtitle}>
              The easiest way to buy your grocery shopping
            </Text>
          </View>

          {/* Role Selector Card */}
          <View style={styles.authCard}>
            <View style={styles.roleContainer}>
              <Text style={styles.roleTitle}>Select Role:</Text>
              <View style={styles.roleButtonsRow}>
                <TouchableOpacity
                  style={[
                    styles.roleBadgeBtn,
                    selectedRole === 'Customer' && styles.roleBadgeActive,
                  ]}
                  onPress={() => setSelectedRole('Customer')}
                >
                  <Ionicons
                    name="person"
                    size={16}
                    color={selectedRole === 'Customer' ? COLORS.white : COLORS.textDark}
                  />
                  <Text
                    style={[
                      styles.roleBadgeText,
                      selectedRole === 'Customer' && styles.roleBadgeTextActive,
                    ]}
                  >
                    Customer
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleBadgeBtn,
                    selectedRole === 'Admin' && styles.roleBadgeActive,
                  ]}
                  onPress={() => setSelectedRole('Admin')}
                >
                  <Ionicons
                    name="shield-checkmark"
                    size={16}
                    color={selectedRole === 'Admin' ? COLORS.white : COLORS.textDark}
                  />
                  <Text
                    style={[
                      styles.roleBadgeText,
                      selectedRole === 'Admin' && styles.roleBadgeTextActive,
                    ]}
                  >
                    Admin
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In vs Sign Up Tabs */}
            <View style={styles.tabToggleRow}>
              <TouchableOpacity
                style={[styles.tabButton, !isSignUp && styles.activeTabButton]}
                onPress={() => {
                  setIsSignUp(false);
                  setErrors({});
                }}
              >
                <Text
                  style={[styles.tabButtonText, !isSignUp && styles.activeTabText]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, isSignUp && styles.activeTabButton]}
                onPress={() => {
                  setIsSignUp(true);
                  setErrors({});
                }}
              >
                <Text
                  style={[styles.tabButtonText, isSignUp && styles.activeTabText]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.formArea}>
              {isSignUp && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={18} color={COLORS.textSub} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g. Alex Johnson"
                      placeholderTextColor={COLORS.textLight}
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={18} color={COLORS.textSub} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="customer@groceryshop.com"
                    placeholderTextColor={COLORS.textLight}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              {isSignUp && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mobile Number</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="call-outline" size={18} color={COLORS.textSub} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="9876543210"
                      placeholderTextColor={COLORS.textLight}
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>
                  {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={18} color={COLORS.textSub} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.textLight}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              {/* Figma Pill Button: Get Started / Sign In */}
              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.85}
                onPress={handleSubmit}
              >
                <Text style={styles.submitBtnText}>
                  {isSignUp ? 'Get Started! 🎉' : 'Get Started! →'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick 1-Click Demo Login for Evaluator */}
            <View style={styles.evaluatorSection}>
              <Text style={styles.evaluatorLabel}>⚡ Quick Evaluator Demo Logins:</Text>
              <View style={styles.quickButtonsRow}>
                <TouchableOpacity
                  style={[styles.quickBtn, { backgroundColor: '#2ED573' }]}
                  onPress={() => handleQuickLogin('Customer')}
                >
                  <Text style={styles.quickBtnText}>👤 Login as Customer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.quickBtn, { backgroundColor: '#7451EB' }]}
                  onPress={() => handleQuickLogin('Admin')}
                >
                  <Text style={styles.quickBtnText}>🛡️ Login as Admin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  heroImage: {
    width: 250,
    height: 190,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C5D8C3',
    marginHorizontal: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: COLORS.textDark,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSub,
    textAlign: 'center',
    paddingHorizontal: 25,
    lineHeight: 20,
    marginBottom: 15,
  },
  authCard: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  roleContainer: {
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSub,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  roleButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  roleBadgeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: '#F8FAF5',
    gap: 6,
  },
  roleBadgeActive: {
    backgroundColor: COLORS.textDark,
    borderColor: COLORS.textDark,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  roleBadgeTextActive: {
    color: COLORS.white,
  },
  tabToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#EFF5E9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 11,
  },
  activeTabButton: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  activeTabText: {
    color: COLORS.textDark,
    fontWeight: '800',
  },
  formArea: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F9F3',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 11,
    fontSize: 14,
    color: COLORS.textDark,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 11,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: 0.3,
  },
  evaluatorSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  evaluatorLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSub,
    marginBottom: 8,
  },
  quickButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  quickBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
