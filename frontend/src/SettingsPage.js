import {View, Text} from 'react-native';
import Button from './components/Button';
import {KeyboardAvoidingView} from 'react-native';
import {GetToken, DeleteToken} from './components/Token';
import {useContext, useState} from 'react';
import axios from './components/axios';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from './conts/colors';
import {ThemeContext} from './components/ThemeContext';
import {SaveMode} from './components/Token';
import styles from './conts/Styles';

function SettingsPage() {
  const [statusMsg, setStatusMsg] = useState('');
  const {theme, toggleTheme} = useContext(ThemeContext);

  const navigation = useNavigation();

  const DeleteProfile = async () => {
    const token = await GetToken();

    axios
      .delete('/user', {headers: {Authorization: `Bearer ${token}`}})
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

  const handleToggleTheme = () => {
    toggleTheme();
    SaveMode(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: COLORS[theme].quaternary}]}>
      <View style={styles.buttonContainer}>
        <Button title="Dark/Light mode" onPress={handleToggleTheme} />
        <Button title="Delete user" onPress={() => DeleteProfile()} />
        <Button title="jaa" />
      </View>

      <View style={styles.statusMsgContainer}>
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

export default SettingsPage;
