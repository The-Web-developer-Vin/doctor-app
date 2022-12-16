import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import authService from "../services/authService";
import Loader from "./Loader";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Signup({ navigation }) {
  const [next, SetNext] = useState(true);
  const [loading, setLoding] = React.useState(false);
  const nextStep = () => {
    SetNext(false);
  };
  const confirm = () => {
    navigation.navigate("Login");
    SetNext(true);
  };
  const initialValues = {
    name: "",
    email: "",
    brithday: "",
    phone_number: "",
    password: "",
    profile: "",
    adress: "",
  };
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email cannot be empty"),
    brithday: Yup.string().required("Brithday cannot be empty"),
    phone_number: Yup.string().required("Phone number cannot be empty").min(10, 'Must be exactly 10 digits'),
    password: Yup.string()
      .required("Password cannot be empty")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Minimum 8 characters, at least one letter, one capital letter, one number and one special character"
      ),
    profile: Yup.string(),
    adress: Yup.string().required("Adress cannot be empty"),
  });
  const [photo, setPhoto] = React.useState(null);
  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhoto(response);
      }
    });
  };
  const [mydate, setDate] = useState(new Date());
   const [displaymode, setMode] = useState('date');
   const [isDisplayDate, setShow] = useState(false);
   const changeSelectedDate = (event, selectedDate) => {
   const currentDate = selectedDate || mydate;
   setDate(currentDate);
   }
   const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
 };
 const displayDatepicker = () => {
    showMode('date');
 };
 

  return (
    <ScrollView>
      <Loader visible={loading} />
      {/* <View>
         <Button onPress={displayDatepicker} title="Show date picker!" />
            </View> */}
               {/* {isDisplayDate && (
                  <DateTimePicker
                     testID="dateTimePicker"
                     value={mydate}
                     mode={displaymode}
                     is24Hour={true}
                     display="default"
                     onChange={changeSelectedDate}
            />
         )} */}

      {next ? (
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={(values, { resetForm }) => {
              setLoding(true);
              setTimeout(async () => {
                try {
                  const res = await authService.signup(values);
                  console.log("res", res);
                  if (res) {
                    navigation.navigate("Login");
                    setLoding(false);
                  }
                } catch (error) {
                  console.log(error);
                  setLoding(false);
                  Alert.alert("Error", "Something went wrong");
                }
              });
              resetForm({ values: "" });
            }}>
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
                  onPress={handleChoosePhoto}>
                  <Ionicons style={styles.fileIcon} name="person-outline" />
                  <Text style={styles.photo}>ADD PHOTO</Text>
                </TouchableOpacity>
                <View style={styles.control}>
                  <Text style={styles.text}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Full Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errText}>{errors.name}</Text>
                  )}
                </View>
                <View style={styles.control}>
                  <Text style={styles.text}>Birthday</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="dd/mm/yy"
                    onChangeText={handleChange("brithday")}
                    onBlur={handleBlur("brithday")}
                    value={values.brithday}
                  />
                  {errors.brithday && touched.brithday && (
                    <Text style={styles.errText}>{errors.brithday}</Text>
                  )}
                </View>
                <View style={styles.control}>
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={errors.email}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errText}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.control}>
                  <Text style={styles.text}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={errors.password}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errText}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.control}>
                  <Text style={styles.text}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Phone Number"
                    keyboardType="numeric"
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                    maxLength={10}
                  />
                  {errors.phone_number && touched.phone_number && (
                    <Text style={styles.errText}>{errors.phone_number}</Text>
                  )}
                </View>
                <View style={styles.control}>
                  <Text style={styles.text}>Location/Adress</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Location"
                    onChangeText={handleChange("adress")}
                    onBlur={handleBlur("adress")}
                    value={values.adress}
                  />
                  {errors.adress && touched.adress && (
                    <Text style={styles.errText}>{errors.adress}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.buttonGreen}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.buttonWhiteText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.control}>
            <Text style={styles.text}>Choose Your Payment Method</Text>
            <TouchableOpacity style={styles.block}>
              <Text style={styles.text}>PayPal</Text>
              <Text style={styles.decripiton}>
                Lorem ipsum dolor sit amet, consec tetur adipiscing elit, utemin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.block}>
              <Text style={styles.text}>Credit Card</Text>
              <Text style={styles.decripiton}>
                Lorem ipsum dolor sit amet, consec tetur adipiscing elit, utemin
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.control}>
            <Text style={styles.text}>Credit Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Credit Card Number"
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.text}>CCV Code</Text>
            <TextInput style={styles.input} placeholder="CCV Code" />
          </View>
          <View style={styles.control}>
            <Text style={styles.text}>Expire Date</Text>
            <TextInput style={styles.input} placeholder="Expire Date" />
          </View>
          <View style={styles.control}>
            <Text style={styles.text}>MM/YY</Text>
            <TextInput style={styles.input} placeholder="MM/YY" />
          </View>
          <View style={styles.control}>
            <Text style={styles.text}>Name on Card</Text>
            <TextInput style={styles.input} placeholder="Your Name on Card" />
          </View>
          <Pressable style={styles.buttonGreen} onPress={confirm}>
            <Text style={styles.buttonWhiteText}>Confirm</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  control: {
    marginBottom: 30,
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
  buttonGreen: {
    backgroundColor: "#07da5f",
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 100,
  },
  buttonWhiteText: {
    fontFamily: "  Nunito_700Bold",
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
  },
  block: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 2,
    padding: 22,
    fontFamily: " Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    marginTop: 15,
    marginBottom: 5,
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
    fontFamily: "Nunito_700Bold",
    marginTop: 10,
  },
  file: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: "#ced8dc",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 2,
    marginBottom: 40,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight:"auto",
    textAlign:"center"
  },
  fileIcon: {
    fontSize: 40,
    color: "#ced8dc",
    marginBottom: 10,
  },
  photo: {
    fontSize: 16,
    color: "#ced8dc",
    fontFamily: "Nunito_400Regular",
  },
});
