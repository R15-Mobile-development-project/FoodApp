import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input, Input2} from './components/Input';
import Button from './components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from './components/axios';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import {useContext} from 'react';
import styles from './conts/Styles';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const {theme} = useContext(ThemeContext);

  const navigation = useNavigation();

  const Register = () => {
    if (!email || !firstName || !lastName || !password) {
      return;
    }

    const payload = {
      email: email,
      fname: firstName,
      lname: lastName,
      password: password,
    };

    axios
      .post('/user/register', payload)
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.message) {
          setStatusMsg(response.data.message);

          setTimeout(() => {
            navigation.navigate('Login');
          }, 500);
        }
      })
      .catch(err => {
        console.log(err.response.data);

        if (err.response.data && err.response.data.message) {
          setStatusMsg(err.response.data.message);
        }
      });
  };

  const ResetStatusMsg = () => {
    setStatusMsg('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      <View style={styles.textcontainer}>
        <Text style={[styles.text, {color: COLORS[theme].primary}]}>
          Register
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label={'Email'}
          iconName="email"
          value={email}
          onChangeText={text => (setEmail(text), ResetStatusMsg())}
          placeholder={'Enter your email address'}
          keyboardType={'email-address'}
        />
        <View style={styles.inputView}>
          <Input2
            label={'First Name'}
            value={firstName}
            onChangeText={text => (setFirstName(text), ResetStatusMsg())}
            placeholder={'First name'}
          />
          <Input2
            label={'Last Name'}
            value={lastName}
            onChangeText={text => (setLastName(text), ResetStatusMsg())}
            placeholder={'Last name'}
          />
        </View>
        <Input
          label={'Password'}
          iconName="lock"
          value={password}
          onChangeText={text => (setPassword(text), ResetStatusMsg())}
          placeholder={'Enter your password'}
          password
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => Register()} />
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={{
            color: COLORS[theme].primary,
          }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.textlink, {color: COLORS[theme].primary}]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusMsgContainer}>
        <Text
          style={{
            color: COLORS[theme].primary,
          }}>
          {statusMsg ? statusMsg : ''}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegisterPage;
