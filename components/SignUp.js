import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator,StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



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
    <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" color="blue" />
            )   : (
                <>
                     <TextInput
                        placeholder="Name"
                        value={displayName}
                        onChangeText={setDisplayName}
                        style={styles.input}
                        />
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
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
      />
      <Button title="Sign-Up" onPress={handleSignup} />
      <Button title="Log-In" onPress={goLogIn} />
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

export default SignupScreen;
