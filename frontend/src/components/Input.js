import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../conts/colors';

const Input = ({
  label,
  iconName,
  error,
  password,
  placeholder,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 5}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primary
              : COLORS.quaternary,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: COLORS.primary, fontSize: 22, marginRight: 10}}
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
          placeholderTextColor={COLORS.primary}
          style={{
            color: COLORS.primary,
            flex: 1,
          }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.primary, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}></Text>
      )}
    </View>
  );
};

const Input2 = ({label, error, placeholder, onFocus = () => {}, ...props}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 5}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primary
              : COLORS.quaternary,
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
          placeholderTextColor={COLORS.primary}
          style={style.input2}
          {...props}
        />
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}></Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.primary,
    borderRadius: 10,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.tertiary,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  input: {
    color: COLORS.primary,
    flex: 1,
    width: '80%',
  },
  input2: {
    color: COLORS.primary,
    width: '100%',
  },
});

export {Input, Input2};
