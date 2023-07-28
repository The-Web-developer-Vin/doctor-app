import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import homeServices from "../services/homeServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

const Notifications = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [appointments, setAppointments] = useState();
  useEffect(() => {
    getUser();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      allAppointments(currentUser.user);
    } catch (error) {
      console.log(error);
    }
  };
  const allAppointments = async (user) => {
    try {
      const res = await homeServices.getAllAppointments(user._id);
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#07da5f"]}
        />
      }
    >
      <SafeAreaView style={styles.container}>
        {appointments && appointments?.length > 0 ? (
          appointments.map((list, i) => {
            return (
              <View style={styles.list} key={i}>
                <TouchableOpacity style={styles.inner}>
                  <View>
                    <Text style={styles.title}>{list.name}</Text>
                    <View style={styles.content}>
                      <Text style={styles.text}>{list.desease.name}</Text>
                      <Text style={styles.text}>
                        {" "}
                        <Ionicons
                          name="location-outline"
                          size={20}
                          style={{ marginRight: 5 }}
                        />{" "}
                        {list.location}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={styles.list}>
            <Text style={styles.title}>No Data Found...!</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  list: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  inner: {
    flexDirection: "row",
  },
  content: {
    marginRight: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  title: {
    color: "#37474e",
    fontSize: 19,
    marginBottom: 0,
    fontFamily: "Nunito_600SemiBold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  text: {
    color: "#8fa4ae",
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Nunito_400Regular",
    textTransform: "capitalize",
    marginRight: 20,
  },
  map: {
    color: "#8fa4ae",
    fontSize: 16,
    textAlign: "left",
    marginLeft: -4,
    fontFamily: "Nunito_400Regular",
    textTransform: "capitalize",
  },
});
