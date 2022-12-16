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
import doctorService from "../services/doctorService";

export default function DoctorList({ navigation }) {
  const [doctors, setDoctors] = useState();
  useEffect(() => {
    getDocors();
  }, []);
  const getDocors = async () => {
    try {
      const res = await doctorService.getAllDocotor();
      console.log("res", res.data.doctor);
      setDoctors(res.data.doctor);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {doctors && doctors?.length > 0 ? (
          doctors.map((list, i) => {
            return (
              <View style={styles.list} key={i}>
                <Pressable
                  style={styles.inner}
                  onPress={() =>
                    navigation.push("DoctorDetails", { doctorId:list._id })
                  }>
                  <Image
                    style={styles.image}
                    source={require("./../../assets/doctor-1.jpg")}></Image>
                  <View style={styles.content}>
                    <Text style={styles.title}>{list.doctor_Name}</Text>
                    <Text style={styles.text}>{list.specialist}</Text>
                    <Text style={styles.map}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        style={{ marginRight: 5 }}
                      />
                      {list.location}
                    </Text>
                  </View>
                </Pressable>
                <View style={styles.ratings}>
                  <Ionicons name="star" size={19} color="#ffd500" />
                  <Text style={styles.rating}>{list.rating}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.list}>
            <Text style={styles.title}>No Data Found...!</Text>
          </View>
        )}

        {/* <View style={styles.list}>
        <Image
          style={styles.image}
          source={require("./../../assets/doctor-2.jpg")}></Image>
        <View style={styles.content}>
          <Text style={styles.title}>Nunung Brandon</Text>
          <Text style={styles.text}>Eye Specialist</Text>
          <Text style={styles.map}>
          <Ionicons
              name="location-outline"
              size={22}
              style={{ marginRight: 5 }}
            />
            St.Bronxlyn 212
          </Text>
        </View>
        <View style={styles.ratings}>
        <Ionicons name="star" size={19} color="#ffd500" />
          <Text style={styles.rating}>4.2</Text>
        </View>
      </View>
      <View style={styles.list}>
        <Image
          style={styles.image}
          source={require("./../../assets/doctor-3.jpg")}></Image>
        <View style={styles.content}>
          <Text style={styles.title}>Udin Batakooran</Text>
          <Text style={styles.text}>Eye Specialist</Text>
          <Text style={styles.map}>
            <Ionicons
              name="location-outline"
              size={22}
              style={{ marginRight: 5 }}
            />
            St.Bronxlyn 212
          </Text>
        </View>
        <View style={styles.ratings}>
        <Ionicons name="star" size={19} color="#ffd500" />
          <Text style={styles.rating}>3.9</Text>
        </View>
      </View>
      <View style={styles.list}>
        <Image
          style={styles.image}
          source={require("./../../assets/doctor-4.jpg")}></Image>
        <View style={styles.content}>
          <Text style={styles.title}>Cucup Joentravo</Text>
          <Text style={styles.text}>Eye Specialist</Text>
          <Text style={styles.map}>
            <Ionicons
              name="location-outline"
              size={22}
              style={{ marginRight: 5 }}
            />
            St.Bronxlyn 212
          </Text>
        </View>
        <View style={styles.ratings}>
        <Ionicons name="star" size={19} color="#ffd500" />
          <Text style={styles.rating}>3.1</Text>
        </View>
      </View>
      <View style={styles.list}>
        <Image
          style={styles.image}
          source={require("./../../assets/doctor-5.jpg")}></Image>
        <View style={styles.content}>
          <Text style={styles.title}>Justin E. Carter</Text>
          <Text style={styles.text}>Eye Specialist</Text>
          <Text style={styles.map}>
            <Ionicons
              name="location-outline"
              size={22}
              style={{ marginRight: 5 }}
            />
            St.Bronxlyn 212
          </Text>
        </View>
        <View style={styles.ratings}>
        <Ionicons name="star" size={19} color="#ffd500" />
          <Text style={styles.rating}>4.4</Text>
        </View>
      </View>
      <View style={styles.list}>
        <Image
          style={styles.image}
          source={require("./../../assets/doctor-2.jpg")}></Image>
        <View style={styles.content}>
          <Text style={styles.title}>Dwayne N. Soto</Text>
          <Text style={styles.text}>Eye Specialist</Text>
          <Text style={styles.map}>           
            <Ionicons
              name="location-outline"
              size={22}
              style={{ marginRight: 5 }}
            />
            St.Bronxlyn 212
          </Text>
        </View>
        <View style={styles.ratings}>
        <Ionicons name="star" size={19} color="#ffd500" />
          <Text style={styles.rating}>2.9</Text>
        </View>
      </View> */}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  list: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  inner: {
    flexDirection: "row",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  content: {
    marginLeft: 18,
    marginRight: 0,
  },
  title: {
    color: "#37474e",
    fontSize: 19,
    marginBottom: 0,
    fontFamily: "Nunito_600SemiBold",
  },
  text: {
    color: "#07da5f",
    fontSize: 16,
    marginBottom: 5,
    fontStyle: "italic",
    fontFamily: "Nunito_400Regular",
  },
  map: {
    color: "#8fa4ae",
    fontSize: 16,
    textAlign: "left",
    marginLeft: -4,
    fontFamily: "Nunito_400Regular",
  },
  rating: {
    fontSize: 18,
    color: "#8fa4ae",
    marginLeft: 5,
    fontFamily: "Nunito_400Regular",
  },
  ratings: {
    flexDirection: "row",
  },
});
