import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Input from './components/Input';
import Button from './components/Button';
import COLORS from './conts/colors';

function LoginPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //TODO add get request to fetch profile data and display it

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Profile</Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label={'First name'}
          iconName="account"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          placeholder={'First name'}
        />
        <Input
          label={'Last name'}
          iconName="account"
          value={lastName}
          onChangeText={text => setLastName(text)}
          placeholder={'Last name'}
        />
        <Input
          label={'Email'}
          iconName="email"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Email'}
        />
        <Input
          label={'Password'}
          iconName="lock"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'********'}
          password
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" />
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    width: '80%',
    gap: 10,
  },
  buttonContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
  }
});
