import React, { useState, useContext, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { Input3, InputRestaurant, InputRestaurant2 } from "./components/Input";
import Button from "./components/Button";
import { COLORS } from "./conts/colors";
import { ThemeContext } from "./components/ThemeContext";
import styles from "./conts/Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GetToken } from "./components/Token";
import axios from "./components/axios";
import { useNavigation } from "@react-navigation/native";

// Define EditRestaurant component
function EditRestaurant() {
  // Initialize state variables and context
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [numInputs, setNumInputs] = useState(1);
  const [image, setImage] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  // Fetch the restaurant profile when the screen is focused
  useEffect(() => {
    const FetchProfile = async () => {
      const token = await GetToken();

      if (token !== undefined) {
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        axios
          .get("/restaurant/me", headers)
          .then(response => {
            console.log(JSON.stringify(response.data) + "asdasd");
            const res = response.data[0];
            const { name, description, address, image } = res;
            const menus = res.menus;

            setName(name);
            setAddress(address);
            setDescription(description);
            setImage(image);
            setNumInputs(menus.length);
            setFoodItems(JSON.parse(JSON.stringify(menus)));
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("No jwt found");
      }
    };

    navigation.addListener("focus", () => {
      ResetStatusMsg();
      FetchProfile();
    });
  }, [navigation]);

  // Function to add a new food item to the foodItems array
  const handleAddFood = () => {
    const newFoodItem = { name: foodName, price: price };
    setFoodItems([...foodItems, newFoodItem]);
    setFoodName("");
    setPrice("");
    setNumInputs(numInputs + 1);
  };

  // Function to handle the submission of the edited restaurant details
  const handleEditRestaurant = async () => {
    const token = await GetToken();
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    if (!token) {
      return;
    }

    const restaurantDetails = {
      name: name,
      address: address,
      description: description,
      image: image,
      menus: foodItems,
    };
    console.log(restaurantDetails);

    // Send the edited restaurant details to the backend
    axios
      .put("/restaurant/update", restaurantDetails, headers)
      .then(response => {
        console.log(response);
        setStatusMsg("Restaurant Updated Successfully");
        setName("");
        setAddress("");
        setDescription("");
        setImage("");
        setFoodItems([]);
        setFoodName("");
        setPrice("");
        setNumInputs(1);

        // Navigate to the restaurant page after 0.5 seconds if the restaurant is successfully added
        if (response.status === 200) {
          setTimeout(() => {
            navigation.navigate("Restaurant");
          }, 500);
        }
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  // Function to reset status message
  const ResetStatusMsg = () => {
    setStatusMsg("");
  };

  // Render EditRestaurant JSX
  return (
    <ScrollView style={{ backgroundColor: COLORS[theme].quaternary }}>
      <KeyboardAvoidingView
        style={[
          styles.containerRestaurant,
          { backgroundColor: COLORS[theme].quaternary },
        ]}>
        {/* Render input fields for restaurant details */}
        <View style={styles.inputContainer}>
          <InputRestaurant
            label={"Restaurant Name"}
            value={name}
            onChangeText={text => setName(text)}
            placeholder={"Restaurant Name"}
          />
          <InputRestaurant
            label={"Address"}
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder={"Address"}
          />
          <InputRestaurant
            label={"Image"}
            value={image}
            onChangeText={text => setImage(text)}
            placeholder={"Image Link"}
          />
          <InputRestaurant2
            label={"Description"}
            value={description}
            onChangeText={text => setDescription(text)}
            placeholder={"Description"}
          />
        </View>
        {/* Render input fields for food items */}
        <View style={{ width: "80%" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <Text style={[styles.label, { color: COLORS[theme].primary }]}>
                Food Name
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text style={[styles.label, { color: COLORS[theme].primary }]}>
                Price
              </Text>
            </View>
          </View>
          {Array.from({ length: numInputs }).map((_, index) => (
            <View key={index} style={{ flexDirection: "row", marginVertical: 5 }}>
              <View style={{ width: "50%" }}>
                <Input3
                  value={foodItems[index]?.name || ""}
                  onChangeText={text => {
                    const newFoodItems = [...foodItems];
                    newFoodItems[index] = { ...newFoodItems[index], name: text };
                    setFoodItems(newFoodItems);
                  }}
                  placeholder={"Food Name"}
                />
              </View>
              <View style={{ width: "40%" }}>
                <Input3
                  value={foodItems[index]?.price?.toString() || ""}
                  onChangeText={text => {
                    const newFoodItems = [...foodItems];
                    newFoodItems[index] = { ...newFoodItems[index], price: text };
                    setFoodItems(newFoodItems);
                  }}
                  keyboardType={"numeric"}
                  placeholder={"Price"}
                />
              </View>
              <View style={{ width: "10%", justifyContent: "center" }}>
                <Icon
                  name="minus-circle-outline"
                  size={30}
                  onPress={() => {
                    if (numInputs > 1) {
                      const newFoodItems = [...foodItems];
                      newFoodItems.splice(index, 1);
                      setFoodItems(newFoodItems);
                      setNumInputs(numInputs - 1);
                    } else {
                      setStatusMsg("At least one food item is required");
                      return;
                    }
                  }}
                  style={{ color: COLORS[theme].primary }}
                />
              </View>
            </View>
          ))}
          <View>
            <View style={{ marginRight: 10 }}>
              <Icon
                name="plus-circle-outline"
                size={30}
                onPress={handleAddFood}
                style={{ color: COLORS[theme].primary }}
              />
            </View>
            {/* Render button to submit edited restaurant details */}
            <View style={[styles.buttonContainer]}>
              <Button title="Save" onPress={handleEditRestaurant} />
            </View>
          </View>
        </View>
        {/* Render status message */}
        <View style={styles.statusMsgContainer}>
          <Text
            style={{
              color: COLORS[theme].primary,
            }}>
            {statusMsg ? statusMsg : ""}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default EditRestaurant;
