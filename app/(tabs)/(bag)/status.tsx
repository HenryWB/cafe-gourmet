import { ButtonPadrao } from "@/components/button";
import { router, Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, View, TextInput, ScrollView, FlatList} from "react-native";
import firestore, { query } from '@react-native-firebase/firestore'
import { FirebaseContext } from "@/contexts/FirebaseContext";
import { ProductsContext } from "@/contexts/productsContext";

type Props = {
    id: string,
}

export default function ScreenStatus(props: Props) {
    const {id} = useLocalSearchParams<Props>()
    const {currentUser} = useContext(FirebaseContext)
    const {pedido} = useContext(ProductsContext)
    const [obs, setObs] = useState('')
    const [listObs, setListObs] = useState<Array<string>>()

    useEffect(()=>{
        listarObservacoes()
    }, [props.id])

    const listarObservacoes =  () => {
        if (currentUser?.id) {
            firestore().collection('Users').doc(currentUser?.id).collection('Pedidos').where('id', '==', id).get().then(
                (snapShot) => {
                    if (snapShot.empty && currentUser?.id && id) {
                        firestore().collection('Users').doc(currentUser?.id).collection('Pedidos').doc(id).collection('Observacoes').get().then(
                            (snapShot) => {
                                let lista: Array<string> = []
                                snapShot.forEach(item => {
                                    console.log(item.data())
                                    lista.push(item.data()['observacao'])
                                })
                                setListObs(lista)
                                console.log(lista)
                            }
                        )
                    }
                }
            )   
        }
    }

    const insert = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).collection('Pedidos').where('id', '==', pedido?.id).get().then(
                (snapShot) => {
                    if(snapShot.empty && currentUser?.id && pedido?.id){
                        firestore().collection('Users').doc(currentUser?.id).collection('Pedidos').doc(pedido?.id).collection('Observacoes').add({
                            observacao: obs,
                        }).then((element) => {
                            setObs('')
                        })
                    }                 
            })
            listarObservacoes()
            alert('comentário inserido');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: 'Status',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />

            <View style={styles.content}>
                <Text style={styles.h1}>Status do Pedido</Text>
                <Text style={styles.text}>Seu pedido, logo chegará ao seu destino.</Text>
            </View>

            {/* <View style={styles.map}></View> */}

            <View style={styles.content}>
                <Text style={styles.h1}>Observações:</Text>
                <TextInput 
                    inputMode="text"  
                    style={styles.input} placeholder="Digite uma observação sobre o pedido..."
                    onChangeText={t => {setObs(t)}}
                    value={obs}
                    />
                <Pressable style={styles.insert} onPress={insert}>
                    <Text style={styles.insertText}>Inserir</Text>
                </Pressable>
            </View>


            <FlatList
                style={styles.areaObs}
                data={listObs}
                keyExtractor={(item) => item}
                renderItem={(item) => <Text style={styles.obsText}>{item.item}</Text>}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#F2E8DF',
    },

    h1: {
        fontSize: 24,
        fontFamily: 'OswaldMedium',
        color: '#592C28',
    },


    text: {
        fontSize: 18,
        fontFamily: 'OswaldLight',
        color: '#592C28',
    },

    content:{
        width: '90%',
        marginHorizontal: 'auto'
    },

    map:{
        width:'95%',
        height: 200,
        borderColor: '#592C28',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 15,
        marginHorizontal: 'auto',
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
        marginBottom: 5,
    },

    insert:{
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    insertText:{
        color: '#592C28',
        fontFamily: 'OswaldRegular',
        fontSize: 18,
        borderColor: '#592C28',
        borderWidth: 2,
        width: 70,
        textAlign: 'center',
        paddingHorizontal: 5,

    },

    areaObs:{
        width: '95%',
        height: '100%',
        marginHorizontal: 'auto',
        padding: 5,
        marginTop: 10
    },

    obsText:{
        fontFamily: 'OswaldLight',
        fontSize:  18,
        borderBottomColor: '#592C28',
        borderBottomWidth: 3,
        marginBottom: 15,
    },
});