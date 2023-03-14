import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: 'black',
            }}>
            Hello World
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
