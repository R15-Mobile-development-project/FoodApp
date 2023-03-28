import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import COLORS from '../conts/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from './axios';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [balance, setBalance] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [token, setToken] = useState(null);

  useEffect (() => {
    const FetchProfile = async () => {
      try {
        const _token = await EncryptedStorage.getItem('token');

        if (_token !== undefined) {
          setToken(_token);

          const headers = {headers: {Authorization: `Bearer ${_token}`}};

          axios
            .get('/user', headers)
            .then(response => {
              console.log(response)
              setFirstName(response.data.fname);
              setLastName(response.data.lname);
              setBalance(response.data.balance);
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

  const ResetStatusMsg = () => {
    setStatusMsg('');
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor: COLORS.primary}}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 5,
            color: COLORS.quaternary,
          }}>
        {firstName} {lastName}
        </Text>
        <View style={[{flexDirection:'row', alignItems:'center'}]}>
          <View style={[{flex:1,flexDirection:'row'}]}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'left',
              color: COLORS.quaternary,
            }}>
            {balance}€
          </Text>
          </View>
          <View style={[{justifyContent:'space-evenly', marginVertical:10}]}>
          <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
            <Icon name="wallet" size={30} color={COLORS.quaternary} />
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{flex: 1, backgroundColor: COLORS.quaternary, paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
