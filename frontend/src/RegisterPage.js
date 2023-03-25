import React, { useState } from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input, Input2} from './components/Input';
import Button from './components/Button';
import styles from './conts/Styles';
import COLORS from './conts/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from "axios";

function RegisterPage() {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const navigation = useNavigation();
  //TODO add post request to register user

  const Register = () => {
    if(!email || !firstName || !lastName || !password){
      return
    }

    const payload = {
      email: email,
      fname: firstName,
      lname: lastName,
      password: password
    }

    axios.post("http://192.168.1.20:3000/user/register", payload).then(response => {
      console.log(response.data);

      if(response.data && response.data.message){
        setStatusMsg(response.data.message)

        setTimeout(() => {
          navigation.navigate('Login')
        }, 1000)
      }
    }).catch(err => {
      console.log(err.response.data);

      if(err.response.data && err.response.data.message){
        setStatusMsg(err.response.data.message)
      }
    })

  }

  const ResetError = () => {
    setStatusMsg("");
  }

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
          onChangeText={text => (setEmail(text), ResetError())}
          placeholder={'Enter your email address'}
        />
        <View style={{flexDirection: 'row', width: '50%'}}>
          <Input2
            label={'First Name'}
            value={firstName}
            onChangeText={text => (setFirstName(text), ResetError())}
            placeholder={'First name'}
          />
          <Input2
            label={'Last Name'}
            value={lastName}
            onChangeText={text => (setLastName(text), ResetError())}
            placeholder={'Last name'}
          />
        </View>
        <Input
          label={'Password'}
          iconName="lock"
          value={password}
          onChangeText={text => (setPassword(text), ResetError())}
          placeholder={'Enter your password'}
          password
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => Register()}/>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: COLORS.primary}}>Allready have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textlink}>Login</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{color: COLORS.primary}}>{statusMsg ? statusMsg : ""}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RegisterPage;
