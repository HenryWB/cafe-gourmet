import { Cafe } from "@/.expo/types/cafe";
import { ButtonPadrao } from "@/components/button";
import CardCadastro from "@/components/card-cadastros";
import { CardPedido } from "@/components/card-pedido";
import Radio from "@/components/inputs/Radio";
import { getAllProducts } from "@/services/cafe";
import { router, Stack } from "expo-router";
import React from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text, Pressable, TextInput, ScrollView } from "react-native";

export default function ScreenBuy() {
    const [contextCartao, setContextCartao] = React.useState('novo');
    const [contextEndereco, setContextEndereco] = React.useState('novo');
    const [cartao, setCartao] = React.useState('0');
    const [endereco, setEndereco] = React.useState('0');

    const pressContextCartaoNovo = () => {
        setContextCartao('novo')
    }

    const pressContextCartaoCadastrar = () => {
        setContextCartao('cadastrar')
    }

    const pressContextEnderecoNovo = () => {
        setContextEndereco('novo')
    }

    const pressContextEnderecoCadastrar = () => {
        setContextEndereco('cadastrar')
    }



    function status() {
        router.push('/status');
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
            
            

            <ScrollView style={styles.contet} nestedScrollEnabled = {true}>
                <Text style={styles.h1}>Finalizar Pedido</Text>
                <Text style={styles.text}>Informe seus dados para o pagamento.</Text>

                <View  style={styles.configArea}>
                    <View>
                        <Text style={styles.h2}>Cartão</Text>
                        <View style={styles.contextView}>
                            <Pressable onPress={pressContextCartaoNovo}>
                                <Text style={contextCartao === 'novo' ? styles.contextTextView : styles.contextTextViewInactive}>Novo</Text>
                            </Pressable>

                            <Text style={styles.contextTextViewInactive}>|</Text>

                            <Pressable onPress={pressContextCartaoCadastrar}>
                                <Text style={contextCartao === 'cadastrar' ? styles.contextTextView : styles.contextTextViewInactive}>Cadastro</Text>
                            </Pressable>
                        </View>

                        {contextCartao === 'novo' &&
                            <ScrollView style={styles.scrollInput}  nestedScrollEnabled = {true}>
                                <Text style={styles.label}>Nome do cartão:</Text>
                                <TextInput 
                                    placeholder="Digite o nome no seu cartão..." 
                                    inputMode="text"
                                    style={[styles.input, {textTransform: 'uppercase'}]}
                                />
                                
                                <Text style={styles.label}>CPF:</Text>
                                <TextInput 
                                    placeholder="Digite o seu CPF..." 
                                    inputMode="numeric"
                                    style={styles.input}
                                />

                                <Text style={styles.label}>Número do cartão:</Text>
                                <TextInput 
                                    placeholder="Digite o número do seu cartão..." 
                                    inputMode="numeric"
                                    style={styles.input}
                                />

                                 <View style={styles.inputArea}>
                                    <View >
                                        <Text style={styles.label}>Validade:</Text>

                                        <View style={styles.inputArea}>
                                            <TextInput 
                                                placeholder="Mês..." 
                                                inputMode="numeric"
                                                style={styles.inputSmall}
                                            />
                                            <Text style={styles.label}> / </Text>
                                            <TextInput 
                                                placeholder="Ano..." 
                                                inputMode="numeric"
                                                style={styles.inputSmall}
                                            />
                                        </View>
                                        
                                        
                                    </View>
                                    
                                    <View>
                                        <Text style={styles.label}>CVV:</Text>
                                        <TextInput 
                                            placeholder="CVV..." 
                                            inputMode="numeric"
                                            style={styles.inputSmall}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        }
                       
                       {contextCartao === 'cadastrar' &&
                        <ScrollView style={styles.scrollInput} nestedScrollEnabled = {true}>
                            <CardCadastro options={[
                            {
                                title: 'Cartão 1', 
                                label_1: 'Nome', text_1: 'Henryque Wallace', 
                                label_2: 'Número', text_2: '0000000000000000', 
                                label_3: 'CPF', text_3: '00000000000', 
                                label_4: 'CVV', text_4: '000', 
                                label_5: 'Validade', text_5: '00/00', 
                                id: '0'
                            },

                            {
                                title: 'Cartão 2', 
                                label_1: 'Nome', text_1: 'Wallace', 
                                label_2: 'Número', text_2: '0000000000000000', 
                                label_3: 'CPF', text_3: '00000000000', 
                                label_4: 'CVV', text_4: '000', 
                                label_5: 'Validade', text_5: '00/00', 
                                id: '1'
                            },

                            {
                                title: 'Cartão 3', 
                                label_1: 'Nome', text_1: 'Nayra', 
                                label_2: 'Número', text_2: '0000000000000000', 
                                label_3: 'CPF', text_3: '00000000000', 
                                label_4: 'CVV', text_4: '000', 
                                label_5: 'Validade', text_5: '00/00', 
                                id: '2'
                            },

                            {
                                title: 'Cartão 4', 
                                label_1: 'Nome', text_1: 'Nayra', 
                                label_2: 'Número', text_2: '0000000000000000', 
                                label_3: 'CPF', text_3: '00000000000', 
                                label_4: 'CVV', text_4: '000', 
                                label_5: 'Validade', text_5: '00/00', 
                                id: '3'
                            },
                            ]} 
                            checkedValue={cartao}
                            onChange={setCartao}
                        />
                        </ScrollView>
                        }
                        
                    </View>

                    <View>
                        <Text style={styles.h2}>Endereço</Text>
                        <View style={styles.contextView}>
                            <Pressable onPress={pressContextEnderecoNovo}>
                                <Text style={contextEndereco === 'novo' ? styles.contextTextView : styles.contextTextViewInactive}>Novo</Text>
                            </Pressable>

                            <Text style={styles.contextTextViewInactive}>|</Text>

                            <Pressable onPress={pressContextEnderecoCadastrar}>
                                <Text style={contextEndereco === 'cadastrar' ? styles.contextTextView : styles.contextTextViewInactive}>Cadastro</Text>
                            </Pressable>
                        </View>

                        {contextEndereco === 'novo' &&
                            <ScrollView style={styles.scrollInput} nestedScrollEnabled = {true}>
                                <View style={styles.inputRow}>

                                    <View style={styles.inputRow}>
                                        <Text style={styles.labelRow}>CEP:</Text>
                                        <View style={styles.inputAreaRow}>
                                            <TextInput
                                                placeholder="CEP..."
                                                inputMode="numeric"
                                                style={styles.inputSmallRow}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.inputRow}>
                                        <Text style={styles.labelRow}>Número:</Text>
                                        <View style={styles.inputAreaRow}>
                                            <TextInput
                                                placeholder="Número..."
                                                inputMode="numeric"
                                                style={styles.inputSmallRow}
                                            />
                                        </View>
                                    </View>

                                
                                    
                                </View>

                                <Text style={styles.label}>Rua:</Text>
                                <TextInput 
                                    placeholder="Digite o nome no seu cartão..." 
                                    inputMode="text"
                                    style={[styles.input, {textTransform: 'uppercase'}]}
                                />
                                
                                <Text style={styles.label}>Bairro:</Text>
                                <TextInput 
                                    placeholder="Digite o seu CPF..." 
                                    inputMode="numeric"
                                    style={styles.input}
                                />

                                <Text style={styles.label}>Complemento:</Text>
                                <TextInput 
                                    placeholder="Digite o número do seu cartão..." 
                                    inputMode="numeric"
                                    style={styles.input}
                                />

                                
                            </ScrollView>
                        }
                       
                       {contextEndereco === 'cadastrar' &&
                        <ScrollView style={styles.scrollInput} nestedScrollEnabled = {true}>
                            <CardCadastro options={[
                            {
                                title: 'Endereço 1', 
                                label_1: 'Endereço', text_1: 'Rua 1', 
                                label_2: 'Bairro', text_2: 'Limoeiro', 
                                label_3: 'Complemento', text_3: '800', 
                                label_4: 'CEP', text_4: '00000000', 
                                label_5: 'Número', text_5: '0000', 
                                id: '0'
                            },

                            {
                                title: 'Endereço 2', 
                                label_1: 'Endereço', text_1: 'Rua 2', 
                                label_2: 'Bairro', text_2: 'Limoeiro', 
                                label_3: 'Complemento', text_3: '800', 
                                label_4: 'CEP', text_4: '00000000', 
                                label_5: 'Número', text_5: '0000', 
                                id: '1'
                            },

                            {
                                title: 'Endereço 3', 
                                label_1: 'Endereço', text_1: 'Rua 3', 
                                label_2: 'Bairro', text_2: 'Limoeiro', 
                                label_3: 'Complemento', text_3: '800', 
                                label_4: 'CEP', text_4: '00000000', 
                                label_5: 'Número', text_5: '0000', 
                                id: '2'
                            },
                            ]} 
                            checkedValue={endereco}
                            onChange={setEndereco}
                        />
                        </ScrollView>
                        }
                        
                    </View>
                    
                </View>
                

            </ScrollView>
            <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <ButtonPadrao height={50} onPress={status} title="Pagar" marginTop={5} width={125} />
                    </View>
        </SafeAreaView>




    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E8DF',
        justifyContent: 'center',
        alignItems: 'center',
        
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

    inputArea:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    scrollInput:{
        height: 300,
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
        borderBottomWidth: 2,
        fontFamily: 'OswaldLight',
        borderColor: '#592C28',
        marginBottom: 10,
    },

    inputAreaRow:{

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