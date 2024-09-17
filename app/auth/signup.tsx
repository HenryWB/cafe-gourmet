import React from 'react';
import { Image, StyleSheet, View, Text, TextInput, SafeAreaView, StatusBar, ViewBase, Pressable } from 'react-native';
import { ButtonRoute } from '@/components/button-route';
import { router } from 'expo-router';

export default function ScreenSignup() {
    const [Email, setEmail] = React.useState('')
    const [User, setUser] = React.useState('')
    const [Pass, setPass] = React.useState('')

    const handleLogin = () => {
        router.navigate('/auth/login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Crie sua conta!</Text>

            <View style={styles.content}>
                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.inputStyle}
                    inputMode='email'
                    placeholder='Digite seu e-mail...'
                    value={Email}
                    onChangeText={t => setEmail(t)}
                />

                <Text style={styles.label}>Usuário:</Text>
                <TextInput
                    style={styles.inputStyle}
                    inputMode='text'
                    placeholder='Digite seu usuário...'
                    value={User}
                    onChangeText={t => setUser(t)}
                />

                <Text style={styles.label}>Senha:</Text>
                <TextInput style={styles.inputStyle}
                    inputMode='text'
                    secureTextEntry={true}
                    placeholder='Digite sua senha...'
                    value={Pass}
                    onChangeText={t => setPass(t)}
                />



                <ButtonRoute title='Cadastrar' width={120} route={'/products'} methodRout='replace' />

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
