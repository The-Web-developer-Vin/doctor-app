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
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CallPayment() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewOut}>
        <Text style={styles.lable}>Total Cost </Text>
        <Text style={styles.price}>$250</Text>
      </View>
      <View style={styles.viewOut}>
        <Text style={styles.listTitle}>Choose Your Payment Method </Text>
        <TouchableOpacity style={styles.block}>          
            <Ionicons name="card-outline" size={38} color="#38474f" style={{marginRight:20}} />
          <Text style={styles.textcard}>Credit Card</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.method}>Add Payment Method</Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.buttonGreen}>
        <Text style={styles.buttonWhiteText}>Pay</Text>
      </Pressable>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>Give Feedback</Text>
            <View style={styles.DoList}>
              <Image
                style={styles.Doimage}
                source={require("./../../assets/doctor-1.jpg")}></Image>
              <View style={styles.Docontent}>
                <Text style={styles.Dotitle}>Dudung Sokmati</Text>
                <Text style={styles.Dotext}>Eye Specialist</Text>
              </View>
            </View>
            <View style={styles.Doratings}>
           
                  <Ionicons name="star" size={30} color="#ffd500" style={{marginRight:20}} />
          <Ionicons name="star" size={30} color="#ffd500" style={{marginRight:20}}/>
          <Ionicons name="star" size={30} color="#ffd500" style={{marginRight:20}}/>
          <Ionicons name="star" size={30} color="#cfd8dc" style={{marginRight:20}}/>
          <Ionicons name="star" size={30} color="#cfd8dc"/>
            </View>
            <View style={styles.control}>
              <Text style={styles.text}>Feedback</Text>
              <TextInput
                style={styles.textarea}
                placeholder="Write Your Feedback"
              />
            </View>

            <View style={styles.modalBtns}>
              <Pressable
                style={styles.buttonGreen}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonWhiteText}>Send</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.NoText}>No Thanks</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },

  buttonGreen: {
    backgroundColor: "#07da5f",
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
  },
  buttonWhiteText: {
    fontFamily: "  Nunito_700Bold",
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
  },
  viewOut: {
    marginBottom: 30,
  },
  price: {
    color: "#07da5f",
    fontSize: 70,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "  Nunito_700Bold",
  },
  lable: {
    color: "#37474e",
    fontSize: 22,
    textAlign: "center",
    fontFamily:'Nunito_600SemiBold',
  },
  method: {
    color: "#07da5f",
    fontSize: 18,
    marginBottom: 80,
    textAlign: "center",
    fontFamily:'Nunito_600SemiBold',
  },
  block: {
    borderColor: "#07da5f",
    borderWidth: 2,
    borderRadius: 4,
    padding: 22,
    borderStyle: "solid",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  listTitle: {
    color: "#38474f",
    fontSize: 18,
    marginBottom: 5,
    fontFamily:'Nunito_600SemiBold',
  },
  textcard: {
    color: "#38474f",
    fontSize: 22,
    fontFamily:'Nunito_600SemiBold',
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
    lineHeight: 25,
    fontFamily: "  Nunito_700Bold"
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
    fontFamily:'Nunito_600SemiBold',
  },
  Dotext: {
    color: "#07da5f",
    fontSize: 18,
    fontStyle: "italic",
    fontFamily:'Nunito_600SemiBold',
  },

  Dorating: {
    fontSize: 18,
    color: "#8fa4ae",
    marginLeft: 5,
    fontFamily:'Nunito_600SemiBold',
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
    fontFamily:'Nunito_600SemiBold',
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
    fontFamily:'Nunito_600SemiBold',
  },
  NoText: {
    color: "#607c8a",
    fontSize: 18,
    letterSpacing: 1,
    textAlign: "center",
    fontFamily:'Nunito_600SemiBold',
  },
  control: {
    marginBottom: 20,
  },
});
