import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ButtonPadrao } from '@/components/button';



export default function Screen() {
  const handleLogin = () => {
    if(auth().currentUser == null){
      router.navigate('/auth/login')
    }
    
    else{
      router.navigate('/products')
    }
  }
  
  return (
    <SafeAreaView style={styles.container} >
      
      <ImageBackground source={require('@/assets/images/bg-inicial.png')} style={styles.content}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <ButtonPadrao width={120} onPress={handleLogin} title='Acessar' marginTop={20} height={50}/>
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

  h1:{
    textAlign: 'center',
    fontSize: 24,
    marginBottom:20
  }
});
