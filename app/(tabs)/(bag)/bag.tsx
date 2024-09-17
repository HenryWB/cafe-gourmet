import { Cafe } from "@/.expo/types/cafe";
import { ButtonPadrao } from "@/components/button";
import { CardPedido } from "@/components/card-pedido";
import Radio from "@/components/inputs/Radio";
import { getAllProducts } from "@/services/cafe";
import { router, Stack } from "expo-router";
import React from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function ScreenCar() {
    const [forma, setForma] = React.useState('cartao');

    const products = getAllProducts();

    function buy() {
        router.push('/buy');
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
            
            <FlatList style={styles.flat}
                data={products}
                keyExtractor={(product) => product.id.toString()}
                renderItem={({ item }: { item: Cafe }) => (<CardPedido cafe={item} />)}
            />

            <View style={styles.infoPedidos}>
                <View  style={styles.sumari}>
                    <View>
                        <Text style={styles.formaPagamento}>Forma de Pagamento</Text>
                        <Radio 
                        options={[
                            {label: 'Dinheiro', value: 'dinheiro'},
                            {label: 'Cartão', value: 'cartao'},
                        ]} 
                        checkedValue={forma}
                        onChange={setForma}
                        />
                    </View>
                    
                    <View>
                        <Text style={styles.formaPagamento}>Resumo do Pedido</Text>
                        <View style={styles.areaSumari}>
                            <Text style={styles.textSumari}>Itens Total:</Text>
                            <Text style={styles.textSumari}>R$ 000,00</Text>
                        </View>

                        <View style={styles.areaSumari}>
                            <Text style={styles.textSumari}>Entrega</Text>
                            <Text style={styles.textSumari}>R$ 000,00</Text>
                        </View>

                        <View style={styles.areaSumariTotal}>
                            <Text style={styles.textSumariTotal}>Total:</Text>
                            <Text style={styles.textSumariTotal}>R$ 000,00</Text>
                        </View>
                    </View>

                    <View style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
                        <ButtonPadrao height={50} onPress={buy} title="Finalizar" marginTop={5}  width={125} />
                    </View>
                </View>
            </View>

        </SafeAreaView>




    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E8DF',
    },

    text: {
        fontSize: 15,
        textAlign: 'center'
    },

    flat:{
        flex: 1,
    },

    infoPedidos:{
        backgroundColor: '#F2E8DF',
        flex: 1,
        padding: 15,
    },

    sumari:{
        flex: 1,
        borderTopColor: '#592C28',
        borderTopWidth: 3,
        width: '95%',
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
    },

    formaPagamento:{
        fontFamily: 'OswaldMedium',
        fontSize: 24,
        color: '#592C28',
        marginBottom: 5
    },

    areaSumari:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginBottom: 10,
    },

    textSumari:{
        fontFamily: 'OswaldLight',
        fontSize: 18,
    },

    areaSumariTotal:{
        borderTopColor: '#592C28',
        borderTopWidth: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginBottom: 10,
    },

    textSumariTotal:{
        fontFamily: 'OswaldMedium',
        fontSize: 21,
    },

});