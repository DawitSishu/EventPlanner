import React, {useState,useEffect} from 'react'
import {  collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { View, TextInput, Button, StyleSheet, Text, FlatList,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {app} from '../config/firebaseConfig';


  

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
    <View style={styles.container}>
        {
            loader ? (
                <ActivityIndicator size="large" color="blue" />
                )  : (
                    <>
                        <TextInput
                            style={styles.input}
                            value={editedEventName}
                            onChangeText={setEditedEventName}
                            placeholder="Event Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedEventDate}
                            onChangeText={setEditedEventDate}
                            placeholder="Event Date"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedEventTime}
                            onChangeText={setEditedEventTime}
                            placeholder="Event Time"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedEventLocation}
                            onChangeText={setEditedEventLocation}
                            placeholder="Event Location"
                        />
                        <TextInput
                            style={styles.input}
                            value={editedEventDescription}
                            onChangeText={setEditedEventDescription}
                            placeholder="Event Description"
                            multiline={true}
                            numberOfLines={4}
                        />
                        <Button title="Save" onPress={handleSave} />
                        <Button title="cancel" onPress={handleCancel} />
                    </>
                )
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});