import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Pressable,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Rating, AirbnbRating } from "react-native-ratings";
import doctorService from "../services/doctorService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./Loader";
// import ZegoUIKitPrebuiltCall, {
//   ONE_ON_ONE_VIDEO_CALL_CONFIG,
// } from "@zegocloud/zego-uikit-prebuilt-call-rn";
import AgoraUIKit from "agora-rn-uikit";

export default function VideoCall({ route, navigation }) {
  const { data } = route.params;
  const [details, setDetails] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewModal, setModalReviewModal] = useState(false);
  const [givenReview, setGivenReview] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const [loading, setLoding] = React.useState(false);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();

  const ratingCompleted = (rating) => {
    setGivenReview(rating);
  };

  useEffect(() => {
    getDetails();
    getUser();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(userData);
      setUserId(userData?.id);
    } catch (error) {
      console.log(error);
    }
  };
  const getDetails = async () => {
    try {
      const response = await doctorService.getDocotorDetails(data?.doctorId);

      setDetails(response.data.doctor);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const randomUserID = String(Math.floor(Math.random() * 100000));
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
    appId: "73c0e5ebacd548679c4cc54828496f88",
    channel: "test",
  };
  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.push("Review", {
        doctorId: data?.doctorId,
        userId: data?.userId,
      });
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <Loader visible={loading} />
      {/* <ZegoUIKitPrebuiltCall
        appID={25027312}
        appSign="f4a63dd6698a958307a82b2892f6387e3cbab56ec504eb8e17724d3e01f0efb0"
        userID={randomUserID}
        userName={"user_" + randomUserID}
        callID="testCallID"
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onHangUp: () => navigation.navigate("Review", { doctorId: doctorId }),
        }}
      /> */}
      {videoCall ? (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={rtcCallbacks}
        />
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    padding: 30,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topHeading: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "Nunito_600SemiBold",
  },
  VideoView: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonBorder: {
    width: 58,
    height: 58,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
    alignSelf: "stretch",
  },
  buttonEnd: {
    backgroundColor: "#f83636",
    borderRadius: 100,
    alignSelf: "stretch",
    width: 160,
    height: 55,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontFamily: "Nunito_700Bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000099",
    padding: 30,
  },
  modalView: {
    backgroundColor: "#fff",
    padding: 30,
    borderWidth: 0,
    borderRadius: 4,
  },
  modalHeading: {
    color: "#37474e",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 35,
    fontFamily: "Nunito_700Bold",
  },
  modalText: {
    color: "#607c8a",
    fontSize: 18,
    marginBottom: 35,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "Nunito_400Regular",
  },
  buttonGreen: {
    backgroundColor: "#07da5f",
    alignSelf: "stretch",
    padding: 14,
    borderRadius: 100,
    width: "46%",
  },
  buttonWhiteText: {
    // fontFamily: "  Nunito_700Bold",
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonNo: {
    borderColor: "#8fa4ad",
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 12,
    borderRadius: 100,
    width: "46%",
  },
  buttonNoText: {
    fontSize: 18,
    color: "#8fa4ad",
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "Nunito_700Bold",
  },
  endb: {
    fontFamily: "Nunito_700Bold",
  },
  DoList: {
    flexDirection: "row",
    marginBottom: 0,
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
    textTransform: "capitalize",
  },
  Dotext: {
    color: "#07da5f",
    fontSize: 18,
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
    justifyContent: "center",
    marginBottom: 20,
    marginTop: -30,
  },
  textarea: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 15,
    paddingBottom: 12,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    height: 100,
    textAlignVertical: "top",
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
});
