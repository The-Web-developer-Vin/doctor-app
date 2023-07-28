import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loader({ visible = false }) {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, { width }]}>
        <View style={styles.loader}>
          <LottieView
            autoPlay
            loop
            speed={0.9}
            style={{
              width: 250,
              height: 250,
              
            }}
            source={require("../../assets/loding.json")}
          />

          {/* <ActivityIndicator size='large' color='#07da5f' />
            <Text style={styles.loderText}>Loading...</Text> */}
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
  },
  loader: {
    height: 150,
    // backgroundColor: "#fff",
    marginHorizontal: 110,
    paddingHorizontal: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    width: 150,
    justifyContent:"center",
    margin:"auto",
  },
  loderText: {
    fontSize: 20,
    marginLeft: 20,
    color: "#07da5f",
  },
});
