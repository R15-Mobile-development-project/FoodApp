import Button from './components/Button';
import styles from './conts/Styles';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from './components/ThemeContext';
import {COLORS} from './conts/colors';
import {useNavigation} from '@react-navigation/native';

function Restaurant() {
  const {theme} = useContext(ThemeContext);
  const [balance, setBalance] = useState(0);

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      <View style={styles.buttonContainer}>
        <Text style={[styles.text, {color: COLORS[theme].primary}]}>
          Restaurant
        </Text>
      </View>
      <View style={styles.walletContainer}>
        <Button
          title="Add Restaurant"
          onPress={() => navigation.navigate('AddRestaurant')}
        />
        <Button title="Edit Restaurant" onPress={() => setBalance()} />
        <Button title="Delete restaurant" onPress={() => setBalance()} />
      </View>
    </KeyboardAvoidingView>
  );
}
export default Restaurant;
