import React, {useState} from "react";
import {View, Text, KeyboardAvoidingView} from "react-native";
import {Input} from "./components/Input";
import Button from "./components/Button";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import axios from "./components/axios";
import {SaveToken} from "./components/Token";
import {COLORS} from "./conts/colors";
import {ThemeContext} from "./components/ThemeContext";
import {useContext} from "react";
import styles from "./conts/Styles";

// Define LoginPage component
function LoginPage() {
  // Define state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const {theme} = useContext(ThemeContext);

  // Navigation hook
  const navigation = useNavigation();

  // Login function
  const Login = () => {
    // Check if email and password are empty
    if (!email || !password) {
      return;
    }

    // Prepare payload for API request
    const payload = {
      email: email,
      password: password,
    };

    // Make API request to login
    axios
      .post("/user/login", payload)
      .then(async response => {
        console.log(response.data);

        // Check if response contains necessary data
        if (
          !response.data ||
          (!response.data.message && !response.data.token)
        ) {
          setStatusMsg("No data from server");
          return;
        }

        // Save token and update status message
        const token = response.data.token;
        await SaveToken(token);
        setStatusMsg(response.data.message);

        // Navigate to MyDrawer after a short delay
        setTimeout(() => {
          navigation.navigate("MyDrawer");
        }, 500);
      })
      .catch(err => {
        // Handle error and update status message
        if (err.response.data && err.response.data.message) {
          setStatusMsg(err.response.data.message);
        }
      });
  };

  // Function to reset status message
  const ResetStatusMsg = () => {
    setStatusMsg("");
  };

  return (
    // Wrap the view in a KeyboardAvoidingView to prevent the keyboard from covering input fields
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      {/* Display the Login text header */}
      <View style={styles.textcontainer}>
        <Text style={[styles.text, {color: COLORS[theme].primary}]}>Login</Text>
      </View>

      {/* Render the email and password input fields */}
      <View style={styles.inputContainer}>
        <Input
          label={"Email"}
          iconName="email"
          value={email}
          onChangeText={text => (setEmail(text), ResetStatusMsg())}
          placeholder={"Enter your email address"}
          keyboardType={"email-address"}
        />
        <Input
          label={"Password"}
          iconName="lock"
          value={password}
          onChangeText={text => (setPassword(text), ResetStatusMsg())}
          placeholder={"Enter your password"}
          password
        />
      </View>

      {/* Render the Login button */}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => Login()} />
      </View>

      {/* Render the text and link for navigating to the Register screen */}
      <View style={styles.infoContainer}>
        <Text
          style={{
            color: COLORS[theme].primary,
          }}>
          Dont have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[styles.textlink, {color: COLORS[theme].primary}]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render the status message container */}
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

export default LoginPage;
