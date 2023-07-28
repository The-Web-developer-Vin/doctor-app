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
  ToastAndroid,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import Loader from "./Loader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import authService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [loading, setLoding] = React.useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email cannot be empty"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password cannot be empty"),
  });
  const Login = async () => {
    if (email.length == 0) {
      Alert.alert("Warning!", "Please Enter Email");
    } else if (password.length == 0) {
      Alert.alert("Warning!", "Please enter password");
    } else {
      setLoding(true);
      try {
        let obj = {
          email: email,
          password: password,
        };
        const res = await authService.login(obj);
        setLoding(false);
        if (res) {
          setTimeout(async () => {
            setLoding(false);
            ToastAndroid.show(
              "You are successfully logged in",
              ToastAndroid.LONG
            );
            let data = JSON.stringify(res.data);
            navigation.push("Home");
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
          }, 1000);
        }
      } catch (err) {
        console.log(err);
        setLoding(false);
        Alert.alert(
          "Check your credentials",
          "email and password do not match"
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"} // for ios 'padding'
      enabled
      style={{ flexGrow: 1, height: "100%" }}
    >
      <ImageBackground
        source={require("./../../assets/splash-bg.png")}
        style={styles.bgImage}
      >
        <Loader visible={loading} />
        <Image
          source={require("../../assets/welocome.webp")}
          style={styles.logo}
        />
        <View style={styles.container}>
          {/* <Text style={styles.title}>Telemedicine</Text> */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm }) => {
              setLoding(true);
              try {
                const res = await authService.login(values);
                if (res) {
                  setTimeout(async () => {
                    setLoding(false);
                    ToastAndroid.show(
                      "You are successfully logged in",
                      ToastAndroid.LONG
                    );
                    let data = res?.data?.user;
                    await AsyncStorage.setItem(
                      "user",
                      JSON.stringify(res.data)
                    );
                    navigation.push("Home");
                  }, 1000);
                }
              } catch (err) {
                setLoding(false);
                Alert.alert(
                  "Check your credentials",
                  "email and password do not match"
                );
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                {/* <Text style={styles.title}>Sing In</Text> */}
                <View style={{ marginBottom: 20 }}>
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color="#a3a9f4"
                    style={{ position: "absolute", top: 13, left: 0 }}
                  />
                  <TextInput
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    style={styles.input}
                    placeholder="Your Email"
                    placeholderTextColor="#a3a9f4"
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errText}>{errors.email}</Text>
                  )}
                </View>
                <View style={{ marginBottom: 20 }}>
                  <Ionicons
                    name="key-outline"
                    size={24}
                    color="#a3a9f4"
                    style={{ position: "absolute", top: 15, left: 0 }}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Your Password"
                    placeholderTextColor="#a3a9f4"
                    secureTextEntry={hidePass ? true : false}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  <Ionicons
                    name={hidePass ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#a3a9f4"
                    style={{ position: "absolute", top: 15, right: 0 }}
                    onPress={() => setHidePass(!hidePass)}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errText}>{errors.password}</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.forgotText}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.buttonWhite}
                >
                  <Text style={styles.buttonGreenText}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          {/* <View style={{ marginBottom: 20 }}>
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
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={{ marginBottom:20 }}>
          <Ionicons
            name="key-outline"
            size={26}
            color="#fff"
            style={{ position: "absolute", top: 16, left: 16 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Password"
            placeholderTextColor="#FFF"
            secureTextEntry={hidePass ? true : false}
            onChangeText={(value) => setPassword(value)}
          />
           <Ionicons
            name={hidePass ? 'eye-off-outline' : 'eye-outline'}
            size={26}
            color="#fff"
            style={{ position: "absolute", top: 15, right: 16 }}
            onPress={() => setHidePass(!hidePass)}
          />
    
        </View>
        <TouchableOpacity onPress={() => Login()} style={styles.buttonWhite}>
          <Text style={styles.buttonGreenText}>Login</Text>
        </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.resg}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.linkText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#555fd2",
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    height: "100%",
    resizeMode: "cover",
    marginTop: -20,
    marginBottom: -40,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonWhite: {
    backgroundColor: "#4ce4b1",
    alignSelf: "stretch",
    padding: 13,
    borderRadius: 100,
    marginBottom: 25,
  },
  buttonGreenText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },

  linkText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  input: {
    borderColor: "#a3a9f4",
    borderBottomWidth: 1,
    paddingLeft: 38,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 14,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#fff",
    borderStyle: "solid",
    height: 54,
  },
  resg: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  errText: {
    fontSize: 13,
    color: "red",
    fontFamily: "Poppins_500Medium",
    marginTop: 10,
  },
  logo: {
    width: "100%",
    height: 300,
    marginBottom: 5,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  forgotText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#fff",
    textAlign: "right",
    marginBottom: 20,
    alignSelf: "stretch",
  },
});
