import React from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, StatusBar, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { ButtonPadrao } from '@/components/button';
import auth from '@react-native-firebase/auth'

export default function ScreenForgot() {
    const [Email, setEmail] = React.useState('')

    const handleLogin = () => {
        router.navigate('/auth/login')
    }
    const recuperarSenha = ()=>{
        auth().sendPasswordResetEmail(Email).then(() => {
            alert('Email para recuperar a senha foi enviado')
            router.navigate('/auth/login')
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Recupere sua senha</Text>

            <View style={styles.content}>
                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.inputStyle}
                    inputMode='email'
                    placeholder='Digite seu e-mail...'
                    value={Email}
                    onChangeText={t => setEmail(t)}
                />

                <ButtonPadrao title='Enviar' width={120} onPress={recuperarSenha} height={50} marginTop={25}/>

                <Pressable style={styles.login} onPress={handleLogin}>
                    <Text style={styles.textLogin}>Já possui cadastro? <Text>Clique aqui.</Text></Text>
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

    title: {
        fontSize: 24,
        marginBottom: 20,
        width: 200,
        textAlign: 'center',
        fontFamily: 'OswaldRegular',
        color: '#592C28',
    },

    label: {
        marginTop: 10,
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

    login: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginTop: 5,
    },

    textLogin: {
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        color: '#592C28'
    },
});
