import { ButtonRoute } from '@/components/button-route';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground } from 'react-native';



export default function Screen() {
  return (

    <SafeAreaView style={styles.container} >
      <ImageBackground source={require('@/assets/images/bg-inicial.png')} style={styles.content}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <ButtonRoute width={120} route={'/auth/login'} title='Acessar' methodRout='navigate'/>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: '100%',
    width: '100%',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 275,
    height: 100,
    resizeMode: 'contain',
  },
});
