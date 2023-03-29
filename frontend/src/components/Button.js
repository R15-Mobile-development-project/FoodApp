import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../conts/colors';
import {ThemeContext} from './ThemeContext';
import {useContext} from 'react';

const Button = ({title, onPress = () => {}}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: COLORS[theme].primary,
          width: '100%',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
        },
        {
          backgroundColor: COLORS[theme].quaternary,
          marginTop: 5,
          borderColor: COLORS[theme].primary,
          borderWidth: 2,
        },
      ]}>
      <Text
        style={{
          color: COLORS[theme].primary,
          fontWeight: '700',
          fontSize: 16,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
