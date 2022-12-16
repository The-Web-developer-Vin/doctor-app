import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VideoCall({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ImageBackground
      source={require("./../../assets/video.jpg")}
      style={styles.bgImage}>
      <SafeAreaView style={styles.VideoView}>
        <View style={styles.top}>
          <Ionicons name="sync-outline" size={38} color="#fff" />
          <View>
            <Text style={styles.topHeading}>Doctor Jane Bintang</Text>
            <Text style={styles.topHeading}>08:20</Text>
          </View>
          <Ionicons name="chatbubble-outline" size={34} color="#fff" />
        </View>
        <View>
          <Image
            style={{
              width: 110,
              height: 142,
              lineHeight: 27,
              marginLeft: "auto",
              marginBottom: 20,
            }}
            source={require("./../../assets/video-thumb.png")}></Image>
          <View style={styles.bottom}>
            <Pressable style={styles.buttonBorder}>
              <Ionicons
                name="mic"
                size={38}
                color="#fff"
                style={{
                  lineHeight: 55,
                  margin: "auto",
                  textAlign:"center"
                }}
              />
        
            </Pressable>
            <Pressable
              style={styles.buttonEnd}
              onPress={() => navigation.navigate("CallPayment")}>
              <Text style={styles.linkText}>
              <Ionicons
                name="call"
                size={25}
                color="#fff"
                style={{
                  lineHeight: 50,
                  margin: "auto",
                  marginRight: 18
                }}
              />
               
                <Text style={styles.endb}>End</Text>
              </Text>
            </Pressable>
            <Pressable
              style={styles.buttonBorder}
              onPress={() => setModalVisible(true)}>
            <Ionicons
                name="videocam"
                size={30}
                color="#fff"
                style={{
                  lineHeight: 55,
                  margin: "auto",
                  textAlign:"center"
                }}
              />
             
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>Video Reocrded</Text>
            <Text style={styles.modalText}>
              All these video conversations have been recorded automatically, do
              you want to save them to your mobile?
            </Text>
            <View style={styles.modalBtns}>
              <Pressable
                style={styles.buttonNo}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonNoText}>No</Text>
              </Pressable>
              <Pressable
                style={styles.buttonGreen}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonWhiteText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
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
  },
  linkText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",


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
    borderRadius: 6,
  },
  modalHeading: {
    color: "#37474e",
    fontSize: 22,
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 35,
    fontFamily: "  Nunito_700Bold",
  },
  modalText: {
    color: "#607c8a",
    fontSize: 18,
    marginBottom: 35,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily:'Nunito_400Regular',
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
    fontFamily: "  Nunito_700Bold",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonNo: {
    borderColor: "#8fa4ad",
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 13,
    borderRadius: 100,
    width: "46%",
  },
  buttonNoText: {
    fontSize: 18,
    color: "#8fa4ad",
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "  Nunito_700Bold",
  },
  endb:{
    fontFamily: "  Nunito_700Bold",
  }
});
