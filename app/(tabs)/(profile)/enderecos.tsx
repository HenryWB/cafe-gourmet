import CardCadastroEndereco from "@/components/card-cadastros-endereco";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, ScrollView, View, TextInput } from "react-native";
import firestore from "@react-native-firebase/firestore"
import { FirebaseContext } from "@/contexts/FirebaseContext";
import { ButtonPadrao } from "@/components/button";
import { Endereco } from "@/types/endereco";
import axios from "axios"

//alterar nome para  setPayment
export default function ScreenEnderecos() {
    const {currentUser, setEndereco, currentEndereco} = React.useContext(FirebaseContext)
    const [contextEndereco, setContextEndereco] = React.useState('novo');
    const [endereco, setEnderecoView] = React.useState('');

    const [CEP, setCEP] = React.useState('')
    const [Rua, setRua] = React.useState('')
    const [Bairro, setBairro] = React.useState('')
    const [Numero, setNumero] = React.useState('')
    const [Complemento, setComplemento] = React.useState('')

    const [Enderecos, setEnderecos] = React.useState<Array<Endereco> | null>(null)

    useEffect(()=>{
        listarEnderecos();

        if(currentEndereco) setContextEndereco('cadastrar')

    },[])

    const pressContextEnderecoNovo = () => {
        setContextEndereco('novo')
    }

    const pressContextCartaoCadastrar = () => {
        setContextEndereco('cadastrar')
    }


    const cadastrar = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).collection('Enderecos').where('numero', '==', Numero).get().then(
                (snapShot) => {
                    if(snapShot.empty && currentUser?.id){
                        firestore().collection('Users').doc(currentUser?.id).collection('Enderecos').add({
                            CEP: CEP,
                            rua: Rua,
                            bairro: Bairro,
                            numero: Numero,
                            complemento: Complemento
                        }).then((element) => {
                            alert('Endereço cadastrado.')
                            setEnderecoView(element.id)
                            setEndereco(Rua)
                            if(currentUser?.id)firestore().collection('Users').doc(currentUser?.id).update({
                                endereco: element.id
                            })
                        })
                    } else {
                        return alert('Endereço já existe.')
                    }
                    listarEnderecos()
                }
            )   
        }
    }

    const selecionar = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).update({
                endereco: endereco
            }).then(()=>{
                Enderecos?.forEach(item => {
                    if(item.id == endereco && item.rua) setEndereco(item.rua)
                })
                alert('Endereço selecionado.')
            })
        }
    }

    const listarEnderecos = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).get().then((item)=>{
                let idEndereco = item.data()
                if(idEndereco != undefined) setEnderecoView(idEndereco['endereco'])
            })

            firestore().collection('Users').doc(currentUser?.id).collection('Enderecos').get().then(
                (snapShot) => {
                    const lista = new Array<Endereco>()
                    snapShot.forEach(query => {
                        lista.push(
                            {
                                id: query.id,
                                rua: query.data()['rua'],
                                numero: query.data()['numero'],
                                CEP: query.data()['CEP'],
                                bairro: query.data()['bairro'],
                                complemento: query.data()['complemento'],
                            }
                        )
                    })
                    setEnderecos(lista)
                }
            )   
        }
    }


    const consultaCEP =  async () => {
        await axios.get(`https://viacep.com.br/ws/${CEP}/json/`).then((response) => {
            setRua(response.data['logradouro'])
            setBairro(response.data['bairro'])
        }
        ).catch(e => {
            //console.log(e)
            alert('Não foi possível localizar esse CEP.')
        })
    }

    return (

        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: 'Endereços',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />

            <Text style={styles.h1}>Cadastro e Seleção</Text>
            <Text style={styles.text}>Cadastre um novo endereço ou selecione um já existente.</Text>

            <View style={styles.configArea}>
                <View>
                    <Text style={styles.h2}>Endereços</Text>
                    <View style={styles.contextView}>
                        <Pressable onPress={pressContextEnderecoNovo}>
                            <Text style={contextEndereco === 'novo' ? styles.contextTextView : styles.contextTextViewInactive}>Novo</Text>
                        </Pressable>

                        <Text style={styles.contextTextViewInactive}>|</Text>

                        <Pressable onPress={pressContextCartaoCadastrar}>
                            <Text style={contextEndereco === 'cadastrar' ? styles.contextTextView : styles.contextTextViewInactive}>Cadastro</Text>
                        </Pressable>
                    </View>

                    {contextEndereco === 'novo' &&
                        <>
                        <ScrollView style={styles.scrollInput} nestedScrollEnabled={true}>
                            <Text style={styles.label}>CEP:</Text>
                            <TextInput
                                placeholder="Digite o seu CEP..."
                                inputMode="numeric"
                                onChangeText={t => {setCEP(t)}}
                                onEndEditing={consultaCEP}
                                style={styles.input}
                            />

                            <Text style={styles.label}>Rua:</Text>
                            <TextInput
                                placeholder="Digite a sua Rua..."
                                inputMode="text"
                                onChangeText={t => {setRua(t)}}
                                value={Rua}
                                style={styles.input}
                            />

                            <Text style={styles.label}>Bairro:</Text>
                            <TextInput
                                placeholder="Digite o seu bairro..."
                                inputMode="text"
                                onChangeText={t => {setBairro(t)}}
                                value={Bairro}
                                style={styles.input}
                            />


                            <View style={styles.inputArea}>
                                <Text style={styles.labelLine}>Número:</Text>
                                <TextInput
                                    placeholder="Número..."
                                    inputMode="numeric"
                                    onChangeText={t => {setNumero(t)}}
                                    style={styles.inputSmall}
                                />
                            </View>

                            <Text style={styles.label}>Complemento:</Text>
                            <TextInput
                                placeholder="Coloque informações complementares..."
                                inputMode="text"
                                onChangeText={t => {setComplemento(t)}}
                                style={styles.input}
                                
                            />
                        </ScrollView>
                       <ButtonPadrao height={50} onPress={cadastrar} width={150} title="Cadastrar" marginTop={15}/>
                       </>
                    }

                    {contextEndereco === 'cadastrar' &&
                        <>
                            <ScrollView style={styles.scrollInput} nestedScrollEnabled={true}>
                                <CardCadastroEndereco options={Enderecos}
                                    checkedValue={endereco}
                                    onChange={setEnderecoView}
                                />
                            </ScrollView>
                            <ButtonPadrao height={50} onPress={selecionar} width={150} title="Selecionar" marginTop={15} />
                        </>
                    }
                </View>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E8DF',
        paddingHorizontal: 25
    },

    h1: {
        fontSize: 24,
        fontFamily: 'OswaldMedium',
        color: '#592C28',
    },

    h2:{
        fontFamily: 'OswaldMedium',
        fontSize: 21,
        color: '#592C28',
        marginBottom: 5
    },

    text: {
        fontSize: 18,
        fontFamily: 'OswaldLight',
        marginBottom: 10,
        color: '#592C28',
    },

    contet:{
        flex: 1,
        padding: 15,
        width: '90%',
    },

    configArea:{
        flex: 1,
        width: '100%',
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
    },

    contextView:{
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#592C28',
        height: 40,
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 15,
        gap: 15
    },

    contextTextView:{
        fontFamily: 'OswaldMedium',
        fontSize: 18,
        color: '#D9A689',

    },

    contextTextViewInactive:{
        fontFamily: 'OswaldMedium',
        fontSize: 18,
        color: 'white',
    },

    input: {
        width: '100%',
        padding: 5,
        fontSize: 16,
        backgroundColor: "transparent",
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontFamily: 'OswaldLight',
        borderColor: '#592C28',
        marginBottom: 10,
    },

    inputSmall: {
        width: 75,
        padding: 5,
        fontSize: 16,
        backgroundColor: "transparent",
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontFamily: 'OswaldLight',
        borderColor: '#592C28',
        marginBottom: 10,
    },

    label: {
        color: '#592C28',
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'OswaldRegular',
    },

    labelLine: {
        color: '#592C28',
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'OswaldRegular',
        height: '100%',
        lineHeight: 40
    },

    inputArea:{
        flexDirection: 'row',
        gap: 10,
        marginBottom: 5,
        alignItems: 'center'
    },

    scrollInput:{
        height: 375,
        width: '100%',
        borderBottomColor: '#592C28',
        borderBottomWidth: 3,
        marginBottom: 15
    },

    inputRow:{
        flexDirection:'row',
        gap: 5,
        marginRight: 15
    },

    inputSmallRow: {
        width: 100,
        padding: 5,
        fontSize: 16,
        backgroundColor: "transparent",
        borderBottomColor: 'black',
        fontFamily: 'OswaldLight',
        borderColor: '#592C28',
        marginBottom: 10,
    },

    labelRow: {
        color: '#592C28',
        alignSelf: 'flex-start',
        paddingVertical: 5,
        marginBottom: 10,

        fontSize: 16,
        fontFamily: 'OswaldRegular',
        height: '100%',
    },

});