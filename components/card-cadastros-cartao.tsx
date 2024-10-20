import { Cartao } from "@/types/cartao";
import { Endereco } from "@/types/endereco";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native"

type Props = {
    options: Array<Cartao> | null,
    checkedValue: string,
    onChange: (Dispatch<SetStateAction<string>>)
}


export const CardCadastroCartao = (props: Props) => {
    return(
        <View style={styles.view}>
            {
                props.options == null || props.options.length == 0 ? <Text style={styles.title}>Não há item cadastrado!</Text> :
                props.options.map((option)=>{
                    console.log('Esse é o id: ' + props.checkedValue)    

                let active =  props.checkedValue == option.id 
                return(
                    <Pressable 
                        style={styles.container}
                        onPress={()=>{props.onChange(option.id)}}
                        key={option.id}
                    >
                        <View style={styles.check}>
                            <MaterialIcons color='#592C28' name={active ? 'radio-button-checked' : 'radio-button-unchecked'} size={32} />
                        </View>

                        <View style={styles.areaMiddle}>
                            <Text style={styles.title}>{option.name}</Text>

                            <View style={styles.textArea}>
                                <Text style={styles.label}>Nome: </Text>
                                <Text style={styles.text}>{option.name}</Text>
                            </View>

                            <View style={styles.textArea}>
                                <Text style={styles.label}>Número: </Text>
                                <Text style={styles.text}>{option.numero}</Text>
                            </View>

                            <View style={styles.textArea}>
                                <Text style={styles.label}>CPF: </Text>
                                <Text style={styles.text}>{option.CPF}</Text>
                            </View>
                        </View>

                        <View style={styles.areaEnd}>
                            <View style={styles.textArea}>
                                <Text style={styles.label}>CVV: </Text>
                                <Text style={styles.text}>{option.CVV}</Text>
                            </View>

                            <View style={styles.textArea}>
                                <Text style={styles.label}>Validade: </Text>
                                <Text style={styles.text}>{option.validade}</Text>
                            </View>

                        </View>

                    </Pressable>
                )
            })

            }
        </View>
        

        
    )
}

export const styles = StyleSheet.create({
    view:{
        width: '100%',
        height: '100%',
    },

    container:{
        width: '100%',
        height: 100,
        borderColor: '#592C28',
        borderRadius: 10,
        borderWidth: 3,
        flexDirection: 'row',
        padding: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
    },

    check:{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    areaMiddle:{
        width: 160,
        height: '100%',
        justifyContent: 'space-between',
        resizeMode: 'cover',
    },

    areaEnd:{
        width: 100,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    textArea:{
        flexDirection: 'row',
    },

    title:{
        fontFamily: 'OswaldMedium',
        fontSize: 14,
        color: '#592C28',
    },

    label:{
        fontFamily: 'OswaldRegular',
        fontSize: 12,
        color: '#592C28',
    },

    text:{
        fontFamily: 'OswaldLight',
        fontSize: 12,
        color: '#592C28',
    }

});

export default CardCadastroCartao;