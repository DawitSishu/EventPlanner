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
                <View style={styles.date}>
                    <Text style={styles.contentText}>Date: {event.eventDate}</Text>
                    <Text style={styles.contentText}>Time: {event.eventTime}</Text>
                </View>
                <View style={styles.location}>
                    <Text style={styles.contentText}>Location: </Text>
                    <Text style={styles.contentText}>{event.eventLocation}</Text>
                </View>
                <View style={styles.description}>
                        <Text>Description: </Text>
                        <Text>{event.eventDescription}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
     image :{
        // flex:1,
        width: '100%', 
        height: '70%',
     },
      text: {
        marginTop:'85%',
        color: 'white',
        fontSize: 30,
        fontWeight:'bold'
      },
      container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        width:'100%',
        height: '100%',
      },
      contentText: {
        fontSize: 16,
        fontWeight:'bold'
      },
      date:{
        width:'100%',
        height: 50,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 30,
        marginBottom: 25,
      },
      location: {
        width:'100%',
        height: 50,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 25,
      },
      description:{
        width:'100%',
        // height:'100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 15,
        alignSelf:'stretch'
      }
});