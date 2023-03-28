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
  const [jwtToken, setJwtToken] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const FetchTokenFromStorage = async () => {
      const token = await GetToken();

      if (token !== null) {
        setJwtToken(token);
      } else {
        console.log('Error on fetching jwt');
      }
    };

    FetchTokenFromStorage();
  }, []);

  const DeleteProfile = () => {
    axios
      .delete('/user', {headers: {Authorization: `Bearer ${jwtToken}`}})
      .then(async response => {
        await DeleteToken();
        setStatusMsg(response.data.message);

        setTimeout(() => {
          navigation.push('Login');
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
