import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

export default function SignUpScreen({ navigation }) {
  const { setRole, updateProfile, showToast } = useApp();
  const [selectedRole, setSelectedRole] = useState('Customer'); // 'Customer' or 'Admin'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!name.trim()) {
      errs.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      errs.phone = 'Enter a valid 10-digit mobile number';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      setRole(selectedRole);
      updateProfile({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      showToast(`Account created! Logged in as ${selectedRole} 🎉`);
      navigation.replace('MainDrawer');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Create Account 📝</Text>
            <Text style={styles.subTitle}>
              Join Grocery Shop to get fresh fruits &amp; vegetables delivered.
            </Text>
          </View>

          {/* Role Selector: Customer vs Admin */}
          <View style={styles.roleCard}>
            <Text style={styles.roleHeader}>Select User Role:</Text>
            <View style={styles.roleButtonsRow}>
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  selectedRole === 'Customer' && styles.roleBtnActive,
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
                    styles.roleBtnText,
                    selectedRole === 'Customer' && styles.roleBtnTextActive,
                  ]}
                >
                  Customer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  selectedRole === 'Admin' && styles.roleBtnActive,
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
                    styles.roleBtnText,
                    selectedRole === 'Admin' && styles.roleBtnTextActive,
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
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

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address *</Text>
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

            {/* Mobile Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Phone *</Text>
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

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={18} color={COLORS.textSub} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="At least 4 characters"
                  placeholderTextColor={COLORS.textLight}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              activeOpacity={0.85}
              onPress={handleSignUp}
            >
              <Text style={styles.submitBtnText}>Create Account / Sign Up</Text>
            </TouchableOpacity>

            {/* Switch to Sign In */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.switchLink}>Sign In</Text>
              </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backBtn: {
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
  titleContainer: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 13,
    color: COLORS.textSub,
    lineHeight: 19,
  },
  roleCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  roleHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSub,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  roleButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: '#F8FAF5',
    gap: 6,
  },
  roleBtnActive: {
    backgroundColor: COLORS.textDark,
    borderColor: COLORS.textDark,
  },
  roleBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  roleBtnTextActive: {
    color: COLORS.white,
  },
  formCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F9F3',
    borderRadius: 14,
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
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    fontSize: 13,
    color: COLORS.textSub,
  },
  switchLink: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});
