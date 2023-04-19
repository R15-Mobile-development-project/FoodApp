import {View, Text} from "react-native";
import {Card, Button} from "@rneui/themed";
import axios from "./components/axios";
import EncryptedStorage from "react-native-encrypted-storage";
import React, {useState, useEffect, useContext} from "react";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "./conts/colors";
import {ThemeContext} from "./components/ThemeContext";
import {ScrollView} from "react-native-gesture-handler";
import {LogBox} from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

function CheckoutPage({route}) {
  const navigation = useNavigation();

  const [cart, setCart] = useState([]);
  const {theme} = useContext(ThemeContext);
  const {restaurant_id, cartItems} = route.params;

  useEffect(() => {
    setCart(cartItems);
  }, []);

  /* const CreateOrder = async () => {
    try {
      axios
        .post(
          `/restaurant/${restaurant_id}/order`,
          {},
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <>
      <ScrollView style={[{backgroundColor: COLORS[theme].quaternary}]}>
        {cart.map((item, index) => (
          <Card
            key={index}
            containerStyle={{
              justifyContent: "center",
              backgroundColor: COLORS[theme].primary,
              borderRadius: 5,
              borderColor: COLORS[theme].primary,
            }}>
            <Card.Title>
              <Text style={{color: COLORS[theme].quaternary}}>{item.name}</Text>
            </Card.Title>
            <Card.Divider
              style={{
                borderBottomColor: COLORS[theme].quaternary,
                borderBottomWidth: 1,
              }}
            />
            <View>
              <Text style={{color: COLORS[theme].quaternary}}>
                {item.price}€
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>

      <Button
        title="PAY"
        buttonStyle={{
          backgroundColor: COLORS[theme].secondary,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 20,
        }}
        titleStyle={{
          color: COLORS[theme].quaternary,
          fontSize: 20,
          fontWeight: "bold",
        }}
        onPress={() =>
          navigation.navigate("Checkout", {
            restaurant_id: restaurant_id,
            cartItems: cart,
          })
        }
      />
    </>
  );
}

export default CheckoutPage;
