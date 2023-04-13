import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import MyDrawer from "./Drawer";
import {useEffect, useState} from "react";
import {GetToken} from "../components/Token";
import axios from "../components/axios";
import WalletPage from "../WalletPage";
import AddRestaurantPage from "../Addrestaurant";
import EditRestaurant from "../EditRestaurantPage";
import {ThemeContext} from "../components/ThemeContext";
import {useContext} from "react";
import {COLORS} from "../conts/colors";

const Stack = createStackNavigator();

const MyStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(true);
    const CheckToken = async () => {
      console.log("Checking token");
      const token = await GetToken();

      if (token && token !== null) {
        console.log("Token found");

        const headers = {headers: {Authorization: `Bearer ${token}`}};

        axios
          .get("/user", headers)
          .then(response => {
            console.log("Valid token");
            setIsLoggedIn(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.log("Invalid token");
            setIsLoading(false);
          });
      } else {
        console.log("No token found");
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
          <Stack.Screen name="MyDrawer" component={MyDrawer} />
        ) : (
          <></>
        )}
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        {!isLoggedIn ? (
          <Stack.Screen name="MyDrawer" component={MyDrawer} />
        ) : (
          <></>
        )}
        <Stack.Screen name="Wallet" component={WalletPage} />
        <Stack.Screen
          name="EditRestaurant"
          component={EditRestaurant}
          options={{
            headerShown: true,
            headerTitle: "Add restaurant",
            headerStyle: {backgroundColor: COLORS[theme].primary},
            headerTintColor: COLORS[theme].quaternary,
          }}
        />
        <Stack.Screen
          name="AddRestaurant"
          component={AddRestaurantPage}
          options={{
            headerShown: true,
            headerTitle: "Add restaurant",
            headerStyle: {backgroundColor: COLORS[theme].primary},
            headerTintColor: COLORS[theme].quaternary,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
