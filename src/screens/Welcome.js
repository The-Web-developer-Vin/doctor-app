import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView

} from "react-native";
import React from "react";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

export default function Welcome({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
    if(!fontsLoaded){
        return null
    };

  return (
    <ImageBackground
    source={require("./../../assets/splash-bg.png")}
    style={styles.bgImage}
  >
      <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo}/>
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
        {/* <TouchableOpacity onPress={() => navigation.navigate("Urgent")}>
          <Text style={styles.linkText}>URGENT</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#555fd2",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily:'Poppins_600SemiBold',
    marginBottom: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontFamily:'Poppins_400Regular',
    marginBottom: 50,
    lineHeight: 26,
    textAlign: "center",
  },
  buttonWhite: {
    backgroundColor: "#4ce4b1",
    alignSelf: "stretch",
    padding: 13,
    borderRadius: 100,
    marginBottom: 20,
  },
  buttonGreenText: {
    fontFamily:'Poppins_500Medium',
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    textTransform:"uppercase"
  },
  buttonBorder: {
    borderColor: "#fff",
    borderWidth: 2,
    alignSelf: "stretch",
    padding: 12,
    borderRadius: 100,
    marginBottom: 40,
  },
  buttonWhiteText: {
    fontFamily:'Poppins_500Medium',
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    textTransform:"uppercase"
  },
  linkText: {
    fontFamily:'Poppins_600SemiBold',
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  logo:{
    width:82,
    height:85,  
    marginBottom:25,
    textAlign:"center",
    marginLeft:'auto',
    marginRight:'auto',
  }
});
