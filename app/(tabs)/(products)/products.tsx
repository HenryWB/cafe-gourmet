import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, StatusBar, Pressable } from 'react-native';
import { CardCafe } from '@/components/card-cafe';
import { Cafe } from "@/.expo/types/cafe";
import { Stack, Tabs } from 'expo-router';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { getAllProducts } from '@/services/cafe';

export default function ScreenProducts() {
  const products =  getAllProducts();

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
          headerRight: ({tintColor}) => <Pressable><FontAwesome6 name='bag-shopping' size={28} color={tintColor}/></Pressable>,
        }}/>
        <Stack.Screen
          options={{
            navigationBarColor: '#592C28',
          }}
        />


      <View style={styles.content}>
        <FlatList
          data={products}
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
});
