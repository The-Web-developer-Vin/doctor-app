
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView
  
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Notification({navigation}) {
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.confirm}>
        <Image
          style={styles.image}
          source={require("./../../assets/check.png")}></Image>
        <Text style={styles.heading}>Your Request Has Been Approved</Text>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,Ut enim ad
          minim venia m, quis nostrud exercitation ullamco
        </Text>
      </View>
      <View>
        <Text style={styles.title}>Request Details</Text>
        <View style={styles.list}>
        <Text style={styles.listTitle}>Name</Text>  
        <Text style={styles.listDesc}>Jojon Suehndra</Text>
        </View>
        <View style={styles.list}>
        <Text style={styles.listTitle}>Desease</Text>  
        <Text style={styles.listDesc}>Sore Eyes</Text>
        </View>
        <View style={styles.list}>
        <Text style={styles.listTitle}>Location</Text>  
        <Text style={styles.listDesc}>St. Broxlyn 212</Text>
        </View>
        <View style={styles.list}>
        <Text style={styles.listTitle}>Description</Text>  
        <Text style={styles.listDesc}>Aku ingin menjadi setitik awan kecildi langint bersama mentari yaga hah</Text>
        </View>       
      </View>
      <View style={styles.doctor}>
        <Text style={styles.title}>Doctor </Text>
        <View style={styles.DoList}>
        <Image
          style={styles.Doimage}
          source={require("./../../assets/doctor-1.jpg")}></Image>
        <View style={styles.Docontent}>
          <Text style={styles.Dotitle}>Dudung Sokmati</Text>
          <Text style={styles.Dotext}>Eye Specialist</Text>
          <View style={styles.Doratings}>
               <Ionicons name="star" size={20} color="#ffd500" style={{marginRight:8}} />
          <Ionicons name="star" size={20} color="#ffd500" style={{marginRight:8}}/>
          <Ionicons name="star" size={20} color="#ffd500" style={{marginRight:8}}/>
          <Ionicons name="star" size={20} color="#ffd500" style={{marginRight:8}}/>
          <Ionicons name="star-half" size={20} color="#ffd500" style={{marginRight:10}}/>
            <Text style={styles.Dorating}>4.9</Text>
          </View>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate("Appointment")} style={styles.buttonGreen}>
          <Text style={styles.buttonWhiteText}>Confirm</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("DoctorList")} style={styles.buttonBorder}>
          <Text style={styles.buttonBoderText}>Cancel Request</Text>
        </Pressable>
        </View>
    </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 100,
    textAlign:"center",
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:40,
  },
  heading: {
    color: "#37474e",
    fontSize: 22,
    marginBottom: 30,
    textAlign:"center",
    letterSpacing: 1,
    lineHeight:35,
    fontFamily: "Nunito_700Bold",
  },
  desc: {
    color: "#607c8a",
    fontSize: 18,
    textAlign:"center",
    letterSpacing: 1,
    fontFamily:'Nunito_400Regular',
  },
  confirm:{
    marginBottom: 65,
  },
  title:{
    color: "#07da5f",
    fontSize: 24,
    marginBottom: 30,
    letterSpacing: 1.5,
    fontFamily:'Nunito_600SemiBold',
  },
  list:{
    marginBottom:35,
  },
  listTitle:{
    color: "#38474f",
    fontSize: 20,
    fontFamily:'Nunito_600SemiBold',
    marginBottom:9,
  },
  listDesc:{
    color: "#90a4ae",
    fontSize: 20,
    fontFamily:'Nunito_400Regular',
    lineHeight:30,
  },
  DoList: {
    flexDirection: "row",
    marginBottom: 10,
    borderColor: "#eceff1",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 15,
    marginBottom: 35,
  },
  Doimage: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  Docontent: {
    marginLeft: 25,
    marginRight: 20,
  },
  Dotitle: {
    color: "#37474e",
    fontSize: 19,
    marginBottom: 4,
    fontFamily: "Nunito_600SemiBold",
  },
  Dotext: {
    color: "#07da5f",
    fontSize: 18,
    marginBottom: 5,
    fontStyle: "italic",
    fontFamily:'Nunito_600SemiBold',
  },

  Dorating: {
    fontSize: 18,
    color: "#8fa4ae",
    marginLeft: 5,
    fontFamily: "Nunito_600SemiBold",
  
  },
  Doratings: {
    flexDirection: "row",
    // alignItems: "top",
  },
  doctor:{
    marginTop:35,
  }  ,
  buttonGreen:{
    backgroundColor: "#07da5f",      
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 100,
    marginBottom:20,    
  
  },
  buttonWhiteText:{
    fontFamily:'Nunito_600SemiBold',
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,   
    textAlign: "center",
  },
  buttonBorder: {
    borderColor: "#8fa4ad",
    borderWidth: 1,
    alignSelf: "stretch",
    padding: 14,
    borderRadius: 100,
    marginBottom: 10,

  },
  buttonBoderText: {
    fontFamily:'Nunito_600SemiBold',
    fontSize: 18,
    color: "#8fa4ad",
    letterSpacing: 1,
    textAlign: "center",
  },
});
