import React, {useState, useEffect} from "react";
import {View, Text, KeyboardAvoidingView} from "react-native";
import {Input, Input2} from "./components/Input";
import Button from "./components/Button";
import axios from "./components/axios";
import {useNavigation} from "@react-navigation/native";
import {GetToken} from "./components/Token";
import {COLORS} from "./conts/colors";
import {ThemeContext} from "./components/ThemeContext";
import {useContext} from "react";
import styles from "./conts/Styles";

// Define ProfilePage component
function ProfilePage() {
  // Define state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const {theme} = useContext(ThemeContext);

  const navigation = useNavigation();

  // Fetch profile function
  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const token = await GetToken();

        if (token !== undefined) {
          const headers = {headers: {Authorization: `Bearer ${token}`}};

          // Make API request to fetch profile
          axios
            .get("/user", headers)
            .then(response => {
              setFirstName(response.data.fname);
              setLastName(response.data.lname);
              setEmail(response.data.email);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("No jwt found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    navigation.addListener("focus", () => {
      ResetStatusMsg();
      FetchProfile();
    });
  }, [navigation]);

  // Update profile function
  const UpdateProfile = async () => {
    const token = await GetToken();

    const payload = {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
    };

    // Make API request to update profile
    axios
      .put("/user", payload, {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        setStatusMsg(response.data.message);
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

  // Return JSX
  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      <View style={styles.textcontainer}>
        <Text style={[styles.text, {color: COLORS[theme].primary}]}>
          Profile
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={{flexDirection: "row"}}>
          <View style={{width: "40%"}}>
            <Input2
              label={"First Name"}
              inconName="email"
              value={firstName}
              onChangeText={text => setFirstName(text)}
              placeholder={"First name"}
            />
          </View>
          <View style={{width: "60%"}}>
            <Input2
              label={"Last Name"}
              value={lastName}
              onChangeText={text => setLastName(text)}
              placeholder={"Last name"}
            />
          </View>
        </View>
        <Input
          label={"Email"}
          iconName="email"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={"Email"}
          keyboardType={"email-address"}
        />
        <Input
          label={"Password"}
          iconName="lock"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={"Password"}
          password
        />
      </View>
      <View style={[styles.buttonContainer, {width: "20%"}]}>
        <Button title="Save" onPress={() => UpdateProfile()} />
      </View>

      <View style={styles.statusMsgContainer}>
        <Text
          style={{
            color: COLORS[theme].primary,
          }}>
          {statusMsg ? statusMsg : ""}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ProfilePage;
