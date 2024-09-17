import { ButtonPadrao } from "@/components/button";
import { router, Stack } from "expo-router";
import React from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, View, TextInput, ScrollView, FlatList} from "react-native";


export default function ScreenStatus() {
    function buy() {
        router.navigate('/buy');
    }

    function car() {
        router.navigate('/bag');
    }

    const insert = () => {
        alert('comentário inserido');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: 'Pedidos',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />

            <View style={styles.content}>
                <Text style={styles.h1}>Status do Pedido</Text>
                <Text style={styles.text}>Verifique o status do seu pedido, logo ele chegará ao seu destino.</Text>
            </View>

            <View style={styles.map}></View>

            <View style={styles.content}>
                <Text style={styles.h1}>Observações:</Text>
                <TextInput inputMode="text"  style={styles.input} placeholder="Digite uma observação sobre o pedido..."/>
                <Pressable style={styles.insert} onPress={insert}>
                    <Text style={styles.insertText}>Inserir</Text>
                </Pressable>
            </View>


            <FlatList
                style={styles.areaObs}
                data={
                    [
                        {
                            id: '0',
                            obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora quo deleniti repellat nostrum debitis, '
                        },

                        {
                            id: '1',
                            obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora quo deleniti repellat nostrum debitis, '
                        },

                        {
                            id: '2',
                            obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora quo deleniti repellat nostrum debitis, '
                        },
                         
                        {
                            id: '3',
                            obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora quo deleniti repellat nostrum debitis, '
                        },

                        {
                            id: '4',
                            obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora quo deleniti repellat nostrum debitis, '
                        },

                        {
                            id: '5',
                            obs: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora quo deleniti repellat nostrum debitis, '
                        }

                    ]
                }
                keyExtractor={item => item.id}
                renderItem={(item) => <Text style={styles.obsText}>{item.item.obs}</Text>}
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