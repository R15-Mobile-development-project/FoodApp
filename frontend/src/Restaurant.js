import Button from "./components/Button";
import styles from "./conts/Styles";
import {View, Text, KeyboardAvoidingView, Alert} from "react-native";
import React, {useContext, useState} from "react";
import {ThemeContext} from "./components/ThemeContext";
import {COLORS} from "./conts/colors";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import axios from "./components/axios";
import {GetToken} from "./components/Token";

function Restaurant() {
  const {theme} = useContext(ThemeContext);
  const [statusMsg, setStatusMsg] = useState("");
  const [count, setCount] = useState();
  const navigation = useNavigation();

  const fetchRestaurantCount = async () => {
    const token = await GetToken();
    axios
      .get("/restaurant/count", {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        console.log("Restaurant count:", response.data.count);
        setCount(response.data.count);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deleteRestaurantAlert = () => {
    Alert.alert(
      "Delete Restaurant",
      "Are you sure you want to delete your restaurant?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {text: "OK", onPress: () => deleteRestaurant()},
      ],
      {cancelable: false},
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRestaurantCount();

      return () => {};
    }, []),
  );

  const deleteRestaurant = async () => {
    const token = await GetToken();

    axios
      .delete("/restaurant/delete", {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(async response => {
        setStatusMsg(response.data.message);
        fetchRestaurantCount();
        setTimeout(() => {
          ResetStatusMsg();
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  const ResetStatusMsg = () => {
    setStatusMsg("");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      <View style={styles.buttonContainer}>
        <Text style={[styles.text, {color: COLORS[theme].primary}]}>
          Restaurant
        </Text>
      </View>
      <View style={styles.walletContainer}>
        {count === 0 ? (
          <Button
            title="Add Restaurant"
            onPress={() => navigation.navigate("AddRestaurant")}
          />
        ) : (
          <>
            <Button
              title="Edit Restaurant"
              onPress={() => navigation.navigate("EditRestaurant")}
            />
            <Button title="Delete restaurant" onPress={deleteRestaurantAlert} />
          </>
        )}
      </View>
      <View style={styles.statusMsgContainer}>
        <Text
          style={{
            color: COLORS[theme].primary,
          }}>
          {statusMsg ? statusMsg : ""}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
export default Restaurant;
