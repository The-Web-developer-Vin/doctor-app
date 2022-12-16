import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Urgent from "./src/screens/Urgent";
import Home from "./src/screens/Home";
import DoctorList from "./src/screens/DoctorList";
import DoctorDetails from "./src/screens/DoctorDetails";
import Notification from "./src/screens/Notification";
import Appointment from "./src/screens/Appointment";
import VideoCall from "./src/screens/VideoCall";
import CallPayment from "./src/screens/CallPayment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();
export default function App() {
  const [isLoggedIn, setLogin] = useState();
  useEffect(() => {
    // if (AsyncStorage.getItem("user") !== null) {
    //   setLogin(true);
    // } else {
    //   setLogin(false);
    // }
  }, [isLoggedIn]);
  console.log(isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Urgent"
            component={Urgent}
            options={{
              title: "Home",
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
              headerLeft: null,
            }}
          />
        ) : (
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              header: () => null,
            }}
          />
        )}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Signup}
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
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ header: () => null }}
        />
           {/* <Stack.Screen
            name="Urgent"
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
              headerLeft: null,
            }}
          /> */}

        <Stack.Screen
          name="DoctorList"
          component={DoctorList}
          options={{
            title: "Doctor List",
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
          }}
        />
        <Stack.Screen
          name="DoctorDetails"
          component={DoctorDetails}
          options={{
            title: "Doctor Details",
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
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
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
          }}
        />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
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
          }}
        />
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="CallPayment"
          component={CallPayment}
          options={{
            title: "Call Payment",
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
