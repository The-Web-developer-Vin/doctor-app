import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Urgent from "./Urgent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Notification from "./Notification";
import Schedule from "./Schedule";
import Profile from "./Profile";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Home({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer independent={true}>
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
          component={Urgent}
          options={{
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
            },
          }}
        />
        <Tab.Screen
          name="Notification"
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
            },
          }}
        />
        <Tab.Screen
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
        />
        <Tab.Screen
          name="Schedule"
          component={Schedule}
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
              fontSize: 14,
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
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
              fontSize: 14,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text style={styles.buttonBorder}>VERY URGENT</Text>
    //   <Urgent />
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // fontFamily: "Nunito_600SemiBold",
  },
  buttonBorder: {
    borderColor: "#07da5f",
    borderWidth: 2,
    padding: 12,
    borderRadius: 100,
    marginTop: 40,
    // fontFamily: "  Nunito_600SemiBold",
    fontSize: 16,
    color: "#07da5f",
    letterSpacing: 1,
    width: 180,
    margin: "auto",
    textAlign: "center",
    lineHeight: 24,
  },

  icons: {
    backgroundColor: "#07da5f",
    borderRadius: 100,
    width: 50,
    height: 50,
    lineHeight: 52,
    textAlign: "center",
  },
});
