import Button from "./components/Button";
import styles from "./conts/Styles";
import {View, Text, KeyboardAvoidingView} from "react-native";
import axios from "./components/axios";
import EncryptedStorage from "react-native-encrypted-storage";
import {useNavigation} from "@react-navigation/native";
import React, {useState, useEffect, useContext} from "react";
import {ThemeContext} from "./components/ThemeContext";
import {COLORS} from "./conts/colors";

// Define WalletPage component
function WalletPage() {
  // Access theme context and define state variables
  const {theme} = useContext(ThemeContext);
  const [balance, setBalance] = useState("");
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const [statusMsg, setStatusMsg] = useState("");

  // useEffect hook to fetch user balance when the component is mounted or focused
  useEffect(() => {
    const FetchBalance = async () => {
      try {
        // Get token from encrypted storage
        const _token = await EncryptedStorage.getItem("token");

        if (_token !== undefined) {
          setToken(_token);

          // Set headers for API request
          const headers = {headers: {Authorization: `Bearer ${_token}`}};

          // Make API request to get user balance
          axios
            .get("/user", headers)
            .then(response => {
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

    // Add listener to fetch balance when the screen is focused
    navigation.addListener("focus", () => {
      FetchBalance();
    });
  }, [navigation]);

  // Function to update the user's balance
  const UpdateBalance = summa => {
    setBalance(balance + summa);
    const payload = {
      balance: balance + summa,
    };

    // Make API request to update user balance
    axios
      .put("/user/balance", payload, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setStatusMsg(response.data.message);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  // Function to remove user's balance (donate)
  const RemoveBalance = () => {
    setBalance(0);
    const payload = {
      balance: 0,
    };

    // Make API request to remove user balance
    axios
      .put("/user/balance", payload, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setStatusMsg(response.data.message);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  // Render WalletPage JSX
  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      {/* Display balance header */}
      <View style={styles.buttonContainer}>
        <Text style={[styles.text, {color: COLORS[theme].primary}]}>
          Balance
        </Text>
      </View>

      {/* Display user's balance */}
      <View style={styles.walletContainer}>
        <Text
          style={{
            color: COLORS[theme].primary,
            fontSize: 30,
            fontWeight: "bold",
          }}>
          {balance}€
        </Text>
      </View>

      {/* Render buttons to update or remove user's balance */}
      <View style={styles.walletContainer}>
        <Button title="Add 5€" onPress={() => UpdateBalance(5)} />
        <Button title="Add 10€" onPress={() => UpdateBalance(10)} />
        <Button title="Add 25€" onPress={() => UpdateBalance(25)} />
        <Button title="Donate all" onPress={() => RemoveBalance()} />
      </View>
    </KeyboardAvoidingView>
  );
}
export default WalletPage;
