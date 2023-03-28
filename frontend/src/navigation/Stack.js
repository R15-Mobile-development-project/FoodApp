import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import MyDrawer from './Drawer';
import WalletPage from '../WalletPage';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="Wallet" component={WalletPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
