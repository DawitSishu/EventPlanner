import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { View, TextInput, Button, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { getFirestore } from 'firebase/firestore';
import {app} from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function App({route}) {
  const firestore = getFirestore(app);
  const navigation = useNavigation();
  const { user } = route.params;
  console.log(user);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loader, setLoader] = useState(false);
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');



  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate.toLocaleString().split(',')[0];
    setEventDate(currentDate);
  };
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime.toLocaleString().split(',')[1];
    setEventTime(currentTime);
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
      is24Hour: false,
    });
  };

  const showMyEvents = () =>{
    navigation.navigate('MyEvents',{user});
  }

  const handleEventCreation = async () => {
    setLoader(true);
    try {
      const docRef = await addDoc(collection(firestore, 'events'), {
        eventName,
        eventDate,
        eventTime,
        eventLocation,
        eventDescription,
        user_id:user.localId
      });
      console.log(docRef.segments);
      console.log('Event added with ID:', docRef.id);
      setEventName('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
      setEventDescription('');
      setLoader(false)
    } catch (error) {
      setLoader(false);
      //alert
      console.error('Error adding event:', error);
    }
    
  };

  return (
    <View style={styles.container}>
     {loader ? (
            <ActivityIndicator size="large" color="blue" />
            ) :  (
              <>
                <Text style={styles.title}>Welcome: {user.displayName}</Text>
                  <Text style={styles.title}>Create Event</Text>
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Event Name"
                      value={eventName}
                      onChangeText={setEventName}
                    />
                          
                          {/* managte to display the selected time and date */}
                    <Button onPress={showDatepicker} title="Show date picker!" /> 
                    <Button onPress={showTimepicker} title="Show time picker!" />
                    <TextInput
                      style={styles.input}
                      placeholder="Event Location"
                      value={eventLocation}
                      onChangeText={setEventLocation}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Event Description"
                      value={eventDescription}
                      onChangeText={setEventDescription}
                      multiline
                    />
                    <Button title="Create Event" onPress={handleEventCreation} />
                    <Button title="Show My Events" onPress={showMyEvents} />
                  </View>
      </>)
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
