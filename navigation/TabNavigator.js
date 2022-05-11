import React, { useContext } from "react";
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Context from './userContext';

import { AcceuilStackNavigator, IntroStackNavigator, SwipeStackNavigator, MenuStackNavigator, ProfilStackNavigator, ConnexionStackNavigator } from "./StackNavigator";
import globalStyles from "../Styles/globalStyles";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const context = useContext(Context)

  //if(context.intro == null) {
    if(true) {
    return (
      <Tab.Navigator>

        <Tab.Screen name="Intro" component={IntroStackNavigator} options={{
            // hide the bottom tab bar on Product Screen
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}/>
  
      </Tab.Navigator>
    );
  }else {
    if(context.utilisateurId == null || context.utilisateurId == false || context.utilisateurId == false){
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
        <Tab.Navigator screenOptions={({ route }) => {
          return ({
            tabBarIcon: ({ focused }) => {
    
              if (route.name === 'Acceuil') {
                return <View style={{borderTopWidth: 3, width: '75%', borderColor: focused?'#FEA52A':'transparent'}}><Image style={[globalStyles.center, {height: 40, borderTopWidth: 2, borderColor: 'orange', width: 40, opacity: 0.6, marginTop: 10, marginBottom: 'auto'}]} source={require('../Images/Acceuil.png')}/></View>;
              } 
              else if (route.name === 'Swipe') {
                return <View style={{borderTopWidth: 3, width: '75%', borderColor: focused?'#FEA52A':'transparent'}}><Image style={[globalStyles.center, {height: 40, width: 40, opacity: 0.6, marginTop: 10, marginBottom: 'auto'}]} source={require('../Images/Swipe.png')}/></View>;
              }
              else if (route.name === 'Menu') {
                return <View style={{borderTopWidth: 3, width: '75%', borderColor: focused?'#FEA52A':'transparent'}}><Image style={[globalStyles.center, {height: 40, width: 40, opacity: 0.6, marginTop: 10, marginBottom: 'auto'}]} source={require('../Images/CompatibiliteIcone.png')}/></View>;
              }
              else if (route.name === 'Profil') {
                return <View style={{borderTopWidth: 3, width: '75%', borderColor: focused?'#FEA52A':'transparent'}}><Image style={[globalStyles.center, {height: 40, width: 40, marginTop: 10, marginBottom: 'auto', backgroundColor: '#ddd', borderRadius: 100}]} source={{uri: context.utilisateurPhoto?context.utilisateurPhoto:"https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png"}}/></View>;
              }
    
            },
            tabBarStyle: { borderTopLeftRadius: 19, borderTopRightRadius: 19, height: 60 },
            tabBarActiveTintColor: 'transparent',
            tabBarInactiveTintColor: 'transparent',
            tabBarHideOnKeyboard: true,
          })}}>
    
    
                  
          <Tab.Screen name="Acceuil" component={AcceuilStackNavigator} options={{ headerShown: false }}/>
          <Tab.Screen name="Swipe" component={SwipeStackNavigator} options={{ headerShown: false }}/>
          <Tab.Screen name="Menu" component={MenuStackNavigator} options={{ headerShown: false }}/>
          <Tab.Screen name="Profil" component={ProfilStackNavigator} options={{ headerShown: false }}/>
    
        </Tab.Navigator>
      );
    }
  }
};

export default BottomTabNavigator;