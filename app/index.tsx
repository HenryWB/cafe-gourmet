import { ButtonRoute } from '@/components/button-route';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Image, ImageBackground, Text } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ButtonPadrao } from '@/components/button';



export default function Screen() {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null)
  const [initializing, setInitializing] = React.useState(true)

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null ) => {
    setUser(user)
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  if (initializing) return null;


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
        {!user &&
          <Text style={styles.h1}>Deslogado</Text>
        }
        {user &&
          <Text style={styles.h1}>Logado</Text>
        }
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
