import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import {useContext} from 'react';
import styles from './conts/Styles';

function HomePage() {
  const {theme} = useContext(ThemeContext);
  return (
    <View
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      <Text
        style={{
          color: COLORS[theme].primary,
        }}>
        Home
      </Text>
    </View>
  );
}

export default HomePage;
