import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './conts/Styles';
import { Card } from '@rneui/themed';
import axios from './components/axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './conts/colors';
import { ThemeContext } from './components/ThemeContext';

const users = [
  {
    name: 'brynn'
  },
]
function HistoryPage() {

  const [token, setToken] = useState(null);
  const [price, setPrice] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [item, setItem] = useState([]);
  const navigation = useNavigation();
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);
  var arrayCount = [];

  useEffect(() => {
    const FetchOrder = async () => {
      try {
        const _token = await EncryptedStorage.getItem('token');

        if (_token !== undefined) {
          setToken(_token);

          const headers = { headers: { Authorization: `Bearer ${_token}` } };

          axios
            .get('/order', {
              headers: { Authorization: `Bearer ${_token}` },
            })
            .then(response => {
              console.log(response.data);
              console.log(arrayCount, 'dasdasdasd');
              arrayCount = response.data;
              for (let i = 0; i < response.data.length; i++) {
                setPrice([response.data[i].price]);
                setRestaurant([response.data[i].restaurant_id]);
                setItem([response.data[i].order_id]);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.log(error);
      }
    };
    navigation.addListener('focus', () => {

      FetchOrder();
    });
  }, [navigation]);
  console.log(arrayCount)

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1, backgroundColor: COLORS[theme].quaternary }]}>

      {arrayCount.map((item, index) => (
        <Card containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS[theme].primary,
          borderRadius: 5,
          borderColor: COLORS[theme].primary
        }}>
          <Card.Title>
            <Text style={{}}>{index}{item.restaurant}</Text>
          </Card.Title>
          <Card.Divider />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: 10 }}>
              <Text>
                {item.item}------------------
              </Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Text>
                {item.price}€
              </Text>
            </View>
          </View>
        </Card>
      ))}

    </KeyboardAvoidingView>
  );

}

export default HistoryPage;
