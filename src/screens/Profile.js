import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { hostUrl } from "../services/envService";
import authService from "../services/authService";
import * as ImagePicker from "expo-image-picker";

export default function Profile({ navigation }) {
  const [user, setUser] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);

      setUser(currentUser.user);
      // getUserById(currentUser._id)
    } catch (error) {
      console.log(error);
    }
  };
  const clearUser = async () => {
    try {
      await AsyncStorage.clear();
      navigation.push("Welcome");
    } catch (error) {
      console.log(error);
    }
  };
  // const getUserById = async (id) => {
  //   try {
  //     const res = await authService.getById(id);
  //     setUserDetails(res.data.user)
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert("Error", "Something went wrong");
  //   }
  // };

  const showImagePickerModel = async () => {
    setModalVisible(true);
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


  return (
    <ScrollView>
      <View style={styles.blueBG}>
        <View style={styles.topBar}>
          <Ionicons
          onPress={() => navigation.goBack()}
            style={styles.arrow}
            name="chevron-back-outline"
          />
          <Text style={styles.topTitle}>Profile</Text>
          <Text></Text>
        </View>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.profileImg}>
              {user.profile ? (
                <Image
                  style={styles.profile}
                  source={{ uri: hostUrl + user.profile }}
                />
              ) : (
                <Image
                  style={styles.profile}
                  source={require("../../assets/profile.jpg")}
                />
              )}
              <Pressable style={styles.upload}
              onPress={showImagePickerModel}
              >
                <Ionicons
                  name="camera-outline"
                  size={28}
                  color={"#4ce4b1"}
                  style={styles.camera}
                />
              </Pressable>
            </View>
            <Text style={styles.name}>{user.name}</Text>
            {/* <Text style={styles.email}>{user.email}</Text> */}
            {/* <TouchableOpacity onPress={clearUser} style={styles.button}>
              <Text style={styles.linkText}>LogOut</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.list}>
            <Ionicons
              name="settings-outline"
              size={30}
              color={"#7f8fa9"}
              style={{ marginRight: 15 }}
            />
            <View>
              <Text style={styles.listText1}>Account Settings</Text>
            </View>
          </View>
          <View style={styles.list}>
            <Ionicons
              name="notifications-outline"
              size={30}
              color={"#7f8fa9"}
              style={{ marginRight: 15 }}
            />
            <View>
              <Text style={styles.listText1}>Notification</Text>
            </View>
          </View>
          <View style={styles.list}>
            <Ionicons
              name="compass-outline"
              size={30}
              color={"#7f8fa9"}
              style={{ marginRight: 15 }}
            />
            <View>
              <Text style={styles.listText1}>Privacy Policy</Text>
            </View>
          </View>
          <View style={styles.list}>
            <Ionicons
              name="log-out-outline"
              size={30}
              color={"#7f8fa9"}
              style={{ marginRight: 15 }}
            />

            <View>
              <Text style={styles.listText1}>Sign Out </Text>
            </View>
          </View>
        </View>
      </View>
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
  blueBG: {
    flex: 1,
    backgroundColor: "#555fd2",
  },
  container: {
    flex: 1,
    backgroundColor: "#eff4fa",
    borderTopLeftRadius: 45,
    borderTopEndRadius: 45,
    resizeMode: "cover",
    paddingTop: 35,

    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    textAlign: "center",
    marginBottom: 5,
  },
  profile: {
    borderRadius: 100,
    width: 120,
    height: 120,
    borderColor: "#fff",
    borderWidth: 4,
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
    alignSelf: "stretch",
  },
  name: {
    fontSize: 22,
    color: "#193469",
    textAlign: "center",
    textTransform: "capitalize",
    fontFamily: "Poppins_700Bold",
    marginBottom: 10,
  },
  list: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  listText: {
    fontSize: 17,
    color: "#001954",
    fontFamily: "Nunito_600SemiBold",
    lineHeight: 24,
    marginLeft: 20,
  },
  listText1: {
    fontSize: 16,
    color: "#001954",
    textAlign: "left",
    textTransform: "capitalize",
    fontFamily: "Poppins_600SemiBold",
  },
  button: {
    backgroundColor: "#fff",
    width: 110,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
  },
  linkText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: "#07da5f",
    textAlign: "center",
    padding: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  topBar: {
    flexDirection: "row",
    // justifyContent:"space-between",
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
    marginRight: 15,
  },
  topTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  email: {
    fontSize: 15,
    color: "#6e7c9f",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    marginBottom: 15,
  },
  upload: {
    backgroundColor: "#fff",
    width: 45,
    height: 45,
    borderRadius: 100,
    lineHeight: 50,
    textAlign: "center",
    position: "absolute",
    right: 0,
    bottom:0,
    elevation:50,
    shadowColor: "#d7e9ff",
  },
  camera: {
    marginHorizontal: "auto",
    textAlign: "center",
    lineHeight: 45,
  },
  profileImg: {
    position: "relative",
    width: 120,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom:30,
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
});
