import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../conts/colors';
import {ThemeContext} from './ThemeContext';
import {useContext} from 'react';

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
          {
            height: 55,
            backgroundColor: COLORS[theme].tertiary,
            flexDirection: 'row',
            paddingHorizontal: 15,
            borderWidth: 0.5,
            borderRadius: 10,
          },
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
          style={{
            color: COLORS[theme].primary,
            fontSize: 22,
            marginRight: 10,
          }}
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
          //Fix this color
          placeholderTextColor={COLORS[theme].primary}
          keyboardType={keyboardType}
          style={{
            color: COLORS[theme].primary,
            flex: 1,
          }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{
              color: COLORS[theme].primary,
              fontSize: 22,
            }}
          />
        )}
      </View>
      {error && (
        <Text
          style={{
            marginTop: 7,
            color: COLORS[theme].red,
            fontSize: 12,
          }}></Text>
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
          {
            height: 55,
            backgroundColor: COLORS[theme].tertiary,
            flexDirection: 'row',
            paddingHorizontal: 15,
            borderWidth: 0.5,
            borderRadius: 10,
          },
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
          style={{
            color: COLORS[theme].primary,
            width: '100%',
          }}
          {...props}
        />
      </View>
      {error && (
        <Text
          style={{
            marginTop: 7,
            color: COLORS[theme].red,
            fontSize: 12,
          }}></Text>
      )}
    </View>
  );
};

export {Input, Input2};
