import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CreateEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';
import UpdateEvent from './components/UpdateEvent';
import {firebaseConfig} from './config/firebaseConfig';

const Stack = createStackNavigator();

export default  function App  () {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        // screenOptions={{
        //   headerShown: false,
        // }}
        screenOptions={{ headerMode: 'none' }}
      >
          <Stack.Screen 
            name="Login" 
            component={Login} 
            initialParams={{ firebaseConfig }}
            />
            <Stack.Screen 
            name="CreateEvent" 
            component={CreateEvent}
            />
            <Stack.Screen 
            name="MyEvents" 
            component={MyEvents}
            />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            initialParams={{ firebaseConfig }}
          />
          <Stack.Screen 
            name="UpdateEvent" 
            component={UpdateEvent} 
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


