import {View, Text} from "react-native";
import {Card} from "@rneui/themed";
import axios from "./components/axios";
import EncryptedStorage from "react-native-encrypted-storage";
import React, {useState, useEffect, useContext} from "react";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "./conts/colors";
import {ThemeContext} from "./components/ThemeContext";
import {ScrollView} from "react-native-gesture-handler";

function RestaurantHistoryPage() {
  const [arrayCount, setArrayCount] = useState([]);
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const FetchOrder = async () => {
      try {
        const token = await EncryptedStorage.getItem("token");

        if (token !== undefined) {
          const headers = {headers: {Authorization: `Bearer ${token}`}};

          axios
            .get("/restaurant/orders", headers)
            .then(response => {
              setArrayCount(response.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    navigation.addListener("focus", () => {
      FetchOrder();
    });
  }, [navigation]);

  if (
    arrayCount === null ||
    arrayCount === undefined ||
    arrayCount.length === 0
  ) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: COLORS[theme].quaternary,
        }}>
        <Text style={{color: COLORS[theme].primary}}>No orders found</Text>
      </View>
    );
  }
  console.log(arrayCount);
  return (
    <>
      <ScrollView style={[{backgroundColor: COLORS[theme].quaternary}]}>
        {arrayCount.map((item, index) => (
          <Card
            key={index}
            containerStyle={{
              justifyContent: "center",
              backgroundColor: COLORS[theme].primary,
              borderRadius: 5,
              borderColor: COLORS[theme].primary,
            }}>
            <Card.Title>
              <Text style={{color: COLORS[theme].quaternary}}>
                {new Date(item.date).toLocaleString("en", {hour12: false})}
              </Text>
            </Card.Title>
            <Card.Divider
              style={{
                borderBottomColor: COLORS[theme].quaternary,
                borderBottomWidth: 1,
              }}
            />
            <View style={{flexDirection: "row"}}>
              <View>
                <Text
                  style={{color: COLORS[theme].quaternary, textAlign: "left"}}>
                  {item.order_id}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{color: COLORS[theme].quaternary, textAlign: "right"}}>
                  {item.price}€
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

export default RestaurantHistoryPage;
