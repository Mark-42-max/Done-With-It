import {useState, useEffect} from 'react';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import HomeScreen from "./app/screens/HomeScreen";
import LoadScreen from "./app/screens/LoadScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Stack = createNativeStackNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if(token !== null) {
          setIsLoggedIn(true);
        }
        else{
          setIsLoggedIn(false);
        }
      } catch(e) {
        console.log(e);
      }
    }

    getData();
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      {isLoggedIn === null ? 
      
        <Stack.Screen name="Loading" component={LoadScreen} />
      
      
      : isLoggedIn ? 
      
        <Stack.Screen name="Home" component={HomeScreen} />
      :
      <>
        <Stack.Screen name="Login" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={ViewImageScreen} />
      </>
      }
      </Stack.Navigator>
      
    </NavigationContainer>

  );
}
