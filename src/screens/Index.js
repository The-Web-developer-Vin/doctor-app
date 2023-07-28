import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  BackHandler,
  ToastAndroid,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import homeServices from "../services/homeServices";
import Loader from "./Loader";
import { Dropdown } from "react-native-element-dropdown";
import doctorService from "../services/doctorService";
import authService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { hostUrl } from "../services/envService";
import Swiper from "react-native-swiper";

export default function Home({ navigation }) {
  const [deseaseValue, setDeseaseValue] = useState();
  const [specialist, setSpecialist] = useState([]);
  const [loading, setLoding] = React.useState(false);
  const [user, setUser] = useState();

  const initialValues = {
    name: "",
    desease: "",
    location: "",
    descripition: "",
  };
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    desease: Yup.string(),
    location: Yup.string().required("Location  cannot be empty"),
    descripition: Yup.string(),
  });
  const userinfo = authService.userinfo;
  useEffect(() => {
    getSpecialist();
    getUser();
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
    } catch (error) {
      console.log(error);
    }
  };
  const selectDesease = (item) => {
    setDeseaseValue(item._id);
  };
  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(userData?.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <Loader visible={loading} />
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate("VideoCall", { doctorId: "566" })}
          style={styles.buttonGreenBorder}
        >
          <Text style={styles.buttonGreenText}>Very Urgent </Text>
        </Pressable>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { resetForm }) => {
            values.desease = deseaseValue;
            let sendObj = {
              ...values,
              userId: user?._id,
            };
            setLoding(true);
            try {
              const res = await homeServices.desease(sendObj);
              if (res.data) {
                ToastAndroid.show(
                  "Your request sent successfully ",
                  ToastAndroid.LONG
                );

                setTimeout(async () => {
                  resetForm({ values: "" });
                  navigation.push("DoctorList", {
                    doctorId: values.desease,
                    userId: user?._id,
                  });
                  setLoding(false);
                }, 1000);
              }
            } catch (error) {
              console.log(error);
              setLoding(false);
              Alert.alert("Error", "Something went wrong");
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.control}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errText}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.control}>
                <Text style={styles.text}>Desease</Text>
                {/* <View style={styles.DropInput}>
                  <Picker
                    style={styles.textInputBox}
                    mode={"dailog"}
                 
                    onValueChange={(itemValue, itemIndex) => {
                      console.log("itemValue", itemValue)                    
                      setSelectedValue(itemValue)
                    }}
                  >
                    {specialist.map((list) => {
                      return <Picker.Item label={list.name} value={list.id} />;
                    })}

            
                  </Picker>
                </View> */}

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={specialist}
                  maxHeight={300}
                  labelField="name"
                  valueField="_id"
                  placeholder="What is your desease"
                  onChange={(item) => selectDesease(item)}
                />
                {errors.desease && touched.desease && (
                  <Text style={styles.errText}>{errors.desease}</Text>
                )}
              </View>

              <View style={styles.control}>
                <Text style={styles.text}>Location/Adress</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Location"
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  value={values.location}
                />
                {errors.location && touched.location && (
                  <Text style={styles.errText}>{errors.location}</Text>
                )}
              </View>
              <View style={styles.control}>
                <Text style={styles.text}>Decription ( Optional)</Text>
                <TextInput
                  style={styles.textarea}
                  placeholder="Describe Here"
                  onChangeText={handleChange("descripition")}
                  onBlur={handleBlur("descripition")}
                  value={values.descripition}
                  multiline={true}
                />
              </View>
              <View>
                {/* <DropDownPicker
            style={styles.dropdown}
            open={companyOpen}
            value={companyValue} 
            setOpen={setCompanyOpen}
            setValue={setCompanyValue}
            setItems={setComapny}
            placeholder="Select Company"
            placeholderStyle={styles.placeholderStyles}
           
            activityIndicatorColor="#5188E3"
            searchable={true}
            searchPlaceholder="Search your company here..."
            onOpen={onCompanyOpen}           
             zIndex={1000}
            zIndexInverse={3000}
          /> */}
              </View>

              <TouchableOpacity
                style={styles.buttonGreen}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonWhiteText}>Request</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  control: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#37474e",
    fontFamily: "Nunito_600SemiBold",
    lineHeight: 24,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
  },

  textarea: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 12,
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    height: 100,
    textAlignVertical: "top",
  },
  buttonGreen: {
    backgroundColor: "#07da5f",
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 100,
  },
  buttonWhiteText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
  },
  buttonGreenBorder: {
    borderColor: "#07da5f",
    borderWidth: 1,
    padding: 12,
    borderRadius: 100,
    marginBottom: 35,
    marginTop: 10,
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonGreenText: {
    color: "#07da5f",
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  errText: {
    fontSize: 17,
    color: "red",
    fontFamily: "Nunito_700Bold",
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 18,
    paddingRight: 18,
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
  },
  selectedTextStyle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
  },
  inputSearchStyle: {
    height: 40,
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
  },
  textItem: {
    flex: 1,
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
  },
  DropInput: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 0,
    fontFamily: "Nunito_400Regular",
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    lineHeight: 30,
  },
  textInputBox: {
    borderRadius: 100,
    lineHeight: 10,
  },
  badge: {
    backgroundColor: "#dbfae8",
    width: 45,
    height: 45,
    borderRadius: 8,
    color: "#07da5f",
    lineHeight: 45,
    textAlign: "center",
  },
  badge2: {
    backgroundColor: "#dbfae8",
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  topBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profile: {
    flex: 1,
    borderRadius: 8,
    width: 50,
    height: 30,
    resizeMode: "stretch",
  },
  welcome: {
    marginBottom: 20,
  },
  weltitel: {
    fontSize: 24,
    color: "#37474e",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Nunito_700Bold",
  },
  weltext: {
    fontSize: 18,
    color: "#d6d6d6",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Nunito_700Bold",
  },
  heading: {
    fontSize: 18,
    color: "#516067",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Nunito_700Bold",
    marginBottom:15
  },
  stretch: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
  },
  wrapper: {
    height: 200,
    marginBottom: 30,
  },
  wrapper2:{
    height: 150,
    marginBottom: 30,
    borderRadius: 10,
  },
  blocks: {
    width: '98%',
    height:150,
    backgroundColor:'#dbfae8',
    borderRadius: 10,
    textAlign:"center"
  },
  blockstext:{
    fontSize: 20,
    color: "#07da5f",
    textAlign:"center",
    textTransform: "capitalize",
    fontFamily: "Nunito_700Bold",
  }
});
