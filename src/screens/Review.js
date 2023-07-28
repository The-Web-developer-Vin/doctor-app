import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  ToastAndroid,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import doctorService from "../services/doctorService";
import Ionicons from "@expo/vector-icons/Ionicons";
import { hostUrl } from "../services/envService";
import Loader from "./Loader";
import LottieView from "lottie-react-native";
import Home from "./Index";

const Review = ({ route, navigation }) => {
  const { doctorId } = route.params;
  const { userId } = route.params;
  const [activePreference, setActivePreference] = useState();
  const [details, setDetails] = useState();
  const [givenReview, setGivenReview] = useState("");
  const [feedBack, setFeedBack] = useState("");
  const ratingCompleted = (rating) => {
    setGivenReview(rating);
  };
  const [loading, setLoding] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [warnModal, setWarnModal] = useState(false);


  useEffect(() => {
    getDetails();
  }, []);

  const sendReview = async () => {
    setLoding(true);
    if (givenReview.length == 0 || feedBack.length == 0) {
      setWarnModal(true)
      setLoding(false);
    } else {
      try {
        let obj = {
          rating: givenReview,
          message: feedBack,
          userId: userId,
          doctorId: doctorId,
          recommend: activePreference,
        };
        const res = await doctorService.giveRating(obj);
        if (res) {
          setTimeout(async () => {
            setLoding(false);
            setModalVisible(true);
          }, 1000);
        }
      } catch (err) {
        console.log(err);
        setLoding(false);
      }
    }
  };
  const getDetails = async () => {
    try {
      const response = await doctorService.getDocotorDetails(doctorId);
      setDetails(response.data.doctor);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const preferences = [
    {
      name: "Yes",
    },
    {
      name: "No",
    },
  ];
  const seletedPreference = (item) => {
    setActivePreference(item?.name);
  };
  const goToHome = () => {
    setModalVisible(false);
    navigation.push("Home");
  };

  return (
    <ScrollView style={styles.bgBlue}>
      <Loader visible={loading} />
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Review</Text>
        <Text></Text>
      </View>

      <View style={styles.container}>
        <View style={styles.modalView1}>
          <View style={styles.DoList}>
            <Image
              style={styles.Doimage}
              source={{ uri: hostUrl + details?.profile }}
            ></Image>
            <Text style={styles.heading}>How was your experience?</Text>
          </View>
          <View style={styles.Doratings}>
            <AirbnbRating
              count={5}
              reviews={false}
              defaultRating={0}
              size={24}
              onFinishRating={ratingCompleted}
              starStyle={{ margin: 8, color: "#949fbb" }}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.heading2}>Feedback</Text>
            <TextInput
              style={styles.textarea}
              placeholder="Write here..."
              multiline={true}
              placeholderTextColor={"#cbd7e6"}
              onChangeText={(value) => setFeedBack(value)}
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.heading2}>
              Do you recommend Dr.{details?.doctor_Name?.split(" ")[0]} ?
            </Text>
            <View style={styles.recommed}>
              {preferences.map((item, i) => {
                return (
                  <Pressable
                    onPress={() => seletedPreference(item)}
                    style={styles.details}
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
                          <Text style={styles.title}>{item.name}</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.modalBtns}>
            <TouchableOpacity
              style={styles.buttonGreen}
              onPress={() => sendReview()}
            >
              <Text style={styles.buttonWhiteText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        visible={warnModal}
        transparent={true}
        onRequestClose={() => setModal(!warnModal)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              {/* <LottieView
                autoPlay
                loop
                speed={1}
                style={{
                  width: 260,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: -65,
                  marginTop: -20,
                }}
                source={require("../../assets/thank-review.json")}
              /> */}

              <Ionicons style={styles.warnig} name="alert-circle" />
            </View>
            <Text style={styles.modalHeading}>Warning..!</Text>
            <Text style={styles.modalText}>Please give me your Rating and Feedback</Text>
            <TouchableOpacity
              style={styles.buttonok}
              onPress={() => setWarnModal(false)}
            >
              <Text style={styles.buttonokText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              <LottieView
                autoPlay
                loop
                speed={1}
                style={{
                  width: 260,
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: -65,
                  marginTop: -20,
                }}
                source={require("../../assets/thank-review.json")}
              />

              {/* <Ionicons style={styles.warnig} name="alert-circle" /> */}
            </View>
            <Text style={styles.modalHeading}>Thank You..!</Text>
            <Text style={styles.modalText}>for your positive comments</Text>
            <TouchableOpacity
              style={styles.buttonok}
              onPress={() => goToHome()}
            >
              <Text style={styles.buttonokText}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Review;

const styles = StyleSheet.create({
  bgBlue: {
    flex: 1,
    backgroundColor: "#555fd2",
  },
  topBar: {
    flexDirection: "row",
    // justifyContent:"space-between",
    paddingTop: 30,
    paddingBottom: 20,
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
  },
  heading: {
    fontSize: 22,
    color: "#193469",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  heading2: {
    fontSize: 18,
    color: "#193469",
    textAlign: "left",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 6,
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
  },
  control: {
    marginBottom: 20,
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
  buttonCancleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#a0a9c6",
    textAlign: "center",
  },
  DoList: {
    flexDirection: "column",
    marginBottom: 0,
    alignItems: "center",
  },
  Doimage: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginBottom: 15,
    borderWidth: 5,
    borderColor: "#fff",
  },
  Doratings: {
    marginTop: -50,
    marginBottom: 30,
  },
  details: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    borderRadius: 15,
    elevation: 50,
    shadowColor: "#d7e9ff",
    alignItems: "center",
    alignItems: "center",
    marginRight: 35,
  },

  title: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#193469",
  },

  outer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  radio: {
    marginRight: 10,
    borderColor: "#bfc4d8",
    borderWidth: 3,
    width: 18,
    height: 18,
    borderRadius: 100,
  },
  aradio: {
    marginRight: 10,
    borderColor: "#4ce4b1",
    borderWidth: 3,
    width: 18,
    height: 18,
    borderRadius: 100,
    backgroundColor: "#4ce4b1",
  },
  recommed: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000099",
    padding: 30,
  },
  modalView: {
    backgroundColor: "#fff",
    padding: 25,
    borderWidth: 0,
    borderRadius: 15,
  },
  modalHeading: {
    color: "#193469",
    fontSize: 24,
    marginBottom: 5,
    textAlign: "center",
    lineHeight: 30,
    fontFamily: "Poppins_600SemiBold",
  },
  modalText: {
    color: "#7686a7",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginBottom: 20,
    lineHeight:24
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
