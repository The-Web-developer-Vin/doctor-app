import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import doctorService from "../services/doctorService";
import Calendar from "./Calendar";
import Loader from "./Loader";
import homeServices from "../services/homeServices";

export default function Appointment({ route, navigation }) {
  const { doctorId } = route.params;
  const { data } = route.params;
  const [details, setDetails] = useState();
  const [session, setSession] = useState(true);
  const [time, setTime] = useState(false);
  const [activeTime, setActiveTime] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [patientName, setPatientName] = useState();
  const [loading, setLoding] = React.useState(false);

  const mrngTime = ["07:00 am", "08:00 am", "09:00 am", "10:00 am", "11:00 am"];
  const afterTime = [
    "03:00 pm",
    "04:00 pm",
    "05:00 pm",
    "06:00 pm",
    "07:00 pm",
  ];

  useEffect(() => {
    getDetails();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
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
  const setSeasons = (data) => {
    if (data == "morning") {
      setSession(true);
    } else {
      setSession(false);
    }
  };
  const seletedTime = (item) => {
    setActiveTime(item);
  };
  const Continue = async () => {
    if (!patientName) {
      setModalVisible(true);
      setError("Please enter Patient name");
    } else if (!selectedDate || !activeTime) {
      setModalVisible(true);
      setError("Please choose Date & Time");
    } else {
      let sendObj = {
        name: patientName,
        desease: data.desease,
        userId: data.userId,
        doctorId: doctorId,
        date: selectedDate,
        time: activeTime,
        preference: data.preference,
        amount: data.amount,
      };
      navigation.push("CallPayment", {
        data: sendObj,
      });

      // try {
      //   const res = await homeServices.desease(sendObj);
      //   if (res.data) {
      //     setTimeout(async () => {
      //       navigation.push("CallPayment", {
      //         data: sendObj,
      //       });
      //       setLoding(false);
      //     }, 1000);
      //   }
      // } catch (error) {
      //   console.log(error);
      //   setLoding(false);
      // }
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
        <Text style={styles.topTitle}>Appointment</Text>
        <Text></Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#a0aac5"
            style={{ position: "absolute", top: 13, left: 0 }}
          />
          <TextInput
            onChangeText={(text) => {
              setPatientName(text);
            }}
            style={styles.input}
            placeholder="Enter Patient Name"
            placeholderTextColor="#a0aac5"
          />
        </View>

        <View style={styles.container1}>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </View>
        <View style={styles.seasons}>
          <TouchableOpacity
            onPress={() => setSeasons("morning")}
            style={session ? styles.activeTab : styles.tab}
          >
            <Ionicons
              style={session ? styles.activeIcon : styles.icon}
              name="sunny-outline"
              size={24}
            />
            <Text style={session ? styles.activeTitle : styles.setitle}>
              Morning
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSeasons("eveing")}
            style={session ? styles.tab : styles.activeTab}
          >
            <Ionicons
              style={session ? styles.icon : styles.activeIcon}
              name="moon-outline"
              size={24}
            />
            <Text style={session ? styles.setitle : styles.activeTitle}>
              Evening
            </Text>
          </TouchableOpacity>
        </View>
        {session ? (
          <View style={styles.timesOut}>
            {mrngTime.map((time, i) => {
              return (
                <TouchableOpacity
                  onPress={() => seletedTime(time)}
                  style={activeTime == time ? styles.activeTimes : styles.times}
                  key={i}
                >
                  <Text
                    style={
                      activeTime == time ? styles.actieTtext : styles.ttext
                    }
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.timesOut}>
            {afterTime.map((time, i) => {
              return (
                <TouchableOpacity
                  onPress={() => seletedTime(time)}
                  style={activeTime == time ? styles.activeTimes : styles.times}
                  key={i}
                >
                  <Text
                    style={
                      activeTime == time ? styles.actieTtext : styles.ttext
                    }
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <TouchableOpacity onPress={() => Continue()} style={styles.buttonGreen}>
          <Text style={styles.buttonWhiteText}>Continue</Text>
        </TouchableOpacity>
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
  bgBlue: {
    flex: 1,
    backgroundColor: "#555fd2",
  },
  container: {
    flex: 1,
    backgroundColor: "#eff4fa",
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    minHeight: 660,
    resizeMode: "cover",
    paddingTop: 30,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 25,
    alignSelf: "stretch",
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
    fontSize: 17,
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "Nunito_400Regular",
  },
  title: {
    color: "#07da5f",
    fontSize: 22,
    marginBottom: 15,
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
    borderRadius: 5,
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
    textTransform: "capitalize",
  },
  Dotext: {
    color: "#07da5f",
    fontSize: 18,
    marginBottom: 5,
    fontStyle: "italic",
    fontFamily: "Nunito_600SemiBold",
    textTransform: "capitalize",
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
  input: {
    borderColor: "#d0d8e5",
    borderBottomWidth: 1,
    paddingLeft: 38,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 14,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#01033e",
    borderStyle: "solid",
    height: 54,
  },
  seasons: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 35,
    fontSize: 20,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#f1f6fc",
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 35,
    color: "#9fabc5",
  },
  activeIcon: {
    width: 35,
    fontSize: 20,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 35,
    color: "#4ce4b1",
  },
  activeTab: {
    backgroundColor: "#4ce4b1",
    borderRadius: 10,
    padding: 8,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
  },
  activeTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 0,
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
  },
  setitle: {
    color: "#9fabc3",
    fontSize: 16,
    marginBottom: 0,
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
  },
  timesOut: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 40,
  },
  times: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 4,
    width: "30.7%",
  },
  ttext: {
    color: "#193469",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    lineHeight: 22,
  },
  activeTimes: {
    backgroundColor: "#4ce4b1",
    padding: 10,
    borderRadius: 5,
    margin: 4,
    width: "30.7%",
  },
  actieTtext: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    lineHeight: 22,
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
