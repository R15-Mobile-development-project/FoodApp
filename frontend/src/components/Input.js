import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../conts/colors';
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
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 5}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer2,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.primary
              : COLORS.quaternary,
            alignItems: 'center',
          },
        ]}>
        <Icon name={iconName} style={styles.inputIcon} />
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
          placeholderTextColor={COLORS.primary}
          keyboardType={keyboardType}
          style={styles.input}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={styles.inputPassIcon}
          />
        )}
      </View>
      {error && <Text style={styles.errortext}></Text>}
    </View>
  );
};

const Input2 = ({label, error, placeholder, onFocus = () => {}, ...props}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 5}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer2,
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
          //Fix this color
          placeholderTextColor={COLORS.primary}
          style={styles.input2}
          {...props}
        />
      </View>
      {error && <Text style={styles.errortext}></Text>}
    </View>
  );
};

export {Input, Input2};
