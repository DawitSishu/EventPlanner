import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { View, TextInput, StyleSheet, Text, ActivityIndicator,Alert } from 'react-native';
import { getFirestore } from 'firebase/firestore';
import {app} from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {  TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';



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
    console.log(selectedTime)
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
      is24Hour: true,
    });
  };

  const showMyEvents = () =>{
    navigation.navigate('MyEvents',{user});
  }

  const handleEventCreation = async () => {
    if(!eventName || !eventDate || !eventTime || !eventLocation || !eventDescription){
      Alert.alert('Error adding event:', 'Please make sure you added all the required fields and try again!!');
      return;
    }
    try {
      setLoader(true);
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
      Alert.alert('Success', 'Event Added Successfully!!');
      setEventName('');
      setEventDate('');
      setEventTime('');
      setEventLocation('');
      setEventDescription('');
      setLoader(false)
    } catch (error) {
      setLoader(false);
      //alert
      Alert.alert('Error adding event:', error.message);
    }
    
  };

  return (
    
     loader ? (
              <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
              </View>
            ) :  (
              <View style={styles.container}>
                <Text style={styles.Header}>Welcome: {user.displayName}</Text>
                  <Text style={styles.title} >Create Event</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Event Name"
                      value={eventName}
                      onChangeText={setEventName}
                    />
                  </View>
                        <View style={styles.dateInputContainer}>
                        <Text style={styles.dateText}>{eventDate}</Text>
                        <TouchableOpacity style={styles.dateInput}  onPress={showDatepicker} >
                        <Icon name="calendar" size={24} color="gray" />
                        </TouchableOpacity> 
                          </View>
                          <View style={styles.dateInputContainer}>
                        <Text style={styles.dateText}>{eventTime}</Text>
                        <TouchableOpacity style={styles.dateInput}  onPress={showTimepicker} >
                        <Icon name="clock-o" size={24} color="gray" />
                        </TouchableOpacity>    
                          </View>
                    {/* <Button onPress={showDatepicker} title="Show date picker!" />  */}
                    {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
                    <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Event Location"
                      value={eventLocation}
                      onChangeText={setEventLocation}
                    />
                    </View>
                    <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Event Description"
                      value={eventDescription}
                      onChangeText={setEventDescription}
                      multiline
                    />
                    </View>
              <TouchableOpacity style={{...styles.button,backgroundColor: '#63954a'}} onPress={handleEventCreation} >
                <Text style={styles.buttonText}>Create Event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.button,backgroundColor: '#4b5a6b'}} onPress={showMyEvents} >
                <Text style={styles.buttonText}>Show My Events</Text>
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
  Header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom:50,
  },
  title:{
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
