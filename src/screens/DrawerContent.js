import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hostUrl } from "../services/envService";

const DrawerContent = ({ navigation }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.push("Welcome");
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      setUser(currentUser.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.sec1}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {user.profile ? (
            <Image
              style={styles.image}
              source={{ uri: hostUrl + user.profile }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("../../assets/profile.jpg")}
            />
          )}

          {/* <Image
            style={styles.image}
            source={require("../../assets/doctor-1.jpg")}
          ></Image> */}
          <View>
            <Text style={styles.title}>{user?.name?.split(" ").pop()}</Text>
            <Text style={styles.wtext}>{user?.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate("HomeSlide")}
        >
          <Ionicons
            name="planet-outline"
            size={25}
            color={"#bec5d8"}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.listText}>Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate("Schedule", {
            userId: user?._id,
          })}
        >
          <Ionicons
            name="newspaper-outline"
            size={25}
            color={"#bec5d8"}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.listText}>Appointments</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons
            name="person-outline"
            size={25}
            color={"#bec5d8"}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.listText}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons
            name="settings-outline"
            size={25}
            color={"#bec5d8"}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.listText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate("Help")}
        >
          <Ionicons
            name="help-circle-outline"
            size={26}
            color={"#bec5d8"}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.listText}>Help</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={() => logOut()}>
          <Ionicons
            name="log-out-outline"
            size={26}
            color={"#bec5d8"}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.listText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  sec1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#555fd2",
    padding: 18,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    minHeight: 100,
  },
  list: {
    flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 18,
    paddingBottom: 15,
  },
  listText: {
    fontSize: 16,
    color: "#566c91",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_500Medium",
  },
  image: {
    width: 60,
    height: 60,
    overflow: "hidden",
    borderRadius: 100,
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: -6,
  },
  wtext: {
    fontSize: 14,
    color: "#fff",
    textAlign: "left",
    fontFamily: "Poppins_500Medium",
    opacity: 0.8,
  },
});
