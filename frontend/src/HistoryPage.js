import {View, Text} from "react-native";
import {Card} from "@rneui/themed";
import axios from "./components/axios";
import React, {useState, useEffect, useContext} from "react";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "./conts/colors";
import {ThemeContext} from "./components/ThemeContext";
import {ScrollView} from "react-native-gesture-handler";
import {GetToken} from "./components/Token";
import {ListItem} from "react-native-elements";

// Define the HistoryPage component
function HistoryPage() {
  // Define the states
  const [arrayCount, setArrayCount] = useState([]);
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  // Fetch the order history
  useEffect(() => {
    const FetchOrder = async () => {
      const token = await GetToken();

      if (token !== undefined) {
        const headers = {headers: {Authorization: `Bearer ${token}`}};

        axios
          .get("/order", headers)
          .then(response => {
            setArrayCount(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("No token found");
      }
    };
    navigation.addListener("focus", () => {
      FetchOrder();
    });
  }, [navigation]);

  // If there are no orders, display a message
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

  // Display the order history
  return (
    <>
      <ScrollView style={[{backgroundColor: COLORS[theme].quaternary}]}>
        {arrayCount.map((order, index) => (
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
                {order.restaurant_name}
                {"\n"}
              </Text>
              <Text style={{color: COLORS[theme].quaternary}}>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "UTC",
                  hour12: false,
                }).format(
                  new Date(order.date).setHours(
                    new Date(order.date).getHours() - 1,
                  ),
                )}
              </Text>
            </Card.Title>
            <Card.Divider
              style={{
                borderBottomColor: COLORS[theme].quaternary,
                borderBottomWidth: 1,
              }}
            />
            {order.items.map((item, itemIndex) => (
              <ListItem
                key={itemIndex}
                containerStyle={{
                  backgroundColor: COLORS[theme].primary,
                  marginTop: -10,
                  marginBottom: -10,
                }}>
                <ListItem.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View style={{flex: 1}}>
                      <ListItem.Title
                        style={{
                          color: COLORS[theme].quaternary,
                        }}>
                        {item.name}
                      </ListItem.Title>
                    </View>
                    <View>
                      <ListItem.Subtitle
                        style={{
                          color: COLORS[theme].quaternary,
                        }}>
                        {item.item_price}€
                      </ListItem.Subtitle>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))}
            <Card.Divider
              style={{
                borderBottomColor: COLORS[theme].quaternary,
                borderBottomWidth: 1,
                marginTop: 10,
              }}
            />
            <View>
              <Text style={{color: COLORS[theme].quaternary, fontSize: 16}}>
                Total: {order.price}€
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

export default HistoryPage;
