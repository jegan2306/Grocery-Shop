import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppProvider, useApp } from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';
import { COLORS } from './src/theme/colors';

// Global Toast Banner Component
function ToastNotification() {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <View style={styles.toastContainer}>
      <View style={styles.toastCard}>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </View>
    </View>
  );
}

function MainApp() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <ToastNotification />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  toastContainer: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 50,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 9999,
  },
  toastCard: {
    backgroundColor: 'rgba(30, 44, 30, 0.94)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  toastText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
