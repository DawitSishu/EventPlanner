import React, {useState,useEffect} from 'react'
import {  collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { View, TextInput, Button, StyleSheet, Text, FlatList,ActivityIndicator,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {app} from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';


  

export default function UpdateEvent ({route}) {
    const firestore = getFirestore(app);
    const [loader,setLoader] = useState(false);
    const navigation = useNavigation();
    const { eventId, eventName, eventDate, eventTime, eventLocation, eventDescription } = route.params;
    const [editedEventName, setEditedEventName] = useState(eventName);
  const [editedEventDate, setEditedEventDate] = useState(eventDate);
  const [editedEventTime, setEditedEventTime] = useState(eventTime);
  const [editedEventLocation, setEditedEventLocation] = useState(eventLocation);
  const [editedEventDescription, setEditedEventDescription] = useState(eventDescription);


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate.toLocaleString().split(',')[0];
    setEditedEventDate(currentDate);
  };
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime.toLocaleString().split(',')[1];
    setEditedEventTime(currentTime);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange:onDateChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange:onTimeChange,
      mode: 'time',
      is24Hour: true,
    });
  };
  
  
  
  
  const handleSave = async () => {
    setLoader(true);
    try {
    const eventRef = doc(firestore, 'events', eventId);
          // Update the document fields using the 'updateDoc' method
          await updateDoc(eventRef, {
            eventName:editedEventName,
            eventDate: editedEventDate,
            eventTime: editedEventTime,
            eventLocation: editedEventLocation,
            eventDescription:editedEventDescription,
          });
          //alert msg
          console.log('Event updated successfully');
          setLoader(false);
          navigation.goBack();
        // fetchEventsFromFirestore();
        } catch (error) {
          //alert err
          setLoader(false);
          console.error('Error updating event:', error);
        }
  }; 

  const handleCancel = () =>{
    navigation.goBack();
  }


  return (
            loader ? (
                  <View style={styles.container}>
                    <ActivityIndicator size="large" color="blue" />
                  </View>
                )  : (
                  <View style={styles.container}>
                    <Text style={styles.title} >Updating Event: {eventName}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={editedEventName}
                            onChangeText={setEditedEventName}
                            placeholder="Event Name"
                        />
                    </View>
                    <View style={styles.dateInputContainer}>
                        <Text style={styles.dateText}>{editedEventDate}</Text>
                        <TouchableOpacity style={styles.dateInput}  onPress={showDatepicker} >
                        <Icon name="calendar" size={24} color="gray" />
                        </TouchableOpacity> 
                    </View>
                    <View style={styles.dateInputContainer}>
                        <Text style={styles.dateText}>{editedEventTime}</Text>
                        <TouchableOpacity style={styles.dateInput}  onPress={showTimepicker} >
                        <Icon name="clock-o" size={24} color="gray" />
                        </TouchableOpacity>    
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={editedEventLocation}
                            onChangeText={setEditedEventLocation}
                            placeholder="Event Location"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={editedEventDescription}
                            onChangeText={setEditedEventDescription}
                            placeholder="Event Description"
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    <TouchableOpacity style={{...styles.button,backgroundColor: '#63954a'}} onPress={handleSave} >
                      <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.button,backgroundColor: '#EE4B2B'}} onPress={handleCancel} >
                      <Text style={styles.buttonText}>Cancel Changes</Text>
                    </TouchableOpacity>
                  </View>
                )
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    width:'100%',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title:{
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'gray',
  },
  dateInputContainer:{
    width: '100%',
    height: 50,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
  },
  dateInput: {
    flex:0.2
  },
  dateText:{
    margin:10,
    flex:1,
    fontSize: 20,
    color: 'gray',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});