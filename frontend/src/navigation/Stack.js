import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import MyDrawer from "./Drawer";
import { useEffect, useState, useContext } from "react";
import { GetToken } from "../components/Token";
import axios from "../components/axios";
import WalletPage from "../WalletPage";
import AddRestaurantPage from "../Addrestaurant";
import EditRestaurant from "../EditRestaurantPage";
import OrderPage from "../OrderPage";
import CheckoutPage from "../CheckoutPage";
import { ThemeContext } from "../components/ThemeContext";
import { COLORS } from "../conts/colors";

// Create a Stack navigator using createStackNavigator function
const Stack = createStackNavigator();

// Define the MyStack component
const MyStack = () => {
  // Use useState and useEffect hooks to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(true);
    // Check the user's token to see if they are logged in
    const CheckToken = async () => {
      const token = await GetToken();

      if (token && token !== null) {
        console.log("Token found");

        const headers = { headers: { Authorization: `Bearer ${token}` } };

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

  // If still loading, don't show anything
  if (isLoading) {
    return <></>;
  }

  // Render the Stack navigator component with screens and props
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        <Stack.Screen
          name="Wallet"
          component={WalletPage}
          options={{
            headerShown: true,
            headerTitle: "Wallet",
            headerStyle: { backgroundColor: COLORS[theme].primary },
            headerTintColor: COLORS[theme].quaternary,
          }}
        />
        <Stack.Screen
          name="EditRestaurant"
          component={EditRestaurant}
          options={{
            headerShown: true,
            headerTitle: "Edit restaurant",
            headerStyle: { backgroundColor: COLORS[theme].primary },
            headerTintColor: COLORS[theme].quaternary,
          }}
        />
        <Stack.Screen
          name="AddRestaurant"
          component={AddRestaurantPage}
          options={{
            headerShown: true,
            headerTitle: "Add restaurant",
            headerStyle: { backgroundColor: COLORS[theme].primary },
            headerTintColor: COLORS[theme].quaternary,
          }}
        />
        <Stack.Screen
          name="OrderPage"
          component={OrderPage}
          options={{
            headerShown: true,
            headerTitle: "Menu",
            headerStyle: { backgroundColor: COLORS[theme].primary },
            headerTintColor: COLORS[theme].quaternary,
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutPage}
          options={{
            headerShown: true,
            headerTitle: "Checkout",
            headerStyle: { backgroundColor: COLORS[theme].primary },
            headerTintColor: COLORS[theme].quaternary,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
