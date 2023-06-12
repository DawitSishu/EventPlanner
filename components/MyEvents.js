import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet,TouchableOpacity,Alert,ActivityIndicator,Image } from 'react-native';
import {  collection, query, where, getDocs,getDoc, deleteDoc, doc } from 'firebase/firestore';
import {app} from '../config/firebaseConfig';
import { getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import noEvent from '../Assets/Vector.png';

  
const EventListScreen = ({route}) => {
    const firestore = getFirestore(app);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { user } = route.params;
    const [events, setEvents] = useState([]);
    const [loader,setLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fetchEventsFromFirestore();
    }

    return () => {
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
      console.error('Error fetching events:', error);
    }
  };

  const handleEditEvent =  async (eventId) => {
    setLoader(true);
    const eventRef = doc(firestore, 'events', eventId);
    try {
      const documentSnapshot = await getDoc(eventRef);
      
      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        const data = {
          eventId,
          ...documentData
        }
        console.log('Document data:', data);
        setLoader(false);
        navigation.navigate('UpdateEvent',{...data});
      } else {
        setLoader(false);
        Alert.alert('Error retrieving document:', 'Document Data does not exist.'  )
      }
    } catch (error) {
      Alert.alert('Error retrieving document:', error.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    setLoader(true);
    try {
      await deleteDoc(doc(firestore, 'events', eventId));
      setLoader(false);
      //alert sth
      Alert.alert('Success','You Event has been saved successfully!!!');
      fetchEventsFromFirestore(); 
    } catch (error) {
      setLoader(false);
      Alert.alert('Error deleting event:',error.message);
    }
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

  const displayIt  = (event) =>{
    navigation.navigate('DisplayItem',event);
  }

  const renderEventItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>{displayIt(item)}}>
      <View style={styles.container}>
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
      </View>   
      </TouchableOpacity> 
    );
  };


  return (
   loader ? (
         <View style={styles.container}>
            <ActivityIndicator size="large" color="blue" />
          </View>  
            ) : events.length > 0 ? ( 
            <FlatList
              data={events}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
            />
            ) : (
              <View style={styles.container}>
                <Image  source={noEvent} style={{marginBottom: 70}}/>
                <Text style={styles.eventName}>You Have no Events Please Create One</Text>
              </View>
            )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    width:'100%',
  },
    eventItem: {
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 16,
      // marginBottom: 16,
      marginTop: 16,
      width:'100%'
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

export default EventListScreen;