import { Text, StyleSheet } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export type LoginProps = {
    name?: string;
}

export const Login = (props: LoginProps) => {
   return ( 
    <Text style={style.texto}> Olá, {props.name} de tal</Text>  
    );
}

export const style = StyleSheet.create({
    texto: {
        color: 'blue',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center",
    },
});

export default Login;
