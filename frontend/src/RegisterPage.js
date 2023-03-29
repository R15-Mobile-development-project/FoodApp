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
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS[theme].quaternary,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: COLORS[theme].primary,
          }}>
          Register
        </Text>
      </View>

      <View
        style={{
          width: '80%',
        }}>
        <Input
          label={'Email'}
          iconName="email"
          value={email}
          onChangeText={text => (setEmail(text), ResetStatusMsg())}
          placeholder={'Enter your email address'}
          keyboardType={'email-address'}
        />
        <View style={{flexDirection: 'row', width: '50%'}}>
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
      <View
        style={{
          width: '60%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <Button title="Register" onPress={() => Register()} />
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          gap: 10,
        }}>
        <Text
          style={{
            color: COLORS[theme].primary,
          }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: COLORS[theme].primary,
              textDecorationLine: 'underline',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 20,
        }}>
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
