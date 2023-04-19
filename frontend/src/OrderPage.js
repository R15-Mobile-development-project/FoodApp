import React, {useState, useEffect, useContext} from "react";
import {View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";
import {ThemeContext} from "./components/ThemeContext";
import axios from "./components/axios";
import {Card, Button} from "@rneui/themed";
import {COLORS} from "./conts/colors";
import {GetToken} from "./components/Token";

function OrderPage({route}) {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const [arrayCount, setArrayCount] = useState([]);
  const [cart, setCart] = useState([]);

  const {restaurant_id} = route.params;

  useEffect(() => {
    const FetchMenu = async () => {
      try {
        const token = await GetToken();

        if (token !== undefined) {
          const headers = {headers: {Authorization: `Bearer ${token}`}};

          axios
            .get(`/restaurant/${restaurant_id}/menu`, headers)
            .then(response => {
              setArrayCount(response.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    navigation.addListener("focus", () => {
      FetchMenu();
    });
  }, [navigation]);

  const AddCart = (id, name, price) => {
    const item = {id, name, price};
    console.log("Adding to cart: " + JSON.stringify(item));

    // Check if the item already exists in the cart
    const itemExists = cart.some(x => x.id === id);

    if (!itemExists) {
      // If the item doesn't exist, add it to the cart
      setCart(cart => [...cart, item]);
    } else {
      // If the item already exists, update the quantity of the existing item in the cart
      const updatedCart = cart.map(x =>
        x.id === id ? {...x, quantity: x.quantity + 1} : x,
      );
      setCart(updatedCart);
    }
  };

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
            <View style={{flexDirection: "row"}}>
              <Card.Title>
                <Text style={{color: COLORS[theme].quaternary, fontSize: 20}}>
                  {item.name}
                </Text>
              </Card.Title>
              <View style={{width: "40%", alignItems: "flex-end", flex: 1}}>
                <Button
                  title={item.price + "€"}
                  buttonStyle={{
                    backgroundColor: COLORS[theme].quaternary,
                    borderRadius: 5,
                    width: 60,
                  }}
                  titleStyle={{
                    color: COLORS[theme].primary,
                  }}
                  onPress={() => AddCart(item.menu_id, item.name, item.price)}
                />
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      <Button
        title="PROCEED TO CHECKOUT"
        disabled={cart.length === 0}
        buttonStyle={{
          backgroundColor: COLORS[theme].secondary,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 20,
        }}
        disabledStyle={{
          backgroundColor: COLORS[theme].quaternary,
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

export default OrderPage;
