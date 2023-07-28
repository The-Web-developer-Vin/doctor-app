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
  RefreshControl,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import doctorService from "../services/doctorService";
import Loader from "./Loader";
import { hostUrl } from "../services/envService";
import LottieView from "lottie-react-native";

export default function AllDoctors({ route, navigation }) {
  const [doctors, setDoctors] = useState([]);
  const { userId } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoding] = React.useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    getDocors();
  }, []);

  const getDocors = async () => {
    try {
      const res = await doctorService.allDocotors();
      setDoctors(res.data.doctor);
      setTimeout(async () => {
        setLoding(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const handlerSearch = (value) => {
    setSearchFilter(value);
    if (value === "") {
        getDocors();
    } else {
      const filteredData = doctors.filter((item) =>
        item.doctor_Name.toLowerCase().includes(value.toLowerCase())
      );
      setDoctors(filteredData);
    }
  };

  return (
    <ScrollView style={styles.bgBlue}>
      <Loader visible={loading} />
      <View style={styles.topBar}>
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.arrow}
          name="chevron-back-outline"
        />
        <Text style={styles.topTitle}>Top Doctors</Text>
        <Text></Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 15 }}>
          {/* <Text style={styles.searchtitle}>Let's Find Your Doctor</Text> */}
          <TextInput
            onChangeText={(text) => {
              handlerSearch(text);
            }}
            value={searchFilter}
            style={styles.input}
            placeholder="Let's Find Your Doctor"
            placeholderTextColor="#cfd8e1"
          />
          <Ionicons
            name="search-outline"
            size={25}
            color="#cfd8e1"
            style={{ position: "absolute", marginTop: 15, right: 20 }}
          />
        </View>

        {doctors && doctors?.length > 0 ? (
          doctors.map((list, i) => {
            return (
              <View style={styles.list} key={i}>
                <TouchableOpacity
                  style={styles.inner}
                  onPress={() =>
                    navigation.push("DoctorDetails", {
                      doctorId: list._id,
                      userId: userId,
                    })
                  }
                >
                  <Image
                    style={styles.image}
                    source={{ uri: hostUrl + list.profile }}
                  ></Image>

                  <View style={styles.content}>
                    <Text style={styles.title}>{list.doctor_Name}</Text>
                    <View style={styles.viewOuts}>
                      <Text style={styles.text}>{list.specialist}</Text>
                      <View style={styles.ratings}>
                        <Ionicons name="star" size={15} color="#ffd500" />
                        <Text style={styles.rating}>{list.rating}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                {/* <View style={styles.ratings}>
                  <Ionicons name="star" size={19} color="#ffd500" />
                  <Text style={styles.rating}>{list.rating}</Text>
                </View> */}
              </View>
            );
          })
        ) : (
          <View style={styles.notFound}>
              <LottieView
              autoPlay
              loop
              speed={1}
              style={{
                width: 280,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 10,
              }}
              source={require("../../assets/doctors-found.json")}
            />
            <Text style={styles.title}>No Doctors Found...!</Text>
          </View>
        )}
      </SafeAreaView>
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
    minHeight: 670,
    resizeMode: "cover",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  list: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
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
  title: {
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
  map: {
    color: "#8fa4ae",
    fontSize: 16,
    textAlign: "left",
    marginLeft: -4,
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
  searchtitle: {
    fontSize: 20,
    color: "#193469",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  input: {
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#193469",
    backgroundColor: "#fff",
  },
  viewOuts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  notFound: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 20,
    shadowColor: "#d7e9ff",
    alignItems: "center",
    width: "100%",
  },
});
