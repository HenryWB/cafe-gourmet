import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import { ButtonAmount } from './button-amount';
import { router } from 'expo-router';
import { Cafe } from '@/.expo/types/cafe';

type Props = {
    cafe: Cafe,
}

export const CardPedido = (props: Props) => {

    const handleClick = () => {
        router.push(`/infos/${props.cafe.id}`)
    }


    return (
        <View style={styles.container}>
            
            <Image style={styles.img} source={{uri: props.cafe.img}}/>
            <View style={styles.infoArea}>
                <View>
                    <View style={styles.header}>
                    <Text style={styles.h1}>{props.cafe.titulo}</Text>
                    <Text style={styles.price}>R$ {props.cafe.preco}</Text>
                    </View>
                    <Text style={styles.desc}>{props.cafe.desc}</Text>
                </View>

                <View style={styles.foot}>
                <Pressable onPress={handleClick}>
                    <Text style={styles.saibaMais}>Saiba Mais</Text>
                </Pressable>
                <ButtonAmount color='white' colorText='#592C28'/>

                </View>
                
            </View>

            
            <Pressable style={styles.remove}>
                <Text style={styles.removeText}>X</Text>
            </Pressable>

            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 140,
        backgroundColor: '#592C28',
        marginHorizontal: 'auto',
        marginTop: 15,
        borderRadius: 20,
        padding: 15,
        justifyContent: 'space-between',

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        flexDirection: 'row',
        gap: 10,
    },

    img:{
        width: 110,
        height: 110,
        resizeMode: 'cover',
        borderRadius: 20,
        marginVertical: 'auto',
    },

    infoArea:{
        justifyContent: 'space-between',
        flex: 1,
    },

    h1:{
        fontFamily: 'OswaldMedium',
        fontSize: 18,
        color: 'white',
        maxWidth: 125,
        maxHeight: 35,
    },

    desc:{
        color: 'white',
        fontFamily: 'OswaldLight',
        fontSize: 14,
        maxHeight: 45,
    },

    saibaMais:{
        color: 'white',
        textDecorationLine: 'underline',
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    price:{
        fontFamily: 'OswaldMedium',
        fontSize: 14,
        color: 'white',
        textAlign: 'right',
    },

    foot:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    remove:{
        width: 25,
        height: 25,
        backgroundColor: '#8C5042',
        borderRadius: 12.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -10 ,
        left: 330,
        paddingBottom: 2
    },
    
    removeText:{
        color: 'white',
        fontFamily: 'OswaldRegular',
        textAlign: 'center'
    }
})

export default CardPedido;
