import React from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Input from './components/Input';
import Button from './components/Button';
import COLORS from './conts/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  //TODO add post request to Login user

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>Login</Text>
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
          label={'Password'}
          iconName="lock"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Enter your password'}
          password
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* //TODO add onPress to Login user */}
        <Button title="Login" />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: COLORS.primary}}>Dont have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textlink}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginPage;

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
