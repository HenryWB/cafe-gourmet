import { StyleSheet, View, Text, Image, StatusBar } from "react-native";

export const Nav = () => {
    return (
        <View style={styles.nav}>
            <View style={styles.buttonMenu}>
                <Image style={styles.icon} source={require('@/assets/images/favicon.png')}></Image>
            </View>
            <View style={styles.buttonPerfil}>
                <Image style={styles.icon} source={require('@/assets/images/react-logo.png')}></Image>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        height: 70,
        width: "100%",
        backgroundColor: '#A0796C',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttonMenu: {
        // backgroundColor: 'pink',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonPerfil: {
        // backgroundColor: 'red',
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }

});

export default Nav;
