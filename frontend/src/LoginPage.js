import React from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input} from './components/Input';
import Button from './components/Button';
import COLORS from './conts/colors';
import styles from './conts/Styles';
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
        <Button title="Login" onPress={() => navigation.navigate('MyDrawer')} />
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
