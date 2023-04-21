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
import Restaurant from "../Restaurant";
import jwt_decode from "jwt-decode";
import {GetToken} from "../components/Token";
import RestaurantHistoryPage from "../RestaurantHistory";

// Create a Drawer navigator using createDrawerNavigator function
const Drawer = createDrawerNavigator();

// Define the MyDrawer component
const MyDrawer = () => {
  // Use useState and useEffect hooks to fetch and decode a token stored in the user's device
  // and extract the userType property from the decoded token
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

  // Use the useContext hook to access the theme chosen by the user
  const {theme} = useContext(ThemeContext);

  // Render the Drawer navigator component with screens and props
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
      {/* Conditionally render the Restaurant screen if the user is a restaurant owner */}
      {userType ? (
        <Drawer.Screen name="Restaurant" component={Restaurant} />
      ) : null}
      {userType ? (
        <Drawer.Screen name="History" component={RestaurantHistoryPage} />
      ) : null}
      <Drawer.Screen name="Log out" component={LogoutPage} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
