import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  BackHandler,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import doctorService from "../services/doctorService";
import Swiper from "react-native-swiper";
import LottieView from "lottie-react-native";
import Loader from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hostUrl } from "../services/envService";
import homeServices from "../services/homeServices";
import moment from "moment";

const { height, width } = Dimensions.get("window");
export default function HomeSlide({ route, navigation }) {
  const [specialist, setSpecialist] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoding] = React.useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getUser();
    getSpecialist();
    getDoctors();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const getSpecialist = async () => {
    try {
      const res = await doctorService.getAllSpecialist();
      setSpecialist(res.data.specialist);
      setTimeout(async () => {
        setLoding(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const getDoctors = async () => {
    try {
      const res = await doctorService.allDocotors();
      const response = res.data.doctor.filter((item) => item.rating >= 4.5);
      const topDoctors = response.slice(0, 3);
      setDoctors(topDoctors);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(userData?.user);
      allAppointments(userData?.user?._id);
    } catch (error) {
      console.log(error);
    }
  };
  const allAppointments = async (id) => {
    try {
      const res = await homeServices.getAllAppointments(id);
      let response = res?.data?.appointments;
      let appointmentData = response.filter((x) => x.active == true);
      setAppointments(appointmentData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <Loader visible={loading} />
      <View style={styles.container}>
        <View style={styles.topBg}>
          <View style={styles.sec1}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text style={styles.wtitle}>
                  Hi, {user?.name?.split(" ").pop()}
                </Text>
                <Text style={styles.wtext}>How Are You Today?</Text>
              </View>
            </View>
            {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image 
              style={styles.image}
              source={require("../../assets/doctor-1.jpg")}
            ></Image>
            </TouchableOpacity> */}
            <Text style={styles.subtext}>
              <Ionicons
                onPress={() => navigation.openDrawer()}
                name="menu-outline"
                size={35}
                style={{ marginRight: 5, color: "#fff" }}
              />
            </Text>
          </View>

          <View style={{ marginBottom: 0 }}>
            {/* <Text style={styles.title}>Let's Find Your Doctor</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Search here..."
              placeholderTextColor="#cfd8e1"
            />
            <Ionicons
              name="search-outline"
              size={26}
              color="#cfd8e1"
              style={{ position: "absolute", top: 14, right: 20 }}
            />
          </View>
          {appointments && appointments.length > 0 ? (
            <View style={{ marginTop: 25 }}>
              <Text style={styles.wtitle}>Upcoming appointments</Text>
              <Swiper style={styles.wrapper1} autoplay={true} loop={true}>
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
              </Swiper>
            </View>
          ) : (
            <Text style={{ marginTop: -15 }}></Text>
          )}
        </View>

        <View style={styles.innerOut}>
          <Swiper style={styles.wrapper} autoplay={true} loop={true}>
            <View style={styles.slide1}>
              <View style={styles.text_outer}>
                <Text style={styles.slideText}>
                  Join Us Forever To Get Help From Anywhere
                </Text>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btn_text}>About Us</Text>
                </TouchableOpacity>
              </View>
              <Image
                style={styles.slideimage}
                source={require("../../assets/pngwing2.png")}
              ></Image>
            </View>
            <View style={styles.slide2}>
              <View style={styles.text_outer}>
                <Text style={styles.slideText}>
                  Contact To Get Our Telehealth Medical Services
                </Text>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btn_text}>+5984 654 324</Text>
                </TouchableOpacity>
              </View>

              <Image
                style={styles.slideimage}
                source={require("../../assets/pngwing1.png")}
              ></Image>
            </View>
            <View style={styles.slide3}>
              <View style={styles.text_outer}>
                <Text style={styles.slideText}>
                  We're Providing Best Services To Our Customers
                </Text>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btn_text}>About Us</Text>
                </TouchableOpacity>
              </View>

              <Image
                style={styles.slideimage}
                source={require("../../assets/pngwing.png")}
              ></Image>
            </View>
          </Swiper>

          <View style={styles.cate_Outer}>
            <Text style={styles.title1}>Our Services</Text>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -5,
              }}
            >
              <View
                style={{
                  height: height / 4.4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FlatList
                  data={specialist}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  onScroll={(e) => {
                    const x = e.nativeEvent.contentOffset.x;
                    setCurrentIndex((x / width).toFixed(0));
                  }}
                  horizontal
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: width - 205,
                          height: height / 4.4,
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.push("DoctorList", {
                              doctorId: item._id,
                              userId: user?._id,
                            })
                          }
                          style={[styles[`cate${index}`], styles.cates]}

                          // style=
                          // {{
                          //   width: "94%",
                          //   height: "90%",
                          //   backgroundColor: "#e0e2ff",
                          //   borderRadius: 15,
                          //   padding: 10,
                          //   justifyContent: "center",
                          //   alignItems: "center",
                          // }}
                        >
                          <View style={styles.imge_out}>
                            <Image
                              style={styles.catImag}
                              source={{ uri: hostUrl + item.image }}
                            ></Image>
                          </View>
                          <Text style={styles.catName}>{item.name}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
              {/* <View
                style={{
                  flexDirection: "row",
                  width: width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {data.map((item, index) => {
                  return (
                    <View key={index}
                      style={{
                        width: currentIndex == index ? 50 : 8,
                        height: currentIndex == index ? 10 : 8,
                        borderRadius: currentIndex == index ? 5 : 4,
                        backgroundColor:
                          currentIndex == index ? "green" : "gray",
                        marginLeft: 5,
                      }}
                    ></View>
                  );
                })}
              </View> */}
            </View>
          </View>
          <View style={styles.bgOuter}>
            <View style={styles.topsec}>
              <Text style={styles.title1}>Top Doctors</Text>
              <Text
                style={styles.seeAll}
                onPress={() =>
                  navigation.push("AllDoctors", {
                    userId: user?._id,
                  })
                }
              >
                See All
              </Text>
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
                          userId: user?._id,
                        })
                      }
                    >
                      <Image
                        style={styles.image1}
                        source={{ uri: hostUrl + list.profile }}
                      ></Image>
                      <View style={styles.content}>
                        <Text style={styles.title2}>
                          Dr. {list.doctor_Name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.text}>{list.specialist}</Text>
                          <View style={styles.ratings}>
                            <Ionicons name="star" size={15} color="#ffd500" />
                            <Text style={styles.rating}>{list.rating}</Text>
                          </View>
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

            {/* <LottieView
            autoPlay
            loop
            speed={2}
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#fff",
              color:"red"
            }}
            source={require("../../assets/grid.json")}
          /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff4fa",
  },
  sec1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#555fd2",
  },
  topBg: {
    backgroundColor: "#555fd2",
    padding: 20,
  },

  image: {
    width: 50,
    height: 50,
    overflow: "hidden",
    borderRadius: 100,
    // marginRight: 14,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  wtext: {
    fontSize: 14,
    color: "#fff",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_500Medium",
    opacity: 0.8,
    marginTop: -5,
  },
  wtitle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
  },
  bgOuter: {
    // backgroundColor: "#eff4fa",
    // marginLeft: -20,
    // marginRight: -20,
    // padding: 30,
    // borderRadius: 55,
    // height: "100%",
  },
  input: {
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 12,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#193469",
    backgroundColor: "#fff",
  },
  box: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    textAlign: "center",
    borderRadius: 100,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cate_Outer: {
    marginTop: 30,
    marginBottom: 20,
  },
  cate: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 30,
    flexWrap: "wrap",
  },
  wrapper: {
    height: 160,
  },
  wrapper1: {
    height: 140,
  },
  slide: {
    overflow: "hidden",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "46%",
  },
  catName: {
    fontSize: 14,
    color: "#193469",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  title1: {
    fontSize: 20,
    color: "#193469",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
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
    flex: 1,
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
    fontFamily: "Nunito_400Regular",
    textTransform: "capitalize",
  },
  rating: {
    fontSize: 14,
    color: "#193469",
    marginLeft: 5,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: -5,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
  },
  innerOut: {
    padding: 18,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdbf5e",
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6f5b",
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ce4b1",
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
  },
  text_outer: {
    width: "55%",
  },
  slideText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
  },
  slideimage: {
    width: "54%",
    height: 250,
    marginTop: 120,
    marginRight: -40,
  },
  btn: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 100,
  },
  btn_text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#4ce4b1",
    textAlign: "center",
    textTransform: "uppercase",
  },
  imge_out: {
    backgroundColor: "#fff",
    width: 75,
    height: 75,
    borderRadius: 100,
    marginBottom: 10,
    alignItems: "center",
  },
  catImag: {
    width: 60,
    height: 60,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 14,
  },
  cates: {
    width: "94%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cate0: {
    backgroundColor: "#fff7ea",
  },
  cate1: {
    backgroundColor: "#ecf9ff",
  },
  cate2: {
    backgroundColor: "#feedee",
  },
  cate3: {
    backgroundColor: "#d6fee0",
  },
  cate4: {
    backgroundColor: "#fff7ea",
  },
  cate5: {
    backgroundColor: "#ecf9ff",
  },
  cate6: {
    backgroundColor: "#feedee",
  },
  cate7: {
    backgroundColor: "#d6fee0",
  },
  cate8: {
    backgroundColor: "#fff7ea",
  },
  cate9: {
    backgroundColor: "#ecf9ff",
  },
  cate10: {
    backgroundColor: "#feedee",
  },
  cate11: {
    backgroundColor: "#d6fee0",
  },
  topsec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  seeAll: {
    color: "#cad0e0",
    fontSize: 15,
    marginBottom: 0,
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
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
