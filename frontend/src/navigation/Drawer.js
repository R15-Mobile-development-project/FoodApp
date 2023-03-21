import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsPage from '../SettingsPage';
import HomePage from '../HomePage';
import CustomDrawer from '../components/CustomDrawer';
import RegisterPage from '../RegisterPage';
import ProfilePage from '../ProfilePage';
import LoginPage from '../LoginPage';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Profile" component={ProfilePage} />
        <Drawer.Screen name="settings" component={SettingsPage} />
        <Drawer.Screen name="Register" component={RegisterPage} />
        <Drawer.Screen name="Login" component={LoginPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;
