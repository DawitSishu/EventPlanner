import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CreateEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';
import UpdateEvent from './components/UpdateEvent';
import {firebaseConfig} from './config/firebaseConfig';
import DrawerButton from './components/DrawerButton';
import DisplayItem from './components/DisplayItem';
import { Alert,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';





const Stack = createStackNavigator();

export default  function App  () {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
      >
        <Stack.Group
    screenOptions={{ headerMode: 'none' }} 
  >
          <Stack.Screen 
            name="Login" 
            component={Login} 
            initialParams={{ firebaseConfig }}
            />
            <Stack.Screen
              name="Signup"
              component={SignUp}
              initialParams={{ firebaseConfig }}
            />
            </Stack.Group>
            <Stack.Screen 
            name="CreateEvent" 
            component={CreateEvent}
            options={({ navigation }) => ({
              title: 'Home',
              headerLeft: () =>{},
              headerRight: () => (
                <DrawerButton  />
              ),
            })}
            />
            {/* </Stack.Group> */}
            <Stack.Screen 
            name="MyEvents" 
            component={MyEvents}
            options={({ navigation }) => ({
              title: 'Events',
              headerRight: () => (
                <DrawerButton  />
              ),
            })}
            />
            <Stack.Screen
              name="DisplayItem"
              component={DisplayItem}
              options={({ navigation }) => ({
                title: 'Event',
                headerRight: () => (
                  <DrawerButton  />
                ),
              })}
            />
          <Stack.Screen 
            name="UpdateEvent" 
            component={UpdateEvent} 
            options={({ navigation }) => ({
              title: 'Update Event',
              headerLeft: () =>{
                const handleNavigation = () =>{
                    Alert.alert(
                      'Confirm Cancel',
                      'Are you sure you want to Cancel? All Your new progress is not saved',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Confirm',
                          style: 'destructive',
                          onPress: () => navigation.goBack()
                        },
                      ],
                      { cancelable: true }
                    );
                }
                return(
                <TouchableOpacity onPress={handleNavigation} style={{marginLeft:10}}>
                   <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                )
              },
              headerRight: () => (
                <DrawerButton  />
              ),
            })}
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



