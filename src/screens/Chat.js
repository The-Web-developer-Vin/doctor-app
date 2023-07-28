import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import doctorService from "../services/doctorService";
import { hostUrl } from "../services/envService";

const Chat = ({ route, navigation }) => {
  const { data } = route.params;
  const [messages, setMessages] = useState([]);
  const [details, setDetails] = useState();
  const [doctorIdData, setDoctorIdData] = useState(data);
  const [profile, SetProfile] = useState();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await doctorService.getDocotorDetails(
        doctorIdData?.doctorId
      );
      let data = JSON.stringify(response.data.doctor);
      setDetails(response.data.doctor);
      SetProfile(hostUrl + response?.data?.doctor?.profile);
      setMessages([
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: profile,
          },
        },
      ]);

      setTimeout(async () => {}, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#4ce4b1",
            padding: 6,
            borderBottomEndRadius: 0,
          },
          left: {
            backgroundColor: "#fff",
            padding: 6,
            borderBottomEndRadius: 0,
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
            fontFamily: "Poppins_500Medium",
            fontSize: 14,
          },
          left: {
            color: "#021b54",
            fontFamily: "Poppins_500Medium",
            fontSize: 14,
          },
        }}
      />
    );
  };
  const renderSend = (props) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Send {...props} containerStyle={{ justifyContent: "center" }}>
          <Ionicons style={styles.send} name="send-sharp" />
        </Send>
      </View>
    );
  };
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#fff",
          // borderRadius: 15,
          borderWidth: 0,
          fontFamily: "Poppins_500Medium",
          padding: 3,

          // height: 60,
          // flexDirection: "row",
          // alignItems: "center",
          // lineHeight:60
        }}
      ></InputToolbar>
    );
  };

  return (
    <View style={styles.bgBlue}>
      <View style={styles.topBar}>
        <Ionicons style={styles.arrow} name="chevron-back-outline" />
        <Text style={styles.topTitle}>{details?.doctor_Name}</Text>
        <Ionicons
          onPress={() =>
            navigation.push("Review", {
              doctorId: doctorIdData?.doctorId,
              userId: doctorIdData?.userId,
            })
          }
          style={styles.arrow}
          name="close-outline"
        />
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
              name: "Prasad",
              avatar: "https://placeimg.com/140/140/any",
            }}
            renderBubble={renderBubble}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
          />
        </View>
      </View>
    </View>
  );
};

export default Chat;
const styles = StyleSheet.create({
  bgBlue: {
    flex: 1,
    backgroundColor: "#555fd2",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  arrow: {
    fontSize: 32,
    color: "#ffffff",
    marginBottom: 5,
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
    // paddingLeft: 25,
    // paddingRight: 25,
    alignSelf: "stretch",
  },
  send: {
    backgroundColor: "#eefdfa",
    width: 46,
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "#33e2a7",
    fontSize: 22,
    borderRadius: 12,
    marginRight: 10,
    paddingLeft: 6,
  },
});
