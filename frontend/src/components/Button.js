import React from "react";
import {TouchableOpacity, Text} from "react-native";
import {COLORS} from "../conts/colors";
import {ThemeContext} from "./ThemeContext";
import {useContext} from "react";
import styles from "../conts/Styles";

// Define the Button component
const Button = ({title, onPress = () => {}}) => {
  // Retrieve the current theme from the ThemeContext
  const {theme} = useContext(ThemeContext);

  // Render the button
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.buttonOne,
        {backgroundColor: COLORS[theme].primary},
        styles.buttonOneOutline,
        {
          backgroundColor: COLORS[theme].quaternary,
          borderColor: COLORS[theme].primary,
        },
      ]}>
      <Text style={[styles.buttonOneText, {color: COLORS[theme].primary}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Define the Button2 component (exported separately)
export const Button2 = ({title, onPress = () => {}}) => {
  // Retrieve the current theme from the ThemeContext
  const {theme} = useContext(ThemeContext);

  // Render the button
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.buttonTwo,
        {backgroundColor: COLORS[theme].primary},
        styles.buttonTwoOutline,
        {
          backgroundColor: COLORS[theme].quaternary,
          borderColor: COLORS[theme].primary,
        },
      ]}>
      <Text style={[styles.buttonOneText, {color: COLORS[theme].primary}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
