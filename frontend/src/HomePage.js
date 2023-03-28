import React from 'react';
import {View, Text} from 'react-native';
import styles from './conts/Styles';

function HomePage() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={styles.primary}>Home</Text>
    </View>
  );
}

export default HomePage;
