import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import homeServices from "../services/homeServices";
import Loader from "./Loader";
import { Dropdown } from "react-native-element-dropdown";
import doctorService from '../services/doctorService'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Urgent({ navigation }) {
  const [value, setValue] = useState();
  const [specialist, setSpecialist] = useState();
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
  useEffect(() => {
    getSpecialist()
    getUser()
  }, [])

  const getSpecialist = async () => {
    try {
      const res = await doctorService.getAllSpecialist()
      setSpecialist(res.data.specialist)
    }
    catch (error) {
      console.log(error)
    }
  }
  const selectDesease = (item) => {
    setValue(item._id)
    if (item) {
      initialValues.desease = 'dfhdh'
      
    }
  }
  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"))
      setUser(userData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.top}>
      <Loader visible={loading} />
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { resetForm }) => {
            values.desease = value
            let sendObj = {
              ...values,
              userId: user?._id
            }
            setLoding(true);
            try {
              const res = await homeServices.desease(sendObj);
              if (res.data) {
                setTimeout(async () => {
                  resetForm({ values: "" });
                  navigation.push("DoctorList", { doctorId: values.desease, userId: user?._id })
                  setLoding(false);
                }, 1000);
              }
            } catch (error) {
              console.log(error);
              setLoding(false);
              Alert.alert("Error", "Something went wrong");
            }
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

              <TouchableOpacity
                style={styles.buttonGreen}
                onPress={() => handleSubmit()}>
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
  top:{
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    paddingTop:40,
  },
  control: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#37474e",
    fontFamily:"Nunito_600SemiBold",
    lineHeight: 24,
    marginBottom: 8,
  },
  input: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    paddingRight: 20,
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
    paddingTop: 20,
    paddingBottom: 12,
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    height: 100,
    textAlignVertical: 'top'
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
    width: 180,
    marginLeft: "auto",
    marginRight: 'auto'
  },
  buttonGreenText: {
    color: "#07da5f",
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  errText: {
    fontSize: 16,
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
    fontSize: 16,
    color: "#8fa4ad",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#8fa4ad",
  },
  selectedTextStyle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
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
});
