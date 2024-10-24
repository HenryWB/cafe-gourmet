import { Cafe } from '@/types/cafe';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { ProductsContext } from '@/contexts/productsContext';


export type Props = {
  cafe: Cafe
};

export const CardCafe = (props: Props) => {
  const { carrinho, dispatchCarrinho } = React.useContext(ProductsContext)
  const [count, setCount] = React.useState<number>(0)
 
  useEffect(()=>{
    let i = carrinho.cafes.findIndex(item => item.id === props.cafe.id)
    if(i != -1) setCount(carrinho.cafes[i].quantidade)
    if(i == -1) setCount(0)

    if(carrinho.cafes.length == 0) setCount(0)

  },[carrinho.cafes.length])

  useFocusEffect(() => {
    let i = carrinho.cafes.findIndex(item => item.id === props.cafe.id)
    if(i != -1) setCount(carrinho.cafes[i].quantidade)
    if(i == -1) setCount(0)
  })

  const infos = () =>{
    router.navigate(`/infos/${props.cafe.id}` ) // será dinâmica
  }

  const heandleClickAdd = async () => {
    let i = carrinho.cafes.findIndex(i => i.id == props.cafe.id)

    await dispatchCarrinho({
      type: 'INCREASE',
      cafe: props.cafe,
      index: i,
    })
    console.log(carrinho.curentIndex)
    console.log(carrinho.cafes)
    console.log(carrinho.cafes.find(i => i.id == props.cafe.id))
    setCount(carrinho.cafes[carrinho.curentIndex].quantidade)
  }

  const heandleClickSub  = async () => {
    let i = carrinho.cafes.findIndex(i => i.id == props.cafe.id)

    await dispatchCarrinho({
      type: 'DECREASE',
      cafe: props.cafe,
      index: i,
    })
    if(carrinho.curentIndex != -1) setCount(carrinho.cafes[carrinho.curentIndex].quantidade)
    if(carrinho.curentIndex == -1) setCount(0)
  }

  return (
    <View style={styles.box}>
      <Image style={styles.img} source={{uri: props.cafe.img}}/>
      

      <View style={styles.info}>
        <View style={styles.textArea}>
          <View style={styles.texts}>
            <Text style={styles.title}>{props.cafe.titulo}</Text>
            <Text style={styles.desc}>{props.cafe.desc}</Text>
          </View>
          

          <Text style={styles.attr}>R$ {props.cafe.preco} | {props.cafe.gramas} g</Text>

        </View>

        <View style={styles.interactive}>
          <Pressable style={styles.infoProduct} onPress={infos}>
            <Text style={styles.textInfo}>i</Text>
          </Pressable>
          
          {count == 0 &&
            <Pressable style={styles.add} onPress={heandleClickAdd}>
              <Text style={styles.addText}>+</Text>
            </Pressable>
          }
          
          {count != 0 && 
            <View style={styles.countArea}>
              <Pressable style={styles.subtSomaArea} onPress={heandleClickSub}>
              <Text style={styles.subtSomaText}>–</Text>
              </Pressable>

              <Text style={styles.count}>{count}</Text>

              <Pressable style={styles.subtSomaArea} onPress={heandleClickAdd}>
              <Text style={styles.subtSomaText}>+</Text>
              </Pressable>
            </View>
          }
    
          
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 300,
    height: 350,
    marginHorizontal: 'auto',
    marginTop: 10,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderWidth: 1,
    backgroundColor: '#592C28',
    marginBottom: 25,
    padding: 10,
    paddingBottom: 15,
    gap: 15,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  img: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 25,
  },

  info: {
    flexDirection: 'row',
    width: '100%',
    height: 75,
    paddingHorizontal: 10,
    alignItems: 'center',
    flex: 1,
  },

  textArea:{
    flex: 2,
    height: '100%',
    justifyContent: 'space-between',
  },
  

  texts: {
    flex: 0,
    width: '100%',
  },

  title: {
    fontFamily: 'OswaldMedium',
    fontSize: 18,
    color: 'white',
  },

  desc: {
    fontFamily: 'OswaldLight',
    width: '100%',
    fontSize: 14,
    color: 'white',
  },

  attr: {
    width: '100%',
    fontSize: 14,
    color: 'white',
    fontFamily: 'OswaldLight',
  },  

  interactive: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },

  infoProduct: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInfo:{
    fontFamily: 'OswaldMedium',
    fontSize: 18,
    color: 'white',
  },

  add: {
    backgroundColor: 'white',
    height: 45,
    width: 75,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  addText: {
    color: '#592C28',
    fontSize: 28,
    fontWeight: 'bold',
  },

  countArea:{
    flexDirection: 'row',
    gap: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  count:{
    color: 'white',
    fontSize: 18,
    fontFamily: 'OswaldRegular',
  },

  subtSomaArea:{
    backgroundColor: 'white',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtSomaText:{
    color: '#592C28',
    fontSize: 10
  },
  
});

export default CardCafe;
