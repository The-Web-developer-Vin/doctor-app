import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Schedule from "../screens/Schedule";
import Profile from "../screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import Index from "../screens/Index";
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
