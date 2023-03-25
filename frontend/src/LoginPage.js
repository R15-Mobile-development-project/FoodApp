import React, { useState } from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input} from './components/Input';
import Button from './components/Button';
import COLORS from './conts/colors';
import styles from './conts/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from "./components/axios";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const navigation = useNavigation();

  const Login = () => {
    if(!email || !password){
      return
    }

    const payload = {
      email: email,
      password: password
    }

    axios.post("/user/login", payload).then(response => {
      console.log(response.data);

      if(response.data && response.data.message){
        setStatusMsg(response.data.message)

        setTimeout(() => {
          navigation.navigate('MyDrawer')
        }, 500)
      }
    }).catch(err => {
      console.log(err.response.data);

      if(err.response.data && err.response.data.message){
        setStatusMsg(err.response.data.message)
      }
    })

  }

  const ResetStatusMsg = () => {
    setStatusMsg("");
  }

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
          onChangeText={text => (setEmail(text), ResetStatusMsg())}
          placeholder={'Enter your email address'}
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
      <View style={styles.buttonContainer}>
        {/* //TODO add onPress to Login user */}
        <Button title="Login" onPress={() => Login()} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={{color: COLORS.primary}}>Dont have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textlink}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusMsgContainer}>
        <Text style={{color: COLORS.primary}}>{statusMsg ? statusMsg : ""}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginPage;
