import { ButtonPadrao } from "@/components/button";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, View, TextInput, Button } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { FontAwesome6 } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"
import { FirebaseContext } from "@/contexts/FirebaseContext";
import { User } from "@/types/user";
import { Endereco } from "@/types/endereco";
import { Cartao } from "@/types/cartao";
    

export default function ScreenSetProfile() {
    const [Email, setEmail] = React.useState<string>('')
    const [Name, setName] = React.useState<string>('')
    const [Tel, setTel] = React.useState<string>('')
    const [date, setDate] = React.useState(new Date());
    const { currentUser, setUser } = React.useContext(FirebaseContext)
    
    useEffect(() => {
        if(currentUser?.email) setEmail(currentUser?.email)
        if(currentUser?.name) setName(currentUser.name)
        if(currentUser?.tel) setTel(currentUser.tel)
        
        if(currentUser?.nascimento){
            let m = currentUser?.nascimento.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (!m) throw new Error('Deve estar no formato dd/mm/aaaa');
            
            let newData = m.slice(1, 4).map(v => parseInt(v));
            setDate(new Date(newData[2], newData[1] - 1, newData[0]))
        }
    }, [])
    
    function profile() {
        router.navigate('/profile');
    }


    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        // console.log(currentDate.toLocaleString('pt-BR').substr(0, 10))
        setDate(currentDate);
    };

    const showMode = (currentMode: any) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
            display: 'spinner',

        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const updateProfile = async () => {
        if(currentUser?.id != null) {
            const newUser = {
                id: currentUser?.id,
                name: Name,
                email: Email,
                nascimento: date.toLocaleString('pt-BR').substring(0, 10),
                tel: Tel,
                tipo: currentUser.tipo
            }
            await auth().currentUser?.updateProfile({displayName: Name,})
            await auth().currentUser?.updateEmail(Email)
            firestore().collection('Users').doc(currentUser?.id).update({
                email: Email,
                name: Name,
                nascimento: date.toLocaleString('pt-BR').substring(0, 10),
                tel: Tel
            }).then(() => {
                setUser(newUser)
            }).then(() => {
                alert('Dados de perfil atualizado.')
                profile()
            })
        }
        
    }


    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: 'Editar Perfil',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />
            

            <View style={styles.content}>
                <Text style={styles.title}>Atualize suas informações</Text>

                <Text style={styles.label}>E-mail:</Text>
                <TextInput
                    style={styles.inputStyle}
                    inputMode='email'
                    placeholder='Digite seu e-mail...'
                    value={Email}
                    onChangeText={t => setEmail(t)}
                />

                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.inputStyle}
                    inputMode='text'
                    placeholder='Digite seu nome...'
                    value={Name}
                    onChangeText={t => setName(t)}
                />

                <Text style={styles.label}>Telefone:</Text>
                <TextInput style={styles.inputStyle}
                    inputMode='numeric'
                    secureTextEntry={false}
                    placeholder='Digite sua telefone com DDD...'
                    value={Tel}
                    onChangeText={t => setTel(t)}
                />

                <Text style={styles.label}>Data de Nascimento:</Text>
                <Pressable onPress={showDatepicker} style={styles.data}>
                    <FontAwesome6 name='calendar-days' size={21} color={'#592C28'}/>
                    <Text style={styles.dataText}>{date.toLocaleString('pt-BR').substring(0, 10)}</Text>
                </Pressable>
                
                
                <ButtonPadrao
                    onPress={updateProfile}
                    title="Atualizar"
                    marginTop={15}
                    width={125}
                    height={50}
                />
            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E8DF',
        alignItems:'center'
    },

    content: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        marginVertical: 10,
        fontFamily: 'OswaldRegular',
        color: '#592C28',
        width: '100%',
    },

    label: {
        marginTop: 10,
        color: '#592C28',
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'OswaldRegular',
    },

    inputStyle: {
        width: '100%',
        padding: 5,
        fontSize: 16,
        backgroundColor: "transparent",
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 10,
        fontFamily: 'OswaldLight',
        borderColor: '#592C28',
    },

    login: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginTop: 5,
    },

    textLogin: {
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        color: '#592C28'
    },

    data: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        marginTop: 5
    },
    
    dataText: {
        fontFamily: 'OswaldLight',
        color: '#592C28'
    }
});