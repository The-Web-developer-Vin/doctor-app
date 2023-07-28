import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import homeServices from "../services/homeServices";
import moment from "moment";
import Loader from "./Loader";

export default function Schedule({ route, navigation }) {
  const { userId } = route.params;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoding] = React.useState(true);

  useEffect(() => {
    allAppointments();
  }, []);

  const allAppointments = async () => {
    try {
      const res = await homeServices.getAllAppointments(userId);
      let response = res?.data?.appointments;
      setLoding(false);
      // let appointmentData = response.filter((x) => x.active == true);
      setAppointments(response);
    } catch (error) {
      console.log(error);
      setLoding(false);
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
        <Text style={styles.topTitle}>Schedules</Text>
        <Text></Text>
      </View>
      <SafeAreaView style={styles.container}>
        {appointments && appointments.length > 0 ? (
          <View >
            {appointments.map((list, index) => {
              return (
                <View style={styles.appointment_list} key={index}>
                  <View style={styles.appointTime}>
                    <Text style={styles.big}>
                      {moment(list?.date).format("ddd")}
                    </Text>
                    <Text style={styles.medium}>
                      {moment(list?.date).format("D")}
                    </Text>
                  </View>
                  <View style={styles.appContent}>
                    <Text style={styles.apTime}>{list?.time}</Text>
                    <Text style={styles.apDr}>
                      Dr. {list?.doctorId?.doctor_Name}
                    </Text>
                    <Text style={styles.apDes}>{list?.desease}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <Text></Text>
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
    minHeight: 650,
    resizeMode: "cover",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 25,
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
  appointment_list: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
  },
  appointTime: {
    backgroundColor: "#4ce4b1",
    borderRadius: 15,
    borderColor: "#ddd",
    padding: 18,
    alignItems: "center",
    width: 75,
    marginRight: 15,
    lineHeight: 82,
    height: 82,
  },
  big: {
    color: "#c7fbe9",
    fontSize: 14,
    marginBottom: -7,
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
  },
  medium: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 0,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "uppercase",
  },
  appContent: {
    flex: 1,
  },
  apTime: {
    color: "#4ce4b1",
    fontSize: 14,
    marginBottom: -4,
    fontFamily: "Poppins_500Medium",
    textTransform: "uppercase",
  },
  apDes: {
    color: "#cad0e0",
    fontSize: 14,
    marginBottom: 0,
    fontFamily: "Poppins_400Regular",
    lineHeight: 17,
  },
  apDr: {
    color: "#193469",
    fontSize: 17,
    marginBottom: 6,
    fontFamily: "Poppins_600SemiBold",
    textTransform: "capitalize",
  },
});
