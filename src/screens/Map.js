import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_API_KEY } from "../services/environments";
// import { Dropdown } from "react-native-element-dropdown";
// import SelectDropdown from "react-native-select-dropdown";
// import { Picker } from "@react-native-picker/picker";
// import ZegoUIKitPrebuiltCall, { ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import { ZegoLayoutMode } from '@zegocloud/zego-uikit-rn'

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export default function Map() {
  // const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  // const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyDIOa8nS_Sf1ZwT20v3_r7T8YclD5z9mwA",
            language: "en",
          }}
        />
      </View>

      {/* <View style={styles.image} className="px-5">
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDaE9upL4CkFAzhchrLXb587V7kzkQwtC8',
        language: 'en',
      }}
    />
    </View> */}

      {/* <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  /> */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          pinColor={"red"}
          title={"dsg"}
          description={"sdsf"}
        />
      </MapView>

      {/* <MapView
        
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}

      {/* <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_POSITION}
            >
                <Marker coordinate={{ latitude: 17.0265783, longitude: 82.2469053 }}
                    pinColor={"red"}
                    title={'dsg'}
                    description={'sdsf'}
                />
            </MapView> */}

      {/* <ZegoUIKitPrebuiltCall
                appID={'25027312'}
                appSign={'f4a63dd6698a958307a82b2892f6387e3cbab56ec504eb8e17724d3e01f0efb0'}
                userID={userID} 
                userName={userName}
                callID={callID} 

                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { props.navigation.navigate('HomePage') },
                    onHangUp: () => { props.navigation.navigate('HomePage') },
                }}
            /> */}

      {/* <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        search={true}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        rowTextStyle={styles.dropdownRowText}
        rowStyle={styles.dropdownRow}
        searchInputStyle={styles.SearchInput}
        searchPlaceHolder="Search..."
    dropdownIconPosition="right"
    dropdownStyle={styles.drop}
      /> */}
      {/* <View style={styles.input}>
        <Picker
          style={styles.input}
          mode={"dropdown"}        
          itemStyle={styles.items}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>{
            setSelectedLanguage(itemValue),
            console.log(itemValue)
          }
          }
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View> */}

      {/* <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_POSITION}
            >
                <Marker coordinate={{ latitude: 17.0265783, longitude: 82.2469053 }}
                    pinColor={"red"}
                    title={'dsg'}
                    description={'sdsf'}
                />
            </MapView>

            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    styles={{ textInput: styles.input }}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        console.log(data, details);
                        alert("hii")
                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                    }}
                />
            </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#07da5f",
  },

  dropdownButton: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    width: "100%",
    height: 55,
  },
  dropdownButtonText: {
    flex: 1,
    fontSize: 18,
    color: "#8fa4ad",
    textAlign: "left",
    marginHorizontal: 8,
    fontFamily: "Nunito_400Regular",
  },

  dropdownRow: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ced8dc",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  dropdownRowText: {
    flex: 1,
    fontSize: 18,
    color: "#000000",
    textAlign: "left",
    marginHorizontal: 8,
    backgroundColor: "#fff",
    fontFamily: "Nunito_400Regular",
    color: "#8fa4ad",
  },
  dropdownCustomizedRowParent: {
    flex: 1,
    overflow: "hidden",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  SearchInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 120,
    color: "red",
  },
  drop: {
    position: "absolute",
  },
  input: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 0,
    paddingTop: 1,
    paddingBottom: 1,
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#8fa4ad",
    backgroundColor: "#fff",
    borderStyle: "solid",
    width: "100%",
  },
  items: {
    borderColor: "#ced8dc",
    borderWidth: 1,
    olor: "#8fa4ad",
  },
  map: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  image: {
    paddingTop: 20,
    height: "100%",
    position: "relative",
    zIndex: 99999,
  },
});
