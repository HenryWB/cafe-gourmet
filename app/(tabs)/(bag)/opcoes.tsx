import { router, Stack } from "expo-router";
import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";

export default function ScreenOptions(){

    const routeCarrinho = () => {
        router.navigate('/(bag)/carrinho')
    }

    const routePedidos = () => {
        router.navigate('/(bag)/pedidos')
    }

    return (
        <SafeAreaView style={styles.contener}>
            <Stack.Screen options={{
                title: 'Opções',
                headerShown: true,
                headerStyle: { backgroundColor: '#592C28' },
                headerTitleStyle: { color: 'white', fontFamily: 'OswaldMedium', fontSize: 28 },
                headerTintColor: '#F2E8DF',
            }} />

            <View style={styles.content}>
                <Pressable style={styles.opcoes} onPress={routeCarrinho}>
                    <Text style={styles.opcoesText}>Carrinho</Text>
                </Pressable>
                <Pressable style={styles.opcoes} onPress={routePedidos}>
                    <Text style={styles.opcoesText}>Pedidos</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contener: {
        backgroundColor: '#F2E8DF',
        flex: 1
    },
    content:{
        width: '95%',
        marginHorizontal: 'auto',
        marginTop: 10
    },
    opcoes: {
        marginBottom: 10,
        borderColor: '#592C28',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        padding: 5
    },

    opcoesText: {
        fontFamily: 'OswaldMedium',
        color: '#592C28',
        fontSize: 16
    }
})