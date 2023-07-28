import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import doctorService from "../services/doctorService";
import homeServices from "../services/homeServices";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Rating } from "react-native-rating-element";
import Loader from "./Loader";
import { hostUrl } from "../services/envService";

export default function DoctorDetails({ route, navigation }) {
  const [details, setDetails] = useState();
  const { doctorId } = route.params;
  const { userId } = route.params;
  const [loading, setLoding] = React.useState(true);

  const [location, setLocation] = useState({
    initialPosition: {
      latitude: 13.08268,
      longitude: 80.270721,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    },
  });

  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const response = await doctorService.getDocotorDetails(doctorId);
      let data = JSON.stringify(response.data.doctor);
      setDetails(response.data.doctor);
      setTimeout(async () => {
        setLoding(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <ScrollView style={styles.white}>
      <Loader visible={loading} />
      <View style={styles.topBar}>
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.arrow}
          name="chevron-back-outline"
        />
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.listCont}>
          <Text style={styles.title}>{details?.doctor_Name}</Text>
          <View style={styles.list}>
            <Image
              style={styles.image}
              source={{ uri: hostUrl + details?.profile }}
            ></Image>
            <View style={styles.content}>
              <Text style={styles.text}>{details?.specialist}</Text>
              {/* <Text style={styles.text}>MBBS,FCPS,FRCS ED FACS</Text> */}
              <View style={styles.ratings}>
                <Ionicons
                  name="star"
                  size={16}
                  style={{ marginBottom: 5 }}
                  color="#ffd500"
                />
                <Text style={styles.rating}>
                  {details?.rating}{" "}
                  <Text style={styles.reviews}>(32 Reviews)</Text>
                </Text>
              </View>
              <View style={styles.options}>
                <Ionicons
                  style={styles.icon}
                  color={"#f83458"}
                  name="chatbox-outline"
                />
                <Ionicons
                  style={styles.icon}
                  color={"#18d59b"}
                  name="call-outline"
                />
                <Ionicons
                  style={styles.icon}
                  color={"#1c73f4"}
                  name="videocam-outline"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bgouter}>
          <View style={styles.details}>
            <Text style={styles.heading}>About</Text>
            <Text style={styles.desc}>{details?.descripition}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.heading}>Working Hours</Text>
            <Text style={styles.desc}>
              {" "}
              <Ionicons size={18} color={"#cad0e0"} name="time-outline" />{" "}
              Mon-Fri(09:00 AM - 10 PM)
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.heading}>Location</Text>
            {/* <Text style={styles.desc}>
              <Ionicons
                name="location-outline"
                size={19}
                style={{ marginRight: 5 }}
              />{" "}
              {details?.location}
            </Text> */}
            {/* <Text style={styles.desc}>{details?.adress}</Text> */}
          </View>
          <View>
            <MapView
              style={styles.maps}
              provider={PROVIDER_GOOGLE}
              zoomEnabled={false}
              scrollEnabled={false}
              initialRegion={location.initialPosition}
            >
              <Marker
                coordinate={{
                  latitude: location.initialPosition.latitude,
                  longitude: location.initialPosition.longitude,
                }}
                pinColor={"red"}
                title={details?.location}
                description={details?.adress}
              />
            </MapView>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.push("Notification", {
                doctorId: doctorId,
                userId: userId,
              })
            }
            style={styles.buttonGreen}
          >
            <Text style={styles.buttonWhiteText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: "#555fd2",
  },
  container: {
    flex: 1,
    backgroundColor: "#555fd2",
  },
  bgouter: {
    backgroundColor: "#eff4fa",
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    resizeMode: "cover",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  listCont: {
    marginBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    flexWrap: "nowrap",
  },
  list: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  content: {
    marginLeft: 20,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 0,
    fontFamily: "Poppins_500Medium",
  },

  rating: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
    fontFamily: "Poppins_500Medium",
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    color: "#193469",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  desc: {
    color: "#62729b",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: 5,
    lineHeight: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  details: {
    marginBottom: 30,
  },
  map: {
    color: "#8fa4ae",
    fontSize: 18,
    fontFamily: "Nunito_400Regular",
    marginLeft: -3,
    textTransform: "capitalize",
    marginBottom: 20,
    textAlign: "left",
  },
  mapAdd: {
    color: "#8fa4ae",
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    marginLeft: -3,
    textTransform: "capitalize",
    textAlign: "left",
    lineHeight: 24,
  },
  buttonGreen: {
    backgroundColor: "#4ce4b1",
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 100,
  },
  buttonWhiteText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  maps: {
    height: 200,
    with: "100%",
    marginBottom: 30,
    marginTop: -30,
  },
  topBar: {
    flexDirection: "row",
    // justifyContent:"space-between",
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  arrow: {
    fontSize: 32,
    color: "#ffffff",
    marginBottom: 5,
    marginRight: 15,
  },
  topTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  reviews: {
    color: "#a1a8ec",
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  icon: {
    backgroundColor: "#fff",
    width: 42,
    height: 42,
    fontSize: 20,
    textAlign: "center",
    lineHeight: 42,
    borderRadius: 100,
  },
});
