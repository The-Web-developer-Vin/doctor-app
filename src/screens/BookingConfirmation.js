import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import homeServices from "../services/homeServices";
import Loader from "./Loader";
import doctorService from "../services/doctorService";
import { hostUrl } from "../services/envService";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BookingConfirmation({ route, navigation }) {
  const { userId } = route.params;
  const [reqData, setReqData] = useState();
  const [doctor, setDoctor] = useState();
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    getRequestData();
  }, []);

  const getRequestData = async () => {
    try {
      const res = await homeServices.getRequestedData(userId);
      if (res.data) {
        setLoding(false);
        setReqData(res?.data?.home);
        getDoctor(res?.data?.home?.doctorId);
      }
    } catch (error) {
      console.log(error);
      setLoding(false);
    }
  };
  const getDoctor = async (id) => {
    try {
      const response = await doctorService.getDocotorDetails(id);
      setDoctor(response.data.doctor);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.bgBlue}>
      <Loader visible={loading} />
      <View style={styles.topBar}>
        <LottieView
          autoPlay
          loop
          speed={1}
          style={{
            width: 320,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: -15,
          }}
          source={require("../../assets/sucess.json")}
        />
        <Text style={styles.topTitle}>Your Appointment Has Been Confirmed</Text>
      </View>
      <View style={[styles.container]}>
        <Text style={styles.title}>Appointment Details</Text>
        <View style={styles.list}>
          <Text style={styles.desc}>Patient Name</Text>
          <Text style={styles.title1}>{reqData?.name}</Text>
        </View>
        <View style={styles.out}>
          <View style={[styles.list, styles.block]}>
            <Text style={styles.desc}>Date</Text>
            <Text style={styles.title1}>{reqData?.date}</Text>
          </View>
          <View style={[styles.list, styles.block]}>
            <Text style={styles.desc}>Time</Text>
            <Text style={styles.title1}>{reqData?.time}</Text>
          </View>
        </View>
        {/* <View style={styles.list}>
          <Text style={styles.desc}>Preference</Text>
          <Text style={styles.title1}>{reqData?.preference}</Text>
        </View> */}
        <View style={styles.list1}>
          <View style={styles.inner}>
            <Image
              style={styles.image}
              source={{ uri: hostUrl + doctor?.profile }}
            ></Image>

            <View style={styles.content}>
              <Text style={styles.title2}>{doctor?.doctor_Name}</Text>
              <View style={styles.viewOuts}>
                <Text style={styles.text}>{doctor?.specialist}</Text>
                <View style={styles.ratings}>
                  <Ionicons name="star" size={15} color="#ffd500" />
                  <Text style={styles.rating}>{doctor?.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.push("Home")}
          style={styles.buttonGreen}
        >
          <Text style={styles.buttonWhiteText}>Go to home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgBlue: {
    flex: 1,
    backgroundColor: "#555fd2",
  },
  container: {
    flex: 1,
    backgroundColor: "#eff4fa",
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    resizeMode: "cover",
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    minHeight:500,
  },
  topBar: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
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
  title: {
    fontSize: 20,
    color: "#193469",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  list: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 9,
  },
  desc: {
    color: "#c1c7d7",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    lineHeight: 22,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
  },
  title1: {
    fontSize: 16,
    color: "#555fd2",
    textAlign: "left",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: -5,
  },
  out: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  block: {
    width: "48.5%",
  },
  list1: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 25,
    justifyContent: "space-between",
    borderRadius: 15,
    elevation: 20,
    shadowColor: "#d7e9ff",
    alignItems: "center",
    width: "100%",
  },
  inner: {
    flexDirection: "row",
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  content: {
    marginLeft: 15,
    marginRight: 0,
    marginTop: 4,
    flex: 1,
    paddingRight: 5,
  },
  title2: {
    color: "#193469",
    fontSize: 17,
    marginBottom: 0,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "capitalize",
  },
  text: {
    color: "#cad0e0",
    fontSize: 15,
    marginBottom: 0,
    // fontStyle: "italic",
    fontFamily: "Poppins_400Regular",
    textTransform: "capitalize",
  },
  rating: {
    fontSize: 14,
    color: "#193469",
    marginLeft: 3,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: -5,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewOuts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
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
});
