import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input} from './components/Input';
import Button from './components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from './components/axios';
import {SaveToken} from './components/Token';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import {useContext} from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const {theme} = useContext(ThemeContext);

  const navigation = useNavigation();

  const Login = () => {
    if (!email || !password) {
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    axios
      .post('/user/login', payload)
      .then(async response => {
        console.log(response.data);

        if (
          !response.data ||
          (!response.data.message && !response.data.token)
        ) {
          setStatusMsg('No data from server');
          return;
        }

        const token = response.data.token;

        await SaveToken(token);

        setStatusMsg(response.data.message);

        setTimeout(() => {
          navigation.navigate('MyDrawer');
        }, 500);
      })
      .catch(err => {
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
          Login
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
        {/* //TODO add onPress to Login user */}
        <Button title="Login" onPress={() => Login()} />
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
          Dont have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              color: COLORS[theme].primary,
              textDecorationLine: 'underline',
            }}>
            Register
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

export default LoginPage;
