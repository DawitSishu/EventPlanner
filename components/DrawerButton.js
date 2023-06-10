import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text,TouchableOpacity,Alert} from 'react-native';



const DrawerButton = () => {
    const navigation = useNavigation();
    const handlelogOut = () =>{
      Alert.alert(
        'Confirm Log Out',
        'Are you sure you want to Log Out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Log-Out',
            style: 'destructive',
            onPress: () => navigation.navigate('Login')
          },
        ],
        { cancelable: true }
      );
    }

    return (
            <TouchableOpacity style ={{marginRight:12}} onPress={handlelogOut}>
              <Icon name="sign-out" size={30} color="red" />
              <Text style={{color:'red',fontSize :17,fontWeight:'bold'}}>Log Out</Text>
            </TouchableOpacity>
          )
}

export default DrawerButton;