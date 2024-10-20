import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, View, Image, Alert, TextInput, ScrollView } from "react-native";
import {utils} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FirebaseContext } from "@/contexts/FirebaseContext";
import storage, {ref, getStorage} from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';



export default function ScreenProfile() {
    const firebaseContext = React.useContext(FirebaseContext);
    const [Pass, setNewPass] = React.useState<string>('')
    const [changePass, setPass] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    function cards() {
        router.navigate(`/cards`);
    }

    function enderecos() {
        router.navigate(`/enderecos`);
    }

    function setProfile() {
        router.navigate(`/setProfile`);
    }

    const singOut = () => {
        auth()
            .signOut()
            .then(() => router.replace('/'));
    }

    const handlePassChange = () => {
        setPass(!changePass)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (result.assets != null) {
            setLoading(true)    

            const reference = storage().ref('profilePicture_'  + auth().currentUser?.uid);
            await reference.putFile(result.assets[0].uri);
            await reference.getDownloadURL().then((url) => {
                auth().currentUser?.updateProfile(
                    {
                      photoURL: url
                    }
                ).then(() => {
                    setLoading(false)
                })
            })           
        }
      };

       return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: 'Perfil',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />
            <ScrollView>
            <View style={styles.header}>
                <View style={styles.linha}></View>

                <Pressable onPress={pickImage}>
                        <Image style={styles.image} source={loading ?{ uri: 'https://firebasestorage.googleapis.com/v0/b/cafe-258cc.appspot.com/o/images.png?alt=media&token=19ad755b-6f53-477d-a077-bf58a4844e2c'} : {uri: auth().currentUser?.photoURL?.toString()} } /> 
                </Pressable>
                
            </View>
            <View style={styles.content}>
                <Text style={styles.h1}>{firebaseContext.currentUser?.name}</Text>
                <Text style={styles.h2}>E-mail: {auth().currentUser?.email}</Text>

                <View style={styles.infosPersonal}>
                    <Text style={styles.h3}>Informações Pessoais:</Text>
                    <View style={styles.contentInfos}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.text}>{firebaseContext.currentUser?.name}</Text>
                    </View>

                    <View style={styles.contentInfos}>
                        <Text style={styles.label}>Celular: </Text>
                        <Text style={styles.text}>{firebaseContext.currentUser?.tel}</Text>
                    </View>

                    <View style={styles.contentInfos}>
                        <Text style={styles.label}>Data de Nascimento: </Text>
                        <Text style={styles.text}>{firebaseContext.currentUser?.nascimento}</Text>
                    </View>
                </View>

                <View style={styles.infosPayment}>
                    <Text style={styles.h3}>Pagamento e Endereço:</Text>
                    <Pressable onPress={cards} style={styles.contentInfosPress}>
                        <Text style={styles.label}>Trocar cartão:</Text>
                        <Text style={styles.text}>{firebaseContext.currentCard}</Text>
                    </Pressable>

                    <Pressable onPress={enderecos} style={styles.contentInfosPress}>
                        <Text style={styles.label}>Trocar Endereço:</Text>
                        <Text style={styles.text}>{firebaseContext.currentEndereco}</Text>
                    </Pressable>
                </View>

                <View style={styles.infosSecurity}>
                    <Text style={styles.h3}>Segurança:</Text>

                    {!changePass &&
                        <Pressable style={styles.contentInfosPress} onPress={handlePassChange}>
                            <Text style={styles.label}>Trocar senha</Text>
                        </Pressable>
                    }

                    {changePass &&
                        <>
                            <Text style={styles.labelInput}>Senha:</Text>
                            <TextInput 
                                secureTextEntry={true}
                                placeholder='Digite sua senha...'
                                value={Pass}
                                onChangeText={t => setNewPass(t)}
                                style={styles.inputStyle} 
                                />
                            <View style={styles.contentButtonPass}>
                                <Pressable style={styles.contentInfosPress} onPress={ handlePassChange }>
                                    <Text style={styles.label}>Cancelar</Text>
                                </Pressable>
                                
                                <Pressable style={styles.contentInfosPress} onPress={() => {
                                    if(Pass === '') return alert('Insira uma senha válida')
                                    auth().currentUser?.updatePassword(Pass).then(()=>{
                                        alert('Senha alterada com sucesso!')
                                    })
                                 }
                                }>
                                    <Text style={styles.label}>Ok</Text>
                                </Pressable>                                
                            </View>
                        </>
                    }


                    <Pressable style={styles.contentInfosPress} onPress={() => {
                        return Alert.alert('Deletar conta', 'Você tem certeza que deseja deletar sua conta?', [
                            {
                                text: 'Não',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'Sim', onPress: () => {
                                    console.log(firebaseContext.currentUser?.id?.toString())
                                    firestore().collection('Users').doc(firebaseContext.currentUser?.id?.toString()).delete().then(() => {
                                        auth().currentUser?.delete().then(() => {
                                            firebaseContext.setUser(null)
                                            router.replace('/auth/login')
                                        })
                                    })

                                }
                            },
                        ])

                    }}>
                        <Text style={styles.label}>Deletar conta</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.contentButton}>
                <Pressable style={styles.button} onPress={setProfile}>
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </Pressable>

                <Pressable style={styles.buttonDark} onPress={singOut}>
                    <Text style={styles.buttonTextDark}>Deslogar</Text>
                </Pressable>
            </View>
            </ScrollView>




        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E8DF',
        justifyContent: 'space-between',
    },

    header: {
        marginTop: 85,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: -60
    },

    linha: {
        borderTopWidth: 2,
        borderColor: '#592C28',
        width: '100%',
    },

    content: {
        width: '95%',
        padding: 5,
        marginHorizontal: 'auto',
    },

    contentButton: {
        width: '95%',
        padding: 15,
        marginTop: 5,
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    contentButtonPass: {
        width: '100%',
        marginHorizontal: 'auto',
        justifyContent: 'flex-end',
        gap: 15,
        flexDirection: 'row',
    },

    h1: {
        fontFamily: 'OswaldMedium',
        fontSize: 24,
        textAlign: 'center',
        color: '#592C28',
    },

    h2: {
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        textAlign: 'center',
        color: '#592C28',
        marginBottom: 20,
    },

    h3: {
        fontFamily: 'OswaldMedium',
        fontSize: 21,
        color: '#592C28',
    },

    label: {
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        textAlign: 'center',
        color: '#592C28',
    },

    text: {
        fontFamily: 'OswaldLight',
        fontSize: 16,
        textAlign: 'center',
        color: '#592C28',
    },

    contentInfos: {
        flexDirection: 'row',
    },

    contentInfosPress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    infosPersonal: {
        width: '95%',
        marginHorizontal: 'auto',
        borderBottomColor: '#592C28',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingBottom: 10,
        gap: 5,
    },

    infosPayment: {
        width: '95%',
        marginHorizontal: 'auto',
        borderBottomColor: '#592C28',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingBottom: 10,
        gap: 5,
    },

    infosSecurity: {
        width: '95%',
        marginHorizontal: 'auto',
        marginBottom: 10,
        paddingBottom: 10,
        gap: 5,
    },

    button: {
        borderWidth: 3,
        borderColor: '#592C28',
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },

    buttonText: {
        color: '#592C28',
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        textAlign: 'center',
    },

    buttonDark: {
        backgroundColor: '#592C28',
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },

    buttonTextDark: {
        fontFamily: 'OswaldRegular',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },



    labelInput: {
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

});