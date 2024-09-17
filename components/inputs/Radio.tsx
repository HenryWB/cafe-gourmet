import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

type Props = {
    options: Array<{label: string, value: string}>,
    checkedValue: string,
    onChange: Dispatch<SetStateAction<string>>
}

export const Radio = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.options.map((option) => {
                let active = props.checkedValue == option.value

                return (
                <Pressable 
                    style={styles.areaTouch}
                    onPress={() => { props.onChange(option.value) }}
                    key={option.value}>

                    <MaterialIcons color='#592C28' name={active ? 'radio-button-checked' : 'radio-button-unchecked'} size={21}/>

                    <Text style={styles.textLabel}>{option.label}</Text>
                </Pressable>)
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 25,
        height: 30,
    },

    areaTouch:{
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
    },
     
    textLabel:{
        fontFamily: 'OswaldLight',
        fontSize: 18,
        color: '#592C28',
        marginLeft: 5,
    },

});

export default Radio