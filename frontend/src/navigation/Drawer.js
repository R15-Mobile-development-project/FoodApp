import {createDrawerNavigator} from "@react-navigation/drawer";
import SettingsPage from "../SettingsPage";
import HomePage from "../HomePage";
import CustomDrawer from "../components/CustomDrawer";
import ProfilePage from "../ProfilePage";
import HistoryPage from "../HistoryPage";
import LogoutPage from "../LogoutPage.js";
import {COLORS} from "../conts/colors";
import {ThemeContext} from "../components/ThemeContext";
import {useContext, useEffect, useState} from "react";
import AddRestaurantPage from "../Addrestaurant";
import jwt_decode from "jwt-decode";
import {GetToken} from "../components/Token";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const [userType, setUserType] = useState(0);
  useEffect(() => {
    const CheckToken = async () => {
      const token = await GetToken();
      const decodedToken = jwt_decode(token);

      setUserType(decodedToken["userType"]);
      console.log("User type:", decodedToken["userType"]);
    };
    CheckToken();
  }, []);

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
      <Drawer.Screen name="Settings" component={SettingsPage} />
      <Drawer.Screen name="Order History" component={HistoryPage} />
      {userType ? (
        <Drawer.Screen name="Add restaurant" component={AddRestaurantPage} />
      ) : null}
      <Drawer.Screen name="Log out" component={LogoutPage} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
