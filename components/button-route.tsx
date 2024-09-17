import { Href, router } from "expo-router";
import { Text, Pressable, StyleSheet } from "react-native";

export type Props = {
    title: string,
    route: Href,
    methodRout: string,
    width: number,
}

export const ButtonRoute = (props: Props) => {
    const route = () => {
        if (props.methodRout === 'navigate') { 
            router.navigate(props.route) 
        }
        else if (props.methodRout === 'push') { 
            router.push(props.route) 
        }
        else if (props.methodRout === 'replace') { 
            router.replace(props.route) 
        } else {
            router.navigate(props.route) 
        }
    }

    return (
        <Pressable style={[styles.button, { width: props.width }]} onPress={route}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
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

export default ButtonRoute;

