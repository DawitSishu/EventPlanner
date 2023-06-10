import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator,StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const SignupScreen = ({ route }) => {
    const { firebaseConfig } = route.params;
    const [loading,setLoading] = useState(false);  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName,setDisplayName] = useState('');
    const navigation = useNavigation();


   


    const goLogIn = () =>{
        navigation.navigate('Login');
    }

  const handleSignup = async () => {
    if(!email || !password || !displayName || !confirmPassword){
      Alert.alert('Sign-Up Error', 'ALl Fields Are Mandatory!!');
      return
    }
    try {
        setLoading(true);
        if (password !== confirmPassword) {
            const errorMessage = "The two passwords must be the same";
            Alert.alert('Sign-Up Error', errorMessage);
            setLoading(false);
            return;
          }
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            displayName,
            password,
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
          console.log('Sign-Up error:', errorMessage);
          Alert.alert('Sign-Up Error', errorMessage);
          setLoading(false);
      }
    } catch (error) {
      console.log('Sign-Up error:', error.message);
      Alert.alert('Sign-Up Error', error.message);
    }
  };

  return (
    
        loading ? (
              <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
              </View>
            )   : (
              
                <LinearGradient
                colors = {['#450101','#090130']}
                       style={styles.gradient}
                        >
              <View style={styles.container}>
                <Text style={styles.title}>Create A New Account!</Text>
                <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#aaa" style={styles.icon} />
                     <TextInput
                        placeholderTextColor="white"
                        placeholder="Name"
                        value={displayName}
                        onChangeText={setDisplayName}
                        style={styles.input}
                        />
                </View>
                <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="white"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        placeholderTextColor="white"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                <Icon name="check-circle" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholderTextColor="white"
                        placeholder="Confirm Password"
                        underlineColorAndroid="transparent"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                      />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSignup} >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goLogIn}>
                <Text style={styles.signupText}>Already have an account? log In</Text>
              </TouchableOpacity>
      
            </View>
            </LinearGradient>
            )
          
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    width:'100%'
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: 'white',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    color:'white'
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: 'white',
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
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
