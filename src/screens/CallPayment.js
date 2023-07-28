import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  TouchableHighlight,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import RazorpayCheckout from "react-native-razorpay";
import { Formik } from "formik";
import * as Yup from "yup";
import doctorService from "../services/doctorService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./Loader";
import LottieView from "lottie-react-native";
import homeServices from "../services/homeServices";

export default function CallPayment({ route, navigation }) {
  const { data } = route.params;
  const [loading, setLoding] = React.useState(false);
  const [reqData, setReqData] = React.useState(data);

  useEffect(() => {}, []);

  const razorpay = async () => {
    setLoding(true);
    let obj = {
      amount: reqData?.amount,
      userId: reqData?.userId,
    };
    try {
      const res = await doctorService.razorpayment(obj);
      if (res) {
        handlePayment(res.data);
        setLoding(false);
      }
    } catch (err) {
      console.log(err);
      setLoding(false);
    }
  };

  const handlePayment = (data) => {
    let options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.jpg",
      currency: "INR",
      key: "rzp_test_rrzcoUpUL92MBs",
      amount: data?.amount * 100,
      name: "Prasad",
      prefill: {
        email: "prasad.vinutnaa@gmail.com",
        contact: 8332861636,
        name: "Prasad",
      },
      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((res) => {
        ToastAndroid.show(
          "Your payment successfully received",
          ToastAndroid.LONG
        );

        if (reqData?.preference == "Texting") {
          navigation.push("Chat", {
            data: reqData,
          });
        } else if (reqData?.preference == "Video Call") {
          navigation.push("VideoCall", {
            data: reqData,
          });
        } else {
          CreateAppointment();
        }
      })
      .catch((error) => {
        alert(`Error: BAD_REQUEST_ERROR`);
      });
  };
  const CreateAppointment = async () => {
    try {
      const res = await homeServices.desease(reqData);
      const response = res?.data?.home;
      console.log("response", response);
      if (res.data) {
        setTimeout(async () => {
          navigation.push("BookingConfirmation", {
            userId: response?.userId,
          });
          setLoding(false);
        }, 1000);
      }
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
        <Text style={styles.topTitle}>Payment</Text>
        <Text></Text>
      </View>

      <View style={styles.container}>
        <View style={styles.confirm}>
          <LottieView
            autoPlay
            loop
            speed={1}
            style={{
              width: '100%',
              marginLeft: "auto",
              marginRight: "auto",
              marginTop:-20
            }}
            source={require("../../assets/payment.json")}
          />
          <Text style={styles.heading}>
            You have appointed for {data?.preference}
          </Text>
          {/* <Text style={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,Ut enim ad
            minim venia m, quis nostrud exercitation ullamco
          </Text> */}
        </View>

        <View style={styles.viewOut}>
          {/* <Text style={styles.lable}>Total Cost </Text> */}
          <Text style={styles.price}>₹{data?.amount}</Text>
        </View>
        {/* <View style={styles.viewOut}>
          <Text style={styles.heading1}>Request Details : </Text>
          <View style={styles.listView}>
            <Text style={styles.listTitle}>Patient Name</Text>
            <Text style={styles.desc1}>{reqData?.name}</Text>
          </View>
          <View style={styles.listView}>
            <Text style={styles.listTitle}>Desease</Text>
            <Text style={styles.desc1}>{reqData?.desease}</Text>
          </View>
          <View style={styles.listView}>
            <Text style={styles.listTitle}>Date & Time</Text>
            <Text style={styles.desc1}>
              {reqData?.date}, {reqData?.time}
            </Text>
          </View>

          
        </View> */}
        {/* <View style={styles.list}>
          <TouchableOpacity style={styles.inner}>
            <Image
              style={styles.image1}
              source={require("./../../assets/doctor.jpg")}
            ></Image>
            <View style={styles.content}>
              <Text style={styles.title2}>{doctorDetails?.doctor_Name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "73%",
                }}
              >
                <Text style={styles.text}>{doctorDetails?.specialist}</Text>
                <View style={styles.ratings}>
                  <Ionicons name="star" size={15} color="#ffd500" />
                  <Text style={styles.rating}>{doctorDetails?.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={styles.viewOut}>
          <TouchableOpacity
            onPress={() => razorpay()}
            style={styles.buttonGreen}
          >
            <Text style={styles.buttonWhiteText}>Pay & Continue</Text>
          </TouchableOpacity>
        </View>
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
    minHeight: 660,
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
  viewOut: {},
  price: {
    color: "#555fd2",
    fontSize: 70,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  
  },
  lable: {
    color: "#62729b",
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    marginBottom: 0,
    lineHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  method: {
    color: "#07da5f",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
  },
  block: {
    borderColor: "#07da5f",
    borderWidth: 2,
    borderRadius: 4,
    padding: 22,
    borderStyle: "solid",
    marginTop: 15,
  },

  textcard: {
    color: "#38474f",
    fontSize: 22,
    fontFamily: "Nunito_600SemiBold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000099",
    padding: 20,
  },
  modalView: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 6,
    paddingBottom: 40,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
  },
  modalHeading: {
    color: "#37474e",
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 28,
 
    
  },
  DoList: {
    flexDirection: "row",
    marginBottom: 35,
    alignItems: "center",
  },
  Doimage: {
    width: 65,
    height: 65,
    borderRadius: 100,
  },
  Docontent: {
    marginLeft: 20,
  },
  Dotitle: {
    color: "#37474e",
    fontSize: 19,
    marginBottom: 4,
    fontFamily: "Nunito_600SemiBold",
  },
  Dotext: {
    color: "#07da5f",
    fontSize: 18,
    fontStyle: "italic",
    fontFamily: "Nunito_600SemiBold",
  },

  Dorating: {
    fontSize: 18,
    color: "#8fa4ae",
    marginLeft: 5,
    fontFamily: "Nunito_600SemiBold",
  },
  Doratings: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 35,
  },
  textarea: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 18,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    minHeight: 100,
  },
  text: {
    color: "#607c8a",
    fontSize: 18,
    marginBottom: 15,
    letterSpacing: 1,
    fontFamily: "Nunito_600SemiBold",
  },
  NoText: {
    color: "#607c8a",
    fontSize: 18,
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
  },
  control: {
    marginBottom: 20,
  },
  control: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#37474e",
    fontFamily: "Nunito_600SemiBold",
    lineHeight: 24,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
  },
  decripiton: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#90a4ae",
    marginTop: 5,
  },
  errText: {
    fontSize: 17,
    color: "red",

    marginTop: 10,
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
  sucess: {
    width: 180,
    height: 180,
    marginTop: -5,
  },
  heading: {
    fontSize: 22,
    color: "#193469",
    textAlign: "center",
    lineHeight: 38,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
    marginTop:-30,
  },
  desc: {
    color: "#62729b",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: 40,
    lineHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  heading1: {
    fontSize: 17,
    color: "#193469",
    textAlign: "left",
    lineHeight: 34,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
  },
  desc1: {
    color: "#62729b",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
  },
  listTitle: {
    color: "#193469",
    fontSize: 15,
    marginBottom: 5,
    fontFamily: "Poppins_500Medium",
  },
  listView: {
    marginBottom: 8,
    paddingBottom: 8,
  },
  list: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 10,
    justifyContent: "space-between",
    borderRadius: 15,
    elevation: 20,
    shadowColor: "#d7e9ff",
    alignItems: "center",
    marginBottom: 30,
  },
  inner: {
    flexDirection: "row",
    width: "100%",
  },
  image1: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  content: {
    marginLeft: 16,
    marginRight: 0,
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
    fontSize: 16,
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
    fontFamily: "Nunito_400Regular",
    textTransform: "capitalize",
  },
  rating: {
    fontSize: 14,
    color: "#193469",
    marginLeft: 5,
    fontFamily: "Poppins_500Medium",
    marginBottom: -5,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
});
