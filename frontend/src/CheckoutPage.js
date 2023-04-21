import { View, Text } from "react-native";
import { Card, Button } from "@rneui/themed";
import axios from "./components/axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "./conts/colors";
import { ThemeContext } from "./components/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import { LogBox } from "react-native";
import { GetToken } from "./components/Token";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

function CheckoutPage({ route }) {
  const navigation = useNavigation();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const { theme } = useContext(ThemeContext);
  const { restaurant_id, cartItems } = route.params;

  useEffect(() => {
    setCart(cartItems);

    let price = 0.0;
    Array.from(cartItems).forEach(item => {
      price += item.price;
    });

    setTotal(price);
  }, []);

  const CreateOrder = async () => {
    const token = await GetToken();
    const headers = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .post(`/restaurant/${restaurant_id}/order`, headers)
      .then(response => {
        // on success navigate somewhere and show status msg
        console.log(response.data);
      })
      .catch(err => {
        // on error show error msg
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView style={[{ backgroundColor: COLORS[theme].quaternary }]}>
        {cart.map((item, index) => (
          <Card
            key={index}
            containerStyle={{
              justifyContent: "center",
              backgroundColor: COLORS[theme].primary,
              borderRadius: 5,
              borderColor: COLORS[theme].primary,
            }}>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <Text>
                <Text style={{ color: COLORS[theme].quaternary, fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
              </Text>

              <View style={{ alignItems: "flex-end", flex: 1, justifyContent: "center" }}>
                <Text style={{ color: COLORS[theme].quaternary, fontSize: 20 }}>
                  {item.price}€
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView >

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS[theme].quaternary,
          paddingBottom: 10,
          paddingTop: 10,
        }}>
        <Text style={{ color: COLORS[theme].primary, fontSize: 30 }}>
          Total: {total.toFixed(2)} €
        </Text>
      </View>
      <View style={{ backgroundColor: COLORS[theme].quaternary }}>
        <Button
          title="PAY"
          buttonStyle={{
            backgroundColor: COLORS[theme].primary,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 5,
          }}
          titleStyle={{
            color: COLORS[theme].quaternary,
            fontSize: 20,
            fontWeight: "bold",
          }}
          onPress={() => {
            CreateOrder();
          }}
        />
      </View>
    </>
  );
}

export default CheckoutPage;
