import { router, Stack } from "expo-router";
import React from "react";
import { StyleSheet, SafeAreaView, Text, Pressable, View, Image } from "react-native";


export default function ScreenProfile() {
    function paymant() {
        router.navigate('/paymant');
    }
    function setProfile() {
        router.navigate('/setProfile');
    }

    return (
        <SafeAreaView style={styles.container}>

            <Stack.Screen options={{
                title: 'Perfil',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />

            <View style={styles.header}>
                <View style={styles.linha}></View>
                <Image style={styles.image} source={{ uri: 'https://i.pinimg.com/564x/07/87/fd/0787fd03b81df366c9052a24fba17700.jpg' }} />
            </View>


            <View style={styles.content}>
                <Text style={styles.h1}>Fulano</Text>
                <Text style={styles.h2}>E-mail:</Text>

                <View style={styles.infosPersonal}>
                    <Text style={styles.h3}>Informações Pessoais:</Text>
                    <View style={styles.contentInfos}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.text}>Fulano de Tal</Text>
                    </View>

                    <View style={styles.contentInfos}>
                        <Text style={styles.label}>Celular: </Text>
                        <Text style={styles.text}>(11) 993574815</Text>
                    </View>

                    <View style={styles.contentInfos}>
                        <Text style={styles.label}>Data de Nascimento: </Text>
                        <Text style={styles.text}>27/05/1999</Text>
                    </View>
                </View>

                <View style={styles.infosPayment}>
                    <Text style={styles.h3}>Pagamento e Endereço:</Text>
                    <Pressable style={styles.contentInfosPress}>
                        <Text style={styles.label}>Trocar cartão:</Text>
                        <Text style={styles.text}>Cartão 1</Text>
                    </Pressable>

                    <Pressable style={styles.contentInfosPress}>
                        <Text style={styles.label}>Trocar Endereço:</Text>
                        <Text style={styles.text}>Endereço 1</Text>
                    </Pressable>
                </View>

                <View style={styles.infosSecurity}>
                    <Text style={styles.h3}>Segurança:</Text>
                    <Pressable style={styles.contentInfosPress}>
                        <Text style={styles.label}>Trocar senha</Text>
                    </Pressable>

                    <Pressable style={styles.contentInfosPress}>
                        <Text style={styles.label}>Deletar conta</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.contentButton}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </Pressable>

                <Pressable style={styles.buttonDark}>
                    <Text style={styles.buttonTextDark}>Deslogar</Text>
                </Pressable>
            </View>

            


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E8DF',
        justifyContent: 'space-between',
    },

    header: {
        marginTop: 85,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'cover',
        marginTop: -70
    },

    linha: {
        borderTopWidth: 2,
        borderColor: '#592C28',
        width: '100%',
    },

    content: {
        width: '95%',
        padding: 5,
        marginTop: 5,
        marginHorizontal: 'auto',
    },

    contentButton: {
        width: '95%',
        padding: 15,
        marginTop: 5,
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    h1: {
        fontFamily: 'OswaldMedium',
        fontSize: 24,
        textAlign: 'center',
        color: '#592C28',

    },

    h2: {
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        textAlign: 'center',
        color: '#592C28',
    },

    h3: {
        fontFamily: 'OswaldMedium',
        fontSize: 21,
        color: '#592C28',
    },

    label: {
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        textAlign: 'center',
        color: '#592C28',
    },

    text: {
        fontFamily: 'OswaldLight',
        fontSize: 16,
        textAlign: 'center',
        color: '#592C28',
    },

    contentInfos: {
        flexDirection: 'row',
    },

    contentInfosPress:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    infosPersonal: {
        width: '95%',
        marginHorizontal: 'auto',
        borderBottomColor: '#592C28',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingBottom: 10,
        gap: 5,
    },

    infosPayment: {
        width: '95%',
        marginHorizontal: 'auto',
        borderBottomColor: '#592C28',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingBottom: 10,
        gap: 5,
    },

    infosSecurity: {
        width: '95%',
        marginHorizontal: 'auto',
        marginBottom: 10,
        paddingBottom: 10,
        gap: 5,
    },

    button:{
        borderWidth: 3,
        borderColor: '#592C28',
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },

    buttonText:{
        fontFamily: 'OswaldRegular',
        fontSize: 16,
        textAlign: 'center',
    },

    buttonDark:{
        backgroundColor: '#592C28',
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },

    buttonTextDark:{
        fontFamily: 'OswaldRegular',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },

});