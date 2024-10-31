import { router, Stack, useFocusEffect } from "expo-router";
import { SafeAreaView, Text, StyleSheet, View, Pressable, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore"
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@/contexts/FirebaseContext";
import { Pedido } from "@/types/pedido";

export default function ScreenPedidos(){
    const {currentUser} = useContext(FirebaseContext)
    const [listaPedidos, setListaPedidos] = useState<Array<Pedido> | null>(null)
    const [quantidadePedidos, setQuantidadePedidos] = useState(0)
    
    useEffect(()=>{
        if(currentUser?.id){
            let pedido: Pedido
            let lista: Pedido[] = []
            firestore().collection('Users').doc(currentUser?.id).collection('Pedidos').get().then(query => {
                
                query.forEach(item => {
                    lista.push({
                        id: item.id,
                        carrinho: item.data()['carrinho'],
                        formaPagamento: item.data()['formaPagamento'],
                        status: item.data()['status'],
                        valorTotal: item.data()['valorTotal'],
                        endereco: item.data()['endereco'],
                        cartao: item.data()['cartao'],
                    })
                })
                // console.log(lista)

                //console.log(query.docs)
            }).finally(()=>{
                setListaPedidos(lista)
            })
        }
    }, [quantidadePedidos])

    useFocusEffect(()=>{
        if(currentUser?.id)
        firestore().collection('Users').doc(currentUser?.id).collection('Pedidos').get().then(query => {  
            setQuantidadePedidos(query.docs.length)        
        })
    })

    const status = () => {
        
    }

    const parametros = (id: string) => {
        
    }

    return (
        <SafeAreaView style={styles.contener}>
            <Stack.Screen options={{
                title: 'Pedidos',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />
            <View style={styles.content}>
                <FlatList
                    data={listaPedidos}
                    renderItem={(item)=>
                    <Pressable onPress={()=> {
                        const params = new URLSearchParams();
                        params.set('id', item.item.id.toString())
                        router.replace(`/status?${params.toString()}`)
                        
                    }} style={styles.pedidos}>
                        <Text style={styles.pedidosText}>Código do Pedido: {item.item.id}</Text>
                        <Text style={styles.pedidosText}>Status: {item.item.status}</Text>
                        <Text style={styles.pedidosText}>Forma de Pagamento: {item.item.formaPagamento}</Text>
                    </Pressable>}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contener: {
        backgroundColor: '#F2E8DF',
        flex: 1
    },
    content:{
        width: '95%',
        marginHorizontal: 'auto',
        marginTop: 10
    },
    opcoes: {
        marginBottom: 10,
        borderColor: '#592C28',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        padding: 5
    },

    opcoesText: {
        fontFamily: 'OswaldMedium',
        color: '#592C28',
        fontSize: 16
    },

    pedidos:{
        marginBottom: 10,
        borderBlockColor: '#592C28',
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        gap: 3        
    },

    pedidosText: {
        fontFamily: 'OswaldRegular',
        color: '#592C28'
    }
})