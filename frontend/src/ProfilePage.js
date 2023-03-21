import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input, Input2} from './components/Input';
import Button from './components/Button';
import styles from './conts/Styles';

function LoginPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //TODO add get request to fetch profile data and display it

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.text}>Profile</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={{flexDirection: 'row', width: '50%'}}>
          <Input2
            label={'First Name'}
            inconName="email"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            placeholder={'First name'}
          />
          <Input2
            label={'Last Name'}
            value={lastName}
            onChangeText={text => setLastName(text)}
            placeholder={'Last name'}
          />
        </View>
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
