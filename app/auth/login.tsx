import React from 'react';
import { Image, StyleSheet, View, Text, TextInput, SafeAreaView, StatusBar, ViewBase, Pressable } from 'react-native';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import { ButtonPadrao } from '@/components/button';
import firestore from '@react-native-firebase/firestore';
import { FirebaseContext } from '@/contexts/FirebaseContext';
import { User } from '@/types/user';


export default function ScreenLogin() {
  const [Email, setEmail] = React.useState<string>('')
  const [Pass, setPass] = React.useState<string>('')
  const firebaseContext = React.useContext(FirebaseContext);

  const handleForgot = () =>{
    router.navigate('/auth/forgot')
  }

  const handleSignup = () =>{
    router.navigate('/auth/signup')
  }

  const queryUser = () => {
    firestore().collection('Users').where('email', '==', Email).get().then(querySnapshot => {   
      if (querySnapshot.empty) {
        const params = new URLSearchParams();
        params.set('email', Email.toString())
        router.navigate(`/auth/signup?${params.toString()}`) 
      } else {
        alert('Email ou senha estão errados')
      }
    });
  }

  const handleLogin = () => {
    if(Email === '' || Email === null) return alert('por favor insira um e-mail')
    if(Pass === '' || Pass === null) return alert('por favor insira uma senha')

    if(auth().currentUser == null){
      auth().signInWithEmailAndPassword(Email, Pass)
      .then(
        () => 
        {
          firestore().collection('Users').where('email', '==', Email).get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              const newUser: User  = {
                id: documentSnapshot.id,
                email: documentSnapshot.data()['email'],
                name: documentSnapshot.data()['name'],
                tel: documentSnapshot.data()['tel'],
                nascimento: documentSnapshot.data()['nascimento'],
                tipo: documentSnapshot.data()['tipo'],
              }
              //console.log(newUser)
              firebaseContext.setUser(newUser)
            })
            
          })
          return router.navigate('/products')
        })
      .catch((error) => 
        {
          console.log(error.code)
          if (error.code === 'auth/invalid-email') {
            alert('Email está com formato indevido');
          }
          if (error.code === 'auth/invalid-credential') {
            queryUser();
          }
          if (error.code === 'auth/too-many-requests') {
            alert('Você escedeu as tentatvas de login, tente novamente, mais tarde')
          }
        });
    }

    
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require('@/assets/images/icon.png')} />
      <Text style={styles.title}>Acesse <Text style={styles.destaque}>O Café Gourmet</Text> e faça seu pedido!</Text> 

      <View style={styles.content}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.inputStyle}
          inputMode='email'
          placeholder='Digite seu e-mail...'
          value={Email}
          onChangeText={t => setEmail(t)}
          textContentType='emailAddress'
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput style={styles.inputStyle}
          inputMode='text'
          secureTextEntry={true}
          placeholder='Digite sua senha...'
          value={Pass}
          onChangeText={t => setPass(t)}
        />
        <Pressable style={styles.forgot} onPress={handleForgot}>
        <Text style={styles.textForgot}>Esqueceu a senha?</Text>
        </Pressable>
        <ButtonPadrao height={50} marginTop={10} width={120} title='Login' onPress={handleLogin}/>
        

        <Pressable style={styles.signup} onPress={handleSignup}>
          <Text style={styles.textSignup}>Não é cadastrado? <Text>Clique aqui.</Text></Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2E8DF',
  },

  content: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    height: 125,
    alignContent: 'center',
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    marginVertical: 5,
    width: 200,
    textAlign: 'center',
    fontFamily: 'OswaldLight',
    color: '#592C28',

  },

  destaque: {
    fontFamily: 'OswaldRegular',
  },

  label: {
    color: '#592C28',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontFamily: 'OswaldRegular',
  },

  inputStyle: {
    width: '100%',
    padding: 5,
    fontSize: 16,
    backgroundColor: "transparent",
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 10,
    fontFamily: 'OswaldLight',
    borderColor: '#592C28',
    textTransform: 'lowercase',
  },

  forgot:{
    alignSelf: 'flex-end',
  },

  textForgot:{
    fontFamily: 'OswaldRegular',
    fontSize: 16,
    color: '#592C28'
  },

  signup:{
   alignSelf: 'center',
   alignItems:'flex-end',
   marginTop: 5,
  },

  textSignup:{
    fontFamily: 'OswaldRegular',
    fontSize: 16,
    color: '#592C28'
  },
});
