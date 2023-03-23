import React from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input, Input2} from './components/Input';
import Button from './components/Button';
import styles from './conts/Styles';
import COLORS from './conts/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

function RegisterPage() {
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
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
        <View style={{flexDirection: 'row', width: '50%'}}>
          <Input2
            label={'First Name'}
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
