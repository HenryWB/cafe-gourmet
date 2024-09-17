import React from 'react';
import { Image, StyleSheet, View, Text, TextInput, SafeAreaView, StatusBar, ViewBase, Pressable } from 'react-native';
import { ButtonRoute } from '@/components/button-route';
import { router } from 'expo-router';

export default function ScreenLogin() {
  const [Email, setEmail] = React.useState('')
  const [Pass, setPass] = React.useState('')

  const handleForgot = () =>{
    router.navigate('/auth/forgot')
  }

  const handleSignup = () =>{
    router.navigate('/auth/signup')
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

        <ButtonRoute title='Login' width={120} route={'/products'} methodRout='replace' />

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
