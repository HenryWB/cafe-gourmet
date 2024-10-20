import React, { useCallback, useEffect } from "react";
import { Pressable, View, Text,  StyleSheet, ColorValue } from "react-native";
import { ProductsContext } from '@/contexts/productsContext';
import { getProductById } from "@/services/cafe";
import { useFocusEffect } from "expo-router";


export type Props = {
    color: string
    colorText: string
    id: string
}

export const ButtonAmount = (props: Props) => {
    const product = getProductById(props.id.toString())
    const { carrinho, dispatchCarrinho } = React.useContext(ProductsContext)
    const [count, setCount] = React.useState<number>(0)

    if(!product) return <Text>Erro</Text>

    useEffect(()=>{
      let i = carrinho.cafes.findIndex(item => item.id === product.id)
      if(i != -1) setCount(carrinho.cafes[i].quantidade)
      if(i == -1) setCount(0)


      console.log('não altera esse')
    },[carrinho.cafes.length])

    useFocusEffect(()=>{
      let i = carrinho.cafes.findIndex(item => item.id === product.id)
      if(i != -1) setCount(carrinho.cafes[i].quantidade)
      if(i == -1) setCount(0)
    })

    const soma = async () => {
      let i = carrinho.cafes.findIndex(i => i.id == product.id)
  
      await dispatchCarrinho({
        type: 'INCREASE',
        cafe: product,
        index: i,
      })
      console.log(carrinho.curentIndex)
      console.log(carrinho.cafes)
      console.log(carrinho.cafes.find(i => i.id == product.id))
      setCount(carrinho.cafes[carrinho.curentIndex].quantidade)
    }
    
      const subt = async () => {
        let i = carrinho.cafes.findIndex(i => i.id == product.id)
    
        await dispatchCarrinho({
          type: 'DECREASE',
          cafe: product,
          index: i,
        })
        if(carrinho.curentIndex != -1) setCount(carrinho.cafes[carrinho.curentIndex].quantidade)
        if(carrinho.curentIndex == -1) setCount(0)
      }

    return(
        <View style={styles.countArea}>
            <Pressable style={[styles.subtSomaArea, {backgroundColor: props.color}] }  onPress={subt}>
                <Text style={[styles.subtSomaText, {color: props.colorText}]}>–</Text>
            </Pressable>
            <Text style={[styles.count, {color: props.color}]}>{ count.toString() }</Text>

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
