import React from "react";
import { Pressable, View, Text,  StyleSheet, ColorValue } from "react-native";

export type Props = {
    color: string
    colorText: string
}

export const ButtonAmount = (props: Props) => {
    const [count, onChangeCount] = React.useState(0);

    const soma = () => {
        if (count < 999) {
            onChangeCount(count + 1)
        }
    }

    const subt = () => {
        if (count > 0) {
            onChangeCount(count - 1)
        }
    }

    return(
        <View style={styles.countArea}>
            <Pressable style={[styles.subtSomaArea, {backgroundColor: props.color}] }  onPress={subt}>
                <Text style={[styles.subtSomaText, {color: props.colorText}]}>–</Text>
            </Pressable>

            <Text style={[styles.count, {color: props.color}] }>{count}</Text>

            <Pressable style={[styles.subtSomaArea, {backgroundColor: props.color}] } onPress={soma}>
                <Text style={[styles.subtSomaText, {color: props.colorText}]}>+</Text>
            </Pressable>
        </View>
    );
}

export const styles = StyleSheet.create({
    countArea:{
        flexDirection: 'row',
        gap: 20,
        width: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    count: {
        color: '#592C28',
        fontSize: 18,
        fontFamily: 'OswaldRegular',
    },

    subtSomaArea: {
        backgroundColor: '#592C28',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    subtSomaText: {
        color: 'white',
        fontSize: 10
    },
});

export default ButtonAmount;
