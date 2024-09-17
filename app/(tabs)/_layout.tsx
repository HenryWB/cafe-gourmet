import { Tabs } from 'expo-router';
import React from 'react';

import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';


export default function TabLayout() {

  return (
    
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F2E8DF',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {backgroundColor: '#592C28'},
        tabBarLabelStyle: { fontFamily: 'OswaldMedium'},
      }}>

      <Tabs.Screen
        name="(products)"
        options={{
          title: 'Grãos de Café',
          tabBarIcon: ({ color }) => <FontAwesome name='coffee' size={21} color={color} />,
          
        }}
      />

      <Tabs.Screen
        name="(bag)"
        options={{
          title: 'Pedido',
          tabBarIcon: (props) => <FontAwesome6 name='list-check' size={21} color={props.color}  />,
        }}
      />

      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome name='user-circle' size={21} color={color} />
        }}
      />
      
    </Tabs>
  )
}