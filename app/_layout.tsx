import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'OswaldBold': require('../assets/fonts/Oswald-Bold.ttf'),
    'OswaldExtraLight': require('../assets/fonts/Oswald-ExtraLight.ttf'),
    'OswaldLight': require('../assets/fonts/Oswald-Light.ttf'),
    'OswaldMedium': require('../assets/fonts/Oswald-Medium.ttf'),
    'OswaldRegular': require('../assets/fonts/Oswald-Regular.ttf'),
    'OswaldSemiBold': require('../assets/fonts/Oswald-SemiBold.ttf'),
    'BerkshireSwash': require('../assets/fonts/BerkshireSwash-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/forgot" />
      <Stack.Screen name="auth/signup" />
      <Stack.Screen name="infos/[id]"  />
    </Stack>
  );
}

// três métodos de navegação navegate, push e replace, cada um interage de forma distinta com o histórico de navegação.
