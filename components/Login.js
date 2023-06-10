import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator,StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ route }) => {
  const { firebaseConfig } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const goSignIn = () =>{
    navigation.navigate('Signup');
  }


  const handleEmailLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const user = await response.json();
        navigation.navigate('CreateEvent',{user});
        setLoading(false);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error.message;
        console.log('Log-In error:', errorMessage);
        Alert.alert('Log-In Error', errorMessage);
        setLoading(false);
      }
    } catch (error) {
      console.log('Log-In error:', error.message);
      setLoading(false)
      Alert.alert('Log-In Error', error.message);
    }
  };



  return (
      loading ? (
                <View style={styles.container}>
                  <ActivityIndicator size="large" color="blue" />
              </View>
           )  : (
              <View style={styles.container}>
              <Text style={styles.title}>Welcome Back!</Text>
              <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleEmailLogin} >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goSignIn}>
                <Text style={styles.signupText}>Don't have an account? Sign up</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff3366',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#333',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
  
export default LoginScreen;
