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
import DisplayItem from './components/DisplayItem'



const Stack = createStackNavigator();

export default  function App  () {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        // screenOptions={{
        //   headerShown: false,
        // }}
        // screenOptions={{ headerMode: 'none' }} 
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
            <Stack.Group
    // screenOptions={{ headerStyle: { backgroundColor: 'transparent' } }}
  >
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
            </Stack.Group>
            <Stack.Screen 
            name="MyEvents" 
            component={MyEvents}
            />
            <Stack.Screen
              name="DisplayItem"
              component={DisplayItem}
            />
          <Stack.Screen 
            name="UpdateEvent" 
            component={UpdateEvent} 
            />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



