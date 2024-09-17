import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native"

type Props = {
    options: Array<{title: string, label_1: string, text_1: string, label_2: string, text_2: string, label_3: string, text_3: string, label_4: string, text_4: string, label_5: string, text_5: string, id: string}>,
    checkedValue: string,
    onChange: Dispatch<SetStateAction<string>>
}


export const CardCadastro = (props: Props) => {
    return(
        <View style={styles.view}>
            { props.options.map((option)=>{
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
                            <Text style={styles.title}>{option.title}</Text>
                            <View style={styles.textArea}>
                                <Text style={styles.label}>{option.label_1}: </Text>
                                <Text style={styles.text}>{option.text_1}</Text>
                            </View>

                            <View style={styles.textArea}>
                                <Text style={styles.label}>{option.label_2}: </Text>
                                <Text style={styles.text}>{option.text_2}</Text>
                            </View>

                            <View style={styles.textArea}>
                                <Text style={styles.label}>{option.label_3}: </Text>
                                <Text style={styles.text}>{option.text_3}</Text>
                            </View>
                        </View>

                        <View style={styles.areaEnd}>
                            <View style={styles.textArea}>
                                <Text style={styles.label}>{option.label_4}: </Text>
                                <Text style={styles.text}>{option.text_4}</Text>
                            </View>

                            <View style={styles.textArea}>
                                <Text style={styles.label}>{option.label_5}: </Text>
                                <Text style={styles.text}>{option.text_5}</Text>
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
        width: 140,
        height: '100%',
        justifyContent: 'space-between',
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

export default CardCadastro;