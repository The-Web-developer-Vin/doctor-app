import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Appointment({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.confirm}>
        <Text style={styles.heading}>You have appoint for video cal</Text>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,Ut enim ad
          minim venia m, quis nostrud exercitation ullamco
        </Text>
      </View>

      <View style={styles.doctor}>
        <Text style={styles.title}>Doctor </Text>
        <View style={styles.DoList}>
          <Image
            style={styles.Doimage}
            source={require("./../../assets/doctor-1.jpg")}></Image>
          <View style={styles.Docontent}>
            <Text style={styles.Dotitle}>Dudung Sokmati</Text>
            <Text style={styles.Dotext}>Eye Specialist</Text>
            <View style={styles.Doratings}>
              {/* <Image
              style={{ width: 15, height: 15, marginTop: 5, marginRight: 10 }}
              source={require("./../../assets/star.png")}></Image>
            <Image
              style={{ width: 15, height: 15, marginTop: 5, marginRight: 10 }}
              source={require("./../../assets/star.png")}></Image>
            <Image
              style={{ width: 15, height: 15, marginTop: 5, marginRight: 10 }}
              source={require("./../../assets/star.png")}></Image>
            <Image
              style={{ width: 15, height: 15, marginTop: 5, marginRight: 10 }}
              source={require("./../../assets/star.png")}></Image>
            <Image
              style={{ width: 15, height: 15, marginTop: 5, marginRight: 10 }}
              source={require("./../../assets/star.png")}></Image> */}
              <Ionicons
                name="star"
                size={20}
                color="#ffd500"
                style={{ marginRight: 8 }}
              />
              <Ionicons
                name="star"
                size={20}
                color="#ffd500"
                style={{ marginRight: 8 }}
              />
              <Ionicons
                name="star"
                size={20}
                color="#ffd500"
                style={{ marginRight: 8 }}
              />
              <Ionicons
                name="star"
                size={20}
                color="#ffd500"
                style={{ marginRight: 8 }}
              />
              <Ionicons
                name="star-half"
                size={20}
                color="#ffd500"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.Dorating}>4.9</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("VideoCall")}
          style={styles.buttonGreen}>
          <Text style={styles.buttonWhiteText}>
          <Ionicons name="videocam" size={24} style={{marginRight:15}}/>          
            Start Call
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },
  heading: {
    color: "#37474e",
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 35,
    fontFamily: "Nunito_600SemiBold",
  },
  desc: {
    color: "#607c8a",
    fontSize: 18,
    marginBottom: 35,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily:'Nunito_400Regular',
  },
  title: {
    color: "#07da5f",
    fontSize: 24,
    marginBottom: 30,
    letterSpacing: 1,
    fontFamily: "Nunito_600SemiBold",
  },

  DoList: {
    flexDirection: "row",
    marginBottom: 10,
    borderColor: "#eceff1",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 15,
    marginBottom: 45,
  },
  Doimage: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  Docontent: {
    marginLeft: 25,
    marginRight: 20,
  },
  Dotitle: {
    color: "#37474e",
    fontSize: 19,
    marginBottom: 4,
    fontFamily: "Nunito_600SemiBold",
  },
  Dotext: {
    color: "#07da5f",
    fontSize: 18,
    marginBottom: 5,
    fontStyle: "italic",
    fontFamily: "Nunito_600SemiBold",
  },

  Dorating: {
    fontSize: 18,
    color: "#8fa4ae",
    marginLeft: 5,
    fontFamily: "Nunito_600SemiBold",
  },
  Doratings: {
    flexDirection: "row",
  },
  doctor: {
    marginTop: 35,
  },
  buttonGreen: {
    backgroundColor: "#07da5f",
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 100,
  },
  buttonWhiteText: {
    fontFamily: "  Nunito_700Bold",
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
  },
});
