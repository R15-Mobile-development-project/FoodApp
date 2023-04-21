import React from "react";
import {View, Text, TextInput} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../conts/colors";
import {ThemeContext} from "./ThemeContext";
import {useContext} from "react";
import styles from "../conts/Styles";

// Component for input field with label, icon, and visibility toggle for passwords
const Input = ({
  label,
  iconName,
  error,
  password,
  placeholder,
  keyboardType,
  onFocus = () => {},
  ...props
}) => {
  // Access the current theme from the context
  const {theme} = useContext(ThemeContext);
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={{marginBottom: 5}}>
      <Text style={[styles.label, {color: COLORS[theme].primary}]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer2,
          {backgroundColor: COLORS[theme].tertiary},
          {
            borderColor: error
              ? COLORS[theme].red
              : isFocused
              ? COLORS[theme].primary
              : COLORS[theme].quaternary,
            alignItems: "center",
          },
        ]}>
        <Icon
          name={iconName}
          style={[styles.inputIcon, {color: COLORS[theme].primary}]}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          placeholder={placeholder}
          placeholderTextColor={COLORS[theme].primary}
          keyboardType={keyboardType}
          style={[styles.input, {color: COLORS[theme].primary}]}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={[styles.inputPassIcon, {color: COLORS[theme].primary}]}
          />
        )}
      </View>
      {error && (
        <Text style={[styles.errortext, {color: COLORS[theme].red}]}></Text>
      )}
    </View>
  );
};

// Component for input field with label and no icon or visibility toggle
const Input2 = ({label, error, placeholder, onFocus = () => {}, ...props}) => {
  // Access the current theme from the context
  const {theme} = useContext(ThemeContext);
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={{marginBottom: 5}}>
      <Text style={[styles.label, {color: COLORS[theme].primary}]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer2,
          {backgroundColor: COLORS[theme].tertiary},
          {
            borderColor: error
              ? COLORS[theme].red
              : isFocused
              ? COLORS[theme].primary
              : COLORS[theme].quaternary,
            alignItems: "center",
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={COLORS[theme].primary}
          style={[{color: COLORS[theme].primary}]}
          {...props}
        />
      </View>
      {error && (
        <Text style={[styles.errortext, {color: COLORS[theme].red}]}></Text>
      )}
    </View>
  );
};

// Define the Input3 component
const Input3 = ({
  error,
  placeholder,
  keyboardType,
  onFocus = () => {},
  ...props
}) => {
  // Retrieve the current theme from the ThemeContext
  const {theme} = useContext(ThemeContext);
  // Initialize the isFocused state to false
  const [isFocused, setIsFocused] = React.useState(false);
  // Render the component
  return (
    <View style={{marginBottom: 5}}>
      {/* Render the input field */}
      <View
        style={[
          styles.inputContainer2,
          {backgroundColor: COLORS[theme].tertiary},
          {
            borderColor: error
              ? COLORS[theme].red
              : isFocused
              ? COLORS[theme].primary
              : COLORS[theme].quaternary,
            alignItems: "center",
          },
        ]}>
        {/* Render the TextInput element */}
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={COLORS[theme].primary}
          style={[{color: COLORS[theme].primary}]}
          {...props}
        />
      </View>
      {/* If there's an error prop, render an error message */}
      {error && (
        <Text style={[styles.errortext, {color: COLORS[theme].red}]}>
          {error}
        </Text>
      )}
    </View>
  );
};

// Define the InputRestaurant component
const InputRestaurant = ({
  label,
  error,
  placeholder,
  onFocus = () => {},
  ...props
}) => {
  // Retrieve the current theme from the ThemeContext
  const {theme} = useContext(ThemeContext);
  // Initialize the isFocused state to false
  const [isFocused, setIsFocused] = React.useState(false);
  // Render the component
  return (
    <View style={{marginBottom: 5}}>
      <Text style={[styles.label, {color: COLORS[theme].primary}]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainerRestaurant,
          {backgroundColor: COLORS[theme].tertiary},
          {
            borderColor: error
              ? COLORS[theme].red
              : isFocused
              ? COLORS[theme].primary
              : COLORS[theme].quaternary,
            alignItems: "center",
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={COLORS[theme].primary}
          style={[styles.input2, {color: COLORS[theme].primary}]}
          {...props}
        />
      </View>
      {error && (
        <Text style={[styles.errortext, {color: COLORS[theme].red}]}></Text>
      )}
    </View>
  );
};

// Define the InputRestaurant2 component
const InputRestaurant2 = ({
  label,
  error,
  placeholder,
  onFocus = () => {},
  ...props
}) => {
  // Retrieve the current theme from the ThemeContext
  const {theme} = useContext(ThemeContext);
  // Initialize the isFocused state to false
  const [isFocused, setIsFocused] = React.useState(false);
  // Render the component
  return (
    <View style={{marginBottom: 5}}>
      <Text style={[styles.label, {color: COLORS[theme].primary}]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainerRestaurant2,
          {backgroundColor: COLORS[theme].tertiary},
          {
            borderColor: error
              ? COLORS[theme].red
              : isFocused
              ? COLORS[theme].primary
              : COLORS[theme].quaternary,
            // alignItems: 'center',
          },
        ]}>
        <TextInput
          multiline
          numberOfLines={10}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={COLORS[theme].primary}
          style={[
            styles.input2,
            {color: COLORS[theme].primary, textAlignVertical: "top"},
          ]}
          {...props}
        />
      </View>
      {error && (
        <Text style={[styles.errortext, {color: COLORS[theme].red}]}></Text>
      )}
    </View>
  );
};

export {Input, Input2, Input3, InputRestaurant, InputRestaurant2};
