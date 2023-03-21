import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsPage from '../SettingsPage';
import HomePage from '../HomePage';
import CustomDrawer from '../components/CustomDrawer';
import RegisterPage from '../RegisterPage';
import LoginPage from '../LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import COLORS from '../conts/colors';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {backgroundColor: COLORS.quaternary, width: 240},

          headerTintColor: COLORS.quaternary,
          headerTitleStyle: {color: COLORS.quaternary},
          headerStyle: {backgroundColor: COLORS.primary},
          //TODO drawerActiveBackgroundColor better when there are better colors
          drawerActiveBackgroundColor: COLORS.primary,
          drawerActiveTintColor: COLORS.quaternary,
          drawerInactiveTintColor: COLORS.primary,
        }}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="settings" component={SettingsPage} />
        <Drawer.Screen name="Register" component={RegisterPage} />
        <Drawer.Screen name="Login" component={LoginPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;
