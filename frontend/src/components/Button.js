import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import styles from '../conts/Styles';

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.buttonOne, styles.buttonOneOutline]}>
      <Text style={styles.buttonOneOutlineText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
