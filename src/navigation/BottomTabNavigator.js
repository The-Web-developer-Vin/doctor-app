import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Schedule from "../screens/Schedule";
import Profile from "../screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import Index from '../screens/Index';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Notification") {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "Schedule") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#07da5f",
          tabBarInactiveTintColor: "#8fa4ae",
          tabBarStyle: {
            height: 60,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            paddingBottom: 6,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Index}
          options={{
            headerStyle: {
              backgroundColor: "#07da5f",
              borderWidth: 0,
              boxShadow: "none",
              height:80, 
                  
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Schedule}
          options={{
            headerStyle: {
              backgroundColor: "#07da5f",
              borderWidth: 0,
              boxShadow: "none",
              height:80, 
                  
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
            headerTitleAlign: "center",
          }}
        />
        {/* <Tab.Screen
          name="add"
          component={Notification}
          options={{
            headerLeft: null,
            headerStyle: {
              backgroundColor: "#07da5f",
              borderWidth: 0,
              boxShadow: "none",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerTitleAlign: "center",
            tabBarLabelStyle: {
              fontSize: 13,
              display: "none",
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="add-outline"
                style={styles.icons}
                color="#fff"
                size={30}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Schedule"
          component={Schedule}
          options={{
            headerStyle: {
              backgroundColor: "#07da5f",
              borderWidth: 0,
              boxShadow: "none",
              height:80, 
                  
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: "#07da5f",
              borderWidth: 0,
              boxShadow: "none",
              height:80, 
                  
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 22,
            },
            headerTitleAlign: "center",
          }}
        />
      </Tab.Navigator>
    );
};

export default BottomTabNavigator;