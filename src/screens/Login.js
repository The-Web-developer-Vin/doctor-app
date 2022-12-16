import {
  Alert,
  Button,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Loader from "./Loader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import authService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [loading, setLoding] = React.useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email cannot be empty"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password cannot be empty"),
  });

  return (
    <ImageBackground
      source={require("./../../assets/splash-bg.png")}
      style={styles.bgImage}>
      <View style={styles.container}>
        <Loader visible={loading} />
        <Text style={styles.title}>Telemedicine</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoding(true);
            try {
              const res = await authService.login(values);
              console.log("res", res);
              if (res.data.token) {
                setTimeout(async () => {
                  resetForm({ values: "" });
                  navigation.navigate("Urgent");
                  setLoding(false);
                }, 1000);
                const jsonValue = JSON.stringify(res.data);
                await AsyncStorage.setItem("user", jsonValue);
              }
            } catch (error) {
              console.log(error);
              setLoding(false);
              Alert.alert("Error", "Something went wrong");
            }
          
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={{ marginBottom: 30 }}>
                <Ionicons
                  name="person-outline"
                  size={26}
                  color="#fff"
                  style={{ position: "absolute", top: 13, left: 16 }}
                />
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={styles.input}
                  placeholder="Your Email"
                  placeholderTextColor="#FFF"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errText}>{errors.email}</Text>
                )}
              </View>
              <View style={{ marginBottom: 30 }}>
                <Ionicons
                  name="key-outline"
                  size={26}
                  color="#fff"
                  style={{ position: "absolute", top: 15, left: 16 }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Your Password"
                  placeholderTextColor="#FFF"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.buttonWhite}>
                <Text style={styles.buttonGreenText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        {/* <View>
        <Ionicons
          name="person-outline"
          size={26}
          color="#fff"
          style={{ position: "absolute", top: 13, left: 16 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#FFF"
        />
      </View> */}
        {/* <View>
        <Ionicons
          name="key-outline"
          size={26}
          color="#fff"
          style={{ position: "absolute", top: 15, left: 16 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
        />
      </View>
      <Pressable onPress={() => Login()} style={styles.buttonWhite}>
        <Text style={styles.buttonGreenText}>Login</Text>
      </Pressable> */}

        <Pressable
          style={styles.resg}
          onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>SIGN UP</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#07da5f",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Nunito_700Bold",
    letterSpacing: 4,
    marginBottom: 80,
    textAlign: "center",
  },
  buttonWhite: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    padding: 17,
    borderRadius: 100,
    marginBottom: 50,
    marginTop: 10,
  },
  buttonGreenText: {
    fontFamily: "  Nunito_700Bold",
    fontSize: 20,
    color: "#07da5f",
    letterSpacing: 1,
    textAlign: "center",
  },

  linkText: {
    fontFamily: "  Nunito_600SemiBold",
    fontSize: 18,
    color: "#fff",
    // alignItems: "bottom",
    letterSpacing: 2,
    textAlign: "center",
    textTransform: "uppercase",
  },
  input: {
    borderColor: "#f2eded",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 50,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: " Nunito_400Regular",
    fontSize: 20,
    color: "#fff",
    borderStyle: "solid",
  },
  resg: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  errText: {
    fontSize: 17,
    color: "red",
    fontFamily: "Nunito_700Bold",
    marginTop: 10,
  },
});
