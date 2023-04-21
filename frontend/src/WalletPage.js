import Button from "./components/Button";
import styles from "./conts/Styles";
import { View, Text, KeyboardAvoidingView } from "react-native";
import axios from "./components/axios";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./components/ThemeContext";
import { COLORS } from "./conts/colors";
import { GetToken } from "./components/Token";

function WalletPage() {
  const { theme } = useContext(ThemeContext);
  const [balance, setBalance] = useState("");
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const [statusMsg, setStatusMsg] = useState("");
  useEffect(() => {
    const FetchBalance = async () => {
      const _token = await GetToken();

      if (_token !== undefined) {
        setToken(_token);

        const headers = { headers: { Authorization: `Bearer ${_token}` } };

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
    };
    navigation.addListener("focus", () => {
      FetchBalance();
    });
  }, [navigation]);

  const UpdateBalance = summa => {
    setBalance(balance + summa);
    const payload = {
      balance: balance + summa,
    };

    axios
      .put("/user/balance", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setStatusMsg(response.data.message);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  const RemoveBalance = () => {
    setBalance(0);
    const payload = {
      balance: 0,
    };

    axios
      .put("/user/balance", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setStatusMsg(response.data.message);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: COLORS[theme].quaternary }]}>
      <View style={styles.buttonContainer}>
        <Text style={[styles.text, { color: COLORS[theme].primary }]}>
          Balance
        </Text>
      </View>
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
