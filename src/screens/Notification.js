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
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import doctorService from "../services/doctorService";
import homeServices from "../services/homeServices";
import authService from "../services/authService";

export default function Notification({ route, navigation }) {
  const { doctorId } = route.params;
  const { userId } = route.params;
  const userinfo = authService.userinfo;
  const [details, setDetails] = useState();
  const [issue, setIssue] = useState();
  const [price, setPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState();
  const [activePreference, setActivePreference] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    getDetails() 
    // getRequested();
  }, []);
  const getDetails = async () => {
    try {
      const response = await doctorService.getDocotorDetails(doctorId);

      setDetails(response.data.doctor);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const getRequested = async () => {
    try {
      const res = await homeServices.getRequestedData(userId);
      setUserData(res.data.home);
    } catch (err) {
      console.log(err);
    }
  };
  const preferences = [
    {
      name: "Texting",
      time: "09:00 AM - 10:00 PM",
      price: "499",
      icon: "chatbox-outline",
      color: "#f83458",
    },
    {
      name: "Appointment",
      time: "09:00 AM - 10:00 PM",
      price: "999",
      icon: "calendar-outline",
      color: "#18d59b",
    },
    // {
    //   name: "Audio Call",
    //   time: "09:00 AM - 10:00 PM",
    //   price: "999",
    //   icon: "call-outline",
    //   color: "#18d59b",
    // },
    {
      name: "Video Call",
      time: "09:00 AM - 10:00 PM",
      price: "1299",
      icon: "videocam-outline",
      color: "#1c73f4",
    },
  ];
  const seletedPreference = (item) => {
    setActivePreference(item?.name);
    setPrice(item.price);
  };
  const save = () => {
    if (!issue) {
      setModalVisible(true);
      setError("Please enter your health issue");
    } else if (!activePreference) {
      setModalVisible(true);
      setError("Please choose preference");
    } else {
      let data = {
        desease: issue,
        preference: activePreference,
        userId: userId,
        amount: price,
        doctorId: doctorId,
      };
      if (activePreference == "Appointment") {
        navigation.push("Appointment", {
          doctorId: doctorId,
          data: data,
        });
      } else if (activePreference == "Video Call") {
        navigation.push("CallPayment", {
          doctorId: doctorId,
          data: data,
        });
      } else {
        navigation.push("CallPayment", {
          doctorId: doctorId,
          data: data,
        });
      }
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Ionicons
            onPress={() => navigation.goBack()}
            style={styles.arrow}
            name="chevron-back-outline"
          />
          <Text style={styles.topTitle}>{details?.doctor_Name}</Text>
          <Text></Text>
        </View>
        <View style={styles.bgOuter}>
          <View style={styles.confirm}>
            <View style={styles.control}>
              <TextInput
                onChangeText={(text) => {
                  setIssue(text);
                }}
                style={styles.textarea}
                placeholder="Type your health issue"
                multiline={true}
                placeholderTextColor={"#cbd7e6"}
              />
            </View>
            <Text style={styles.heading}>Select Preferences</Text>

            {preferences.map((item, i) => {
              return (
                <TouchableOpacity
                  onPress={() => seletedPreference(item)}
                  style={
                    activePreference == item?.name
                      ? styles.adetails
                      : styles.details
                  }
                  key={i}
                >
                  <View style={styles.outer}>
                    <Text
                      style={
                        activePreference == item?.name
                          ? styles.aradio
                          : styles.radio
                      }
                    ></Text>
                    <View style={styles.inner}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Ionicons
                          style={
                            activePreference == item?.name
                              ? styles.aicon
                              : styles.icon
                          }
                          color={item.color}
                          name={item.icon}
                        />
                        <Text
                          style={
                            activePreference == item?.name
                              ? styles.atitle
                              : styles.title
                          }
                        >
                          {item.name}
                        </Text>
                      </View>
                      <Text
                        style={
                          activePreference == item?.name
                            ? styles.adesc
                            : styles.desc
                        }
                      >
                        {item.time}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={
                      activePreference == item?.name
                        ? styles.aprice
                        : styles.price
                    }
                  >
                    ₹{item.price}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => save()} style={styles.buttonGreen}>
            <Text style={styles.buttonWhiteText}>Save & Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModal(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Ionicons style={styles.warnig} name="alert-circle" />
            </View>
            <Text style={styles.modalHeading}>Warning..!</Text>
            <Text style={styles.modalText}>{error}</Text>
            <TouchableOpacity
              style={styles.buttonok}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonokText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555fd2",
  },
  bgOuter: {
    backgroundColor: "#eff4fa",
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    resizeMode: "cover",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    color: "#193469",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  desc: {
    color: "#7686a7",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  adesc: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  confirm: {
    marginBottom: 10,
  },
  title: {
    color: "#193469",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 8,
  },
  atitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 8,
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

  topBar: {
    flexDirection: "row",
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
  textarea: {
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#7788a6",
    borderColor: "#d1dce9",
    borderWidth: 1,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 30,
  },
  details: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 18,
    marginBottom: 20,
    justifyContent: "space-between",
    borderRadius: 15,
    elevation: 50,
    shadowColor: "#d7e9ff",
    width: "100%",
    alignItems: "center",
  },
  adetails: {
    flexDirection: "row",
    backgroundColor: "#ff6f3b",
    padding: 18,
    marginBottom: 20,
    justifyContent: "space-between",
    borderRadius: 15,
    elevation: 50,
    shadowColor: "#d7e9ff",
    alignItems: "center",
    width: "100%",
    alignItems: "center",
  },
  price: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
    color: "#4ce4b1",
  },
  aprice: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
  },
  outer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  inner: {
    flexDirection: "column",
  },
  radio: {
    marginRight: 18,
    borderColor: "#bfc4d8",
    borderWidth: 1,
    width: 22,
    height: 22,
    borderRadius: 100,
  },
  aradio: {
    marginRight: 18,
    borderColor: "#fff",
    borderWidth: 1,
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 22,
  },
  aicon: {
    fontSize: 22,
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000099",
    padding: 35,
  },
  modalView: {
    backgroundColor: "#fff",
    padding: 25,
    borderWidth: 0,
    borderRadius: 15,
  },
  modalHeading: {
    color: "#193469",
    fontSize: 20,
    marginBottom: 3,
    textAlign: "center",
    lineHeight: 30,
    fontFamily: "Poppins_600SemiBold",
  },
  modalText: {
    color: "#7686a7",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginBottom: 12,
  },
  warnig: {
    fontSize: 60,
    textAlign: "center",
    color: "#ffc12e",
    marginBottom: 5,
  },
  buttonok: {
    backgroundColor: "#4ce4b1",
    padding: 8,
    borderRadius: 100,
    width: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 5,
  },
  buttonokText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
