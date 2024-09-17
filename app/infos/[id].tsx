import { ButtonPadrao } from "@/components/button";
import { ButtonAmount } from "@/components/button-amount";
import { getProductById } from "@/services/cafe";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, StatusBar, View, Image } from "react-native";


export default function ScreenInfos() {
    const {id} = useLocalSearchParams();
    const idProduct = parseInt(id as string);
    const product = getProductById(idProduct)

    if(!product) return router.back();

    const tara = () => {
        
    }

    return (

        <SafeAreaView style={styles.container}>
            
            <Stack.Screen options={{
                title: 'Grãos de Café',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
                headerRight: ({ tintColor }) => <Pressable><FontAwesome6 name='bag-shopping' size={28} color={tintColor} /></Pressable>
            }} />

            <View>
                <Text style={styles.h1}>{product.titulo}</Text>
                <Image style={styles.img} source={{ uri: product.img }} />
            </View>

            <Text style={styles.desc}>Descrição</Text>
            <Text  style={styles.descText}>{product.desc}</Text>

            <View style={styles.infoArea}>
                <View>
                    <Text style={styles.price}>R$ {product.preco}</Text>
                    <Text style={styles.weight}>{product.gramas} g</Text>
                </View>

                <View>
                    <ButtonAmount key='count' color="#592C28" colorText="white"/>
                    <ButtonPadrao onPress={tara} title="Remover" height={50} width={100} marginTop={20}/>                    
                </View>

            </View>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2E8DF',
    },
    h1:{
        fontFamily: 'OswaldMedium',
        fontSize: 28,
        marginBottom: 15,
        color: '#592C28'
    },

    img:{
        resizeMode: 'cover',
        width: '100%',
        height: 225,
        borderRadius: 20,
        marginHorizontal: 'auto',
        marginBottom: 15,

        shadowColor: 'black',
        shadowOffset: {
        width: 3,
        height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },

    desc: {
        fontSize: 21,
        fontFamily: 'OswaldRegular',
        color: '#592C28',
    },
    descText:{
        fontSize: 18,
        fontFamily: 'OswaldLight',
        color: '#592C28',
        marginBottom: 15,
    },

    infoArea:{
        borderTopColor: '#592C28',
        borderTopWidth: 4,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    price:{
        fontFamily: 'OswaldRegular',
        fontSize: 26,
        marginBottom: 10,
        color: '#592C28',
    },

    weight:{
        fontFamily: 'OswaldRegular',
        fontSize: 24,
        marginBottom: 10,
        color: '#592C28',
    },    
});