import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../conts/colors';
import {ThemeContext} from './ThemeContext';
import {useContext} from 'react';
import styles from '../conts/Styles';

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
            alignItems: 'center',
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
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
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

const Input2 = ({label, error, placeholder, onFocus = () => {}, ...props}) => {
  const {theme} = useContext(ThemeContext);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 5}}>
      <Text
        style={{
          marginVertical: 5,
          fontSize: 14,
          color: COLORS[theme].primary,
          borderRadius: 10,
        }}>
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
            alignItems: 'center',
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
          //Fix this color
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

export {Input, Input2};
