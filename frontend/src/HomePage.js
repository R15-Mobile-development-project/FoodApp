import React, {useState, useEffect, useContext} from "react";
import {View, Text, Image, ActivityIndicator} from "react-native";
import {COLORS} from "./conts/colors";
import styles from "./conts/Styles";
import {Card, Button} from "@rneui/themed";
import axios from "./components/axios";
import EncryptedStorage from "react-native-encrypted-storage";
import {ThemeContext} from "./components/ThemeContext";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";

function HomePage() {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const [token, setToken] = useState(null);
  const [arrayCount, setArrayCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMorePages, setNoMorePages] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const FetchRestaurant = async () => {
      try {
        const _token = await EncryptedStorage.getItem("token");

        if (_token !== undefined) {
          setToken(_token);

          const headers = {headers: {Authorization: `Bearer ${_token}`}};

          axios
            .get("/restaurant/page/1", headers)
            .then(response => {
              setArrayCount(response.data);
              setIsLoading(false);
            })
            .catch(err => {
              console.log(err);
              setIsLoading(false);
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    navigation.addListener("focus", () => {
      setCurrentPage(0);
      setNoMorePages(false);
      FetchRestaurant();
    });
  }, [navigation]);

  const handleScroll = async event => {
    let page = Math.round(
      event.nativeEvent.contentOffset.y /
        event.nativeEvent.layoutMeasurement.height,
    );

    if (page === 1) {
      page = 2;
    }

    if (page > currentPage && !noMorePages) {
      console.log("Fetching page: ", page);

      setCurrentPage(page);
      await fetchPage(page);
    }
  };

  const fetchPage = async page => {
    setIsLoading(true);
    const headers = {headers: {Authorization: `Bearer ${token}`}};

    axios
      .get("/restaurant/page/" + page, headers)
      .then(response => {
        if (response.data.length < 6) {
          setNoMorePages(true);
        }
        setArrayCount(arrayCount => [...arrayCount, ...response.data]);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
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
              onPress={() =>
                navigation.navigate("OrderPage", {
                  restaurant_id: item.restaurant_id,
                })
              }
            />
          </View>
        </Card>
      ))}
      {isLoading ? (
        <ActivityIndicator
          style={[styles.noDataText, {marginBottom: 40}]}
          color={COLORS[theme].primary}
          size="large"
        />
      ) : (
        <></>
      )}
      {arrayCount.length === 0 && !isLoading ? (
        <Text style={[styles.noDataText, {color: COLORS[theme].primary}]}>
          There aren't any restaurants.
        </Text>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

export default HomePage;
