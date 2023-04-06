import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import MyDrawer from './Drawer';
import SaldoPage from '../SaldoPage';
import {useEffect, useState} from 'react';
import {GetToken} from '../components/Token';
import axios from '../components/axios';

const Stack = createStackNavigator();

const MyStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const CheckToken = async () => {
      console.log('Checking token');
      const token = await GetToken();

      if (token && token !== null) {
        console.log('Token found');

        const headers = {headers: {Authorization: `Bearer ${token}`}};

        axios
          .get('/user', headers)
          .then(response => {
            console.log('Valid token');
            setIsLoggedIn(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.log('Invalid token');
            setIsLoading(false);
          });
      } else {
        console.log('No token found');
        setIsLoading(false);
      }
    };
    CheckToken();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MyDrawer" component={MyDrawer} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="MyDrawer" component={MyDrawer} />
            <Stack.Screen name="Wallet" component={SaldoPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
