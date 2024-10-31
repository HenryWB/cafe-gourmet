import React from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ButtonPadrao } from '@/components/button';
import  firebase  from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FirebaseContext } from '@/contexts/FirebaseContext';
import { ProductsContext } from '@/contexts/productsContext';


type Props = {
    email?: string,
}


export default function ScreenSignup() {
    const firebaseContext  = React.useContext(FirebaseContext);
    const productsContext  = React.useContext(ProductsContext);

    const { email } = useLocalSearchParams<Props>();

    const [Email, setEmail] = React.useState<string>(email || '')
    const [User, setUser] = React.useState('')
    const [Pass, setPass] = React.useState('')

    const handleLogin = () => {
        router.navigate('/auth/login')
    }

    const addUser = async () => {
        if(Email === '' || Email === null) return alert('por favor insira um e-mail')
        if(Pass === '' || Pass === null) return alert('por favor insira uma senha')
        if(User === '' || Pass === null) return alert('por favor insira um usuário')

        
        auth()
        .createUserWithEmailAndPassword(Email, Pass)
        .then(() => {
            firestore()
            .collection('Users')
            .add({
                name: User,
                email: Email,
                tipo: 'cliente',
            })
            .then(infos => {
                const newUser =  {
                    id: infos.id,
                    name: User,
                    email: Email,
                    tipo: 'cliente',
                }
                firebaseContext.setUser(newUser)
                productsContext.dispatchCarrinho({
                    type: 'CLEAN',
                    cafe: {
                        id: '',
                        desc: '',
                        img: '',
                        preco: '',
                        quantidade: 0,
                        titulo: '',
                        gramas: '',
                    },
                    index: -1
                })


                router.navigate('/products');
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            alert('O email informado já está sendo utilizado');
            }
        
            if (error.code === 'auth/invalid-email') {
            alert('Esse endereço de email é invalido');
            }
        });
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



                <ButtonPadrao title='Cadastrar' width={120} onPress={addUser} height={50} marginTop={25}/>

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
