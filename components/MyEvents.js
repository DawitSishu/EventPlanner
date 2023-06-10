import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet,TouchableOpacity,Alert,ActivityIndicator } from 'react-native';
import {  collection, query, where, getDocs,getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {app} from '../config/firebaseConfig';
import { getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import UpdateEvent from './UpdateEvent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
    eventItem: {
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    eventName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    eventDetails: {
      marginBottom: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    editButton: {
      backgroundColor: '#2196F3',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    deleteButton: {
      backgroundColor: '#FF0000',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });
  
const EventListScreen = ({route}) => {
    const firestore = getFirestore(app);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { user } = route.params;
    const [events, setEvents] = useState([]);
    const [loader,setLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      console.log('Component is focused');
      fetchEventsFromFirestore();
    }

    return () => {
      console.log('Cleanup function is running');
    };
  }, [isFocused]);

  const fetchEventsFromFirestore = async () => {
    setLoader(true);
    try {
      const eventsCollectionRef = collection(firestore, 'events');
      const eventsQuery = query(eventsCollectionRef, where('user_id', '==', user.localId));

      const querySnapshot = await getDocs(eventsQuery);

      const eventsData = [];
      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        eventsData.push({
          id: doc.id,
          ...eventData,
        });
      });

      setEvents(eventsData);
      setLoader(false); 
    } catch (error) {
      setLoader(false);
      //error message
      console.error('Error fetching events:', error);
    }
  };

  const handleEditEvent =  async (eventId) => {
    setLoader(true);
    const eventRef = doc(firestore, 'events', eventId);
    try {
      const documentSnapshot = await getDoc(eventRef);
      
      if (documentSnapshot.exists()) {
        // Document exists, you can access its data
        const documentData = documentSnapshot.data();
        // setEdit(true);
        const data = {
          eventId,
          ...documentData
        }
        console.log('Document data:', data);
        setLoader(false);
        navigation.navigate('UpdateEvent',{...data});
      } else {
        setLoader(false);
        //err alert
        console.log('Document does not exist.');
      }
    } catch (error) {
      // alert error
      console.error('Error retrieving document:', error);
    }
    // try {
    //   // Update the document fields using the 'updateDoc' method
    //   await updateDoc(eventRef, {
    //     eventName: 'Updated Event Name',
    //     eventDate: '2023-06-15',
    //     eventTime: '18:00',
    //     eventLocation: 'muchasa n',
    //     eventDescription: 'Updated Event Description',
    //   });
  
    //   console.log('Event updated successfully');
    // fetchEventsFromFirestore();
    // } catch (error) {
    //   console.error('Error updating event:', error);
    // }
  };

  const handleDeleteEvent = async (eventId) => {
    setLoader(true);
    try {
      await deleteDoc(doc(firestore, 'events', eventId));
      setLoader(false);
      //alert sth
      console.log('Event deleted:', eventId);
      fetchEventsFromFirestore(); // Refresh events after deletion
    } catch (error) {
      setLoader(false);
      //alert error
      console.error('Error deleting event:', error);
    }
  };


  const renderEventItem = ({ item }) => {
    return (
          <View style={styles.eventItem} key={item.id}>
            <Text style={styles.eventName}>{item.eventName}</Text>
            <Text style={styles.eventDetails}>Date: {item.eventDate}</Text>
            <Text style={styles.eventDetails}>Time: {item.eventTime}</Text>
            <Text style={styles.eventDetails}>Location: {item.eventLocation}</Text>
            <Text style={styles.eventDetails}>Description: {item.eventDescription}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditEvent(item.id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteEvent(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
    );
  };

  const confirmDeleteEvent = (eventId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteEvent(eventId),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {loader ? (
            <ActivityIndicator size="large" color="blue" />
            ) :  (
            <FlatList
              data={events}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
            />
            )}
    </View>
  );

  
};

export default EventListScreen;