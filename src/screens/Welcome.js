import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import React from "react";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import AppLoading from 'expo-app-loading';

export default function Welcome({ navigation }) {
    let [fontsLoaded, error] = useFonts({
        Nunito_400Regular,
        Nunito_600SemiBold,
        Nunito_700Bold
    })
    if(!fontsLoaded){
        return <AppLoading/>
    }

  return (
    <ImageBackground
      source={require("./../../assets/splash-bg.png")}
      style={styles.bgImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, t. Ut enim
          ad veni am, quis nostrud exercitation ullamco
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.buttonWhite}>
          <Text style={styles.buttonGreenText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.buttonBorder}>
          <Text style={styles.buttonWhiteText}>Login</Text>
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate("Urgent")}>
          <Text style={styles.linkText}>URGENT</Text>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontFamily:'Nunito_700Bold',
    letterSpacing: 4,
    marginBottom: 18,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontFamily:'Nunito_400Regular',
    letterSpacing: 1,
    marginBottom: 100,
    lineHeight: 24,
    textAlign: "center",
  },
  buttonWhite: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 100,
    marginBottom: 30,
  },
  buttonGreenText: {
    fontFamily:'Nunito_600SemiBold',
    fontSize: 20,
    color: "#07da5f",
    letterSpacing: 1,
    textAlign: "center",
  },
  buttonBorder: {
    borderColor: "#fff",
    borderWidth: 2,
    alignSelf: "stretch",
    padding: 14,
    borderRadius: 100,
    marginBottom: 50,
  },
  buttonWhiteText: {
    fontFamily:'Nunito_600SemiBold',
    fontSize: 20,
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
  },
  linkText: {
    fontFamily:'Nunito_600SemiBold',
    fontSize: 18,
    color: "#fff",
    letterSpacing: 2,
    textAlign: "center",
  },
});
