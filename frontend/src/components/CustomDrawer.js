import React, {useState, useEffect} from "react";
import {View, Text} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {COLORS} from "../conts/colors";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "./axios";
import {ThemeContext} from "./ThemeContext";
import {useContext} from "react";
import styles from "../conts/Styles";

// Define the CustomDrawer component
const CustomDrawer = props => {
  // Retrieve the current theme from the ThemeContext
  const {theme} = useContext(ThemeContext);
  // Get the navigation object from the useNavigation hook
  const navigation = useNavigation();
  // Initialize the firstName, lastName, and balance state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [balance, setBalance] = useState("");

  // Define an effect that fetches the user's profile information from the server and sets the state variables accordingly
  useEffect(() => {
    const FetchProfile = async () => {
      try {
        // Retrieve the user's JWT token from encrypted storage
        const token = await EncryptedStorage.getItem("token");

        if (token !== undefined) {
          // Set the headers object with the JWT token
          const headers = {headers: {Authorization: `Bearer ${token}`}};

          // Send a GET request to the server to retrieve the user's profile information
          axios
            .get("/user", headers)
            .then(response => {
              console.log(response.data);
              // Set the firstName, lastName, and balance state variables based on the response data
              setFirstName(response.data.fname);
              setLastName(response.data.lname);
              setBalance(response.data.balance);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("No jwt found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Add a focus listener to the navigation object that triggers the FetchProfile function
    navigation.addListener("focus", () => {
      FetchProfile();
    });
  }, [navigation]);

  // Render the CustomDrawer component
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: COLORS[theme].primary,
      }}>
      <View style={styles.drawerView2}>
        <Text style={[styles.drawerText1, {color: COLORS[theme].quaternary}]}>
          {firstName} {lastName}
        </Text>
        <View style={styles.drawerView3}>
          <Text style={[styles.drawerText2, {color: COLORS[theme].quaternary}]}>
            {balance}€
          </Text>
          <View style={[{justifyContent: "space-evenly", marginVertical: 10}]}>
            <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
              <Icon name="wallet" size={30} color={COLORS[theme].quaternary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.drawerView,
          {backgroundColor: COLORS[theme].quaternary},
        ]}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
