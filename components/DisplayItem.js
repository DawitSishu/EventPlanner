import React from 'react';
import { View, Text, FlatList,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,ImageBackground } from 'react-native';
import bg from '../Assets/bg.jpg';



export default function DisplayItem  ({route}) {
    const event = route.params;
    console.log(event);
    return (
        <View >
            <View style={styles.image}>
            <ImageBackground source={bg} style={{height:'100%'}} >
                <Text style={styles.text}>{event.eventName}</Text>
            </ImageBackground>
            </View>
            <View style={styles.container}>
                <View style={styles.date}>
                    <Text style={{...styles.contentText,color:'white'}}>Date: {event.eventDate}</Text>
                    <Text style={{...styles.contentText,color:'white'}}>Time: {event.eventTime}</Text>
                </View>
                <View style={styles.location}>
                    <Text style={{...styles.contentText, color:'white'}}>Location: </Text>
                    <Text style={{fontSize: 16, color:'white'}}>{event.eventLocation}</Text>
                </View>
                <View style={{width:'100%',alignItems:'flex-start'}}>
                        <Text style={{paddingLeft:10,paddingBottom:5,fontSize:20,fontWeight:'bold',color:'#210105'}}>Description: </Text>
                        <View style={styles.description}>
                          <Text style={{fontWeight:'800'}}>{event.eventDescription}</Text>
                        </View>
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
        marginTop:'90%',
        color: 'white',
        fontSize: 30,
        fontWeight:'bold',
        marginLeft:20,
      },
      container: {
        marginTop: 70,
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
        backgroundColor: '#011045',
        elevation:10,
        // borderWidth: 1,
        // borderColor: 'gray',
        marginTop: 60,
        marginBottom: 25,
      },
      location: {
        width:'100%',
        height: 50,
        backgroundColor: '#EE4B2B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        color: 'white',
        borderRadius: 15,
        elevation:10,
        // borderWidth: 1,
        // borderColor: 'gray',
        padding: 10,
        marginBottom: 15,
      },
      description:{
        width:'100%',
        height: '100%',
        flexGrow: 1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        alignSelf:'stretch',
        backgroundColor:'#dedcdc',
        borderRadius: 15,
        // borderWidth: 1,
        // borderColor: 'gray',
        padding: 10,
        elevation:6,
      }
});