import React, {useState, useEffect, useContext} from "react";
import {View, Text, Image} from "react-native";
import {COLORS} from "./conts/colors";
import styles from "./conts/Styles";
import {Card, ListItem, Button, Icon} from "@rneui/themed";
import axios from "./components/axios";
import EncryptedStorage from "react-native-encrypted-storage";
import {ThemeContext} from "./components/ThemeContext";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";

function HomePage() {
  const navigation = useNavigation();
  const {theme, setTheme, toggleTheme} = useContext(ThemeContext);
  const [token, setToken] = useState(null);
  const [arrayCount, setArrayCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const FetchRestaurant = async () => {
      try {
        const _token = await EncryptedStorage.getItem("token");

        if (_token !== undefined) {
          setToken(_token);

          const headers = {headers: {Authorization: `Bearer ${_token}`}};

          axios
            .get("/restaurant", {
              headers: {Authorization: `Bearer ${_token}`},
            })
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
      FetchRestaurant();
    });
  }, [navigation]);

  const handleScroll = event => {
    const page = Math.round(
      event.nativeEvent.contentOffset.y /
        event.nativeEvent.layoutMeasurement.height,
    );

    if (page > currentPage) {
      setCurrentPage(page);
    }
    console.log("Current page:", page);
  };

  return (
    <ScrollView
      style={[{backgroundColor: COLORS[theme].quaternary}]}
      disableIntervalMomentum={false}
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}>
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
            <Text style={{color: COLORS[theme].quaternary, fontSize: 20}}>
              {item.name}
            </Text>
          </Card.Title>
          <Card.Divider
            style={{
              borderBottomColor: COLORS[theme].quaternary,
              borderBottomWidth: 1,
            }}
          />
          <View style={{alignItems: "center", marginBottom: -10}}>
            <Image
              style={{width: "100%", height: 100, borderRadius: 5}}
              source={{
                uri: item.image,
              }}
            />
            <Button
              title="ORDER"
              titleStyle={{color: COLORS[theme].primary}}
              buttonStyle={{
                backgroundColor: COLORS[theme].quaternary,
                borderRadius: 3,
              }}
              containerStyle={{
                width: "100%",
                marginVertical: 10,
              }}
            />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

export default HomePage;
