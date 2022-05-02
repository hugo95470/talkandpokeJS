import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import AcceuilPage from '../Pages/AcceuilPage';
import SwipePage from '../Pages/SwipePage';
import DetailsOeuvrePage from '../Pages/DetailsOeuvrePage';
import ProfilPage from '../Pages/ProfilPage';
import ContactPage from '../Pages/ContactPage';
import ChangeProfilPage from '../Pages/ChangeProfilPage';
import MenuPage from '../Pages/MenuPage';
import MenuOeuvresPage from '../Pages/MenuOeuvresPage';
import MessageriePage from '../Pages/MessageriePage';
import MessagePage from '../Pages/MessagePage';
import ConnexionPage from '../Pages/ConnexionPage';
import CreationComptePage from '../Pages/CreationComptePage';
import OeuvresPages from '../Pages/OeuvresPage';
import FollowersPage from '../Pages/FollowersPage';
import FollowingPage from '../Pages/FollowingPage';
import TuPreferesPage from '../Pages/TuPreferesPage';
import StartPage from '../Pages/StartPage';
import TuPreferesHistoriquePage from '../Pages/TuPreferesHistoriquePage';

const Stack = createStackNavigator();

const AcceuilStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AcceuilPage" component={AcceuilPage} options={{ headerShown: false }}/>
      <Stack.Screen name="DetailsOeuvrePage" component={DetailsOeuvrePage} options={{ headerShown: false }}/>
      <Stack.Screen name="MenuOeuvresPage" component={MenuOeuvresPage} options={{ headerShown: false }}/>
      <Stack.Screen name="ProfilPage" component={ProfilPage} options={{ headerShown: false }}/>
      <Stack.Screen name="ContactPage" component={ContactPage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessageriePage" component={MessageriePage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }}/>
      <Stack.Screen name="OeuvresPage" component={OeuvresPages} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowersPage" component={FollowersPage} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowingPage" component={FollowingPage} options={{ headerShown: false }}/>
      <Stack.Screen name="TuPreferesPage" component={TuPreferesPage} options={{ headerShown: false }}/>
      <Stack.Screen name="TuPreferesHistoriquePage" component={TuPreferesHistoriquePage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const SwipeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SwipePage" component={SwipePage} options={{ headerShown: false }}/>
      <Stack.Screen name="DetailsOeuvrePage" component={DetailsOeuvrePage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessageriePage" component={MessageriePage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowersPage" component={FollowersPage} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowingPage" component={FollowingPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const ProfilStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfilPage" component={ProfilPage} options={{ headerShown: false }}/>
      <Stack.Screen name="ChangeProfilPage" component={ChangeProfilPage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessageriePage" component={MessageriePage} options={{ headerShown: false }}/>
      <Stack.Screen name="MenuOeuvresPage" component={MenuOeuvresPage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }}/>
      <Stack.Screen name="DetailsOeuvrePage" component={DetailsOeuvrePage} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowersPage" component={FollowersPage} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowingPage" component={FollowingPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const MenuStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MenuPage" component={MenuPage} options={{ headerShown: false }}/>
      <Stack.Screen name="ProfilPage" component={ProfilPage} options={{ headerShown: false }}/>
      <Stack.Screen name="ContactPage" component={ContactPage} options={{ headerShown: false }}/>
      <Stack.Screen name="DetailsOeuvrePage" component={DetailsOeuvrePage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessageriePage" component={MessageriePage} options={{ headerShown: false }}/>
      <Stack.Screen name="MessagePage" component={MessagePage} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowersPage" component={FollowersPage} options={{ headerShown: false }}/>
      <Stack.Screen name="FollowingPage" component={FollowingPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const ConnexionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ConnexionPage" component={ConnexionPage} options={{ headerShown: false, animationTypeForReplace: 'push' }}/>
      <Stack.Screen name="CreationComptePage" component={CreationComptePage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

const IntroStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StartPage" component={StartPage} options={{ headerShown: false, animationTypeForReplace: 'push' }}/>
    </Stack.Navigator>
  );
}

export { AcceuilStackNavigator, IntroStackNavigator, SwipeStackNavigator, ProfilStackNavigator, MenuStackNavigator, ConnexionStackNavigator };