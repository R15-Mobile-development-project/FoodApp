import {View, Text} from 'react-native';
import styles from './conts/Styles';
import Button from './components/Button';
import {KeyboardAvoidingView} from 'react-native';
import {GetToken, DeleteToken} from './components/Token';
import {useEffect, useState} from 'react';
import COLORS from './conts/colors';
import axios from './components/axios';
import {useNavigation} from '@react-navigation/native';

function SettingsPage() {
  const [statusMsg, setStatusMsg] = useState('');

  const navigation = useNavigation();

  const DeleteProfile = async () => {
    const token = await GetToken();

    axios
      .delete('/user', {headers: {Authorization: `Bearer ${token}`}})
      .then(async response => {
        await DeleteToken();
        setStatusMsg(response.data.message);

        setTimeout(() => {
          navigation.replace('Login');
        }, 500);
      })
      .catch(err => {
        console.log(err);
        setStatusMsg(err.response.data.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Dark/Lihgtmode" />
        <Button title="Delete user" onPress={() => DeleteProfile()} />
        <Button title="jaa" />
      </View>

      <View style={styles.statusMsgContainer}>
        <Text style={{color: COLORS.primary}}>
          {statusMsg ? statusMsg : ''}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
export default SettingsPage;
