import { router } from "expo-router";
import React from "react";
import { StyleSheet, SafeAreaView, Text, Pressable } from "react-native";

//alterar nome para  setPayment
export default function ScreenPaymant() {
    function profile() {
        router.navigate('/profile');
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text>Essa é a Tela de Formas de Pagamento</Text>

            <Pressable style={styles.button} onPress={profile}>
                <Text style={styles.buttonText}>Perfil</Text>
            </Pressable>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        width: 100,
        height: 50,
        borderRadius: 10,
        textTransform: 'capitalize',
        backgroundColor: '#acd000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});