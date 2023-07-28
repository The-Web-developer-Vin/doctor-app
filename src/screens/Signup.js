import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  RefreshControl,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import authService from "../services/authService";
import Loader from "./Loader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { hostUrl } from "../services/envService";

export default function Signup({ navigation }) {
  const [loading, setLoding] = React.useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pickedImagePath, setPickedImagePath] = useState("");

  const initialValues = {
    name: "",
    email: "",
    brithday: "",
    phone_number: "",
    password: "",
    profile: "",
    adress: "",
    confirmPassword: "",
  };
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email cannot be empty"),
    brithday: Yup.date(),
    phone_number: Yup.string()
      .required("Phone number cannot be empty")
      .min(10, "Must be exactly 10 digits"),
    password: Yup.string()
      .required("Password cannot be empty")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Minimum 8 characters, at least one letter, one capital letter, one number and one special character"
      ),
    profile: Yup.string(),
    adress: Yup.string().required("Adress cannot be empty"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  function showDatePicker() {
    setDatePicker(true);
  }
  function onDateSelected(event, value) {
    setDatePicker(false);
    setDate(value);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const openCamera = async () => {
    setModalVisible(false);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    setModalVisible(false);
    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      formData.append("image", { uri: localUri, name: filename, type });
      imagesUpload(formData);
    }
  };
  const showImagePicker = async () => {
    setModalVisible(false);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setModalVisible(false);
    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      formData.append("image", { uri: localUri, name: filename, type });
      imagesUpload(formData);
    }
  };
  const showImagePickerModel = async () => {
    setModalVisible(true);
  };
  const imagesUpload = async (UploadData) => {
    setLoding(true)
    try {
      const response = await fetch(`${hostUrl}api/v1/uploads`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
        },
        body: UploadData,
      });
      const data = await response.json();
      setPickedImagePath(data?.data?.upload?.image);
      setLoding(false)
    } catch (error) {
      console.log(error);
      setLoding(false)
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
      <Loader visible={loading} />
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display="default"
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Ionicons
            onPress={() => navigation.navigate("Login")}
            style={styles.arrow}
            name="chevron-back-outline"
          />
          <Text style={styles.title}>Sign Up</Text>
          <Text></Text>
        </View>
        <View style={styles.bg}>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={(values, { resetForm }) => {
              values.brithday = format(new Date(date), "dd-MM-yyyy");
              values.profile = pickedImagePath;
              setLoding(true);
              setTimeout(async () => {
                try {
                  const res = await authService.signup(values);
                  if (res) {
                    ToastAndroid.show(
                      "You are successfully registered",
                      ToastAndroid.LONG
                    );
                    setTimeout(() => {
                      setLoding(false);
                      navigation.navigate("Login");
                    }, 1000);
                  }
                } catch (error) {
                  setLoding(false);
                  Alert.alert("Error", "Something went wrong");
                }
              });
              resetForm({ values: "" });
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
                <TouchableOpacity
                  style={styles.file}
                  onPress={showImagePickerModel}
                >
                  {pickedImagePath !== "" ? (
                    <Image
                      style={styles.logo}
                      source={{
                        uri: hostUrl + pickedImagePath,
                      }}
                    />
                  ) : (
                    <View style={styles.photos}>
                      <Ionicons style={styles.fileIcon} name="camera-outline" />
                      <Text style={styles.photo}>ADD PHOTO</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <View style={styles.control}>
                  {/* <Text style={styles.text}>Full Name</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholderTextColor="#909fbe"
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errText}>{errors.name}</Text>
                  )}
                </View>
                {/* <View style={styles.control}>
                  <Text style={styles.text}>Birthday</Text>
                  <Ionicons
                    name="calendar-outline"
                    size={28}
                    color="#ced8dc"
                    style={{
                      position: "absolute",
                      top: 43,
                      right: 18,
                      zIndex: 9,
                    }}
                    onPress={showDatePicker}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="dd/mm/yy"
                    value={format(new Date(date), "dd-MM-yyyy")}
                  />
                </View> */}
                <View style={styles.control}>
                  {/* <Text style={styles.text}>Email</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={errors.email}
                    placeholderTextColor="#909fbe"
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errText}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.control}>
                  {/* <Text style={styles.text}>Password</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={errors.password}
                    secureTextEntry={hidePass ? true : false}
                    placeholderTextColor="#909fbe"
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errText}>{errors.password}</Text>
                  )}
                  <Ionicons
                    name={hidePass ? "eye-off-outline" : "eye-outline"}
                    size={28}
                    color="#ced8dc"
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 16,
                      zIndex: 9,
                    }}
                    onPress={() => setHidePass(!hidePass)}
                  />
                </View>
                <View style={styles.control}>
                  {/* <Text style={styles.text}>Password</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    error={errors.confirmPassword}
                    secureTextEntry={hidePass ? true : false}
                    placeholderTextColor="#909fbe"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errText}>{errors.confirmPassword}</Text>
                  )}
                  <Ionicons
                    name={hidePass ? "eye-off-outline" : "eye-outline"}
                    size={28}
                    color="#ced8dc"
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 16,
                      zIndex: 9,
                    }}
                    onPress={() => setHidePass(!hidePass)}
                  />
                </View>
                <View style={styles.control}>
                  {/* <Text style={styles.text}>Phone Number</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Your Phone Number"
                    keyboardType="numeric"
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                    maxLength={10}
                    placeholderTextColor="#909fbe"
                  />
                  {errors.phone_number && touched.phone_number && (
                    <Text style={styles.errText}>{errors.phone_number}</Text>
                  )}
                </View>
                <View style={styles.control}>
                  {/* <Text style={styles.text}>Location/Adress</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="Your Location"
                    onChangeText={handleChange("adress")}
                    onBlur={handleBlur("adress")}
                    value={values.adress}
                    placeholderTextColor="#909fbe"
                  />
                  {errors.adress && touched.adress && (
                    <Text style={styles.errText}>{errors.adress}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.buttonGreen}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.buttonWhiteText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
      <Modal
        animationType="slide"
        presentationStyle="overFullScreen"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Image</Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => openCamera()}
              >
                <Text style={styles.buttonsText}>Take Photo...</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => showImagePicker()}
              >
                <Text style={styles.buttonsText}>Choose form Library</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Pressable
            style={styles.buttonCancle}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.buttonCancleText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555fd2",
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
    borderColor: "#dce2f0",
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#193469",
    borderStyle: "solid",
  },
  buttonGreen: {
    backgroundColor: "#4ce4b1",
    alignSelf: "stretch",
    padding: 13,
    borderRadius: 100,
  },
  buttonWhiteText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  block: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 2,
    padding: 22,
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    marginTop: 15,
    marginBottom: 5,
  },
  decripiton: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#90a4ae",
    marginTop: 5,
  },
  errText: {
    fontSize: 13,
    color: "red",
    fontFamily: "Poppins_500Medium",
    marginTop: 10,
  },
  file: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: "#4ce4b1",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 2,
    marginBottom: 20,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    backgroundColor: "#4ce4b1",
  },
  photos: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  fileIcon: {
    fontSize: 60,
    color: "#ffffff",
    marginBottom: 0,
  },
  photo: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: "Poppins_500Medium",
  },
  logo: {
    width: 135,
    height: 135,
    borderRadius: 100,
  },
  image: {
    width: 150,
    height: 150,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#00000099",
    padding: 10,
    paddingBottom: 20,
  },
  modalView: {
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalHeading: {
    color: "#37474e",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 35,
    fontFamily: "Poppins_700Bold",
  },
  modalText: {
    color: "#cad0e0",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 8,
  },

  buttonCancle: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
  },
  buttonCancleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#4ce4b1",
    textAlign: "center",
  },
  buttonsText: {
    color: "#949fbb",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  bg: {
    padding: 25,
    backgroundColor: "#eff4fa",
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    height: "100%",
    resizeMode: "cover",
  },
  topBar: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  arrow: {
    fontSize: 32,
    color: "#ffffff",
    marginBottom: 3,
    marginRight:15,
  },
});
