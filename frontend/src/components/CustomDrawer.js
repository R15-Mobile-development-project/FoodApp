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
import axios from "./axios";
import {ThemeContext} from "./ThemeContext";
import {useContext} from "react";
import styles from "../conts/Styles";
import {GetToken} from "../components/Token";

const CustomDrawer = props => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const FetchProfile = async () => {
      const token = await GetToken();

      if (token !== undefined) {
        const headers = {headers: {Authorization: `Bearer ${token}`}};

        axios
          .get("/user", headers)
          .then(response => {
            console.log(response.data);
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
    };

    navigation.addListener("focus", () => {
      FetchProfile();
    });
  }, [navigation]);

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
