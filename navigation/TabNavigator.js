import React, { useContext } from "react";
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Context from './userContext';

import { AcceuilStackNavigator, SwipeStackNavigator, MenuStackNavigator, ProfilStackNavigator, ConnexionStackNavigator } from "./StackNavigator";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const context = useContext(Context)

  if(context.utilisateurId == null){
    return (
      <Tab.Navigator>

        <Tab.Screen name="Connexion" component={ConnexionStackNavigator} options={{
            // hide the bottom tab bar on Product Screen
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}/>
  
      </Tab.Navigator>
    );
  }else{
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: () => {
  
            if (route.name === 'Acceuil') {
              return <Image style={{height: 40, width: 40, opacity: 0.6, marginTop: 10, marginBottom: 'auto'}} source={require('../Images/Acceuil.png')}/>;
            } 
            else if (route.name === 'Swipe') {
              return <Image style={{height: 40, width: 40, opacity: 0.6, marginTop: 10, marginBottom: 'auto'}} source={require('../Images/Swipe.png')}/>;
            }
            else if (route.name === 'Menu') {
              return <Image style={{height: 40, width: 40, opacity: 0.6, marginTop: 10, marginBottom: 'auto'}} source={require('../Images/Menu.png')}/>;
            }
            else if (route.name === 'Profil') {
              return <Image style={{height: 40, width: 40, marginTop: 10, marginBottom: 'auto', backgroundColor: '#ddd', borderRadius: 100}} source={{uri: context.utilisateurPhoto?context.utilisateurPhoto:"https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"}}/>;
            }
  
          },
          tabBarStyle: { borderTopLeftRadius: 19, borderTopRightRadius: 19, height: 60 },
          tabBarActiveTintColor: 'transparent',
          tabBarInactiveTintColor: 'transparent',
          tabBarHideOnKeyboard: true,
        })}>
  
  
                
        <Tab.Screen name="Acceuil" component={AcceuilStackNavigator} options={{ headerShown: false }}/>
        <Tab.Screen name="Swipe" component={SwipeStackNavigator} options={{ headerShown: false }}/>
        <Tab.Screen name="Menu" component={MenuStackNavigator} options={{ headerShown: false }}/>
        <Tab.Screen name="Profil" component={ProfilStackNavigator} options={{ headerShown: false }}/>
  
      </Tab.Navigator>
    );
  }
  
};

export default BottomTabNavigator;