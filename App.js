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
import Map from "./src/screens/Map";
import File from "./src/screens/File";
import "react-native-gesture-handler";
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from "./src/screens/Index";
import Schedule from "./src/screens/Schedule";
import Profile from "./src/screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TransitionPresets } from "@react-navigation/stack";
import HomeSlide from "./src/screens/HomeSlide";
import Review from "./src/screens/Review";
import AllDoctors from "./src/screens/AllDoctors";
import BookingConfirmation from "./src/screens/BookingConfirmation";
import Chat from "./src/screens/Chat";
import ChatScreen from "./src/screens/ChatScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setLogin] = useState();
  useEffect(() => {
    getUser();
  }, []);
  // const getUser = async () => {
  //   try {
  //     AsyncStorage.getItem("user").then(value => {
  //       if (value != null) {
  //         setLogin(true);
  //       }
  //       else {
  //         setLogin(false);
  //       }
  //     })

  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      if (currentUser != null) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={HomeSlide}
            options={{
              header: () => null,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        ) : (
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              header: () => null,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        )} */}
        {/* <Stack.Screen
            name="Map"
            component={HomeSlide}
            options={{
              header: () => null,
            }}
          />  */}
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        /> 
         <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        /> 
        <Stack.Screen
          name="Register"
          component={Signup}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Urgent"
          component={Urgent}
          options={{
            headerStyle: {
              backgroundColor: "#07da5f",
              borderWidth: 0,
              boxShadow: "none",
              // height: 90,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              // fontSize: 26,
            },
            headerTitleAlign: "center",
            headerLeft: null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="DoctorList"
          component={DoctorList}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="DoctorDetails"
          component={DoctorDetails}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="CallPayment"
          component={CallPayment}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="AllDoctors"
          component={AllDoctors}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmation}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            header: () => null,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
