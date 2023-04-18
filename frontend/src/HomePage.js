import React, {useState, useEffect, useContext} from "react";
import {View, Text, Image, ActivityIndicator} from "react-native";
import {COLORS} from "./conts/colors";
import styles from "./conts/Styles";
import {Card, ListItem, Button, Icon} from "@rneui/themed";
import axios from "./components/axios";
import EncryptedStorage from "react-native-encrypted-storage";
import {ThemeContext} from "./components/ThemeContext";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";

// Define the HomePage component
function HomePage() {
  // Initialize state variables
  const navigation = useNavigation();
  const {theme, setTheme, toggleTheme} = useContext(ThemeContext);
  const [token, setToken] = useState(null);
  const [arrayCount, setArrayCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMorePages, setNoMorePages] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the restaurant list when the component is mounted or receives focus
  useEffect(() => {
    const FetchRestaurant = async () => {
      try {
        const _token = await EncryptedStorage.getItem("token");

        if (_token !== undefined) {
          setToken(_token);
          const headers = {headers: {Authorization: `Bearer ${_token}`}};

          axios
            .get("/restaurant/1", headers)
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
      FetchRestaurant();
    });
  }, [navigation]);

  // Function handles scroll events on container, calculates current page, updates it if needed, fetches new data if more pages to fetch.
  const handleScroll = async event => {
    let page = Math.round(
      event.nativeEvent.contentOffset.y /
        event.nativeEvent.layoutMeasurement.height,
    );

    // Update the page number if needed
    if (page === 1) {
      page = 2;
    }

    // Fetch more data if there are more pages to fetch
    if (page > currentPage && !noMorePages) {
      console.log("Fetching page: ", page);

      setCurrentPage(page);
      await fetchPage(page);
    }
  };

  // Function fetches data from the server
  const fetchPage = async page => {
    setIsLoading(true);
    const headers = {headers: {Authorization: `Bearer ${token}`}};

    axios
      .get("/restaurant/" + page, headers)
      .then(response => {
        if (response.data.length < 6) {
          setNoMorePages(true);
        }
        // Concatenate the new data to the existing array
        setArrayCount(arrayCount => [...arrayCount, ...response.data]);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  // Render the component
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
