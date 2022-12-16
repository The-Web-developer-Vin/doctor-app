import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'

export default function Loader({visible= false}) {
    const {height, width}=useWindowDimensions()
  return visible && 
    <View style={[styles.container, {width}]}>
        <View style={styles.loader}>
            <ActivityIndicator size='large' color='#07da5f' />
            <Text style={styles.loderText}>Loading</Text>
        </View>
     
    </View>
}

const styles = StyleSheet.create({
    container:{
        position:"fixed",
        zIndex:10,
        backgroundColor:'rgba(0,0,0,0.4)',
        justifyContent:"center",
        left:0,
        height:'100%'
    },
    loader:{
        height:70,
        backgroundColor:"#fff",
        marginHorizontal:50,
        paddingHorizontal:25,
        borderRadius:5,
        flexDirection:"row",
        alignItems:'center'
    },
    loderText:{
        fontSize:20,
        fontFamily:'Nunito_700Bold',
        marginLeft:25,
        color:'#07da5f'

    }
})