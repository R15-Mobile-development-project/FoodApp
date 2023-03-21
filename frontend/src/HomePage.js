import React from 'react';
import {View, Text} from 'react-native';
import COLORS from './conts/colors';

function HomePage() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.quaternary,
      }}>
      <Text style={{color: COLORS.primary}}>Home</Text>
    </View>
  );
}

export default HomePage;
