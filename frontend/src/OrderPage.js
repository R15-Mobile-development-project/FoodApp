import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "./components/ThemeContext";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "./components/axios";
import { Card, Button } from "@rneui/themed";
import { COLORS } from "./conts/colors";

function OrderPage({ route }) {
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const [token, setToken] = useState(null);
    const [arrayCount, setArrayCount] = useState([]);
    const { restaurant_id } = route.params;

    useEffect(() => {
        const FetchMenu = async () => {
            try {
                const _token = await EncryptedStorage.getItem("token");


                if (_token !== undefined) {
                    setToken(_token);

                    const headers = { headers: { Authorization: `Bearer ${_token}` } };

                    axios
                        .get(`/restaurant/${restaurant_id}/menu`, {
                            headers: { Authorization: `Bearer ${_token}` },
                        })
                        .then(response => {
                            setArrayCount(response.data);
                        }
                        )
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
    console.log(arrayCount + "arrayCount")
    console.log(restaurant_id + "restaurant_id")
    return (
        <ScrollView style={[{ backgroundColor: COLORS[theme].quaternary }]}>
            {arrayCount.map((item, index) => (
                <Card key={index}
                    containerStyle={{
                        justifyContent: "center",
                        backgroundColor: COLORS[theme].primary,
                        borderRadius: 5,
                        borderColor: COLORS[theme].primary,
                    }}>
                    <View style={{ flexDirection: "row" }}>
                        <Card.Title>
                            <Text style={{ color: COLORS[theme].quaternary, fontSize: 20 }}>
                                {item.name}
                            </Text>
                        </Card.Title>
                        <View style={{ width: "40%", alignItems: "flex-end", flex: 1 }}>
                            <Button
                                title={item.price + "€"}
                                buttonStyle={{
                                    backgroundColor: COLORS[theme].quaternary,
                                    borderRadius: 5,
                                    width: 60
                                }}
                                titleStyle={{
                                    color: COLORS[theme].primary,
                                }}
                            />
                        </View>
                    </View>
                </Card>
            ))}

        </ScrollView>
    )
}

export default OrderPage;