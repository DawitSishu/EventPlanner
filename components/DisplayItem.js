import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ImageBackground } from 'react-native';
import {Image } from 'react-native';
import bg from '../Assets/bg.jpg';



export default function DisplayItem  ({route}) {
    const event = route.params;
    console.log(event);
    return (
        <View>
            <View style={styles.image}>
            <ImageBackground source={bg} style={{height:'100%'}} >
                <Text style={styles.text}>{event.eventName}</Text>
            </ImageBackground>
            </View>
            <View style={styles.container}>
                <View>
                    <Text >Date: {event.eventDate}</Text>
                    <Text >Time: {event.eventTime}</Text>
                </View>
                <View>
                    <Text style={styles.eventDetails}>Location: {event.eventLocation}</Text>
                </View>
                <View>
                    <Text style={styles.eventDetails}>Description: {event.eventDescription}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
     image :{
        // flex:1,
        width: '100%', 
        height: '60%',
     },
      text: {
        marginTop:'55%',
        color: 'white',
        fontSize: 30,
        fontWeight:'bold'
      },
      container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 15,
        width:'100%',
      },
      date:{
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 15,
      },
      eventDetails: {
        backgroundColor: '#f9f9f9',
    //   borderRadius: 8,
      padding: 16,
      // marginBottom: 16,
    //   marginTop: 16,
      width:'100%'
        // marginBottom: 8,
      },
});