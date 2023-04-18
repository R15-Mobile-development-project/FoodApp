import {View, Text} from "react-native";
import Button from "./components/Button";
import {KeyboardAvoidingView} from "react-native";
import {GetToken, DeleteToken} from "./components/Token";
import {useContext, useState} from "react";
import axios from "./components/axios";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "./conts/colors";
import {ThemeContext} from "./components/ThemeContext";
import {SaveMode, DeleteMode, GetMode} from "./components/Token";
import styles from "./conts/Styles";

// Define SettingsPage component
function SettingsPage() {
  // Initialize state variables and context
  const [statusMsg, setStatusMsg] = useState("");
  const {theme, setTheme, toggleTheme} = useContext(ThemeContext);
  const navigation = useNavigation();

  // Function to delete the user profile
  const DeleteProfile = async () => {
    const token = await GetToken();

    // Make API request to delete user
    axios
      .delete("/user", {headers: {Authorization: `Bearer ${token}`}})
      .then(async response => {
        // Remove token and mode from storage
        await DeleteToken();
        const mode = await GetMode();
        await DeleteMode();
        setStatusMsg(response.data.message);

        // Navigate to Login screen after successful deletion
        setTimeout(() => {
          if (mode === "dark") setTheme("light");
          navigation.replace("Login");
        }, 500);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  // Function to handle theme toggle
  const handleToggleTheme = () => {
    toggleTheme();
    SaveMode(theme === "light" ? "dark" : "light");
  };

  // Render SettingsPage JSX
  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      {/* Display buttons for theme toggle, deleting user profile, and a placeholder button */}
      <View style={[styles.buttonContainer, {width: "40%"}]}>
        <Button
          title={theme === "light" ? "Dark mode" : "Light mode"}
          onPress={handleToggleTheme}
        />
        <Button title="Delete user" onPress={() => DeleteProfile()} />
      </View>

      {/* Render status message container */}
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

export default SettingsPage;
