import React, {useState, useEffect} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import {Input, Input2} from './components/Input';
import Button from './components/Button';
import COLORS from './conts/colors';
import styles from './conts/Styles';
import axios from './components/axios';
import {useNavigation} from '@react-navigation/native';
import {GetToken} from './components/Token';

function ProfilePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const token = await GetToken();

        if (token !== undefined) {
          const headers = {headers: {Authorization: `Bearer ${token}`}};

          axios
            .get('/user', headers)
            .then(response => {
              setFirstName(response.data.fname);
              setLastName(response.data.lname);
              setEmail(response.data.email);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('No jwt found');
        }
      } catch (error) {
        console.log(error);
      }
    };

    navigation.addListener('focus', () => {
      ResetStatusMsg();
      FetchProfile();
    });
  }, [navigation]);

  const UpdateProfile = async () => {
    const token = await GetToken();

    const payload = {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
    };

    axios
      .put('/user', payload, {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        setStatusMsg(response.data.message);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  const ResetStatusMsg = () => {
    setStatusMsg('');
  };

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
          keyboardType={'email-address'}
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
        <Button title="Save" onPress={() => UpdateProfile()} />
      </View>

      <View style={styles.statusMsgContainer}>
        <Text style={{color: COLORS.primary}}>
          {statusMsg ? statusMsg : ''}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ProfilePage;
