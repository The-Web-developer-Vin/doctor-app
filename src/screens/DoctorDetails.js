import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import doctorService from '../services/doctorService';


export default function DoctorDetails({ route, navigation }) {
  const [details, setDetails] = useState()
  const { doctorId } = route.params;
  useEffect(() => {
    getDetails()
  }, [])
  const getDetails = async()=>{
    try{
      const response = await doctorService.getDocotorDetails(doctorId)
      console.log("res", response)
      setDetails(response.data.doctor)
    }
    catch(err){
      console.log(err)
      Alert.alert("Error", "Something went wrong");
    }
  }
  
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          <Image
            style={styles.image}
            source={require("./../../assets/doctor-1.jpg")}></Image>
          <View style={styles.content}>
            <Text style={styles.title}>{details?.doctor_Name}</Text>
            <Text style={styles.text}>{details?.specialist}</Text>
            <View style={styles.ratings}>
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

              <Text style={styles.rating}>{details?.rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.heading}>Short Description</Text>
          <Text style={styles.desc}>
          {details?.descripition}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.heading}>Location</Text>
          <Text style={styles.map}>
            <Ionicons
              name="location-outline"
              size={24}
              style={{ marginRight: 5 }}
            />{" "}
           {details?.location}
          </Text>          
          <Image
            style={{ width: "100%", height: 200, marginTop: 30 }}
            source={require("./../../assets/map.jpg")}></Image>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Notification")}
          style={styles.buttonGreen}>
          <Text style={styles.buttonWhiteText}>Request</Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  list: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomColor: "#eceff1",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: 25,
    marginBottom: 28,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  content: {
    marginLeft: 25,
    marginRight: 20,
  },
  title: {
    color: "#37474e",
    fontSize: 20,
    marginBottom: 4,
    fontFamily: "Nunito_600SemiBold",
  },
  text: {
    color: "#07da5f",
    fontSize: 18,
    marginBottom: 5,
    fontStyle: "italic",
    fontFamily: "Nunito_400Regular",
  },

  rating: {
    fontSize: 18,
    color: "#8fa4ae",
    marginLeft: 5,
    fontFamily: "Nunito_600SemiBold",
  },
  ratings: {
    flexDirection: "row",
  },
  heading: {
    color: "#38474f",
    fontSize: 24,
    marginBottom: 12,
    letterSpacing: 1,
    fontFamily: "Nunito_600SemiBold",
  },
  desc: {
    color: "#607c8a",
    fontSize: 18,
    fontFamily: "Nunito_400Regular",
    marginBottom: 5,
    lineHeight: 28,
    letterSpacing: 1,
  },
  details: {
    marginBottom: 35,
  },
  map: {
    color: "#8fa4ae",
    fontSize: 20,
    fontFamily: "Nunito_400Regular",
    marginLeft: -4,
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
