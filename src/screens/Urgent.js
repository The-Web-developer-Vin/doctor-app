import React from "react";
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

export default function Urgent({ navigation }) {
  const [loading, setLoding] = React.useState(false);

  const initialValues = {
    name: "",
    desease: "",
    location: "",
    descripition: "",
  };
  const SignUpSchema = Yup.object().shape({
    // name: Yup.string().required("Name cannot be empty"),
    // desease: Yup.string().required("Desease cannot be empty"),
    // location: Yup.string().required("Location  cannot be empty"),
    // descripition: Yup.string(),
  });

  return (
    <ScrollView>
      <Loader visible={loading} />
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => navigation.navigate("DoctorList")}
          style={styles.buttonGreenBorder}>
          <Text style={styles.buttonGreenText}>Very Urgent</Text>
        </Pressable>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { resetForm }) => {
            setLoding(true);
            navigation.push("DoctorList");
            try {
              const res = await homeServices.desease(values);
              if (res.data) {
                setTimeout(async () => {
                  resetForm({ values: "" });
                  navigation.push("DoctorList");
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
                )}{" "}
              </View>
              <View style={styles.control}>
                <Text style={styles.text}>Desease</Text>
                <TextInput
                  style={styles.input}
                  placeholder="What is your desease"
                  onChangeText={handleChange("desease")}
                  onBlur={handleBlur("desease")}
                  value={values.desease}
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
        {/* <Pressable
          onPress={() => navigation.navigate("DoctorList")}
          style={styles.buttonGreen}>
          <Text style={styles.buttonWhiteText}>Request</Text>
        </Pressable> */}
      </SafeAreaView>
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
    fontFamily: " Nunito_400Regular",
    fontSize: 18,
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
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: " Nunito_400Regular",
    fontSize: 18,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    minHeight: 100,
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
  buttonGreenBorder: {
    borderColor: "#07da5f",
    borderWidth: 1,
    padding: 12,
    borderRadius: 100,
    marginBottom: 35,
    marginTop: 10,
    width: 180,
    marginHorizontal: "auto",
  },
  buttonGreenText: {
    color: "#07da5f",
    fontFamily: "  Nunito_700Bold",
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  errText: {
    fontSize: 17,
    color: "red",
    fontFamily: "Nunito_700Bold",
    marginTop: 10,
  },
});
