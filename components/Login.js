import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator,StyleSheet,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


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
    <View style={styles.container}>

      {loading ? (
            <ActivityIndicator size="large" color="blue" />
           )  : (
            <>
            <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Log-In" onPress={handleEmailLogin} />
      <Button title="Sign-Up" onPress={goSignIn} />
      </>
           )
       }
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      paddingHorizontal: 10,
    },
  });
  
export default LoginScreen;
