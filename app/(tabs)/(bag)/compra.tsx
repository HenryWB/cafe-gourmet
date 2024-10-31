import { ButtonPadrao } from "@/components/button";
import CardCadastroEndereco from "@/components/card-cadastros-endereco";
import CardCadastroCartao from "@/components/card-cadastros-cartao";
import { FirebaseContext } from "@/contexts/FirebaseContext";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { Endereco } from "@/types/endereco";
import { Cartao } from "@/types/cartao";
import firestore from "@react-native-firebase/firestore"
import axios from "axios";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Pedido } from "@/types/pedido";
import { ProductsContext } from "@/contexts/productsContext";



type Props = {
    formaPagamento?: string
}

export default function ScreenCompra() {
    const {currentUser, setCard, currentCard, setEndereco, currentEndereco} = React.useContext(FirebaseContext)

    const [contextCartao, setContextCartao] = React.useState('');
    const [contextEndereco, setContextEndereco] = React.useState('');

    const [cartao, setCartao] = React.useState('');
    const [endereco, setEnderecoView] = React.useState('');

    const [Name, setName] = React.useState('')
    const [CPF, setCPF] = React.useState('')
    const [NumeroCartao, setNumeroCartao] = React.useState('')
    const [date, setDate] = React.useState(new Date());
    const [CVV, setCVV] = React.useState('')

    const [Cartoes, setCartoes] = React.useState<Array<Cartao> | null>(null)


    const [CEP, setCEP] = React.useState('')
    const [Rua, setRua] = React.useState('')
    const [Bairro, setBairro] = React.useState('')
    const [NumeroEndereco, setNumeroEndereco] = React.useState('')
    const [Complemento, setComplemento] = React.useState('')

    const [Enderecos, setEnderecos] = React.useState<Array<Endereco> | null>(null)

    
    const { formaPagamento } =  useLocalSearchParams<Props>();

    const {carrinho, setPedido, pedido} = React.useContext(ProductsContext)

    useEffect(()=>{
        listarCartoes();
        listarEnderecos();
        if(currentCard) setContextCartao('cadastrar')
        if(currentEndereco) setContextEndereco('cadastrar')

    },[])

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
        if(contextCartao === 'novo'){
            cadastrarCartao()
        }

        if(contextEndereco === 'novo'){
            cadastrarEndereco()
        }

        if(contextCartao === 'cadastrar'){
            selecionarCartao()
        }

        if(contextEndereco === 'cadastrar'){
            selecionarEndereco()
        }


        if(pedido){
            let finaliza: Pedido = {
                id: '',
                carrinho: pedido?.carrinho,
                endereco: Enderecos?.find(t => t.id == endereco),
                formaPagamento: pedido?.formaPagamento,
                status: 'enviando',
                valorTotal: pedido?.valorTotal,
                cartao: pedido?.formaPagamento === 'cartao' ?Cartoes?.find(t => t.id == cartao) : null,
            }
            pedido.endereco = Enderecos?.find(t => t.id == endereco)
            pedido.cartao = pedido?.formaPagamento === 'cartao' ?Cartoes?.find(t => t.id == cartao) : null
            pedido.status = 'enviando'

            if(currentUser?.id && pedido){
                firestore().collection('Users').doc(currentUser?.id).collection('Pedidos').add(finaliza).then((query) => {
                    console.log(query.id)
                    finaliza.id = query.id
                }).finally(()=>{
                    pedido.id = finaliza.id
                    console.log(pedido.id)
                    alert('Pedido realizado com sucesso')
                    const params = new URLSearchParams();
                    params.set('id', pedido.id.toString())
                    router.replace(`/status?${params.toString()}`)
                })
            }
        }
        
        

    }

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            display: 'spinner',
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const cadastrarCartao = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).collection('Cartoes').where('numero', '==', NumeroCartao).get().then(
                (snapShot) => {
                    if(snapShot.empty && currentUser?.id){
                        firestore().collection('Users').doc(currentUser?.id).collection('Cartoes').add({
                            name: Name,
                            CPF: CPF,
                            numero: NumeroCartao,
                            validade: date,
                            CVV: CVV
                        }).then((element) => {
                            console.log('Cartão cadastrado.')
                            setCartao(element.id)
                            setCard(Name)
                            if(currentUser?.id)firestore().collection('Users').doc(currentUser?.id).update({
                                cartao: element.id
                            })
                        })
                        listarCartoes()
                    } else {
                        return console.log('Cartão já existe.')
                    }
                }
            )   
        }
    }

    const selecionarCartao = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).update({
                cartao: cartao
            }).then(()=>{
                Cartoes?.forEach(item => {
                    if(item.id == cartao && item.name) setCard(item.name)
                })
                console.log('Cartão selecionado.')
            })
        }
    }

    const listarCartoes = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).get().then((item)=>{
                let idCartao = item.data()
                if(idCartao != undefined) setCartao(idCartao['cartao'])
            })
            firestore().collection('Users').doc(currentUser?.id).collection('Cartoes').get().then(
                (snapShot) => {
                    const lista = new Array<Cartao>()
                    snapShot.forEach(query => {
                        let validade = new Date(query.data()['validade'])
                        lista.push(
                            {
                                id: query.id,
                                name: query.data()['name'],
                                numero: query.data()['numero'],
                                CPF: query.data()['CPF'],
                                CVV: query.data()['CVV'],
                                validade: validade.toLocaleString('pt-BR').substring(3, 10),
                            }
                        )
                    })
                    setCartoes(lista)
                }
            )   
        }
    }

    const cadastrarEndereco = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).collection('Enderecos').where('numero', '==', NumeroEndereco).get().then(
                (snapShot) => {
                    if(snapShot.empty && currentUser?.id){
                        firestore().collection('Users').doc(currentUser?.id).collection('Enderecos').add({
                            CEP: CEP,
                            rua: Rua,
                            bairro: Bairro,
                            numero: NumeroEndereco,
                            complemento: Complemento
                        }).then((element) => {
                            console.log('Endereço cadastrado.')
                            setEnderecoView(element.id)
                            setEndereco(Rua)
                            if(currentUser?.id)firestore().collection('Users').doc(currentUser?.id).update({
                                endereco: element.id
                            })
                        })
                    } else {
                        return console.log('Endereço já existe.')
                    }
                    listarEnderecos()
                }
            )   
        }
    }

    const selecionarEndereco = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).update({
                endereco: endereco
            }).then(()=>{
                Enderecos?.forEach(item => {
                    if(item.id == endereco && item.rua) setEndereco(item.rua)
                })
                console.log('Endereço selecionado.')
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
                    {formaPagamento === 'cartao' &&
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
                                <ScrollView style={styles.scrollInput} nestedScrollEnabled={true}>
                                    <Text style={styles.label}>Nome do cartão:</Text>
                                    <TextInput
                                        placeholder="Digite o nome no seu cartão..."
                                        inputMode="text"
                                        onChangeText={t => {setName(t)}}
                                        style={[styles.input, { textTransform: 'uppercase' }]}
                                    />

                                    <Text style={styles.label}>CPF:</Text>
                                    <TextInput
                                        placeholder="Digite o seu CPF..."
                                        inputMode="numeric"
                                        onChangeText={t => {setCPF(t)}}
                                        style={styles.input}
                                    />

                                    <Text style={styles.label}>Número do cartão:</Text>
                                    <TextInput
                                        placeholder="Digite o número do seu cartão..."
                                        inputMode="text"
                                        onChangeText={t => {setNumeroCartao(t)}}
                                        style={styles.input}
                                    />


                                    <View style={styles.inputArea}>
                                        <Text style={styles.label}>Data de Validade:</Text>
                                        <Pressable onPress={showDatepicker} style={styles.inputArea}>
                                            <FontAwesome6 name='calendar-days' size={21} color={'#592C28'} />
                                            <Text style={styles.label}>{date.toLocaleString('pt-BR').substring(3, 10)}</Text>
                                        </Pressable>
                                    </View>
                                    <View style={styles.inputArea}>

                                        <Text style={styles.labelLine}>CVV:</Text>
                                        <TextInput
                                            placeholder="CVV..."
                                            inputMode="numeric"
                                            onChangeText={t => { setCVV(t) }}
                                            style={styles.inputSmall}
                                        />
                                    </View>
                                </ScrollView>
                            }

                            {contextCartao === 'cadastrar' &&
                                <ScrollView style={styles.scrollInput} nestedScrollEnabled={true}>
                                    <CardCadastroCartao options={Cartoes}
                                        checkedValue={cartao}
                                        onChange={setCartao}
                                    />
                                </ScrollView>
                            }

                        </View>
                    }


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
                                                onChangeText={t => {setCEP(t)}}
                                                onEndEditing={consultaCEP}
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
                                                onChangeText={t => {setNumeroEndereco(t)}}
                                                style={styles.inputSmallRow}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <Text style={styles.label}>Rua:</Text>
                                <TextInput 
                                    placeholder="Digite o nome no seu cartão..." 
                                    inputMode="text"
                                    onChangeText={t => {setRua(t)}}
                                    value={Rua}
                                    style={[styles.input, {textTransform: 'uppercase'}]}
                                />
                                
                                <Text style={styles.label}>Bairro:</Text>
                                <TextInput 
                                    placeholder="Digite o seu Bairro..." 
                                    inputMode="text"
                                    onChangeText={t => {setBairro(t)}}
                                    value={Bairro}
                                    style={styles.input}
                                />

                                <Text style={styles.label}>Complemento:</Text>
                                <TextInput 
                                    placeholder="Coloque informações complementares..." 
                                    inputMode="text"
                                    onChangeText={t => {setComplemento(t)}}
                                    style={styles.input}
                                />

                                
                            </ScrollView>
                        }
                       
                       {contextEndereco === 'cadastrar' &&
                        <ScrollView style={styles.scrollInput} nestedScrollEnabled = {true}>
                            <CardCadastroEndereco options={Enderecos} 
                            checkedValue={endereco}
                            onChange={setEnderecoView}
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
        gap: 10,
        marginBottom: 5,
        alignItems: 'center'
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

    labelLine: {
        color: '#592C28',
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'OswaldRegular',
        height: '100%',
        lineHeight: 40
    },
});