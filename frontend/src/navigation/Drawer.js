import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsPage from '../SettingsPage';
import HomePage from '../HomePage';
import CustomDrawer from '../components/CustomDrawer';
import ProfilePage from '../ProfilePage';
import HistoryPage from '../HistoryPage';
import styles from '../conts/Styles';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={styles.test}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="settings" component={SettingsPage} />
      <Drawer.Screen name="Order History" component={HistoryPage} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
