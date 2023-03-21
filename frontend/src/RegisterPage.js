import React from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Input from './components/Input';
import Button from './components/Button';
import COLORS from './conts/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

function RegisterPage() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  //TODO add post request to register user

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>Register</Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label={'Email'}
          iconName="email"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder={'Enter your email address'}
        />
        <Input
          label={'Username'}
          iconName="account"
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder={'Enter your username'}
        />
        <Input
          label={'Password'}
          iconName="lock"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Enter your password'}
          password
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* //TODO add onPress to register user */}
        <Button title="Register" />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: COLORS.primary}}>Allready have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textlink}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.quaternary,
  },
  inputContainer: {
    width: '80%',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  textlink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});
