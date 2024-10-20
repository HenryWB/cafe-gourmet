import { Cafe } from "@/types/cafe";
import { ButtonPadrao } from "@/components/button";
import { CardPedido } from "@/components/card-pedido";
import Radio from "@/components/inputs/Radio";
import { getAllProducts } from "@/services/cafe";
import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { ProductsContext } from "@/contexts/productsContext";
import { reload } from "@react-native-firebase/auth";

export default function ScreenCar() {
    const [forma, setForma] = React.useState('cartao');
    const {carrinho} = React.useContext(ProductsContext)
    const [lista, setLista]  = React.useState(0)
    const [valor, setValor] = React.useState('')
    const [frete, setFrete] = React.useState('')
    const [total, setTotal] = React.useState('')

    function buy() {
        const params = new URLSearchParams();
        params.set('formaPagamento', forma)
        router.push(`/buy?${params.toString()}`) 
    }

    useEffect(() => {
        setLista(carrinho?.cafes.length)

        let valorProdutos = 0
        let valorFrete = 0
        
        if(carrinho?.cafes.length > 0){
            carrinho.cafes.forEach((cafe) => {
                valorProdutos += parseInt(cafe.preco.replace(/[^0-9]/g, ''))
            })
            valorFrete = carrinho?.cafes.length * 500

            var valorTxt = valorProdutos.toString();
            var freteTxt = valorFrete.toString();
            var totalTxt = (valorProdutos + valorFrete).toString()
            var virgula = ",";

            var valorPosition = valorTxt.length - 2;
            var fretePosition = freteTxt.length - 2;
            var totalPosition = totalTxt.length - 2;

            var valorOutput = [valorTxt.slice(0, valorPosition), virgula, valorTxt.slice(valorPosition)].join('');
            var freteOutput = [freteTxt.slice(0, fretePosition), virgula, freteTxt.slice(fretePosition)].join('');
            var totalOutput = [totalTxt.slice(0, totalPosition), virgula, totalTxt.slice(totalPosition)].join('');

            setValor(valorOutput)
            setFrete(freteOutput)
            setTotal(totalOutput)
        }

        if(carrinho?.cafes.length == 0) {
            setValor('000,00')
            setFrete('000,00')
            setTotal('000,00')
        }

    }, [carrinho.cafes.length])

   
    return (
        <SafeAreaView style={styles.container}>

            <Stack.Screen options={{
                title: 'Pedidos',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />

            {lista != 0 &&
                <FlatList style={styles.flat}
                data={carrinho.cafes}
                keyExtractor={(product) => product.id.toString()}
                renderItem={({ item }: { item: Cafe }) => {return  (<CardPedido cafe={item}/>)}}
                />
            }

            {lista <= 0 &&
                <View style={styles.flat}>
                    <Text style={[styles.textSumari, {margin: 25, color:'#592C28'}]}>Não há itens no carrinho.</Text>
                </View>
            }
            
            

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
                            <Text style={styles.textSumari}>R$ {valor}</Text>
                        </View>

                        <View style={styles.areaSumari}>
                            <Text style={styles.textSumari}>Entrega</Text>
                            <Text style={styles.textSumari}>R$ {frete}</Text>
                        </View>

                        <View style={styles.areaSumariTotal}>
                            <Text style={styles.textSumariTotal}>Total:</Text>
                            <Text style={styles.textSumariTotal}>R$ {total}</Text>
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