import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Help = ({  navigation }) => {
  return (
    <ScrollView style={styles.bgBlue}>
      <View style={styles.topBar}>
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.arrow}
          name="chevron-back-outline"
        />
        <Text style={styles.topTitle}>Help</Text>
        <Text></Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.out}>
        <Text style={styles.title}>When Do We Collect Information</Text>
        <Text style={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverrmaecenas accumsan lacus vel facilisis. 
          </Text>

        </View>
        <View style={styles.out}>
        <Text style={styles.title}>What We Use Your Personal Data For</Text>
        <Text style={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverrmaecenas accumsan lacus vel facilisis. 
          </Text>

        </View>
        <View style={styles.out}>
        <Text style={styles.title}>How Do We Protect Information?</Text>
        <Text style={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverrmaecenas accumsan lacus vel facilisis. 
          </Text>

        </View>
        </SafeAreaView>
    </ScrollView>
  );
};

export default Help;

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
  title: {
    fontSize: 17,
    color: "#193469",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 5,
  },
  desc: {
    color: "#62729b",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: 0,
    lineHeight: 24,
    textAlign: "left",
  },
  out:{
    marginBottom:30
  }
});
