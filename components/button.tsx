import { Href, router } from "expo-router";
import { Text, Pressable, StyleSheet, Button } from "react-native";

export type Props = {
    title: string,
    onPress: () => void,
    width: number,
    height: number,
    marginTop: number,
}

export const ButtonPadrao = (props: Props) => {

    return (
        <Pressable style={[styles.button, { width: props.width, height: props.height, marginTop: props.marginTop}]} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
        borderBlockColor: '#592C28',
        borderWidth: 2
    },

    buttonText: {
        fontFamily: 'OswaldMedium',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#592C28'
    }
});

export default Button;
