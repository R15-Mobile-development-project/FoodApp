import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsPage from '../SettingsPage';
import HomePage from '../HomePage';
import CustomDrawer from '../components/CustomDrawer';
import ProfilePage from '../ProfilePage';
import HistoryPage from '../HistoryPage';
import COLORS from '../conts/colors';
import LogoutPage from '../LogoutPage.js';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
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
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="settings" component={SettingsPage} />
      <Drawer.Screen name="Order History" component={HistoryPage} />
      <Drawer.Screen name="Log out" component={LogoutPage} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
