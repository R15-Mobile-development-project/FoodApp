import React from "react";
import {View, Text, Image} from "react-native";
import COLORS from "./conts/colors";
import styles from "./conts/Styles";
import {Card, ListItem, Button, Icon} from "@rneui/themed";

function HomePage() {
  //const {theme} = useContext(ThemeContext);
  return (
    <Card containerStyle={{}} wrapperStyle={{}}>
      <Card.Title>RESTAURANT NAME</Card.Title>
      <Card.Divider />
      <View
        style={{
          position: "relative",
          alignItems: "center",
        }}>
        <Image
          style={{width: "100%", height: 100}}
          // resizeMode="contain"
          source={{
            uri: "https://cdn.discordapp.com/attachments/1040967489288421476/1090249059513675776/pizza.jpg",
          }}
        />
        <Button
          title="ORDER"
          buttonStyle={{
            backgroundColor: "rgba(78, 116, 289, 1)",
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
      </View>
    </Card>
  );
}

export default HomePage;
