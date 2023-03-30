import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsPage from '../SettingsPage';
import HomePage from '../HomePage';
import CustomDrawer from '../components/CustomDrawer';
import ProfilePage from '../ProfilePage';
import HistoryPage from '../HistoryPage';
import {COLORS} from '../conts/colors';
import {ThemeContext} from '../components/ThemeContext';
import {useContext} from 'react';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {backgroundColor: COLORS[theme].quaternary, width: 240},
        headerTintColor: COLORS[theme].quaternary,
        headerTitleStyle: {color: COLORS[theme].quaternary},
        headerStyle: {backgroundColor: COLORS[theme].primary},
        drawerActiveBackgroundColor: COLORS[theme].primary,
        drawerActiveTintColor: COLORS[theme].quaternary,
        drawerInactiveTintColor: COLORS[theme].primary,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="settings" component={SettingsPage} />
      <Drawer.Screen name="Order History" component={HistoryPage} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
