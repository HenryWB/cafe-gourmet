import CardCadastroCartao from "@/components/card-cadastros-cartao";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, ScrollView, View, TextInput } from "react-native";
import firestore from "@react-native-firebase/firestore"
import { FirebaseContext } from "@/contexts/FirebaseContext";
import { ButtonPadrao } from "@/components/button";
import { Cartao } from "@/types/cartao";

//alterar nome para  setPayment
export default function ScreenCards() {
    const {currentUser, setCard, currentCard} = React.useContext(FirebaseContext)
    const [contextCartao, setContextCartao] = React.useState('novo');
    const [cartao, setCartao] = React.useState('');

    const [Name, setName] = React.useState('')
    const [CPF, setCPF] = React.useState('')
    const [Numero, setNumero] = React.useState('')
    const [date, setDate] = React.useState(new Date());
    const [CVV, setCVV] = React.useState('')

    const [Cartoes, setCartoes] = React.useState<Array<Cartao> | null>(null)

    useEffect(()=>{
        listarCartoes();
        if(currentCard) setContextCartao('cadastrar')
    },[])

    const pressContextCartaoNovo = () => {
        setContextCartao('novo')
    }

    const pressContextCartaoCadastrar = () => {
        setContextCartao('cadastrar')
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

    const cadastrar = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).collection('Cartoes').where('numero', '==', Numero).get().then(
                (snapShot) => {
                    if(snapShot.empty && currentUser?.id){
                        firestore().collection('Users').doc(currentUser?.id).collection('Cartoes').add({
                            name: Name,
                            CPF: CPF,
                            numero: Numero,
                            validade: date,
                            CVV: CVV
                        }).then((element) => {
                            alert('Cartão cadastrado.')
                            setCartao(element.id)
                            setCard(Name)
                            if(currentUser?.id)firestore().collection('Users').doc(currentUser?.id).update({
                                cartao: element.id
                            })
                        })
                        listarCartoes()
                    } else {
                        return alert('Cartão já existe.')
                    }
                }
            )   
        }
    }

    const selecionar = () => {
        if(currentUser?.id){
            firestore().collection('Users').doc(currentUser?.id).update({
                cartao: cartao
            }).then(()=>{
                Cartoes?.forEach(item => {
                    if(item.id == cartao && item.name) setCard(item.name)
                })
                alert('Cartão selecionado.')
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

    return (

        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: 'Cartões',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />

            <Text style={styles.h1}>Cadastro e Seleção</Text>
            <Text style={styles.text}>Cadastre um novo cartão ou selecione um já existente.</Text>

            <View style={styles.configArea}>
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
                        <>
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
                                onChangeText={t => {setNumero(t)}}
                                style={styles.input}
                            />

                            <View style={styles.inputArea}>                              
                                <Text style={styles.label}>Data de Validade:</Text>
                                <Pressable onPress={showDatepicker} style={styles.inputArea}>
                                    <FontAwesome6 name='calendar-days' size={21} color={'#592C28'}/>
                                    <Text style={styles.label}>{date.toLocaleString('pt-BR').substring(3, 10)}</Text>
                                </Pressable>
                            </View>

                            <View style={styles.inputArea}>
                                <Text style={styles.labelLine}>CVV:</Text>
                                <TextInput
                                    placeholder="CVV..."
                                    inputMode="numeric"
                                    onChangeText={t => {setCVV(t)}}
                                    style={styles.inputSmall}
                                />
                            </View>
                        </ScrollView>
                       <ButtonPadrao height={50} onPress={cadastrar} width={150} title="Cadastrar" marginTop={15}/>
                       </>
                    }

                    {contextCartao === 'cadastrar' &&
                        <>
                            <ScrollView style={styles.scrollInput} nestedScrollEnabled={true}>
                                <CardCadastroCartao options={Cartoes}
                                    checkedValue={cartao}
                                    onChange={setCartao}
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
        height: 325,
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