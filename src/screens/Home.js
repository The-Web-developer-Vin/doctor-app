import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Schedule from "./Schedule";
import Profile from "./Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import Index from "../screens/Index";
import Notifications from "./Notifications";
import { TransitionPresets } from "@react-navigation/stack";
import HomeSlide from "./HomeSlide";
import Settings from "./Settings";
import Help from "./Help";
import DrawerContent from "./DrawerContent";

export default function Home({ route, navigation }) {
  const Drawer = createDrawerNavigator();
  // const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeSlide"
        options={{
          header: () => null,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        component={HomeSlide}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => null,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{
          header: () => null,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          header: () => null,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          header: () => null,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Drawer.Navigator>

    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;
    //       if (route.name === "Index") {
    //         iconName = focused ? "home" : "home-outline";
    //       } else if (route.name === "Notification") {
    //         iconName = focused ? "notifications" : "notifications-outline";
    //       } else if (route.name === "Schedule") {
    //         iconName = focused ? "calendar" : "calendar-outline";
    //       } else if (route.name === "Profile") {
    //         iconName = focused ? "person" : "person-outline";
    //       }
    //       return <Ionicons name={iconName} size={size} color={color} />;
    //     },
    //     tabBarActiveTintColor: "#07da5f",
    //     tabBarInactiveTintColor: "#8fa4ae",
    //     tabBarStyle: {
    //       height: 60,
    //       shadowColor: "#171717",
    //       shadowOffset: { width: -2, height: 4 },
    //       shadowOpacity: 0.2,
    //       shadowRadius: 5,
    //       paddingBottom: 6,
    //     },
    //   })}
    // >
    //   <Tab.Screen
    //     style={styles.nav}
    //     name="Index"
    //     component={HomeSlide}
    //     options={{
    //       title: "Home",
    //       header: () => null,
    //       ...TransitionPresets.SlideFromRightIOS,
    //       drawerIcon: ({ focused, size }) => (
    //         <Ionicons
    //           name="md-planet"
    //           size={20}
    //           color={focused ? "#2f37a4" : "#c7cbd7"}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Notification"
    //     component={Notifications}
    //     options={{
    //       drawerIcon: ({ focused, size }) => (
    //         <Ionicons
    //           name="notifications-outline"
    //           size={20}
    //           color={focused ? "#2f37a4" : "#c7cbd7"}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Schedule"
    //     component={Schedule}
    //     options={{
    //       drawerIcon: ({ focused, size }) => (
    //         <Ionicons
    //           name="calendar-outline"
    //           size={20}
    //           color={focused ? "#2f37a4" : "#c7cbd7"}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={Profile}
    //     options={{
    //       drawerIcon: ({ focused, size }) => (
    //         <Ionicons
    //           name="person-outline"
    //           size={20}
    //           color={focused ? "#2f37a4" : "#c7cbd7"}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Settings"
    //     component={Settings}
    //     options={{
    //       drawerIcon: ({ focused, size }) => (
    //         <Ionicons
    //           name="settings-outline"
    //           size={size}
    //           color={focused ? "#7cc" : "#ccc"}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Help"
    //     component={Help}
    //     options={{
    //       drawerIcon: ({ focused, size }) => (
    //         <Ionicons
    //           name="help-circle-outline"
    //           size={size}
    //           color={focused ? "#7cc" : "#ccc"}
    //         />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
  );
}
const styles = StyleSheet.create({});
