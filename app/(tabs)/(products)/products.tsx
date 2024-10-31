import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, StatusBar, Pressable, Text } from 'react-native';
import { CardCafe } from '@/components/card-cafe';
import { Cafe } from "@/types/cafe";
import { router, Stack, Tabs } from 'expo-router';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { ProductsContext } from '@/contexts/productsContext';

export default function ScreenProducts() {
  const productsContext = useContext(ProductsContext)


  const bag = () => {
    router.navigate('/(bag)/carrinho')
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content'/>
      <Tabs.Screen options={{
          title: 'Grãos de Café',
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: {backgroundColor: '#592C28'},
          headerTintColor: 'white',
          headerTitleStyle: {fontFamily: 'OswaldMedium', fontSize: 24},
          headerRight: ({tintColor}) => 
            <Pressable style={styles.carrinho} onPress={bag}>
              <FontAwesome6 name='bag-shopping' size={28} color={tintColor} style={styles.carrinhoIcon}/>
              <Text style={styles.carrinhoText}>{productsContext.carrinho.cafes.length > 0 ? productsContext.carrinho.cafes.length.toString() : '0'}</Text>
            </Pressable>,
        }}/>
        <Stack.Screen
          options={{
            navigationBarColor: '#592C28',
          }}
        />


      <View style={styles.content}>
        <FlatList
          data={productsContext.products}
          renderItem={({item}: {item: Cafe}) => (
          <CardCafe cafe={item} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8DF'
  },

  content:{
    flex: 1,
    height: '100%'
  },

  carrinho:{
    justifyContent: 'center',
    alignItems: 'center'
  },

  carrinhoIcon:{
  },

  carrinhoText:{
    marginTop: -21,
    color: '#592C28',
    fontFamily: 'OswaldRegular',
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 14
  },
});
